# HEARTBEAT.md

## On every heartbeat, check for approved content ideas:

```bash
python3 /root/.openclaw/workspace/skills/notion-sync/sync.py \
  --query --content-ideas --status "Approved"
```

If any ideas are returned:
1. Log them to memory/YYYY-MM-DD.md
2. Notify Michael in Telegram: "Picking up approved idea: [name] — starting production"
3. Update idea status to "In Production":
   ```bash
   python3 /root/.openclaw/workspace/skills/notion-sync/sync.py \
     --update-idea --name "IDEA NAME" --status "In Production"
   ```
4. Start the content production workflow for that idea

## Approval via Telegram
If Michael says "approve [idea name]" in chat:
```bash
python3 /root/.openclaw/workspace/skills/notion-sync/sync.py \
  --approve --name "IDEA NAME"
```
Then immediately start production (same as above).
