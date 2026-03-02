# AI Portrait / Fashion Shots

> Generate photorealistic portrait or fashion images from text prompts — for avatars, content, or creative campaigns.

## Best workflow right now

Not yet fully tested by studio. Based on research:

1. **Pick your model** — photorealistic portrait generation varies significantly by model
   - OpenArt (photorealistic model) — referenced in lip sync research as a good source for front-facing portraits
   - Midjourney — well known for stylized portraits and fashion
   - Flux — referenced in studio model notes

2. **Write a structured prompt**
   - Describe: subject (age/look/expression) + lighting + camera/lens feel + background + style
   - For avatars: always front-facing or slight 3/4, neutral expression, plain background

3. **Enable upscaling / enhancement if available**
   - OpenArt has "autoenhance" toggle — use it before generating

## Tools

| Tool | Role | Status |
|---|---|---|
| OpenArt | Photorealistic portrait generation | 🧪 Referenced in studio research |
| Midjourney | Stylized portraits, fashion, --sref style codes | 🧪 Monitored, not personally tested |
| Flux | General image generation | ❓ Unknown — referenced in model notes |
| Nano Banana (Imagen 4) | Rapid image gen, just released March 2026 | ❓ Unknown — not tested by studio |

## Prompt examples

**Front-facing avatar portrait (OpenArt):**
```
front-facing photo of a confident young woman, soft natural lighting, professional photography style, looking directly at camera, plain background, neutral-to-slight-smile expression
```

**Midjourney style code examples** (from community research):
- WIRED SOUL — dark painterly collage style: `--sref 3726459736`
- MOLTEN GLOW — warm golden tones, dreamy: `--sref 3675229544`
- PIXEL GRAIN — black & white, grainy film: `--sref 449884454`
- SUGAR RUSH — vibrant flat color, cartoonish/pop: `--sref 3925989607`

## What works
- OpenArt photorealistic model produces clean front-facing portraits suitable for lip sync downstream
- Midjourney --sref codes are a fast way to lock a consistent aesthetic style

## What doesn't work / gotchas
- Side profiles generated from any tool will break downstream lip sync workflows
- Extreme expressions reduce animation quality in video workflows
- Not yet tested by studio in a real production workflow — treat as starting points

## Last updated
2026-03-02

## Sources / references
- `~/work/laniameda/laniameda-hq/knowledge-base/sources/youtube/2026-02-28-ai-avatars-lip-sync/juice.md`
- `~/work/laniameda/laniameda-hq/knowledge-base/sources/instagram/0301-adelgamal001-unlock-styles/raw.md` (Midjourney --sref codes)
- `~/.openclaw/workspace/MEMORY.md` (model landscape)
