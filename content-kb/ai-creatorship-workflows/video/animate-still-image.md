# Singing / Performing Avatar from Photo

> Turn a single portrait photo + audio track into a full singing/performing video with emotional body language.

## Best workflow right now

### Approach A — Fast (Audio-Driven, One Pass)
AI generates the entire performance from photo + audio. No driver video needed.

1. **Prep your audio**
   - Use isolated vocals only (no instrumental) — dramatically improves accuracy
   - Clean WAV preferred over MP3
   - Avoid heavy reverb/effects
   - If using a song: use a vocal isolation tool or source a vocals-only track (Suno offers vocal downloads)

2. **Go to OpenArt → Lip-Sync**
   - Upload portrait + isolated vocals (test with 20–30s clip first)
   - Select model: **OmniHuman 1.5** (best full-body emotion + head movement)
   - Generate → evaluate emotion and movement quality

3. **If quality is good → done**
   - OmniHuman reads emotional tone from audio and generates full-body performance automatically

4. **For longer output or higher quality → Kling Avatar 2.0**
   - klingai.com → AI Human section
   - Upload portrait + vocals + text prompt describing the performance
   - Outputs up to 5 minutes, 1080p 48fps
   - Has multimodal director: reads emotional trajectory from audio, syncs with drum beats, generates shoulder/gesture/eye performance

---

### Approach B — Highest Quality (Two Pass: Motion Transfer + Lipsync)
You control the choreography via a reference video, then sync your audio on top.

**Step 1 — Motion Transfer**
- Find a calm, emotional singer reference video (any artist, similar energy to your song)
- OpenArt → Motion Sync OR Kling Motion Control 2.6
- Transfer body motion from reference video → your portrait character
- Result: your character performing the reference's exact gestures

**Step 2 — Lipsync your audio on top**
- **sync.so** — studio-grade, explicit singing support, used by major studios
- Upload the Step 1 video + your isolated vocal track → apply lipsync

## Tools

| Tool | Role | Status |
|---|---|---|
| OmniHuman 1.5 (via OpenArt) | Audio-driven full body singing performance | ✅ Confirmed available, workflow researched |
| Kling Avatar 2.0 | Audio-driven singing avatar, up to 5 min, 1080p 48fps | ✅ Confirmed available, workflow researched |
| OpenArt Lip-Sync | One-stop UI: OmniHuman + Kling + Hedra + Creatify | ✅ Confirmed feature exists |
| OpenArt Motion Sync | Motion transfer from reference video | ✅ Confirmed feature exists |
| Kling Motion Control 2.6 | Motion transfer from reference video | ✅ Confirmed feature exists |
| sync.so | Studio-grade lipsync on existing video, explicit singing support | ✅ Confirmed, not personally tested |
| Hedra | Free tier avatar, solid for talking | 🧪 Try this |
| HeyGen Avatar | Custom motion prompt ("singing" cues), 2:1 credit cost for custom motion | 🧪 Researched |
| LatentSync 1.6 (ComfyUI) | Open-source lipsync on existing video | ❓ Confirmed exists, not tested by studio |
| ComfyUI_Sonic | Open-source singing-aware lipsync (global audio perception) | ❓ Confirmed exists, not tested by studio |
| Creatify Aurora | Lipsync model inside OpenArt | ❌ Tested, not good enough quality |

## Prompt examples

**Singing performance prompt (Kling Avatar 2.0):**
```
A young woman with long wavy dark brown hair and hazel eyes, wearing a dark grey hoodie, singing with deep emotional intensity on a rooftop overlooking a city under an overcast sky. She moves naturally in the frame — swaying slightly, tilting her head, brushing her hair back from one hand during a quiet moment. Her expression shifts through the song: vulnerable and introspective during verses, eyes slightly glassy, lips parting with raw feeling. On emotional peaks she closes her eyes, chin lifting, voice pushing through the chorus with urgency. She occasionally glances away from camera and back — like she's living the lyrics, not performing them. Cinematic handheld feel, shallow depth of field, muted warm tones.
```

**Portrait generation for singing avatar:**
```
front-facing photo of a confident young woman, soft natural lighting, professional photography style, looking directly at camera, plain background, neutral-to-slight-smile expression
```

## What works
- OmniHuman 1.5 reads emotional tone from audio and drives full-body movement automatically
- Isolated vocals (no instrumental) dramatically improve lipsync accuracy
- Kling Avatar 2.0 is purpose-built for singing — multimodal director reads audio emotional trajectory
- Kling product family has 3 distinct products — don't confuse them (see gotchas)
- OpenArt UI aggregates multiple models — good for quick A/B testing across Kling/OmniHuman/Hedra

## What doesn't work / gotchas
- **Never use for singing:** Runway, standard Kling i2v (Kling 3.0), standard Hailuo — built for speech/general video, fail at singing
- Creatify Aurora — tested by studio, not good enough quality
- Kling product confusion: Avatar 2.0 = singing tool | Motion Control 2.6 = pose transfer | Kling 3.0 = general video (wrong tool)
- OpenArt UI labels change — "Singing Video" is now called **Lip-Sync** tab; Motion Sync is a separate tab
- Instrument playing (hands on guitar etc.) is NOT accurate in any model — portrait-only singing avoids this
- OmniHuman clips are ~15s — need stitching for full song
- Energy mismatch in Motion Control: if reference performer is too energetic, your avatar inherits it and looks jittery

## Last updated
2026-03-02

## Sources / references
- `~/.openclaw/workspace/memory/2026-02-28-ai-singing-avatars.md` ← full research session
- `~/.openclaw/workspace/memory/2026-02-28-omni-human-examples.md`
- Comparison video: https://www.youtube.com/watch?v=foZvnCpIrYg (OmniHuman 1.5 vs Kling Avatar 2.0 vs Kling Motion Control)
- OmniHuman official demo: https://www.youtube.com/watch?v=XF5vOR7Bpzs
