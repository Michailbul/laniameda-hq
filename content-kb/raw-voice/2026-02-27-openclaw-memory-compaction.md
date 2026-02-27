# KB: OpenClaw Memory & Compaction — Marketing Source Material

_Source: X Article by @xmayeth, 2026-02-26. 34k views, 297 likes._
_Pillar: AI Engineering / Building in Public_

---

## The Core Insight (article's point #4)

**Most people lose agent memory without knowing it.**

Long dialogues grow into thousands of tokens. OpenClaw compresses old messages into a summary when conversations get too long. But if the agent didn't write the important stuff to `MEMORY.md` before compression happens — it's gone.

The agent forgets decisions you made three days ago. Instructions you gave last week. Context you built up over time. It doesn't tell you. It just... doesn't know anymore.

The fix: enable memory flush before compaction. The agent automatically dumps important facts into long-term memory before the compression happens.

---

## The Broader Two-Memory Framework (article's point on bootstrap vs semantic)

There are two levels of memory in OpenClaw:

**Level 1 — Bootstrap (always loaded)**
AGENTS.md, SOUL.md, USER.md, IDENTITY.md, today's log. Injected into context on every single message. The agent always "remembers" this — but it costs tokens every time. The more you put here, the more expensive each request gets.

**Level 2 — Semantic search (loaded on demand)**
MEMORY.md and daily logs searched via vector index. Doesn't eat tokens constantly — only pulls in what's relevant right now. But doesn't guarantee the right fact will surface.

**The strategy:**
- Bootstrap = critical stuff that needs to be present in every message (tone, rules, identity)
- Semantic = decisions, facts, context, history — pulled when needed

If you only use bootstrap: running at half power.
If you use neither: burning money on re-explaining yourself every session.

---

## Content Angles for Posts/Articles

- **"Your AI agent forgets you every week"** — the memory loss problem, why it happens, how to fix it
- **"Bootstrap vs semantic memory"** — most people don't know the difference, here's why it matters
- **"You're paying 3x more tokens than you need to"** — token efficiency angle (from the article title)
- **"What happens when your agent's conversation gets too long"** — explaining compaction in plain terms
- **"The checklist mistake"** — agents that don't write to memory are just expensive chatbots

---

## Direct Quotes from Article (usable verbatim)

- "Long dialogues grow into thousands of tokens."
- "If the agent didn't write the important stuff to MEMORY.md before compression — it's gone."
- "The agent forgets decisions you made three days ago."
- "If only bootstrap is configured — the agent runs at half power."
- "You haven't finished your coffee - and it's already sorted everything out."

---

## Tone Note

This is "AI Engineering told with taste" pillar. Not a tutorial. Not a how-to listicle. Write it like someone who actually runs agents and noticed this problem — not like someone explaining documentation.

The angle that works: "Here's a silent way your agent is failing you that nobody talks about."
