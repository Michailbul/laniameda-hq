# Browser Control on VPS — Options & Recommendation
_Research for OpenClaw + Claude Code agents on Hostinger VPS_
_Date: 2026-02-28_

---

## TL;DR — Recommendation

**Use OpenClaw's built-in `openclaw` profile with Chromium (already installed on VPS) + headless mode.**
This is zero-cost, zero-extra-infra, and natively integrated. Set it up in 5 minutes.

For authenticated scraping that needs anti-bot bypass → add **Browserless.io** as a remote CDP profile.

---

## Current Setup (Problem)

- OpenClaw `browser` tool uses `profile="chrome"` → requires Browser Relay extension attached to a tab on your **Mac**
- VPS has no display → agent can't open visible browser
- Brave on Mac = not available to agent on VPS autonomously

---

## Option 1 — OpenClaw Native Headless Chromium ⭐ RECOMMENDED

**What it is:** OpenClaw's built-in browser manager can launch Chromium headlessly on the VPS. Chromium is already installed at `/usr/bin/chromium-browser`.

**How it works:**
- Agent uses `browser` tool with `profile="openclaw"`
- OpenClaw launches Chromium in headless mode on the VPS via CDP
- Full browser control: navigate, click, type, screenshot, snapshot

**Setup:**
```bash
# 1. Set executablePath and enable headless
openclaw config set browser.executablePath "/usr/bin/chromium-browser"
openclaw config set browser.headless true
openclaw config set browser.noSandbox true   # required for root on VPS
openclaw config set browser.defaultProfile "openclaw"

# 2. Test
openclaw browser --browser-profile openclaw start
openclaw browser --browser-profile openclaw open https://example.com
openclaw browser --browser-profile openclaw snapshot
```

**Cost:** Free  
**Setup complexity:** 1/5  
**Anti-bot:** Low (bare Chromium, VPS IP still flagged by YouTube/Google)  
**Best for:** General web browsing, screenshots, non-protected sites  
**OpenClaw native:** ✅ Yes  
**Claude Code compatible:** ✅ Yes (via browser tool in sessions)

---

## Option 2 — Browserless.io (Remote CDP) ⭐ BEST FOR PROTECTED SITES

**What it is:** Hosted Chromium-as-a-service with stealth mode, residential proxies, CAPTCHA solving. OpenClaw has **native built-in support** via remote CDP URL.

**How it works:**
- Browserless runs Chrome in their cloud
- OpenClaw connects to it via CDP WebSocket
- Agent uses `browser` tool with `profile="browserless"` — no other code changes

**Setup:**
```json5
// ~/.openclaw/openclaw.json
{
  browser: {
    enabled: true,
    defaultProfile: "browserless",
    profiles: {
      browserless: {
        cdpUrl: "https://production-sfo.browserless.io?token=YOUR_API_KEY",
        color: "#00AA00"
      }
    }
  }
}
```

**Cost:** Free tier available ($0 for 6 hours/month compute); Hobby $25/mo for heavy use  
**Setup complexity:** 2/5  
**Anti-bot:** High (stealth Chromium, residential proxies available)  
**Best for:** YouTube cookies, authenticated scraping, sites that block VPS IPs  
**OpenClaw native:** ✅ Yes (documented in official OpenClaw docs)  
**Claude Code compatible:** ✅ Yes

---

## Option 3 — browser-use (Python Agent Library)

**What it is:** Open-source Python library (50K+ GitHub stars) that gives an LLM full autonomous control of a browser via Playwright. The LLM sees the page (screenshot + DOM) and decides all actions.

**How it works:**
```python
from browser_use import Agent, Browser
import asyncio

browser = Browser(headless=True)
agent = Agent(task="Go to YouTube and extract transcript of video X", browser=browser, llm=...)
asyncio.run(agent.run())
```

**VPS setup:**
```bash
pip install browser-use playwright
playwright install chromium
playwright install-deps chromium
```

**Cost:** Free (self-hosted) + LLM API costs per action  
**Setup complexity:** 3/5  
**Anti-bot:** Medium (standard Playwright Chromium, can add Bright Data proxy)  
**Best for:** Complex autonomous multi-step tasks, when you need agent reasoning  
**OpenClaw native:** ❌ Not built-in (would need exec tool to call Python script)  
**Claude Code compatible:** ✅ Yes (run via exec in Claude Code sessions)

