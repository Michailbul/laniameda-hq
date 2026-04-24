# AI Creatorship — Workspace Cleanup Report

> Output of the scheduled `cleanup-org` task.
> **Run date:** 2026-04-24
> **Previous run:** 2026-04-23
> **Agent scope:** read-only map of the workspace plus one small in-place edit (workspace `README.md` active-projects table — see §2). No files were moved, renamed, or deleted this run. `.DS_Store` sandbox delete was attempted again and refused again.

---

## 1. What This Report Does

The scheduled task brief: *"Organize the files in the AI creatorship project. Label the files, sort them properly. For every project currently in progress, organize the directory simply — no overthinking, no dumping. Look for the project documentation — organize it if it's present to one canonical document. Don't hallucinate — only rely on what already exists; when it's missing, add it to the task list. Make AI Creatorship a master folder for work with AI and creating commercials / videos / films. Pillars: Location · Brief · Characters · Scenes · Storyboard."*

So this report:

1. Confirms the canonical entry document for each project (one per project — **no new docs invented**).
2. Maps each project against the five target pillars: **Location · Brief · Characters · Scenes · Storyboard**.
3. Records what has changed since the 2026-04-23 run.
4. Lists every remaining gap and naming-rule deviation as an open task for Michael.
5. Does **not** silently reshape anything that the workspace's own `README.md` and `CLAUDE.md` flag as convention-governed.

---

## 2. Actions Performed This Run

One small, reversible edit was made directly because it only touched the workspace's own navigation document and the underlying facts are on disk:

- **Root `README.md` — active-projects table brought up to date.** The previous run's §6 flagged the table as stale. This run the table was updated in-place to: add `porsche-911-964-cinema` as *active* (it has matched the canonical template since 2026-04-23, added a second scene `threshold-melted-wall` this run); and flip `ferrari-amg` from *paused* to *active* (it has a populated `scenes/`, `directions/`, `characters/`, `locations/`, `prompts/`, `workflows/`, `tools/`, and a new `videos/seedance/driver-communication.md` prompt-thread). No creative content was touched. Diff is one table; Michael can revert by reinstating the old three-row version.

Everything else in this report is observation only. The file moves the previous run did (five research JSONs into `_kb/research/`, stray PNG into `_kb/orphans/`) are still in place and needed no follow-up.

---

## 3. Top-Level Inventory (2026-04-24)

```text
AI Creatorship/
├── CLAUDE.md                         ← ground-truth rules for agents
├── README.md                         ← workspace map + active-projects table (updated this run)
├── CLEANUP-REPORT.md                 ← this file (overwritten this run)
├── AGENTS.md -> CLAUDE.md            ← symlink, ok
├── _kb/
│   ├── prompt-techniques/            ← shared prompt knowledge
│   ├── character-sheet-pack/         ← reusable identity-lock pack
│   ├── research/                     ← web-search snapshots + labelled README
│   └── orphans/                      ← 2 PNGs still awaiting a home (unchanged from 2026-04-23)
├── _os/ai-creatorship-os/            ← storyboard app (Next.js + harness CLI)
├── _template/                        ← boilerplate for new projects (canonical schema)
├── f40-driver-tokyo/                 ← ACTIVE · canonical-schema project
├── ferrari-amg/                      ← ACTIVE · markdown + scene-driven + populated
├── ice-queen-f40/                    ← ARCHIVED · markdown-only
└── porsche-911-964-cinema/           ← ACTIVE · canonical-schema · TWO scenes now (new this run)
```

The only non-structural file at the workspace root is still the `.DS_Store` (sandbox still blocks deletion — confirmed again this run, `rm: Operation not permitted`).

---

## 4. Canonical Documentation — One Per Project

The workspace rule is that `_template/` defines the canonical shape (`project.md` + `EXPLAINER.md` + `characters/` + `scenes/` + `directions/` + `assets/`). Legacy projects are allowed to keep their own shape until next touched (per root `README.md`). "One canonical document per project" is interpreted as **the single file an agent or Michael should open first to orient.**

