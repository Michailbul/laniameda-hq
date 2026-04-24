---
kind: workflow
id: chinese-ferrari-perfume-shot-list
title: Chinese Ferrari Perfume Shot List
applies_to: image,video
model: all
---
# Shot List — 10 Core Stills

Each still is a motion-ready start frame for Seedance. Design them as keyframes pulled from motion, not static portraits.

## RED MODE — Elevator B-Roll (5 shots)

**R1 — Elevator mid-turn** (medium-wide)
Character mid-rotation inside elevator, hair whipping across cheek, chin lifted, dark eyes locked on her own reflection just off-camera. Body kinetic, torso twisting. The signature interior beat.

**R2 — Claw hand on elevator wall** (macro)
Black-gloved hand with long pointed metallic-black talons flexing against the polished black-lacquer elevator wall. Red wash. Abstract luxury emptiness.

**R3 — Silver earring profile** (macro)
Profile macro of right ear and neck, molten-silver drip earring mid-sway, hair strand drifting across the earlobe. Red wash, tactile skin realism.

**R4 — Reflection in elevator wall** (medium)
Her silhouette reflected in the polished black-lacquer wall, partial face in reflection, partial in real, mid-adjustment gesture. Doubling beat.

**R5 — Close profile chin-lift** (tight portrait)
Profile chin-up against the elevator corner, red wash carving the jaw, single hair strand across lips, cold exhalation. Maximum disdain.

## GRAY MODE — Exterior (5 shots)

**G1 — F40 Tokyo street wide** (establishing, no character)
Deep gloss-black F40 parked or gently rolling on a quiet Tokyo side street, overcast daylight, empty sidewalk, mid-rise architecture soft focus. The pure car establishing.

**G2 — Character walking past F40** (medium-wide parallel)
Full-body side profile mid-stride on the sidewalk, F40 tracking parallel just beyond the curb, she does not look at the car. Transit anchor.

**G3 — Stiletto strike** (low-angle macro)
Extreme low-angle macro of patent black stiletto pump striking gray paving stone, yellow tactile strip visible, F40 in deep soft-focus behind. Rhythm beat.

**G4 — Claw hand on door handle** (macro)
Black-gloved hand with talon nails gripping the flush F40 door handle, deep gloss-black door filling frame, sky reflection on the paint. Handoff beat.

**G5 — F40 dashboard** (medium interior)
Driver POV of F40 cabin: analog Veglia gauges, carbon dash, exposed chrome-gate shifter, keyed ignition port, daylight spilling through windscreen. Interior establishing.

---

## Resolution Strategy

- Draft every shot at **1K** first (fast iteration)
- Lock the prompt, then generate **4K final** for hero shots
- Run each shot 3-5x with seed variation for picks

## Input Images

- Shots R1, R2, R3, R4, R5, G2 → use `@img-1` (red portrait ref) as `--input-image`
- Shots G3, G4 → use provided daylight street refs as `--input-image`
- Shots G1, G5 → text-driven, no input image unless F40 reference sheet available

## Aspect Ratio

- NB2: request "anamorphic cinematic 2.39:1 framing" in prompt text
- MJ: use `--ar 21:9` (close to 2.39:1, native MJ support)
