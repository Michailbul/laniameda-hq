# Carousel Design Skill Reference

This reference adapts existing carousel-agent contracts to this Claude workspace.

---

## Planner

- Build an 8-10 slide narrative.
- Keep one message per slide.
- Enforce narrative arc:
  1. Hook
  2. Tension/problem
  3. Reframe
  4. Framework
  5. Example
  6. Common mistake
  7. Correct approach
  8. CTA

---

## Designer

- Design for fixed 1080x1350 canvas.
- Keep text readable on mobile.
- Ensure clear type hierarchy and contrast.

---

## Engineer

- Produce deterministic React slide code.
- Root style includes:
  - `width: 1080`
  - `height: 1350`
- No runtime side effects or dynamic fetches.

---

## Reviewer

Return structured review:
- score (0-100)
- pass/fail
- required changes
- optional improvements

Fail if:
- readability is weak
- slide arc is broken
- canvas constraints are violated

---

## Production Rules (validated 2026-04-03)

These rules were hardened through real production iteration. Violations result in immediate rejection.

### Canvas & Chrome

Every slide must have:
- `@misha.buloy` — top-right, JB Mono 16px, adapts to bg
- `● LANIAMEDA` — bottom-left, Coral dot + JB Mono 15px bold, **always light** (over image gradient)
- `02 / 10` counter — bottom-right, Coral number + ghost denominator, **always light**

Bottom chrome is always light regardless of slide background — it sits over a dark image gradient, not the bg color.

Safe zones: 48–64px margin all sides.

---

### Slide 1 — Hook (most critical)

The first slide is the only one that decides whether someone swipes. It must work as a standalone in feed thumbnail.

**What must be true:**
- One dominant headline at minimum 72px — if it's too small to read while scrolling, it fails
- Clear visual hierarchy: eyebrow (28–36px, colored) → title (72–90px, dominant) → sub (20–22px, supporting)
- Text directly on image — no boxes, no containers, no panels over photos
- Center of image must be darkened (radial vignette + linear fades + heavy `text-shadow`)
- Text block positioned at true vertical center — not top-anchored with padding

**What gets rejected:**
- Small eyebrow text (12–14px) — unreadable, invisible against backgrounds
- Low opacity on supporting text (< 0.50) — disappears
- Black/dark containers behind text over images — Michael rejects immediately
- VS / comparison badges that look misaligned — fix with flexbox `align-items:center` or remove

---

### Comparison slides

- **Full-width image per slide — 1080px** — one model/subject per slide. Side-by-side at 540px destroys the image quality and visual impact.
- Prompt box at top: solid bg overlay, minimum 80px top padding (clears @handle)
- Model label bottom-left: Darker Grotesque 44px bold, above chrome zone (bottom ≥ 80px)
- Image gradient: `linear-gradient(to top, rgba(10,8,5,0.90) 0%, transparent 40%)`
- Bottom-of-slide labels always light — they're over the image, not the bg color

---

### Color — approved backgrounds

| Color | Hex | Mode |
|---|---|---|
| Obsidian | `#0A0805` | Dark (default) |
| Carbon | `#191919` | Dark |
| Graphite | `#3A3A3A` | Dark |
| Linen | `#FFF4EA` | Light |
| Amber | `#E8A838` | Light |

**Banned as backgrounds:**
- Charcoal Violet `#3D2E42` — reads as purple, off-brand feel
- Slate Blue `#4A5E7A` — reads as blue-grey, off-brand feel
- Pure black `#000000` — use Obsidian instead
- Pure white `#FFFFFF` — use Linen instead

When using a light background, flip prompt-box text to dark (`INK #1A1008`). Bottom chrome stays light.

Max 3 colors per slide: background + headline accent + body text.

---

### Typography — what went wrong and how it was fixed

| Mistake | Root cause | Fix |
|---|---|---|
| Eyebrow text vanished (12px ghost) | Too small + too low opacity | 28–36px DG Bold or 14–18px JB Mono 700, opacity ≥ 0.80 |
| Sub text disappeared on complex bg | Opacity 0.22–0.38 too low | Minimum 0.55 opacity + `text-shadow` on all image-layer text |
| Title not centered on hero slide | Top-anchored with padding-top | `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)` |
| Model/brand label went dark on light bg slide | Inherited slide bg logic | Image-layer elements always light — they're over dark image gradient, not over bg |
| VS badge vertically misaligned | Inline element next to block elements | Flex row with `align-items:center`; badge `display:flex;align-items:center` internally |

**Typography scale for carousels:**
- Hero headline: 72–90px Darker Grotesque Black
- Eyebrow: 28–36px DG Bold or 14–18px JB Mono 700
- Model/section label: 44–52px DG Black (image layer)
- Prompt/body text: 18–22px Inter Regular
- Chrome elements: 15–16px JB Mono

Use the full font stack from `studio/brand-guidelines.md` — not just DG/Inter. Alt display fonts (Fraunces, Syne, Cormorant, Chakra Petch) are available for variety.

---

### CTA slide — marketing rules

The CTA is the offer, not a hook. Write the exact value exchange — never genericize Michael's copy.

Structure:
1. What was made
2. Who made it
3. What the reader gets
4. Exact action to take

**Rules:**
- Attribution ("made by X") must be prominent type — 44px+ real size, not ghost text
- Solid background only — no background images, no dividers left over from other slides
- No decorative elements that don't serve the message

---

### Decoration — what's permanently banned

- Black/dark containers or card overlays on images
- Corner L-bracket decorative accents
- Leftover divider lines from previous layout iterations
- Ghost text for anything that should communicate brand or value (opacity < 0.35)
