# Design Principles — Laniameda Design System
**Date: 2026-02-28**

---

## Aesthetic Direction

**Artistic modern** — precision tools with a creative soul.

Not corporate SaaS. Not dark hacker aesthetic.
A light, clean, precise surface where art happens.

---

## Core Principles

### 1. Light is canonical
The light theme is the primary experience. Dark mode is a variant, not the default.
Light = creative workspace, natural, focused.

### 2. Zinc is the neutral foundation
All structural colors derive from Zinc (not gray, not slate, not neutral).
Zinc is warmer than pure gray, colder than stone — exactly right for a creative tool.

### 3. One accent. Used sparingly.
`#FF552E` (orange-red) is the only accent color.
It appears in: active states, focus rings, CTAs, selected items.
It does NOT appear in: decorative elements, icons, backgrounds (except via accentDim).

### 4. Hierarchy through weight and opacity
Color hierarchy:
- `text-primary` — #09090b — headings, active items, important values
- `text-secondary` — #71717a — labels, metadata, inactive states
- Accent `#FF552E` — interactive focus, selection

### 5. Surface separation via background stepping
- `--bg-background` (#fff) — page canvas
- `--bg-surface` (#fafafa) — elevated panels, sidebars, cards
- `--bg-inverse` (#18181b) — inverse badges, dark chips

Never use more than 3 surface levels on one screen.

### 6. Typography as character
**DM Serif Display** is used for editorial moments only — hero text, product names, display headings.
**Inter** carries all functional UI.
**JetBrains Mono** for any technical/code values.

This combination signals: precision (Inter) + artistry (DM Serif) + craft (JetBrains Mono).

### 7. Borders are hairlines, not walls
All borders at `#e4e4e7` / `border-color`. They define space without demanding attention.
Use `border-border/50` for subtler separations (30-50% opacity).

### 8. Motion is purposeful
- Hover: 0.15s — immediate feedback
- Color/theme transitions: 0.3s — smooth but snappy
- Enter animations: 0.4s with cubic-bezier(0.2, 0.8, 0.2, 1) — feels physical

Never animate for decoration. Every animation communicates state change.

### 9. Grid background for creative contexts
The subtle 50px grid pattern (`--grid-line: rgba(0,0,0,0.04)`) provides spatial reference in canvas/editor contexts. It disappears into the background — you feel it, you don't see it.

### 10. Density is intentional
Compact padding (6-12px) for tool panels.
Comfortable padding (16-24px) for content areas.
Never mix density levels within the same context.

---

## Anti-Patterns (Never Do)

- Multiple accent colors — the single accent is what makes it distinctive
- Heavy shadows — use sharp/elevated only, never colored or diffuse
- Rounded corners > rounded-lg — too friendly, loses precision
- Font-bold on body text — use font-medium maximum
- Background colors for decoration — only structure earns a surface
- Animation > 0.5s — starts to feel slow or cute
- Color as the only differentiator — always pair color with shape/position

---

## Product Application Notes

### ImageStitch
Ground truth. All tokens derived from here. Reference for any ambiguous decisions.

### Laniameda Gallery
Inherits ImageStitch design. Same zinc palette, same accent, same typography.
Gallery may use larger display type (DM Serif) more liberally — it's editorial.

### laniameda.com (Website)
Same tokens. More whitespace, more editorial moments, less tool density.
Hero sections lean into DM Serif Display.

### Future products
All new laniameda products start from this design system.
New tokens may be added but never override existing ones.
New accent colors require a system-level decision (not per-product).

---

## When to Break the Rules

Break the rules when:
- The content demands it (a purely typographic layout may use more serif)
- The context is marketing (more accent usage acceptable)
- The user has a known preference (dark mode toggle is always available)

Never break: spacing scale, border radius ceiling (rounded-lg max), single accent rule.