| Project | Canonical entry doc | Supporting | Status | Why this one |
|---|---|---|---|---|
| `f40-driver-tokyo/` | `project.md` | `EXPLAINER.md`, `project.json`, `storyboard.json` | ACTIVE | `project.md` is the canonical kind-tagged brief. `EXPLAINER.md` is the narrative north star. `project.json` and `storyboard.json` remain as structured data. |
| `ferrari-amg/` | `project.md` | `README.md` (navigation), `directions/*.md`, `art-direction/forest-race-grade.md` | ACTIVE | `project.md` is the kind-tagged brief the app reads. `README.md` at the project root is the human navigation layer and scene table. No `EXPLAINER.md` exists — `project.md` + `README.md` together do that job here. |
| `ice-queen-f40/` | `README.md` | `locks.md`, `shot-list.md`, `mj-prompts.md`, `nb2-prompts.md`, `seedance-prompts.md` | ARCHIVED | Single-file-per-concern layout. `README.md` is the canonical orientation doc. No `project.md` exists (still). |
| `porsche-911-964-cinema/` | `project.md` | `EXPLAINER.md`, `directions/initial.md`, `scenes/01-opening/scene.md`, `scenes/threshold-melted-wall/scene.md` | ACTIVE | Canonical kind-tagged markdown from day one. Matches `_template/` exactly. |

**No consolidation was performed** because every project already has exactly one "open this first" document. Creating an additional master doc would duplicate content and violate the no-hallucination / no-dumping rule in the task brief.

---

## 5. Pillar Coverage Matrix — Location · Brief · Characters · Scenes · Storyboard

✅ = artifact exists on disk today. ⚠ = partial. ❌ = missing. Paths are relative to each project's root.

### 5.1 `f40-driver-tokyo/` — active

| Pillar | Status | Evidence |
|---|---|---|
| **Location** | ⚠ | Treatment describes Tokyo night inside `project.md` and `EXPLAINER.md` §1, but `locations/` folder is empty. No `locations/<slug>/lock.md` exists. |
| **Brief** | ✅ | `project.md` (kind: project) + `project.json` → `brief`, `treatment`, `overview.act_1/2/3`; `EXPLAINER.md` §1. |
| **Characters** | ✅ | `characters/f40-driver/lock.md` + `character-lock.json` at project root (5.5 KB identity lock) + `characters/f40-driver/refs/`. |
| **Scenes** | ✅ | `scenes/01-tokyo-night/scene.md`. |
| **Storyboard** | ✅ | `storyboard.json` (30 KB, 10 shots) + `shots/shot_001…shot_010_*.json` (legacy, flat) + `scenes/01-tokyo-night/shots/001-turnaround…010-hero_car/shot.md` with `statics/midjourney/initial.md` and `statics/nano-banana-pro/initial.md` per shot. |

Unchanged from 2026-04-23. The `locations/` folder is still empty — downgraded from ✅ to ⚠ this run to match the actual disk state (the previous run credited the `project.md` treatment as sufficient; the stricter reading is that a kind-tagged `location` file is missing).

### 5.2 `ferrari-amg/` — active

| Pillar | Status | Evidence |
|---|---|---|
| **Location** | ✅ | `locations/european-forest-road/lock.md` + `locations/european-forest-road/refs/`. |
| **Brief** | ✅ | `project.md` (kind: project) + `README.md` (kind: workflow, navigation). |
| **Characters** | ✅ | `characters/ferrari-812-superfast/lock.md` (+ `character-sheet-prompts.md` + `refs/`), `characters/mercedes-amg-gt3/lock.md` (+ `refs/`). New this run: `characters/img-ferrari-driver-character-pack.gallery-ingest.json` — a locally-prepared gallery ingest pack (see §6). |
| **Scenes** | ✅ | `scenes/01-forest-race/scene.md` with 7-shot list; 7 shot folders (`01-squirrel-intro` through `07-ending-return-to-stillness`), each with `shot.md` + `videos/`. |
| **Storyboard** | ⚠ | The 7 `shot.md` files + `scene.md` act as the storyboard in scene order. Still no single consolidated `storyboard.json` or `storyboard.md` index — the project `README.md` scene table is the closest thing. (Unchanged from 2026-04-23.) |

