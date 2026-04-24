---
kind: project
id: f40-driver-tokyo
title: f40-driver-tokyo
schema_version: 2.1
name: f40-driver-tokyo
working_title: F40 Driver — Tokyo
owner: Michael / laniameda
version: 1.0
last_updated: 2026-04-18
---
# F40 Driver — Tokyo

## Brief

A cinematic fashion-automotive hybrid short centered on a single character — a mid-20s East Asian woman piloting a black Ferrari F40 through Tokyo. The register is quiet command, aristocratic detachment, and latent power. Functions simultaneously as a hero creative project (1-2 hero video clips + 10 B-roll stills + editorial hero portrait) and as a teaching artifact for multi-input AI video generation and character consistency across models.

## Treatment

Anamorphic 2.39:1. Crushed blacks. Cool Tokyo exterior (wet asphalt, neon reflections, rain mist, sodium tunnel light) resolving into warm cabin interior (black leather, red stitching, exposed carbon, chrome gate). Color palette is black, oxblood red, and silver — no warm orange on skin. Fine grain. Low-contrast shadow rolloff. Zero HDR glow. Editing cadence alternates between one extended-single-take dolly-through-glass shot and a Requiem-style jump-cut beauty/fury montage with SFX-per-cut. The character never smiles. Every beat is carried by micro-expression, posture, breath, and the machinery she commands.

## Overview

### Act 1

Exterior Tokyo night. Wet streets, neon, distant traffic. The F40 appears as architecture in motion — front three-quarter at wet blue hour, tail lights in rain, silhouette through rear window. Mood: aristocratic machine at rest in a restless city.

### Act 2

Cabin interior. Beauty inserts in rapid cadence — oxblood manicure on the Momo wheel, hand on the gated chrome shifter, F40 key in hand, tachometer needle climbing to redline, eyes in rearview mirror. The character arrives in fragments.

### Act 3

Hero continuous shot — orbiting exterior track dollies forward, passes through the windshield, lands on the character's face. Hero editorial portrait closes the short — full-body on oxblood seamless, composure intact.

## References

### Keywords

- anamorphic
- crushed blacks
- oxblood
- Tokyo night
- wet asphalt
- Ferrari F40
- quiet commander
- micro-expression
- fine grain
- chrome gate shifter
- Momo wheel
- editorial portrait
- blue hour
- neon bokeh
- Requiem cadence

### Vibes

- A woman who has already won and does not need to announce it — every frame carries withheld power instead of performed power.
- The car and the character occupy the same aesthetic register: low-slung, precise, minimal, dangerous when provoked.
- Light should feel located — a specific neon sign, a specific sodium tunnel, a specific rearview reflection — never generic mood lighting.
- Sound design precedes image in editing logic. Every cut hits on an engine note, a fabric rustle, a shifter click, a rain tick.
- The Requiem-cadence montage conveys elegance, fury, power, femininity — explicitly not drug-themed. The cadence is borrowed, the register is our own.

### Works

- **Requiem for a Dream** (2000) — Darren Aronofsky: SFX-per-cut rapid beauty/fury montage cadence — cadence only, not subject matter.
- **Drive** (2011) — Nicolas Winding Refn: Neon Tokyo palette translation. Patient tempo punctuated by violence of machinery. Silence between beats.
- **In the Mood for Love** (2000) — Wong Kar-wai: Withheld emotion rendered through composition and costume. Color-as-mood (reds, blacks).
- **Ferrari (2023)** (2023) — Michael Mann: Machinery as character. Engineering reverence. Unromantic speed.
- **Blade Runner 2049** (2017) — Denis Villeneuve: Anamorphic Tokyo-coded neon reference. Atmospheric density.

## Workflow notes

Nano Banana Pro is the identity-locked reference generator — draft at 1K, lock at 4K. Midjourney is the fast ideator for compositional alternatives. Seedance V2 is the motion extender — one job per reference (video = motion/rhythm, image = identity). Continuity lock strings to reuse across all Seedance prompts: 'same character throughout all shots', 'same car throughout all shots'. Override conflicting reference attributes in both subject block AND constraints block — once is not enough.

### Sequence recommendation

1. Generate shot_001 (turnaround sheet) in Nano Banana Pro at 1K. Iterate until the face, hair strands, and manicure are locked.
2. Upscale shot_001 to 4K. This becomes the universal character reference for all subsequent generations.
3. Generate shot_002 (hero editorial) using shot_001 as reference input. Confirms identity holds under editorial wardrobe.
4. Generate shot_008 and shot_010 (car-only, no character) in parallel — they do not need identity references.
5. Generate shots 003, 004, 005, 006, 009 (character × car beauty inserts) using shot_001 as reference.
6. Generate shot_007 (tachometer, no character) last or alongside the car-only batch.
7. Feed approved stills into Seedance V2 as image references for the hero continuous dolly-through-glass shot and the Requiem-cadence montage.
8. Edit: one extended single-take (dolly-through-glass) interleaved with the Requiem-cadence beauty/fury montage.
