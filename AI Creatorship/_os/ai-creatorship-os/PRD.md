# PRD — ai-creatorship-os

> A filesystem-first creative workspace for AI-generated film. Scene-by-scene iteration with Claude Code (or any LLM agent) as the write surface, a web app as the read/edit surface, and the filesystem as the shared memory.

**Owner:** Michael / laniameda
**Schema version:** 2.1 (scenes + shots + sets)
**Last updated:** 2026-04-19
**Status:** MVP in development

---

## 1. Mission

Iterate on AI creative projects — shots, prompts, character locks, storyboards — **scene by scene, one agent turn at a time**, without losing context, without re-pasting prompts, and without anything fighting the way the operator thinks about a film production.

The app is thin. The filesystem is the product. Running the server IS running the app.

---

## 2. Problem

Current state of AI creative work in chat:

- Prompts get re-pasted every turn, wasting context and creating divergence
- Revisions from the human ("no gloves, manicure only") are easy to lose between sessions
- Character identity locks and brand aesthetic decisions drift across models
- No shared surface where both human and agent see the same state simultaneously
- Iterating on 10+ shots × many prompt revisions × multiple models × a character lock = chat gets unusable
- Existing note tools (Notion, Obsidian) have no concept of prompts, models, variations, or the multi-model pipeline

**What's missing:** a structured persistent artifact that both the human and the agent read/write together, with a UI that treats AI creative concepts (scenes, shots, prompts, characters, locations) as first-class entities.

---

## 3. Core principles

### 3.1 Data structure IS the product
The app is a thin reader/writer over a filesystem contract. Folders encode meaning. When the folder structure is right, agents and the human stay coherent across sessions. When it drifts, nothing works. Maintain it. Update the contract when needed. Never silently reshape.

### 3.2 Adaptive schema
Folders define the schema, not hardcoded JSON fields. Each project can have different structure. See a folder named `nano-banana-pro/` under `statics/`? It's a model. See `recraft/` tomorrow? Same treatment. No config files, no schema migrations for cosmetic changes.

### 3.3 Agent-first UX
Claude Code edits files directly via bash + Read/Write/Edit. No MCP. No SDK bindings. The filesystem contract is the API. A CLAUDE.md at the OS root gives agents the operating manual; a bash helper (`os.sh`) wraps the common operations.

### 3.4 Filesystem-native
No database. No cloud. No accounts. Your creative work is plain markdown + JSON files on disk, under git, portable via zip, debug-able with any text editor. Move to Convex only when multi-device, real-time collaboration, or mobile capture becomes a real requirement — none of which exist today.

### 3.5 One scene at a time
A short has scenes. A scene has shots. A shot has prompts (statics + videos), grouped into sets, each set a notebook of related variations. The UI's primary surface is **one shot at a time**, with scene + shot navigation always visible at the top.

### 3.6 No lock-in per project
The OS doesn't impose a rigid schema. Different projects have different shapes — some have no characters (location-only), some have no videos, some need more models than the defaults. The app reads what's there; it doesn't require what isn't.

---

## 4. Users

### Primary user: the project operator (Michael)
An AI creator iterating on shots many times per scene. Works in flow. Wants to minimize time from "I want this prompt" to "it's in my clipboard."

### Secondary user: Claude (or other LLM agents)
Reads the folder structure at the start of each turn, writes changes back before ending. Doesn't need the UI — works through bash + Read/Write/Edit tools. The agent and the human share state through the filesystem.

### Context of use
Operator has the app open in a Brave/Chrome tab. A chat window with Claude Code is open alongside. Between turns, operator copies prompts from the app, runs generation externally (Nano Banana, Midjourney, Seedance), reviews results, asks Claude to refine prompts. Claude reads files, edits, commits, ends turn. Operator reloads the app.

---

## 5. Data model

### 5.1 Hierarchy (folder structure)

