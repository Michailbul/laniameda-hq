# Juice: Genviral × OpenClaw Skill

## The Architecture Pattern Worth Stealing

**Closed-loop content pipeline:**
1. Agent generates slideshow from text prompt or image pack
2. Agent schedules + distributes to platform
3. Agent pulls analytics (views, likes, follower growth)
4. Analytics feed back into next generation cycle
5. Agent adjusts hook formulas and posting strategy based on measured results — not assumptions

This is the target architecture for Michael's own content pipeline. The difference: Michael's version uses custom carousels (not templates) and keeps a human approval step before posting.

## What the Skill Actually Does (42 commands, 6 categories)

- **Slideshow creation** — text prompt → visual content, or image pack → formatted post
- **Post scheduling** — TikTok, Instagram, YouTube, Facebook, Pinterest, LinkedIn
- **Account management** — multi-profile support (useful for agencies or multi-brand)
- **Image pack organization** — store and reuse visual asset libraries
- **Template management** — save and iterate on formats that perform
- **Analytics retrieval** — engagement data back into agent context

## Setup
- Add Genviral skill to OpenClaw instance
- Provide Genviral Partner API key
- Done — agent can issue all 42 commands via natural language

## Real Result
- First OC-generated slideshow posted to TikTok: 25,000 views

## How to Apply This to Michael's Pipeline (future)

When building the content automation pipeline, replicate this loop:
1. Meda generates carousel (via existing carousel workflow)
2. Michael approves (human-in-the-loop gate)
3. Post goes out via xurl / Post Bridge API
4. Meda pulls analytics after 48h
5. Meda updates KB with what performed → informs next carousel strategy

The Genviral skill is proof this is buildable with OpenClaw natively.
