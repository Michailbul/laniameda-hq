# Lead Sources — Recurrent Checks

Sites to scrape regularly for freelance leads, artist opportunities, and collaborators.
Scripts live in `~/workspace/`. Cookies saved per-site.

---

## Active Sources

### Wonder Studios — Jobs Board
- **URL:** https://app.wonderstudios.com/c/jobs/
- **Type:** AI creative community — freelance, full-time, collab requests
- **Frequency:** Daily or every 2 days
- **Script:** `workspace/scrape_wonderstudios.py`
- **Cookies:** `workspace/wonderstudios_cookies.json` ✅ saved
- **Notes:** Use full Chrome + `--headless=new`. Posts don't auto-expire. ~16 unique posts visible per load. Scroll to see older ones.
- **Also check:** `/c/chat/`, `/c/announcements/`, `/c/showcase/`
- **Added:** 2026-02-23

#### Direct Post Links (as of 2026-02-23)
| Post | Link |
|---|---|
| 🎬 Looking for AI Animation Expert | https://app.wonderstudios.com/c/jobs/looking-for-ai-animation-expert |
| 🎬 AI Animation Job — K-POP | https://app.wonderstudios.com/c/jobs/ai-animation-job-k-pop |
| 🎬 AI Artist for Animation Project | https://app.wonderstudios.com/c/jobs/ai-artist-for-animation-project |
| 🎬 Social Video Editor @ Wonder Studios | https://app.wonderstudios.com/c/jobs/social-video-editor-at-wonder-studios |
| 🎬 Project — Demo Film for Event | https://app.wonderstudios.com/c/jobs/project-demo-film-for-event |
| 💼 Creative Director — Dazed Studio | https://app.wonderstudios.com/c/jobs/creative-director-dazed-studio-north-america-remote-or-nyc |
| 💼 Product Manager Co-Founder | https://app.wonderstudios.com/c/jobs/product-manager-co-founder |
| 💼 Google — 12 Creative Roles | https://app.wonderstudios.com/c/jobs/12-global-creative-roles-from-google |
| 💼 YouTube — Exec Comms Manager | https://app.wonderstudios.com/c/jobs/youtube-is-looking-for-an-executive-communications-manager |
| 💼 Apple — Owned Social Strategist | https://app.wonderstudios.com/c/jobs/apple-is-seeking-an-owned-social-strategist |
| 💼 Sesame Street — Sr Social Media Mgr | https://app.wonderstudios.com/c/jobs/sesame-street-is-hiring-senior-manager-of-social-media |
| 📰 TIME — Senior AI Correspondent | https://app.wonderstudios.com/c/jobs/time-is-seeking-a-senior-correspondent-to-cover-ai |
| 🏆 Global Production Awards @ Cannes | https://app.wonderstudios.com/c/jobs/the-global-production-awards-2026-at-cannes-film-festival |
| 🏆 TIME Best Inventions Competition | https://app.wonderstudios.com/c/jobs/time-best-inventions-competition |
| 🏆 L'Oréal Brandstorm | https://app.wonderstudios.com/c/jobs/l-oreal-brandstorm-innovation-competition |

---

## Potential Sources (Not Yet Set Up)

| Site | Type | Auth needed | Notes |
|---|---|---|---|
| X / Twitter feed | AI creator jobs, collab requests | ✅ (blocked locally) | Use Parallel + Browser Use MCP |
| Discord AI servers | Community job posts | ✅ | Browser Use Cloud profile or Bot API |
| LinkedIn Jobs | Full-time/freelance | ✅ | Heavy anti-bot — Browser Use Cloud best bet |
| Contra.com | Freelance platform | Maybe | Public listings, worth testing |
| Polywork.com | Creator collabs | Maybe | Community-based |
| Superrare / Foundation | AI art commissions | No | Public |

---

## How to Run a Check

```bash
# Wonder Studios Jobs
~/.local/share/uv/tools/browser-use/bin/python ~/workspace/scrape_wonderstudios.py

# Quick screenshot of any page (for visual check)
~/.local/bin/ocscreenshot "https://app.wonderstudios.com/c/jobs/" /tmp/check.png --wait 6
```

---

## Responding to Posts

### Wonder Studios
- Individual post URLs follow pattern: `https://app.wonderstudios.com/c/jobs/POSTID`
- To respond: open the post URL in Arc browser (already logged in) and reply in the thread
- Or: use browser-use headed mode to open the post and interact

---

## Notes
- Always check cookies haven't expired before headless runs
- If a site blocks the headless shell, switch to full Chrome + `--headless=new`
- See `memory/browser-automation-lessons.md` for full setup details
