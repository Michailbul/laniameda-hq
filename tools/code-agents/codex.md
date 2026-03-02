# Codex (OpenAI)

**Category:** code-agents  
**Status:** 🧪 Testing  
**Link:** https://openai.com/codex

## What It Does
OpenAI's coding agent — spawned via `codex-feature-ship` skill for end-to-end feature implementation.

## What Works Well
- End-to-end feature ship: task → PRD → implement → commit → push → PR
- `--yolo` mode for fully autonomous execution (implement + commit + push)
- Good for greenfield features in known repos

## Limitations / Gotchas
- Always read AGENTS.md + backlog before spawning (repo-specific rules)
- Write a PRD first — saves to `docs/plan/prd-<slug>.md` in target repo
- Verify result after completion, don't trust blindly

## How We Use It
Via `codex-feature-ship` skill (Lani skill at `~/.openclaw/workspace/skills/codex-feature-ship/`).

Workflow: Locate repo → Read AGENTS.md + backlog → Write PRD → Spawn Codex with `--yolo` → Verify → PR.
