---
kind: prompt-thread
id: shot-01-seedance
title: Shot 01 — Seedance 2.0 Video Prompts (two strategies, multiple iterations)
scene: 01-forest-race
shot: 01-squirrel-intro
direction: core-forest-chase
characters: []
locations: [european-forest-road]
model: seedance-2.0
media: video
purpose: animate Shot 1 squirrel cold open; two strategies — (A) start-frame drive, (B) multi-reference composition
---

# Shot 01 — Seedance 2.0 Video Prompts

**Shot intent.** Cold open. A red squirrel on a high pine branch, cheeks full of acorn, hears a distant V12 roar coming from the forest road below. She freezes. Her paws loosen. The acorn slips and tumbles down through the branches. Static long lens — camera does not move. Roughly 4–6 seconds. This is the film's first image; it has to feel quiet, attentive, and a hair unsettled by what is coming.

**Hard directive across all variants.**
- **One action per shot.** The action chain is: *grooming-or-stillness → freeze (ear flick + head tilt) → paws loosen → acorn slips and falls through branches.* Do not layer additional camera moves, additional animals, wind gusts, or weather changes.
- **Camera is locked.** Static tripod. No push-in, no pull-out, no drift, no handheld sway. Focus does not rack. This sets up the tracking shots that follow.
- **Squirrel anatomy is fragile.** If variants break her paws or fur, drop the grooming beat and run the simpler freeze → drop chain.
- **Haze is load-bearing.** Mist and dust motes must drift subtly through god rays in every variant.
- **Audio-cue in prompt, not in render.** Describe the V12 roar as the trigger for the squirrel's freeze so the model animates reactivity correctly; the actual audio is added in post.

---

## Strategy A — Start-Frame Drive

**Inputs.** A start frame from `start-frame-nano-banana.md` (default: v1 canonical; alt: v4 trigger frame for a tighter freeze-to-drop).
**Seedance mode.** Text-to-video with start-frame reference. Prompt is verb-only; the frame is the noun.
**Use when.** We want the shot to look exactly like the Nano Banana still and animate out from there with minimal reinterpretation.

### A.v1 — Canonical: freeze → acorn drop

```
Continue from the start frame. The squirrel is perfectly still for the first half-second, cheeks full, holding the acorn to her mouth with both paws. A deep distant V12 engine roar rises in the forest below — the squirrel's ears flick sharply forward, then her whole body freezes, head tilting a few degrees toward the road below. Her front paws visibly loosen their grip. The acorn slips out from between her paws and falls — it tumbles down past her chest, bounces once off a lower branch, and continues falling through the canopy out of frame. Dust motes and drifting haze continue to float through the god rays across the frame throughout. Camera is completely locked: no push, no drift, no rack focus. Focus stays on the squirrel and branch. Shallow depth of field. Late golden hour teal-orange grade holds. Subtle fine film grain. One continuous static take. No cuts.
```

### A.v2 — Minimal-risk: freeze only, no acorn drop

```
Continue from the start frame. The squirrel is still, cheeks full, holding the acorn to her mouth with both front paws. A deep distant V12 engine roar rises from the forest road below. Her ears flick forward sharply, then her whole body freezes. Her head tilts a few degrees down toward the road. Her tail twitches once. She does not move her paws. She does not drop the acorn. Dust motes and haze drift softly through the backlight throughout. Camera is completely locked, no movement, no rack focus. Shallow depth of field. Late golden hour teal-orange grade. Subtle film grain. One continuous static take.
```

*Use A.v2 if A.v1 keeps breaking the paw/acorn physics. Acorn drop can be generated as a separate insert in post.*

### A.v3 — Extended: grooming → freeze → drop

```
Continue from the start frame. For the first second the squirrel is grooming — she nibbles the acorn in small rapid motions, cheeks full, tail twitching lightly behind her. Then a deep distant V12 engine roar rises from the forest road below. Her ears flick forward, she stops chewing, her whole body freezes mid-motion, and her head tilts a few degrees down toward the road. Her front paws loosen. The acorn slips from between her paws, falls past her chest, clips a lower branch, and tumbles down through the canopy out of the bottom of the frame. Dust motes and haze drift through the backlit god rays across the frame throughout. Camera is completely locked — no pan, no push, no drift, no rack focus. Shallow depth of field. Late golden hour teal-orange grade. Subtle film grain. One continuous static take.
```

