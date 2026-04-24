# Character Sheet Pack — Nano Banana Pro

A reusable prompt pack for generating **identity-lock reference sheets** with Nano Banana Pro. Five prompts, same underlying method (one sheet → use as reference for everything downstream), adapted to different subjects and zoom levels.

**Created:** 2026-04-16
**Intended destination:** `laniameda.gallery` → pack tag `pack:character-sheet`

---

## What I was trying to achieve

You asked to save the five sheet prompts we built in this chat into `laniameda.gallery`, grouped under a "Character Sheet" pack.

I prepared the full payloads in `payloads.json` and a shell runner in `ingest.sh`, **but I couldn't fire the ingest from the Cowork sandbox** because it doesn't have:
- `bun` runtime
- `CONVEX_URL` + `KB_OWNER_USER_ID` env vars (stored in `~/.openclaw/.env` on your machine)
- The installed `laniameda-gallery-ingest/scripts/ingest.ts`

The ingest is designed to run on your OpenClaw/Codex machine. So this folder is the handoff — drop it in, run it, done.

---

## What's in the pack

Five prompts, all tagged with `pack:character-sheet` + `identity-lock`:

| # | Title | Subject | Zoom level |
|---|-------|---------|-----------|
| 1 | Character Sheet — Human | Human (7-view turnaround) | full body + portrait close-ups |
| 2 | Car Sheet — Medium | Car | 4 full views + 4 medium details |
| 3 | Car Sheet — Macro | Car | 8 extreme close-ups (90% crop) |
| 4 | Car Sheet — Close-up with Context | Car | 8 details with 20–30% surrounding bodywork |
| 5 | Environment Sheet — City | City | 4 establishing wides + 4 context close-ups |

All five use the **same core method** from the `character-consistency-character-sheet` skill — a two-row sheet that locks identity (subject, paint, light, grade, atmosphere) across every panel, so you can use the sheet as the reference anchor for every downstream generation.

---

## How to run it (on your OpenClaw / Codex machine)

**Option A — use the shell runner:**

```bash
cd /path/to/AI\ Creatorship/character-sheet-pack
chmod +x ingest.sh
./ingest.sh
```

The script:
- Auto-finds `ingest.ts` across `~/.openclaw/`, `~/.codex/`, `~/.agents/`
- Sources `~/.openclaw/.env` for Convex creds
- Pipes the full `payloads.json` batch in one call

**Option B — run the ingest manually:**

```bash
bun run ~/.openclaw/skills/laniameda-gallery-ingest/scripts/ingest.ts \
  "$(cat payloads.json)"
```

Both use idempotent `ingestKey` values (`pack-character-sheet-v1-human`, etc.) — safe to re-run, won't duplicate.

---

## Payload notes (for verification)

- `pillar`: `creators`
- `modelProvider`: `google` (Nano Banana Pro = Gemini 3 Pro Image)
- `workflowType`: `asset_recipe`
- `allowPromptOnly`: `true` (no image attached; text-only prompt saves)
- `typedTags` categories used: `model_name`, `workflow_type`, `content_type`, `environment`, `custom`

If Convex rejects any enum value (for example if `pillar: "creators"` isn't valid in your current schema), update the field in `payloads.json` and re-run — the `ingestKey` will make it idempotent.

---

## Files in this folder

```
character-sheet-pack/
├── README.md         ← this file
├── payloads.json     ← 5 prompts, batch-ready
└── ingest.sh         ← one-shot runner
```
