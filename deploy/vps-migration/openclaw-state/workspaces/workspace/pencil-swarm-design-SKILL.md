---
name: pencil-swarm-design
description: Convert product/app/website briefs into production-ready UI system outputs using Pencil multi-agent generation + Claude Code implementation. Agent-facing workflow only.
metadata:
  laniameda:
    departments: ['Dev', 'Marketing']
    purposes: ['Design', 'Automation']
    tags: ['pencil', 'ui', 'ux', 'design-system', 'claude-code', 'landing-page']
    status: active
---

# pencil-swarm-design

## Trigger
Use this skill when user asks to:
- design a product/app/website UI quickly
- generate multiple UI directions
- convert Pencil design outputs into reusable code/design system

## Objective
Produce a **repeatable design-to-code pipeline** with these outputs:
1. Multiple divergent UI variants
2. Selected winning direction
3. Tokenized design system spec
4. Implementation prompt for code agent
5. Reusable component reference page

## Required Inputs
- product_type
- page_type (landing, dashboard, onboarding, etc.)
- conversion_goal
- audience
- brand_tone
- required_sections
- tech_stack (default: React + Tailwind)
- constraints (deadline, must-keep elements, accessibility/perf requirements)

If any required input is missing, ask only for missing fields, then continue.

## Execution Protocol

### Step 1 — Generate parallel variants
Run Pencil in multi-agent mode with N variants:
- default N=3
- use N=6 for high exploration

Prompt template:
```text
Create {N} DISTINCT UI directions for a {product_type} {page_type}.
Goal: {conversion_goal}
Audience: {audience}
Tone: {brand_tone}
Must include: {required_sections}
Each direction must differ in layout hierarchy, CTA strategy, and visual system.
```

### Step 2 — Score and select winner
Score each variant on 1–10 scale for:
- conversion clarity
- information hierarchy
- brand fit
- implementation feasibility
- accessibility risk

Select:
- primary_winner
- backup_variant

### Step 3 — Generate design system from winner
Generate and capture:
- color tokens
- typography scale
- spacing scale
- radius/shadow/border system
- component states (hover/focus/active/disabled)
- motion rules (durations/easing/reduced-motion)

Output as structured block (machine-usable):
```yaml
design_system:
  tokens:
    color: {}
    typography: {}
    spacing: {}
    radius: {}
    shadow: {}
  components: {}
  motion: {}
  accessibility: {}
```

### Step 4 — Build handoff prompt for code agent
Create one implementation prompt for Claude Code/Codex:
```text
Build a {tech_stack} design-system reference page from selected Pencil frame.
Requirements:
- Implement exact visual hierarchy and component language
- Use tokenized styles only (no hardcoded one-off values)
- Create reusable components for all major UI blocks
- Include interaction states + reduced-motion support
- Output production-ready files and one reference/demo page
```

### Step 5 — Apply and validate
Validate final output against winner frame:
- visual parity
- token consistency
- responsive behavior
- accessibility baseline

If mismatch is high, iterate from Step 3 (not Step 1).

## Output Contract
Always return:
1. `variant_summary[]`
2. `winner_decision`
3. `design_system` (structured)
4. `implementation_prompt`
5. `validation_checklist`

## Hard Rules
- Do not return motivational commentary.
- Do not explain video context.
- Do not write user-facing tutorial prose inside skill execution.
- Keep outputs structured and reusable by agents.
- Prioritize repeatability over style opinions.
