# Color System

**Status:** Locked
**Source of truth:** [Figma — Design System v2.0](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=102-2)
**Last updated:** 2026-04-02

---

The palette is drawn from warm natural materials — volcanic stone, terracotta, aged paper, deep forest. Pure white and pure black are never used. Everything carries warmth.

The system operates in five tiers. Each tier has different usage frequency and rules.

---

## Tier 1: Base Palette (untouchable)

These four colors form every default composition. They never change.

| Name | Hex | CSS var | Role |
|---|---|---|---|
| **Coral** | `#F26157` | `--coral` | Anchor. Headlines on dark, brand accent. Never body text. |
| **Carbon** | `#191919` | `--carbon` | Primary dark surface. Alt to Obsidian for less weight. |
| **Teal** | `#79B791` | `--teal` | Organic accent. Dividers, quotes, secondary emphasis. |
| **Linen** | `#FFF4EA` | `--linen` | Light surface. Body text on dark backgrounds. |

---

## Tier 2: Theme Tokens

| Name | Hex | CSS var | Role |
|---|---|---|---|
| **Obsidian** | `#0A0805` | `--obsidian` | Default dark background. Warm near-black. |
| **Bone** | `#F0EBE8` | `--bone` | Text on dark backgrounds. Warm off-white. |
| **Parchment** | `#FAF7F4` | `--parchment` | Light theme background. |
| **Ink** | `#1A1008` | `--ink` | Text on light backgrounds. Deep warm brown-black. |

---

## Tier 3: Primary Accents

Use on most content. These carry the emotional register.

| Name | Hex | CSS var | Role |
|---|---|---|---|
| **Amber** | `#E8A838` | `--amber` | Warm signal. Headlines, highlights. |
| **Plum** | `#6B3A5E` | `--plum` | Emotional depth. **Background only** — never as text. |
| **Vermillion** | `#E23D28` | `--vermillion` | Hot signal. **CTAs and stop-moments only.** |

---

## Tier 4: Supporting Accents

Add depth and variety. Used when the first three tiers aren't enough.

| Name | Hex | CSS var | Role |
|---|---|---|---|
| **Charcoal Violet** | `#3D2E42` | `--charcoal-violet` | Moody backgrounds. Gradient darks. |
| **Slate Blue** | `#4A5E7A` | `--slate-blue` | Editorial, professional framing. Cool counterpoint. |
| **Graphite** | `#3A3A3A` | `--graphite` | Layering, subtle depth. Neutral mid-dark. |
| **Muted Teal** | `#5E8E7A` | `--muted-teal` | Dividers, secondary organic accent. Quieter than Teal. |

---

## Tier 5: Situational Accents

Max one per carousel or composition. These are the sharp instruments.

| Name | Hex | CSS var | Role |
|---|---|---|---|
| **Electric Cream** | `#FFF0B3` | `--electric-cream` | Warm glow text on dark violet. Statement moments. |
| **Ochre Gold** | `#D4A042` | `--ochre-gold` | Bold statement backgrounds. |
| **Warm White** | `#F5EDE4` | `--warm-white` | Softer than Linen when Linen is too bright. |

---

## Brand Mark Color

| Name | Hex | CSS var | Role |
|---|---|---|---|
| **Ember** | `#FF8C42` | `--ember` | Brand signature. Logo mark dot, gradient hero moments. **Sacred — use sparingly.** |

---

## Themes

### Dark (default)

| Element | Value |
|---|---|
| Background | Obsidian `#0A0805` |
| Headline | Coral `#F26157` or Linen `#FFF4EA` |
| Body text | Bone `#F0EBE8` at 85% opacity |
| Accent | Teal `#79B791` for quotes, dividers |
| CTA | Coral solid or Vermillion |

### Light (variant)

| Element | Value |
|---|---|
| Background | Parchment `#FAF7F4` or Linen `#FFF4EA` |
| Headline | Ink `#1A1008` or Coral `#F26157` |
| Body text | Ink `#1A1008` at 85% opacity |
| Accent | Coral for emphasis |
| Dividers | Teal `#79B791` |

Dark mode is the primary experience. Light is the variant.

---

## Proven Color Combos

| Mood | Background | Headline | Body | Accent |
|---|---|---|---|---|
| **Default dark** | Obsidian | Coral | Bone at 85% | Teal |
| **Light editorial** | Parchment | Ink | Ink at 85% | Coral |
| **Moody** | Charcoal Violet | Electric Cream | Cream at 70% | Amber |
| **Statement** | Coral | Obsidian | Obsidian at 70% | Linen |
| **Professional** | Slate Blue | Linen | Linen at 75% | Amber |
| **Plum depth** | Plum gradient | Linen | Cream at 70% | Amber |
| **Data/tech** | Graphite | Muted Teal | Bone at 70% | Amber |
| **Warm dark** | Obsidian | Amber | Bone at 85% | Teal |
| **Bold** | Obsidian | Vermillion | Bone at 80% | — |
| **Quote on color** | Coral or any primary solid | Linen (serif) | Linen at 85% | B&W photo `grayscale(1)` |

---

## Approved Gradients

| Name | Definition | Use |
|---|---|---|
| **CTA / energy** | `linear-gradient(160deg, var(--coral), var(--vermillion))` | CTAs, energy |
| **Moody editorial** | `linear-gradient(160deg, var(--plum), var(--charcoal-violet))` | Moody slides |
| **Warm glow** | `linear-gradient(160deg, var(--carbon), var(--amber))` | Warm moments |
| **Professional** | `linear-gradient(160deg, var(--slate-blue), var(--amber))` | Pro framing |
| **Rich warmth** | `linear-gradient(160deg, var(--plum), var(--amber))` | Rich warmth |
| **Cool-to-warm** | `linear-gradient(160deg, var(--slate-blue), var(--coral))` | Contrast |
| **Ember glow** | `linear-gradient(135deg, #FF6B35, #FF8C42, #FFAD6B)` | **Sacred.** Brand signature hero moments only. |

---

## Rules

1. No pure black (`#000`) or pure white (`#FFF`) — everything has warmth
2. Coral is the anchor — headlines on dark, never as body text
3. Amber for warm signals, highlights. Vermillion for CTAs only
4. Plum for emotional depth backgrounds — never as text color
5. Slate Blue for editorial/professional framing
6. Situational accents (Electric Cream, Ochre Gold) — max 1 per composition
7. Never pair Vermillion + Coral on the same slide — they compete
8. Max 3 colors per slide: background + headline accent + body text
9. Never hardcode hex values in code — use CSS custom properties
10. All shadows use warm base `rgba(10,8,5,...)` — never neutral gray
