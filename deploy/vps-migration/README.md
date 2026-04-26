# OpenClaw VPS Migration Package

Packaged from `82.25.85.143` (Hostinger srv1439489) on 2026-04-26.

## Architecture

```
Internet
  │
  ├─ :443 ─► Traefik (reverse proxy + Let's Encrypt)
  │            ├─ hooks.{HOST}  ─► nginx proxy ─► localhost:18789 (OpenClaw Gateway)
  │            ├─ agent-hub.{HOST} ─► localhost:4001 (Agent Hub)
  │            └─ render.{HOST} ─► nginx proxy ─► localhost:3100 (RunMusic)
  │
  ├─ :18789 ─► OpenClaw Gateway (systemd, node)
  │             └─ reads /root/.openclaw/ (state, workspaces, agents, cron, skills)
  │
  └─ :4001 ─► Agent Hub (Docker, node)
               └─ mounts /root/.openclaw, /root/.agents, /root/.claude, /root/.codex
```

## What's in this package

```
vps-migration/
├── docker/
│   ├── traefik/              # Reverse proxy + auto-SSL
│   ├── openclaw-wwff/        # OpenClaw Docker container (legacy/backup)
│   ├── openclaw-hooks-proxy/ # nginx → gateway webhook proxy
│   ├── runmusic-proxy/       # nginx → runmusic render proxy
│   └── agent-hub/            # Web editor for agent workspaces
├── systemd/
│   └── openclaw-gateway.service  # Main OpenClaw gateway
├── openclaw-state/
│   ├── .env.example          # All env vars (keys only)
│   ├── inventory.txt         # Directory sizes
│   ├── openclaw-json-structure.json
│   ├── workspaces.txt        # Workspace listing
│   ├── workspaces/           # All workspace .md/.json files
│   ├── agents/               # Agent identity .md/.json files
│   ├── identity/             # OpenClaw identity files
│   ├── settings/             # OpenClaw settings
│   └── memory/               # OpenClaw memory files
├── claude-config/            # Claude CLI settings (no credentials)
├── codex-config/             # Codex config template
├── scripts/
│   ├── setup.sh              # Automated setup script
│   ├── transfer-state.sh     # rsync state from old VPS
│   ├── npm-global-packages.txt
│   ├── system-info.txt
│   ├── docker-networks.txt
│   ├── firewall-rules.txt
│   └── crontab.txt
└── README.md
```

## Runtime versions (source VPS)

| Component | Version |
|-----------|---------|
| Ubuntu | 24.04.4 LTS |
| Node.js | v22.22.0 |
| Bun | 1.3.10 |
| OpenClaw | 2026.4.23 |
| Claude Code | 2.1.119 |
| Codex | 0.125.0 |
| Docker | 28.x |

## Global npm packages

- `openclaw@2026.4.23` — main agent orchestrator
- `@anthropic-ai/claude-code@2.1.119` — Claude CLI
- `@openai/codex@0.125.0` — Codex CLI
- `@composio/openclaw-plugin@0.0.8` — external app integrations
- `browser-use-sdk@3.3.0` — cloud browser automation
- `@railway/cli@4.30.5` — Railway hosting
- `pm2@6.0.14` — process manager
- `vercel@50.25.4` — Vercel CLI
- `@playwright/cli@0.1.1` — browser testing
- `mcporter@0.7.3` — MCP tooling

## Migration steps

### Quick path (rsync everything)

```bash
# 1. Run setup on new VPS
bash scripts/setup.sh <new-hostname>

# 2. Transfer full state from old VPS
bash scripts/transfer-state.sh <new-vps-ip>

# 3. Update DNS, start services
```

### Manual path

1. Run `scripts/setup.sh <hostname>` — installs deps, Docker, global packages
2. Copy `.env` files and fill in API keys
3. Transfer `/root/.openclaw/` from old VPS (see transfer script)
4. Transfer `/root/.claude/`, `/root/.codex/`, `/root/.agents/`, `/root/.composio/`
5. Clone repos into `/root/michael/`
6. Update hostnames in Docker compose labels
7. Edit systemd service env vars
8. Start services:
   - `systemctl enable --now openclaw-gateway`
   - Docker: traefik, hooks-proxy, agent-hub, runmusic-proxy
9. Verify: `curl https://hooks.<hostname>/health`

## Secrets to transfer (not in this package)

- `/root/.openclaw/.env` — all API keys
- `/root/.openclaw/credentials/` — stored credentials
- `/root/.openclaw/openclaw.json` — main config with tokens
- `/root/.claude/.credentials.json` — Claude auth
- `/root/.codex/auth.json` — Codex auth
- `/root/.git-credentials` — GitHub PAT
- `/root/.gitconfig` — git identity
- `/root/.composio/user_data.json` — Composio auth
- systemd service `Environment=` lines with API keys

## Docker services

| Service | Port | Compose Location | Notes |
|---------|------|-------------------|-------|
| Traefik | 80, 443 | `/docker/traefik/` | host network mode |
| OpenClaw Gateway | 18789 | systemd (not Docker) | node process |
| Hooks Proxy | — | `/root/openclaw-hooks-proxy/` | nginx → :18789 |
| Agent Hub | 4001 | `/root/michael/agent-hub/` | host network mode |
| RunMusic Proxy | — | `/root/runmusic-proxy/` | nginx → :3100 |
| OpenClaw WWFF | 56508 | `/docker/openclaw-wwff/` | legacy container |

## Git repos on VPS

| Repo | Path | Remote |
|------|------|--------|
| laniameda-hq | `/root/michael/laniameda/laniameda-hq` | github.com/Michailbul/laniameda-hq |
| agent-hub | `/root/michael/agent-hub` | github.com/Michailbul/agent-hub |
| laniameda-skills | `/root/michael/laniameda-skills` | (submodule of laniameda-hq) |
| portfolio-second | `/root/michael/portfolio-second` | github.com/Michailbul/portfolio-second |
| runmusic | `/root/michael/runmusic` | github.com/Michailbul/runmusic |
