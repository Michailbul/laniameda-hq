#!/usr/bin/env bash
# Character Sheet Pack — batch ingest to laniameda.gallery
# Run this on your OpenClaw/Codex machine (env vars + bun + ingest.ts required).

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAYLOAD_FILE="$HERE/payloads.json"

# Resolve ingest.ts — checks the 3 standard installed locations.
INGEST_CANDIDATES=(
  "$HOME/.openclaw/skills/laniameda-gallery-ingest/scripts/ingest.ts"
  "$HOME/.codex/skills/laniameda-gallery-ingest/scripts/ingest.ts"
  "$HOME/.agents/skills/laniameda-gallery-ingest/scripts/ingest.ts"
)
INGEST_SCRIPT=""
for p in "${INGEST_CANDIDATES[@]}"; do
  if [[ -f "$p" ]]; then
    INGEST_SCRIPT="$p"
    break
  fi
done

if [[ -z "$INGEST_SCRIPT" ]]; then
  echo "Could not find ingest.ts. Install the skill first:" >&2
  echo "  bunx skills add https://github.com/laniamedaHQ/laniameda-gallery/tree/main/skills/laniameda-gallery-ingest -g -a openclaw -y" >&2
  exit 1
fi

# Source env if not already set
if [[ -z "${CONVEX_URL:-}" || -z "${KB_OWNER_USER_ID:-}" ]]; then
  if [[ -f "$HOME/.openclaw/.env" ]]; then
    set -a
    # shellcheck disable=SC1091
    source "$HOME/.openclaw/.env"
    set +a
  fi
fi

: "${CONVEX_URL:?CONVEX_URL not set}"
: "${KB_OWNER_USER_ID:?KB_OWNER_USER_ID not set (expected 278674008)}"

echo "→ Ingesting Character Sheet Pack (5 prompts) via $INGEST_SCRIPT"
bun run "$INGEST_SCRIPT" "$(cat "$PAYLOAD_FILE")"
echo "✓ Done."
