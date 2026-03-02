# browser-use

**Category:** automation  
**Status:** ✅ Active  
**Link:** https://browser-use.com/

## What It Does
AI-driven browser automation — wraps Playwright with an LLM that can navigate, click, and extract from real browser sessions.

## What Works Well
- Real browser (Chromium) with CDP — handles JS-heavy, authenticated sites
- `ocscreenshot` wrapper for quick URL screenshots
- Wonder Studios: works with full Chrome + `--disable-blink-features=AutomationControlled`
- Instagram extraction via Browser Relay (Chrome profile, logged in)

## Limitations / Gotchas
- **NEVER set `PLAYWRIGHT_BROWSERS_PATH`** — breaks all browser lookups
- X (Twitter) login blocked locally — use Parallel AI + Browser Use MCP instead (cloud profile)
- `sessions.py` has a patched arm64 glob fix — **re-apply after upgrades**
- Headless shell detected by some sites → use full Chrome `--headless=new` instead
- Notion screenshots: use viewport only (full_page breaks lazy image loading)

## How We Use It

```bash
# Quick screenshot (headless)
ocscreenshot <url> out.png --wait 8

# Authenticated/JS-heavy scraping
~/.local/share/uv/tools/browser-use/bin/python scrape_script.py
```

For Instagram: use `browser` tool with `profile="chrome"` (OpenClaw Browser Relay).

## Important Paths

```
Headless shell:  ~/Library/Caches/ms-playwright/chromium_headless_shell-1208/...
Full Chromium:   ~/Library/Caches/ms-playwright/chromium-1208/...
browser-use CLI: ~/.local/bin/browser-use
ocscreenshot:    ~/.local/bin/ocscreenshot
```

## Related
- `browser-automation-lessons.md` in Lani's memory — **read before any browser automation**
- Parallel AI + Browser Use MCP (cloud) — research done, not yet set up (see `memory/2026-02-23-parallel-browseruse-mcp.md`)
