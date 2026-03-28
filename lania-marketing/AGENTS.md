## What this repo does

Lania Marketing Assistant is a Claude Code workflow system for creator marketing.

Primary outcomes:
- viral post drafting
- repurposing into channel-specific variants
- carousel generation from narrative to code

## Workflow Mapping

Always read the mapped workflow first before drafting.

| User request | Read first |
|---|---|
| "research this topic" | `.claude/skills/Marketing/workflows/research.md` |
| "I have a topic" | `.claude/skills/Marketing/workflows/idea-to-post.md` |
| "write a post" | `.claude/skills/Marketing/workflows/post.md` |
| "repurpose this post" | `.claude/skills/Marketing/workflows/repurpose.md` |
| "make a carousel" | `.claude/skills/Carousel/workflows/plan.md` |
| "generate carousel code" | `.claude/skills/Carousel/workflows/code.md` |
| "review carousel" | `.claude/skills/Carousel/workflows/review.md` |

## Rules

1. Preserve tone from `context/style/voice.md`.
2. Keep copy specific. No generic motivation filler.
3. Enforce one core point per section or slide.
4. For carousel code, enforce fixed `1080x1350` root canvas.
5. Save outputs under `content/` in dated files.

## Output folders

- Ideas: `content/ideas/`
- Posts: `content/posts/`
- Repurposed variants: `content/repurposed/`
- Carousel plans: `content/carousels/plans/`
- Carousel code: `content/carousels/code/`
- Carousel exports: `content/carousels/exports/`
