# Laniameda HQ

**Ground truth for the Laniameda AI Studio.**

This is the single source of truth for all company documentation. Agent memory files, USER.md, studio.md — they should all defer to this folder for anything company-level.

> If something here conflicts with an agent's context file, this wins. Update the agent file to match, not the other way around.

---

## Structure

```
laniameda-hq/
  README.md                  ← you are here
  company/
    identity.md              ← who we are, stage, name, origin
    vision.md                ← north star + 12-month goals
    values.md                ← core values + working principles
    manifesto.md             ← studio positioning (the full statement)
  agency/
    what-we-do.md            ← services: creative + engineering
    how-we-work.md           ← process, approach, philosophy
    clients.md               ← who we work with (and don't)
  departments/
    marketing.md             ← Marketing First, content pillars, campaigns
    engineering.md           ← agent systems, pipelines, infrastructure
    creative.md              ← filmmaking, design, visual identity, AI art
  projects/
    index.md                 ← all active projects + repos + status
  agents/
    roster.md                ← Lani / Meda / Persey — roles + protocols
  brand/
    visual.md                ← color system, typography, shape, motion, components
    voice.md                 ← brand voice, tone, vocabulary, what we don't say
    content-standards.md     ← content types, quality bar, what gets killed
```

---

## How Agents Should Use This

Every agent's `AGENTS.md` or context file should include:

```
Studio ground truth: ~/work/laniameda/laniameda-hq/
Read company/identity.md + company/vision.md on startup.
```

**Do not duplicate this information.** Link here. Stay in sync.

---

## Ownership

- **Owner:** Michael (founder)
- **Primary curator:** Lani (main agent — operational CEO role)
- **Last updated:** 2026-02-27
