# CLAUDE.md — Agent contract for the ai-creatorship-os

> You are operating inside Michael's AI creative workspace at `AI Creatorship/`. This file is your operating manual. Read it fully before your first write.
>
> **Filesystem is the API.** No DB, no MCP, no SDK. You use bash + Read/Write/Edit to read and write plain markdown and JSON files. The app watches the same files and renders them.

---

## 0. Purpose — what this app is

The app is a wrapper around the chat conversation Michael has with Codex / Claude Code. The conversation does **not** happen inside the app. The agent does the thinking and writing in chat, then uses bash / CLI tools to save the useful artifacts to the project filesystem. The app renders those artifacts so prompts, shots, scene notes, and locks do not get lost.

The app's job:
- render the project directory clearly
- make prompts easy to find, copy, fork, and mark
- show the current scene / shot / character context
- keep the filesystem structure coherent enough that the next agent turn can resume without re-pasting context
- stay out of the conversation flow; it is not an in-app chat, inbox, or task manager

The agent's job:
- use the chat with Michael as the orchestration surface
- read the project files before writing
- create or edit the markdown files that the app renders
- preserve the `kind:` frontmatter graph
- save prompts in the right project directory
- commit meaningful changes in the project repo

Treat chat as the orchestration layer, bash / CLI as the write layer, the filesystem as memory, and the app as the rendering layer. If a prompt only exists in chat, the system failed. If a prompt exists as a `prompt-thread` file with correct frontmatter, the app can hook it up.

Parallel work happens through separate external Codex / Claude Code chats. The app's **Agent Sessions** page copies launch packets for project, direction, scene, and shot scopes. When Michael starts a new thread with one of those packets, treat that scope as your lock: stay inside it unless he explicitly expands it, read the packet files first, write prompts to disk, validate, and commit.

---

## 1. The only rule that matters

**Every `.md` file has frontmatter with a `kind`.** That is the whole schema contract. Everything else — folder layout, file names, how you organize by phase, by character, by anything — is your call.

```yaml
---
kind: prompt-thread
id: turnaround-nbp-initial
scene: 01-tokyo
shot: 01-turnaround
model: nano-banana-pro
media: image
---

# Initial character sheet attempts

## v1

`​``
prompt body here…
`​``
```

The app scans every `.md` file recursively, reads the frontmatter, and builds its hierarchy from `kind` + id references. It does not care where you put the file.

---

## 2. The `kind` ontology (memorize)

| `kind` | Purpose | Required frontmatter | Body |
|---|---|---|---|
| `project` | Project meta | `id` (usually folder name) | Brief, art direction |
| `scene` | A narrative scene | `id`, `title` | Description + storyboard markdown |
| `shot` | A directed moment inside a scene | `id`, `scene`, `title` | Framing, intent, notes |
| `prompt-thread` | A set of iterations of one prompt concept | `id`, `scene`, `shot`, `model`, `media` | `## v1`, `## v2`, … each followed by a fenced code block with the prompt body |
| `character` | A reusable identity lock | `id`, `title` | Identity description + copy-paste slugs in fenced code blocks |
| `location` | A reusable place lock | `id`, `title` | Description + locked details |
| `workflow` | A reusable prompt template | `id`, `applies_to`, `model` | Template with placeholders |
| `direction` | A project direction / creative exploration lane | `id`, `title` | Thesis, visual grammar, constraints, when to use, what to avoid |
| `art-direction` | Project-level aesthetic decisions | `id` | Palette, grain, cadence, references |
| `note` | Catchall / freeform scratchpad | — | Anything |

Unknown `kind`, missing `kind`, or no frontmatter → the app treats it as `note`. It never breaks; unknown content renders in a fallback view.

### Required reference fields by kind

