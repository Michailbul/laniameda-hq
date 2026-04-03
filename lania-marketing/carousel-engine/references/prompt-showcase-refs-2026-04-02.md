# Prompt Showcase / Media Pillar — Reference Analysis
**Date:** 2026-04-02
**Source:** 2 reference slides (Instagram carousels)
**Pillar:** Media ingested (prompt showcases, image gen content)

---

## Ref A: Coral Quote + B&W Photo

```yaml
name: coral-quote-bw-photo
family: Bold Statement — Quote on Color variant

surface:
  background: "solid warm terracotta/coral (~#C67A5C or our var(--coral))"
  texture: none — flat matte
  borders: none

typography:
  display:
    text: "Three of us are technical and the other three are more product oriented, which is a really good team mix actually."
    font: "Serif Black — Fraunces Black (900) or similar high-contrast serif"
    size: ~56-64px
    color: "near-black (#1a1008 or var(--obsidian))"
    alignment: left
    line_height: 1.15
    style: "curly open-quote glyph, large"
  attribution:
    text: "Kitu Komya is an ML engineer and AI mentor."
    font: "Sans — name in Bold, role in Regular"
    size: ~24px
    color: "near-black"

layout:
  composition: "quote top 55%, B&W photo bottom 45%"
  negative_space: 30%
  margins: "~80px sides, ~60px top"

images:
  count: 1
  treatment: "B&W (filter: grayscale(1)), full-width, no rounded corners at bottom"
  content: "group of people working at laptops — editorial, candid"

laniameda_mapping:
  bg: "var(--coral) or any primary accent as solid surface"
  headline_font: "Fraunces Black 56-64px"
  body_font: "Inter Regular/Bold 24px for attribution"
  image: "filter: grayscale(1) — prevents color clash with bold bg"
  theme_class: ".theme-coral or custom"

css_techniques:
  - "Solid bg with no overlay — color IS the design"
  - "filter: grayscale(1) on image element"
  - "Serif at display size for quote — creates editorial authority"
  - "Attribution: span.bold for name, regular for role"
```

---

## Ref B: Plum Card Fan + Keyword Hero — (silhouette)

```yaml
name: plum-keyword-card-fan
family: Agency Editorial + Plum theme hybrid

surface:
  background: "deep plum/maroon (#4A2035 or our var(--plum)) with vertical line texture"
  texture: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px 1px, transparent 1px 4px)"
  borders: none

typography:
  display:
    text: "(silhouette)"
    font: "Rounded geometric sans — similar to our Inter or DG Medium"
    size: ~80px
    color: "warm cream/bone (#F0EBE8)"
    alignment: center
    style: "keyword in parentheses"
  header_bar:
    text: "MIDJOURNEY KEYWORDS / 2025 / GRAPHIC EXPLORATIONS"
    font: "JB Mono or spaced sans, uppercase, letter-spacing 0.15em"
    size: ~14px
    color: "muted cream at 50% opacity"
    layout: "3 items spread across top (left, center, right)"
  brand_title:
    text: "Midjourney Keywords"
    font: "Serif or script display — Fraunces or Cormorant"
    size: ~48px
    color: "muted plum-complement at 40% opacity"
  attribution:
    text: "CURATED BY @RUIDO.98"
    font: "JB Mono uppercase, letter-spacing 0.2em"
    size: ~12px
    color: "cream at 50%"

layout:
  composition: "header bar top → keyword hero center-top → card fan center → brand title bottom → attribution footer"
  negative_space: 35%

images:
  count: 3 visible (5 implied)
  arrangement: "fan stack — center card front, left/right rotated ±5deg, overlapping"
  shape: "rounded-xl (~24px radius)"
  content: "silhouette portraits with gradient skies — moody, artistic"
  shadow: "0 12px 40px rgba(0,0,0,0.3)"

laniameda_mapping:
  bg: "var(--plum) + .texture-lines"
  headline_font: "DG Medium or Inter Medium 80px"
  header_font: "JB Mono 14px uppercase, spaced"
  image: "card stack component with rounded corners"
  theme_class: ".theme-plum"

css_techniques:
  - "Vertical line texture via repeating-linear-gradient"
  - "Card fan: absolute positioning, transform rotate(±5deg) translateX(±60px), z-index stacking"
  - "Header bar: display flex, justify-content space-between"
  - "Keyword in parentheses as hero display pattern"
  - "Muted brand watermark at low opacity behind cards"
```
