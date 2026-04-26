# MEMORY.md — Persey's Long-Term Memory
_Product CTO for Michael's AI-native creative studio_

---

## Studio Context (core, always load)

**Michael** is an AI founder and creator at pre-seed stage. AI-native creative studio — films, design, UGC, AI agents, creative pipelines.

**Core mantra:** Marketing First. Ship fast, validate, iterate.

---

## Active Projects

- **Prompt Storage** — `~/work/prompt-storage/` — prompt vault / storage system
  - TODO: Add model name tag to every image entry
- **AI Creator OS** — `~/work/ai-creator-os/`
- **RunMusic** — `~/work/runmusic/`
- **Lania Meta website + portfolio** — `~/work/laniameda/`
- **ImageStage** (image stitch / combine images) — `~/work/laniameda/image-stitch/`

---

## Engineering Principles

1. Simplest thing that works wins
2. Ship first, refactor after validation
3. No premature optimization
4. Read the actual code before opining
5. Every decision needs a concrete tradeoff

---

## API Keys & Services

Stored in `.env` or OpenClaw config — never in markdown files.

- **Deepgram** — audio transcription (voice messages, video audio)

## Session Bootstrap Date
_Initialized: 2026-02-25_

---

## Agent Workspaces — Important Distinction

`~/.openclaw/workspace-claude` and `~/.openclaw/workspace-codex` are **standalone coding agents** (Claude Code + Codex), NOT OpenClaw agents.
- Do NOT treat them as OpenClaw agent configs
- Do NOT try to route Telegram topics to them via agentId
- They are separate runtimes — skills are installed via `skillfish` into their workspace dirs
- OpenClaw coding agents: persey, meda, desi, crea, main

---

## Andromeda Project (mishabuloichyk.com)

Personal galaxy page for Michael's girlfriend. Stores messages/nodes in a 3D space graph (Convex).

**Repo:** `~/work/laniameda/portfolio-second/`  
**Prod URL:** `https://www.mishabuloichyk.com`  
**Admin:** `/admin/andromeda` (password: andromeda25)  
**API:** `POST/GET https://www.mishabuloichyk.com/api/andromeda`  
**Auth:** `Authorization: Bearer andromeda25`  

**5 Galaxies:**
| Name | ID | Meaning |
|---|---|---|
| Your Dreams | sagittarius | Dreams |
| Your Life | andromeda | Life |
| Your Partner | wormhole | Partner |
| Your Family | carina | Family |
| Your Antidreams | kepler | Fears |

**Skill:** `~/.agents/skills/andromeda-messages/SKILL.md` — use it to add nodes from dialogue.  
**Usage:** "Add to Your Dreams: title 'X', content 'Y'" — I'll call the API directly.

---

## ⛔ NEVER SHOW PACE — PERMANENT RULE

**DO NOT add pace to any RunMusic UI. Ever.**
- No `/km` stat
- No `avgPaceSecPerKm` display
- No `formatPace()` calls in wrapped/recap screens
- Michael has said this 5+ times. This is final.
- If you see pace in any card component, remove it immediately.

