# YouTube Watcher

**Category:** content  
**Status:** ✅ Active

## What It Does
Fetches and reads transcripts from YouTube videos for summarization, Q&A, and content extraction.

## How We Use It

```bash
python3 ~/.openclaw/skills/youtube-watcher/scripts/get_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"
```

Requires: `yt-dlp` installed.

## Use Case
Drop a YouTube URL → auto-run youtube-kb skill → distill to KB atom in `~/work/knowledge-base/sources/`.

## Skill Location
`~/.openclaw/workspace/skills/youtube-watcher/SKILL.md`