Notable additions since last run: `scenes/01-forest-race/shots/04-chase-action/videos/seedance/driver-communication.md` — new kind-tagged prompt-thread with 5 variations covering interior driver-reveal beats. Properly scoped and frontmattered; no move needed.

### 5.3 `ice-queen-f40/` — archived

| Pillar | Status | Evidence |
|---|---|---|
| **Location** | ✅ | `locks.md` → ENVIRONMENT LOCK blocks for both RED (elevator) and GRAY (Tokyo exterior) modes. |
| **Brief** | ✅ | `README.md`. |
| **Characters** | ✅ | `locks.md` → CHARACTER LOCK + F40 LOCK. |
| **Scenes** | ⚠ | No scenes directory. Project is structured as two "modes" (red / gray) and a 10-shot still list — not as discrete scenes. Modes ≈ scenes but never explicitly labelled. |
| **Storyboard** | ✅ | `shot-list.md` (10 stills across the 2 modes) + `nb2-prompts.md`, `mj-prompts.md`, `seedance-prompts.md`. |

Unchanged from 2026-04-23. Status remains archived.

### 5.4 `porsche-911-964-cinema/` — active

| Pillar | Status | Evidence |
|---|---|---|
| **Location** | ❌ | Described inline inside `project.md` and both `scene.md` files, but no `locations/` folder exists yet. (Flagged last run — still missing.) |
| **Brief** | ✅ | `project.md` (kind: project) with runtime target, art direction, visual continuity lock, and transition idea. |
| **Characters** | ✅ | `characters/subject/lock.md` (white Porsche 911 964 Carrera identity lock). No driver — the car is the character, explicitly stated in the brief. |
| **Scenes** | ✅ | **TWO scenes now.** `scenes/01-opening/scene.md` (kind: scene, 7-beat storyboard table) — unchanged. `scenes/threshold-melted-wall/scene.md` — **NEW this run.** Kind-tagged scene with 4-shot storyboard table covering the "wall dissolves into real road" beat (threshold-reveal → wall-falls-away → half-world-half-set → outside-commit). Direction is still `initial-direction`. |
| **Storyboard** | ✅ | `01-opening`: 7 shot folders (`001-studio-calm` through `007-exit-tracking`), each with `shot.md`, `statics/nano-banana-pro/`, `videos/seedance/`. `threshold-melted-wall`: 4 shot folders each with `shot.md`, `statics/`, `videos/`, `generated/`. `threshold-reveal` also has `statics/nano-banana-pro/threshold-stills.md` + `videos/seedance/threshold-sequence.md` prompt-threads (the other three threshold shots have `shot.md` only, no prompts yet). |

Runtime target unchanged in `project.md` (15-20 s, single subject). The new `threshold-melted-wall` scene adds an additional 6-8 s beat that the project `project.md` has not yet absorbed into its arc.

### 5.5 Support folders (not projects)

| Path | Purpose | Health |
|---|---|---|
| `_kb/prompt-techniques/` | Cross-project prompt knowledge (e.g., `seedance-2-prompting-guidelines.md`) | ✅ |
| `_kb/character-sheet-pack/` | Reusable identity-lock pack | ✅ |
| `_kb/research/` | Web-search snapshots, labelled in `_kb/research/README.md` | ✅ |
| `_kb/orphans/` | `image.png` (605,800 B) + `2026-04-23-18-42-17-character-sheet-nb2.png` (3,630,437 B) | ⚠ both still need a home |
| `_template/` | Canonical schema (kind-tagged markdown) | ✅ |
| `_os/ai-creatorship-os/` | Storyboard app + PRD + CLI harness | ✅ |

---

## 6. What Changed Since 2026-04-23

