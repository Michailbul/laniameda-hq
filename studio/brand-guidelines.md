# Laniameda — Brand guidelines v1.0

**Last updated:** 2026-03-29
**Status:** Draft — typography proposed, colors locked, awaiting Michael's final picks

---

## 1. Brand overview

**Name:** Laniameda
**Tagline:** AI is the instrument. Feeling is the output.

Laniameda is an AI-native creative studio. Art, engineering, emotional depth — that's where the work lives. In a world where anyone can generate anything, we're the ones who actually make the film. We optimize for resonance over volume. Every frame, every line of code gets held to craft standard.

**Brand archetype:** Creator with Magician undertones. We make things that didn't exist before and make them feel inevitable.

---

## 2. Personality and voice

**Personality:** Visceral. Precise. Warm. Uncompromising. Modern.

**Tone:** Direct and confident. Technical when it matters, emotional when it counts. Short sentences. No filler. Every word earns its place. Never corporate, never casual-cute.

**We are / we aren't:**
- Visceral, never sentimental
- Precise, never cold
- Modern, never trendy

**Sample copy:**
- "Built with AI. Crafted by hand. Felt in the chest."
- "The gap between capability and compulsion — that's where artists live."
- "Few people make the film even though everyone can."

---

## 3. Color system

### Primary palette

| Token | Hex | Name | Use |
|---|---|---|---|
| Anchor | `#FF8C42` | Ember | CTAs, highlights, accent moments, brand marks. Never as background fill. 2-3 uses per layout max. |
| Dark bg | `#0A0805` | Obsidian | Primary dark theme background. Rich near-black, warm undertone. |
| Dark text | `#F0EBE8` | Bone | Text on dark backgrounds. Warm off-white. |
| Light bg | `#FAF7F4` | Parchment | Primary light theme background. Warm, creamy. |
| Light text | `#1A1008` | Ink | Text on light backgrounds. Deep warm brown-black. |

### Extended palette

| Token | Hex | Name | Use |
|---|---|---|---|
| Muted dark | `#8A7E76` | Ash | Secondary text, captions on dark theme |
| Muted light | `#7A6E65` | Stone | Secondary text, captions on light theme |
| Surface dark | `#151210` | Charcoal | Cards, panels on dark theme |
| Surface light | `#F0ECE8` | Linen | Cards, panels on light theme |
| Border dark | `#2A2420` | Smoke | Borders, dividers on dark theme |
| Border light | `#E0D8D0` | Sand | Borders, dividers on light theme |

### Gradient

`#FF6B35 → #FF8C42 → #FFAD6B` — Ember gradient, horizontal or 135deg. Reserved for hero moments, key CTAs, brand signatures. Earned, not decorative.

### Rules

- Dark theme is the primary experience. Light is the variant.
- Ember is sacred. Use it sparingly — it should burn, not flood.
- No Ember text on Parchment (insufficient contrast). Use on Obsidian or as decorative element.
- Gradients are earned. Hero moments only.
- No pure black (`#000`) or pure white (`#fff`) anywhere. Everything has warmth.

---

## 4. Typography

**Status: proposed — awaiting Michael's final picks from Figma specimen board**

| Role | Font | Weight | Use |
|---|---|---|---|
| Display | Darker Grotesque | Black (900), ExtraBold (800) | Hero headlines, carousel titles, social headers |
| Body | Inter | Regular (400), Medium (500) | Body copy, captions, UI text |
| Accent serif | Noto Serif Display | Italic, SemiBold Italic | Pull quotes, emotional beats, featured text |
| Mono | JetBrains Mono | Regular (400) | Code, tags, timestamps |

### Social media type scale

| Role | Size | Weight | Font | Use |
|---|---|---|---|---|
| Hero | 64-80px | 900 | Darker Grotesque | Carousel title slides |
| Headline | 36-48px | 800 | Darker Grotesque | Section headers |
| Subhead | 24-32px | 600 italic | Noto Serif Display | Pull quotes, emotional beats |
| Body | 16-20px | 400 | Inter | Explanatory text |
| Caption | 12-14px | 500 | Inter | Metadata, handles, credits |
| Tag | 11-13px | 400 | JetBrains Mono | Labels, categories |

### Rules

- Darker Grotesque: CAPS or large sizes only. Loses character at small sizes.
- Inter: Medium (500) max. Never bold — kills the cleanness.
- Serif is the surprise element. Once per layout to create a moment.
- Letter-spacing: Darker Grotesque display at -0.02em. Inter body at 0. Mono at 0.02em.

---

## 5. Logo and mark

**Status: no locked logo yet.** Direction:

