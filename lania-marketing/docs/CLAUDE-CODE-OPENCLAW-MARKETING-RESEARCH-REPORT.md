# Research Report: Claude Code + OpenClaw for Marketing/Carousel Agent

**Date:** February 22, 2026  
**Scope:** Official Claude Code docs + OpenClaw docs, focused on commands, skills, plugins, and practical use for viral content + carousel production.

## 1) Executive summary

For your use case, the best model is:

1. **Claude Code as primary execution environment** for project-scoped workflows (`.claude/`).
2. **Skills as the core unit of behavior** (not raw prompts), with command aliases for easy invocation.
3. **Subagents for specialization** (researcher, copywriter, carousel planner/engineer/reviewer).
4. **Plugins only when you want portability/sharing** across multiple projects or teammates.
5. **MCP for external data and publishing** (research + scheduling), kept environment-driven in `.mcp.json`.

The biggest documentation-level update to internalize is that in Claude Code, custom slash commands are now treated under the broader skills model, and both can coexist while skills are the recommended path.

## 2) Key documentation findings

## 2.1 Claude Code: commands + skills

- Claude docs position skills as first-class extension units and explicitly state that custom slash commands have been merged into skills behavior while `.claude/commands/` still works.
- Skill locations are scoped (`~/.claude/skills`, `.claude/skills`, plugin skills) and support nested discovery in monorepos.
- `SKILL.md` frontmatter controls invocation and permissions (`description`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, etc.).

Practical implication for you:
- Keep your current `mk-*` command files for ergonomics.
- Put most logic into `SKILL.md` + workflow files so Claude can also auto-invoke when relevant.

## 2.2 Claude Code: subagents

- Project and user subagent locations are documented (`.claude/agents/`, `~/.claude/agents/`).
- `name` and `description` are required frontmatter fields; description quality strongly affects delegation behavior.

Practical implication:
- Your specialized agents are correct architecture.
- Continue refining agent descriptions with explicit trigger conditions.

## 2.3 Claude Code: plugins

- Official plugin docs now exist with `.claude-plugin/plugin.json` and component directories at plugin root (`skills/`, `agents/`, `hooks/`, `.mcp.json`, etc.).
- Plugin skills are namespaced (`/plugin-name:skill`) and ideal for shareable/versioned packaging.
- Standalone `.claude/` setup is still the right default for project-local iteration.

Practical implication:
- Stay standalone while iterating quickly.
- Promote to plugin once your marketing workflow stabilizes and you want reuse across repos.

## 2.4 Claude Code: MCP + hooks + settings

- MCP supports scoped configs (local/project/user), precedence, env expansion in `.mcp.json`, and MCP prompts.
- Hooks are powerful but run with full user permissions; security discipline is mandatory.
- Settings hierarchy (`~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json`) enables team-shared vs personal behavior.

Practical implication:
- Keep research/publishing connectors in project `.mcp.json`.
- Add hooks only for deterministic quality gates (do not over-automate early).
- Use `.claude/settings.local.json` for personal experiments, `.claude/settings.json` for team defaults.

## 2.5 OpenClaw: skills + plugins + registry

- OpenClaw skills are folder-based with `SKILL.md`, loaded from bundled/local/workspace with explicit precedence.
- OpenClaw plugins are code modules with `openclaw.plugin.json` + JSON schema validation and CLI lifecycle (`openclaw plugins ...`).
- ClawHub is a public skill registry; docs repeatedly emphasize treating third-party installs as untrusted code.

Practical implication:
- Conceptually similar primitives exist in both systems.
- For your immediate repo execution, Claude Code plugin/skills model is enough.
- Use OpenClaw docs mainly for cross-ecosystem patterns and security posture around shared skills/plugins.

## 3) Commands vs Skills vs Plugins (for your team)

## Commands

Use when:
- You want explicit, manual entry points (`/mk-post`, `/mk-carousel`).