**Note:** browser-use has an OpenClaw-compatible MCP server planned but not yet released.

---

## Option 4 — Stagehand (Browserbase)

**What it is:** TypeScript SDK that adds AI primitives (`act()`, `extract()`, `observe()`) on top of Playwright. Built by Browserbase (cloud browser infra).

**Architecture:** Hybrid — you mix deterministic Playwright with AI actions.

**VPS setup:**
```bash
npm install @browserbasehq/stagehand playwright
npx playwright install chromium
```

**Cost:** Free SDK + Browserbase cloud ($49/mo for meaningful usage)  
**Setup complexity:** 3/5  
**Anti-bot:** High when using Browserbase cloud; Medium self-hosted  
**Best for:** Structured data extraction, hybrid automation workflows  
**OpenClaw native:** ❌ Not built-in  
**Claude Code compatible:** ✅ Yes (run via exec)

---

## Option 5 — Steel.dev

**What it is:** Browser infrastructure specifically built for AI agents. Exposes sessions via API, handles anti-bot, provides persistent sessions.

**Cost:** Free tier (50 hours/mo); $99/mo for teams  
**Setup complexity:** 2/5  
**Anti-bot:** High  
**OpenClaw native:** ❌ Not built-in (use via cdpUrl pointing to Steel endpoint)  
**Claude Code compatible:** ✅ Yes

---

## Option 6 — Playwright Self-Hosted (Direct)

**What it is:** Microsoft's browser automation framework. Deterministic, no AI, fastest execution.

**VPS setup:**
```bash
npm install playwright
npx playwright install chromium
npx playwright install-deps chromium
```

**Cost:** Free  
**Setup complexity:** 2/5  
**Anti-bot:** Low  
**Best for:** Deterministic scraping, form automation, when you know exactly what to click  
**OpenClaw native:** ❌ Not built-in (use via exec)  
**Claude Code compatible:** ✅ Yes

---

## Comparison Table

| Option | VPS Headless | OpenClaw Native | Claude Code | Anti-Bot | Cost | Complexity |
|---|---|---|---|---|---|---|
| **OpenClaw + Chromium** | ✅ | ✅ | ✅ | Low | Free | 1/5 |
| **Browserless.io** | ✅ (cloud) | ✅ | ✅ | High | Free tier | 2/5 |
| **browser-use** | ✅ | ❌ | ✅ | Medium | Free + LLM | 3/5 |
| **Stagehand** | ✅ | ❌ | ✅ | High (cloud) | $49+/mo | 3/5 |
| **Steel.dev** | ✅ (cloud) | Partial | ✅ | High | Free tier | 2/5 |
| **Playwright** | ✅ | ❌ | ✅ | Low | Free | 2/5 |

---

## Recommended Setup for laniameda VPS

### Phase 1 — Immediate (today): OpenClaw Native Headless
```bash
openclaw config set browser.executablePath "/usr/bin/chromium-browser"
openclaw config set browser.headless true
openclaw config set browser.noSandbox true
openclaw config set browser.defaultProfile "openclaw"
openclaw gateway restart
```

Agent now uses: `browser(action="snapshot", profile="openclaw")` — works on VPS autonomously.

### Phase 2 — For YouTube/Protected Sites: Add Browserless.io
1. Sign up at browserless.io (free tier)
2. Get API key
3. Add to openclaw config:
```bash
openclaw config set browser.profiles.browserless.cdpUrl "https://production-sfo.browserless.io?token=YOUR_KEY"
```
4. Use `profile="browserless"` for YouTube, Google, etc.

### Phase 3 — For Complex Agent Tasks: browser-use via exec
Install browser-use + create a reusable script that agents can call via exec tool for multi-step autonomous browsing tasks (login flows, form submissions, data extraction pipelines).

---

## Sources
- OpenClaw official docs: https://docs.openclaw.ai/tools/browser
- Stagehand vs Browser Use vs Playwright comparison: NxCode (2026)
- Browserless vs Browserbase: browserless.io blog
- browser-use GitHub: github.com/browser-use/browser-use