```
project/
  project.md                        Project brief + art direction, free markdown
  project.json                      (optional) stable meta — name, owner, version
  models.json                       (optional) model aliases: {"nbp": "nano-banana-pro", ...}

  characters/                       Reusable identity locks
    driver/
      lock.md                       Identity description + slugs for copy-paste
      refs/                         Reference images

  locations/                        Reusable location locks
    tokyo-street/
      lock.md
      refs/

  workflows/                        Project-level prompt templates (reusable)
    character-sheet.md
    continue-video.md
    upscale-4k.md

  scenes/
    01-arrival/
      scene.md                      Scene description + natural-language storyboard
      shots/
        01-wide-approach/
          shot.md                   Shot description, framing, character/location refs
          statics/
            nano-banana-pro/
              angle-exploration.md  A set of prompts (see §5.3 for set format)
              no-gloves.md          Another set
            midjourney/
              initial-sketches.md
          videos/
            seedance/
              main.md               Video prompts, reference a locked static
            kling/
              v1.md
          generated/                Model outputs, any filename
```

Entries starting with `_` are system (`_archive/`, `_template/`). Projects own the rest.

### 5.2 What must exist vs. what's optional

**Required:** `project.md` (or `project.json`) — anything with a brief is a valid project.

**Everything else is optional.** A project with no characters has no `characters/` folder. A video-only project has only `videos/` under shots. The app renders what's there; missing sections don't break anything.

### 5.3 Prompt set format

A `.md` file inside `statics/<model>/` or `videos/<model>/` is a **set** — a notebook holding 1–N related prompts. Each `## heading` inside is one prompt. The fenced code block under it is the copy-paste body.

```markdown
---
model: nano-banana-pro
shot: 02-manicure
tags: [hand, manicure]
created: 2026-04-19
---

# Angle exploration

Variants of the manicure insert — same subject + lighting, camera position varies.

## v1 — overhead macro    ★

​```
Subject: a bare right hand gripping the top arc of a Momo wheel,
oxblood manicure in macro focus. Camera: overhead. Warm tungsten key…
​```

## v2 — three-quarter    📌

​```
Subject: same hand, same wheel, but from three-quarter angle…
​```

## v3 — profile

​```
Subject: same hand…
​```
```

**Parsing contract:**
- File-level frontmatter (YAML) → set metadata (model, tags, created, etc.)
- `# heading` at top → set title (optional; default to filename)
- Prose between headings → notes, shown as card preamble
- `## heading` → one prompt; heading text is the variation title
- `★ 📌 🗑` tokens in the heading → flags (favorite / pinned / archived)
- Fenced code block (``` ```) under a heading → the copy-paste body
- Multiple code blocks under one heading are allowed; first is primary

**Why one file per set instead of file per prompt:**
- File explosion is worse than heading count inside a file
- Related variations belong together (easy diffing, easy context for agent)
- Agents can generate a batch with a single write
- Naming sets by intent ("no-gloves", "angle-exploration") is more meaningful than v1/v2/v3

### 5.4 ID scheme

Two address formats for every prompt:

- **Short ID**: `<scene-slug>/<shot-slug>/<model-alias>/<set-slug>#<variation>`
  Example: `02-pursuit/02-manicure/nbp/angle-exploration#v2`

- **Minimal ID** (when contextually clear): `02/02/nbp/angle-exploration#v2`
  Uses the numeric prefix of scene/shot slugs. The agent resolves by prefix match.

- **Set ID** (no fragment): `02/02/nbp/angle-exploration` addresses the whole file.

- **Full ID** (cross-project): `<project-slug>:<short-id>`

The ID is the filesystem path + heading fragment. Agent reads the file and finds the matching `## heading` to locate the prompt. Model aliases come from `project/models.json` (defaults: `nbp`, `mj`, `sd`, `kl`, `lu` for nano-banana-pro, midjourney, seedance, kling, luma).

### 5.5 Usage state (not versioned)

`.usage.json` at the project root tracks which prompts the operator has copied.

```json
{
  "copied": {
    "02/02/nbp/angle-exploration#v2": { "lastAt": "...", "count": 3 }
  }
}
```

Gitignored — usage is personal, not canon. The app renders "used" cards with an orange indicator.

---

## 6. UX

### 6.1 Navigation model (Option A — horizontal strips)

No canvas, no drawers, no tall scrollable documents. Two persistent horizontal strips for scene and shot navigation; the rest of the screen is the active shot.

