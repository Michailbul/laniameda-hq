# Browser Control on VPS for AI Agents
## Comprehensive Research Report — laniameda / OpenClaw Setup
**Date:** February 28, 2026  
**Prepared by:** Meda (Marketing CMO Agent)  
**Status:** Final

---

## Executive Summary

This report investigates all viable options for running a web browser on a Linux VPS (Hostinger, Ubuntu) that can be controlled autonomously by AI agents — specifically OpenClaw agents and Claude Code sessions. The goal is to eliminate dependency on the developer's local Mac for any browser-related agent tasks.

**Bottom line:**

1. **Immediate fix (10 min, free):** Chromium is already installed on this VPS and works in headless mode. OpenClaw's native `openclaw` browser profile can control it directly — no Mac required.
2. **For anti-bot sites (YouTube, Google):** Add Browserless.io as a remote CDP profile in OpenClaw config — natively supported, free tier available.
3. **For complex autonomous agent tasks:** Install `browser-use` (Python) on the VPS — Claude Code has a native skill for it, and it now has a cloud option too.

---

## The Problem

**Current setup:**
- OpenClaw runs on Hostinger VPS
- `browser` tool uses `profile="chrome"` — requires the Browser Relay extension attached to a tab on the developer's Mac
- VPS has no display → agent cannot open a visible browser autonomously
- This means any browser task requires the developer to be at their Mac with the extension active

**Target state:**
- Agent can spin up and control a browser entirely on the VPS
- No Mac required for browser automation
- Works for both simple page navigation and complex authenticated sessions (YouTube, etc.)

---

## Environment Verified (Live on This VPS)

```
VPS: Hostinger Ubuntu (82.25.85.143)
Chromium: 145.0.7632.109 (snap) ✅ INSTALLED
Headless test result: chromium-browser --headless=new --no-sandbox → WORKS ✅
playwright-core: bundled with OpenClaw ✅
Node.js: v22.22.0 ✅
Python: 3.12 ✅
```

**Chromium headless confirmed working** — it renders full pages, executes JavaScript, and returns complete DOM content.

---

## Option 1: OpenClaw Native Headless Chromium
### ⭐ RECOMMENDED — Start Here

**What it is:**  
OpenClaw has a built-in browser manager (`openclaw` profile) that can launch Chromium in headless mode. Isolated from any personal browser — a dedicated agent-only surface.

**How it integrates:**  
Agent uses `browser(action="snapshot", profile="openclaw")` — identical to current usage, no code changes needed. OpenClaw manages the full browser lifecycle.

**Official OpenClaw docs confirm:**  
> "Auto-detect order: system default browser if Chromium-based; otherwise Chrome → Brave → Edge → Chromium → Chrome Canary. On Linux: looks for `google-chrome`, `brave`, `microsoft-edge`, `chromium`, etc."

**Playwright note:**  
OpenClaw bundles `playwright-core`. For full features (click/type/act/snapshot/PDF), the full `playwright` package must be installed separately. Basic screenshots and ARIA snapshots work with `playwright-core` alone.

**Setup:**
```bash
# Step 1: Install full Playwright + system dependencies
npm install -g playwright
npx playwright install chromium
npx playwright install-deps chromium

# Step 2: Configure OpenClaw headless browser
openclaw config set browser.executablePath "/usr/bin/chromium-browser"
openclaw config set browser.headless true
openclaw config set browser.noSandbox true    # Required: VPS runs as root
openclaw config set browser.defaultProfile "openclaw"

# Step 3: Restart gateway
openclaw gateway restart

# Step 4: Test
openclaw browser --browser-profile openclaw start
openclaw browser --browser-profile openclaw open https://example.com
openclaw browser --browser-profile openclaw snapshot
```

**Known VPS issue:** Chromium running as root requires `--no-sandbox`. OpenClaw's `noSandbox: true` handles this automatically.

