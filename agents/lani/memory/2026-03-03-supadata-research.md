# Supadata API Research — 2026-03-03

## What is Supadata?
A hosted API for extracting content from the web and video platforms. No vision model needed — it handles transcription natively (or falls back to AI). API key auth, JSON responses, credit-based pricing.

Docs: https://docs.supadata.ai
Dashboard: https://dash.supadata.ai

---

## Core Services

### 1. Transcript API (`GET /v1/transcript`)
**This is the killer feature for us.**

- Supports: YouTube, TikTok, Instagram, X/Twitter, Facebook, **public file URLs**
- Modes:
  - `native` — fetch existing captions/subtitles only (cheapest, 1 credit)
  - `generate` — always AI-generate (costs per minute of video: 2 credits/min)
  - `auto` (default) — try native first, fall back to AI generate
- Output:
  - `text=true` → plain text string (perfect for agent ingestion)
  - `text=false` → timestamped chunks `[{text, offset, duration, lang}]`
- Language support: ISO 639-1 codes, auto-detects available langs
- Async: large videos return `jobId`, poll `/transcript/{jobId}` for results

**What this replaces:** Any existing skill that used vision models to "watch" a video for content extraction. This is way cheaper and faster.

### 2. Extract API (`POST /v1/extract`)
AI-powered structured data extraction from video — you provide a prompt or JSON Schema, it returns structured output.

- Same platform support as transcript
- Always async (returns jobId)
- Example use: extract product names from a YouTube review, pull timestamps of key moments, extract speaker quotes
- **Relevant for us:** Could power prompt extraction from AI tutorial videos automatically

### 3. YouTube-Specific Endpoints
- `GET /v1/youtube/transcript` — YouTube-specific, supports language selection + translation
- `GET /v1/youtube/channel` — channel metadata
- `GET /v1/youtube/channel-videos` — list all video IDs from a channel
- `GET /v1/youtube/playlist` — playlist metadata + video IDs
- `GET /v1/youtube/search` — search YouTube with filters
- `POST /v1/youtube/transcript-batch` — batch transcription (multiple videos at once)
- `GET /v1/youtube/translation` — translate transcript to another language

### 4. Web Scraper
- `GET /v1/web/scrape` — any URL → Markdown (replaces our web_fetch for structured content)
- `GET /v1/web/crawl` — crawl entire site
- `GET /v1/web/map` — get all URLs on a site (sitemap generator)

### 5. Metadata API
- `GET /v1/metadata` — unified metadata across all platforms (title, author, engagement)

---

## Pricing
Credit-based:
- 1 transcript (native) = **1 credit**
- 1 generated transcript minute = **2 credits** (AI fallback)
- 1 video/channel/playlist metadata = **1 credit**
- 1 web scrape = **1 credit**
- Transcript translation = **30 credits/minute** (expensive — avoid unless needed)
- Credits do NOT roll over monthly

---

## MCP Integration
They have an official MCP server (`@supadata/mcp`). This means:
- Can be plugged into Claude Desktop, Cursor, VS Code, Windsurf directly
- npx-based, just needs `SUPADATA_API_KEY` env var
- Gives any MCP-capable agent: transcript extraction, web scraping, site crawling — as native tools

For OpenClaw: we'd build a skill wrapper around the REST API (not MCP), but MCP is an option for Cursor-based coding agents.

---

## What This Replaces / Impacts

| Current approach | Supadata replacement |
|---|---|
| Vision model watching YouTube video | `transcript` API (native mode, 1 credit) |
| Manual yt-dlp + Deepgram transcription pipeline | `transcript` API (auto mode, handles everything) |
| Custom YouTube scraping for channel videos | `youtube/channel-videos` endpoint |
| Searching YouTube manually | `youtube/search` endpoint |
| web_fetch for article extraction | `web/scrape` (richer Markdown output) |

**Note:** Deepgram is still better for **our own audio files** (podcast recordings, voice memos, locally recorded content). Supadata is for **internet-hosted video** (YouTube, social platforms).

---

## Skill Opportunity
Build `supadata` skill at `~/.openclaw/workspace/skills/supadata/SKILL.md`:
- Methods: `get_youtube_transcript(url, mode="native", text=true)`, `get_channel_videos(channel_url)`, `search_youtube(query)`, `scrape_web(url)`, `extract_structured(url, prompt_or_schema)`
- Env: `SUPADATA_API_KEY` in `.env`
- Replace any existing YouTube transcript skill

---

## Verdict
**Worth adopting.** Native YouTube transcript = 1 credit = fractions of a cent. Saves token cost vs. passing video to vision models. The batch endpoint is particularly useful for bulk channel ingestion (content automation pipeline). Get API key, add to `.env`, build the skill.

Action items:
1. Sign up at https://dash.supadata.ai
2. Add `SUPADATA_API_KEY` to `/root/.openclaw/.env`
3. Build skill: `~/.openclaw/workspace/skills/supadata/SKILL.md`
4. Replace any yt-transcript flows in content automation pipeline
