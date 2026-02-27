#!/usr/bin/env bash
# restore.sh — run on VPS to unpack an OpenClaw state tarball
# Usage: bash sync/restore.sh ~/openclaw-state-YYYY-MM-DD.tar.gz
set -euo pipefail

TARBALL="${1:-}"
if [ -z "$TARBALL" ] || [ ! -f "$TARBALL" ]; then
  echo "Usage: $0 <path-to-openclaw-state.tar.gz>" >&2
  exit 1
fi

echo "🔁 Restoring OpenClaw state from: $TARBALL"

# Stop gateway if running
openclaw gateway stop 2>/dev/null || true
sleep 2

tar -xzf "$TARBALL" -C "$HOME"

echo "✅ State restored."
echo ""
echo "⚠️  Credentials are NOT included in the tarball."
echo "   You must manually add:"
echo "   - Telegram bot tokens (re-run openclaw channels login --channel telegram)"
echo "   - Gateway token (already in openclaw.json if you edit it)"
echo "   - Auth profiles: ~/.openclaw/agents/*/agent/auth-profiles.json"
echo ""
echo "Start gateway:"
echo "  openclaw gateway start"
