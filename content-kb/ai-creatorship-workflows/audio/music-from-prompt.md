# Music from Prompt

> Generate original music from a text description or style reference — for video content, background, or full tracks.

## Best workflow right now

Partially known. Suno is referenced in studio context specifically for generating vocal tracks for the singing avatar workflow.

1. **Go to Suno**
   - Write a style/mood description → generate track
   - For singing avatar use: download **vocals-only track** (Suno offers this)
   - Use isolated vocals in lip sync / singing avatar workflows (no instrumental mix)

## Tools

| Tool | Role | Status |
|---|---|---|
| Suno | AI music generation + vocals-only download | 🧪 Referenced in studio (vocals isolation for avatar workflow) |
| LTX-2 (Lightricks) | Open-weights audio+video model — can generate audio | ❓ Known to exist (Jan 2026), not tested for music |

## Prompt examples

Not yet documented from studio experience.

## What works
- Suno offers vocal-only track download — useful for feeding isolated vocals into singing avatar tools
- Isolated vocals (no instrumental) dramatically improve lipsync accuracy in avatar workflows

## What doesn't work / gotchas
- Not tested as a primary music creation workflow by studio
- Full mix (vocals + instrumental) degrades lipsync quality downstream — always use isolated vocals

## Last updated
2026-03-02

## Sources / references
- `~/.openclaw/workspace/memory/2026-02-28-ai-singing-avatars.md` — Suno referenced for vocal isolation
- `~/.openclaw/workspace/MEMORY.md` — LTX-2 noted in model landscape
