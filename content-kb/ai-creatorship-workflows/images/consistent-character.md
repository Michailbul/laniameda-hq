# Consistent Character Across Images

> Generate a recognizable character (face, style, outfit) that stays consistent across multiple images or scenes.

## Best workflow right now

Not yet tested by studio.

Known approaches in the space (not validated):
- Midjourney: character reference (`--cref`) to maintain face/style
- Kling Elements 3.0: upload 3-8s reference video to lock character across video scenes
- Fine-tuning / LoRA training on a specific face or character (ComfyUI, Replicate)

## Tools

| Tool | Role | Status |
|---|---|---|
| Midjourney --cref | Character reference for consistent face/style | ❓ Unknown — not tested by studio |
| Kling Elements 3.0 | Video-level character locking | ❓ Known to exist (from model research), not tested |
| ComfyUI + LoRA | Fine-tuned character consistency | ❓ Unknown — not tested by studio |

## Prompt examples

Not yet documented.

## What works
- Not yet tested by studio

## What doesn't work / gotchas
- Not yet tested by studio

## Last updated
2026-03-02

## Sources / references
- `~/.openclaw/workspace/MEMORY.md` — Kling 3.0 Elements feature noted