```
kind: shot           needs scene: <scene-id>
kind: prompt-thread  should have scene: <scene-id>, shot: <shot-id>, model: <slug>, media: image|video|audio
                     may have direction: <direction-id>
                     may have starting_frame: <thread-id>#<variation-slug>
                     may have characters: [...], locations: [...]
kind: scene          may have characters: [...], locations: [...]
kind: workflow       needs applies_to: image|video|audio, model: <slug>
```

IDs are **slug-form** (`lowercase-kebab-case`) and **project-scoped unique**. Two different scenes cannot share an id. The app will warn if you duplicate.

The app renders first and warns second. Missing `scene:` / `shot:` references do not make a prompt disappear; the prompt renders under **Unassigned prompts** and Health reports a warning. Do not leave a useful prompt only in chat just because hierarchy is incomplete.

---

## 3. The prompt-thread format (most important)

This is what you write most often. Get it right and the app renders clean prompt cards with copy-paste ready code blocks.

```markdown
---
kind: prompt-thread
id: turnaround-nbp-initial
scene: 01-tokyo-night
shot: 01-turnaround
model: nano-banana-pro
media: image
direction: cold-aristocratic-tokyo
tags: [reference-sheet, identity-lock]
---

# Initial turnaround attempts

Set description — what this thread is exploring, why it exists, what we're trying.

## v1

Notes for v1 (optional prose above the code block — won't be copied to clipboard).

`​``
Subject: mid-20s East Asian woman…
[the full prompt body — this is what gets copied]
`​``

## v2  ★

Notes for v2.

`​``
Subject: same woman, tighter three-quarter framing…
`​``

## v3  📌

`​``
…
`​``

## v4  🗑

Archived — didn't work.

`​``
…
`​``
```

**Flag tokens in heading** — put them after the title text:
- `★` — favorite
- `📌` — pinned (sorts this variation to top of the thread)
- `🗑` — archived (hidden by default in UI)