- **`porsche-911-964-cinema/` — SECOND SCENE added.** `scenes/threshold-melted-wall/` is new. Four shot folders, one `scene.md`, one prompt-thread for stills (`threshold-stills.md`) and one for video (`threshold-sequence.md`) under `threshold-reveal/`. Scene ID is thematic (`threshold-melted-wall`), not numeric — diverges from `scenes/01-opening/` naming convention (§8.4).
- **`ferrari-amg/scenes/01-forest-race/shots/04-chase-action/videos/seedance/driver-communication.md` — NEW.** Five variations (`v1` ferrari interior glance · `v2` amg reply · `v3` side-by-side connector · `v4` three-beat multi-shot · `v5` safe silhouette). Has full kind/id/scene/shot/direction/model/media/characters/locations/tags frontmatter. No cleanup needed — correctly scoped and named.
- **`ferrari-amg/characters/img-ferrari-driver-character-pack.gallery-ingest.json` — NEW.** A 6-item locally-prepared gallery ingest JSON (IMG driver character pack prompts for Nano Banana Pro/2, gender variations of techwear-mechanic driver look). Self-identifies as a deferred upload: *"Prepared locally because the live laniameda.gallery Convex deployment does not currently expose ingest/folder functions."* Placement under `characters/` is debatable — see §8.2.
- **Workspace `README.md` active-projects table — UPDATED** (this run). Now 4 rows: `f40-driver-tokyo` active, `ferrari-amg` active, `porsche-911-964-cinema` active, `ice-queen-f40` archived.
- **`.DS_Store` count unchanged at 16.** Sandbox permission to delete still refused (`rm: Operation not permitted`). Same list as 2026-04-23.
- **`_kb/orphans/` contents unchanged.** Still the same two PNGs awaiting a routing decision.

---

## 7. Cleanup Actions That Still Need Human Approval

### 7.1 Delete `.DS_Store` noise (16 files — same list as 2026-04-23)

```text
./.DS_Store
./_os/.DS_Store
./ferrari-amg/.DS_Store
./ferrari-amg/characters/.DS_Store
./ferrari-amg/characters/ferrari-812-superfast/.DS_Store
./ferrari-amg/characters/ferrari-812-superfast/refs/.DS_Store
./ferrari-amg/characters/ferrari-812-superfast/refs/Sheet-main/.DS_Store
./ferrari-amg/locations/.DS_Store
./ferrari-amg/locations/european-forest-road/.DS_Store
./ferrari-amg/output/.DS_Store
./ferrari-amg/refs-vid-shots/.DS_Store
./ferrari-amg/scenes/.DS_Store
./ferrari-amg/scenes/01-forest-race/.DS_Store
./ferrari-amg/scenes/01-forest-race/shots/.DS_Store
./ferrari-amg/scenes/01-forest-race/shots/04-chase-action/.DS_Store
./ferrari-amg/scenes/01-forest-race/shots/04-chase-action/videos/.DS_Store
```

Proposed action (human click):

```bash
find "AI Creatorship" -name ".DS_Store" -type f -delete
```

Add `.DS_Store` to each project repo's `.gitignore` (workspace root is intentionally not a git repo) to prevent recurrence.

### 7.2 Resolve the two PNGs in `_kb/orphans/`

- `image.png` — 605,800 B, 2026-04-16. Unchanged since 2026-04-19. Needs to move into a project `assets/refs/` or be deleted.
- `2026-04-23-18-42-17-character-sheet-nb2.png` — 3,630,437 B, 2026-04-23. Filename suggests it is a Nano Banana 2 character-sheet output — probably belongs under a project's `characters/<slug>/refs/` or `assets/generated/`. Content was not inspected.

### 7.3 Remove vestigial empty folders in `ferrari-amg/`

Same set as 2026-04-23 — nothing has moved into them in the last day:

- `scenes/01-forest-race/shots/shot-01/` — empty, superseded by `01-squirrel-intro/`.
- `scenes/01-forest-race/shots/shot-02/` — empty, superseded by `02-ferrari-continuous-tracking/`.
- `scenes/01-forest-race/shot-briefs/` — empty, superseded by the per-shot `shot.md` files.
- `scenes/01-forest-race/color-grading/` — empty; `art-direction/forest-race-grade.md` is the real grade doc.
- `output/raw/` — empty.
- `output/upscaled/` — empty.

