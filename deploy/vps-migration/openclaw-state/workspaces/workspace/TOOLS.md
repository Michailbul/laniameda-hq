# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## OpenClaw Webhook (Code Review Hook)

Gateway: `http://localhost:18789`
Hook token: `5abb8769be8c54302fbbbcb0db0b07d5d9955ae37f4dd0cc`

**Always append this to Codex/Claude Code prompts** so I review the work when they finish:

```bash
# At the end of every coding agent task prompt:
When completely finished with all changes, run this command to trigger a code review:
curl -s -X POST http://localhost:18789/hooks/agent \
  -H "Authorization: Bearer 5abb8769be8c54302fbbbcb0db0b07d5d9955ae37f4dd0cc" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Code review request: the coding agent just finished work in $(pwd). Please: 1) read the recent git diff (git diff HEAD~1 or git log -1 -p), 2) check for correctness, missing edge cases, bugs, or anything suspicious, 3) summarize findings concisely with pass/fail verdict.\", \"deliver\": true, \"channel\": \"telegram\"}"
```

Or a simpler static version (replace /path/to/dir):
```bash
curl -s -X POST http://localhost:18789/hooks/agent \
  -H "Authorization: Bearer 5abb8769be8c54302fbbbcb0db0b07d5d9955ae37f4dd0cc" \
  -H "Content-Type: application/json" \
  -d '{"message": "Code review: check git diff HEAD~1 in /path/to/dir. Summarize what changed and flag any issues.", "deliver": true, "channel": "telegram"}'
```

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 🎙 Audio Transcription

**Use: Deepgram** (never local Whisper)
- API key: needs `DEEPGRAM_API_KEY` in `.env`
- Skill: to be built at `~/.openclaw/workspace/skills/deepgram/SKILL.md`

---

## 🤖 Codex CLI

**Install:** global npm package `@openai/codex`
- Binary: `/usr/bin/codex`
- Current verified version: `0.125.0`
- Config dir: `~/.codex/`
- Config file: `~/.codex/config.toml`
- Auth cache: `~/.codex/auth.json`

**Current VPS state:**
- Codex CLI is installed globally on the VPS
- Current auth status: `codex login status` → logged in with **ChatGPT**
- This is valid OpenAI auth for interactive Codex use

**Official docs:**
- Auth: `https://developers.openai.com/codex/auth`
- Product docs: `https://developers.openai.com/codex`

**Useful commands:**
```bash
codex
codex --version
codex login status
codex exec "explain this repo"
codex review
codex resume --last
```

**Switch to API-key auth (usage-based OpenAI Platform billing):**
```bash
printenv OPENAI_API_KEY | codex login --with-api-key
codex login status
```

**If `OPENAI_API_KEY` is not set yet:**
- add it to `/root/.openclaw/.env`
- restart gateway/shell environment if needed
- then run the login command above

**Headless / remote auth options from OpenAI docs:**
- `codex login --device-auth` for device-code login
- or copy `~/.codex/auth.json` from a machine that already completed login

**Security note:**
- Treat `~/.codex/auth.json` like a password
- Never paste or commit it
