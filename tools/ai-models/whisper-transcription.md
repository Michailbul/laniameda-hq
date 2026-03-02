# Whisper (Local Transcription)

**Category:** ai-models  
**Status:** ✅ Active  
**Link:** https://github.com/openai/whisper

## What It Does
Local offline speech-to-text transcription for audio files and voice messages.

## How We Use It

```bash
~/.openclaw/whisper/bin/transcribe.sh <audio_file>
```

Model: `~/.openclaw/whisper/models/ggml-base.en.bin` (base English model, local)

## Notes
- Fully offline — no API key needed
- Also: `openai-whisper-api` skill available for cloud-based transcription
