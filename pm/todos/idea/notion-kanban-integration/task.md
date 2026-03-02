# Notion Kanban Integration

**Status:** Idea  
**Owner:** Lani  
**Created:** 2026-03-01  
**Updated:** 2026-03-01  
**Priority:** Medium

---

## What
Wire agents to a Notion kanban board so Michael can see all studio tasks at a glance. Agents update task files → Notion reflects current status.

## Why
File-based PM is great for agents but not human-friendly for a quick overview. Notion gives Michael a visual board without breaking the agent-native file system.

## Definition of Done
- [ ] Michael creates Notion integration + shares API key
- [ ] Notion skill enabled in OpenClaw config
- [ ] Kanban database created in Notion (Idea/Research/In Progress/Review/Done)
- [ ] Sync script: reads laniameda-hq/pm/backlog.md → updates Notion
- [ ] Agents update task.md → cron syncs to Notion every hour
- [ ] Test end-to-end: create task in file, appears in Notion board

## Notes
- Notion skill is bundled in OpenClaw — just needs NOTION_API_KEY
- Sync direction: files → Notion (files are source of truth)
- API version: 2025-09-03 (databases now called "data sources")
- Blocked on: Michael getting Notion API key
