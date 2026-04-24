# AI Creatorship — Workspace

Michael's creative production workspace for AI image, video, prompt, storyboard, and visual-direction projects.

The core principle: **the filesystem is the memory surface.** The creative conversation happens in chat with Codex / Claude Code. The agent writes project files with bash / CLI tools. The OS app renders those files so prompts do not get lost in chat.

## Layout

```text
AI Creatorship/
  README.md
  CLAUDE.md

  _os/
    ai-creatorship-os/      App + agent harness.

  _kb/                      Shared prompt techniques and reusable packs.
  _template/                Markdown-first starter project.

  <project-slug>/           One creative project per folder.
    project.md
    characters/
    locations/
    workflows/
    scenes/
    assets/
    EXPLAINER.md
```

Entries starting with `_` are system/shared folders, not projects.

## What The OS Is

`_os/ai-creatorship-os/` is a wrapper around the chat-based Codex / Claude Code workflow.

The app is not an in-app chat, inbox, or task manager. The agent writes markdown files with `kind:` frontmatter. The app scans those files and renders:

- projects
- scenes
- shots
- prompt threads
- directions
- character/location locks
- reusable workflows
- agent session launch packets
- graph health issues

If a prompt is useful, it should exist as a `prompt-thread` file by the end of the agent turn.

Use **Agent Sessions** when work needs to split across multiple Codex / Claude Code chats. Copy a project, direction, scene, or shot packet from the app, paste it into a new external chat, and that chat is now locked to that scope.

## Canonical Markdown Contract

Every `.md` file can declare a `kind`:

```yaml
---
kind: prompt-thread
id: 001-anchor-nano-banana-pro-initial
scene: 01-opening
shot: 001-anchor
model: nano-banana-pro
media: image
direction: initial-direction
---
```

Core kinds:

| kind | Purpose |
|---|---|
| `project` | Brief and art direction |
| `scene` | Narrative scene |
| `shot` | Directed moment inside a scene |
| `prompt-thread` | Prompt set with variations |
| `character` | Identity lock |
| `location` | Location lock |
| `workflow` | Reusable process/template |
| `direction` | Creative exploration lane / visual thesis |
| `art-direction` | Aesthetic decisions |
| `note` | Catchall |

Prompt variations are `##` headings with fenced code blocks:

```markdown
## v1

Notes.

`​``
Prompt body copied by the app.
`​``
```

Default storage rule: one prompt-thread file per concept, multiple variations per file. Missing `scene:` / `shot:` links are warnings, not blockers; the app renders those prompt files under **Unassigned prompts** so agents can save useful work before the hierarchy is perfect.

## Recommended Project Shape

```text
<project-slug>/
  project.md
  directions/
    initial.md
  characters/
    subject/
      lock.md
      refs/
  scenes/
    01-opening/
      scene.md
      shots/
        001-anchor/
          shot.md
          statics/
            nano-banana-pro/
              initial.md
          videos/
            seedance/
              main.md
          generated/
  assets/
    refs/
    generated/
  EXPLAINER.md
```

The app builds from frontmatter, not paths. Paths are still important because agents and humans need a stable place to work.

## Agent Harness

Use:

```bash
_os/ai-creatorship-os/bin/os.sh list
_os/ai-creatorship-os/bin/os.sh inspect <project>
_os/ai-creatorship-os/bin/os.sh context <project> [scene-id] [shot-id]
_os/ai-creatorship-os/bin/os.sh new-project <slug>
_os/ai-creatorship-os/bin/os.sh new-direction <project> <direction-id> [title]
_os/ai-creatorship-os/bin/os.sh new-scene <project> <scene-id> [title]
_os/ai-creatorship-os/bin/os.sh new-shot <project> <scene-id> <shot-id> [title]
_os/ai-creatorship-os/bin/os.sh new-thread <project> <scene-id> <shot-id> <model> <media> <intent> [direction-id]
_os/ai-creatorship-os/bin/os.sh validate <project>
_os/ai-creatorship-os/bin/os.sh save <project> "<message>"
```

Agent turn protocol:

1. Run or read `os.sh context`.
2. Read the listed files.
3. Edit or create the smallest relevant markdown file.
4. Preserve `kind:` frontmatter and ID references.
5. Run `os.sh validate`.
6. Commit meaningful changes inside the project repo.
7. Report the prompt IDs changed.

## Running The App

```bash
cd _os/ai-creatorship-os/app
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

In the browser, choose this folder as the workspace:

```text
/Users/michael/work/laniameda/laniameda-hq/AI Creatorship
```

Production mode:

```bash
cd _os/ai-creatorship-os/app
npm run build
npm start
```

The app is a Next.js App Router project. Legacy single-file HTML scripts remain available as `legacy:*` scripts during migration.

## Git Model

- `_os/ai-creatorship-os/` is its own git repo.
- Each creative project is its own git repo.
- The workspace root is intentionally not a git repo.

Variation branches live inside the project repo:

```bash
cd <project-slug>
git checkout -b variation/<shot-id>/<name>
```

## Active Projects

| Project | Slug | Status | Notes |
|---|---|---|---|
| F40 Driver — Tokyo | `f40-driver-tokyo` | active | Markdown scene project, migrated from JSON. Validate before writing. |
| Ferrari + AMG — Forest Race | `ferrari-amg` | active | Markdown + locations/characters/scenes complete. Scene 01 has 7 shots + raw clip bank + continuation prompts. |
| Porsche 911 964 Cinema | `porsche-911-964-cinema` | active | Canonical schema from day one. Two scenes so far: `01-opening` (7 shots) and `threshold-melted-wall` (4 shots). |
| Ice Queen × F40 | `ice-queen-f40` | archived | Earlier iteration. Leave unless revisited. |

## Legacy

Old files may still exist in migrated projects:

- `project.json`
- `shots/*.json`
- `storyboard.json`
- `messages/*.jsonl`

The current app renders markdown `kind:` files. Treat JSON files as legacy unless a specific migration task says otherwise.

Last updated: 2026-04-19.
