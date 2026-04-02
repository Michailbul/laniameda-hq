# Laniameda — Brand Guidelines v2.0

**Last updated:** 2026-04-02
**Status:** Locked
**Source of truth:** [Figma — Design System v2.0](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=102-2)

---

## 1. Brand core

**Name:** Laniameda
**Tagline:** AI is the instrument. Feeling is the output.
**Type:** AI-native creative studio — art, engineering, emotional depth.
**Archetype:** Creator with Magician undertones. We make things that didn't exist before and make them feel inevitable.

**Personality:** Visceral. Precise. Warm. Uncompromising. Modern.

We are / we aren't:
- Visceral, never sentimental
- Precise, never cold
- Modern, never trendy

---

## 2. Color system

The palette operates in four tiers. Each tier has different usage frequency and rules.

### Base palette (untouchable)

These four colors form every default composition. They never change.

| Name | Hex | Role |
|---|---|---|
| **Coral** | `#F26157` | Anchor. Headlines on dark, brand accent. Never body text. |
| **Carbon** | `#191919` | Primary dark surface. Alt to Obsidian for less weight. |
| **Teal** | `#79B791` | Organic accent. Dividers, quotes, secondary emphasis. |
| **Linen** | `#FFF4EA` | Light surface. Body text on dark backgrounds. |

### Dark/light theme tokens

| Token | Hex | Name | Use |
|---|---|---|---|
| Dark bg (default) | `#0A0805` | Obsidian | Primary dark background. Warm near-black. |
| Dark text | `#F0EBE8` | Bone | Text on dark backgrounds. Warm off-white. |
| Light bg | `#FAF7F4` | Parchment | Light theme background. |
| Light text | `#1A1008` | Ink | Text on light backgrounds. Deep warm brown-black. |

**Rule:** No pure black (`#000`) or pure white (`#FFF`) anywhere. Everything has warmth.

### Primary accents (high frequency)

Use on most carousels. These carry the emotional register.

| Name | Hex | Role |
|---|---|---|
| **Amber** | `#E8A838` | Warm signal. Headlines, highlights. |
| **Plum** | `#6B3A5E` | Emotional depth. Background only, never text. |
| **Vermillion** | `#E23D28` | Hot signal. CTAs and stop-moments only. |

### Supporting accents (contextual)

Add depth and variety. Used when the base four plus primaries aren't enough.

| Name | Hex | Role |
|---|---|---|
| **Charcoal Violet** | `#3D2E42` | Moody backgrounds. Gradient darks. |
| **Slate Blue** | `#4A5E7A` | Editorial, professional framing. Cool counterpoint. |
| **Graphite** | `#3A3A3A` | Layering, subtle depth. Neutral mid-dark. |
| **Muted Teal** | `#5E8E7A` | Dividers, secondary organic accent. Quieter than Teal. |

### Situational accents (sparingly)

Max one per carousel. These are the sharp instruments.

| Name | Hex | Role |
|---|---|---|
| **Electric Cream** | `#FFF0B3` | Warm glow text on dark violet. Statement moments. |
| **Ochre Gold** | `#D4A042` | Bold statement backgrounds. |
| **Warm White** | `#F5EDE4` | Softer than Linen when Linen is too bright. |

### Brand mark color

| Name | Hex | Role |
|---|---|---|
| **Ember** | `#FF8C42` | Brand signature. Logo mark dot, gradient hero moments. Sacred — use sparingly. |

### Color rules

1. Dark backgrounds only: `#0A0805` (default) or Carbon `#191919`
2. Coral is the anchor — headlines on dark, never as body text
3. Amber for warm signals, highlights. Vermillion for CTAs only
4. Plum for emotional depth backgrounds — never as text color
5. Slate Blue for editorial/professional framing
6. Situational accents (Electric Cream, Ochre) max 1 per carousel
7. Both Teals kept: `#79B791` (organic) + `#5E8E7A` (muted, dividers)
8. Never pair Vermillion + Coral on the same slide — they compete
9. Max 3 colors per slide: background + headline accent + body text

### Gradients

| Gradient | Use |
|---|---|
| Carbon → Plum | Default moody transition |
| Plum → Coral | Warm editorial |
| Slate → Amber | Professional warmth |
| Graphite → Muted Teal | Subtle depth |
| Carbon → Vermillion | Energy, urgency |
| Carbon → Amber | Warm glow |
| Plum → Amber | Rich warmth |
| Slate Blue → Coral | Cool-to-warm contrast |

Ember gradient (`#FF6B35 → #FF8C42 → #FFAD6B`) reserved for hero moments and brand signatures. Earned, not decorative.

---

