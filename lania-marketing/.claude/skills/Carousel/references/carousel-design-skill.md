# Carousel Design Skill Reference

This reference adapts existing carousel-agent contracts to this Claude workspace.

## Planner

- Build an 8-10 slide narrative.
- Keep one message per slide.
- Enforce narrative arc:
  1. Hook
  2. Tension/problem
  3. Reframe
  4. Framework
  5. Example
  6. Common mistake
  7. Correct approach
  8. CTA

## Designer

- Design for fixed 1080x1350 canvas.
- Keep text readable on mobile.
- Ensure clear type hierarchy and contrast.

## Engineer

- Produce deterministic React slide code.
- Root style includes:
  - `width: 1080`
  - `height: 1350`
- No runtime side effects or dynamic fetches.

## Reviewer

Return structured review:
- score (0-100)
- pass/fail
- required changes
- optional improvements

Fail if:
- readability is weak
- slide arc is broken
- canvas constraints are violated

