# Agent Config — lania-marketing

## Ownership

- **Meda owns this directory.** Meda is the marketing CMO agent and primary operator of all files here.
- **Lani can read, not write.** Lani routes marketing requests to Meda; does not modify content or queue directly.
- **Persey does not operate here.** Engineering domain is separate.

## Output Protocol

- All content output goes to `content/queue/` for Michael's review before publishing.
- Nothing in this directory is auto-published. Michael approves and ships.
- Queue files: named `YYYY-MM-DD-[platform]-[type].md` (e.g. `2026-07-17-x-thread.md`)

## Directory Structure

```
lania-marketing/
  context/          ← agent config, personas, brand voice
  content/
    queue/          ← drafts awaiting Michael's review
    published/      ← approved + posted content (archive)
    templates/      ← reusable formats
  docs/             ← system docs, workflows, strategy
```

## Brand Voice

See `docs/system.md` for full marketing system documentation.