## 3. Typography

### Font stack

| Role | Font | Weights | Use |
|---|---|---|---|
| **Display** | Darker Grotesque | Black (900), Bold (700), Medium (500), Light (300) | Headlines, hero text, carousel titles. CAPS or large sizes. |
| **Body** | Inter | Regular (400), Medium (500), Semi Bold (600), Bold (700) | Body copy, UI text, captions. Medium max for body. |
| **Mono** | JetBrains Mono | Regular (400), Bold (700) | Code, tags, timestamps, data labels. |

### Alternate display fonts (carousel variety)

These pair with the core stack to prevent visual monotony across carousels.

| Font | Weight | Pair with | Character |
|---|---|---|---|
| Fraunces | Regular, Black | Geist Regular | Warm editorial. Serif surprise. |
| Syne | ExtraBold, Bold, Mono | Space Mono, JetBrains Mono | Technical authority. Sharp edges. |
| Cormorant | Bold | Geist Regular | Elegant editorial. Classical weight. |
| Chakra Petch | Bold | Darker Grotesque Bold | Futuristic precision. |

### Type scale (social media / carousel)

| Role | Font | Size | Color |
|---|---|---|---|
| Hero / Title | DG Black | 64–80px | Coral or Linen |
| Headline | DG Bold | 40–56px | Coral or Linen |
| Subheadline | Inter Medium | 24–32px | Linen or Teal |
| Body | Inter Regular | 18–22px | Linen (dark bg) / Carbon (light bg) |
| Caption / Tag | Inter Medium | 13–16px | Muted Teal or accent |
| Pull Quote | DG Light | 36–48px | Linen or Electric Cream |
| Code / Data | JB Mono Regular | 16–20px | Linen or Amber |
| Label | JB Mono Bold | 11–14px | Amber or Coral |

### Typography rules

- Darker Grotesque: CAPS or large sizes only. Loses character at small sizes.
- Inter: Medium (500) max for body text. Semi Bold for buttons only.
- Max 2 font families per slide.
- Letter-spacing: DG display at -0.02em. Inter body at 0. Mono at 0.02em.

---

## 4. Themes

### Dark (default)

| Element | Value |
|---|---|
| Background | `#0A0805` (Obsidian) |
| Headline | Coral `#F26157` or Linen `#FFF4EA` |
| Body text | Linen `#FFF4EA` at 85% opacity |
| Accent | Teal `#79B791` for quotes, dividers |
| CTA | Coral solid or Vermillion |

### Light (variant)

| Element | Value |
|---|---|
| Background | Linen `#FFF4EA` |
| Headline | Carbon `#191919` or Coral `#F26157` |
| Body text | Carbon `#191919` at 85% opacity |
| Accent | Coral for emphasis |
| Dividers | Teal `#79B791` |

Dark mode is the primary experience. Light is the variant.

---

## 5. Carousel component system

Source: [Figma — Carousel Components](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=204-2)

### Slide types

| Type | Background | Headline | Body | Purpose |
|---|---|---|---|---|
| **Hook** | `#0A0805` | Coral, DG Black 72px | Inter 22px, Linen | First slide. 5 words max. Stop the scroll. |
| **Content** | `#0A0805` | Linen, DG Bold 52px | Inter 24px, Linen | Teaching slides. One idea per slide. |
| **CTA** | Gradient (Plum→Coral) | Linen, DG Black 64px | Inter 22px, Linen | Closer. Follow button in Coral. |
| **Quote** | `#0A0805` | Linen, DG Semi Bold 44px | Inter 18px, Linen | Personal voice. Large quote marks. |

### Reusable components

| Component | Spec |
|---|---|
| **Corner Accent** | 2px Coral L-shape lines at top-left and bottom-right. 120×120px. |
| **Slide Number** | Inter Bold 14px "01" + Inter Regular 11px "/ 07". Top-left. |
| **Brand Watermark** | "LANIAMEDA" in Inter Medium 10px, Coral dot + Bone text. Bottom-left. |
| **Slide Indicator** | Dot row — active dot in Coral, inactive in Bone. Bottom-right. |
| **Accent Bar** | 3px Coral horizontal rule. Section separator. |
| **Category Tag** | Inter Medium 13px, Coral text on Coral/10% background. Top area. |

### Spacing

All carousel slides: 1080×1350px (Instagram portrait).

| Token | Value | Use |
|---|---|---|
| Page margin | 64px | All sides safe zone |
| Element gap | 24px | Between text blocks |
| Section gap | 40px | Major divisions |

---

## 6. Carousel pairing recipes

Proven background + headline + font combos for each slide mood.

