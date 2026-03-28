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