Strengths:
- Discoverable, easy to run.

Limit:
- Less reusable context than full skill packages unless backed by skill files.

## Skills

Use when:
- You need repeatable workflow logic, supporting files, and controlled invocation.

Strengths:
- Structured, composable, can auto-trigger.
- Supports arguments, tool constraints, model overrides.

Limit:
- Requires clean descriptions and discipline to avoid accidental over-triggering.

## Plugins

Use when:
- You need versioned distribution across multiple projects/teammates.

Strengths:
- Packaging, namespacing, reusable components, marketplace/distribution path.

Limit:
- More lifecycle overhead than project-local `.claude/`.

## 4) Recommended architecture for your use case

## 4.1 Core pipeline

1. Research signals and evidence (`/mk-research`)
2. Topic framing + hooks (`/mk-idea`)
3. Primary post draft (`/mk-post`)
4. Platform repurposing (`/mk-repurpose`)
5. Carousel narrative planning (`/mk-carousel`)
6. Carousel code generation (`/mk-carousel-code`)
7. Quality review (`/mk-carousel-review`)

## 4.2 Execution policy

- Keep one source idea and create downstream artifacts.
- Save all artifacts in `content/` with dated naming.
- Enforce one-message-per-slide and fixed 1080x1350 canvas at code layer.

## 4.3 Agent topology

- `trend-researcher`: evidence and market signals
- `topic-strategist`: angle and narrative framing
- `viral-copywriter`: primary post
- `repurposing-editor`: multi-platform adaptation
- `carousel-planner`: slide arc + copy
- `carousel-engineer`: code artifact
- `carousel-reviewer`: publish gate

## 5) Practical rollout plan

## Phase 1 (now): stabilize standalone `.claude/`

- Continue using current repo-local commands/skills/agents.
- Tune voice + style files with your real writing samples.
- Add a short scorecard checklist into each workflow (hook quality, specificity, CTA clarity).

## Phase 2: quality automation

- Add a lightweight hook for post-generation checks (length, banned phrases, CTA present).
- Add carousel lint checks (canvas dimensions, max text volume per slide).

## Phase 3: plugin packaging

- Move current components into plugin-ready layout (already mostly compatible).
- Keep repo workflow for development, plugin for distribution.

## 6) Risks and controls

1. **Over-triggered skills**
   - Fix with precise `description` and `disable-model-invocation` for manual-only flows.
2. **Weak evidence quality**
   - Enforce source-linked output in `/mk-research`.
3. **Unsafe external extensions**
   - Treat third-party skills/plugins as executable code; review before install.
4. **Context drift**
   - Keep style rules in `context/style/*` as single source of truth.

## 7) Decision: what to use where

- **Daily production:** Claude Code standalone `.claude/` in this repo.
- **Cross-project reuse:** Claude Code plugin packaging.
- **OpenClaw docs usage:** reference model for skills/plugin lifecycle and security posture, not a blocker for your current implementation.

## 8) References

## Claude Code docs

- Overview: https://code.claude.com/docs/en/overview
- Interactive mode (built-in commands): https://code.claude.com/docs/en/interactive-mode
- Extend Claude with skills: https://code.claude.com/docs/en/slash-commands
- Create custom subagents: https://code.claude.com/docs/en/sub-agents
- Create plugins: https://code.claude.com/docs/en/plugins
- Plugins reference: https://code.claude.com/docs/en/plugins-reference
- MCP: https://code.claude.com/docs/en/mcp
- Hooks reference: https://code.claude.com/docs/en/hooks
- Settings: https://code.claude.com/docs/en/settings

## OpenClaw docs

- Skills: https://docs.openclaw.ai/tools/skills
- Plugins (concept): https://docs.openclaw.ai/tools/plugin
- Plugins CLI: https://docs.openclaw.ai/cli/plugins
- ClawHub: https://docs.openclaw.ai/tools/clawhub

