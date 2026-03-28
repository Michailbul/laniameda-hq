# Operating Model

## Goal

Run Claude Code as a repeatable marketing production system, not ad-hoc prompting.

## System components

1. Commands (`.claude/commands/`)
   - Stable entry points for recurring tasks
2. Skills (`.claude/skills/`)
   - Workflow logic with quality gates
3. Agents (`.claude/agents/`)
   - Specialized autonomous workers
4. Context (`context/style/`)
   - Voice, style, and platform constraints
5. MCP (`.mcp.json`)
   - External research and publishing tooling

## Daily production loop

1. Research: `/mk-research "topic"`
2. Direction: `/mk-idea "topic"`
3. Primary draft: `/mk-post "topic or @ideas-file"`
4. Repurposing: `/mk-repurpose @content/posts/...`
5. Carousel plan: `/mk-carousel "topic or @post-file"`
6. Carousel code: `/mk-carousel-code @content/carousels/plans/...`
7. Review: `/mk-carousel-review @content/carousels/code/...`

## Quality discipline

Before publishing:
- one message per post section and per slide
- concrete examples, not broad claims
- fixed carousel canvas 1080x1350
- CTA aligned with intended audience action

## Plugin path

If you want this portable as a Claude plugin:
- keep `.claude-plugin/plugin.json` updated
- keep command/agent interfaces stable
- keep skill descriptions explicit for auto-trigger behavior

## Suggested evolution

1. Add `/mk-pipeline` command to orchestrate full loop in one command.
2. Add publishing command once Typefully MCP is verified.
3. Add content scorecard workflow (hook strength, specificity, CTA quality).

