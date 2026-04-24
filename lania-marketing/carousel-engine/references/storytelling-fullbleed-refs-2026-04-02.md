# Storytelling / Full-Bleed Photo — Reference Analysis
**Date:** 2026-04-02
**Source:** 3 reference slides (Instagram carousels)
**Pillar:** Storytelling/thoughts — text on full-bleed photos, no overlay

---

## Ref A: "Give Yourself a Deadline" — Sunset Field

```yaml
name: fullbleed-text-on-sky
family: Full-Bleed Photo — quiet zone variant

surface:
  background: "full-bleed photo — low-angle field at dusk, subject standing"
  texture: none
  borders: none

typography:
  display:
    text: "Give Yourself a Deadline"
    font: "Sans Bold — Inter Semi Bold or DG Bold"
    size: ~48-56px
    color: white
    alignment: left
    text_shadow: "0 2px 20px rgba(0,0,0,0.4)"
  body:
    text: "Set a strict deadline for finishing a task or project. / Urgency forces faster decisions and keeps you moving. / Don't wait for the 'perfect' moment—finish it and improve later."
    font: "Inter Regular"
    size: ~26-28px
    color: "white at 90%"
    line_height: 1.5
    alignment: left
    style: "3 separate paragraph blocks with gap between"

layout:
  composition: "text in upper-left quadrant on sky area — subject fills lower-right"
  negative_space: 55%
  text_zone: "upper-left where sky provides natural contrast"
  margins: "~120px left, ~100px top"

images:
  count: 1
  arrangement: full-bleed
  overlay: "NONE — relies on sky as quiet zone"
  content: "person standing in field at sunset, silhouetted"

chrome:
  watermark: none
  dots: "small white dots at bottom center"

laniameda_mapping:
  headline_font: "DG Bold 48-56px or Inter Semi Bold"
  body_font: "Inter Regular 28px"
  text_effect: "text-shadow: 0 2px 20px rgba(0,0,0,0.5)"
  key_rule: "text placement depends on photo composition — find the quiet zone"

css_techniques:
  - "img object-fit:cover 100%"
  - "Text positioned via absolute, top/left percentage based on quiet zone"
  - "text-shadow for legibility without overlay panel"
  - "No dark gradient, no panel — clean text on photo"
```

---

## Ref B: "Iterate and Improve" — Living Room Interior

```yaml
name: fullbleed-text-on-wall
family: Full-Bleed Photo — quiet zone variant

surface:
  background: "full-bleed interior photo — modern living room, cinematic lighting"
  texture: none
  borders: none

typography:
  display:
    text: "Iterate and Improve"
    font: "Sans Bold — Inter Semi Bold"
    size: ~48px
    color: white
    alignment: left
    text_shadow: "0 2px 16px rgba(0,0,0,0.4)"
  body:
    text: "Action beats perfection every time. / Release something, get feedback, then improve. / iteration is better than perfection"
    font: "Inter Regular (some lines Semi Bold)"
    size: ~24-28px
    color: "white at 85%"
    line_height: 1.5
  engagement:
    text: "What's one thing you've been perfecting? Just start and improve along the way."
    font: "Inter Italic or Fraunces Italic"
    size: ~24px
    color: "white at 70%"
    style: "italic — signals engagement CTA"

layout:
  composition: "text upper-center on wall area — person seated in lower-right"
  text_zone: "center-left wall provides neutral surface"
  margins: "~200px left, ~80px top"

images:
  count: 1
  arrangement: full-bleed
  overlay: "NONE"
  content: "person on couch with laptop in modern interior, cinematic"

laniameda_mapping:
  headline_font: "Inter Semi Bold 48px"
  body_font: "Inter Regular 28px"
  engagement_font: "Fraunces Italic or Inter Italic at muted opacity"
  key_rule: "italic closing line = engagement hook, different from body"

css_techniques:
  - "Full-bleed photo, absolute text positioning"
  - "Mixed typography hierarchy: Bold headline → Regular body → Italic CTA"
  - "text-shadow for legibility"
  - "Italic engagement closer at reduced opacity creates visual separation"
```

---

## Ref C: "мои инсайты после 72 часов в темноте" — Bali Yoga

```yaml
name: fullbleed-text-centered-minimal
family: Full-Bleed Photo — quiet zone variant

surface:
  background: "full-bleed photo — tropical setting, overhead angle"
  texture: none
  borders: none

typography:
  display:
    text: "мои инсайты после 72 часов в темноте."
    font: "Sans Regular or Light — wide letter-spacing (~0.2-0.3em)"
    size: ~36-40px
    color: white
    alignment: center
    letter_spacing: "0.2-0.3em — raw/minimal feel"
    line_height: 1.6
    text_shadow: "0 2px 12px rgba(0,0,0,0.4)"

layout:
  composition: "text centered vertically on foliage/greenery — subject below"
  negative_space: 60%
  text_zone: "center — foliage provides enough contrast"

images:
  count: 1
  arrangement: full-bleed
  overlay: "NONE"
  content: "person meditating in tropical setting, aerial view"

chrome: none

laniameda_mapping:
  headline_font: "Inter Light 36-40px or JB Mono Regular with letter-spacing 0.2em"
  key_rule: "wide letter-spacing on simple font = raw, contemplative feel"
  use_case: "personal storytelling, reflective content, hook slides"

css_techniques:
  - "Full-bleed photo"
  - "letter-spacing: 0.2em — creates typewriter/raw aesthetic"
  - "Simple centered text, no hierarchy — just one text block"
  - "text-shadow for legibility on busy background"
```