```
┌──────────────────────────────────────────────────────────────┐
│ F40 Tokyo               ⌘K  ☀  ↶↷  save                       │  top bar
├──────────────────────────────────────────────────────────────┤
│ scenes: [01 arrival] [02 pursuit●] [03 close-up] [+]           │  strip 1
├──────────────────────────────────────────────────────────────┤
│ shots:  [01 wide] [02 manicure●] [03 mirror] [04 tacho] [+]    │  strip 2
├──────────────────────────────────────────────────────────────┤
│                                                              │📖│
│  Shot 02 · manicure on wheel       id: 02/02                 │⎯ │  ← scene-brief peek tab
│                                                              │  │
│  ─ description (inline-edit) ─                                │  │
│                                                                 │
│  ═══ STATICS · nano-banana-pro ═══                  [+ new set]│
│                                                                 │
│   Angle exploration       02/02/nbp/angle-exploration 📋        │
│   ╔═══════╗ ╔═══════╗ ╔═══════╗                                │
│   │v1 ★   │ │v2 📌  │ │v3     │   ← masonry                     │
│   ╚═══════╝ ╚═══════╝ ╚═══════╝                                │
│                                                                 │
│   No gloves               02/02/nbp/no-gloves 📋                │
│   ╔═══════╗ ╔═══════╗                                          │
│   │v1     │ │v2     │                                          │
│   ╚═══════╝ ╚═══════╝                                          │
│                                                                 │
│  ═══ VIDEOS · seedance ═══  starts from 02/02/nbp/v2 [+ new set]│
│                                                                 │
├──────────────────────────────────────────────────────────────┤
│ [🎬 shot] [📝 brief] [⚙ project] [👤 characters] [⚡ workflows]│  dock (page switcher)
└──────────────────────────────────────────────────────────────┘
```

### 6.2 Dock = page switcher (not floating panels)

Each dock tab swaps the main area to a full page. Shot is the default.

| Tab | Page |
|---|---|
| 🎬 Shot | Horizontal strips + masonry of prompts for the active shot |
| 📝 Brief | Project brief + art direction (large editable markdown surface) |
| ⚙ Project | Meta, references, workflow notes, settings |
| 👤 Characters | Grid of character lock cards; click to edit |
| 📍 Locations | Grid of location lock cards; click to edit |
| ⚡ Workflows | Grid of reusable prompt templates |

### 6.3 Masonry grid (the core surface)

- **Sets grouped by heading row** — set name (large) + copyable set ID (mono) + `[+ new variation]` action
- **Masonry inside each set** — CSS `column-width: 280px`, `break-inside: avoid`
- **Model section headers** — separate NBP from MJ from Seedance visually
- **Flow top-to-bottom within each section**

### 6.4 Prompt card states

```
UNUSED (default)                 USED (after copy)
╔═══════════════════╗            ╔═══════════════════╗
║ v2 — three-quarter║            ║ v2 — three-quarter●║   (orange dot)
║ ★ 📌              ║            ║ ★ 📌              ║
║ #v2         📋id  ║            ║ #v2         📋id  ║
║ ───────────────── ║            ║ ───────────────── ║   (orange left border)
║ [prompt body,      ║            ║ [prompt body,      ║
║  click to edit]    ║            ║  click to edit]    ║
║                     ║            ║                     ║
║ [📋 copy][⎇][🗑]   ║            ║ [📋 copy][⎇][🗑]   ║
╚═══════════════════╝            ╚═══════════════════╝
```

Orange = amber `#f5a623` (unifies with existing `warn` status color).

Copy actions:
- **📋 id** (header) → copies prompt ID (`02/02/nbp/angle-exploration#v2`)
- **📋 copy** (footer) → copies prompt body (fenced code block content)
- **📋 set-id** (set header) → copies set ID

Other actions:
- **★** → toggle favorite (frontmatter / token in heading)
- **📌** → toggle pin (sort this variation to top of its set)
- **⎇ fork** → append `## v<n+1>` to same file with current body
- **🗑 archive** → toggle archive token in heading (hidden by default, shown with "show archived" filter)
- **⋯ menu** → rename, mark unused, view history, log revision
- **Click body** → becomes textarea for inline edit; ⌘Enter or blur to save

### 6.5 Scene-brief peek

A slim pull-tab on the right edge of the masonry. Click → panel slides in showing the scene's `scene.md` content (description + storyboard + character/location tags). Not a drawer — content is small (1–3 paragraphs typically), no internal scroll expected.

- Collapsed: a 📖 icon + slim handle, always visible on the right edge
- Expanded: 420px wide overlay with backdrop; masonry faintly visible behind
- Keyboard: `⌘.` to toggle
- Auto-closes when user clicks a prompt card (stays out of the way)
- Content editable in place

### 6.6 Landing page (no active project)

