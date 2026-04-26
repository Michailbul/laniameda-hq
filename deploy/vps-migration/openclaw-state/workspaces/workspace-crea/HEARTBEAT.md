# HEARTBEAT.md — Crea

## Periodic Checks (rotate through, 2-4x per day)

### 🔍 AI Model Scout
Check for new model drops or technique releases worth knowing:
- New image/video model releases (Midjourney, FLUX, Nano Banana, Kling, Runway, Seedance)
- New prompting techniques circulating on X or YouTube
- ComfyUI workflow drops
If found → save to `~/work/laniameda/laniameda-hq/content-kb/insights/` and notify Michael

### 🖼 Gallery Health
- Any failed ingests pending?
- KB growing? Last entry was when?

### 📋 PM Backlog
- Skim `pm/todos/` — anything in-progress that needs a nudge?

## Heartbeat State
Track in `memory/heartbeat-state.json`:
```json
{
  "lastChecks": {
    "model_scout": null,
    "gallery_health": null,
    "pm_backlog": null
  }
}
```

## Rules
- Late night (23:00–08:00 Minsk) → stay quiet unless urgent
- Don't repeat a check done <2h ago
- If nothing actionable → HEARTBEAT_OK
