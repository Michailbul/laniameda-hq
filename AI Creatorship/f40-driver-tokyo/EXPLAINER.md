---
kind: note
---
# F40 Driver — Tokyo · Project Explainer

> What we've been trying to do, what we've built, why each piece exists, and what comes next.

---

## 1. The creative universe

A cinematic fashion-automotive hybrid short centered on a single character — a mid-20s East Asian woman piloting a black Ferrari F40 through Tokyo — exploring the emotional register of *quiet command, aristocratic detachment, and latent power*.

It is built to function simultaneously as:

- A **hero creative project** (final deliverables: one to two hero video clips, ten B-roll stills, an editorial hero portrait).
- A **teaching artifact** that demonstrates multi-input AI video generation, reference-controlled image-to-video pipelines, and character consistency across models.

Aesthetic universe: anamorphic 2.39:1, crushed blacks, cool Tokyo exterior resolving into warm cabin interior, dominated by black, oxblood red, and silver.

---

## 2. What has been done so far

The project has progressed through several creative and technical moves. Each one is a reusable artifact, not just a throwaway step.

### 2.1 Video digest — "I tested Seedance 2.0. Wow." by Greg Isenberg × Sirio Berati
Analyzed the YouTube video (https://www.youtube.com/watch?v=Uz1ZSxSYkB8) and extracted:
- Seedance V2's multi-input capabilities (up to 2 images + 2 videos + 1 audio).
- The reference-assignment principle: *one job per reference* (video = motion/rhythm, image = identity).
- The Subject → Action → Camera → Style → Constraints → Audio prompt skeleton.
- Continuity locks like `same car throughout all shots` and `same character throughout all shots`.

### 2.2 F40 Tokyo tracking shot (Seedance V2)
Built the first Seedance extension prompt: continuing a base video of the black F40, orbiting tracking camera, Tokyo street. Reference video supplied motion/rhythm; F40 eight-panel reference sheet supplied identity.

### 2.3 Requiem-style jump-cut montage
Fashion/car montage prompt in the cadence of *Requiem for a Dream* — SFX-per-cut rapid editing — conveying elegance, fury, power, femininity, explicitly **not** drug-themed.

### 2.4 Dolly-in through glass (hero continuous shot)
A single-take shot that extends the orbiting F40 footage, dollies forward, passes through the windshield, and lands on a close-up of the character's face.

Went through multiple correction passes:
- Removing implicit cuts, grounding the continuity of the car in motion.
- Replacing silver claw gloves (inherited from a reference image) with bare hands and a glossy oxblood manicure.
- Rewriting every `@img1 / @video1` reference tag into natural language ("the prior scene," "same Asian woman at the wheel").
- Re-ordering the prompt to strict Seedance V2 skill structure.
- Frontloading the *continuation directive + core shot description* as the first sentence — the most important line first.

### 2.5 Character lock (`character-lock-f40-driver.json`)
A modular character bible to prevent face/wardrobe drift across models. Includes:
- `identity`, `face` (with eyes/lips detail), `hair` (with locked asymmetric face-framing strands), `wardrobe` (driving vs editorial modes), `manicure`, `psychotype`, `visual_style_dna`, `environment_context`.
- A `universal_negative_prompt`.
- Reusable prompt slugs (short and long identity lock, wardrobe slugs, psychotype slug, style DNA slug).
- Seven `context_recipes` for common shot types.
- Model routing notes + usage instructions + changelog.

The psychotype is "quiet commander — aristocratic detachment + predator composure." She does not smile. Every beat is carried by micro-expression, posture, breath, and the machinery she commands.

### 2.6 Ten-shot B-roll storyboard (`storyboard.json`)
Art-directed ten shots covering:
- **Identity anchor** — four-panel character turnaround sheet.
- **Marketing hero** — full-body editorial portrait on oxblood backdrop.
- **Beauty inserts** — manicure on Momo wheel, hand on gated chrome shifter, F40 key in hand.
- **Emotional insert** — eyes in rearview mirror.
- **Kinetic insert** — tachometer needle at redline.
- **Mood beats** — rear tail lights in rain, silhouette through rear window.
- **Hero car** — front three-quarter at wet blue hour.

Every shot carries both a **Midjourney prompt** (compact natural language with `--ar`) and a full **Nano Banana 2 prompt** (Subject → Style → Composition → Lighting → Background → Color palette → Avoid), plus status, version, edits history, and a notes field for human revisions.

### 2.7 Two-way synced storyboard web app (`storyboard.html`)
Single-file HTML app. Source of truth is `storyboard.json`. The app reads and writes the same file so edits in chat and edits in the app stay in sync.

- **Live sync mode** — when served from `localhost` or `https://`, uses the File System Access API for in-place reads/writes.
- **Fallback mode** — when opened via `file://` (e.g. double-clicked), falls back to a file-picker load + download-based save.
- **Features** — editable brief, treatment, overview, reference keywords/vibes/works, character summary, per-shot prompt editing, per-shot status/version/edits history, two-way message thread between user and Claude.
- **Aesthetic** — black background, oxblood red accents, silver typography (Inter + Playfair Display + JetBrains Mono).

---

## 3. What we learned along the way

### 3.1 Prompt engineering — Seedance V2 specifically
- **Frontload the shot.** The first sentence of a Seedance prompt must state (a) continuation intent if any, and (b) the core shot in one line. Everything else is support.
- **One job per reference.** Never let a reference image and a reference video compete for the same attribute.
- **Explicit anti-cut language, repeated.** Continuity must be stated at opener, middle, and global-constraints level when the shot is meant to be a single take.
- **Override image references with repetition + direct statement.** When an image reference carries an attribute we don't want (e.g. gloves), we must override in both the subject block and the constraints block — once is not enough.
- **Skill structure matters.** Adapting to Subject → Action → Camera → Style → Physics → Constraints → Audio visibly improved coherence vs. free-form prose.

### 3.2 Character consistency
- The reference-sheet method (turnaround + locked slugs) dramatically reduces drift compared to a single portrait reference.
- Asymmetric face-framing strands are one of the highest-value identity features — they're cheap to describe, specific, and highly recognizable across models.
- Psychotype language ("she holds emotion rather than performing it," "never smiles," "suppressed sensuality") directly shapes generation outputs in a way that visual description alone does not.

### 3.3 Multi-model pipeline
- **Midjourney** is the fast ideator. Compact prose, `--ar`, four variants.
- **Nano Banana Pro / NB2** is the identity-locked reference generator. Full structured template. Draft at 1K, lock at 4K.
- **Seedance V2** is the motion extender. It consumes NB2-locked frames as image references and a motion reference as video.

### 3.4 Two-way human-machine workflow
We needed a way for the user and Claude to share state across turns without re-pasting. The solution:
- A single JSON file as the source of truth.
- A lightweight web app that can read and write that same file.
- A message-thread pattern inside the JSON (`communication.user_to_claude` / `claude_to_user`) so Claude can read user notes from the last session and respond in the next.

---

## 4. Current status

| Artifact | State |
|---|---|
| Character lock JSON | v1 complete, locked |
| Storyboard JSON (10 shots) | v1 drafted |
| Storyboard web app | v1 with dual-mode sync (live + fallback) |
| Generated images | Not yet produced — next step is to run shot_001 (turnaround sheet) |
| Generated videos | Dolly-through-glass prompt locked, not yet generated |

---

## 5. Pipeline — what to run next

1. Generate **shot 001** (turnaround sheet) in Nano Banana Pro at 1K. Iterate until locked.
2. Upscale to 4K. This becomes the universal reference for all subsequent character generations.
3. Generate **shot 002** (hero editorial) using the turnaround as reference input. Confirms identity lock holds under different wardrobe.
4. Generate shots 5 and 6 (car-only, no character) in parallel — they don't need identity references.
5. Generate shots 3, 4, 8, 10 (character × car beauty inserts) using the turnaround as reference.
6. Generate shots 7 and 9 last.
7. Feed approved stills into Seedance V2 as image references for final video extensions.
8. Edit using the Requiem-cadence + extended-single-take structure described in the treatment.

---

## 6. File map

```
ai-creatorship/
  f40-driver-tokyo-docs/
    EXPLAINER.md                       ← this file
    PRD.md                             ← product requirements for the storyboard app
  (move the following artifacts here when ready)
    character-lock-f40-driver.json     ← identity lock
    storyboard.json                    ← ten-shot storyboard + two-way message thread
    storyboard.html                    ← two-way synced web app
```

All four files currently live in the session `outputs/` folder — move them into your ai-creatorship project folder together so the web app keeps finding the JSON.

---

*Last updated 2026-04-18.*
