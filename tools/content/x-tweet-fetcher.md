# X Tweet Fetcher

**Category:** content  
**Status:** ✅ Active

## What It Does
Fetches tweets, long tweets, X Articles, and quoted tweets from X/Twitter without login or API keys — uses FxTwitter API.

## What Works Well
- Regular tweets, long tweets (Twitter Blue), X Articles (full text), quoted tweets
- Stats: likes, RT, views included
- Zero dependencies, zero configuration

## Limitations / Gotchas
- Read-only (fetch only — no posting)
- For posting, use xurl skill (requires Michael approval before every tweet)

## How We Use It

```bash
python3 ~/.openclaw/workspace/skills/x-tweet-fetcher/scripts/fetch_tweet.py \
  --url "https://x.com/user/status/123456"
```

## Skill Location
`~/.openclaw/workspace/skills/x-tweet-fetcher/SKILL.md`
