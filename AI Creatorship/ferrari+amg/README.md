# Ferrari + AMG — Forest Race

## What This Is

AI video generation project. Two cars — a Ferrari and a Mercedes-AMG — racing through a forest. All files are natural language markdown, designed to be copy-pasted directly into prompts and generation tools.

## How to Navigate This Project

### `_project/` — Read This First

The source of truth. Before writing any prompt or generating anything, read the relevant files here.

- `_project/cars/ferrari.md` — Ferrari description. Model, year, color, distinguishing details. Use this verbatim when the Ferrari appears in any prompt.
- `_project/cars/amg.md` — Same for the AMG.
- `_project/locations/forest-road.md` — The forest environment. Terrain, vegetation, road surface, atmosphere. Use this when describing the scene environment.
- `_project/color-grading/forest-race.md` — The color grade and lighting profile. Time of day, mood, tonal direction. Apply this to every generation in this project.
- `_project/project-brief.md` — Global rules. Narrative intent, style, what ties everything together.

### `elements/` — Reference Material

Isolated reference images and frames, organized by subject. Not generations — these are inputs.

- `elements/cars/ferrari/` — Ferrari reference frames and stills.
- `elements/cars/amg/` — AMG reference frames and stills.
- `elements/locations/forest-road/` — Location reference images.

Use these as reference images when generating. Path them directly in prompts.

### `scenes/` — Where the Work Happens

Each scene is numbered. Inside each scene:

- `scene.md` — The scene brief. What happens, shot list, continuity notes. Read this before generating any shot.
- `prompts/prompt-log.md` — Curated log of prompts that produced approved results. Each entry has: the prompt text, the reference image path used, and feedback on why it worked. Only log prompts after the user confirms the result is good.
- `shots/shot-XX/` — Generated output per shot. Contains stills and video clips. No subdivision — everything for that shot lives flat in its folder.
- `color-grading/` — Scene-specific grade overrides (if the scene deviates from the global grade).

### `output/` — Final Assembly

- `output/raw/` — Assembled edits before upscaling.
- `output/upscaled/` — Final upscaled footage. This is the last step in the pipeline.

## Agent Workflow

1. Read `_project/` files to understand what you're working with.
2. Check `elements/` for available reference material.
3. Open the target scene's `scene.md` for the shot list and context.
4. Generate. When generating a shot, compose the prompt using the car descriptions, location description, and color grade from `_project/`.
5. Show the result to the user. Ask for feedback.
6. If approved — log the prompt in `prompts/prompt-log.md` with the reference image path and user's feedback notes.
7. Save generated output (stills, clips) into the appropriate `shots/shot-XX/` folder.
8. When all shots are done, assemble in `output/raw/`. Upscale last to `output/upscaled/`.

## Prompt Log Rules

Never log a prompt without user approval. When asking for feedback, be specific: "Does this work? Should I log this prompt?" Only winning generations go in the log.

## Status

- [x] Cars locked (Ferrari 812 Superfast + AMG GT3)
- [x] Location locked (European autumn forest road)
- [x] Color grade locked (teal-orange cinematic split, golden hour)
- [ ] Scene 01 — Forest Race: art direction locked, shots TBD