Safe to `rmdir` once Michael confirms these are not parking spots for in-flight work.

---

## 8. Open Tasks — Missing Artifacts Per Project

These are gaps that require creative input from Michael, not agent fabrication. **Nothing below was written, because writing would be hallucinating.**

### 8.1 `f40-driver-tokyo/`

- [ ] Add `locations/tokyo-night-tunnel/lock.md` (or similar slug). The location is described in `project.md` and `EXPLAINER.md` but no kind-tagged lock file exists; the `locations/` folder is empty. This is the only gap in the pillar matrix.
- [ ] `messages/user-to-claude.jsonl` was empty on 2026-04-23. If it is still empty and continuity does not matter, delete it; otherwise log earlier operator notes.
- [ ] Decide whether `shots/shot_*.json` (flat, legacy) and `scenes/01-tokyo-night/shots/*/` (kind-tagged, current) should both stay. They mirror each other; the app prefers kind-tagged markdown.

### 8.2 `ferrari-amg/`

- [ ] **Decide the home of `characters/img-ferrari-driver-character-pack.gallery-ingest.json`.** It is a deferred gallery upload, not a character lock. Candidates: (a) leave in `characters/` since the content is character prompts; (b) move to `assets/pending-ingest/` or `tools/gallery-ingest/` since it is an ingest artifact; (c) move under `_kb/orphans/` until the Convex backend is back. Needs a one-line decision.
- [ ] Decide on a single `storyboard` artifact: either (a) promote the 7 `shot.md` files + `scene.md` to the storyboard of record (current state), or (b) generate a single `scenes/01-forest-race/storyboard.md` index. Currently the `README.md` scene table is the closest.
- [ ] Sort the 21 raw Seedance clips in `scenes/01-forest-race/shots/raw/` into matching shot `videos/` folders. Filenames like `720-good.mp4`, `good 4.mp4`, `good 6-7.mp4`, `new-1.mp4`, `parallel view.mp4`, and the long `Seedance 20 - …` names need Michael to identify which shot each belongs to.
- [ ] Decide how to label the eight Freepik/reference PNGs at the scene root (`scenes/01-forest-race/ferari back lone .png`, `freepik_*.png`) — they should probably move to `scenes/01-forest-race/refs/` or `locations/european-forest-road/refs/`. Note the typo in `ferari back lone .png` (double space, missing second `r`) — rename when filing.
- [ ] `scenes/01-forest-race/squirrel/` holds 4 Freepik squirrel-and-forest PNGs. If these are refs for shot `01-squirrel-intro` or `06-wildlife-intercuts`, file them under the right shot's `generated/` or `refs/`. Otherwise leave them as a scene-scoped refs folder and add a one-line `squirrel/README.md` label.

### 8.3 `ice-queen-f40/`

- [ ] If the project is truly archived, add a `project.md` with `kind: project` and `status: archived` so the app reads it consistently with the other projects. Currently status is only expressed in the workspace `README.md`.
- [ ] `seedance-prompts.md` has unfilled clip prompts. Decide whether clips are still on the roadmap or whether the project stays frozen.

### 8.4 `porsche-911-964-cinema/`

