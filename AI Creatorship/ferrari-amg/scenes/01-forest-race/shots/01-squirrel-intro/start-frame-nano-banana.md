---
kind: prompt-thread
id: shot-01-start-frame-nano-banana
title: Shot 01 — Start Frames (Nano Banana Pro)
scene: 01-forest-race
shot: 01-squirrel-intro
direction: core-forest-chase
characters: []
locations: [european-forest-road]
model: nano-banana-pro
media: image
purpose: generate start-frame candidates for the Shot 1 squirrel cold open; output feeds Seedance 2.0 as noun
strategy: direct-start-frame
---

# Shot 01 — Start Frames (Nano Banana Pro)

**Intent.** The opening image of the film. A red squirrel sits on a pine branch high above a forest road, cheeks bulging with acorn. Through the negative space of the canopy below her, the two-lane road threads like a ribbon. Late golden hour. Teal-orange split. Haze, dust motes, god rays. Static long lens — no camera movement implied; this is a still.

**Hard locks.**
- Subject: **Eurasian red squirrel** (*Sciurus vulgaris*) — russet/rust-red dorsal fur, white belly, pronounced ear tufts, bushy tail arched behind. Not a North American grey squirrel. Not a chipmunk.
- Action state: **seated upright, holding an acorn to her mouth with both front paws, cheeks visibly full.** She looks attentive, not scared yet.
- Branch: high pine branch with bark texture and moss patches. Needles cluster at branch tip in soft focus.
- Road: glimpsed through negative space **below and beyond** the squirrel's branch — narrow two-lane dark asphalt, yellow center divider, thread-like scale, significantly out of focus. The audience should read "there is a road down there," not the road itself.
- Light: low western sun rakes **from behind-above**, rim-lighting the squirrel's ear tufts and tail edge in amber. Diagonal god rays through the canopy. Haze is load-bearing — without it the forest goes flat.
- Grade: teal-orange split. Warm amber highlights. Shadows pushed deep teal-green, never black. Greens desaturated and cooled. Medium-high filmic contrast. Subtle fine film grain.
- Camera language: long-lens close-up, shallow DOF, slight compression. 135mm-200mm equivalent. Branch in sharp focus, everything else falls off.

**Generation protocol.** Use the existing freepik squirrel refs at `scenes/01-forest-race/squirrel/` and `freepik_add-a-squirrel-on-a-branc_2792099420.png` as reference images when supported. If using text-only, the prompts below are self-sufficient. Generate all four variants. Pick the cleanest read on the squirrel's anatomy (paws and ear tufts break first).

---

## v1 — Canonical Opening Frame (default hero)

```
Photorealistic cinematic film still, 2.39:1 anamorphic, Arri Alexa look. Extreme close-up of a Eurasian red squirrel (Sciurus vulgaris) seated upright on a thick pine branch high inside a European mountain forest canopy. The squirrel is russet-red along the back with a clean white belly, pronounced pointed ear tufts catching the light, bushy tail arched up behind her body. She holds a brown oak acorn to her mouth with both front paws, cheeks visibly rounded with stored food, black eye catching a pinpoint specular highlight. Bark texture and small patches of green-grey moss on the branch surface. Soft pine needles cluster at the out-of-focus far end of the branch.

Through the negative space between the canopy branches below and beyond her, a narrow two-lane dark asphalt forest road threads into deep distance like a ribbon — strongly out of focus, readable only as a thin curved shape with a hint of yellow center divider. The road scale reads tiny relative to the canopy.

Lighting: late golden hour, sun low in the west roughly fifteen degrees above horizon, raking in from behind-above-right. Warm amber rim light glows along the squirrel's ear tufts, tail edge, and the top of her head. Diagonal god rays spearing down through the high partially open canopy, backlighting drifting haze and dust motes suspended in the air. Forest floor and road below sit in cool teal-green shadow, lifted, never pure black.

Grade: teal-and-orange cinematic split. Warm amber highlights with soft rolloff and retained detail. Midtones desaturated and slightly warm. Shadows pushed deep teal-green, slightly lifted. Forest greens desaturated and cooled toward teal-cyan. Medium-high filmic contrast, subtle fine film grain.

Camera: static long lens, 180mm equivalent, f/2.8, shallow depth of field. Branch and squirrel in sharp focus, canopy and road dropping into heavy bokeh. No camera movement. Horizontal frame, squirrel slightly right of center, road visible in the lower-left negative space.

Grounded European wildlife cinema realism. No CGI sheen. No cartoon exaggeration of the squirrel. No text, no watermarks.
```

## v2 — Wider Canopy Negative Space (road reads stronger)

