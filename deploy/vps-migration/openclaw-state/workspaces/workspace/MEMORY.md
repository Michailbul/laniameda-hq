user is a founder of a pre seed ai native creative studio
Michael lives in Prague, Czech Republic. Timezone: Europe/Prague (CET/CEST).

## laniameda.gallery — AI Creatorship Vault (updated 2026-02)
Project renamed from `prompt-storager` → **laniameda.gallery**.
Repo: `/root/work/laniameda/laniameda.gallery` (app subdir: `app/`)
Skill renamed: `prompt-kb` → **laniameda-gallery-ingest** (at `~/.agents/skills/laniameda-gallery-ingest` + `~/.openclaw/skills/laniameda-gallery-ingest`)

**Four content pillars:**
1. **Creators** — AI influencer/fashion/portrait prompts
2. **Cars** — Cinematic automotive references and prompts
3. **Designs** — Website, UI, mobile, component designs
4. **Dump** — Catch-all for anything useful that doesn't fit above

**UI concept:** Top horizontal slider switches between pillars, filters gallery, optionally changes UI theme per pillar.
**Agent ingestion:** Lani auto-classifies and stores content into the right pillar.

**Strategic decision:** Phase 1 = personal vault only. Phase 2 = productize for other creators. Don't let Phase 2 complexity creep into Phase 1.
**PRD:** `todos/PRD-laniameda-gallery-v1.md`
**TODO #1:** Add model name tag — every image entry needs the model used tagged (Nano Banana Pro, CDANCe, Midjourney, FLUX, etc.)

## Content Engine Vision (2025-07-17)
Goal: build a content repurposing engine + grow socials across platforms.
Will use YouTube watcher + transcript extraction to pull relevant content into knowledge base.
Content pillars now include: AI creatorship, cinematic prompts, web/AI design, building in public, marketing-first, AI engineering.

## Parallel AI + Browser Use MCP (2026-02-23)
Full research saved at `memory/2026-02-23-parallel-browseruse-mcp.md`.
Stack: Parallel Task API (`ultra` processor) + Browser Use MCP server → AI agent that browses authenticated web (X feed, Discord, Notion) via saved login profiles. One API call, no local browser setup.
Needs: PARALLEL_API_KEY (platform.parallel.ai) + BROWSERUSE_API_KEY (browser-use.com cloud) + Browser Use profile with saved sessions.
Key header: `parallel-beta: mcp-server-2025-07-17`. MCP endpoint: `https://api.browser-use.com/mcp`.
Status: Research only — neither API key set up yet.

## Run + Music — AI Dynamic Theming (2026-02-25)
Spec: `/root/work/runmusic/docs/product/ai-dynamic-theming.md`
Research: `/root/work/runmusic/docs/product/generative-ui-feasibility.md`
Architecture: after `finishRun` → `ctx.scheduler.runAfter(0, internal.theme.generateFromRun)` → Agent 1 (Claude Sonnet 4.6 vision) generates `ThemePalette` structured output from album art → programmatic WCAG contrast check → Agent 2 reviewer loop (max 2 iter) → save to `userTheme` Convex table → on next app load `useQuery(api.userTheme.get)` → `BackgroundGradient` props-driven from Convex data.
Effort: ~1 day. Phase 2: screenshot visual QA via Playwright Vercel function.
Backlog items added to `docs/plan/todo.md` under "AI-Driven Dynamic Theming".

## Browser Automation Setup (2026-02-23)
Full lessons at `memory/browser-automation-lessons.md` — READ THIS BEFORE ANY BROWSER AUTOMATION.
Key facts: browser-use sessions.py patched (arm64 glob fix — re-patch after upgrades). Headless shell for headless, full Chrome for headed/anti-bot sites. Never set PLAYWRIGHT_BROWSERS_PATH. Wonder Studios cookies saved. X login blocked locally → use Parallel+BrowserUse MCP instead. ocscreenshot works for screenshots. Full Chrome + `--headless=new` + `--disable-blink-features=AutomationControlled` beats headless shell for authenticated sites.

## AI Model Landscape Update (2026-03-02)
**Video/image frontier:** LTX-2 (Lightricks, Jan 2026) = first open-weights audio+video model, native 4K, self-hostable — worth evaluating for RunMusic or gallery. Seedance 2.0 (ByteDance) = hyperrealistic video, Hollywood panic, signals Chinese AI at frontier level.
**Google:** Nano Banana 2 (Gemini 3.1 suite) = rapid image generation, just released March 2026.
**Meta:** Mango (image+video understanding) + Avocado (coding+reasoning) — coming H1 2026.
**Claude Code (2026):** Now supports parallel multi-agent spawning, hooks (auto-format/lint pre/post edit), auto-memory. Xcode 26.3 (Feb 2026) ships native Claude Agent + Codex integration.
**Telegram Mini Apps:** Ecosystem entering mature stage — quality-based competition, not hype growth. Good for RunMusic's positioning as focused product.
**Solopreneur AI stack:** Mainstream narrative now — "one founder + AI agents = full team." laniameda's multi-agent structure is ahead of the curve; strong content angle.

