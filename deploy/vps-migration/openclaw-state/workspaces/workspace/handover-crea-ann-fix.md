# Handover: Fix Crea + Ann Telegram Routing
**Date:** 2026-03-30  
**Written by:** Lani  
**For:** Next agent picking this up

---

## What's Broken

1. **Crea not responding in topic 237** (AI Creatorship topic, group `-1003718448183`)
2. **Ann not confirmed responding in topic 564**

---

## What Happened (Root Cause)

1. On 2026-03-29, I tried to add `vargai` to Crea's skills using `sed` on `openclaw.json` — this corrupted the JSON (invalid character at line 1026)
2. The corrupt config blocked every gateway reload. Gateway kept running on the **old pre-corruption config** in memory
3. Additionally, the config had plugin entries (`bluebubbles`, `discord`, etc.) that require OpenClaw `>=2026.3.28` but the host was on `2026.3.24` — also blocking reloads
4. OpenClaw was updated to `2026.3.28` at ~13:27 on 2026-03-30 and gateway restarted clean

---

## Current State

- ✅ OpenClaw updated to `2026.3.28`
- ✅ Gateway running (RPC probe ok, Composio connected)
- ✅ JSON is valid (verified with `python3 json.load`)
- ✅ Crea's skills list includes `vargai`
- ✅ Ann binding exists: `accountId: ann` → `agentId: ann`
- ⚠️ **Unconfirmed:** Crea and Ann actually responding to messages — Michael says Crea still not answering as of 13:12

---

## Config State (openclaw.json)

**Crea agent wiring:**
- Agent id: `crea`
- Bot account: `accounts.crea` (token: `8683994602:AAEo...`)
- Topic 237 in `accounts.crea.groups[-1003718448183].topics.237`: `enabled: true, requireMention: false`
- Binding: `{ agentId: "crea", match: { channel: "telegram", accountId: "crea" } }`

**Ann agent wiring:**
- Agent id: `ann`
- Bot account: `accounts.ann` (token: `8660205581:AAEa...`)
- Topic 564 in `accounts.ann.groups[-1003718448183].topics.564`: `enabled: true, requireMention: false`
- Binding: `{ agentId: "ann", match: { channel: "telegram", accountId: "ann" } }`
- `dmPolicy: disabled` on ann account

---

## What to Check / Fix

### Step 1 — Verify config is valid
```bash
python3 -c "import json; json.load(open('/root/.openclaw/openclaw.json')); print('valid')"
```

### Step 2 — Verify gateway is running and loaded fresh config
```bash
openclaw gateway status
# Check RPC probe: ok
# Check Runtime: running
```

### Step 3 — Check today's logs for Crea activity
```bash
grep -i 'crea\|8683994602\|topic.*237\|237.*topic' /tmp/openclaw/openclaw-2026-03-30.log | tail -20
```
If no Telegram poll/message activity from the crea account → bot isn't polling.

### Step 4 — Test Crea bot token directly
```bash
curl -s "https://api.telegram.org/bot8683994602:AAEoMXctFIxZOWiI_U0RhotDmdFg-BpoUIc/getUpdates?limit=5"
```
If this returns updates but they're not being processed → routing issue.
If no updates → no one messaged Crea or polling is broken.

### Step 5 — Force gateway restart and watch logs live
```bash
openclaw gateway restart
tail -f /tmp/openclaw/openclaw-2026-03-30.log | grep -v 'edit failed'
```
Then send a message in topic 237 and watch if it appears in logs.

### Step 6 — If still broken, check Crea workspace
```bash
ls /root/.openclaw/workspace-crea/
cat /root/.openclaw/workspace-crea/AGENTS.md | head -50
```
Make sure workspace is intact.

---

## Known Good State Reference

When working, logs should show something like:
```
[telegram] received message from 278674008 in group -1003718448183 topic 237
[agent:crea] routing to agent crea
```

---

## Files

- Config: `/root/.openclaw/openclaw.json`
- Crea workspace: `/root/.openclaw/workspace-crea/`
- Ann workspace: `/root/.openclaw/workspace-ann/`
- Logs: `/tmp/openclaw/openclaw-2026-03-30.log`
- Agent dir (Crea): `/root/.openclaw/agents/crea/agent/`
- Agent dir (Ann): `/root/.openclaw/agents/ann/agent/`

---

## Notes

- The previous agent session had a tool malfunction (Edit/exec tools returning empty parameter errors for ~30 min) which caused the mess. That session is over.
- Don't use `sed` to edit `openclaw.json` — always use Python `json.load/dump` or the Edit tool with exact strings.
- After any config change, always verify with `python3 -c "import json; json.load(...)"` before restarting.
