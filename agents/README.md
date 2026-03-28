# laniameda — Agent Identity Bundles

This folder is the **canonical source of truth** for all laniameda studio agent identities.

Each subfolder = one agent. Contains everything needed to **reborn the agent** on any platform (OpenClaw, Claude.ai Projects, Cursor, Codex, etc.).

---

## Agents

| Agent | Role | Folder |
|-------|------|--------|
| **Lani** | Chief of Staff / Studio Brain | `lani/` |
| **Meda** | CMO / Marketing & Content | `meda/` |
| **Persey** | CTO / Engineering | `persey/` |
| **Desi** | Lead Designer / UI-UX | `desi/` |
| **Crea** | Creative Director / AI Art | `crea/` |
| **Ann** | Personal / Philosophical Companion | `ann/` |
| **PM** | Project Manager | `pm/` |

---

## File Structure (per agent)

```
<agent>/
  IDENTITY.md     ← name, role, vibe, avatar
  SOUL.md         ← personality, values, tone, output style
  AGENTS.md       ← runtime environment, tools, skills, lessons learned
  MISSION.md      ← why the agent exists, goals, success criteria
  MEMORY.md       ← long-term curated memory (key decisions, context)
  TOOLS.md        ← local notes: API keys refs, devices, shortcuts
  HEARTBEAT.md    ← proactive check-in instructions
  USER.md         ← who they're helping (Michael's profile)
  memory/         ← recent session notes (daily logs, 2026-03+)
```

---

## How to Reborn an Agent

1. Load `SOUL.md` + `IDENTITY.md` as the system prompt base
2. Add `AGENTS.md` for operational context and rules
3. Add `MISSION.md` for goals and role clarity
4. Load `MEMORY.md` for long-term context
5. Load recent `memory/` files for short-term context
6. Set `USER.md` as user context
7. Use `TOOLS.md` / `HEARTBEAT.md` as operational references

---

## Sync Protocol

These files are synced from the live OpenClaw VPS workspaces.

**Source paths (VPS):**
```
/root/.openclaw/workspace/          → lani/
/root/.openclaw/workspace-meda/     → meda/
/root/.openclaw/workspace-persey/   → persey/
/root/.openclaw/workspace-desi/     → desi/
/root/.openclaw/workspace-crea/     → crea/
/root/.openclaw/workspace-ann/      → ann/
/root/.openclaw/workspace-pm/       → pm/
```

**To sync manually (run on VPS):**
```bash
cd ~/work/laniameda/laniameda-hq
# Copy core files for each agent, then commit + push
```

Agents are responsible for keeping their own files current. Lani orchestrates cross-agent syncs.

---

_Last synced: 2026-03-28 | Synced by: Lani_
