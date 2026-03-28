# Marketing Content System
_Last updated: 2026-02-24_

---

## The Goal

A simple, organized pipeline that takes raw content (YouTube videos, X posts, articles) and turns it into ready-to-post marketing material — copy + visuals — that Michael can pick up, tweak lightly, and post himself.

**No automatic posting. Human in the loop for final publish.**

---

## Content Pillars

1. **Value / Education** — for AI creators (main driven topic)
2. **Brand Awareness** — what we believe in, philosophy, culture (attracts people who resonate)
3. **News / Announcements** — repurposed content from X and industry, wrapped in our brand

---

## The Flow

```
INPUT (dropped by Michael)
  └─ YouTube link
  └─ X post link
  └─ Article URL
  └─ Raw idea / notes
        ↓
PROCESSING (Lani does this)
  1. Extract content
     - YouTube → transcript via youtube-watcher
     - X post → content via x-tweet-fetcher
     - URL → content via parallel-web-extract
  2. Summarize key insights
  3. Tag content pillar (education / brand / news)
        ↓
COPY GENERATION (lania-marketing workflows)
  Following repurpose.md workflow:
  - X post (single or thread)
  - LinkedIn post
  - Instagram caption
  - Newsletter snippet (optional)
        ↓
CAROUSEL (when relevant)
  1. Carousel plan (plan.md workflow)
  2. Carousel HTML/CSS code (code.md workflow, 1080x1350)
  3. Screenshot → image file
        ↓
OUTPUT → content-queue/
  Organized folder. Michael picks up, tweaks, posts.
```

---

## Output Structure

All generated content lives in `/Users/michael/work/lania-marketing/content/`:

```
content/
  queue/              ← ready to post (approved)
    MMDD-slug/
      x.md            ← X copy
      linkedin.md     ← LinkedIn copy
      instagram.md    ← Instagram caption
      newsletter.md   ← Newsletter snippet (if relevant)
      carousel/
        plan.md       ← slide-by-slide plan
        index.html    ← generated carousel code
        slide-01.png  ← screenshot exports
        slide-02.png
      source.md       ← original source + notes
  drafts/             ← work in progress, not ready
  posted/             ← archive of published content
```

---

## Tools & Skills in Play

| Step | Tool | Status |
|---|---|---|
| YouTube transcript | `youtube-watcher` (yt-dlp) | ✅ Ready |
| X post content | `x-tweet-fetcher` | ✅ Ready |
| URL extraction | `parallel-web-extract` | ✅ Ready |
| Copy generation | `lania-marketing` workflows | ✅ Ready |
| Repurpose pack | `repurpose.md` workflow | ✅ Ready |
| Carousel plan | `plan.md` workflow | ✅ Ready |
| Carousel code | `code.md` workflow (HTML/CSS 1080x1350) | ✅ Ready |
| Carousel screenshots | browser tool | ✅ Ready |
| Image generation | `nano-banana-pro` | ✅ Ready |

---

## Build Order

### Phase 1 — Manual but organized (NOW)
- Drop any link or content to Lani in Telegram
- Lani runs the full flow end-to-end
- Output lands in `content/queue/` — ready to pick up and post
- No automation needed, this works today

### Phase 2 — Carousel agent (next)
- Wire up coding-agent to run carousel code workflow automatically
- Browser screenshots the output
- Images exported alongside copy

### Phase 3 — Content ingestion (later)
- Fix browser-use CLI or use Playwright Python directly
- Auto-scrape X / Discord for inspiration and news
- Feed into the same pipeline

---

## How to Trigger

Just drop in Telegram:
- A YouTube link → full repurpose pack
- An X post link → brand-voice repurpose
- A raw idea → copy in all formats
- "make a carousel about X" → full carousel flow

---

## What Michael Does

1. Reviews the generated copy in `content/queue/`
2. Tweaks text if needed (light edits)
3. Takes the image/carousel files
4. Posts manually to X / Instagram / LinkedIn

That's it.

---

_File: marketing-system.md — workspace root_
