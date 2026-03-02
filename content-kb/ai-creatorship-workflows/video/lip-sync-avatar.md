# Lip Sync / Talking Avatar from Photo

> Turn a single portrait photo + script into a realistic talking video — no camera required.

## Best workflow right now

1. **Generate or source your base portrait**
   - Use OpenArt photorealistic model (or any front-facing portrait)
   - Prompt structure: front-facing or slight 3/4 view, neutral expression, soft natural lighting, plain background
   - Enable autoenhance in OpenArt before generating
   - Set resolution to widescreen (more horizontal space for animation)
   - ⚠️ Side profiles break lip sync — avoid them

2. **Go to HeyGen → Photo-to-Video**
   - Upload portrait → select voice (filter by language/accent/gender)
   - Or connect your ElevenLabs cloned voice directly
   - Paste your script → set 1080p output

3. **Add custom motion prompt (critical)**
   - Add: *"The person looking natural throughout the video, not showing a lot of teeth and not showing hands at all"*
   - This prevents overexpressive, uncanny avatar behavior

4. **Generate → Download**
   - 1–2 minutes for short scripts
   - Download or use HeyGen share link for client review

**Alternate one-stop path:** OpenArt → Lip-Sync tab → choose model (OmniHuman 1.5, HeyGen, Hedra) → upload photo + audio → generate. All in one UI.

## Tools

| Tool | Role | Status |
|---|---|---|
| OpenArt | Photorealistic portrait generation | 🧪 Try this |
| HeyGen | Photo → talking avatar with custom motion | 🧪 Researched, workflow documented |
| ElevenLabs | Voice cloning — pipe your own voice into HeyGen | 🧪 Referenced, not personally tested |
| OpenArt Lip-Sync | All-in-one UI: OmniHuman 1.5 / Hedra / HeyGen / Creatify | 🧪 Confirmed feature exists |
| Hedra | Free tier lipsync, solid quality | ❓ Unknown — not tested by studio |

## Prompt examples

**Portrait generation prompt (OpenArt):**
```
front-facing photo of a confident young woman, soft natural lighting, professional photography style, looking directly at camera, plain background, neutral-to-slight-smile expression
```

**HeyGen custom motion prompt:**
```
The person looking natural throughout the video, not showing a lot of teeth and not showing hands at all
```

## What works
- OpenArt photorealistic model produces front-facing portraits suitable for lip sync
- HeyGen photo-to-video is reliable for speech/talking content
- Custom motion prompt in HeyGen suppresses overexpressive/uncanny behavior
- ElevenLabs voice integration works natively inside HeyGen
- OpenArt Lip-Sync tab aggregates multiple models — good for comparing quickly

## What doesn't work / gotchas
- Side profiles break lip sync — always use front-facing or slight 3/4 angle
- Harsh shadows / extreme expressions reduce animation quality
- HeyGen overexpressive default behavior without the custom motion prompt
- Instrument playing (hands) is not accurate in any current model — for portrait-only this doesn't matter
- Heavy reverb/effects on audio degrade lipsync accuracy

## Last updated
2026-03-02

## Sources / references
- `~/.openclaw/workspace/memory/2026-02-28-ai-singing-avatars.md`
- `~/work/laniameda/laniameda-hq/knowledge-base/sources/youtube/2026-02-28-ai-avatars-lip-sync/juice.md`
