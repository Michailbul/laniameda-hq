# Workflow: Carousel Code Generation

Generate executable code for a fixed-size carousel from a slide plan.

## Required context

Load before coding:
1. `.claude/skills/Carousel/references/carousel-design-skill.md`
2. `context/style/voice.md`
3. `.claude/skills/Carousel/references/carousel-page-template.tsx` (reuse structure)

## Input

- Carousel plan file (`@content/carousels/plans/...`)

## Code requirements

1. Use fixed slide canvas per slide:
   - `width: 1080`
   - `height: 1350`
2. Keep layout deterministic.
3. Keep text readable at mobile scale.
4. Include all slides from the plan.

## Output

Produce a single `.tsx` artifact in:

`content/carousels/code/MMDD-<slug>-YY.tsx`

Expected structure:
- `slides` data array
- `Slide` component
- `CarouselPreview` component
- Fixed per-slide root with `width: 1080` and `height: 1350`
