# mcporter

**Category:** integrations  
**Status:** ✅ Active

## What It Does
MCP (Model Context Protocol) server manager — installs, starts, stops, and manages MCP tool servers.

## What Works Well
- Cleaned up from 16 servers (9 healthy, 7 offline) to 3 healthy: `pencil`, `figma`, `filesystem`
- Easy to prune dead servers

## Limitations / Gotchas
- Keep the server list lean — dead servers add latency
- Check status regularly; servers can go offline silently

## How We Use It
Via OpenClaw built-in `mcporter` skill. MCP servers currently active:
- `pencil` — 14 tools
- `figma` — 5 tools  
- `filesystem` — 14 tools
