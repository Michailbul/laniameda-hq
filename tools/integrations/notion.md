# Notion

**Category:** integrations  
**Status:** ✅ Active  
**Link:** https://notion.so/

## What It Does
Project management and knowledge base — visual kanban for Michael, synced from local files by agents.

## What Works Well
- API-based sync via `notion-sync` skill
- Tasks DB: `316e9215-3d4b-8145-b6c7-c468224f2391`
- Lani syncs PM tasks to Notion after every create/update
- Meda mirrors content pipeline tasks here

## Limitations / Gotchas
- Local files are ground truth — Notion is a display/mirror layer only
- API calls add latency — batch syncs where possible
- Local file ops are dramatically easier than Notion API

## How We Use It

```bash
python3 /root/.openclaw/workspace/skills/notion-sync/sync.py \
  --name "Task name" \
  --status "In Progress" \
  --agent "Lani" \
  --priority "High" \
  --department "Operations" \
  --area "Infrastructure" \
  --notes "What changed"
```

## Env Requirements
`NOTION_API_KEY` — set in `~/.openclaw/.env`  
`NOTION_TASKS_DB` — set in `~/.openclaw/.env`
