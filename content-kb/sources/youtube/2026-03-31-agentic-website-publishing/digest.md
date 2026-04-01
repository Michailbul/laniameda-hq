# Agentic Website Publishing — Luke Carter (Part 2)

## Architecture

Frontend (public site) ↔ Shared DB (Supabase) ↔ Backend (dashboard CMS)
GitHub Actions → cron triggers → calls backend API → Claude Sonnet writes article → saves to DB → frontend updates reactively.

## Content Pipeline (Kanban)

Statuses: **Planned → Approved → Writing → Published / Draft**

- **Auto mode**: article publishes immediately after writing
- **Safe mode**: article goes to draft for human review
- Human can preview, edit, then manually publish

## Brand Corpus (the brain)

What makes the AI write in your voice:
- Core positioning
- Voice guide (tone, style, examples)
- Banned phrases
- Offers/products
- Competitive landscape
- Case studies + testimonials
- SEO keyword clusters
- Hooks + tone examples
- CTA templates

Stored in DB tables. Both frontend and backend read from it.

## Content Strategy

1. Pull brand corpus
2. AI generates 5-8 topic pillars with subtopics
3. Keyword clusters per subtopic
4. 30+ article ideas distributed across pillars
5. Export to content calendar (Kanban board)

## Article Writing Agent

1. Picks next "approved" article from pipeline
2. Pulls brand corpus for voice/positioning
3. Pulls published articles for interlinking
4. Writes 1500-2500 word article with:
   - H2 headers as questions (GEO-optimized)
   - Interlinks to existing articles
   - FAQs section
   - Natural CTA
   - Meta title + description
5. Publishes or saves as draft based on mode

## Two-Skill Pattern

1. **Content Corpus Skill** — takes brand input (Notion export, markdown, JSON) → creates structured corpus files
2. **Content Strategy Skill** — reads corpus → generates topic clusters + article pipeline

Run corpus first, strategy second. Strategy writes directly to the backend DB.

## Setup Flow

1. Clone frontend repo → set up with CLAUDE.md instructions
2. Set up Supabase (shared DB)
3. Clone backend repo (new chat, same folder)
4. Populate brand corpus
5. Run content strategy skill
6. Deploy GitHub Actions for daily cron
7. Articles start publishing on schedule

## Key Insight

The CLAUDE.md file IS the tutorial. Drop repo + CLAUDE.md into Claude Code → it guides setup step-by-step. No traditional tutorial needed.
