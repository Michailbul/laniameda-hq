# SerpApi Research — 2026-03-03

## What is SerpApi?
A search scraping API — it handles all proxy rotation, captcha solving, and HTML parsing so you get clean structured JSON from any major search engine. NOT an official API wrapper — it literally scrapes search result pages and returns the parsed data.

Docs: https://serpapi.com
Dashboard: https://serpapi.com/dashboard

---

## YouTube Search API — The Core Feature For Us

### Endpoint
`GET https://serpapi.com/search?engine=youtube&search_query=YOUR+QUERY&api_key=YOUR_KEY`

### What You Get Back

**`video_results[]`** — organic video results
- `title`, `link` (YouTube URL), `serpapi_link` (SerpApi video detail link)
- `channel.name`, `channel.link`, `channel.verified`, `channel.thumbnail`
- `published_date` (relative, e.g. "2 days ago")
- `views` (integer)
- `length` (string, e.g. "11:25")
- `description` (snippet)
- `extensions` (["4K", "CC", "LIVE", "New"])
- `thumbnail.static` + `thumbnail.rich` (animated webp preview)

**`channel_results[]`** — channels that appear in search
- `title`, `link`, `handle`, `verified`, `subscribers`, `description`, `thumbnail`

**`playlist_results[]`** — playlists in search results
- `title`, `link`, `video_count`, `videos[]` (sample titles/links/lengths), `thumbnail`

**`ads_results[]`** — promoted videos (can ignore, but useful to know)

**`movie_results[]`** — YouTube Movies (premium content, less relevant)

---

## Parameters Worth Knowing

| Param | Description |
|---|---|
| `search_query` | The search string (required) |
| `gl` | Country code (e.g. `us`, `gb`) — affects regional results |
| `hl` | Language code (e.g. `en`, `ru`) |
| `sp` | Filter/pagination token (copy from YouTube URL) |
| `no_cache` | Force fresh results (cached = free) |
| `async` | Submit and poll later (for batch workflows) |

### Filters via `sp` parameter
Copy `sp` value directly from a YouTube URL after applying filters on youtube.com:
- Upload date filter: `CAI%3D`
- 4K filter: `EgJwAQ%3D%3D`
- Exact match: `QgIIAQ%3D%3D`
- Any filter combo: set filters on YouTube, copy `sp` from URL

### Pagination
Next page token comes back in `serpapi_pagination.next_page_token` — pass it as `sp` on next request.

---

## Pricing

**Key rule:** 1 search = 1 credit, regardless of how many results come back (100 results = 1 credit, 0 results = 1 credit). Cached results (within 1h) = FREE.

| Plan | Price | Searches/month |
|---|---|---|
| Free | $0 | 100 |
| Hobby | ~$50/mo | ~5,000 |
| Startup | ~$130/mo | ~15,000 |
| Business | ~$300/mo | ~50,000 |

(Exact paid tier numbers need confirmation from dashboard — check serpapi.com/pricing for current tiers)

---

## What SerpApi Does NOT Do
- ❌ No transcript fetching
- ❌ No channel video list crawling (all videos in a channel)
- ❌ No video metadata endpoint directly (use serpapi_link to get video detail)
- ❌ No playlist content expansion (just samples)

---

## SerpApi vs Supadata — YouTube Capability Comparison

| Feature | SerpApi | Supadata |
|---|---|---|
| Search YouTube by keyword | ✅ Core feature | ✅ Has endpoint |
| Search results with views/engagement | ✅ Full data | ⚠️ Limited |
| Filter by date/quality/live | ✅ via `sp` | ❌ |
| Channel metadata from search | ✅ subscriber count | ✅ dedicated endpoint |
| List all videos in a channel | ❌ | ✅ |
| Playlist metadata | ✅ samples | ✅ full |
| Transcript extraction | ❌ | ✅ Core feature |
| Batch transcript | ❌ | ✅ |
| Pricing model | per search | per credit |
| Free tier | 100/mo | (check) |

---

## The Real Play: SerpApi + Supadata Together

These two are **complementary**, not competing:

**Pipeline:**
1. **SerpApi** → search YouTube for "AI image prompts" → get ranked video list with titles, views, channel info, thumbnails
2. Filter by engagement (view count), recency, channel size
3. **Supadata** → take those video URLs → pull full transcripts in bulk
4. Feed transcripts to agent → extract prompts / insights → store in KB

This is essentially the content automation / prompt research pipeline. SerpApi = discovery layer. Supadata = ingestion layer.

---

## Other SerpApi Engines Worth Noting (for future use)
- **Google Search API** — main SERP scraping
- **Google Trends API** — trending topics
- **Google News API** — news results
- **Google Images API** — image search results
- **MCP server** — available at serpapi.com/mcp

---

## Skill Opportunity
Build `serpapi` skill at `~/.openclaw/workspace/skills/serpapi/SKILL.md`
- Primary method: `search_youtube(query, filters?, lang?, country?)` → returns video_results[]
- Secondary: `search_google(query)` for general web research
- Env: `SERPAPI_KEY` in `.env`
- Combine with Supadata skill for full content pipeline
