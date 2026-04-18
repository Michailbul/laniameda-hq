#!/bin/bash
# Build laniameda-ai-creatorship.plugin from laniameda-skills/skills/ai-creatorship/
# Run from: ~/work/laniameda/laniameda-hq/
# Usage: bash scripts/build-plugin.sh

set -e

PLUGIN_NAME="laniameda-ai-creatorship"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$REPO_DIR/laniameda-skills/skills/ai-creatorship"
STAGING="/tmp/$PLUGIN_NAME-staging"
OUTPUT="$REPO_DIR/dist/$PLUGIN_NAME.plugin"
mkdir -p "$REPO_DIR/dist"
STAGING="/tmp/$PLUGIN_NAME-staging"

# Skills deleted from repo but may still exist on disk (e.g. git pull permission issues)
# Keep in sync with removals in laniameda-skills
EXCLUDED_SKILLS=(
  "laniameda-gallery"   # removed: duplicate of laniameda-gallery-ingest (2026-04-12)
)

# Validate
if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Source dir not found: $SOURCE_DIR"
  exit 1
fi

# Clean staging
rm -rf "$STAGING"
mkdir -p "$STAGING/skills"
mkdir -p "$STAGING/.claude-plugin"

# Required manifest (Cowork plugin validator checks for this)
cat > "$STAGING/.claude-plugin/plugin.json" << 'EOF'
{
  "name": "laniameda-ai-creatorship",
  "version": "1.1.0",
  "description": "Full AI creative production toolkit for the laniameda workflow — 14 skills covering the complete pipeline from prompt writing to knowledge base management.",
  "author": {
    "name": "Michael Buloichyk",
    "url": "https://github.com/Michailbul"
  },
  "keywords": ["laniameda", "ai-creatorship", "image-gen", "video-gen", "prompting", "seedance", "nano-banana"]
}
EOF

# Build README
cat > "$STAGING/README.md" << 'EOF'
# laniameda AI Creatorship Plugin

Full AI creative production toolkit for the laniameda workflow.
Auto-built from github.com/Michailbul/laniameda-skills — skills/ai-creatorship/

## Skills Included

See individual SKILL.md files in each skill folder for full documentation.
EOF

# Copy all skill folders
SKILL_COUNT=0
for skill_dir in "$SOURCE_DIR"/*/; do
  [ -d "$skill_dir" ] || continue
  skill_name=$(basename "$skill_dir")

  # Skip hidden dirs and non-skill folders
  [[ "$skill_name" == .* ]] && continue
  [ ! -f "$skill_dir/SKILL.md" ] && continue

  # Skip explicitly excluded skills
  excluded=false
  for ex in "${EXCLUDED_SKILLS[@]}"; do
    [ "$skill_name" = "$ex" ] && excluded=true && break
  done
  $excluded && echo "  ⊘ $skill_name (excluded)" && continue

  mkdir -p "$STAGING/skills/$skill_name"
  cp "$skill_dir/SKILL.md" "$STAGING/skills/$skill_name/SKILL.md"

  # Copy optional subdirs
  for subdir in references scripts assets; do
    [ -d "$skill_dir/$subdir" ] && cp -r "$skill_dir/$subdir" "$STAGING/skills/$skill_name/"
  done

  echo "  ✓ $skill_name"
  SKILL_COUNT=$((SKILL_COUNT + 1))
done

# Build ZIP from staging dir, output to absolute path
(cd "$STAGING" && zip -r "$OUTPUT" . -x "*.DS_Store" > /dev/null)
echo ""
echo "✅ Built: $OUTPUT ($SKILL_COUNT skills)"
echo ""
echo "Next: Install via Cowork → Settings → Plugins → Install from file"
