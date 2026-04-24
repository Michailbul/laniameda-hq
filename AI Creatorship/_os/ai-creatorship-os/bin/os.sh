#!/usr/bin/env bash
# os.sh — agent harness for ai-creatorship-os.
#
# Filesystem-first. Agents write markdown files with `kind:` frontmatter; the app
# scans those files and renders the project graph.
#
# Usage:
#   os.sh list
#   os.sh inspect <project>
#   os.sh context <project> [scene-id] [shot-id]
#   os.sh new-project <slug>
#   os.sh new-direction <project> <direction-id> [title]
#   os.sh new-scene <project> <scene-id> [title]
#   os.sh new-shot <project> <scene-id> <shot-id> [title]
#   os.sh new-thread <project> <scene-id> <shot-id> <model> <media> <intent> [direction-id]
#   os.sh validate <project>
#   os.sh status [project]
#   os.sh save <project> <commit-message>

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE="$(cd "$SCRIPT_DIR/../../.." && pwd)"
cd "$WORKSPACE"

die() { echo "error: $*" >&2; exit "${2:-1}"; }

safe_slug() {
  [[ "$1" =~ ^[a-z][a-z0-9_-]{1,63}$ ]]
}

titleize() {
  local s="${1//-/ }"
  s="${s//_/ }"
  printf '%s' "$s"
}

project_dir() {
  local project="${1:-}"
  [[ -n "$project" ]] || die "missing project"
  [[ -d "$project" ]] || die "no such project: $project" 2
  printf '%s' "$project"
}

find_doc_by_kind_id() {
  local project="$1" kind="$2" id="$3"
  find "$project" -name "*.md" -not -path "*/.*" -not -path "*/_*/*" -print0 |
    xargs -0 awk -v kind="$kind" -v id="$id" '
      FNR == 1 { file = FILENAME; in_fm = 0; found_kind = 0; found_id = 0 }
      FNR == 1 && $0 == "---" { in_fm = 1; next }
      in_fm && $0 == "---" {
        if (found_kind && found_id) print file
        nextfile
      }
      in_fm && $0 ~ "^kind:[[:space:]]*" kind "$" { found_kind = 1 }
      in_fm && $0 ~ "^id:[[:space:]]*" id "$" { found_id = 1 }
    ' | head -1
}

