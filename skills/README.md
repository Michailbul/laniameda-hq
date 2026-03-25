# Skills Registry — laniameda Studio

Skills are agent-operational workflow specs. Each skill lives in its own folder with a `SKILL.md`.

**This is the canonical registry.** Synced across all devices/agents via git.

---

## Active Skills

| Skill | Status | Purpose | Platforms/Scope |
|---|---|---|---|
| [`supadata`](./supadata/SKILL.md) | ✅ active | Video transcript + metadata extraction | Instagram, TikTok, YouTube, X, Facebook |
| [`youtube-digest`](./youtube-digest/SKILL.md) | ✅ active | Full video digestion → KB + content repurposing | YouTube (+ social via Supadata) |
| [`frame-vfx-stylizer`](./frame-vfx-stylizer/SKILL.md) | 🔧 draft | Frame-by-frame video stylization with AI graphic effects | Any video source |

---

## Skill Execution Priority

When a task matches multiple skills, use this fallback chain:

**Video URL received:**
1. `supadata` — transcript + metadata first
2. `youtube-digest` — if user wants full digestion/repurposing
3. `browser-use-cloud` (in agent workspace) — only if Supadata fails

**Video stylization request:**
1. `frame-vfx-stylizer` — full workflow

---

## Skill Format

Each `SKILL.md` contains a YAML frontmatter block:

```yaml
---
name: skill-name
version: 1.0.0
status: draft | active | deprecated
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: Lani | Meda | Persey
agents: [list of agents that use this]
departments: [Marketing, Dev, Operations]
purposes: [Ingestion, Research, Content Creation, ...]
tags: [list]
depends_on: [other skill names]
replaces: [deprecated skill names]
---
```

Followed by:
- What the skill does
- Trigger conditions
- Required inputs + output contract
- Execution protocol (step-by-step, agent-operational)
- Hard rules
- Fallback chain

---

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md`
2. Fill frontmatter + all sections
3. Add to this registry table
4. Commit + push
5. Copy to `~/.openclaw/workspace/skills/<skill-name>/` on VPS if needed immediately

---

_Owner: Lani | Updated: 2026-03-24_