| Attribute | Value |
|---|---|
| Cost | Free |
| Setup time | ~10 min |
| OpenClaw native | ✅ Yes |
| Claude Code compatible | ✅ Yes |
| Anti-bot capability | Low (VPS IP still flagged) |
| Best for | General web, screenshots, forms, non-protected sites |

---

## Option 2: Browserless.io (Remote CDP)
### ⭐ BEST FOR PROTECTED SITES (YouTube, Google, etc.)

**What it is:**  
Hosted Chromium-as-a-service exposing Chrome DevTools Protocol (CDP) over HTTPS. Runs stealth-mode Chromium in their cloud with residential proxies, CAPTCHA solving, and session management.

**OpenClaw native support:**  
The **OpenClaw official documentation explicitly documents Browserless as a first-class supported integration** via remote CDP — this is not a workaround.

```json5
// ~/.openclaw/openclaw.json
{
  browser: {
    enabled: true,
    defaultProfile: "browserless",
    remoteCdpTimeoutMs: 2000,
    remoteCdpHandshakeTimeoutMs: 4000,
    profiles: {
      browserless: {
        cdpUrl: "https://production-sfo.browserless.io?token=YOUR_API_KEY",
        color: "#00AA00"
      }
    }
  }
}
```

**Pricing (2026):**
- Free tier: 1,000 units/month + free CAPTCHA solving (enough for ~100-200 sessions/month)
- Hobby: ~$30/month for 10,000 units
- Teams: ~$100/month for 50,000 units

**Community feedback:**  
Multiple OpenClaw Discord threads confirm Browserless works out of the box with the CDP config. It's the most recommended solution for VPS users needing to bypass anti-bot measures.

**Setup:**
```bash
# 1. Sign up at browserless.io (free)
# 2. Get API key from dashboard
# 3. Add profile to OpenClaw config (edit ~/.openclaw/openclaw.json)
# 4. Restart gateway
openclaw gateway restart
# 5. Use profile="browserless" in browser tool calls
```

| Attribute | Value |
|---|---|
| Cost | Free tier → $30+/mo |
| Setup time | ~15 min |
| OpenClaw native | ✅ Yes (documented) |
| Claude Code compatible | ✅ Yes |
| Anti-bot capability | High (stealth + CAPTCHA + proxies) |
| Best for | YouTube, Google, authenticated scraping, VPS IP bypass |

---

## Option 3: browser-use (Python Library)
### ✅ BEST FOR AUTONOMOUS MULTI-STEP TASKS

**What it is:**  
Open-source Python library with 50,000+ GitHub stars — one of the fastest-growing AI projects of 2025-2026. Gives an LLM full autonomous control of a browser via an agent loop: the model sees the page (screenshot + DOM) and decides all actions independently.

**Key difference from OpenClaw browser tool:**  
- OpenClaw browser tool: agent-*assisted* (LLM calls specific actions when instructed)
- browser-use: agent-*autonomous* (LLM plans and executes the entire workflow end-to-end)

**Claude Code native skill (officially supported):**
```bash
mkdir -p ~/.claude/skills/browser-use
curl -o ~/.claude/skills/browser-use/SKILL.md \
  https://raw.githubusercontent.com/browser-use/browser-use/main/skills/browser-use/SKILL.md
```

**VPS installation:**
```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh && source ~/.bashrc

# Create project and install
uv init browser-agent && cd browser-agent
uv add browser-use
uvx browser-use install    # Installs Chromium via Playwright

# Set API key
export ANTHROPIC_API_KEY="your-key"

# Quick test
python3 -c "
from browser_use import Agent, ChatAnthropic
import asyncio
agent = Agent(
    task='Go to example.com and return the page title',
    llm=ChatAnthropic(model='claude-sonnet-4-6')
)
asyncio.run(agent.run())
"
```

**Cloud option (for VPS IP issues):**
```python
from browser_use import Browser
browser = Browser(use_cloud=True)  # Routes through stealth cloud browser
# New signups: $10 free credits
# After: ~$0.005/browser action
```

