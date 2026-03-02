# Browser Automation — Autonomous VPS

**Status:** In Progress  
**Owner:** Lani  
**Created:** 2026-02-28  
**Updated:** 2026-03-01  
**Priority:** High

---

## What
Set up fully autonomous browser automation on the VPS so agents can browse websites, scrape Instagram, and extract content without any manual intervention or Mac dependency.

## Why
The Chrome extension relay requires a human to click — defeats the purpose of autonomous agents. We need a headless, always-on browser the agent can use in cron jobs and on-demand.

## Definition of Done
- [x] Google Chrome stable installed on VPS (.deb, not snap)
- [x] OpenClaw browser configured: headless, noSandbox, openclaw profile
- [x] Browser tested — screenshot of example.com confirmed working
- [ ] Instagram session cookies injected (persistent auth)
- [ ] Camoufox installed for anti-bot stealth
- [ ] End-to-end test: agent browses Instagram profile autonomously
- [ ] Cron job example wired up using browser tool

## Notes
- Snap Chromium = broken (AppArmor). Always use .deb Chrome on VPS.
- CDP port: 18800. Browser user-data: ~/.openclaw/browser/openclaw/user-data
- Relay profile (`chrome`) requires human click — wrong tool for VPS
- `openclaw` managed profile = correct, autonomous, no extension needed
- Browserbase is the cloud fallback if Instagram blocks headless

## Research
See `research/` subfolder.
