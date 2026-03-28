# TOOLS.md - Persey's Tool Notes

## Repos / Project Paths

- `/root/michael/prompt-storage/` — prompt vault / storage system
- `/root/michael/ai-creator-os/` — AI Creator OS
- `/root/michael/laniameda/runmusic/` — RunMusic
- `/root/michael/laniamedia/` — personal website + portfolio
- `/root/michael/laniameda/image-stitch/` — ImageStage (image stitch / combine images)
- `/root/michael/lania-marketing/` — marketing production system
- `/root/michael/` — main work directory

## Key Context Files

| File | What's in it |
|---|---|
| `~/.openclaw/workspace-persey/USER.md` | Michael's profile |
| `~/.openclaw/workspace-persey/MEMORY.md` | Long-term memory |
| `/root/michael/laniameda/` | Personal website + portfolio repo |

## Coding Agent

Use the `coding-agent` skill to delegate complex coding tasks to Codex.
Always run in the correct project directory.

## GitHub

Use `gh` CLI for PRs, issues, CI status. See `github` skill.

## Web Research

Use `parallel-web-search` for any lookup or research.
Use `parallel-web-extract` for fetching URLs.

## Claude Code
Run as `michael` user to bypass root restriction:
```bash
su michael -c "cd /root/michael/runmusic && claude --dangerously-skip-permissions 'your task'"
```
Or background:
```bash
su michael -c "cd /root/michael/runmusic && claude --dangerously-skip-permissions -p 'your task'" &
```

- `agent-hub-web` — `/root/michael/agent-hub-web/`
