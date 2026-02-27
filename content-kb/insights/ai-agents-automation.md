# Insights: AI Agents & Automation
_Aggregated from processed videos, articles, and sources._
_See full source files in `../sources/`_

---

## LLM Router + JSONL KB patterns (2026-02-25, source: Matt Schlorff video)
- **LLM Router:** centralize all model calls in one JS file → swap models in one config change, not code rewrites. Build this early in any multi-model pipeline.
- **JSONL KB:** store structured data locally as JSONL, query with Claude. No external DB needed for moderate data volumes.

## Claude Code Remote Control + Co.Work Scheduled Tasks (2026-02-26)
- **Native cron pattern:** Co.Work now supports natural language scheduled tasks — no Make, no Zapier. "Every morning at 8am, scan X sources, output structured markdown." Runs autonomously, browser-capable, source-specific.
- **Model selection matters:** Sonnet 4.6 outperforms default on browser-based tasks. Always specify when scheduling browser agent work.
- **Remote control:** Claude Code sessions can now be managed from phone (Mac only, rolling out). Start a task at desk → step away → steer from phone. MCP servers keep running.
- **Pipeline implication:** the Co.Work morning briefing pattern maps directly to a daily content input feed — scan AI sources → structured ideas → drop into `content/ideas/`. This is the "input automation" chunk of the content pipeline.

## Genviral × OpenClaw Skill (2026-02-25)
- **Closed-loop architecture:** generate → post → analyze → agent self-adjusts based on real performance. This is the target design pattern for Michael's content pipeline.
- **Setup model:** single API key + install skill = fully autonomous social media operator. Proves OpenClaw skills can own an entire content lifecycle.
- **Gap to bridge:** Genviral uses templates/slideshows. Michael needs the same loop but with custom carousels + human approval gate before posting.
