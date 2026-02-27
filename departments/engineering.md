# Department: Engineering

_The systems layer. What runs under everything we ship._

---

## Owner

**Persey** (product CTO agent) — engineering, product, architecture.
**Michael** — technical decisions, final code review, shipping.

---

## What We Build

### AI Agent Systems
Custom agents built on OpenClaw. Current roster: Lani (ops/CEO), Meda (marketing/CMO), Persey (engineering/CTO). Scoped domains, shared studio context, coordinated via Telegram.

### Workflow Automation
End-to-end pipelines: content ingestion → AI processing → storage → delivery. Designed to run with minimal human intervention.

### Creative AI Pipelines
Connecting AI tools (image generation, video, transcription) to repeatable workflows. Automated prompt storage, tagging, retrieval.

### Content Automation Infrastructure
Browser automation for scraping (browser-use, Playwright), Convex for storage, OpenClaw cron for scheduling, Telegram for delivery.

### Backend / API Layer
Convex as primary backend (real-time, serverless). Used across laniameda.gallery, ai-creator-os.

---

## Tech Stack

| Layer | Stack |
|---|---|
| Runtime | Node.js v22, Bun |
| Frontend | Next.js (App Router), Tailwind CSS |
| Backend | Convex (real-time serverless) |
| AI | Anthropic Claude (Sonnet 4.6), OpenAI, Gemini |
| Agents | OpenClaw, Claude Code, Codex |
| Browser Automation | browser-use, Playwright (arm64 patched) |
| Mobile | React Native + Expo |
| Package mgr | Bun (primary), npm fallback |

---

## Infrastructure

| Tool | Purpose |
|---|---|
| OpenClaw Gateway | Agent orchestration, webhook routing |
| `openclaw-hq` | VPS bootstrap + sync scripts |
| GitHub org: `laniamedaHQ` | All repos centralized |
| Convex | Database + backend for products |

---

## Key Technical Decisions

- **Convex over traditional DB** — real-time, easy agent integration, no infra maintenance
- **Bun over npm** — faster, especially for monorepo-style setups
- **OpenClaw for agent orchestration** — Lani/Meda/Persey all run here
- **browser-use with full Chrome** — headless shell fails on anti-bot sites; full Chrome + `--headless=new` + `--disable-blink-features=AutomationControlled` is the stack
- **Parallel AI + Browser Use MCP** — for authenticated browser sessions without local setup (X, Discord, Notion) — not yet active, API keys needed

---

## Browser Automation Notes

Full lessons: `~/work/laniameda/knowledge_base/` (see browser-automation-lessons.md in workspace memory)

- `sessions.py` patched for arm64 glob fix — re-patch after upgrades
- Never set `PLAYWRIGHT_BROWSERS_PATH`
- Full Chrome for anti-bot sites, headless shell for clean scraping
- X login blocked locally → use Parallel + BrowserUse MCP when ready

---

_Last updated: 2026-02-27 | Owner: Persey + Lani_
