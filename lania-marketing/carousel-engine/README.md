# Carousel Engine

Code-rendered carousel system for Laniameda. HTML → Playwright → PNG.

## Structure

```
carousel-engine/
  components/          ← reusable HTML/CSS components (cards, grids, badges, etc.)
  themes/              ← theme presets (brand tokens per visual family)
  references/          ← extracted style sheets from reference carousels
  scripts/
    render.mjs         ← Playwright renderer (HTML → PNG + PDF)
  exports/             ← rendered output per carousel
    <carousel-name>/
      slides/01.png...
      carousel.pdf
  builds/              ← carousel HTML source files
    <carousel-name>/
      slides.html
  preview.html         ← local preview page
  SKILL/               ← Claude Code plugin definition
    SKILL.md
  CAROUSEL-SYSTEM.md   ← design system rules
  CAROUSEL-STYLE-EXTRACT.md ← reference extraction prompt
```

## Workflow

1. **Extract** — paste reference image → get style sheet (CAROUSEL-STYLE-EXTRACT.md)
2. **Compose** — pick components + theme → build slides.html
3. **Render** — `node scripts/render.mjs --html builds/<name>/slides.html`
4. **Preview** — open preview.html in browser
5. **Ship** — export PNGs to socials

## Brand rules (non-negotiable)

- Laniameda palette (see CAROUSEL-SYSTEM.md)
- Darker Grotesque / Inter / JetBrains Mono + alt display fonts
- Dark is NOT the only theme — use light, editorial, gradient, photo-based
- Max 3 colors per slide, max 2 font families per slide
- 1080×1350 canvas, 80px margins, @2x retina export
