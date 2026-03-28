# Workflow: Repurpose Content

Transform one source post into multi-platform variants.

## Required context

Load before drafting:
1. `context/style/voice.md`
2. `context/style/writing-style-en.md`
3. `context/style/platform-rules.md`

## Input

- Source post file (`@path`) or raw content

## Outputs required

1. X version (single or thread-ready)
2. LinkedIn version
3. Instagram caption
4. Newsletter snippet

## Rules

1. Preserve core idea.
2. Adapt structure per platform.
3. Keep voice consistent.
4. Do not paste the same copy across all platforms.

## Output format

```markdown
# Repurpose Pack: [source-topic]

## X
[copy]

## LinkedIn
[copy]

## Instagram Caption
[copy]

## Newsletter Snippet
[copy]
```

Save to `content/repurposed/MMDD-<slug>-YY.md`.

