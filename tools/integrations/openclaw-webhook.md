# OpenClaw Webhook (Agent Hook)

**Category:** integrations  
**Status:** ✅ Active

## What It Does
Internal webhook that delivers messages to Lani (Telegram) from coding agents, sub-agents, and automation scripts.

## How We Use It

```bash
curl -s -X POST http://localhost:18789/hooks/agent \
  -H "Authorization: Bearer 5abb8769be8c54302fbbbcb0db0b07d5d9955ae37f4dd0cc" \
  -H "Content-Type: application/json" \
  -d '{"message": "Your message here", "deliver": true, "channel": "telegram"}'
```

**Standard use:** Append to every Codex/Claude Code prompt so agents auto-report when done (code review flow).

## Gateway
`http://localhost:18789`  
Token: stored in `TOOLS.md` across all workspaces
