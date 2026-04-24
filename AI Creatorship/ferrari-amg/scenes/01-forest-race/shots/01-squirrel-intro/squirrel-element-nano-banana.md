---
kind: prompt-thread
id: shot-01-squirrel-element-nano-banana
title: Shot 01 — Squirrel Element Asset (Nano Banana Pro)
scene: 01-forest-race
shot: 01-squirrel-intro
direction: core-forest-chase
characters: []
locations: []
model: nano-banana-pro
media: image
purpose: generate clean reusable squirrel element / mini-character-sheet for Seedance 2.0 multi-reference composition
strategy: element-plus-location-compositing
---

# Shot 01 — Squirrel Element Asset (Nano Banana Pro)

**Intent.** Produce a clean, reusable **Eurasian red squirrel** asset that Seedance 2.0 can accept as one of its multi-reference inputs alongside the existing `european-forest-road` location reference. Output is not a final shot — it's a **character element** that locks the squirrel's anatomy, fur color, ear tufts, and base pose so the model can composite her into the forest canopy in the video prompt. Also doubles as the identity reference for Shot 10 (the "they're nuts" finger-twirl cameo), so we lock her once and reuse.

**Hard locks.**
- **Species:** Eurasian red squirrel (*Sciurus vulgaris*). Not grey. Not a chipmunk.
- **Fur:** russet-red to rust-red dorsal, shading to deeper chestnut at haunches and tail, clean white belly with a clear color boundary along the flanks.
- **Ear tufts:** pronounced pointed tufts, clearly visible, catching rim light.
- **Tail:** long and bushy, arched up behind the body, not flat.
- **Eyes:** large, dark, glossy, single clean catchlight.
- **Paws:** four visible fingers per front paw, neatly separated, holding the acorn symmetrically.
- **Cheeks:** rounded and visibly full of stored food.
- **Scale feel:** small woodland mammal, not stylized-oversized.

**Generation protocol.** We generate two asset types: (1) the **identity sheet** — clean isolated squirrel in canonical pose for character reference; (2) the **in-situ element** — squirrel already placed on a believable pine branch, lit neutral, for direct drop-in as a Seedance reference. Keep the grade on the in-situ version slightly softer than the final shot grade so Seedance has headroom to push it.

---

## v1 — Identity Sheet / Canonical Pose (reference asset)

```
Photorealistic wildlife reference photograph, cinematic quality, 2:3 portrait. A single Eurasian red squirrel (Sciurus vulgaris) seated upright in canonical pose, centered in frame against a soft neutral mid-grey backdrop with gentle directional ambient light. The squirrel has russet-red to rust-red dorsal fur shading to deeper chestnut at the haunches and along the tail, a clean white belly with a crisp color boundary along the flanks, pronounced pointed ear tufts clearly visible, a long bushy tail arched up behind her body. Large dark glossy eye with a single clean catchlight. Four neatly separated fingers on each front paw. She holds a brown oak acorn to her mouth with both front paws in symmetric grip. Cheeks visibly rounded with stored food.

Neutral three-quarter front view, head tilted slightly toward camera-left, ears perked forward, tail curling up and slightly toward the right. Even, soft, slightly warm key light from upper-left, gentle cool fill from lower-right, subtle rim from behind — enough to separate fur silhouette without strong stylization.

Extreme sharpness on fur texture, ear tufts, whiskers, and paw digits. Shallow-to-medium depth of field, backdrop falling to soft uniform grey.

Professional wildlife / nature-documentary reference photograph. BBC Planet Earth lens quality. No stylization, no painterly rendering, no CGI plastic sheen. No text, no watermark, no props beyond the acorn, no leaves, no branch.
```

## v2 — In-Situ Element on Pine Branch (Seedance drop-in)

```
Photorealistic cinematic still, 16:9, slightly desaturated wildlife look. The same Eurasian red squirrel from reference image 1 — russet-red dorsal fur, clean white belly, pronounced pointed ear tufts, bushy arched tail, large dark eye with clean catchlight, four-fingered front paws holding a brown oak acorn to her mouth with cheeks rounded — now seated upright on a thick pine branch. Branch is real pine bark, mid-brown with textured ridges, small patches of pale green-grey moss, short clusters of dark green pine needles visible at one end softly out of focus. Branch spans across the lower third of the frame diagonally.

Background is a neutral out-of-focus deep forest interior — cool teal-green, subtly hazy, no visible road, no visible sky, no god rays yet. The grade is intentionally held softer than the final shot so the video model has headroom to push warmth and light direction.

Lighting is soft ambient forest light with a mild warm key from upper-right, no harsh shadows, no backlight flare. The squirrel reads cleanly and the branch reads cleanly — this is an asset, not a hero frame.

Camera: 100mm equivalent, f/4, medium depth of field. Squirrel and branch sharp, background smoothly out of focus. Static.

Professional wildlife reference photograph quality. No text, no watermark, no CGI sheen, no stylization.
```

## v3 — Alt Pose: Head-Turn Alert (for acorn-drop trigger)

```
Photorealistic wildlife reference photograph, 2:3 portrait. The same Eurasian red squirrel from reference image 1 on a thick pine branch, same species locks (russet-red dorsal, white belly, pronounced ear tufts, bushy arched tail, large dark eye, four-fingered paws). This pose captures the moment she has heard something below — her head is sharply turned toward camera-lower-left, ears swiveled forward and slightly pinned, body still upright but tensed, front paws still holding the acorn but with visibly loosened fingers — fingers halfway between gripping and releasing. Cheeks still full. Eye wide, pupil prominent.

Same neutral branch setup as v2: real pine bark, moss patches, needles out of focus at one end. Neutral soft forest lighting, teal-shifted background bokeh, no god rays yet.

Camera: 100mm, f/4, medium depth of field, static. Sharp on squirrel and branch.

Wildlife reference photograph quality. No text, no watermark, no stylization, no CGI sheen.
```

## Existing asset crosswalk

Before generating, confirm whether the existing freepik squirrel assets already satisfy the element role:

- `scenes/01-forest-race/freepik_a-red-squirrel-sitting-up_2790306043.png` — red squirrel on metal guardrail, existing candidate from the old concept.
- `scenes/01-forest-race/freepik_add-a-squirrel-on-a-branc_2792099420.png` — squirrel-on-branch variant, possibly closer to v2.
- `scenes/01-forest-race/freepik_closeup-from-a-tree-branc_2791843105.png` — branch close-up reference.

If any of these pass the species + anatomy check (Eurasian, ear tufts, four-fingered paws, clean white belly), **skip generation and use directly as the Seedance reference.** Only generate if the freepik refs fail the locks.

## Failure watch

- Extra or fused fingers — regenerate.
- Tail flattened against body (possum-like) — regenerate.
- Grey squirrel coloration / missing ear tufts — regenerate.
- Acorn cartoonishly large or held in one paw — regenerate.
- Branch surface reading as plastic or painted wood — regenerate.
- Any background that contradicts the forest-road location (urban park bench, suburban lawn, snowy ground) — regenerate.
