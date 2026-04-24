# ai-creatorship-os

Filesystem wrapper around Michael's chat with Codex / Claude Code.

The conversation happens here in chat, not inside the app. The agent uses bash / CLI tools to write markdown files. The app renders those files so Michael can find, copy, fork, and track prompts without losing work in chat.

## Purpose

The app is not the authoring engine and it is not the conversation surface. Codex / Claude Code chat is the authoring and orchestration surface.

The app's job:
- render the project directory clearly
- make prompts easy to copy, fork, filter, and mark
- show current scene / shot / character context
- expose schema health problems before they break a session
- keep the next agent turn resumable from disk
- stay focused on rendering saved creative artifacts, not replacing chat

The agent's job:
- use the chat with Michael to decide what to create or revise
- read project files before writing
- create or edit markdown files with `kind:` frontmatter
- save every useful prompt as a `prompt-thread`
- preserve scene / shot / model references
- validate and commit meaningful changes in the project repo

If a prompt only exists in chat, the system failed. If it exists as a valid `prompt-thread`, the app can hook it up.

## Run

```bash
cd _os/ai-creatorship-os/app
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

In the browser, click **Open workspace** and choose the `AI Creatorship/` folder.

Production build:

```bash
cd _os/ai-creatorship-os/app
npm run build
npm start
```

The app runs on Next.js App Router. The old single-file HTML bundle is still available as a fallback:

```bash
npm run legacy:build
npm run legacy:start
```

## Current Schema

Every `.md` file may declare a `kind` in YAML frontmatter. The app recursively scans markdown files and builds the graph from frontmatter.

Unknown kind, missing kind, or no frontmatter becomes `note`.

Core kinds:

| kind | Purpose |
|---|---|
| `project` | Project brief and art direction |
| `scene` | Narrative scene |
| `shot` | Directed moment inside a scene |
| `prompt-thread` | Prompt set with one or more variations |
| `character` | Identity lock / character slugs |
| `location` | Location lock |
| `workflow` | Reusable template or process |
| `direction` | Project direction thread: visual grammar, thesis, constraints |
| `art-direction` | Aesthetic decisions |
| `note` | Catchall |

Required relationships:

```yaml
kind: shot
id: 001-anchor
scene: 01-opening

kind: prompt-thread
id: 001-anchor-nano-banana-pro-initial
scene: 01-opening
shot: 001-anchor
model: nano-banana-pro
media: image
direction: initial-direction
```

Relationships are rendered tolerantly. Missing `scene:` / `shot:` links show as Health warnings and the prompt still appears under **Unassigned prompts**. Agents should preserve links when they know them, but they should still save useful prompts even when the hierarchy is incomplete.

## Recommended Project Shape

Folder layout is flexible, but new projects should start like this:

```text
project/
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
```

The app does not rely on this path shape. It relies on frontmatter. The path shape is for human and agent sanity.

## Prompt Thread Format

```markdown
---
kind: prompt-thread
id: 001-anchor-nano-banana-pro-initial
scene: 01-opening
shot: 001-anchor
model: nano-banana-pro
media: image
tags: [identity, first-pass]
direction: cold-aristocratic-tokyo
---
# Initial

What this prompt set explores.

## v1

Notes for the human/agent. Not copied by the main prompt button.

`​``
Prompt body copied by the app.
`​``

## v2 ★

`​``
Favorite variation body.
`​``
```

Heading flags:
- `★` favorite
- `📌` pinned
- `🗑` archived, hidden by default

The app copies the first fenced code block under a `##` heading.

## Agent Harness

Use the helper from the workspace root or OS folder:

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

1. Read context with `os.sh context`.
2. Read the listed files.
3. Create or edit the smallest relevant markdown file.
4. Preserve `kind:` frontmatter. For prompts, prefer one prompt-thread file per concept and multiple `##` variations in that file.
5. Validate with `os.sh validate`.
6. Commit inside the project repo.
7. Tell Michael the prompt IDs created or changed.

## Browser UI

Main surfaces:

- project picker
- scene strip
- shot strip
- prompt cards grouped by active shot
- fallback **Unassigned prompts** scene for prompt threads with missing links
- **Agent Sessions** dock page for launching separate Codex / Claude Code threads from project, direction, scene, or shot scope packets
- right-edge context explorer
- **Health** dock page for graph validation
- **copy agent context** button on the shot page

The Sessions page does not manage conversations inside the app. It copies a launch packet for a new external Codex / Claude Code chat. Use one packet per parallel workstream when Michael wants multiple projects, directions, scenes, or shots moving at the same time.

Browser edits write directly to disk via the File System Access API. Next route handlers commit changed paths in the project repo when possible.

## Control Endpoints

- `GET /__os/status` → rewrites to `GET /api/os/status`
- `POST /__os/commit` → rewrites to `POST /api/os/commit`
- `POST /__os/new-project` → rewrites to `POST /api/os/new-project`

`POST /__os/commit` accepts:

```json
{ "slug": "project-slug", "message": "save (UI)", "paths": ["path/from/project/root.md"] }
```

When `paths` is present, only those paths are staged.

## Legacy

Older projects may still contain:

- `project.json`
- `shots/*.json`
- `storyboard.json`
- `messages/*.jsonl`

Those are legacy artifacts from the JSON storyboard schema. The current app renders markdown `kind:` files.

Use:

```bash
node app/migrate-to-scenes.mjs <project-dir>
node app/migrate-to-kinds.mjs <project-dir>
```

Then run:

```bash
_os/ai-creatorship-os/bin/os.sh validate <project>
```

If validation reports mismatched IDs, fix the frontmatter so `shot:` values in prompt threads match `id:` values in shot docs.
