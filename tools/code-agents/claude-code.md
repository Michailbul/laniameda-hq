# Claude Code

**Category:** code-agents  
**Status:** ✅ Active  
**Link:** https://docs.anthropic.com/

## What It Does
Agentic coding assistant by Anthropic — reads/writes/runs code autonomously inside a repo.

## What Works Well
- Multi-agent spawning (parallel sub-agents as of 2026)
- Hooks support: auto-format/lint pre/post edit
- Auto-memory across sessions
- Code review via OpenClaw webhook integration
- Works directly from OpenClaw (no separate install needed)

## Limitations / Gotchas
- Requires clear AGENTS.md in each repo for best results
- Long-running tasks should use sub-agents (push-based completion)
- Always append code-review webhook to prompts so Lani reviews output

## How We Use It

Spawned via the `coding-agent` skill. After any coding task, trigger code review:

```bash
curl -s -X POST http://localhost:18789/hooks/agent \
  -H "Authorization: Bearer 5abb8769be8c54302fbbbcb0db0b07d5d9955ae37f4dd0cc" \
  -H "Content-Type: application/json" \
  -d '{"message": "Code review: check git diff HEAD~1 in /path/to/dir.", "deliver": true, "channel": "telegram"}'
```

## Env Requirements
Anthropic API key (set in OpenClaw config)