```
Photorealistic cinematic film still, 2.39:1. Medium close-up of a Eurasian red squirrel seated upright on a pine branch in the upper third of a European mountain forest canopy. Russet-red fur, white belly, pointed ear tufts, bushy arched tail. Holding an acorn to her mouth with both front paws, cheeks full. Black attentive eye with a clean catchlight.

Camera position pulls back slightly compared to a tight portrait — the branch occupies the upper-right third of the frame and the squirrel is silhouetted-rim-lit against the open space of the forest below. Through the layered out-of-focus foreground needles and mid-ground branches, a narrow two-lane asphalt forest road curves visibly through the lower-left third of the frame, heavily defocused but legible as a road with a yellow center line and pale edge lines. The canopy frames the road in a natural vignette.

Light: late golden hour from behind and above, strong diagonal god rays cutting from upper-right to lower-left across the frame, illuminating drifting mist and dust motes. Haze thick in the valley below, thin near the branch. Warm amber rim on the squirrel and branch top edge. Cool teal-green shade in the deep forest behind.

Grade: teal-orange split, desaturated cooled greens, protected warm tones. Medium-high filmic contrast, subtle grain.

Camera: 135mm long lens, f/3.5, shallow focus on squirrel and branch, strong bokeh fall-off into the canopy gap. Static, locked tripod. Horizontal composition with strong negative space lower-left for the road.

Grounded European wildlife cinema realism. No text, no watermark, no CGI look.
```

## v3 — Low-Light Moody God-Ray Dominant

```
Photorealistic cinematic film still, 2.39:1. Close-up of a Eurasian red squirrel on a thick moss-patched pine branch, framed inside a shaft of backlit god-ray light cutting diagonally through a European mountain forest canopy at late golden hour. Russet-red fur, white belly, prominent ear tufts catching the amber light as near-translucent glows. Bushy tail arched behind. Holding an acorn with both front paws, cheeks rounded with stored food.

The god ray is the dominant light source — a thick diagonal shaft from upper-right to lower-left, filled with glowing haze, dust motes, and a few tiny drifting leaf fragments. The shaft isolates the squirrel from the surrounding forest, which falls into deep cool teal-green shadow. Through the dark canopy below and behind the squirrel, a thin out-of-focus sliver of asphalt forest road is barely visible in the lower portion of the frame — just enough to read as a road.

Lighting ratio is dramatic: amber backlight is intense, ambient fill is minimal, giving the squirrel a strong rim and a darker silhouetted body side. The mood is quiet and expectant, not scared.

Grade: teal-orange split pushed harder than the canonical grade but still grounded. Shadows deep teal-green, lifted just enough to retain detail in the squirrel's belly fur.

Camera: 180mm long lens, f/2.8, extremely shallow depth of field. Static. Horizontal frame.

Grounded cinema realism, BBC Planet Earth meets Arri Alexa automotive spot aesthetic. No CGI sheen, no text, no watermark.
```

## v4 — Acorn-Drop Trigger Frame (physics-ready alt)

```
Photorealistic cinematic film still, 2.39:1. Close-up of a Eurasian red squirrel seated upright on a pine branch high in a European mountain forest canopy at late golden hour. Russet-red fur, white belly, pointed ear tufts, bushy arched tail. Her front paws are loosely cupped, fingers just barely uncurling — an acorn is held between them with less grip than expected, as if she is about to lose it. Her cheeks are visibly full. Her head is slightly turned, ears forward, black eye wide and alert toward the lower-left of the frame — she has just heard something.

Through the negative space below and beyond her branch, a narrow two-lane asphalt forest road threads out of focus into the distance, yellow center divider faintly readable.

Lighting and grade identical to the canonical opening: late golden hour, warm amber rim from behind-above, diagonal god rays through canopy haze, deep teal-green shadow, medium-high filmic contrast, subtle grain.

Camera: 180mm long lens, f/2.8, shallow depth of field, static locked tripod. Horizontal composition, squirrel right of center.

This frame is designed as the last still before the acorn slips. The paws must read as about-to-release but the acorn is still visibly held. Grounded wildlife cinema realism. No CGI sheen, no text, no watermark.
```

## Notes for selection

- **Hero pick default:** v1 (cleanest opening frame).
- **Seedance starting frame for "freeze → acorn drops" beat:** v4 is closer to the action trigger and may animate cleaner into the acorn drop. Try both as start frames.
- Keep v2 as the alt if the road needs to read stronger in the opening.
- v3 is the moodier, more arthouse option — use only if the full film tone is pushed harder into arthouse territory.

## Failure watch

- Wrong species (grey squirrel, no ear tufts, chipmunk stripes) — regenerate.
- Acorn held like a nut in a cartoon, overscaled — regenerate.
- Paws with extra fingers or fused digits — regenerate.
- Road reading as a clear photographed road instead of background bokeh — reduce road sharpness in prompt, pull branch closer.
- Green foliage too saturated / vivid grass-green — regrade in prompt toward teal-cyan.
- Any text, watermark, lens flare burn-in — regenerate.
