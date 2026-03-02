# laniameda-kb (Laniameda Gallery Knowledge Base)

**Category:** content  
**Status:** ✅ Active

## What It Does
Saves prompts, images, tutorials, links, and ideas to the laniameda.gallery Convex KB — auto-classifies into the correct pillar.

## Pillars
1. **Creators** — AI influencer/fashion/portrait prompts
2. **Cars** — cinematic automotive references and prompts
3. **Designs** — website, UI, mobile, component designs
4. **Dump** — catch-all for anything useful

## How We Use It

```bash
bun run ~/.agents/skills/laniameda-kb/scripts/ingest.ts '<json>'
```

`ownerUserId` is always read from `KB_OWNER_USER_ID` env var — never passed manually.

## Trigger Phrases
"save this", "store this", "add to KB", "save to vault", pastes a prompt, forwards a Telegram post.

## Repo
`/root/work/laniameda/laniameda.gallery` (formerly `prompt-storager`)

## Skill Location
`~/.openclaw/workspace/skills/laniameda-kb/` and `~/.agents/skills/laniameda-kb/`
