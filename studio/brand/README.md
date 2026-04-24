# Laniameda — Brand Visual Identity

**Ground truth for all visual systems.** Carousels, reels, website, product UI — everything references this folder.

**Figma source:** [Design System v2.0](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=102-2) | [FONTS board](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=48-21) | [Carousel Components](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=204-2)

---

## Files

| File | What it defines |
|---|---|
| [identity.md](identity.md) | Brand core, personality, archetype, four principles |
| [colors.md](colors.md) | Full 5-tier color system, themes, gradients, combos, rules |
| [typography.md](typography.md) | 9 approved fonts, 7 Figma-verified pairings, type scale, rules |
| [voice.md](voice.md) | Brand voice, copy standards, content pillars, quality bar |
| [visual-language.md](visual-language.md) | Imagery, image treatments, texture/grain, shape, motion |
| [logo.md](logo.md) | Wordmark, brand mark, chrome system, clear space |
| [tokens.css](tokens.css) | Canonical CSS custom properties — import this in any HTML/CSS system |

---

## How to use

### For carousel-engine, reels-engine, or any content system:

1. Import `tokens.css` as the base CSS layer
2. Reference `colors.md` and `typography.md` for design decisions
3. Apply theme classes (`.theme-dark`, `.theme-light`, etc.) from `tokens.css`
4. Follow `voice.md` for all copy
5. Follow `visual-language.md` for imagery and texture

### For website or product UI:

Same brand tokens apply. The color system and font stack are universal. Extend with product-specific tokens as needed, but never override the base palette.

---

## Rules (quick reference)

- No pure black `#000` or pure white `#FFF`
- Max 3 colors per slide/composition
- Max 2 font families per slide
- Dark mode is default
- Coral is the anchor — headlines on dark, never body text
- Plum is background only — never text
- Vermillion is CTA only
- Ember is sacred — brand signature moments only

---

**Status:** Locked from Figma Design System v2.0
**Last updated:** 2026-04-03
