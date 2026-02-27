#!/usr/bin/env bash
# bootstrap.sh — runs on Railway container startup
# Place this at /data/workspace/bootstrap.sh
set -euo pipefail

WORK_DIR="/data/work"
mkdir -p "$WORK_DIR"

echo "🚀 Laniameda bootstrap starting..."

# Auth with GitHub if token is available
if [ -n "${GITHUB_TOKEN:-}" ]; then
  echo "$GITHUB_TOKEN" | gh auth login --with-token 2>/dev/null || true
fi

# Clone repos from repos.json
REPOS_JSON="$(dirname "$0")/repos.json"

if [ ! -f "$REPOS_JSON" ]; then
  echo "⚠️  repos.json not found, skipping clone"
  exit 0
fi

python3 - <<EOF
import json, subprocess, os

work_dir = "$WORK_DIR"
with open("$REPOS_JSON") as f:
    repos = json.load(f)

for repo in repos:
    path = os.path.join(work_dir, repo["path"])
    origin = repo["origin"]
    if os.path.isdir(path):
        print(f"✅ already exists: {repo['path']}")
        subprocess.run(["git", "-C", path, "pull", "--ff-only"], capture_output=True)
    else:
        print(f"📦 cloning: {repo['path']}")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        subprocess.run(["git", "clone", origin, path], check=True)

print("✅ All repos ready.")
EOF