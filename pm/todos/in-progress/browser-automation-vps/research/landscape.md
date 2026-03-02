# Browser Automation Landscape (researched 2026-03-01)

## Options

### Tier 1 — OpenClaw Native (installed ✅)
- CDP + Playwright, headless Chrome on port 18800
- Good for: public sites, cron monitoring

### Tier 2 — Camoufox (to install)
- Firefox patched at C++ level — undetectable by JS fingerprinting
- Good for: Instagram, anti-bot sites
- Install: `pip install camoufox && python -m camoufox fetch`

### Tier 3 — Playwright MCP
- microsoft/playwright-mcp — for Claude Code coding sessions
- `claude mcp add playwright npx @playwright/mcp@latest`

### Tier 4 — Cloud (fallback)
- Browserbase — AI-native, stealth, persistent sessions, CDP compatible
- Browserless.io — hosted Chromium, BrowserQL anti-bot
- OpenClaw can point at these via `cdpUrl` in config — zero code change

## Instagram Specifics
- Headless Chrome gets detected and blocked
- Solution: Camoufox (local) or Browserbase (cloud)
- Cookie persistence: ~/.openclaw/browser/openclaw/user-data survives restarts
- One-time login → export cookies → reuse forever
