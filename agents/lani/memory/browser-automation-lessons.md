# Browser Automation — Lessons Learned
**Session:** 2026-02-23 | Hard-won through a full day of debugging

---

## 1. The Setup That Actually Works

### What's installed and where
```
Playwright headless shell → ~/Library/Caches/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-mac-arm64/chrome-headless-shell
Full Chromium (headed)   → ~/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/...
Playwright Python        → ~/.local/share/uv/tools/browser-use/bin/python
browser-use CLI          → ~/.local/bin/browser-use (uv tool)
ocscreenshot wrapper     → ~/.local/bin/ocscreenshot
screenshot.py            → ~/workspace/screenshot.py
```

### Two tools, two use cases
| Tool | Use case | Command |
|---|---|---|
| `ocscreenshot` | Quick URL screenshots (headless, fast) | `ocscreenshot <url> out.png --wait 8` |
| `scrape_*.py` scripts | Authenticated/JS-heavy scraping | `~/.local/share/uv/tools/browser-use/bin/python scrape_x.py` |

---

## 2. Critical Bugs Fixed (Don't Undo These)

### browser-use sessions.py patch
**File:** `~/.local/share/uv/tools/browser-use/lib/python3.14/site-packages/browser_use/skill_cli/sessions.py`

**Problem:** `--browser chromium` mode called `_find_installed_browser_path()` which uses outdated glob patterns like `chromium-*/chrome-mac/Chromium.app` — these don't match macOS arm64 paths (`chrome-mac-arm64/Google Chrome for Testing.app`). When no match is found, it falls back to `uvx playwright install chrome` which takes 60+ seconds and always fails the 30s timeout.

**Fix applied:** Patched the `if mode == 'chromium':` block in `create_browser_session()` to:
- **Headless mode** → use headless shell directly
- **Headed mode** → use full Chromium directly
- Never hits the broken glob/uvx fallback

**⚠️ If you upgrade browser-use, re-apply this patch.**

---

## 3. Headless Shell vs Full Chrome — Know the Difference

| Binary | Headed mode | Headless mode | Site detection | CDP |
|---|---|---|---|---|
| `chrome-headless-shell` | ❌ No UI | ✅ Fast, stable | Detects some sites | ✅ |
| `Google Chrome for Testing` | ✅ Full UI | ✅ with `--headless=new` | Less detectable | ✅ |

**Rule:** 
- `headless=True` → use headless shell (faster, lighter)
- `headless=False` → use full Chrome for Testing
- Site blocks headless shell? → use full Chrome with `args=["--headless=new"]`

---

## 4. PLAYWRIGHT_BROWSERS_PATH — Don't Set It

**Problem:** Setting `PLAYWRIGHT_BROWSERS_PATH=$HOME/.playwright-browsers` redirects ALL of Playwright's browser lookups away from `~/Library/Caches/ms-playwright/` where everything is actually installed.

**Rule:** Never export `PLAYWRIGHT_BROWSERS_PATH` unless you explicitly want a different install location. The default (`~/Library/Caches/ms-playwright/`) is correct.

---

## 5. Site-Specific Lessons

### X (Twitter)
- Login via headed browser was blocked (X detects automation on login flow)
- Best path: Parallel AI + Browser Use MCP (cloud profile with saved login) — see `memory/2026-02-23-parallel-browseruse-mcp.md`
- Local alternative: twscrape (uses X GraphQL API with account cookies)

### Notion (public pages)
- Headless shell → images don't render (lazy load fails)
- Full Chrome `--headless=new` + `wait=8` → images render properly ✅
- `full_page=True` screenshot → breaks lazy image loading, use viewport only
- Works great with `ocscreenshot` — already confirmed

