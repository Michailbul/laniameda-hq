# OpenClaw

**Category:** ai-models  
**Status:** ✅ Active  
**Link:** https://openclaw.dev/ (internal)

## What It Does
Agent runtime and orchestration platform — hosts Lani, Meda, Persey, Desi; manages skills, sessions, hooks, nodes, and multi-agent coordination.

## What Works Well
- Multi-agent architecture (4 agents: Lani, Meda, Persey, Desi — each with own workspace)
- Sub-agent spawning for parallel tasks (push-based completion)
- Skills system — markdown-based tool knowledge injection
- Heartbeat polling for proactive agent behavior
- Browser control (via `browser` tool, profile="chrome" for relay)
- Node system — connects Mac node for macOS-only tasks (AppleScript, Playwright, etc.)
- Hooks system for inter-agent communication

## Architecture
- **VPS:** `srv1439489` (82.25.85.143) — main runtime
- **Mac node:** Michael's MacBook Air — for macOS-only tasks
- **Gateway:** `http://localhost:18789`
- **Model:** `anthropic/claude-sonnet-4-6` (default)

## Agents
| Agent | Role | Workspace |
|-------|------|-----------|
| Lani | Chief of Staff / orchestrator | `~/.openclaw/workspace/` |
| Meda | CMO / marketing | `~/.openclaw/workspace-meda/` |
| Persey | CTO / engineering | `~/.openclaw/workspace-persey/` |
| Desi | Creative Director / design | `~/.openclaw/workspace-desi/` |

## Skills Installed
See `~/.openclaw/workspace/skills/` and `~/.openclaw/skills/` — 50+ skills across image gen, content, research, coding, PM, integrations.
