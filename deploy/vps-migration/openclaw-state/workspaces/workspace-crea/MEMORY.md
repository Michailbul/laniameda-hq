# MEMORY.md — Crea's Long-Term Memory

## Studio Context
laniameda = AI-native creative studio. Marketing First. Pre-seed.
Michael is the founder — AI creator, building in public.

## Products I Support
- **laniameda.gallery** — AI creatorship vault (images, prompts, model tags)
- **AI Creator OS** — prompt storage + Convex backend
- **RunMusic** — Telegram Mini App (less creative focus, but design matters)

## laniameda.gallery Pillars
1. **Creators** — AI influencer/fashion/portrait prompts
2. **Cars** — Cinematic automotive references and prompts
3. **Designs** — Website, UI, mobile, component designs
4. **Dump** — Catch-all for anything useful

## Key Model Landscape (as of 2026-03)
- **Nano Banana Pro** — primary image gen tool for the studio (UGC, casual, natural look)
- **Nano Banana 2** (Google, March 2026) — cinematic, typography, character consistency. 60% cheaper via Enhancer. NOT a straight upgrade — Pro still wins for UGC/iPhone realism
- **LTX-2** (Lightricks) — first open-weights audio+video model, native 4K, self-hostable
- **Seedance 2.0** (ByteDance) — hyperrealistic video
- **FLUX** — strong open-weights image model

## Prompt Craft Direction (high-level)
- Prompt writing quality is the main lever. Avoid seed-first teaching.
- Focus on: clear subject, coherent scene, intentional composition, concrete lighting, bounded style, explicit constraints.
- Consistency comes from language anchors and controlled semantic iteration.
- **Locked rule from Michael (2026-04-05):** when writing image prompts, think from the final frame backward. Describe only the assets, variables, and visual information that would actually be visible in the final image. Do not include off-frame or non-visible scene details, because they cause angle drift and unwanted generation changes.

Detailed frameworks/templates live in skills docs:
- `skills/prompt-mechanics/nano-banana-2-prompt-framework.md`
- `/root/.openclaw/workspace/skills/crea-cinematic-prompts/SKILL.md`

## TODO: Model Tag Convention
Every image in laniameda.gallery needs a model tag (e.g., Nano Banana Pro, FLUX, Midjourney, CDANCe).

## laniameda.gallery — Convex Deployment
**ONE deployment only: `perfect-buffalo-375.convex.cloud`**
- CONVEX_URL in .env = `https://perfect-buffalo-375.convex.cloud`
- KB_OWNER_USER_ID = `278674008`
- The Convex CLI access token in `~/.convex/config.json` links to a dev instance (`robust-gnu-269`) — IGNORE IT
- To deploy schema/functions to prod, Michael must run `npx convex deploy` from his local machine
- Do NOT waste time trying to deploy Convex from the VPS — it always hits the wrong instance

---

## Prompting Technique Research — What Actually Works in Nano Banana 2 (2026-03-11)

Source: Curious Refuge — "Is Prompting for Image Quality Dead?" (~19min, tested in Nano Banana 2 via Freepick)

### Core Finding
**Reference image + simple naturalistic prompt beats all viral prompting "hacks" by a clear margin.**
This is the default workflow. Everything else is secondary.

### Technique Verdicts (Nano Banana 2 specific)

| Technique | Verdict | Notes |
|---|---|---|
| Reference image + naturalistic prompt | ✅ Best | Default approach. Wins consistently. |
| Camera language (Arri Alexa 35, specific aperture/ISO) | ✅ Slight improvement | Worth adding when precision matters |
| Keyword salad (8K, 4K, hyperrealistic) | ❌ No improvement or worse | Skip entirely |
| JSON prompting | ❌ Inconsistent, sometimes dramatically worse | Not worth the overhead |
| Negative tags | ❌ Mostly worse results | Skip |

### Why Keyword Salad Degrades Quality
"8K, hyperrealistic, ultra-detailed" — these tags are strongly associated with **stock photo databases** in training data. Using them steers output toward stock-looking results. This is why they feel cheap even at high fidelity.

### Bonus: Gemini JSON Prompt Template (from video description)
Structured around: `Subject / Environment / Lighting / Camera_Settings / Composition + Director's Note`
Copy-paste Gemini prompt available for generating JSON prompts for Nano Banana 2.
**Verdict:** Based on test results, JSON prompting underperforms — treat as experimental only, not default.

### Operational Rule (locked)
When writing prompts for Nano Banana 2:
1. Start with a reference image when possible
2. Write a clean, naturalistic prompt — describe the scene, not the rendering parameters
3. Add camera language only when specific lens/grain quality matters
4. Never add keyword salad quality boosters
5. Skip JSON and negative tags unless specifically experimenting

## Image Style Extractor — Key Utility Prompt (2026-03-14)
Critical workflow prompt: converts any reference image into a reusable generation prompt for [MODEL/WORKFLOW].
- Always starts with: `amateur iphone photography with no blur background`
- Followed by [LORA TOKEN] then subject description
- One paragraph, no labels, only visible details, no invented facts
- Works for: UGC portraits, product shots, environments, architecture, landscapes
- Full prompt saved at: `/root/.openclaw/workspace-crea/docs/image-style-extractor-prompt.md`
- Also in gallery (ingestKey: `utility:image-style-extractor:v1`)

## Nano Banana 2 — Edit Control Patterns (2026-04-02)
From Shlabu's Craft breakdown, the durable value is not the golf niche — it's the edit-control language.