### Wonder Studios (app.wonderstudios.com)
- Cookies saved at: `workspace/wonderstudios_cookies.json` (19 cookies)
- Headless shell → site returns "unable to process request" (bot detection)
- Full Chrome `--headless=new` + `--disable-blink-features=AutomationControlled` → works ✅
- Messages are NOT in `[data-id]` elements (those are nav items)
- Extract via `page.inner_text("body")` + regex parsing on timestamps
- Only ~10-15 messages visible at once (lazy loaded), scroll with `page.keyboard.press("Home")` x10
- Jobs: use `div[class*='post']` selector → 126 raw items, ~13 unique posts after dedup
- Sections available: `/c/announcements/`, `/c/showcase/`, `/c/chat/`, `/c/events/`, `/c/jobs/`

### Discord
- Composio Discord MCP is useless for reading messages (only 6 tools, all profile-only)
- Bot API: needs server admin to invite
- Best option for channels you're a member of: Browser Use Cloud profile (saves login)
- Self-bot (discord.py-self): works but violates ToS

---

## 6. Common Failure Patterns & Fixes

| Error | Cause | Fix |
|---|---|---|
| `Cannot connect to host 127.0.0.1:PORT` | Browser launched but CDP never bound | Use headless shell or check args are compatible |
| `"Google Chrome for Testing quit unexpectedly"` | macOS crash dialog on full Chrome in headed mode | Was browser_executable_path pointing to full Chrome for CDP automation — fixed by patch |
| `Timeout 30s exceeded` | uvx playwright install chrome triggered | Re-apply sessions.py patch |
| Site shows "unable to process request" | Headless shell detected as bot | Switch to full Chrome + `--headless=new` |
| `Page.evaluate: TypeError` | `el.className.substring` on SVG element | Use `String(el.className).substring()` or `el.getAttribute('class')` |
| `wait_until="networkidle"` timeout | Notion/heavy SPAs never reach network idle | Use `wait_until="load"` + `asyncio.sleep(8)` instead |
| browser-use commands hang >30s in exec | OpenClaw exec session timeout | Run script directly via Python, not browser-use CLI for long ops |

---

## 7. The Right Python Invocation (Always Use This)

```bash
# Playwright scripts
~/.local/share/uv/tools/browser-use/bin/python your_script.py

# Quick screenshot
~/.local/bin/ocscreenshot "https://example.com" out.png --wait 8

# browser-use CLI (headless only, short commands)
browser-use --browser chromium open https://example.com
browser-use --browser chromium --headed open https://example.com  # headed
```

---

## 8. Template: Headless Scraper With Cookie Reuse

```python
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright

CHROME = str(Path.home() / "Library/Caches/ms-playwright/chromium-1208"
             "/chrome-mac-arm64/Google Chrome for Testing.app"
             "/Contents/MacOS/Google Chrome for Testing")
COOKIES_FILE = Path.home() / ".openclaw/workspace/site_cookies.json"

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path=CHROME,
            args=["--headless=new", "--disable-blink-features=AutomationControlled"]
        )
        ctx = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        # Load saved cookies
        if COOKIES_FILE.exists():
            await ctx.add_cookies(json.loads(COOKIES_FILE.read_text()))

        page = await ctx.new_page()
        await page.goto("https://target-site.com", wait_until="load", timeout=45000)
        await asyncio.sleep(6)

        # If not logged in → headed login flow then save cookies
        # ... (login logic) ...
        cookies = await ctx.cookies()
        COOKIES_FILE.write_text(json.dumps(cookies, indent=2))

        # Extract
        body = await page.inner_text("body")
        await browser.close()

asyncio.run(run())
```

---

## 9. No Chrome Installed — Arc Is Not a Substitute (Mostly)

- Arc is Chromium-based but `browser-use --browser real` requires Google Chrome specifically
- Arc's cookies ARE accessible at `~/Library/Application Support/Arc/User Data/Default/Cookies` but encrypted with macOS Keychain
- For sites where Michael is already logged in via Arc: use headed login in Chrome for Testing once → save cookies → reuse headlessly
- OpenClaw browser tool requires Chrome installed — won't work on this machine

---

## 10. Quick Reference: Saved Login Sessions

| Site | Cookie file | Notes |
|---|---|---|
| Wonder Studios | `workspace/wonderstudios_cookies.json` | 19 cookies, saved 2026-02-23 |
| X (Twitter) | Not saved | Login blocked in automation |
