# Juice — Claude Code Remote Control + Co.Work Scheduling
_Distilled: 2026-02-26_

---

## Do Now

### Co.Work Scheduled Tasks — the workflow pattern that matters

The actual architecture from the demo:

```
Trigger: "Every morning at 8am"
  → Claude scans specified sources (web, GitHub, YouTube)
  → Summarizes top 3-5 AI releases / model launches
  → Pulls trending GitHub repos
  → Generates 5 YouTube/post ideas based on what's trending
  → Outputs a structured markdown report
  → Delivers autonomously, no human input needed
```

**Why it's extractable:** This is a *native* cron + browser agent + structured output pattern — no Make, no Zapier, no external scheduler. Just a natural language instruction + model choice + schedule.

**Key insight:** You can specify *exactly* which sources to scan. Not just "the web" — your YouTube channel, specific newsletters, specific subreddits, specific X accounts. That's the lever.

**Model note:** Demo used Sonnet 4.6 specifically because it performs better on browser-based tasks. Not default. Intentional choice.

---

### Claude Code Remote Control

- Start a Claude Code session in terminal → continue managing it from your phone via Claude app
- Local environment stays running (MCP servers, file system, everything)
- Access: `/remote-control` command in Claude Code terminal
- Status: Mac only, research preview — rolling out to all Claude Code users soon
- Practical use: kick off a long coding task → step away → check in / steer from phone

**For you specifically:** If you're running Claude Code for carousel generation or content pipeline tasks, you no longer need to babysit your laptop. Start it, walk away.

---

## Try Soon

### Adapt the Co.Work pattern to your content pipeline

The morning briefing workflow is directly mappable to a **daily content input feed**:

```
Every morning at 8am:
  → Scan: top AI tool drops (ProductHunt, HackerNews, r/StableDiffusion, specific X accounts)
  → Scan: new model releases (Hugging Face trending, Midjourney announcements)
  → Output: structured markdown with 3-5 ideas, tagged by pillar
  → Drop into ~/work/lania-marketing/content/ideas/YYYY-MM-DD.md
```

This is the "content input automation" chunk of your pipeline — the part that currently requires you to manually curate. [MARKETING-READY — this workflow itself is a post: "How I automated my daily content research with one Claude instruction"]

---

## Worth Knowing

### Competitive context (don't overthink it)

Co.Work scheduling + remote control = Anthropic building OpenClaw-style capabilities natively into Claude. The trend is clear: every major lab is converging on agent OS features. OpenClaw's moat is open source + local + composability. Co.Work's moat is zero setup for paid users. Different audiences, both useful.

---

**Word count:** ~430
