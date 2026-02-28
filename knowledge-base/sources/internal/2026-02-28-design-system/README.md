# Laniameda Design System
**Version:** 1.0.0  
**Date:** 2026-02-28  
**Ground truth:** ImageStitch (light theme)

---

## What This Is

A unified design system for all laniameda products.
Extracted directly from the ImageStitch app — the cleanest, most refined implementation of the aesthetic direction Michael wants.

**Aesthetic in one line:** Artistic modern — precision tools with a creative soul.

---

## Files

| File | Contents |
|---|---|
| `tokens.md` | All design tokens — colors, typography, spacing, shadows, animations |
| `components.md` | Component patterns with copy-paste Tailwind/React code |
| `principles.md` | Design philosophy, rules, anti-patterns, per-product notes |

---

## Quick Reference

### Accent Color
`#FF552E` — the only accent. Orange-red. Used for: CTAs, active states, focus, selection.

### Font Stack
- Inter (UI) + DM Serif Display (editorial) + JetBrains Mono (code)

### Light Theme Core
```
background: #ffffff
surface: #fafafa
border: #e4e4e7
text-primary: #09090b
text-secondary: #71717a
accent: #FF552E
```

### Dark Theme Core
```
background: #09090b
surface: #121215
border: #27272a
text-primary: #f4f4f5
text-secondary: #a1a1aa
accent: #FF552E (unchanged)
```

---

## Products Using This System

- ImageStitch — source of truth
- Laniameda Gallery — inherits
- laniameda.com website — inherits
- All future laniameda products

---

## TODO / Next Steps

- [ ] Create Figma variables file from these tokens
- [ ] Export as CSS custom properties file for easy copy-paste
- [ ] Add icon system documentation (lucide-react subset used)
- [ ] Add responsive breakpoints / mobile adaptation rules
- [ ] Screen density audit (compare ImageStitch vs Gallery implementations)
- [ ] Add AI-generated visual examples for each component
