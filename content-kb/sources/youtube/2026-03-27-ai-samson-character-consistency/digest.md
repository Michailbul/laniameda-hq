# AI Samson — Character Consistency Digest
**Video:** https://www.youtube.com/watch?v=G01kghX152g
**Channel:** AI Samson (~14min)
**Digested:** 2026-03-27

---

## Core System: Character Sheet → Reference Lock

The whole method is built around one thing: **generate a character sheet first, use it as the reference anchor for everything else.**

The character sheet shows the character from: front full body, side full body, three-quarter, back, face close-up front, face close-up profile. Six views, one image. This becomes your consistency anchor for all downstream work.

---

## Tool Stack

| Tool | Role |
|------|------|
| **Midjourney** | Source of initial character aesthetics — highest aesthetic quality |
| **Google Flow** | Main workspace for Nano Banana Pro/2 — preferred over raw Gemini for visual creation |
| **Nano Banana Pro** | Primary image generation model (used in most of the video) |
| **Nano Banana 2** | Also tested, author claims "even stronger" for this workflow |
| **ChatGPT** | Metaprompting — enhancing prompts before using in Flow |
| **Kling / Flow video** | Ingredients-to-video and frames-to-video for animation |

---

## Workflow: Full Pipeline

### Stage 1 — Character Creation
Option A (recommended): Create character in Midjourney → use as image reference in Google Flow
Option B: Create original character directly in Flow using text prompt

Nano Banana is "visually intelligent" — it understands the multi-angle layout from the character sheet prompt without needing explicit coordinate instructions.

### Stage 2 — Character Sheet Generation
- Use the character sheet prompt (see prompts.md)
- Set outputs to 4 (AI rarely nails it first try)
- Common bug: doesn't always show full-body head-to-toe → fix below

**Full-body fix prompt:**
> Remake this image, ensuring the entire top row shows full body views from head to toe. All subjects in top row must be fully visible including feet with no cropping at the ankles, knees or head.

### Stage 3 — Variations from the Sheet
All downstream work uses the character sheet as an image reference input:

**Lighting change:** Insert character sheet + lighting prompt → generates same character in new lighting scenario

**Outfit change:** Insert character sheet + outfit prompt + optionally an outfit reference image → character wears the new outfit

**Text-only character (no reference):** Skip image reference, use text prompt to define character. Faster, less control. Good for minor/background characters.

### Stage 4 — Multi-character Scenes
- Develop multiple characters separately (each with their own sheet)
- Reference both character sheets + define the interaction in the prompt
- Use **ChatGPT metaprompting** to expand the scene description before sending to Flow

### Stage 5 — Animation
Two approaches:

**Fast (less control):**
Flow → switch to "Ingredients to Video" → upload character sheet → prompt the action

**Better (more control):**
1. Create a still image of the character in the scene (image ref + scene prompt)
2. Flow → Frames to Video → use that still as first frame

### Stage 6 — Aging / Time-lapse
1. Generate portrait at Age A (from sheet reference)
2. Generate portrait at Age B (add years in prompt)
3. Frames to Video: Age A as first frame, Age B as second frame
4. Prompt: "time-lapse between these two ages"

---

## Key Insights

- **Midjourney for aesthetics, Flow/Nano Banana for consistency** — best of both tools
- **4 outputs standard** — don't expect the system to nail it in one shot
- **Metaprompting is in the workflow** — ChatGPT to expand/sharpen prompts is a real step, not optional
- **Complex edge cases tested:** facial tattoos, scars, piercings — all maintained consistency
- **"Ingredients" in Flow = other tools' "first frame" or "image-to-video"** — naming varies across platforms
- Character sheets unlock: outfit swaps, lighting changes, aging, multi-character scenes, video from stills — all from one anchor image

---

## Prompt Philosophy (from Notion page)

The prompts work by **replacing CG/game language with photographic language**:

| Avoid | Use |
|-------|-----|
| "Character reference sheet" | "Photographic identity sheet" |
| "Model turnaround" | "Contact sheet" |
| A-pose | Natural, casual stance |
| Mechanical perfection | Identity consistency without symmetry |
| 3D render/CGI/game character | Real photography, documentary feel |

This keeps consistency but restores human realism.

---

## Notes on Model
- Author says Nano Banana 2 is "even stronger" than Nano Banana Pro for this workflow
- Most demo footage was Nano Banana Pro (via Google Flow)
- Google Flow preferred over raw Gemini for visual creation tasks
