---
kind: workflow
id: ferrari-amg-project-navigation
title: Ferrari + AMG Project Navigation
applies_to: project
model: filesystem
---
# Ferrari + AMG — Forest Race

## App-Readable Files

- `project.md` — active project brief and continuity rules. Read first.
- `characters/ferrari-812-superfast/lock.md` — Ferrari identity lock.
- `characters/mercedes-amg-gt3/lock.md` — AMG identity lock.
- `locations/european-forest-road/lock.md` — reusable forest-road lock.
- `art-direction/forest-race-grade.md` — color and lighting profile.
- `directions/core-forest-chase.md` — grounded chase language.
- `directions/ai-style-rupture.md` — AI-native visual rupture.
- `scenes/01-forest-race/scene.md` — scene structure and shot list.
- `scenes/01-forest-race/shots/*/shot.md` — per-shot briefs.

## Reference Assets

- `characters/ferrari-812-superfast/refs/` — Ferrari reference frames and stills.
- `characters/ferrari-812-superfast/character-sheet-prompts.md` — Nano Banana character sheet prompt pack.
- `characters/mercedes-amg-gt3/refs/` — AMG reference frames and stills.
- `locations/european-forest-road/refs/` — forest-road reference images and clips.
- `refs-vid-shots/` — motion-style video references.

## Scene Structure

Each scene folder contains:

- `scene.md` — scene brief, shot list, continuity.
- `shots/<shot-id>/shot.md` — per-shot brief.
- `shots/<shot-id>/videos/seedance/` — approved Seedance renders.
- `shots/raw/` — unsorted raw clips awaiting triage.
- `prompts/` — prompt-thread files (created as shots are worked).
- `color-grading/` — scene-specific grade overrides.

## Output

- `output/raw/` — assembled edits before upscaling.
- `output/upscaled/` — final upscaled footage.

## Agent Workflow

1. Read `project.md`, the relevant scene's `scene.md`, and the target `shot.md`.
2. Read the character, location, and art-direction locks referenced by the shot.
3. Compose prompts by copy-pasting the `Prompt-Ready Description` blocks from the locks verbatim.
4. Generate. Show results to the user. Wait for feedback.
5. On approval, save the prompt as a `prompt-thread` file under `scenes/<scene>/prompts/` and the output clip under `shots/<shot-id>/videos/seedance/`.
6. Never paraphrase identity-lock text. Copy verbatim.

## Status

- [x] Cars locked (Ferrari 812 Superfast + AMG GT3)
- [x] Location locked (European forest road)
- [x] Color grade locked (teal-orange, golden hour)
- [x] Scene 01 shot list defined
- [ ] Scene 01 prompt-threads