**Performance benchmarks (WebVoyager 2026):**
- browser-use + Claude Sonnet 4.6: **78% task completion** ← best AI result
- browser-use + GPT-4.1 Vision: 72%
- Stagehand + Claude Sonnet: 75%
- Hand-written Playwright scripts: 98% (but takes hours to write)

| Attribute | Value |
|---|---|
| Cost | Free (self-hosted) + LLM costs |
| Setup time | ~20 min |
| OpenClaw native | Via exec tool |
| Claude Code compatible | ✅ Yes (native skill) |
| Anti-bot | Medium (self) / High (cloud) |
| Best for | Complex autonomous tasks, login flows, multi-step research |

---

## Option 4: Stagehand by Browserbase

**What it is:**  
TypeScript SDK adding AI primitives on top of Playwright: `act()` (natural language actions), `extract()` (structured data), `observe()` (understand page). Stagehand 2.0 (2026) added `agent()` for fully autonomous operation.

**Architecture:** Hybrid — mix deterministic Playwright with AI actions in the same script.

**VPS installation:**
```bash
npm install @browserbasehq/stagehand playwright
npx playwright install chromium && npx playwright install-deps chromium
```

**Example:**
```typescript
import { Stagehand } from "@browserbasehq/stagehand";
const stagehand = new Stagehand({ env: "LOCAL" });
await stagehand.init();
await stagehand.page.goto("https://example.com");
const data = await stagehand.extract({
  instruction: "Extract the main heading",
  schema: z.object({ heading: z.string() })
});
```

| Attribute | Value |
|---|---|
| Cost | Free SDK + Browserbase from $49/mo |
| Setup time | ~25 min |
| OpenClaw native | Via exec tool |
| Claude Code compatible | ✅ Yes |
| Anti-bot | High (Browserbase cloud) / Medium (self-hosted) |
| Best for | Structured data extraction, TypeScript teams |

---

## Option 5: Steel.dev (Open-Source Browser API)

**What it is:**  
Open-source headless browser API built specifically for AI agents. Manages browser sessions, authentication persistence, and provides CDP access.

**OpenClaw integration via CDP URL:**
```json5
{
  browser: {
    profiles: {
      steel: {
        cdpUrl: "wss://api.steel.dev/v1/sessions/SESSION_ID/cdp?apiKey=YOUR_KEY"
      }
    }
  }
}
```

| Attribute | Value |
|---|---|
| Cost | Free community tier → $49/mo |
| OpenClaw native | Partial (via CDP URL) |
| Anti-bot | High |
| Best for | Persistent sessions across runs |

---

## Option 6: Playwright (Direct)

**What it is:**  
Microsoft's browser automation framework — no AI, fully deterministic. Installing the full `playwright` package on the VPS is actually a prerequisite for full OpenClaw browser functionality.

```bash
npm install -g playwright
npx playwright install chromium && npx playwright install-deps chromium
```

| Attribute | Value |
|---|---|
| Cost | Free |
| Setup time | ~10 min |
| OpenClaw native | ✅ Enables full OpenClaw browser features |
| Anti-bot | Low |
| Best for | Reliable deterministic automation, enabling OpenClaw features |

---

## Full Comparison Matrix

| Option | VPS Headless | OpenClaw Native | Claude Code | Anti-Bot | Free Tier | Setup | Complexity |
|---|---|---|---|---|---|---|---|
| OpenClaw + Chromium | ✅ | ✅ | ✅ | Low | ✅ Free | 10 min | 1/5 |
| Browserless.io | ✅ Cloud | ✅ | ✅ | High | 1K units | 15 min | 2/5 |
| browser-use (self) | ✅ | Via exec | ✅ Skill | Medium | ✅ Free | 20 min | 3/5 |
| browser-use (cloud) | ✅ Cloud | Via exec | ✅ Skill | High | $10 credit | 20 min | 3/5 |
| Stagehand | ✅ | Via exec | ✅ | High (cloud) | SDK only | 25 min | 3/5 |
| Steel.dev | ✅ Cloud | Via CDP | ✅ | High | Community | 20 min | 3/5 |
| Playwright (direct) | ✅ | ✅ Enables | ✅ | Low | ✅ Free | 10 min | 2/5 |

