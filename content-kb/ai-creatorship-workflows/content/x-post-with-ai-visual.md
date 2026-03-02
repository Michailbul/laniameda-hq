# X Post with AI Visual

> Write and publish an X (Twitter) post that pairs punchy copy with an AI-generated image or video.

## Best workflow right now

Partially documented. X automation has been researched but not fully set up.

**Workflow (based on studio knowledge):**

1. **Write the post copy** — in Michael's voice: blunt, direct, specific, first-person
   - Brand pillars: AI Creators / Code / Agents / GenAI / Building in Public
   - Post types: opinion, insight, workflow share, visual showcase
   - No filler. Specific > generic.

2. **Generate or source the AI visual**
   - Image: OpenArt / Midjourney (see `images/` workflows)
   - Video clip: relevant tool depending on use case (see `video/` workflows)

3. **Post**
   - Manual posting is the current state
   - X API automation: researched via Parallel + Browser Use MCP stack, not set up yet

## Tools

| Tool | Role | Status |
|---|---|---|
| Claude / AI writing | Copy drafting in your voice | ✅ Used in studio |
| OpenArt / Midjourney | AI visual generation | 🧪 Researched |
| X manual posting | Current posting method | ✅ Active |
| Parallel + Browser Use MCP | X automation via browser agent | ❓ Researched, API keys not set up |

## Prompt examples

**Copy prompt for X post (AI Creatorship angle):**
```
Write an X post in Michael's voice: blunt, first-person, AI creator building in public.
Topic: [TOPIC]
Tone: direct, no filler, specific experience over broad advice.
Include: a hook line, 3-5 punchy points, no hashtags.
Max 280 characters for the hook, rest as thread if needed.
```

## What works
- Short punchy hooks with specific numbers/observations outperform general statements
- Visual AI content (prompt + output) performs well for AI creator audience

## What doesn't work / gotchas
- X login is blocked for browser automation locally — use Parallel+BrowserUse MCP when ready
- X automation requires separate API key setup (platform.parallel.ai + browser-use.com)

## Last updated
2026-03-02

## Sources / references
- `~/.openclaw/workspace/MEMORY.md` — content automation plan, X automation research
- `~/.openclaw/workspace/memory/2026-02-23-content-automation-plan.md`
- `~/.openclaw/workspace/memory/2026-02-23-parallel-browseruse-mcp.md`
