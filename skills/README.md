# Skills — laniameda Studio

All studio skills live in [`laniameda-skills/skills/`](./laniameda-skills/skills/).

`laniameda-skills/` is the canonical npm-installable package (`Michailbul/laniameda-skills`).  
It is the single source of truth for all agent skills.

## Install

```bash
npx skills add Michailbul/laniameda-skills
```

## Update

```bash
npx skills update Michailbul/laniameda-skills
```

## Add a new skill

1. Create `laniameda-skills/skills/<skill-name>/SKILL.md`
2. **`description:` frontmatter is required** — `npx skills` silently skips skills without it
3. Update `laniameda-skills/README.md` registry
4. `git commit + push`
5. Copy/symlink to relevant agent workspace(s): `~/.openclaw/workspace-<agent>/skills/<skill-name>/`

_Owner: Lani | Updated: 2026-03-25_
