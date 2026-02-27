#!/usr/bin/env bash
# backup.sh — run on Mac to create a portable OpenClaw state tarball
# Usage: bash sync/backup.sh [output-dir]
set -euo pipefail

OUTPUT_DIR="${1:-$HOME}"
DATE=$(date +%Y-%m-%d)
TARBALL="$OUTPUT_DIR/openclaw-state-$DATE.tar.gz"

echo "📦 Creating OpenClaw state backup..."
echo "   Output: $TARBALL"

tar -czf "$TARBALL" \
  --exclude="$HOME/.openclaw/credentials" \
  --exclude="$HOME/.openclaw/media" \
  --exclude="$HOME/.openclaw/logs" \
  --exclude="$HOME/.openclaw/browser" \
  --exclude="$HOME/.openclaw/subagents" \
  --exclude="$HOME/.openclaw/delivery-queue" \
  --exclude="$HOME/.openclaw/*.sock" \
  --exclude="$HOME/.openclaw/.DS_Store" \
  -C "$HOME" \
  .openclaw/openclaw.json \
  .openclaw/cron \
  .openclaw/agents \
  .openclaw/workspace \
  .openclaw/workspace-meda \
  .openclaw/workspace-persey \
  .openclaw/memory \
  .openclaw/settings \
  .openclaw/skills \
  2>/dev/null || true

SIZE=$(du -sh "$TARBALL" | cut -f1)
echo "✅ Done: $TARBALL ($SIZE)"
echo ""
echo "Copy to VPS:"
echo "  scp $TARBALL user@your-vps:~/"
echo "Then on VPS:"
echo "  bash restore.sh ~/openclaw-state-$DATE.tar.gz"