## Content Automation Pipeline (2026-02-23)
Full plan saved at `memory/2026-02-23-content-automation-plan.md`.
Two use cases: (1) marketing automation — scrape X/Discord → repurpose into posts/carousels, (2) prompt research — scrape AI image posts → feed ai-creator-os vault.
Stack: browser-use (--browser real) for scraping, Convex for storage, OpenClaw cron for automation, dedicated Telegram bot for delivery.
Repos: lania-marketing (marketing workflows), ai-creator-os (prompt vault + Convex).
Status: Chunk 1 in progress — browser-use installed, Playwright works, CLI startup issue to resolve. 
## Output Delivery Rules (non-negotiable)
- **Always send files via Telegram file upload** (message tool with filePath param). Never just tell Michael the path — he's on Telegram and can't access VPS paths directly.
- **Always send files/docs to Michael via Telegram** — don't just save locally and say "done". Save locally AND send.
- **One-shot task outputs** (PRDs, research docs, summaries for delegation) → always create a companion `todos/cleanup-<slug>.md` with a TODO to delete once handed off. Prevents workspace junk buildup.

## Workflow Preferences
- When Michael asks to watch/digest a YouTube video, use the `youtube-digest` skill by default. It uses Supadata under the hood and should be the first path, not ad-hoc YouTube scraping/fetching.
- When digesting a video, always deliver a **concise draft first** — key steps, tools, prompts, workflows only. No pricing, no filler. Full deep-dive only if explicitly asked.

## Env keys policy (2026-03-04)
- When Michael provides new API keys/env vars, store them in `/root/.openclaw/.env` so all agents/cron jobs inherit them.
- After updating, restart/reload the OpenClaw gateway/supervisor so changes take effect.

## laniameda — The Four Core Principles (Bible)
*Set by Michael, 2026-03-03. These are non-negotiable. Reference in all positioning, copy, agent instructions, and studio decisions.*

1. **Marketing First** — content angle on everything, always
2. **Begin with the end in mind** — know the outcome before starting
3. **Never settle for mediocrity** — quality is non-negotiable
4. **Approach everything as art** — craft, intention, emotional depth in all work

## Thought Vault
Michael dictates raw thoughts to Lani. These get saved and tagged for downstream repurposing.
Location: `~/work/laniameda/laniameda-hq/thoughts/`
Format: `YYYY-MM-DD-short-slug.md` — raw transcript + distillation + downstream angles.
Cloud: committed to laniameda-hq GitHub repo (always push after saving).
Rule: capture first, polish downstream. Never edit the raw thought.

## Agent Hub positioning reference (2026-03-09)
- Website to remember: https://skillcanvas.ai/
- Relevance: directly related to Agent Hub.
- Usage: can be referenced in marketing language and product positioning narratives.

## Marketing audience / positioning preference (2026-03-14)
- Default customer persona for studio/agent marketing: **creative brands** and **creative studios**.
- Do not default to highly technical runtime/infrastructure language in marketing.
- Frame messaging around **outcomes**, transformation, and what creative operators get from the system.
- Technical depth is allowed, but it should support the story, not lead it.
- Exception: when the topic itself is technical architecture (like OpenClaw runtimes vs sub-agents), technical explanation content is acceptable.

## Andromeda Galaxy App
A personal 3D galaxy visualization app — Michael's private life journal/dream vault.
Live at: https://www.mishabuloichyk.com (personal portfolio site, Andromeda section)
Repo: `/root/michael/portfolio-second`
Backend: Convex (realtime DB)

**5 Galaxies (sections):**
- Your Dreams (sagittarius)
- Your Partner (wormhole) — renamed "Your Soulmate"
- Your Family (carina)
- Your Life (andromeda)
- Your Antidreams (kepler)

**How to access/modify data:**
- Skill: `andromeda-messages` at `~/.agents/skills/andromeda-messages/SKILL.md`
- API: `https://www.mishabuloichyk.com/api/andromeda`
- Auth: `Bearer andromeda25`
- Always use the skill for live data — fetch fresh, don't rely on cached counts.
