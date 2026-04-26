#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# OpenClaw VPS Migration Setup Script
# Source: 82.25.85.143 (Hostinger srv1439489)
# ============================================================

NEW_HOST="${1:?Usage: setup.sh <new-hostname> (e.g. srv12345.hstgr.cloud)}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MDIR="$(dirname "$SCRIPT_DIR")"

echo "=== OpenClaw VPS Setup for $NEW_HOST ==="
echo ""

# --- Step 1: System packages ---
echo "[1/8] Installing base packages..."
apt update && apt install -y curl git unzip

# --- Step 2: Node.js 22 ---
echo "[2/8] Installing Node.js 22..."
if ! command -v node &>/dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt install -y nodejs
fi
echo "Node: $(node --version)"

# --- Step 3: Bun ---
echo "[3/8] Installing Bun..."
if ! command -v bun &>/dev/null; then
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
fi

# --- Step 4: Docker ---
echo "[4/8] Installing Docker..."
if ! command -v docker &>/dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# --- Step 5: Global npm packages ---
echo "[5/8] Installing global npm packages..."
npm install -g openclaw@latest
npm install -g @anthropic-ai/claude-code@latest
npm install -g @openai/codex@latest
npm install -g @composio/openclaw-plugin@latest
npm install -g pm2@latest
npm install -g browser-use-sdk@latest
npm install -g @railway/cli@latest
npm install -g vercel@latest

# --- Step 6: Docker services ---
echo "[6/8] Setting up Docker services..."

# Traefik
mkdir -p /docker/traefik
cp "$MDIR/docker/traefik/docker-compose.yml" /docker/traefik/
echo "ACME_EMAIL=your-email@example.com" > /docker/traefik/.env
echo "  -> Edit /docker/traefik/.env with your ACME email"

# Start Traefik
cd /docker/traefik && docker compose up -d
cd -

# OpenClaw hooks proxy (update hostname)
mkdir -p /root/openclaw-hooks-proxy
cp "$MDIR/docker/openclaw-hooks-proxy/docker-compose.yml" /root/openclaw-hooks-proxy/
cp "$MDIR/docker/openclaw-hooks-proxy/nginx.conf" /root/openclaw-hooks-proxy/
sed -i "s/srv1439489.hstgr.cloud/$NEW_HOST/g" /root/openclaw-hooks-proxy/docker-compose.yml

# RunMusic proxy (update hostname)
mkdir -p /root/runmusic-proxy
cp "$MDIR/docker/runmusic-proxy/docker-compose.yml" /root/runmusic-proxy/
cp "$MDIR/docker/runmusic-proxy/nginx.conf" /root/runmusic-proxy/
sed -i "s/srv1439489.hstgr.cloud/$NEW_HOST/g" /root/runmusic-proxy/docker-compose.yml

# --- Step 7: OpenClaw state ---
echo "[7/8] Setting up OpenClaw state..."
mkdir -p /root/.openclaw
echo "  -> Copy .env from old VPS or fill in $MDIR/openclaw-state/.env.example"
echo "  -> Restore openclaw.json from backup"
echo "  -> Copy workspace directories from old VPS:"
echo "     scp -r root@OLD_VPS:/root/.openclaw/{workspace*,agents,settings,memory,identity,credentials,cron,flows,locks,skills} /root/.openclaw/"

# --- Step 8: OpenClaw Gateway service ---
echo "[8/8] Installing OpenClaw Gateway systemd service..."
cp "$MDIR/systemd/openclaw-gateway.service" /etc/systemd/system/openclaw-gateway.service
# Update the service with actual env vars from .env
echo "  -> Edit /etc/systemd/system/openclaw-gateway.service Environment= lines with your keys"
systemctl daemon-reload
# systemctl enable openclaw-gateway
# systemctl start openclaw-gateway
echo "  -> Run: systemctl enable --now openclaw-gateway"

echo ""
echo "=== Setup complete ==="
echo ""
echo "Manual steps remaining:"
echo "  1. Fill in /docker/traefik/.env (ACME_EMAIL)"
echo "  2. Fill in /root/.openclaw/.env (all API keys)"
echo "  3. Edit openclaw-gateway.service Environment= lines"
echo "  4. Transfer state from old VPS:"
echo "     scp -r root@82.25.85.143:/root/.openclaw/ /root/.openclaw/"
echo "  5. Clone agent-hub: git clone https://github.com/Michailbul/agent-hub /root/michael/agent-hub"
echo "     cd /root/michael/agent-hub && docker compose up -d --build"
echo "  6. Update DNS: point $NEW_HOST to new VPS IP"
echo "  7. Start remaining Docker services:"
echo "     cd /root/openclaw-hooks-proxy && docker compose up -d"
echo "     cd /root/runmusic-proxy && docker compose up -d"
echo "  8. systemctl enable --now openclaw-gateway"
echo "  9. Clone repos: git clone ... /root/michael/laniameda/laniameda-hq"
