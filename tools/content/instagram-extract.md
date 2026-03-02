# Instagram Extract

**Category:** content  
**Status:** ✅ Active

## What It Does
Extracts text, links, and key takeaways from Instagram/Threads/LinkedIn posts (especially carousels) using an already-logged-in Chrome browser tab via OpenClaw Browser Relay.

## What Works Well
- Carousel slides via Browser Relay (full-Chrome, logged in)
- Auto-classifies into KB pillars: `prompts_image`, `tutorials_marketing`, `design_inspo`
- Emits JSON payload to media-agent inbox for downstream reuse
- Mac node setup (launchd auto-connect) for persistent browser access

## Limitations / Gotchas
- Requires Chrome Browser Relay (OpenClaw browser tool, `profile="chrome"`)
- X/Twitter: out of scope for this skill — use Parallel AI + Browser Use MCP instead
- Instagram cookies expire ~2026-04 — re-export from browser when login breaks
- Mac node must be active: `launchctl kickstart -k gui/$(id -u)/com.openclaw.node`

## How We Use It
1. User pastes Instagram/Threads/LinkedIn URL
2. Agent uses `browser` tool with `profile="chrome"` to open + navigate
3. Screenshots each carousel slide, extracts text
4. Classifies and saves to `~/work/laniameda/laniameda-hq/knowledge-base/sources/instagram/`
5. Notifies media agent via inbox file

## Cookie File
`/root/.openclaw/media/inbound/file_19---4f9dfbfa-ab80-4543-977e-121e146cc981.txt`

## Skill Location
`~/.openclaw/workspace/skills/instagram-extract/SKILL.md`
