# Verdict: How Matt Schlorff Uses OpenClaw All Day

**Verdict:** SKIP (main content) — but has transferable skills worth noting

**Why skip the main content:**
- Built for someone running a small team with clients, email pipelines, HubSpot CRM, sales workflows
- Heavy on team management, contact scoring, email triage — none of this is Michael's reality (solo founder, no sales pipeline)
- No coverage of browser control agents or design/asset automation
- Show-and-tell format, not a tutorial — describes what runs, not how to build it

**Transferable skills (second-order value):**

1. **LLM Router pattern** — single JS file that centralizes all model calls. Swapping models (e.g. Opus → GPT-5.2) is one config change, not a code rewrite. Directly applicable if Michael builds multi-model agent pipelines.

2. **JSONL knowledge base pattern** — stores everything in a local JSONL file, then queries it with Claude. Simple, queryable, no external DB needed. Could replace or complement the current KB markdown structure for high-volume data.

3. ~~Cron health council~~ — removed, not useful enough.

4. ~~Secret protection~~ — removed, not useful enough.

**Pillar match:** Pillar 1 (AI Agents & Automation)
**Novel to you:** No (main content) / Partially (transferable patterns)
