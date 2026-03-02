# 🛠️ Tools & Workflows Knowledge Base

Quick-reference index for all tools used at laniameda studio.

_Last audited: 2026-03-02 by Lani (full studio audit)_

## Tool Index

| Tool | Category | Status | What it does |
|------|----------|--------|--------------|
| [Nano Banana Pro](image-gen/nano-banana-pro.md) | image-gen | ✅ Active | AI image gen/edit via Gemini 3 Pro Image (1K/2K/4K) |
| [MidJourney](image-gen/midjourney.md) | image-gen | 🧪 Testing | Highly stylized AI image generation |
| [Claude Code](code-agents/claude-code.md) | code-agents | ✅ Active | Agentic coding assistant by Anthropic with multi-agent support |
| [Codex](code-agents/codex.md) | code-agents | 🧪 Testing | OpenAI coding agent — end-to-end feature ship via codex-feature-ship skill |
| [browser-use](automation/browser-use.md) | automation | ✅ Active | AI-driven browser automation (Playwright + LLM, authenticated sessions) |
| [Playwright](automation/playwright.md) | automation | ✅ Active | Programmatic browser automation library |
| [Notion](integrations/notion.md) | integrations | ✅ Active | Project management kanban — mirror/display layer for local file truth |
| [Composio](integrations/composio.md) | integrations | ✅ Active | Integration layer for AI agents (Google Calendar, Gmail, etc.) |
| [Google Calendar](integrations/google-calendar.md) | integrations | ✅ Active | Calendar via Composio integration |
| [mcporter](integrations/mcporter.md) | integrations | ✅ Active | MCP server manager (3 active: pencil, figma, filesystem) |
| [OpenClaw Webhook](integrations/openclaw-webhook.md) | integrations | ✅ Active | Internal agent→Telegram hook for coding agent notifications |
| [OpenClaw](ai-models/openclaw.md) | ai-models | ✅ Active | Agent runtime: hosts Lani/Meda/Persey/Desi, skills, nodes, hooks |
| [Claude (Anthropic)](ai-models/claude-anthropic.md) | ai-models | ✅ Active | Primary LLM — claude-sonnet-4-6, powers all agents |
| [Gemini CLI](ai-models/gemini-cli.md) | ai-models | ✅ Active | CLI for one-shot Q&A and generation via Google Gemini |
| [ElevenLabs / sag](ai-models/elevenlabs-sag.md) | ai-models | ✅ Active | TTS with mac-style UX — voice storytelling |
| [Whisper (local)](ai-models/whisper-transcription.md) | ai-models | ✅ Active | Local offline speech-to-text transcription |
| [laniameda-kb](content/laniameda-kb.md) | content | ✅ Active | Save prompts/images/links to laniameda.gallery Convex KB |
| [YouTube Watcher](content/youtube-watcher.md) | content | ✅ Active | Fetch YouTube transcripts for summarization and KB ingestion |
| [X Tweet Fetcher](content/x-tweet-fetcher.md) | content | ✅ Active | Fetch tweets/articles without login (FxTwitter API) |
| [Instagram Extract](content/instagram-extract.md) | content | ✅ Active | Extract Instagram/Threads/LinkedIn posts via Browser Relay |
| [Parallel Web Extract/Search](content/parallel-web-extract.md) | content | ✅ Active | Deep web research and URL extraction skills |
| [LTX-2](video-gen/ltx-2.md) | video-gen | 🔬 Research | Open-weights audio+video gen, native 4K, self-hostable |
| [Seedance 2.0](video-gen/seedance-2.md) | video-gen | 🔬 Research | Hyperrealistic video generation (ByteDance) |
| [Parallel AI + BrowserUse MCP](deprecated/parallel-browseruse-mcp.md) | automation | 🔜 Planned | Cloud authenticated browser automation — needs API keys |

## Status Legend
- ✅ Active — in use
- 🧪 Testing — being evaluated
- 🔬 Research — on radar, not set up
- 🔜 Planned — designed, blocked on setup
- ❌ Deprecated — tried and dropped

## Folders

- `image-gen/` — image generation models and tools
- `video-gen/` — video generation models
- `code-agents/` — coding agents (Claude Code, Codex)
- `automation/` — browser and workflow automation
- `content/` — content creation, extraction, and KB tools
- `design/` — design tools (Figma via MCP)
- `ai-models/` — LLMs, APIs, and runtime
- `integrations/` — third-party integrations (Notion, Composio, etc.)
- `deprecated/` — tools tried and dropped, or planned but blocked

## Key Env Variables (configured in `~/.openclaw/.env`)
| Variable | Service |
|----------|---------|
| `NOTION_API_KEY` | Notion API |
| `NOTION_TASKS_DB` | Notion Tasks database ID |
| `COMPOSIO_API_KEY` | Composio integrations |
| `ELEVENLABS_API_KEY` | ElevenLabs TTS (sag) |

## Agents & Their Tools
| Agent | Role | Primary Tools |
|-------|------|---------------|
| **Lani** | Chief of Staff / orchestrator | All tools, sub-agent spawning, PM sync |
| **Meda** | CMO / marketing | nano-banana-pro, instagram-extract, x-tweet-fetcher, youtube-watcher, notion, carousel workflows |
| **Persey** | CTO / engineering | claude-code, codex, github (gh CLI), parallel-web-search |
| **Desi** | Creative Director | nano-banana-pro, design MCP tools, laniameda-kb |

---
_Last updated: 2026-03-02_