- **Wordmark:** "LANIAMEDA" in Darker Grotesque Black, all caps, tight tracking (-0.03em).
- **Monogram:** "LM" ligature for social avatars, favicons.
- **Clear space:** Minimum = cap height of the wordmark on all sides.
- **Approved backgrounds:** Obsidian, Parchment, or photography with sufficient contrast.
- **Ember mark:** Optional small `#FF8C42` dot or slash as brand punctuation. Like a signature.
- **Don't:** put it on mid-tone backgrounds, add shadows or glows, use a different typeface for it.

---

## 6. Imagery and visual language

### Photography / AI-generated imagery

- **Mood:** Cinematic. Warm shadows, intentional framing. Every image looks like a still from a film worth watching.
- **Color grading:** Warm highlights, deep shadows. Slightly desaturated midtones. Ember tones in highlights when possible.
- **Contrast:** High. Shadows are dark, highlights glow. No flat even lighting.
- **Composition:** Tight crops, unusual angles, corner framing. Nothing center-composed or stock-looking.

### Gradients

- Primary: `#FF6B35 → #FF8C42 → #FFAD6B` (horizontal or 135deg)
- Use for hero backgrounds (subtle, behind dark text), accent bars, brand moments
- Mesh/radial: Ember bleeding into Obsidian for dark theme heroes

### Texture

- Subtle grain overlay (2-4% opacity) on solid backgrounds. Adds warmth, kills sterility.
- Corner frames: thin Ember L-shapes (2px, 40px length) at two opposite corners of featured content. Signature layout device.

### Avoid

- Stock photo aesthetics
- Flat, unshadowed, clean-Pinterest imagery
- Over-saturated colors
- Busy decorative patterns

---

## 7. Layout principles (social media)

### Carousel format (1080x1350)

**Title slide:**
- Darker Grotesque headline, 64-80px, CAPS
- Ember accent line or corner frame
- Dark background default
- 5 words max

**Content slides:**
- Body in Inter, 18-20px
- One idea per slide
- Left-aligned, 80px side margins
- Ember highlight on key phrases (not whole sentences)

**Closing slide:**
- CTA or handle
- Wordmark
- Ember gradient accent

### Component system

| Component | Spec |
|---|---|
| Corner frames | 2px Ember lines, 40px length, two opposite corners |
| Accent bars | 3px Ember horizontal rule between sections |
| Decorative quotes | Noto Serif Display italic, 120px, 15% opacity |
| Tags/pills | JetBrains Mono 11px, Ember text on Ember/10% bg, 4px radius |
| Cards | 8px radius, 1px border (Smoke or Sand), no shadow on social |

### Spacing (8px base)

| Token | Value | Use |
|---|---|---|
| xs | 8px | Inner padding, icon gaps |
| sm | 16px | Element spacing |
| md | 24px | Section gaps |
| lg | 40px | Major sections |
| xl | 80px | Page margins on social |

### Border radius

- Buttons/pills: 4px
- Cards/containers: 8px
- Avatars: full
- Never exceed 12px.

---

## 8. Copy standards

All copy written for Laniameda must pass the `human-copy-standards` skill. Key rules:

- No negative parallelisms ("not X, it's Y")
- No inflation words (pivotal, crucial, groundbreaking, transformative)
- No AI vocabulary (delve, underscore, showcase, foster, landscape, tapestry, testament)
- No participial tails ("...highlighting the brand's commitment to...")
- No synonym rotation (don't cycle through "platform," "solution," "ecosystem" for the same thing)
- No rule-of-three addiction
- Max one em-dash per paragraph
- Say "is" instead of "serves as." Say "has" instead of "boasts."
- Use specific numbers, names, dates. Generalizations are forgettable.
- Vary sentence length and paragraph size. Uniform rhythm is an AI tell.
- Have opinions. Copy without a point of view has no soul.

---

## 9. Quick reference

```
BRAND: Laniameda
TAGLINE: AI is the instrument. Feeling is the output.
ARCHETYPE: Creator
PERSONALITY: Visceral, Precise, Warm, Uncompromising, Modern

COLORS
Anchor:      #FF8C42 (Ember)
Dark bg:     #0A0805 (Obsidian)
Dark text:   #F0EBE8 (Bone)
Light bg:    #FAF7F4 (Parchment)
Light text:  #1A1008 (Ink)
Muted dark:  #8A7E76 (Ash)
Muted light: #7A6E65 (Stone)

FONTS
Display:      Darker Grotesque (Black/ExtraBold)
Body:         Inter (Regular/Medium)
Accent serif: Noto Serif Display (Italic)
Mono:         JetBrains Mono

VOICE: Direct, confident, no filler. Technical when it
matters, emotional when it counts.
```

---

## Open decisions

1. **Typography** — proposed fonts above. Michael needs to confirm or swap from Figma specimens.
2. **Logo** — direction set, needs actual design work.
3. **Additional accent colors** — currently Ember only. May need a secondary for data viz or multi-state UI.
