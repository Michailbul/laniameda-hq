# Projects Index

_All active projects. Updated as status changes._

---

## Active Projects

| Project | Repo | Path | Status |
|---|---|---|---|
| **laniameda.gallery** | `laniamedaHQ/laniameda-gallery` | `~/work/laniameda/laniameda.gallery/` | ✅ Active — prompt/creative vault |
| **AI Creator OS** | `laniamedaHQ/ai-creator-os` | `~/work/ai-creator-os/` | ✅ Active — UGC prompt storage + Convex |
| **RunMusic** | `laniamedaHQ/run-music` | `~/work/runmusic/` | ✅ Active — AI dynamic theming in progress |
| **Marketing System** | `lania-marketing` (local) | `~/work/lania-marketing/` | 🔄 In progress — content pipeline |
| **OpenClaw HQ** | `laniamedaHQ/openclaw-hq` | `~/work/openclaw-hq/` | ✅ Active — VPS bootstrap + sync |
| **Portfolio Second** | `laniamedaHQ/portfolio-second` | `~/work/laniameda/portfolio-second/` | 🔲 Parked |
| **Laniameda Website** | `laniamedaHQ/laniameda-website` | `~/work/laniameda/laniameda-website/` | 🔲 Parked |

---

## Project Details

### laniameda.gallery
**What:** AI creatorship prompt vault — 4 pillars (Creators, Cars, Designs, Dump)
**Stack:** Next.js, Convex, Tailwind
**Key features shipped:**
- Masonry gallery with pillar + model filters
- Per-pillar UI theming (amber, crimson, indigo, teal)
- Model name tags on every asset
- Expanded detail panel (prompt, model, copy, download, AI actions)
- `laniameda-kb` skill — Lani auto-classifies and stores content
**Next up:** Search, download button, tags in expanded panel

---

### AI Creator OS
**What:** UGC prompt storage — content + photography style prompts, Convex backend
**Stack:** Convex, CLI-based ingestion
**Status:** Functional, needs model tagging and pillar expansion

---

### RunMusic
**What:** Running companion app with music
**Stack:** React Native + Expo, Convex
**In progress:** AI dynamic theming — after `finishRun`, generates a `ThemePalette` from album art via Claude Sonnet vision → WCAG contrast check → saves to `userTheme` in Convex

---

### Marketing System (`lania-marketing`)
**What:** Content automation pipeline — scraping, repurposing, delivery
**Status:** Architecture designed, Chunk 1 in progress (browser-use installed, Playwright works)
**Plan:** See `memory/2026-02-23-content-automation-plan.md`

---

### OpenClaw HQ
**What:** Portable control plane — bootstrap scripts, sync tools, repo inventory
**Status:** Fully built locally, pushed to `laniamedaHQ/openclaw-hq`
**Structure:**
```
bootstrap/   ← 00-04 setup scripts for fresh machine/VPS
inventory/   ← repos.json + projects.md + openclaw-paths.md
sync/        ← backup/restore/rsync scripts
docs/        ← migration checklist, secrets policy
```

---

## Parked / Future

| Project | Notes |
|---|---|
| `3d-particles` | Experiment, parked |
| `portfolio-first` | Replaced by portfolio-second |
| `image-stitch` | Tooling, parked |
| `carousel-agent` | Experiment, may revive for content automation |

---

## GitHub Org

All active repos transferred to: **`laniamedaHQ`**
→ https://github.com/laniamedaHQ

---

_Last updated: 2026-02-27 | Owner: Lani_
