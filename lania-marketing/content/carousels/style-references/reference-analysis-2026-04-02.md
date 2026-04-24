# Carousel Style Reference Analysis
**Date:** 2026-04-02
**Source:** 8 reference slides (7 unique) from Instagram carousels
**Purpose:** Foundation for code-rendered carousel system

---

## Style Families Summary

| Family | Slides | Key Structural Pattern | CSS Complexity |
|--------|--------|----------------------|----------------|
| **Agency Editorial Light** | 1/6, 5 | Light gray bg, image card grids, mixed-weight type, pill labels, corner branding | Medium |
| **Full-Bleed Photo + Type** | 4, 8 | Photo fills 100%, text overlay, massive scale contrast (5x+), dark panels | Simple-Medium |
| **Bold Single-Surface** | 2, 7 | One dominant surface (grain/gradient), single text block, 55-65% negative space | Simple-Medium |
| **Warm Editorial Serif** | 3 | Cream bg + paper texture, serif display, single decorated image, centered | Medium |

---

## Slide 1/6: "Image gen Prompts" — Agency Editorial Card Stack

```yaml
name: agency-editorial-card-stack
family: Agency Editorial Light

surface:
  background: "#e6e3de — warm light gray, flat matte, no texture"
  borders: none
  corner_radius: 0px

typography:
  display:
    text: "Image gen Prompts"
    font: "Darker Grotesque Black (900) for 'Image', Medium (500) for 'Prompts'"
    size: "~120px / ~100px"
    color: "#1a1a1a"
    alignment: center
    special: "'gen' in green script/cursive ~48px — needs handwriting font or SVG"
  body:
    text: "connect. communicate. convert."
    font: "Inter Regular, 'convert' Bold"
    size: ~20px
    color: "#4a4a4a"
  tertiary:
    text: "corner branding — agency name, year, category, logo"
    font: "Inter 14-16px, mixed weights"
    style: "positioned at 4 corners of slide"
  effects:
    - "ghost watermark: 'Digital' / 'AI' at ~200px, 4% opacity behind headline"
    - "tagline in subtle pill: 1px border, border-radius 24px"

layout:
  composition: "vertical stack — top branding, centered card cluster, headline, tagline, footer"
  negative_space: 45%
  margins: "50-60px all sides"

images:
  count: "4+ stacked"
  arrangement: "fan stack — center card front (z-index 4, no rotation), back cards rotated ±3-5deg, offset, scale 0.92"
  shape: rounded-xl (~20px radius)
  border: "thin white ~3px"
  shadow: "soft 0 8px 30px rgba(0,0,0,0.15)"

css_techniques:
  - "Card stack: absolute-positioned images, z-index stacking, back cards transform: rotate(±3deg) translateX(±30px) scale(0.92)"
  - "Ghost watermark: absolute, font-size 200px, opacity 0.04"
  - "Corner branding: absolute positioning at each corner"
  - "Tagline pill: border 1px #ccc, border-radius 24px, padding 8px 24px"
```

---

## Slide 2: "sites for ai agents." — Neon Grain Statement

```yaml
name: neon-grain-statement
family: Bold Single-Surface

surface:
  background: "#0a0a0a dark frame + #8cc800 green fill with heavy noise"
  texture: "SVG feTurbulence, baseFrequency ~0.65, numOctaves 4, 60-70% intensity — grain IS the surface"
  borders: "solid ~16px #0a0a0a outer frame"
  corner_radius: "outer ~12px, inner green area ~12px"

typography:
  display:
    text: "sites for ai agents."
    font: "Darker Grotesque Black (900)"
    size: ~160px
    case: lowercase
    color: "#0a0a0a"
    letter_spacing: -0.03em
    line_height: 0.9
    alignment: left
    max_width: 80%
  body: none
  tertiary: none

layout:
  composition: "single statement, vertically centered-left"
  negative_space: "60%+"
  margins: "~80px sides, ~300px top/bottom from inner frame"

images:
  count: 0

css_techniques:
  - "Dark border frame: outer div bg #0a0a0a, padding 16px, inner div with colored bg + grain + border-radius"
  - "Heavy grain: SVG filter feTurbulence baseFrequency=0.65 numOctaves=4, composited at 60%+ over solid color"
  - "Alternative: CSS noise via repeating radial-gradient or base64 PNG tile"
```

