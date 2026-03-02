# Playwright

**Category:** automation  
**Status:** ✅ Active  
**Link:** https://playwright.dev/

## What It Does
Programmatic browser automation library — underlying engine for browser-use and direct scraping scripts.

## What Works Well
- Solid for authenticated scraping when given the right browser binary
- Full Chrome `--headless=new` + `--disable-blink-features=AutomationControlled` beats detection
- Wonder Studios cookies saved and working

## Limitations / Gotchas
- Must use correct browser binary paths (see browser-use lessons)
- Never set `PLAYWRIGHT_BROWSERS_PATH`
- Use viewport screenshots, not full_page (breaks lazy loading)

## How We Use It
Indirectly via browser-use CLI and direct Python scripts in `~/workspace/`.