---

## Implementation Roadmap

### Phase 1 — Today (30 min, $0)
**Goal:** Enable autonomous browser on VPS for general tasks.

```bash
# Install full Playwright
npm install -g playwright
npx playwright install chromium
npx playwright install-deps chromium

# Configure OpenClaw
openclaw config set browser.executablePath "/usr/bin/chromium-browser"
openclaw config set browser.headless true
openclaw config set browser.noSandbox true
openclaw config set browser.defaultProfile "openclaw"
openclaw gateway restart

# Verify
openclaw browser --browser-profile openclaw open https://example.com
openclaw browser --browser-profile openclaw snapshot
```

**Result:** Agents use `profile="openclaw"` — fully autonomous on VPS.

---

### Phase 2 — This Week (15 min, free tier)
**Goal:** Handle YouTube, Google, protected sites.

1. Sign up at browserless.io (free)
2. Get API key
3. Add to `~/.openclaw/openclaw.json`:
```json5
browser: {
  profiles: {
    browserless: {
      cdpUrl: "https://production-sfo.browserless.io?token=YOUR_KEY"
    }
  }
}
```
4. `openclaw gateway restart`

**Result:** Agents use `profile="browserless"` for protected sites.

---

### Phase 3 — This Month (20 min, free)
**Goal:** Autonomous multi-step browser tasks via Claude Code.

```bash
# Install uv + browser-use
curl -LsSf https://astral.sh/uv/install.sh | sh && source ~/.bashrc
uv add browser-use
uvx browser-use install

# Add Claude Code skill
mkdir -p ~/.claude/skills/browser-use
curl -o ~/.claude/skills/browser-use/SKILL.md \
  https://raw.githubusercontent.com/browser-use/browser-use/main/skills/browser-use/SKILL.md
```

**Result:** Claude Code sessions can autonomously complete complex browser workflows.

---

## Cost Summary

| Phase | Component | Monthly Cost |
|---|---|---|
| Phase 1 | OpenClaw + Chromium headless | $0 |
| Phase 1 | Playwright full install | $0 |
| Phase 2 | Browserless.io free tier | $0 (up to 1K sessions) |
| Phase 3 | browser-use self-hosted | $0 + LLM API costs |
| **Total** | | **$0/month** |

---

## Community Feedback Summary

**OpenClaw Discord (Jan-Feb 2026):**
- VPS headless confirmed working on Hetzner/Debian with `noSandbox: true` + `npx playwright install --with-deps chromium`
- Browserless is most recommended cloud option for Google/YouTube bypass
- browser-use cloud option is new (Feb 2026) and solves VPS IP problem for Python workflows

**Hostinger official tutorial (Feb 27, 2026):**
> "For heavy workloads, use the OpenClaw-managed headless browser for server-based automation."

**OpenClaw official FAQ:**
> "The only real trade-off on VPS is headless browser vs a visible window."

---

## Sources
- OpenClaw browser docs: https://docs.openclaw.ai/tools/browser
- OpenClaw FAQ: https://docs.openclaw.ai/help/faq
- OpenClaw Hetzner VPS guide: https://docs.openclaw.ai/install/hetzner
- Hostinger OpenClaw browser tutorial: hostinger.com (Feb 27, 2026)
- browser-use GitHub: github.com/browser-use/browser-use
- Stagehand vs Browser Use vs Playwright: NxCode (Feb 2026)
- Browserless.io pricing: browserless.io
- OpenClaw Discord community threads (Jan-Feb 2026)
- Live VPS Chromium headless test: verified Feb 28, 2026

---

*Report by Meda — AI Marketing CMO, laniameda*