---

## Slide 3: "Instead of generic product shots..." — Warm Editorial Serif

```yaml
name: warm-editorial-serif
family: Warm Editorial Serif

surface:
  background: "#f2ece4 — warm cream with subtle paper texture at 3-5% opacity"
  texture: "SVG feTurbulence baseFrequency=0.9 numOctaves=6 at 3% opacity, or tiling paper image"
  borders: none
  corner_radius: 0px

typography:
  display:
    text: "Instead of generic product shots, build cinematic hero scenes"
    font: "Fraunces Black (900)"
    size: ~64px
    color: "#3d2e1a — warm dark brown"
    alignment: center
    max_width: 85%
  body:
    text: "that communicate scale, mood, and positioning in one frame."
    font: "Inter Regular"
    size: ~28px
    color: "#3d2e1a"
    alignment: center
  tertiary:
    text: "Nano Banana description — italic, 22px, 80% opacity"

layout:
  composition: "centered vertical stack — headline top, image center, description bottom"
  negative_space: 35%
  margins: "~80px all sides"

images:
  count: 1
  shape: rounded-xl (~16px)
  size: "~35% of slide area"
  border: "thin white ~3px"
  shadow: "soft 0 4px 20px rgba(0,0,0,0.1)"
  decorative: "tape strip — beige rectangle ~60x20px, rotated ~15deg, positioned top-right of image"

css_techniques:
  - "Paper texture: pseudo-element with SVG noise at very low opacity"
  - "Tape decoration: ::after on image container, absolute top-right, bg #d4c4a8, transform rotate(15deg), opacity 0.8"
  - "Warm brown text (#3d2e1a) instead of pure black — cohesion with cream bg"
```

---

## Slide 4: Cyclist Prompt — Full-Bleed Photo Overlay

```yaml
name: full-bleed-prompt-overlay
family: Full-Bleed Photo + Type

surface:
  background: "full-bleed photography, no bg color"
  texture: none
  borders: none

typography:
  display: none (image is the content)
  body:
    text: "PROMPT Low-angle, close-up shot of a female cyclist..."
    font: "Inter Regular (400), 'PROMPT' label Bold (700) with letter-spacing 0.15em"
    size: ~18px
    color: "#ffffff"
    alignment: left
  tertiary:
    text: "V4"
    style: "badge — pill bg #1a1a1a, color white, padding 6px 12px, border-radius 6px, top-left"

layout:
  composition: "full-bleed photo top 75%, dark text panel bottom 25%"
  negative_space: 10%

images:
  count: 1
  arrangement: full-bleed (100% of slide)
  overlay: "dark semi-transparent panel bottom — rgba(20,20,20,0.82), optional backdrop-filter blur(4px)"

css_techniques:
  - "img object-fit:cover, width/height 100%"
  - "Bottom panel: absolute bottom 0, bg rgba(20,20,20,0.82), padding 24px 28px"
  - "V4 badge: absolute top-left ~20px, bg dark, padding + border-radius"
  - "PROMPT label: text-transform uppercase, letter-spacing 0.15em, font-weight 700"
```

---

## Slide 5: "3 → Apply styles" — Tutorial Grid