### Locked variables clause
Use this when preserving the shot matters more than the change itself:
`Keep the original image's composition, camera angle, framing, lens behavior, depth of field, pose, and lighting direction exactly the same. Do not alter perspective or subject positioning unless explicitly requested.`

### Color-grade transfer template
Use this for look-dev transfer from a style image onto a target frame:
`Transfer the exact color grade and tonal treatment from the reference style image onto the target image. Keep the target image's composition, framing, focus, lighting direction, pose, depth of field, and camera perspective exactly the same. Do not alter subject position or lens behavior. Apply only the tonal palette, contrast behavior, highlight rolloff, shadow density, and overall cinematic color treatment from the style reference.`

### Subject-replacement template
Use this for identity swaps and personalized edits:
`Replace the original subject with the person from the reference images, seamlessly integrated into the exact same pose, body positioning, framing, camera angle, and environment. Preserve natural biomechanics, perspective, scale, and shadow consistency. Match the original lighting conditions exactly. Maintain realistic skin texture, visible pores, fine facial detail, and natural tonal variation. No smoothing, no distortion, no artificial blending artifacts.`

### Canonical realism specimen
The strongest prompt specimen from that source is the extreme macro golfer close-up: low camera position, 100mm macro lens, ultra-shallow depth of field, realistic outdoor tournament light, visible pores/freckles/stubble, no smoothing, and tactile editorial sports realism. Treat it as a benchmark reference for close-up realism prompts, not as a sports-only recipe.

## MJ → NB2 Enhancement Pipeline (2026-04-02)
Source: Shlabu's Craft guide — Midjourney x Nano Banana

### The Workflow
Midjourney builds the scene → Nano Banana 2 enhances realism. Two-stage, not one.
- **MJ role:** Scene, character, lighting, camera, color grade
- **NB2 role:** Skin texture, fabric detail, color grade depth — NOT restructuring
- NB2 always receives the MJ image as a reference input

### NB2 Enhancement Prompt Template (locked)
```
Ultra-realistic enhancement of the existing [SCENE DESCRIPTION] photograph while preserving the exact composition, pose, camera angle, [KEY OBJECT] position, lighting direction, and background elements. [SUBJECT + wardrobe + position]. Improve skin realism and facial detail: visible pores, subtle freckles, natural skin micro-texture, fine facial hair, realistic lip texture, detailed eyelashes, natural catchlights in the eyes, and slightly imperfect skin variation while avoiding artificial smoothing. Maintain the same [LIGHTING TYPE] and direction, enhancing subtle highlight roll-off on the cheekbones and nose and preserving soft shadows. Increase image clarity and micro-contrast across fabrics and environment: detailed weave in [FABRIC], realistic stitching and folds, textured [GROUND], sharper [BACKGROUND DETAIL]. Keep the original [AESTHETIC] with controlled grain, cinematic color grading, [COLOR PALETTE]. Improve sharpness and dynamic range while retaining the nostalgic atmosphere, natural depth, and photographic authenticity.
```

### Midjourney Style Code
- `--p owuip2c` = Shlabu's personal moodboard code — warm, cinematic, travel-photography aesthetic
- MJ style codes are created via the style tuner and stored as `--p <code>`
- Significant aesthetic difference: always test with vs without

### Skill
- Skill built: `laniameda-skills/skills/ai-creatorship/mj-nb2-pipeline/SKILL.md`
- Pushed to laniameda-skills + laniameda-hq submodule update
- **TODO:** Create `midjourney` skill (placeholder in mj-nb2-pipeline — revisit with Michael)

### Gallery
- 6 images ingested to `creators` pillar with `mj-nb2-pipeline` tag
- ingestKeys: `workflow:mj-nb2-pipeline:*`

## Nano Banana Pro — Cinematography Style Transfer Prompt (2026-04-07)
Use when transferring the style/vibe/look of reference images to a new generation.
Append after your shot description. Attach 2–4 reference images.

```
Match the cinematography of the attached reference images. Extract and apply their composition (framing, subject placement, depth layers), lighting (direction, quality, contrast, color temperature), color grade (palette, saturation, tonal style), and atmosphere (depth of field, haze, texture, grain). The content is what I described above. The look belongs in the same film as the references—same DP, same colorist, same visual language. Do not recreate the references; use them as a style template.
```

**Rule:** Describe your shot first → append this → attach 2–4 reference images. Replicates style/cinematography/color/composition without copying the reference content.

## Motion-Ready Start Frames for AI Video (2026-04-02)
When generating a still frame that will later be animated into an AI video shot, do **not** treat it like a neutral photo. Treat it like a **motion-ready keyframe**.

### Rule
If the final video should feel kinetic, the starting still should already imply movement.

### What that means in practice
- Build the frame as if the action has already started
- Favor asymmetry, momentum, directional energy, fabric/hair movement, active posture, and continuation-ready gestures
- Avoid static portrait energy for shots that are meant to animate

### Prompting implication
For stills intended for later animation, use motion language when appropriate:
`kinetic`, `dynamic`, `mid-motion`, `caught in movement`, `in-action`, `directional energy`, `wind-swept`, `hair in motion`, `fabric in motion`

### Planning implication
In shot decks / creative planning, separate:
- static beauty frames
- animation-ready frames

Animation-ready frames should be prompted like frames pulled from a moving shot, not like frozen product photos.
