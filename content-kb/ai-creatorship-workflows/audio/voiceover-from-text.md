# Voiceover from Text

> Convert a script into a realistic AI voiceover — for videos, avatars, or content without being on mic.

## Best workflow right now

Partially known from studio context. ElevenLabs is referenced as the go-to voice tool.

1. **Write or prepare your script**
2. **Go to ElevenLabs**
   - Select a voice or use a cloned voice
   - Paste script → generate → download audio
3. **Use in downstream workflows**
   - Feed into HeyGen/OmniHuman for lip sync avatar (see `video/lip-sync-avatar.md`)
   - Or use as standalone voiceover in video edit

**ElevenLabs → HeyGen integration:** Native integration exists — you can pipe a cloned ElevenLabs voice directly into HeyGen without downloading/uploading.

## Tools

| Tool | Role | Status |
|---|---|---|
| ElevenLabs | Voice synthesis + voice cloning | 🧪 Referenced in studio, integration with HeyGen confirmed |
| HeyGen | Accepts ElevenLabs voice natively | 🧪 Referenced |

## Prompt examples

Not applicable — voiceover is script-driven, not prompt-driven.

## What works
- ElevenLabs → HeyGen native integration saves the audio roundtrip
- Voice cloning allows consistent brand voice across all video content

## What doesn't work / gotchas
- Not personally tested as a standalone workflow by studio
- Heavy reverb/effects on input audio degrades clone quality

## Last updated
2026-03-02

## Sources / references
- `~/work/laniameda/laniameda-hq/knowledge-base/sources/youtube/2026-02-28-ai-avatars-lip-sync/juice.md`