```yaml
name: tutorial-grid-with-labels
family: Agency Editorial Light

surface:
  background: "#e8e4e0 — warm light gray, flat"
  borders: none

typography:
  display:
    text: "3 → Apply styles"
    font: "Fraunces — Light (300) for '3 →', Black (900) for 'Apply styles'"
    size: "~48px / ~80px"
    color: "#1a1a1a"
    alignment: left
    max_width: 60%
  tertiary:
    text: "'style' ×2, 'result' ×2, creator credits"
    style: "black pill labels — bg #1a1a1a, color white, border-radius 20px, padding 6px 16px"

layout:
  composition: "headline top-left, 2×2 image grid filling lower 70%, center avatar overlapping grid intersection"
  negative_space: 15%
  margins: "50-60px"

images:
  count: 5 (4 grid + 1 center avatar)
  grid: "CSS Grid 1fr 1fr, gap 16px"
  shape: "grid images rounded-lg ~12px, avatar circle 50%"
  avatar_border: "4px solid accent (orange ~#e86830)"
  labels: "absolute bottom-center of each grid cell, pill-shaped"

css_techniques:
  - "CSS Grid grid-template-columns: 1fr 1fr, gap 16px"
  - "Center avatar: absolute 50%/50%, translate(-50%,-50%), z-index above grid"
  - "Pill labels: absolute bottom 12px, left 50%, translateX(-50%)"
```

---

## Slide 7: Orange Gradient CTA

```yaml
name: bold-gradient-cta
family: Bold Single-Surface

surface:
  background: "linear-gradient(180deg, #FF6B35 0%, #E23D28 100%)"
  texture: "none — clean smooth gradient"
  borders: none

typography:
  display:
    text: "Drop 'prompts' below and I'll send you every prompt I used"
    font: "Darker Grotesque Bold (700), 'prompts' in Black (900)"
    size: ~64px
    color: "#ffffff"
    alignment: center
    max_width: 85%
  body:
    text: "filatov.design/prompts + cursor emoji"
    font: "Inter Regular, ~22px, white at 70% opacity"

layout:
  composition: "centered vertical — headline upper-center, URL mid, silhouette bottom"
  negative_space: 55%

images:
  count: 1 (minimal silhouette at bottom, optional)

css_techniques:
  - "background: linear-gradient(180deg, #FF6B35 0%, #E23D28 100%)"
  - "Emphasized word: span with font-weight 900"
  - "Silhouette: dark PNG, absolute bottom center, or mix-blend-mode multiply"
```

---

## Slide 8: "How to use Claude for Brands" — Photo Hero Mixed Type

```yaml
name: full-bleed-photo-hero-mixed-type
family: Full-Bleed Photo + Type

surface:
  background: full-bleed photography
  texture: none

typography:
  display:
    text: "How to use Claude for Brands"
    structure:
      - "'How to use' — Light sans ~36px (Space Grotesk Light or Inter Light)"
      - "'Claude' — Massive serif ~200px, Black weight (Fraunces Black). THE HERO."
      - "'for Brands' — Italic serif ~56px (Fraunces Italic or Cormorant Italic)"
    color: "#ffffff"
    alignment: center
    scale_contrast: "5.5× ratio (200px / 36px)"
    line_height: 0.85 for stacked block
  tertiary:
    top: "MOBILE EDITING CLUB — bold caps 14px, centered"
    bottom: "CTA pill — white bg, dark text, padding 14px 32px, border-radius 30px"

layout:
  composition: "full-bleed photo, brand top-center, massive headline center, CTA pill bottom"
  negative_space: 40%

images:
  count: 1
  arrangement: full-bleed
  overlay: "subtle dark gradient at bottom — rgba(0,0,0,0.15) for CTA readability"

css_techniques:
  - "img object-fit:cover 100%"
  - "Mixed-weight headline: flex column align-center, 3 separate elements with wildly different sizes"
  - "CTA pill: inline-block, bg white, color dark, border-radius 30px"
  - "Bottom gradient: pseudo-element, absolute bottom, height 30%, linear-gradient(transparent, rgba(0,0,0,0.15))"
  - "Scale contrast is the technique — 200px hero word does ALL the visual work"
```
