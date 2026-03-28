# Juice — How to prompt Gemini 3.1 for Epic animations
_AI Jason · 4:53 · 2026-02-27_

---

## The Core Problem (why AI animations suck by default)

Vague prompts like "animate this" or "make it look cool" → model has no spatial thinking ability → uncoordinated, chaotic motion. The model can't infer what should happen when.

**Root cause:** Animation requires timing + state + UI interaction — none of which AI infers from open-ended requests.

---

## The Fix: Scene-Based Prompt Structure

Split the animation prompt into distinct **scenes**. For each scene, define:

1. **Duration** — how long this scene runs
2. **Initial state** — what's on screen at the start
3. **Action** — what moves, appears, or changes
4. **Timing details** — ease-in, fade, delay, stagger
5. **UI state** — which tabs are active, cursor position, what's highlighted
6. **Special effects** — keywords like `3D perspective rotation`, `stagger delay`, `fading`

### Scene-based prompt template:
```
Scene 1 [0-2s]:
- Initial state: [what's visible]
- Action: [what happens — zoom in / fade in / cursor moves to X]
- Timing: [duration, easing]
- UI state: [active tab, cursor position]
- Effect: [3D rotation / blur / stagger]

Scene 2 [2-4s]:
- Initial state: [transition from Scene 1]
- Action: [next beat]
...
```

**This takes away all spatial thinking from the model** → it only needs to execute, not plan.

---

## Two-Phase Workflow

**Phase 1 — Plan** (separate model turn)
- Give context: what you're building, who it's for, key UI components
- Ask model to generate a scene breakdown first
- Output: rough plan + prompt breakdown per scene

**Phase 2 — Build** (implementation turn)
- Paste the scene-based prompt into the coding agent
- Works with: Claude Code, Cursor, any coding agent

**Key insight:** Planning and building are different cognitive tasks. Separate them.

---

## Do Now

- Use scene-based structure for any animation prompt
- Always define: timing + state + action per scene
- Special effect keywords to include: `3D perspective rotation`, `stagger delay`, `fading`, `cursor click`, `smooth ease-in`

## Try Soon

- SuperDesign Chrome extension — clone any UI to pixel-perfect HTML, then animate it
- SuperDesign skill library: `release-demo` skill → generates product launch animation from real UI
- Workflow: Clone UI → select component → add to skill library → prompt animation

## Worth Knowing

- Gemini 3.1 Pro is the recommended model for animations (not Flash)
- SuperDesign has a free Chrome extension for UI cloning
- The `inspire mode` in SuperDesign surfaces relevant design inspiration before prompting
- HTML output from SuperDesign is pasteable directly into any coding agent
