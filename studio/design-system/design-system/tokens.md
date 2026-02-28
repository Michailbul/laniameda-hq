# Design Tokens — Laniameda Design System
**Source of truth: ImageStitch (light theme)**
**Date: 2026-02-28**

---

## Color Tokens

### Light Theme (canonical)
```css
:root {
  /* Backgrounds */
  --bg-background: #ffffff;          /* Pure white — page background */
  --bg-surface: #fafafa;             /* Zinc 50 — cards, panels, sidebars */
  --bg-inverse: #18181b;             /* Zinc 900 — inverse elements */

  /* Borders */
  --border-color: #e4e4e7;           /* Zinc 200 — all borders */

  /* Text */
  --text-primary: #09090b;           /* Zinc 950 — headings, body */
  --text-secondary: #71717a;         /* Zinc 500 — labels, metadata */
  --text-inverse: #fafafa;           /* On inverse backgrounds */

  /* Accent */
  --color-accent: #FF552E;           /* Orange-red — CTAs, active states */
  --color-accent-dim: #FFF0EC;       /* Soft orange — accent backgrounds */

  /* Structural */
  --grid-line: rgba(0, 0, 0, 0.04);

  /* Shadows */
  --shadow-sharp: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-elevated: 0 20px 40px -10px rgba(0,0,0,0.10);
}
```

### Dark Theme
```css
.dark {
  --bg-background: #09090b;
  --bg-surface: #121215;
  --border-color: #27272a;
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --color-accent: #FF552E;
  --color-accent-dim: #381a12;
  --bg-inverse: #f4f4f5;
  --text-inverse: #09090b;
  --grid-line: rgba(255,255,255,0.05);
  --shadow-sharp: 0 4px 12px rgba(0,0,0,0.50);
  --shadow-elevated: 0 20px 40px -10px rgba(0,0,0,0.50);
}
```

### Named Palette Reference
| Token | Light | Dark | Tailwind Ref |
|---|---|---|---|
| background | #ffffff | #09090b | white / zinc-950 |
| surface | #fafafa | #121215 | zinc-50 / custom |
| border | #e4e4e7 | #27272a | zinc-200 / zinc-800 |
| text-primary | #09090b | #f4f4f5 | zinc-950 / zinc-100 |
| text-secondary | #71717a | #a1a1aa | zinc-500 / zinc-400 |
| accent | #FF552E | #FF552E | custom |
| accent-dim | #FFF0EC | #381a12 | custom |
| inverse-bg | #18181b | #f4f4f5 | zinc-900 / zinc-100 |

---

## Typography

### Font Stack
```
sans:  Inter (300, 400, 500, 600)       — UI, body, labels
serif: DM Serif Display (regular, italic) — Display headings, editorial
mono:  JetBrains Mono (400, 500)        — Code, technical values
```

### Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type Scale
| Role | Size | Weight | Font | Use |
|---|---|---|---|---|
| Display | text-2xl / 3xl | 400 | serif | Hero titles |
| Heading | text-lg / xl | 500 | sans | Section titles |
| Body | text-sm | 400 | sans | UI text, descriptions |
| Label | text-xs | 500 | sans | Metadata, tags, counts |
| Micro | text-[9px]-[11px] | 400 | sans | Badges, captions |
| Code | text-xs | 400 | mono | Values, paths |

---

## Spacing (4px base)
| Value | px | Use |
|---|---|---|
| 1 | 4px | Icon padding |
| 1.5 | 6px | Compact buttons |
| 2 | 8px | Default gap |
| 3 | 12px | Compact section padding |
| 4 | 16px | Standard padding |
| 6 | 24px | Section spacing |
| 8 | 32px | Large gaps |

---

## Border Radius
| Class | Value | Use |
|---|---|---|
| rounded-sm | 2px | Micro elements |
| rounded | 4px | Buttons, inputs, tags |
| rounded-md | 6px | Cards, dropdowns |
| rounded-lg | 8px | Modals, panels |
| rounded-full | 9999px | Avatars, pills |

---

## Shadows
```
sharp:    0 4px 12px rgba(0,0,0,0.08)       — popovers, hover cards
elevated: 0 20px 40px -10px rgba(0,0,0,0.10) — modals, overlays
```

---

## Animations
```
fade-in:  fadeIn 0.4s ease-out
slide-up: slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)

Hover transitions:    0.15s
Color transitions:    0.3s
Enter animations:     0.4s
```

---

## Tailwind Config
```js
theme: {
  extend: {
    colors: {
      background: 'var(--bg-background)',
      surface: 'var(--bg-surface)',
      border: 'var(--border-color)',
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      accent: 'var(--color-accent)',
      accentDim: 'var(--color-accent-dim)',
      inverse: 'var(--bg-inverse)',
      inverseText: 'var(--text-inverse)',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['DM Serif Display', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    boxShadow: {
      sharp: 'var(--shadow-sharp)',
      elevated: 'var(--shadow-elevated)',
    },
  }
}
```

---

## Grid Background Pattern
```css
.grid-bg {
  background-size: 50px 50px;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
}
```

## Selection & Scrollbar
```css
::selection { background: var(--color-accent); color: white; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
```