Card grid of projects in the workspace + a "+ new project" card. Click a card → enters the shot view for that project.

The "+ new project" modal asks for a slug (lowercase kebab-case), calls `POST /__os/new-project`, which runs `os.sh new-project <slug>` server-side. Project is scaffolded from `_template/`, its own git repo is initialized, and the user is dropped into the new project.

### 6.7 Keyboard shortcuts

- `←` / `→` — next/prev shot within scene
- `⌘←` / `⌘→` — next/prev scene
- `⌘K` — command palette (fuzzy jump anywhere)
- `⌘.` — toggle scene-brief peek
- `⌘S` — save
- `⌘Z` / `⌘⇧Z` — undo / redo (outside text inputs)
- `⌘Shift+C` — copy focused prompt + mark used
- `esc` — close peek, cancel inline edit, zoom out

### 6.8 Themes

Dark (default) and light. Vercel-style in both. CSS variables define the palette; light theme overrides under `[data-theme="light"]`. Persisted in localStorage; respects `prefers-color-scheme` on first visit. Sun/moon toggle in top bar.

---

## 7. Agent contract (CLAUDE.md at OS root)

Agents working in the workspace follow the bash-based contract in `_os/ai-creatorship-os/CLAUDE.md`:

1. **Read current state before writing.** `cat project.md`, `ls scenes/`, `tail messages/...` (if any).
2. **One set per edit per turn.** Touch exactly the file for the prompt(s) being changed.
3. **Append to message logs — never mutate.** (Though messages are now deprecated; see §9.)
4. **Commit after meaningful writes.** `git add` + `git commit` in the project's repo.
5. **Never silently reshape structure.** Ask before adding new folders/fields.
6. **Update EXPLAINER.md** when reusable learnings surface.

The full contract lives in `_os/ai-creatorship-os/CLAUDE.md` with bash recipes, git workflow, schema reference, and error handling.

---

## 8. Git model

**Three independent repos:**

- **OS repo** at `_os/ai-creatorship-os/` — tracks the tool's own code, docs, helpers
- **Per-project repo** at `<project-slug>/` — tracks one creative project; variation branches live here
- **Workspace root** (`AI Creatorship/`) — **not** a git repo

**Variation branches** are scoped to a single project's repo. Naming: `variation/<scope>/<slug>` (e.g., `variation/shot_02/silver-gloves`). Exploring F40 alternatives never touches ferrari-amg.

**Auto-commit on save** — app POSTs `/__os/commit` to the server after writing files. Server runs `git add -A && git commit -m "<message>"` inside the project's repo. Graceful fallback if the project isn't a git repo.

---

## 9. Deprecated / removed

Things we explicitly dropped during design:

- **Monolithic `storyboard.json`** — split into folder-based v2 schema
- **Messages subsystem** — `messages/user-to-claude.jsonl` + `claude-to-user.jsonl` were underused; coordination happens via git commits + direct file edits
- **Drawers** — sliding side panels that force internal scrolling; replaced by inline edit + small peeks
- **Dropdown project picker** — replaced by card grid landing
- **File-per-prompt** — replaced by set-per-file (heading = prompt)
- **MCP servers** — agents use bash + filesystem, no MCP layer
- **Zoomable canvas** (briefly considered) — navigation via horizontal strips instead

---

## 10. Technical stack

| Component | Choice | Why |
|---|---|---|
| Language | TypeScript 5.6, strict | Catches schema drift at compile time |
| Bundler | esbuild | Fast, zero config |
| Runtime | Plain DOM + custom helpers | No framework — keeps bundle tiny, honest to filesystem contract |
| Styling | CSS custom properties + vanilla CSS | Theme swap via data-attribute |
| Fonts | Geist + Geist Mono | Vercel-style aesthetic |
| Server | Node HTTP (`node:http`) | No Express, no dependencies beyond stdlib + esbuild/typescript devDeps |
| File ops (browser) | File System Access API | Direct read/write to disk, no upload |
| File ops (agent) | bash, jq, git | Agent native tools |
| Markdown parsing | Custom lightweight parser | Only needs to extract frontmatter + h2 sections + fenced code blocks |
| State | Singleton + pub/sub | ~100 LOC; no Redux/Zustand needed |
| Git | Shell-out from server (`child_process.spawn`) | One-line commits, no libgit2 dep |

