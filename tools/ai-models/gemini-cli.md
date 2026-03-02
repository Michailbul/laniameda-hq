# Gemini CLI

**Category:** ai-models  
**Status:** ✅ Active  
**Link:** https://ai.google.dev/

## What It Does
CLI for one-shot Q&A, summaries, and text generation via Google Gemini.

## How We Use It

```bash
gemini "Answer this question..."
gemini --model <name> "Prompt..."
gemini --output-format json "Return JSON"
```

## Limitations / Gotchas
- Run interactively once to authenticate (`gemini` — follow login flow)
- Avoid `--yolo` flag for safety
- Interactive mode not preferred — use one-shot positional prompt

## Skill Location
`~/.openclaw/workspace/skills/gemini/SKILL.md`
