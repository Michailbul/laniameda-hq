# Carousel Engine — Design System

**Status:** Active. This is the design bible for all code-rendered carousels.
**Owner:** Michael / Laniameda
**Last updated:** 2026-04-03

> **Brand foundation:** `studio/brand/` is the ground truth for colors, typography, voice, visual language, and logo.
> This file defines **carousel-specific** layout decisions, style families, components, and rendering specs.
> Import `studio/brand/tokens.css` as the base CSS layer for all carousels.

---

## The feeling

When someone stops on a Laniameda carousel, they should feel:

- **"This person knows what they're doing."** The design communicates competence before a single word is read.
- **Warm confidence.** Bold without being aggressive. Professional without being corporate.
- **Magazine-level craft.** Every slide looks intentional. Nothing accidental, nothing default.
- **Visual variety.** Each carousel feels designed, not generated from a template.

We are not: cold tech minimalism, LinkedIn corporate blue, Pinterest pastel, generic dark mode.
We are: warm editorial meets modern brutalism. A design studio's Instagram, not a SaaS company's.

---

## Content types

### What we publish

| Format | Platform | Frequency | Canvas |
|--------|----------|-----------|--------|
| **Carousel** | Instagram, LinkedIn | 1-2/week | 1080×1350 (4:5) |
| **Static post** | Instagram, X | 3-5/week | 1080×1350 or 1080×1080 |
| **Story** | Instagram | As needed | 1080×1920 (9:16) |

### Carousel types we build

| Type | Slides | What it looks like | Example |
|------|--------|--------------------|---------|
| **Educational / Tips** | 7-9 | Mixed layouts — text slides + visual slides + data | "5 prompts that don't look AI" |
| **Prompt Showcase** | 5-7 | Full-bleed images with prompt overlay panels | "Midjourney V7: real prompts, real results" |
| **Tools / Listicle** | 7-10 | Card-based layouts, one tool per slide with screenshot | "7 tools that replaced my design team" |
| **Storytelling / Thoughts** | 5-7 | Text-dominant, full-bleed photos, mixed dark/light, quote embeds, attribution | "The real cost of AI content nobody talks about" |
| **Before / After** | 5-7 | Split layouts, comparison frames, dramatic reveals | "Generic product shots vs. cinematic hero scenes" |
| **Single Concept** | 5-6 | Bold statement slides with max negative space | "Taste is the last moat in AI" |

---

## Layout directions

### The 4 style families

Every slide pulls from one of these. Carousels mix families across slides for variety.

#### 1. Agency Editorial Light
**When:** Listicles, tool showcases, portfolio-style, tutorial grids.

- Light warm background (Parchment, Warm White, Linen)
- Image cards with rounded corners (16-24px radius), soft shadows
- Mixed-weight headlines (DG Light + DG Black in one block)
- Pill-shaped badges and labels
- Feels like: a well-designed agency case study page

#### 2. Full-Bleed Photo
**When:** Prompt showcases, hero moments, before/after, visual-first content, storytelling/thoughts.

- Photography fills 100% of slide
- **With overlay:** Text overlaid with dark gradient/panel for readability. Massive scale contrast — hero word at 160-200px, supporting at 32-40px.
- **Without overlay (quiet zone):** Text placed directly on photo where composition provides natural negative space (sky, wall, floor, foliage). White text + `text-shadow: 0 2px 20px rgba(0,0,0,0.5)`. Headline 48-64px DG Bold or Inter Semi Bold, body 28-32px Inter Regular at 90% opacity.
- Italic for engagement/CTA lines (Fraunces Italic or Inter Italic, muted opacity)
- Minimal chrome
- Feels like: a film poster, fashion magazine cover, or intimate personal brand moment

#### 3. Bold Statement
**When:** Hook slides, CTA slides, chapter dividers, single-idea punches.

- One dominant surface: gradient fill, heavy grain texture, or bold solid color
- Single text block with massive type
- 55-65% negative space
- Zero or minimal images
- Feels like: a billboard or protest sign

**Quote on Color variant:** Solid primary color bg (Coral, Plum, Slate Blue) + large serif quote (Fraunces Black 56-64px) + B&W photo anchored bottom (`filter: grayscale(1)`). Attribution: name bold + role regular, tucked under quote. The desaturation prevents color fights with the bold bg.

**Quiet variant:** Same single-surface principle but body-sized text (28-36px Inter) instead of hero headlines. For when words need to land softly. 65%+ negative space. Brand footer anchored bottom.

#### 4. Framed Panel
**When:** CTA slides, statement slides, any slide that needs contained energy.

- Dark outer border (~12-16px, Obsidian or Carbon) with rounded corners (~12px outer)
- Inner content area with its own background (gradient, solid color, grain) and rounded corners (~12px inner)
- Text inside the frame — the frame creates visual weight and separation
- Works with gradients, bold solids, grain textures inside the frame
- Feels like: a premium card or app screen — contained, intentional, polished

### Mixing within a carousel

A 7-slide carousel should never be 7 slides in the same family. Mix:

```
Hook (Bold Statement) → Pain (Framed Panel) → Reframe (Agency Light) →
System (Agency Light) → Detail (Full-Bleed Photo) → Proof (Agency Light) →
CTA (Framed Panel with gradient)
```

The chrome (watermark, dots) stays consistent. The content zone rotates.

---

## Color system

> **Full color reference:** `studio/brand/colors.md` — 5-tier palette, rules, gradients, themes.
> **CSS tokens:** `studio/brand/tokens.css` — import as base layer.

### Proven color combos

| Mood | Background | Headline | Body | Accent |
|------|-----------|----------|------|--------|
| **Default dark** | Obsidian | Coral | Bone at 85% | Teal |
| **Light editorial** | Parchment | Ink | Ink at 85% | Coral |
| **Framed panel** | Gradient in Carbon frame | Linen | Obsidian at 70% | Accent keyword color |
| **Moody** | Charcoal Violet | Electric Cream | Cream at 70% | Amber |
| **Statement** | Coral | Obsidian | Obsidian at 70% | Linen |
| **Professional** | Slate Blue | Linen | Linen at 75% | Amber |
| **Plum depth** | Plum gradient | Linen | Cream at 70% | Amber |
| **Data/tech** | Graphite | Muted Teal | Bone at 70% | Amber |
| **Warm dark** | Obsidian | Amber | Bone at 85% | Teal |
| **Bold** | Obsidian | Vermillion | Bone at 80% | — |
| **Quote on color** | Coral or any primary solid | Linen (serif) | Linen at 85% | B&W photo `grayscale(1)` |
| **Plum card fan** | Plum + vertical line texture | Bone (sans) | Bone at 70% | Amber header bar |

---

## Typography

> **Full typography reference:** `studio/brand/typography.md` — 9 fonts, 7 Figma-verified pairings, type scale, rules.
> Below are carousel-specific pairing recipes.

---

## Do / Don't

### DO

- Mix light and dark slides within one carousel
- Use images, card stacks, grids — visual layouts, not just text on backgrounds
- Push scale contrast hard (200px hero word next to 30px supporting text)
- Use rounded corners on image cards (16-24px)
- Add subtle grain texture (2-4% on warm surfaces)
- Apply decorative touches: tape, rotation, pill badges, shadows
- Make the hook slide a standalone viral screenshot
- Use Parchment/Linen/Warm White backgrounds generously — not everything is dark
- Let negative space breathe (40%+ on statement slides)
- Keep chrome consistent (watermark + dots same position every slide)

### DON'T

- Build 7+ dark slides in a row — monotonous, fatiguing
- Use generic text-on-dark for every slide — that's not a carousel, it's a slideshow
- Hardcode colors — always use CSS custom properties
- Pair Vermillion + Coral on the same slide (they fight)
- Use Plum as text color (background only)
- Use pure black `#000` or pure white `#FFF` (everything has warmth)
- Center-align body text (left-align by default)
- Put more than 30-40 words on a content slide
- Use more than 3 colors per slide
- Skip the visual element — every content slide should have a visual component (card, image, stat, tag row), not just headline + paragraph
- Make carousels that look templated — each one should feel bespoke
- Use emojis as icons in production carousels

---

## Spacing & layout

```
Canvas:        1080 × 1350px
Page margin:   80px (all sides)
Element gap:   24px (between text blocks)
Section gap:   40px (between major divisions)
Image radius:  16-24px (content cards), 0px (full-bleed)
Chrome zone:   bottom 80px reserved for watermark + dots
```

### Alignment

Left-align by default. Center only for:
- Single-word hero headlines (>80% width)
- Hook slides with 3-5 word centered statement
- CTA slides

---

## Image treatment & texture

> **Full reference:** `studio/brand/visual-language.md` — image treatments, texture/grain, shape language, motion.

---

## Component checklist (what we need)

Building blocks that get composed into slides:

- [ ] **Card stack** — 3-5 overlapping image cards with rotation + shadow
- [ ] **Image grid** — 2×2 or 3-col with rounded corners + gap
- [ ] **Hero headline** — mixed-weight display text block
- [ ] **Stat block** — big number + unit + label
- [ ] **Tag row** — horizontal row of colored pill badges
- [ ] **Flow/steps** — vertical pipeline with icons/numbers
- [ ] **Prompt overlay** — dark panel over photo with mono text
- [ ] **CTA block** — centered headline + keyword + button
- [ ] **Quote block** — large serif quote + attribution
- [ ] **Comparison** — side-by-side before/after
- [ ] **Watermark** — Coral dot + LANIAMEDA
- [ ] **Dot indicator** — active/inactive dot row
- [ ] **Tape decoration** — pseudo-element collage tape
- [ ] **Grain overlay** — configurable intensity
- [ ] **Tweet/quote embed** — avatar + handle + quote card (dark or light)
- [ ] **Quote on color** — large serif quote on solid primary bg + B&W photo bottom
- [ ] **Full-bleed text** — text on photo quiet zone, no overlay, text-shadow only

These are the HTML/CSS components that reference code will populate.