*Highest reward, highest break risk. The nibble beat loves to glitch. Worth one or two generations; fall back to A.v1 if anatomy fails.*

### A.v4 — Trigger-frame variant (pair with start-frame v4)

```
Continue from the start frame. The squirrel is already mid-alert — ears forward, head turned toward the road, paws loosely holding the acorn. Over the first half-second a deep distant V12 engine roar rises from below and her body locks fully rigid. Over the next second her paws fully release — the acorn slips forward, tumbles down past her chest, clips one lower branch, and continues falling out of the bottom of the frame through drifting haze and dust motes. Camera locked throughout. No push, no drift, no rack focus. Shallow depth of field. Late golden hour teal-orange grade. Subtle film grain. One continuous static take.
```

*Use when starting from `start-frame-nano-banana.md` v4. Shorter action chain, cleaner motion budget for Seedance.*

---

## Strategy B — Multi-Reference Composition

**Inputs.** Seedance 2.0 multi-reference mode with:
1. **Squirrel element** — from `squirrel-element-nano-banana.md` v2 (in-situ element) or v3 (alert pose), or the passing freepik squirrel ref if it clears the species check.
2. **Location reference** — `scenes/01-forest-race/freepik_forest-road-cinematic-ang_2790422151.png` and/or one of the canopy refs in `scenes/01-forest-race/squirrel/freepik_cinematic-forest-environm_*.png`.
3. **(Optional) grade reference** — any existing forest-race still that carries the teal-orange split cleanly.

**Seedance mode.** Multi-reference / omni. We are not feeding a locked start frame; we are giving Seedance the raw materials and directing it to assemble the shot. More creative latitude, more variance run-to-run. Good for exploration.

**Use when.** The start-frame attempts break anatomy, or we want Seedance to generate compositional variety across iterations before committing to a hero plate.

### B.v1 — Canonical composition from refs

```
Using the attached references — the red squirrel element as the subject, and the European mountain forest canopy / forest road as the environment — compose a static cinematic shot. The red squirrel from the reference sits upright on a thick pine branch high inside the canopy of the forest from the environment reference, cheeks full, holding an acorn to her mouth with both front paws. Through the negative space of the canopy branches below and beyond her, the two-lane asphalt forest road threads into the distance, strongly out of focus.

Motion: for the first second she is perfectly still. Then a deep distant V12 engine roar rises from the road below. Her ears flick forward, she freezes, and her head tilts a few degrees toward the road. Her front paws loosen and the acorn slips from between her paws, tumbles down past her chest, clips one lower branch, and continues falling out of the bottom of the frame.

Lighting: late golden hour, low western sun from behind-above, warm amber rim on the squirrel's ear tufts and tail edge, diagonal god rays spearing through the high canopy, backlit haze and drifting dust motes across the frame.

Grade: teal-and-orange cinematic split. Warm amber highlights. Shadows deep teal-green, lifted. Forest greens desaturated and cooled. Medium-high filmic contrast. Subtle fine film grain.

Camera: long lens, approximately 180mm equivalent, f/2.8, shallow depth of field. Static locked tripod, no camera movement of any kind, no rack focus. Branch and squirrel in sharp focus, canopy and road in heavy bokeh. Horizontal 2.39:1 frame, squirrel slightly right of center. One continuous static take.
```

### B.v2 — Wider canopy with stronger road read

```
Using the attached references — red squirrel subject and European forest canopy / forest road environment — compose a static cinematic shot where the squirrel is framed in the upper-right third of a wider canopy composition. Through layered out-of-focus foreground needles and mid-ground branches below her, the asphalt forest road curves visibly through the lower-left third of the frame, heavily defocused but readable as a road with a faint yellow center line.

Motion: the squirrel is still and upright, cheeks full, holding the acorn with both paws. A deep distant V12 engine roar rises from the road. Her ears flick forward, she freezes, head tilts toward the road. Paws loosen. The acorn slips and tumbles down through the lower canopy, out of frame.

Light: late golden hour, strong diagonal god rays cutting from upper-right to lower-left across the frame, illuminating drifting mist and dust motes. Warm amber rim on the squirrel.

Grade: teal-orange split, desaturated cool greens, protected warm tones, medium-high filmic contrast, subtle grain.

Camera: 135mm long lens, f/3.5, medium-shallow depth of field. Static locked tripod, no movement. Horizontal 2.39:1 frame. One continuous static take.
```