```
Hook       │ #0A0805     │ Coral headline     │ DG Black 72px     │ Inter body
Content    │ #0A0805     │ Linen headline     │ DG Bold 52px      │ Inter body
Quote      │ #0A0805     │ Teal headline      │ DG Light 44px     │ Inter attrib
CTA        │ Plum bg     │ Linen headline     │ DG Black 64px     │ Coral button
Data       │ #191919     │ Amber headline     │ JB Mono Bold 24px │ JB Mono body
Editorial  │ Slate bg    │ Linen headline     │ Fraunces 48px     │ Geist body
Statement  │ Coral bg    │ Carbon headline    │ Syne ExtraBold    │ Space Mono
Moody      │ Char Violet │ Cream headline     │ Syne Bold         │ JB Mono
Minimal    │ #0A0805     │ Warm White head    │ DG Medium 40px    │ Inter body
Technical  │ Graphite bg │ Muted Teal head    │ Syne Mono         │ JB Mono
Warm       │ #0A0805     │ Amber headline     │ Fraunces 48px     │ Geist body
Bold       │ #0A0805     │ Vermillion head    │ Chakra Petch      │ DG body
```

---

## 7. Imagery and visual language

**Mood:** Cinematic. Warm shadows, intentional framing. Every image looks like a still from a film worth watching.

**Color grading:** Warm highlights, deep shadows. Slightly desaturated midtones. Ember tones in highlights when possible.

**Contrast:** High. Shadows are dark, highlights glow. No flat even lighting.

**Composition:** Tight crops, unusual angles, corner framing. Nothing center-composed or stock-looking.

**Texture:** Subtle grain overlay (2-4% opacity) on solid backgrounds. Adds warmth, kills sterility.

**Avoid:** Stock photo aesthetics, flat unshadowed imagery, over-saturated colors, busy decorative patterns.

---

## 8. Logo and mark

**Wordmark:** "LANIAMEDA" in Inter Medium 10px (carousel context) or Darker Grotesque Black all caps (display context). Tight tracking.

**Brand punctuation:** Coral dot before the wordmark. Small `#F26157` circle as signature mark.

**Corner frames:** Thin Coral L-shapes (2px, 120px) at two opposite corners. Signature layout device across all carousel slides.

**Clear space:** Minimum = cap height of the wordmark on all sides.

**Approved backgrounds:** Obsidian, Parchment, or photography with sufficient contrast.

---

## 9. Voice and copy

**Tone:** Direct and confident. Technical when it matters, emotional when it counts. Short sentences. No filler. Every word earns its place.

**Brand lines:**
- "The work has weight or it doesn't ship."
- "Resonance over volume."
- "Artists first. Always."
- "Feel something. Build something."
- "Begin with the end in mind."
- "Marketing first. Everything follows."
- "Approach everything as art."

All copy passes `human-copy-standards`. No AI-speak, no inflation words, no negative parallelisms, no filler.

---

## 10. Usage rules

### Do

- Use Coral as primary headline accent on dark
- Pair warm accents (Amber, Coral) with cool grounds (Slate, Graphite)
- Use max 3 colors per carousel slide
- Reserve Vermillion for CTAs and stop-moments
- Use Muted Teal for dividers and subtle accents
- Dark bg (`#0A0805`) as default surface

### Don't

- Pair Vermillion + Coral on same slide — they compete
- Use Plum as text color — only as background
- Use more than 1 situational accent per carousel
- Put Amber on light backgrounds — low contrast
- Use pure black (`#000`) or pure white (`#FFF`)
- Mix more than 2 font families per slide

---

## 11. Quick reference

```
BRAND: Laniameda
TAGLINE: AI is the instrument. Feeling is the output.

BASE 4 (untouchable)
Coral:       #F26157  — anchor, headlines
Carbon:      #191919  — dark surface
Teal:        #79B791  — organic accent
Linen:       #FFF4EA  — light surface, body text

THEME TOKENS
Obsidian:    #0A0805  — default dark bg
Bone:        #F0EBE8  — dark theme text
Parchment:   #FAF7F4  — light theme bg
Ink:         #1A1008  — light theme text

PRIMARY ACCENTS
Amber:       #E8A838  — warm signal
Plum:        #6B3A5E  — emotional depth (bg only)
Vermillion:  #E23D28  — CTA only

BRAND MARK
Ember:       #FF8C42  — brand signature, sacred

FONTS
Display:     Darker Grotesque (Black/Bold/Medium/Light)
Body:        Inter (Regular/Medium)
Mono:        JetBrains Mono (Regular/Bold)
Alt display: Fraunces, Syne, Cormorant, Chakra Petch
```
