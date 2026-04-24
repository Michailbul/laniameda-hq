# Components

Reusable HTML/CSS building blocks for carousel slides.
Each component is a self-contained HTML snippet + CSS that can be dropped into any slide.

## Naming

```
<category>-<name>.html
```

## Categories

- **cards/** — image cards, stacked cards, content cards, stat cards
- **grids/** — 2×2, 3-col, masonry, asymmetric layouts
- **text/** — hero headlines, mixed-weight blocks, pull quotes, stat numbers
- **chrome/** — watermarks, dots, counters, headers, footers
- **badges/** — pills, tags, labels, status indicators
- **effects/** — grain overlays, gradients, tape decorations, vignettes
- **images/** — rounded frames, stacked photos, full-bleed, collage

## Usage

Components are copy-pasted into `slides.html` files.
Each component includes both the HTML snippet and required CSS.
Components use CSS custom properties from the theme — no hardcoded colors.
