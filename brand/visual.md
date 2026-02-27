# Visual Identity & Design System

_Locked aesthetic. Every product, every asset, every surface should feel like this._

---

## The Aesthetic

**Dark. Cinematic. Editorial. Premium.**

Not trendy. Not loud. Not neon. Not generic AI aesthetic (blue gradients, floating orbs, robotic sans-serif grids).

Think: a director's cut grade. A limited-edition zine. A gallery with no white cube walls. A console built for someone with taste.

**Keywords:** restraint, depth, precision, warmth-within-darkness, surface quality.

---

## Color System

### Core Palette (Products / UI)

| Token | Value | Usage |
|---|---|---|
| Background | `#080402` | Page background — near-black with warm tint |
| Surface / Card | `#110a06` | Card/panel background |
| Elevated surface | `#1c120b` | Popovers, modals, side panels |
| Foreground | `#f0ebe8` | Primary text — warm white |
| Muted text | `#b8afa9` | Secondary/supporting text |
| Border | `#3d3735` | Subtle outlines |
| Input | `#2a2624` | Form field backgrounds |
| **Primary accent** | `#FF8C42` | CTAs, primary actions, highlights |
| Accent alt | `#FFa862` | Hover states, lighter accent variant |

**The brand is warm-dark.** Not cold-dark (no blue-black). The warmth comes from the amber/orange accent against an almost-black background with brown undertones.

### Per-Pillar UI Accent Colors (laniameda.gallery)

When a specific content pillar is active, the accent shifts:

| Pillar | Color | Hex |
|---|---|---|
| Creators | Amber/gold (default) | `#FF8C42` |
| Cars | Crimson red | `#E84545` |
| Designs | Electric indigo | `#6366F1` |
| Dump | Teal | `#4ECDC4` |

These shift UI-wide (glows, active tabs, badges, button rings). Transition: 300–400ms smooth.

### Content / Carousel Palette (RYE system)

For standalone content assets (Instagram carousels, editorial slides):

| Token | Value | Usage |
|---|---|---|
| Primary (amber/gold) | `#D4A574` | Accents, glows, highlights |
| Light amber | `#E8C9A0` | Lighter accent variant |
| Muted amber | `#9D7E5D` | Secondary text |
| Deep shadow | `#2A1F1A` | Shadows, depth layers |
| Void (background) | `#050508` | Pure black slide background |
| Deep | `#0A0A0F` | Slight depth variation |

**CRITICAL for carousels:** No teal, cyan, or aggressive reds. No cold tones. All decorative glows must be RYE gold only.

---

## Typography

### Product UI Stack

Primary: **Manrope**, fallback: Sora, Inter

**Usage patterns:**
- Uppercase micro-labels with wide tracking (`tracking-[0.3em]` to `0.5em`)
- Compact sizes: `text-[10px]` to `text-sm` — never oversized UI chrome
- Headlines: low-weight, minimal ornamentation, controlled

### Content / Carousel Stack

| Role | Font | Use case |
|---|---|---|
| Display / English headers | **Papyrus** | Section headers, labels, callouts |
| Headlines / Russian titles | **Playfair Display** (serif) | Large titles, drop caps |
| Body | **Inter** | Body text, Russian content, readable copy |

**Text color hierarchy:**
- `#FFFFFF` — primary text, headlines
- `#F5F5F5` — high contrast body
- `#D4D4D4` — standard paragraph
- `#A8A8A8` — secondary/supporting
- `#7A7A7A` — de-emphasized, subtle callouts

---

## Shape Language

**Soft geometry.** Pill controls. Rounded cards. No hard corners on interactive elements.

| Context | Radius |
|---|---|
| Buttons / pill controls | `rounded-full` |
| Cards / tiles | `rounded-2xl` |
| Modals / sheets | `rounded-3xl` |
| Input fields | `rounded-full` (single-line), `rounded-2xl` (textarea) |
| Tags / chips | pill-shaped always |

---

## Motion

**Subtle. Utility-first. Never performative.**

- Hover: 100–200ms. No bounce, no color explosion.
- Open/close panels: soft fade + slight scale.
- Pillar theme transitions: 300–400ms smooth accent shift.
- Loading states: shimmer or subtle pulse only. No spinners unless blocking.
- No large-scale page motion. No busy micro-animations.

**Rule:** if the animation calls attention to itself, it's too much.

---

## Layout Principles

- **Masonry grid** for image galleries — cinematic, not rigid
- **Sticky filter/tab headers** — always-visible navigation
- **Dark blur overlays** for modal backdrops — not pure black
- **Content-first** — UI chrome shrinks to let imagery breathe
- **Compact density** with intentional whitespace around CTAs

---

## Materials & Surface Quality

- **Black-on-black layering** — surfaces distinguished by subtle border, not contrast blocks
- **Glass-like overlays** — subtle blur, semi-transparency, quiet depth
- **Thin outlines** instead of heavy elevation shadows
- **Monochrome by default** — primary actions go white, everything else stays graphite

---

## Component Rules (Quick Reference)

### Buttons
- **Primary:** white fill, black text, no gradients, minimal shadow
- **Secondary:** graphite fill, subtle border, white text
- **Ghost:** no fill, hover only; no loud color shifts
- **Default height:** `h-9` — compact `h-8`

### Cards
- Surface separation via border + subtle shadow — not heavy fills
- Padding: 16–24px consistent
- No mixed padding within a card

### Tags / Status chips
- Always pill-shaped
- Monochrome (white active, graphite neutral)
- Compact, uppercase or small-caps feel

### Empty states
- Calm and encouraging tone — not playful
- One headline + one sentence + one action

---

## What We Don't Do (Visual)

❌ Blue-black "AI aesthetic" — robotic, cold, generic  
❌ Neon green or cyan accents — looks like a hackathon tool  
❌ Heavy drop shadows or thick card borders  
❌ Oversized decorative animations  
❌ Mixed font families without intention  
❌ Light mode (not planned for MVP)  
❌ Gradient soup — if you use a gradient, it has a reason  
❌ Emoji or cartoon illustration style  

---

## Source Files

| File | What it defines |
|---|---|
| `~/work/laniameda/laniameda.gallery/tailwind.config.ts` | Token values (canonical) |
| `~/work/laniameda/laniameda.gallery/app/globals.css` | CSS variables + theme mapping |
| `~/work/laniameda/laniameda.gallery/agent-docs/DESIGN.md` | Full product UI specification |
| `~/work/laniameda/carousel-agent/docs/CAROUSEL_REGENERATION_PROMPT.md` | Carousel-specific design system |

---

_Last updated: 2026-02-27 | Owner: Michael_
