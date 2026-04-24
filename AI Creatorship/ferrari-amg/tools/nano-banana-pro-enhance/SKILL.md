---
kind: workflow
id: nano-banana-pro-enhance-patterns
title: Nano Banana Pro Enhance Patterns
applies_to: image
model: nano-banana-pro
---
# Nano Banana Pro — Enhance / Upscale Patterns

> Extension for `nano-banana-pro` skill. Add this section to the main SKILL.md when the plugin is next editable.

Enhance detail and realism of an existing image while preserving its composition, subject, and mood. Two modes.

---

## Quick Enhance (any subject, no analysis)

Fast detail boost. No brackets. Copy-paste and run.

```text
Keep the original image's composition, camera angle, framing, lens behavior, depth of field, subject position, and lighting direction exactly the same. Do not alter perspective, subject positioning, or add/remove any element. Enhance image realism, sharpness, and fine detail across all surfaces. Output must be super crisp — razor-sharp edges, tack-sharp focus across the entire frame, no softness on any surface. Increase micro-contrast and texture definition. Improve dynamic range — recover shadow detail and highlight rolloff. Maintain the original color grade, mood, and atmosphere. Output should feel like the same photograph shot on a higher-resolution sensor with a sharper lens.
```

Run:
```bash
uv run ~/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "<quick enhance prompt above>" \
  --input-image "path/to/source.png" \
  --filename "yyyy-mm-dd-hh-mm-ss-enhanced.png" \
  --resolution 4K
```

That's it. No brackets to fill. Works on cars, people, landscapes, products, anything.

---

## Deep Enhance (scene-specific, maximum fidelity)

Use when you need surgical detail control. Agent analyzes the image, picks the right detail language, fills the template. **Always show the filled prompt to the user before running.**

### Base structure

```text
Keep the original image's composition, camera angle, framing, lens behavior, depth of field, [SUBJECT] position, and lighting direction exactly the same. Do not alter perspective or [SUBJECT] positioning unless explicitly requested.

Ultra-realistic enhancement of the existing [SCENE DESCRIPTION] while preserving the exact composition, camera angle, [KEY OBJECT] positions, lighting direction, and [BACKGROUND]. [SUBJECT DESCRIPTION] remains [POSITION/ACTION] with [ENVIRONMENT]. [DETAIL LANGUAGE BLOCK — pick from presets below]. Maintain the same [LIGHTING TYPE] and direction. Keep the original [AESTHETIC] with [COLOR PALETTE] and [MOOD]. Improve sharpness and dynamic range while retaining [ATMOSPHERE QUALITY] and photographic authenticity. [ANTI-INSTRUCTIONS].
```

### Detail language presets

Swap into the `[DETAIL LANGUAGE BLOCK]` slot.

---

#### Automotive

```text
Improve automotive surface realism: visible metallic flake or matte micro-texture in paint, accurate specular highlights and reflections on body panels, realistic clear coat depth, panel gap definition, carbon fiber weave pattern where present, brake caliper texture behind spokes, tire sidewall lettering and tread pattern, exhaust tip interior detail and heat discoloration, natural paint color shift across curved surfaces. Sharpen LED headlight/taillight internals — define each element, accurate light bleed onto surrounding bodywork. Define wheel spoke edges, grille mesh, and intake openings. Sharpen any sponsor decals or badges — crisp edges, accurate text. Increase micro-contrast across all surfaces. No license plates. No added badges or text.
```

#### Portrait / Character

```text
Improve skin realism and facial detail: visible pores, subtle freckles, natural skin micro-texture, fine facial hair, realistic lip texture, detailed eyelashes, natural catchlights in the eyes, and slightly imperfect skin variation while avoiding artificial smoothing. Enhance subtle highlight roll-off on cheekbones and nose, preserving soft shadows. Increase micro-contrast across fabrics: detailed weave, realistic stitching and folds. Sharpen hair strand definition and jewelry/accessory detail.
```

#### Environment / Landscape

```text
Improve environmental detail: sharper foliage with individual leaf definition, bark and branch texture, rock surface grain, water surface caustics and reflection accuracy, cloud structure and edge definition, atmospheric depth layering, god ray definition if present. Increase ground surface micro-detail — gravel, asphalt, dirt, grass blade separation. Sharpen architectural edges and material textures where visible.
```

#### Product

```text
Improve material surface realism: accurate specular behavior across material types (metal, glass, plastic, fabric, leather), edge definition and chamfer sharpness, logo and text crispness, packaging texture and print detail, surface imperfections where appropriate (brushed metal grain, leather pore, fabric weave). Increase micro-contrast without blowing highlights on reflective surfaces.
```

---

## Workflow

1. User says "enhance this" / "upscale" / "sharpen" / "add detail" / "make it more realistic"
2. **Quick enhance** — if user wants fast results or doesn't specify a preset
3. **Deep enhance** — if user wants maximum fidelity, specifies a preset, or the image is for a production project
4. For deep: analyze the image → pick preset → fill template → show user → run on approval
5. Always run at **2K** first for review, then **4K** for final

## Triggers

"upscale", "enhance", "sharpen", "add detail", "more realistic", "higher res", "improve quality", "make it sharper", "clean it up", "enhance without changing"
