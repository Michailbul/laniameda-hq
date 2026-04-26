#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Transfer OpenClaw state from old VPS (82.25.85.143) to this VPS
# Run this ON the new VPS after setup.sh
# ============================================================

OLD_VPS="root@82.25.85.143"

echo "=== Transferring OpenClaw state from $OLD_VPS ==="
echo ""

# --- OpenClaw state (the big one) ---
echo "[1/6] Syncing /root/.openclaw/ ..."
rsync -avz --progress \
    --exclude='*.sqlite*' \
    --exclude='delivery-queue/' \
    --exclude='logs/' \
    "$OLD_VPS:/root/.openclaw/" /root/.openclaw/

# --- Claude CLI ---
echo "[2/6] Syncing /root/.claude/ ..."
rsync -avz --progress \
    --exclude='session-env/' \
    --exclude='file-history/' \
    --exclude='cache/' \
    --exclude='debug/' \
    --exclude='backups/' \
    "$OLD_VPS:/root/.claude/" /root/.claude/

# --- Codex ---
echo "[3/6] Syncing /root/.codex/ ..."
rsync -avz --progress \
    --exclude='*.sqlite*' \
    --exclude='log/' \
    --exclude='.tmp/' \
    "$OLD_VPS:/root/.codex/" /root/.codex/

# --- Agents/Skills ---
echo "[4/6] Syncing /root/.agents/ ..."
rsync -avz --progress "$OLD_VPS:/root/.agents/" /root/.agents/

# --- Composio ---
echo "[5/6] Syncing /root/.composio/ ..."
rsync -avz --progress "$OLD_VPS:/root/.composio/" /root/.composio/

# --- Git credentials and config ---
echo "[6/6] Copying git config..."
scp "$OLD_VPS:/root/.gitconfig" /root/.gitconfig
scp "$OLD_VPS:/root/.git-credentials" /root/.git-credentials

echo ""
echo "=== Transfer complete ==="
echo ""
echo "Next steps:"
echo "  1. Update hostnames in Docker compose files for new VPS"
echo "  2. Update systemd service Environment= with keys from /root/.openclaw/.env"
echo "  3. systemctl daemon-reload && systemctl enable --now openclaw-gateway"
echo "  4. Start Docker services: traefik, hooks-proxy, agent-hub"
echo "  5. Clone git repos into /root/michael/"