**Build**: `npm run build` → single `storyboard.html` (~45–60 KB).
**Start**: `npm start` → server.mjs, port 5173.
**Dev**: `npm run dev` → watch + rebuild.

---

## 11. Current status (as of 2026-04-19)

| Capability | State |
|---|---|
| Workspace reorg (`_os/`, `_kb/`, `_template/`, per-project folders) | ✓ |
| Per-project git + server auto-commit | ✓ |
| Server (npm start) + dev (npm run dev) | ✓ |
| Landing page with project cards + new-project modal | ✓ |
| Old: kanban board by status (to be retired) | ✓ existed |
| Old: flat shots in `storyboard.json` | ✓ migrated but still present |
| **Scenes/shots/sets folder structure** | In progress |
| **Markdown parser for prompt sets** | In progress |
| **Masonry layout for prompt cards** | In progress |
| **Used-state tracking (`.usage.json`)** | In progress |
| **Scene-brief peek** | In progress |
| Characters page | Planned (after masonry lands) |
| Locations page | Planned |
| Workflows page | Planned |
| Command palette (⌘K) | Planned |
| File-watcher → auto-reload | Deferred |
| Variation branch UI (diff view) | Deferred |

---

## 12. Roadmap

### v0.3 — Scenes + shots + masonry (current)
- Scenes/shots folder structure
- Set-per-file markdown parsing
- Masonry with grouping + used state
- Scene-brief peek
- Dock with Shot + Brief tabs functional
- Migration of f40-driver-tokyo

### v0.4 — Context pages
- Characters tab: grid + editor for lock.md files
- Locations tab: same
- Workflows tab: list of templates + "apply to shot" flow
- Command palette (⌘K)

### v0.5 — Variations UI
- Branch picker in top bar when a project has variation branches
- Diff view: current vs. another branch for a shot
- Merge winner / keep-as-history

### v0.6 — Auto-sync
- File watcher in server → SSE stream → app auto-reloads when Claude writes via bash
- No more manual "Reload from disk" click

### v0.7 — Cross-project library
- Workspace-level `_kb/favorites/` pulling starred prompts from all projects
- Reuse a prompt from project A into project B

### v1.0 — Ship
- Documentation
- Onboarding for a new creator (not Michael-specific)
- Maybe consider packaging as a Mac app (Tauri?) for non-terminal users

---

## 13. Out of scope

- **Cloud sync / multi-device.** Move to Convex when a second device or collaborator becomes a real requirement.
- **Mobile.** Desktop-only. File System Access API doesn't exist on iPhone Safari.
- **Direct model invocation.** The app manages prompts and state, not generation. User runs the models externally (Nano Banana web, Midjourney Discord, Seedance API) and pastes results back.
- **Generic chat UI.** There's no "chat with Claude here" box — Claude runs in Claude Code / terminal, reads files, writes files, commits.
- **Authentication / accounts.** Single-user, single-machine by design.
- **Cross-project collaboration.** A project is self-contained; collaboration = git, not a sharing layer.

---

## 14. Success criteria

1. **Prompt iteration latency < 10 seconds** from "I want to try this variation" → "the prompt is in my clipboard." Includes: opening the shot, finding the set, clicking copy.
2. **Zero re-paste** of prompts or character locks across agent turns. Agent reads the file, writes the file.
3. **Schema works for ≥ 3 real projects** with materially different shapes (character-driven, car-driven, location-driven) without code changes.
4. **New project to first prompt in under 60 seconds** — click "+ new project", name, scaffold, agent generates first set.
5. **Agent onboarding from CLAUDE.md in one read** — any Claude session in a new conversation can be productive after reading `_os/ai-creatorship-os/CLAUDE.md` without ambient knowledge.

---

## 15. Open questions

- Locations tab: separate dock tab or fold into Characters? *(Leaning: separate tab.)*
- Model alias scheme: project-level or workspace-level? *(Leaning: project-level with workspace defaults.)*
- Workflow template application: in-UI slot-fill or agent-driven? *(Leaning: agent-driven. User asks "apply character-sheet to driver", Claude reads the template, fills it, writes a set file.)*
- When to consider Convex: first sign of mobile or multi-device need. Not before.
- Versioning of "refinements" vs "variations": filename = variation; git history = refinement log. Confirmed.

---

*v1 authored 2026-04-19, superseding app-PRD.md (v1.0 dated 2026-04-18). This doc is the authoritative product spec.*
