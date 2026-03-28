# Lania Marketing Assistant

Claude Code workspace adapted from Cybos architecture for marketing execution.

## Purpose

Use one topic in your head and convert it into:

1. A strong primary post
2. Repurposed platform variants
3. Carousel narrative and copy
4. Code-based 1080x1350 carousel slides

## Commands

- `/mk-research "topic"`: gather market signals, examples, and angles before writing
- `/mk-idea "topic"`: shape a raw topic into positioning + hooks + angles
- `/mk-post "topic"`: generate a primary viral-ready post
- `/mk-repurpose @content/posts/file.md`: produce channel variants from a source post
- `/mk-carousel "topic"`: create slide-by-slide carousel plan and copy
- `/mk-carousel-code @content/carousels/plans/file.md`: generate carousel code
- `/mk-carousel-review @content/carousels/code/file.tsx`: review publish readiness

## Structure

- `.claude/commands/`: slash command entry points
- `.claude/agents/`: specialized subagents
- `.claude/skills/Marketing/`: idea, post, repurposing workflows
- `.claude/skills/Carousel/`: planning, code generation, and review workflows
- `context/style/`: voice and style constraints
- `content/`: generated artifacts
