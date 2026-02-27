# Content Standards

_What we make. How we judge it. What gets killed._

---

## The Standard

Every piece of content — post, carousel, prompt, design, reel — should pass this filter:

> **Would a taste-driven AI creative studio founder be proud to have their name on this?**

If no → rewrite or kill it. No exceptions.

---

## Content Types & Specs

### X (Twitter) Posts
- **Format:** single idea, max 280 chars (or a thread if depth is warranted)
- **Structure:** hook → development → perspective/action
- **Frequency target:** minimum 1/day
- **No:** multi-idea dumps, emoji overload, hashtag stuffing

### LinkedIn Posts
- **Format:** narrative arc with a lesson and one actionable insight
- **Structure:** situation → insight → implication
- **Frequency target:** 2/week
- **No:** "thought leadership" buzzwords, corporate tone, fake vulnerability

### Instagram Carousels
- **Canvas:** 1080×1350px (4:5 ratio)
- **Slides:** 7–9 max — each slide = one beat
- **Fonts:** max 2 families
- **Colors:** max 1 accent color + neutrals
- **Tone:** editorial, not promotional
- **Progress indicator:** "1/8, 2/8..." always included
- **No:** heavy custom illustrations, complex diagrams, motion (for now)

### Prompt Library (laniameda.gallery)
- **Every entry must include:**
  - The prompt itself (complete, usable as-is)
  - Model tag (which AI tool generated it)
  - Pillar classification (Creators / Cars / Designs / Dump)
  - Reference image (if generated)
- **Quality bar:** if the result isn't interesting enough to save, the prompt doesn't go in the vault
- **No:** low-quality test generations, duplicate prompts, untagged entries

### Designed Assets (UI, carousels, landing pages)
- Must conform to the visual identity (see `brand/visual.md`)
- Dark palette unless there's a specific reason for light
- Every design asset should feel intentional — every element has a reason to be there
- **No:** default template output, unstyled components shipped as-is

---

## Content Pillar Filter

Every piece of content must map to one of these:

| Pillar | Signal keywords |
|---|---|
| AI Creatorship | prompts, image gen, video gen, model workflow, shot breakdown |
| Cinematic Frames | mood boards, aesthetic references, color grading, visual vibe |
| Web / AI Design | UI, landing page, design system, generative design, component |
| Generative AI / Tools | model comparison, tool discovery, workflow test, honest assessment |
| Building in Public | decision, mistake, lesson, milestone, behind the scenes |
| Marketing-First Thinking | content engine, repurposing, distribution, growth thinking |
| AI Engineering | agent system, automation, orchestration, code architecture |

If it doesn't clearly map to one → it's either unfocused (refocus it) or not for us.

---

## What Gets Killed

The following types of content never ship under the studio name:

| Type | Why |
|---|---|
| Generic AI tips ("Top 5 AI tools!") | Anyone could write this. We add no value. |
| Batch-generated, unreviewed output | Smells automated. Destroys brand trust. |
| Hype without substance | "AI is changing everything" with nothing specific after it |
| Low-aesthetic visuals | Our visual standard is non-negotiable |
| Engagement bait | "Agree or disagree?" — we're not a growth hacker |
| Content that contradicts our positioning | If it looks like generic AI content, it's not ours |
| Slow-production, zero-taste output | We either bring craft or we don't post |

---

## Review Gate

Before anything enters the queue:
1. **Meda reviews** — quality gate: voice, pillar fit, aesthetic match
2. **Michael approves** — final say. Always. No auto-publish.

No content skips the approval step.

---

## Knowledge Capture Standard

When valuable content is consumed (article, video, post, insight):

```
Capture format:
- PILLAR: which content pillar does this serve
- RAW: source link or paste
- ANGLE: what's the tension / surprise / insight?
- PROOF: metric, example, screenshot, before/after
```

Store in knowledge_base as:
```
sources/[type]/MMDD-slug/
  meta.json     ← title, pillar, source url, date
  juice.md      ← the actual insight (post-ready + long form)
  verdict.md    ← our take on it
```

---

_Last updated: 2026-02-27 | Owner: Michael + Meda_