- [ ] **Add the new scene to `project.md`.** The brief still describes a single 15-20 s arc ending with "tracking escape → fade to black" in `scenes/01-opening/`. The new `threshold-melted-wall` scene adds an additional 6-8 s beat (shots: `threshold-reveal`, `wall-falls-away`, `half-world-half-set`, `outside-commit`). Either update the runtime target and the arc in `project.md`, or explain in `EXPLAINER.md` how `threshold-melted-wall` relates to the opening.
- [ ] **Scene numbering is inconsistent.** `scenes/01-opening/` is numeric, `scenes/threshold-melted-wall/` is thematic. Pick one convention. Recommendation based on existing patterns in other projects: rename to `02-threshold-melted-wall/` so the app orders scenes correctly.
- [ ] Fill in the missing prompt-threads under `threshold-melted-wall/`: `wall-falls-away`, `half-world-half-set`, and `outside-commit` have `shot.md` only — no stills or video prompt-threads yet. Only `threshold-reveal` has both.
- [ ] Add a `locations/` folder. The brief and both scene files describe the studio → road transition; if the surface is recurring across scenes (and `threshold-melted-wall` now makes it recurring), `locations/orange-studio-to-sunset-road/lock.md` would match the pattern in `ferrari-amg/` and `f40-driver-tokyo/`.
- [ ] `assets/refs/` and `assets/generated/` exist but only contain `.gitkeep` files. Populate as the project moves from brief → stills → video.

### 8.5 Workspace-wide

- [ ] Add `.gitignore` at each project repo (`f40-driver-tokyo/` already has one; `ferrari-amg/` already has one; add for `porsche-911-964-cinema/` already has one — verify all three include `.DS_Store`). (Workspace root is intentionally not a git repo.)
- [ ] `_template/` does not include a `locations/` directory. Three of the four active projects need one; `_template/` should reflect that so new projects don't inherit the same gap.
- [ ] Optional: a single top-level `PROJECTS.md` index. The active-projects table in `README.md` (updated this run) is the closest thing — no new index is needed unless Michael wants scene counts / last-touched dates inline.

---

## 9. What Was Deliberately Left Alone

- **All `.json` shot files, prompt logs, and character locks.** Creative payload, not organizational clutter.
- **`ferrari-amg/characters/img-ferrari-driver-character-pack.gallery-ingest.json`.** Placement is debatable (§8.2) but moving it silently would be a judgment call without Michael's input.
- **Everything in `ice-queen-f40/`.** Status is archived; `README.md` says *"Leave unless we revisit."*
- **`_kb/` contents other than the existing `orphans/` and `research/`.** Shared across projects; `README.md` warns *"Changes here affect every project. Treat edits carefully."*
- **`_os/ai-creatorship-os/app/` build artifacts** (`.next`, `node_modules`, `tsconfig.tsbuildinfo`). Owned by the app, not this report.
- **All scene / shot markdown written since 2026-04-23.** Properly scoped and frontmattered on arrival — no reshape needed.

---

## 10. Summary for Michael

Every project still has exactly one "open this first" document — no new master documents were created.

**What moved forward since 2026-04-23:**

- `porsche-911-964-cinema/` grew a second scene: `threshold-melted-wall/` with 4 shots and 2 prompt-threads. The project `project.md` and `EXPLAINER.md` have not yet absorbed this addition.
- `ferrari-amg/` gained a new driver-communication prompt-thread under shot `04-chase-action` (Seedance, 5 variations) and a new gallery-ingest JSON (IMG driver character pack) parked under `characters/`.
- Workspace `README.md` active-projects table is now up-to-date: four rows, `ferrari-amg` flipped to *active*, `porsche-911-964-cinema` added.

**What still needs one human click (unchanged from last run):**

1. Delete the 16 `.DS_Store` files — sandbox permission refused again.
2. Resolve the two PNGs in `_kb/orphans/` — move into a project or delete.
3. Decide on the gallery ingest JSON home in `ferrari-amg/characters/`.
4. Decide on scene numbering + update `project.md` for the new Porsche scene.

**What the workspace is missing if we want the five pillars complete across every active project:**

- `f40-driver-tokyo/locations/tokyo-night-tunnel/lock.md`
- `ferrari-amg/scenes/01-forest-race/storyboard.md` (optional — scene table + shot.md files already cover it)
- `porsche-911-964-cinema/locations/orange-studio-to-sunset-road/lock.md`
- `porsche-911-964-cinema/project.md` update to include the new `threshold-melted-wall` scene
- `_template/locations/` directory so new projects inherit the pattern

None of the above were created this run because doing so would invent creative content. They are logged here and in TaskList.
