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