### B.v3 — God-ray dominant, moodier exploration

```
Using the attached references — red squirrel subject and forest canopy environment — compose a moodier cinematic shot where the squirrel sits inside a single thick diagonal shaft of backlit god-ray light cutting across a darker forest canopy. The shaft is filled with glowing haze, dust motes, and a few drifting leaf fragments. The surrounding canopy falls into deep cool teal-green shadow. Through the dark out-of-focus canopy below, a thin sliver of forest road is barely legible.

Motion: the squirrel is perfectly still. A deep distant V12 engine roar rises from the road. Her ears flick forward, she freezes, head tilts toward the road. Paws loosen. The acorn slips and tumbles down through the dark canopy, out of the bottom of the frame. The god-ray shaft continues to pulse subtly with moving haze throughout.

Grade: teal-orange split pushed harder but grounded — shadows deep teal-green, lifted just enough to retain fur detail on the squirrel's belly. Warm amber rim light intense, ambient fill minimal.

Camera: 180mm long lens, f/2.8, extremely shallow depth of field. Static locked tripod, no movement. Horizontal 2.39:1 frame. One continuous static take.
```

### B.v4 — Freeze-only reduced motion (Seedance safety net)

```
Using the attached references — red squirrel subject and European forest canopy environment — compose a static cinematic shot. The squirrel sits upright on a thick pine branch high in the canopy, cheeks full, holding an acorn to her mouth with both front paws. Through negative space below, the forest road is visible, strongly out of focus.

Motion: the squirrel is still for half a second. A deep distant V12 engine roar rises from the road. Her ears flick forward, she freezes, her head tilts a few degrees toward the road, her tail twitches once. Her paws do not release. The acorn stays held. Dust motes drift through god rays in the background throughout.

Light and grade: late golden hour, warm amber backlight from behind-above, diagonal god rays, backlit haze, teal-orange cinematic split, medium-high contrast, subtle grain.

Camera: 180mm long lens, f/2.8, shallow depth of field. Static locked tripod, no movement, no rack focus. Horizontal 2.39:1 frame. One continuous static take.
```

*The acorn drop can be a separate insert shot generated with a simpler prompt: tight close-up on the acorn tumbling through branches against backlit haze. Keeps the main plate clean.*

---

## Iteration plan

1. **First pass:** run A.v1 three times against start frame v1, and A.v4 three times against start frame v4. Compare: which start frame gives Seedance a cleaner freeze-to-drop animation?
2. **Fallback pass (if anatomy breaks):** A.v2 three times. Freeze-only is the safety net. Generate the acorn drop as a separate tight insert.
3. **Exploration pass:** B.v1, B.v2, B.v3 — one generation each. Picks whichever composition surprises us.
4. **Hero pick:** the cleanest read on (a) squirrel anatomy through the freeze, (b) the acorn physics, (c) the locked camera, (d) the grade. In that priority order.
5. **If Strategy A wins:** Strategy A is the hero plate; Strategy B outputs become B-roll for the Shot 10 cameo ("they're nuts" finger-twirl) where the same squirrel has to return.
6. **If Strategy B wins:** extract the last frame and feed it as start frame for Shot 2 (`02-squirrel-descent`) tracking descent — maintains the squirrel identity across cuts.

## Failure watch

- Camera drifts, pushes, or racks focus — regenerate. This shot must be locked.
- Squirrel swaps species mid-shot (fur changes from red to grey, ear tufts disappear) — regenerate.
- Paws clip through the acorn, extra fingers appear — regenerate.
- Acorn floats unnaturally or teleports instead of falling — fall back to A.v2 / B.v4 and insert the drop separately.
- Ambient wind suddenly picks up and shakes every leaf — regenerate. This scene is still, only haze and dust motes move.
- A second animal appears (bird, deer) — regenerate.
- Road suddenly pulls into focus — regenerate. Road must stay deep in bokeh.

## Downstream chain

- Final-frame extract from the hero clip → feed as start frame for Shot 2 (`02-squirrel-descent`).
- Squirrel identity reference used here → reused for Shot 10 (`10-squirrel-nuts-gesture`). Do not regenerate a new squirrel between Shot 1 and Shot 10.
