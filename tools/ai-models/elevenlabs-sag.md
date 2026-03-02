# ElevenLabs TTS (sag)

**Category:** ai-models  
**Status:** ✅ Active  
**Link:** https://sag.sh / https://elevenlabs.io/

## What It Does
Text-to-speech via ElevenLabs API with mac-style `say` UX — use for voice storytelling, summaries, and "storytime" moments.

## How We Use It

```bash
sag "Text to speak"
sag speak -v "Roger" "Hello"
sag voices                    # list available voices
sag prompting                 # model-specific tips
```

## Models
- Default: `eleven_v3` (expressive)
- Stable: `eleven_multilingual_v2`
- Fast: `eleven_flash_v2_5`

## Limitations / Gotchas
- Pronunciation: respell tricky words, add hyphens, adjust casing
- Numbers/URLs: `--normalize auto` (or `off` to preserve names)
- Language bias: `--lang en|de|fr...` to guide normalization

## Env Requirements
`ELEVENLABS_API_KEY` (or `SAG_API_KEY`)

## Skill Location
`~/.openclaw/workspace/skills/sag/SKILL.md`
