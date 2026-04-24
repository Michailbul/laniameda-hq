---
kind: workflow
id: chinese-ferrari-perfume-navigation
title: Chinese Ferrari Perfume Navigation
applies_to: project
model: filesystem
---
# Chinese Ferrari Perfume — F40 Tokyo Edit

**Concept:** Brand video — cinematic fashion/automotive jump-cut edit. Black Ferrari F40, controlled East Asian woman in all black, anonymous perfume ritual. Two visual modes alternating: red elevator B-roll (interior) + gray daylight Tokyo street (exterior). Perfume-ad-adjacent emotional register, Black Opium / Paco Rabanne cut cadence.

**Brand-video DNA:** The woman, the F40, and the anonymous perfume bottle are the brand carriers. Camera obsessions land on signature pieces: silver chest clasp + chain, silver drip earrings, talon nails, perfume mist, matte-black bottle, silhouette, F40 details. Ritualistic and observational beats. Final beats land clean for brand-mark reveal.

**Output:** 15-20s final, stitched in post from a library of 4-8s Seedance clips.

**Pipeline:** Stills (NB2 + MJ) → Seedance V2 clips → cherry-pick → post-stitch.

## Files

- `project.md` — current project brief and constraints
- `directions/chinese-ferrari-perfume.md` — active visual direction
- `scenes/01-luxury-teaser-collage/` — consolidated 12-panel Chinese Ferrari perfume storyboard prompt
- `locks.md` — character, F40, and environment identity locks (copy-paste into every prompt)
- `shot-list.md` — 10 core stills to generate (5 red elevator, 5 gray exterior)
- `nb2-prompts.md` — all 10 Nano Banana Pro prompts
- `mj-prompts.md` — all 10 Midjourney prompts
- `seedance-prompts.md` — clip prompts (filled in once stills are locked)

## Workflow

1. Generate stills in both NB2 and MJ for each shot — compare outputs
2. Pick winners, lock as start frames
3. Feed winners to Seedance V2 as `@img-` references with per-clip prompts
4. Run each Seedance prompt 2-3x, cherry-pick
5. Stitch in post

## Rules

- Red mode = elevator B-roll ONLY. Gray mode = exterior (car, street) ONLY. No cross-contamination.
- Daylight overcast Tokyo for exteriors. No neon, no rain, no night.
- Character identity locked via `@img-1` (the red portrait reference) — feed as `--input-image` in NB2 where identity matters.
- F40 identity locked via the prior Tokyo F40 ref sheet if available, otherwise text-driven.
- No cigarette anywhere.
- No secondary characters, no crowd, no logos, no branded signage.
