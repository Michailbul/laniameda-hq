# TOOLS.md - Crea's Tool Notes

## API Keys (all set in /root/.openclaw/.env)

| Key | Var | What it unlocks |
|-----|-----|-----------------|
| Supadata | `SUPADATA_API_KEY` | Video transcripts — YouTube, Instagram, TikTok, X |
| Browser-Use Cloud | `BROWSER_USE_API_KEY` | Authenticated cloud browser — IG, TikTok, gated pages |
| Browser-Use Profile | `BROWSER_USE_PROFILE_ID` | Saved login sessions for the cloud browser |
| Nano Banana Pro | `GEMINI_API_KEY` | Image gen/edit via Gemini 3 Pro Image |
| Deepgram | `DEEPGRAM_API_KEY` | Audio transcription |
| Parallel AI | `PARALLEL_API_KEY` | Parallel web research + extraction |
| Notion | `NOTION_API_KEY` + `NOTION_TASKS_DB` | Task sync to kanban |
| Convex (gallery) | `CONVEX_URL` | laniameda.gallery database |
| Composio | `COMPOSIO_API_KEY` | Gmail, Google Docs, LinkedIn, YouTube, Reddit |
| Fal | `FAL_KEY` | NOT SET — ask Michael if needed |

## Skill Paths

| Skill | Path |
|-------|------|
| x-tweet-fetcher scripts | `~/.agents/skills/x-tweet-fetcher/scripts/` |
| laniameda-gallery-ingest | `~/.agents/skills/laniameda-gallery-ingest/` |
| crea-cinematic-prompts | `/root/.openclaw/workspace-crea/skills/crea-cinematic-prompts/SKILL.md` |
| browser-use-cloud | `~/.agents/skills/browser-use-cloud/SKILL.md` |

## Gallery
- DB: `https://perfect-buffalo-375.convex.cloud`
- Owner ID: `278674008`
- Pillars: `creators`, `cars`, `designs`, `dump`
- Always tag: model name, pillar, generationType

## Content KB
- Save digested content to: `~/work/laniameda/laniameda-hq/content-kb/sources/`
  - YouTube: `sources/youtube/YYYY-MM-DD-<slug>/`
  - X posts: `sources/x-posts/YYYY-MM-DD-<author>-<slug>/`
  - Instagram: `sources/instagram/YYYY-MM-DD-<slug>/`

## Nano Banana Pro — Prompting Rules
From Crea's research (2026-03):
1. **Reference image + naturalistic prompt beats everything** — this is the default
2. Camera language (Arri Alexa 35, specific aperture) → slight improvement, use when precision matters
3. **Never add keyword salad** (8K, hyperrealistic, ultra-detailed) — steers toward stock photo look
4. No JSON prompting — underperforms in tests
5. No negative tags — mostly degrades output

## Model Quick Reference

| Model | Best for |
|-------|---------|
| Nano Banana Pro (Gemini 3 Pro Image) | UGC, iPhone realism, natural portrait |
| Nano Banana 2 (Gemini 3.1 Flash Image) | Cinematic, typography, character consistency. 60% cheaper. |
| FLUX | Open-weights, strong detail control |
| Midjourney | Artistic/editorial quality |
| Kling v2.5+ | AI video, smooth motion |
| Runway | AI video, cinematic |
| Seedance 2.0 | Hyperrealistic video |
| LTX-2 | Open-weights video + audio, 4K native |
