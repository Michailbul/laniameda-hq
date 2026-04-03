# Typography

**Status:** Locked
**Source of truth:** [Figma — Design System v2.0](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=102-2) + [FONTS board](https://www.figma.com/design/03Csu4502y33VuA1TzbtZX/carousels-references?node-id=48-21)
**Last updated:** 2026-04-02

---

## Core Font Stack

Three fonts that appear in every context. These are the defaults.

| Role | Font | CSS var | Weights | Character |
|---|---|---|---|---|
| **Display** | Darker Grotesque | `--font-display` | Black (900), Bold (700), Medium (500), Light (300) | Condensed, sharp, modern. CAPS or large sizes only. |
| **Body** | Inter | `--font-body` | Regular (400), Medium (500), Semi Bold (600), Bold (700) | Clean, readable, professional. |
| **Mono** | JetBrains Mono | `--font-mono` | Regular (400), Bold (700) | Data, labels, tags, code. |

---

## Alternate Display Fonts

Used to prevent visual monotony across carousels and content. Each has a defined pairing partner.

| Font | CSS var | Weights | Character | Pair with |
|---|---|---|---|---|
| **Fraunces** | `--font-serif` | Regular (400), Black (900), Italic | Warm editorial. Serif surprise. | Geist or Inter |
| **Syne** | `--font-tech` | Bold (700), ExtraBold (800) | Technical authority. Sharp edges. | Space Mono or JB Mono |
| **Cormorant** | `--font-elegant` | Bold (700) | Classical editorial weight. | Geist or Inter |
| **Chakra Petch** | `--font-futuristic` | Bold (700) | Precision, futuristic. | Darker Grotesque |

---

## Alternate Body/Mono Fonts

Verified in Figma FONTS board. Used in specific pairings only — not as general replacements.

| Font | Role | Weights | When to use |
|---|---|---|---|
| **Geist** | Alt body | Regular (400) | Paired with Fraunces or Cormorant for editorial feel. Cleaner than Inter at small sizes. |
| **Space Mono** | Alt mono | Regular (400), Bold (700) | Paired with Syne for full tech aesthetic. Rawer than JB Mono. |

---

## Figma-Verified Pairings

These 7 pairings are tested on dark and light backgrounds in the Figma FONTS board.

| Pair | Display | Body/Caption | Character |
|---|---|---|---|
| **1** | Fraunces Black | Geist Regular | Dramatic serif + clean sans. Warm editorial. |
| **5** | Syne ExtraBold | Space Mono Regular | Extended sans + monospace. Technical authority. |
| **7** | Cormorant Bold | Geist Regular | Elegant serif + clean body. Classical editorial. |
| **17** | Darker Grotesque Black | JetBrains Mono Regular | Condensed display + mono. Default brand pair. |
| **F5** | Chakra Petch Bold | Darker Grotesque Medium | Futuristic + condensed. Precision feel. |
| — | Syne Mono Regular | (standalone) | Raw, mechanical. Data-forward moments. |
| — | Syne Bold | (standalone) | Bold tech headlines. |

### Pairing Recipes (quick reference)

```
HOOK           DG Black 96px          +  Inter 28px body
CONTENT        DG Bold 60px           +  Inter 30px body
EDITORIAL      Fraunces Black 72px    +  Geist 28px body
STATEMENT      Syne ExtraBold 80px    +  Space Mono 22px label
TECHNICAL      Syne Bold 64px         +  JB Mono 24px body
WARM           Fraunces Black 72px    +  Inter 32px body
CLASSICAL      Cormorant Bold 80px    +  Geist 28px body
FUTURISTIC     Chakra Petch Bold 72px +  DG Medium 28px body
```

---

## Type Scale

### Social media / carousel (1080×1350px canvas)

Optimized for mobile viewing at Instagram size. These sizes are 2× larger than web because the rendered output is viewed on small screens.

| Role | Size | Font + Weight |
|---|---|---|
| Hero / Title | **80–120px** | DG Black or alt display Black |
| Headline | **56–72px** | DG Bold or alt display Bold |
| Subheadline | **36–48px** | Inter Medium |
| Body | **28–36px** | Inter Regular |
| Caption / Tag | **20–24px** | Inter Medium or JB Mono |
| Code / Data | **22–28px** | JB Mono Regular |
| Label | **16–20px** | JB Mono Bold, uppercase |
| CTA button | **28–32px** | Inter Semi Bold |

### Scale contrast

Hero should be 3–5× larger than body. 120px headline + 28px body = 4.3× ratio. This scale contrast creates the drama that makes our content stop the scroll.

---

## Typography Rules

1. **Max 2 font families per slide.** Display + body. Mono as third only for data labels.
2. **DG at large sizes only.** Below 40px it loses character. Use Inter below that.
3. **Scale contrast creates drama.** Push the ratio hard — 200px hero next to 30px supporting text.
4. **Mixed-weight headlines are powerful.** "3 →" in DG Light + "Apply styles" in DG Black — one headline, two weights.
5. **Letter-spacing:** DG display at -0.02em. Inter body at 0. Mono at +0.02em. Labels/tags at +0.06em.
6. **Line-height:** DG display at 0.9–1.0. Inter body at 1.35–1.5. Tight headlines, breathing body.
7. **Inter Medium (500) max for body text.** Semi Bold for buttons only.
8. **Geist and Space Mono are alt fonts** — use only in their defined pairings, not as general replacements for Inter/JB Mono.

---

## Google Fonts Import

For HTML-rendered content, load all brand fonts via Google Fonts CDN:

```
Darker Grotesque: 300,500,700,900
Inter: 400,500,600,700
JetBrains Mono: 400,700
Fraunces: 400,900 + italic
Syne: 700,800
Cormorant: 700
Chakra Petch: 700
Geist: 400
```

Space Mono is also available on Google Fonts. Geist is available via `fonts.googleapis.com` or CDN.