**Content convention**:
- `# H1` once at the top = thread title (optional; filename used as fallback)
- Prose between H1 and first `## heading` = thread description
- Each `## heading` = one variation (one "iteration" in the thread)
- Prose between `## heading` and the fenced code block = notes for that variation
- The first fenced code block (```) under each `## heading` = the prompt body (copy target)
- Further content under a variation = ignored for copy; kept for humans

**IDs and fragments** — a thread's id is `turnaround-nbp-initial`. A specific variation within it is referenced as `turnaround-nbp-initial#v2`.

---

## 4. Relationships

Use IDs, not paths. The app resolves by id.

```yaml
# In a shot frontmatter — parent pointer to its scene
scene: 01-tokyo-night

# In a scene frontmatter — which characters appear
characters: [driver, mechanic]
location: tokyo-street

# In a video prompt-thread — which image prompt provides the starting frame
starting_frame: turnaround-nbp-initial#v3
```

If you rename an id, update every file that references it. The app doesn't auto-migrate references (yet).

---

## 5. Folder layout: your call

All of these are valid:

```
# Flat (everything at the root)
project.md
character-driver.md
scene-tokyo.md
shot-turnaround.md
thread-turnaround-nbp.md
thread-turnaround-mj.md

# Semantic (grouped by kind)
characters/driver.md
scenes/tokyo.md
shots/turnaround.md
prompts/turnaround-nbp.md

# Deep hierarchy (what the migration from v2.1 produced)
scenes/01-tokyo-night/
  scene.md
  shots/01-turnaround/
    shot.md
    statics/nano-banana-pro/initial.md
    statics/midjourney/initial.md
characters/driver/lock.md

# By phase (exploration → locked)
exploration/
  turnaround-nbp-v1.md
  turnaround-nbp-v2.md
locked/
  turnaround-nbp.md

# Direction-led
directions/
  cold-aristocratic-tokyo.md
scenes/01-tokyo-night/shots/02-manicure/statics/nano-banana-pro/
  cold-aristocratic.md
```

Pick whatever serves the current phase of work. Reorganize when it starts to hurt — the app rebuilds from frontmatter on reload.

**Conventions you might want** (not required):
- Keep characters/locations at the project root so you find them fast.
- One thread per file; name it by intent (`no-gloves.md`, not `v3.md`).
- Multiple prompt variations live inside that one file as `## v1`, `## v2`, etc.
- Use `direction:` when a thread belongs to a larger creative exploration lane.
- Prefix filenames with `NN-` if order matters — the app falls back to alphabetical when no explicit ordering is given.

---

## 6. Reading before writing — the turn protocol

Before writing anything:

```bash
PROJECT=f40-driver-tokyo
cd "AI Creatorship/$PROJECT"

# What's the current shape?
find . -name "*.md" -not -path "*/_*" | head -30

# What did the operator say last?
# (Message logs are deprecated — context lives in file commit messages and shot/scene descriptions now.)

# Read the specific file you're about to modify
cat scenes/01-tokyo-night/shots/01-turnaround/statics/nano-banana-pro/initial.md
```

Writing:

```bash
# Edit a single file (prefer the Edit tool for surgical changes)
# Or use jq-like patches if the file is JSON
# Always preserve frontmatter; never strip it

# Commit when the change is meaningful
git add <specific files>
git commit -m "<what changed>"
```

The server's UI will auto-commit operator-side edits. When you edit via bash, commit yourself.

---

## 7. Creating a new prompt-thread

The common case. The operator asks for "3 angle variations of shot 02-manicure with nbp." You:

1. Decide the thread's id and location. Convention: `<shot-slug>-<model-short>-<intent>.md`. Example id: `02-manicure-nbp-angles`.

2. Choose a path. If the project already has the `scenes/<s>/shots/<sh>/statics/<model>/` pattern, put it there. If it's a new project with a flatter layout, put it wherever fits. **Consistency within a project matters; the exact layout doesn't.**

3. Write the file:

```markdown
---
kind: prompt-thread
id: 02-manicure-nbp-angles
scene: 01-tokyo-night
shot: 02-manicure
model: nano-banana-pro
media: image
tags: [hand, manicure, angle-exploration]
---

# Angle exploration

Three camera angles for the manicure insert — same subject + lighting, camera position varies.

## v1 — overhead macro

`​``
Subject: a bare right hand gripping the top arc of a Momo wheel,
oxblood manicure in macro focus. Camera: overhead…
`​``

## v2 — three-quarter

`​``
Subject: same hand, same wheel, but from three-quarter angle…
`​``

## v3 — profile

`​``
…
`​``
```

4. Commit:

```bash
git add <path>
git commit -m "02-manicure: nbp angle exploration"
```

5. If the operator asks to reference a specific variation: use `02-manicure-nbp-angles#v2`. Say "grab `02-manicure-nbp-angles#v2`" and the operator pastes that into the app to copy the prompt body directly.

---

## 8. Adding a variation to an existing thread

```bash
# Read current state
cat scenes/01-tokyo-night/shots/02-manicure/statics/nano-banana-pro/angles.md

# Append a new ## v4 section — use the Edit tool to insert, or rewrite the whole file
```

Add to the file:

```markdown
## v4 — macro with breath fog

Notes.

`​``
Subject: …
`​``
```

Commit.

---

## 9. Forking a variation (exploring an alternative of v2)

Forking = adding a new variation that starts as a copy of an existing one. Same thread file.

Append:

```markdown
## v5 — from v2, cooler

Forked from v2. Replaced tungsten warmth with cool moonlight.

`​``
Subject: [body of v2 with the adjustments]…
`​``
```

---

## 10. Git — per-project repos + variation branches

Each project is its own git repo. The workspace root and the OS folder have their own separate repos.

### Commit convention
```bash
cd <project-slug>
git add <specific files>
git commit -m "<what changed>"
```

Example messages:
- `02-manicure: nbp angle exploration (3 variations)`
- `02-manicure: v3 refined — tighter focus`
- `driver: lock wardrobe slug updated`

### Variation branches (for risky exploration)
```bash
cd <project>
git checkout -b variation/02-manicure/silver-gloves
# experiment
git commit -am "try silver gloves on 02-manicure"
# if good:
git checkout main
git merge --no-ff variation/02-manicure/silver-gloves
```

Branches are scoped to one project's repo. Touch ONLY files belonging to the branch's scope.

---

## 11. Writing/editing other kinds

### Scene

```markdown
---
kind: scene
id: 01-tokyo-night
title: Tokyo Night
characters: [driver]
location: tokyo-street
---

# Tokyo Night

## Description

…

## Storyboard

…beat-by-beat natural-language storyboard…
```

### Shot

```markdown
---
kind: shot
id: 02-manicure
scene: 01-tokyo-night
title: Manicure on Momo wheel
category: beauty_insert
aspect_ratio: 2.39:1
characters: [driver]
---

# Manicure on Momo wheel

## Description

Beauty insert. Locks the oxblood manicure as a recurring motif.

## Notes

Framing: macro, focus on middle knuckle of index finger.
```

### Direction

```markdown
---
kind: direction
id: cold-aristocratic-tokyo
title: Cold Aristocratic Tokyo
status: exploring
---
# Cold Aristocratic Tokyo

## Thesis

Precise, expensive, emotionally withheld. Cool light, controlled framing, no warmth unless it comes from practical city reflections.

## Use when

- The shot should feel high-status and restrained.

## Avoid

- Cozy warmth, handheld chaos, generic neon cyberpunk.
```

### Character

```markdown
---
kind: character
id: driver
title: F40 Driver
---

# F40 Driver

## Identity
- age: mid-20s
- ethnicity: East Asian
- …

## Slugs (copy-paste ready)

### identity_short

`​``
mid-20s East Asian woman, jet black collarbone hair with two asymmetric face-framing strands, porcelain matte skin, almond dark eyes, nude-mauve matte lips, quiet commander expression
`​``
```

---

## 12. Don'ts

- **Don't silently reshape structure.** If you invent a new `kind` or new required field, ask first, then update this file in the same commit.
- **Don't strip frontmatter.** If you're editing a file, preserve its existing frontmatter and only change what you need.
- **Don't duplicate ids.** Two `scene` kinds with the same id will confuse the app.
- **Don't break references.** Renaming an id without updating every file that references it breaks the graph. Grep first: `grep -r "scene: 01-tokyo" .`
- **Don't force scroll.** If a section (a scene, a shot, a thread) is getting too big, split it — the app prefers many small files to few huge ones.
- **Don't write outside the project folder** unless the operator asks. The workspace root and `_os/` have different lifecycles.
- **Don't use destructive git operations** (`reset --hard`, `push --force`, `clean -fd`) without explicit instruction.

---

## 13. Reading the current state in one shot

```bash
PROJECT=f40-driver-tokyo
cd "AI Creatorship/$PROJECT"

echo "=== kinds present ==="
grep -rh "^kind:" --include="*.md" | sort | uniq -c | sort -rn

echo "=== scenes ==="
grep -rl "kind: scene" --include="*.md" . | xargs -I{} grep -H "^id\|^title" {}

echo "=== shots by scene ==="
grep -rl "kind: shot" --include="*.md" . | xargs -I{} grep -H "^id\|^scene" {}

echo "=== threads for a shot ==="
SHOT=02-manicure
grep -rl "kind: prompt-thread" --include="*.md" . | \
  xargs grep -l "^shot: $SHOT" | \
  xargs -I{} grep -H "^id\|^model\|^media" {}
```

---

## 14. When in doubt

- Folder layout unclear? Match what's already in the project.
- Kind unclear? Default to `note` with a descriptive filename — the app still shows it.
- Schema feels limiting? Propose a new kind to the operator. Never invent one silently.
- Something breaks the app? Check the console in the UI, read the file that failed, fix the frontmatter.

The schema is deliberately thin so you have room to work. Use the room.

---

*Last updated: 2026-04-19. Schema kinds v1.*
