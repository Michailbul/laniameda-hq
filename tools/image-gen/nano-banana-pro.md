# Nano Banana Pro (Gemini 3 Pro Image)

**Category:** image-gen  
**Status:** ✅ Active  
**Link:** https://ai.google.dev/

## What It Does
AI image generation and editing via Google's Gemini 3 Pro Image API — text-to-image and image-to-image.

## What Works Well
- Supports 1K/2K/4K resolution (draft → iterate → 4K final workflow)
- Image editing with `--input-image` — pass an existing image and editing instructions
- Solid quality for creative/cinematic prompts
- Fast draft loop at 1K before committing to 4K

## Limitations / Gotchas
- Always run from the user's CWD (not the skill directory) so images save in the right place
- Don't burn 4K until the prompt is locked — iterate at 1K first
- Nano Banana 2 (Gemini 3.1 suite) released March 2026 — worth evaluating when available

## How We Use It

```bash
# Draft (iterate here first)
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "your image description" \
  --filename "YYYY-MM-DD-HH-MM-SS-name.png" \
  --resolution 1K

# Final (4K only when prompt is locked)
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "your image description" \
  --filename "YYYY-MM-DD-HH-MM-SS-name.png" \
  --resolution 4K

# Edit existing image
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "editing instructions" \
  --filename "output-name.png" \
  --input-image "path/to/input.png" \
  --resolution 1K
```

## Skill Location
`~/.openclaw/workspace/skills/nano-banana-pro/SKILL.md`  
Script: `~/.codex/skills/nano-banana-pro/scripts/generate_image.py`

## Env Requirements
Google API key (configured in OpenClaw env)
