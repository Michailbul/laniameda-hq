# Parallel AI + Browser Use MCP (Cloud)

**Category:** automation  
**Status:** 🔜 Planned (not yet set up)

## What It Does
Cloud-based authenticated browser automation — Parallel AI Task API + Browser Use MCP server. Replaces fragile local Playwright setup for X feed, Discord, and other authenticated scraping.

## How It Would Work
```
Request → Parallel Task API → Browser Use MCP → Cloud browser profile → Target site → Structured output
```

Required API header: `parallel-beta: mcp-server-2025-07-17`  
MCP endpoint: `https://api.browser-use.com/mcp`

## Status: Blocked — Missing API Keys
| Key | Status |
|-----|--------|
| `PARALLEL_API_KEY` (platform.parallel.ai) | ❌ Not set up |
| `BROWSERUSE_API_KEY` (browser-use.com cloud) | ❌ Not set up |
| Browser Use Cloud Profile | ❌ Not configured |

## Research
Full notes: `~/.openclaw/workspace/memory/2026-02-23-parallel-browseruse-mcp.md`

## When to Set Up
Primarily for: X feed scraping (login blocked locally), Discord automation.
