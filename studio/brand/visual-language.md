# Visual Language

**Status:** Locked
**Source of truth:** [Figma — Design System v2.0](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=102-2)
**Last updated:** 2026-04-02

---

## Imagery

**Mood:** Cinematic. Warm shadows, intentional framing. Every image looks like a still from a film worth watching.

**Color grading:** Warm highlights, deep shadows. Slightly desaturated midtones. Ember tones in highlights when possible.

**Contrast:** High. Shadows are dark, highlights glow. No flat even lighting.

**Composition:** Tight crops, unusual angles, corner framing. Nothing center-composed or stock-looking.

**Avoid:** Stock photo aesthetics, flat unshadowed imagery, over-saturated colors, busy decorative patterns.

---

## Image Treatments

| Treatment | When | CSS |
|---|---|---|
| **Rounded card** | Content slides, grids | `border-radius: 20px; overflow: hidden;` |
| **Stacked fan** | Cover slides, showcases | `transform: rotate(±3deg) scale(0.92); z-index stacking` |
| **Full-bleed** | Photo-first content | `object-fit: cover; width/height: 100%` |
| **Dark overlay** | Text on photo | `background: rgba(10,8,5,0.75)` |
| **Soft shadow** | Floating cards | `box-shadow: 0 12px 40px rgba(0,0,0,0.2)` |
| **White border** | Images on dark bg | `border: 3px solid var(--linen)` |
| **B&W editorial** | Photos on bold colored bg | `filter: grayscale(1)` — prevents color fights with bold bg |
| **Text on quiet zone** | Photo has natural empty area | `text-shadow: 0 2px 20px rgba(0,0,0,0.5)` — no overlay needed |

---

## Texture & Grain

Subtle grain adds warmth and kills sterility. Applied via SVG `feTurbulence` filter.

| Level | Opacity | When |
|---|---|---|
| **Paper** | 2–4% | Warm editorial surfaces. Default for light backgrounds. |
| **Medium** | 6–8% | Adding depth to solid colors. |
| **Heavy** | 40–50% | Grain IS the surface — statement moments. |

### Vertical Line Texture

For moody/plum surfaces. Creates subtle vertical striping.

```css
.texture-lines::after {
  background: repeating-linear-gradient(90deg,
    rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px,
    transparent 1px, transparent 4px);
}
```

### SVG Grain Filter

Include once per HTML document:

```html
<svg style="position:absolute;width:0;height:0" aria-hidden="true">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
</svg>
```

---

## Shape Language

- **Rounded corners** on image cards: 16–24px radius
- **Full-bleed** photos: 0px radius
- **Pill shapes** for badges, tags, labels
- **Dark frames** for framed panel layouts: 12–16px border, 12px radius

---

## Motion (when applicable)

- Subtle. Utility-first. Never performative.
- Hover: 100–200ms. No bounce, no color explosion.
- Transitions: 300–400ms smooth.
- No large-scale page motion. No busy micro-animations.
- Rule: if the animation calls attention to itself, it's too much.

---

## Do / Don't

### Do

- Use dark and light surfaces within one composition for variety
- Use images, card stacks, grids — visual layouts, not just text on backgrounds
- Push scale contrast hard (200px hero word next to 30px supporting text)
- Use rounded corners on image cards (16–24px)
- Add subtle grain texture on warm surfaces
- Apply decorative touches: tape, rotation, pill badges, shadows
- Let negative space breathe (40%+ on statement slides)

### Don't

- Build 7+ dark slides in a row — monotonous, fatiguing
- Use generic text-on-dark for every slide
- Pair Vermillion + Coral on the same slide
- Use Plum as text color
- Use pure black `#000` or pure white `#FFF`
- Center-align body text (left-align by default)
- Put more than 30–40 words on a content slide
- Use more than 3 colors per slide
- Use emojis as icons in production content