cmd_list() {
  for d in */; do
    [[ "$d" =~ ^_ ]] && continue
    local project="${d%/}"
    if [[ -f "$project/project.md" || -f "$project/project.json" ]]; then
      local title="$project"
      if [[ -f "$project/project.md" ]]; then
        title=$(awk '
          /^title:[[:space:]]*/ { sub(/^title:[[:space:]]*/, ""); print; exit }
          /^# / { sub(/^# /, ""); print; exit }
        ' "$project/project.md")
        [[ -n "$title" ]] || title="$project"
      fi
      local scenes shots threads
      scenes=$(grep -Rhl '^kind:[[:space:]]*scene$' "$project" --include='*.md' 2>/dev/null | wc -l | tr -d ' ')
      shots=$(grep -Rhl '^kind:[[:space:]]*shot$' "$project" --include='*.md' 2>/dev/null | wc -l | tr -d ' ')
      threads=$(grep -Rhl '^kind:[[:space:]]*prompt-thread$' "$project" --include='*.md' 2>/dev/null | wc -l | tr -d ' ')
      printf "  %-30s %s scenes  %s shots  %s threads  %s\n" "$project" "$scenes" "$shots" "$threads" "$title"
    fi
  done
}

cmd_inspect() {
  local project; project=$(project_dir "${1:-}")
  echo "=== project ==="
  if [[ -f "$project/project.md" ]]; then
    sed -n '1,120p' "$project/project.md"
  else
    echo "(no project.md)"
  fi
  echo ""
  echo "=== scenes ==="
  grep -Rhl '^kind:[[:space:]]*scene$' "$project" --include='*.md' 2>/dev/null |
    sort |
    while read -r f; do
      awk -v file="$f" '
        /^id:[[:space:]]*/ { id=$0; sub(/^id:[[:space:]]*/, "", id) }
        /^title:[[:space:]]*/ { title=$0; sub(/^title:[[:space:]]*/, "", title) }
        END { printf "  %-28s %s\n", id, file }
      ' "$f"
    done
  echo ""
  echo "=== directions ==="
  grep -Rhl '^kind:[[:space:]]*\(direction\|art-direction\)$' "$project" --include='*.md' 2>/dev/null |
    sort |
    while read -r f; do
      awk -v file="$f" '
        /^kind:[[:space:]]*/ { kind=$0; sub(/^kind:[[:space:]]*/, "", kind) }
        /^id:[[:space:]]*/ { id=$0; sub(/^id:[[:space:]]*/, "", id) }
        /^title:[[:space:]]*/ { title=$0; sub(/^title:[[:space:]]*/, "", title) }
        END { printf "  %-28s %-14s %s\n", id, kind, file }
      ' "$f"
    done
  echo ""
  echo "=== shots ==="
  grep -Rhl '^kind:[[:space:]]*shot$' "$project" --include='*.md' 2>/dev/null |
    sort |
    while read -r f; do
      awk -v file="$f" '
        /^id:[[:space:]]*/ { id=$0; sub(/^id:[[:space:]]*/, "", id) }
        /^scene:[[:space:]]*/ { scene=$0; sub(/^scene:[[:space:]]*/, "", scene) }
        END { printf "  %-28s scene=%-22s %s\n", id, scene, file }
      ' "$f"
    done
  echo ""
  echo "=== prompt threads ==="
  grep -Rhl '^kind:[[:space:]]*prompt-thread$' "$project" --include='*.md' 2>/dev/null |
    sort |
    while read -r f; do
      awk -v file="$f" '
        /^id:[[:space:]]*/ { id=$0; sub(/^id:[[:space:]]*/, "", id) }
        /^shot:[[:space:]]*/ { shot=$0; sub(/^shot:[[:space:]]*/, "", shot) }
        /^direction:[[:space:]]*/ { direction=$0; sub(/^direction:[[:space:]]*/, "", direction) }
        /^model:[[:space:]]*/ { model=$0; sub(/^model:[[:space:]]*/, "", model) }
        /^media:[[:space:]]*/ { media=$0; sub(/^media:[[:space:]]*/, "", media) }
        END { printf "  %-38s shot=%-24s dir=%-18s %-18s %-7s %s\n", id, shot, direction, model, media, file }
      ' "$f"
    done
}

cmd_context() {
  local project; project=$(project_dir "${1:-}")
  local scene="${2:-}" shot="${3:-}"
  echo "AI Creatorship OS agent context"
  echo ""
  echo "Project: $project"
  [[ -f "$project/project.md" ]] && echo "Project file: $project/project.md"
  echo ""
  if [[ -n "$scene" ]]; then
    local scene_file; scene_file=$(find_doc_by_kind_id "$project" "scene" "$scene" || true)
    [[ -n "$scene_file" ]] && echo "Scene file: $scene_file"
  fi
  if [[ -n "$shot" ]]; then
    local shot_file; shot_file=$(find_doc_by_kind_id "$project" "shot" "$shot" || true)
    [[ -n "$shot_file" ]] && echo "Shot file: $shot_file"
    echo ""
    echo "Prompt threads for shot:"
    grep -Rhl '^kind:[[:space:]]*prompt-thread$' "$project" --include='*.md' 2>/dev/null |
      xargs grep -l "^shot:[[:space:]]*$shot$" 2>/dev/null |
      sort |
      while read -r f; do
        awk -v file="$f" '
        /^id:[[:space:]]*/ { id=$0; sub(/^id:[[:space:]]*/, "", id) }
          /^direction:[[:space:]]*/ { direction=$0; sub(/^direction:[[:space:]]*/, "", direction) }
          /^model:[[:space:]]*/ { model=$0; sub(/^model:[[:space:]]*/, "", model) }
          /^media:[[:space:]]*/ { media=$0; sub(/^media:[[:space:]]*/, "", media) }
          END { printf "- %s (%s, %s, direction=%s) — %s\n", id, model, media, direction, file }
        ' "$f"
      done
  else
    cmd_inspect "$project"
  fi
  echo ""
  echo "Rules:"
  echo "- Read the listed files before writing."
  echo "- Create/edit prompt-thread markdown; do not leave useful prompts only in chat."
  echo "- Preserve kind: frontmatter and scene/shot references when known."
  echo "- If scene/shot links are missing, still save the prompt-thread; the app renders it under Unassigned prompts."
  echo "- Run: $OS_DIR/bin/os.sh validate $project"
}

cmd_new_project() {
  local slug="${1:-}"
  [[ -n "$slug" ]] || die "usage: os.sh new-project <slug>"
  safe_slug "$slug" || die "slug must be lowercase kebab/underscore, 2-64 chars, start with a letter"
  [[ ! "$slug" =~ ^_ ]] || die "slugs starting with _ are reserved"
  [[ ! -e "$slug" ]] || die "project already exists: $slug" 2

  local template="$WORKSPACE/_template"
  [[ -d "$OS_DIR/_template" ]] && template="$OS_DIR/_template"
  [[ -d "$template" ]] || die "missing project template: $template"
  cp -R "$template" "$slug"
  cat > "$slug/project.md" <<EOF
---
kind: project
id: $slug
title: $(titleize "$slug")
schema_version: kinds-v1
---
# $(titleize "$slug")

## Brief

Write the project brief here.

## Art direction

Write the look, mood, references, constraints, and production goal here.
EOF

  (cd "$slug" && git init -q && git add -A && git commit -q -m "init: markdown project graph") 2>/dev/null || true
  echo "✓ created project: $slug"
}

cmd_new_direction() {
  local project; project=$(project_dir "${1:-}")
  local direction="${2:-}" title="${3:-$(titleize "${2:-}")}"
  [[ -n "$direction" ]] || die "usage: os.sh new-direction <project> <direction-id> [title]"
  safe_slug "$direction" || die "direction id must be slug-form"
  local dir="$project/directions"
  mkdir -p "$dir"
  local file="$dir/$direction.md"
  [[ ! -f "$file" ]] || die "direction already exists: $direction" 2
  cat > "$file" <<EOF
---
kind: direction
id: $direction
title: $title
status: exploring
---
# $title

## Thesis

Describe the creative direction: mood, visual grammar, camera logic, color, continuity locks, and what this direction is trying to prove.

## Use when

-

## Avoid

-
EOF
  echo "✓ created direction: $file"
}

cmd_new_scene() {
  local project; project=$(project_dir "${1:-}")
  local scene="${2:-}" title="${3:-$(titleize "${2:-}")}"
  [[ -n "$scene" ]] || die "usage: os.sh new-scene <project> <scene-id> [title]"
  safe_slug "$scene" || die "scene id must be slug-form"
  local dir="$project/scenes/$scene"
  mkdir -p "$dir/shots"
  [[ ! -f "$dir/scene.md" ]] || die "scene already exists: $scene" 2
  cat > "$dir/scene.md" <<EOF
---
kind: scene
id: $scene
title: $title
---
# $title

## Description

Describe the scene.

## Storyboard

List the beats that belong in this scene.
EOF
  echo "✓ created scene: $dir/scene.md"
}

cmd_new_shot() {
  local project; project=$(project_dir "${1:-}")
  local scene="${2:-}" shot="${3:-}" title="${4:-$(titleize "${3:-}")}"
  [[ -n "$scene" && -n "$shot" ]] || die "usage: os.sh new-shot <project> <scene-id> <shot-id> [title]"
  safe_slug "$shot" || die "shot id must be slug-form"
  local dir="$project/scenes/$scene/shots/$shot"
  mkdir -p "$dir/statics" "$dir/videos" "$dir/generated"
  [[ ! -f "$dir/shot.md" ]] || die "shot already exists: $shot" 2
  cat > "$dir/shot.md" <<EOF
---
kind: shot
id: $shot
scene: $scene
title: $title
---
# $title

## Intent

Describe what this shot must accomplish.

## Direction

Describe framing, light, motion, continuity locks, and constraints.
EOF
  echo "✓ created shot: $dir/shot.md"
}

cmd_new_thread() {
  local project; project=$(project_dir "${1:-}")
  local scene="${2:-}" shot="${3:-}" model="${4:-}" media="${5:-}" intent="${6:-}" direction="${7:-}"
  [[ -n "$scene" && -n "$shot" && -n "$model" && -n "$media" && -n "$intent" ]] ||
    die "usage: os.sh new-thread <project> <scene-id> <shot-id> <model> <media> <intent> [direction-id]"
  [[ "$media" == "image" || "$media" == "video" || "$media" == "audio" ]] || die "media must be image|video|audio"
  safe_slug "$intent" || die "intent must be slug-form"

  local bucket="statics"
  [[ "$media" == "video" ]] && bucket="videos"
  [[ "$media" == "audio" ]] && bucket="audio"
  local dir="$project/scenes/$scene/shots/$shot/$bucket/$model"
  mkdir -p "$dir"
  local id="$shot-$model-$intent"
  local file="$dir/$intent.md"
  local direction_line=""
  [[ -n "$direction" ]] && direction_line="direction: $direction"
  [[ ! -f "$file" ]] || die "thread already exists: $file" 2
  cat > "$file" <<EOF
---
kind: prompt-thread
id: $id
scene: $scene
shot: $shot
model: $model
media: $media
$direction_line
tags: []
---
# $(titleize "$intent")

What this thread explores.

## v1

Initial draft.

\`\`\`
Write the prompt body here.
\`\`\`
EOF
  echo "✓ created prompt thread: $file"
}

cmd_validate() {
  local project; project=$(project_dir "${1:-}")
  node "$OS_DIR/app/validate-project.mjs" "$project"
}

cmd_status() {
  local project="${1:-}"
  if [[ -n "$project" ]]; then
    [[ -d "$project/.git" ]] || die "project $project has no git repo" 3
    (cd "$project" && git status --short)
    return
  fi
  for d in */; do
    [[ "$d" =~ ^_ ]] && continue
    local name="${d%/}"
    if [[ -d "$name/.git" ]]; then
      local changes; changes=$(cd "$name" && git status --short 2>/dev/null)
      if [[ -n "$changes" ]]; then
        echo "=== $name ==="
        echo "$changes"
      fi
    fi
  done
}

cmd_save() {
  local project="${1:-}"; shift || true
  local msg="${*:-}"
  [[ -n "$project" && -n "$msg" ]] || die "usage: os.sh save <project> <commit-message>"
  [[ -d "$project/.git" ]] || die "project $project has no git repo" 3
  (cd "$project" && {
    if git diff --quiet && git diff --cached --quiet; then
      echo "nothing to commit in $project"
      exit 0
    fi
    git add -A .
    git commit -m "$msg" -q
    local short; short=$(git rev-parse --short HEAD)
    echo "✓ committed $short in $project: $msg"
  })
}

cmd="${1:-}"; shift || true
case "$cmd" in
  list)        cmd_list ;;
  inspect)     cmd_inspect "$@" ;;
  read)        cmd_inspect "$@" ;;
  context)     cmd_context "$@" ;;
  new-project) cmd_new_project "$@" ;;
  new-direction) cmd_new_direction "$@" ;;
  new-scene)   cmd_new_scene "$@" ;;
  new-shot)    cmd_new_shot "$@" ;;
  new-thread)  cmd_new_thread "$@" ;;
  validate)    cmd_validate "$@" ;;
  status)      cmd_status "$@" ;;
  save)        cmd_save "$@" ;;
  -h|--help|help|"")
    sed -n '2,18p' "$SCRIPT_DIR/os.sh" | sed 's|^# \{0,1\}||'
    ;;
  *) die "unknown command: $cmd (try: os.sh help)" ;;
esac
