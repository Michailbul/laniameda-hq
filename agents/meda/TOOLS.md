# TOOLS.md - Meda's Tool Notes

## Marketing Workflows

**Home repo:** `~/work/lania-marketing/`
**AGENTS.md:** `~/work/lania-marketing/AGENTS.md`
**Operating model:** `~/work/lania-marketing/docs/OPERATING-MODEL.md`

### Workflow Mapping

| Request | Read first |
|---|---|
| "research this topic" | `~/work/lania-marketing/.claude/skills/Marketing/workflows/research.md` |
| "write a post" / "I have a topic" | `~/work/lania-marketing/.claude/skills/Marketing/workflows/post.md` |
| "repurpose this" | `~/work/lania-marketing/.claude/skills/Marketing/workflows/repurpose.md` |
| "make a carousel" | `~/work/lania-marketing/.claude/skills/Carousel/workflows/plan.md` |
| "generate carousel code" | `~/work/lania-marketing/.claude/skills/Carousel/workflows/code.md` |
| "review carousel" | `~/work/lania-marketing/.claude/skills/Carousel/workflows/review.md` |
| "make this viral" / "write a hook" | `~/.agents/skills/create-viral-content/SKILL.md` + `~/.agents/skills/viral-hook-creator/SKILL.md` |
| "optimize this tweet" / "will this perform?" | `~/.agents/skills/twitter-algorithm-optimizer/SKILL.md` |
| "write a thread" | `~/.agents/skills/twitter-thread-creation/SKILL.md` |
| "make a carousel (slides/images)" | `~/.agents/skills/social-media-carousel/SKILL.md` |

### Content & Social Skills (agent skills — ~/.agents/skills/)

| Skill | Trigger | Notes |
|---|---|---|
| `create-viral-content` | Any public-facing content, "make viral", hooks, social posts | Full framework: hooks, AI-tell elimination, platform rules. Has `resources/` dir. |
| `viral-hook-creator` | "write me hooks", hook generation | Reads `references/hook-patterns.md` + `references/trigger_words.md` first (mandatory) |
| `twitter-algorithm-optimizer` | "optimize this tweet", X content review | Uses Real-graph/SimClusters/TwHIN logic. No external CLI needed. |
| `twitter-thread-creation` | "write a thread", X thread | Uses `infsh` CLI. ⚠️ Critical Risk — use as playbook, don't run scripts untested. |
| `social-media-carousel` | Carousel slide generation | Uses `infsh html-to-image`. Safe rating. Specs: 1080x1350 preferred. |

### Output Folders

- Ideas: `content/ideas/`
- Posts: `content/posts/`
- Repurposed variants: `content/repurposed/`
- Carousel plans: `content/carousels/plans/`
- Carousel code: `content/carousels/code/`
- Carousel exports: `content/carousels/exports/`

Carousel canvas: always **1080x1350** fixed.

---

## Image Generation — Nano Banana Pro

SKILL.md: `~/.openclaw/workspace/skills/nano-banana-pro/SKILL.md`

```bash
# Generate (draft)
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "..." --filename "yyyy-mm-dd-hh-mm-ss-name.png" --resolution 1K

# Final (4K)
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "..." --filename "yyyy-mm-dd-hh-mm-ss-name.png" --resolution 4K

# Edit existing
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "editing instructions" --filename "..." --input-image "path/to/img.png"
```

Draft → iterate → 4K only when prompt is locked.

---

## Voice — sag (ElevenLabs)

SKILL.md: `~/.openclaw/workspace/skills/sag/SKILL.md`

```bash
sag "Text to speak"
sag speak -v "Roger" "Hello"
sag voices
```

Requires: `ELEVENLABS_API_KEY`

---

## Instagram/Threads Extract

SKILL.md: `~/.openclaw/workspace/skills/instagram-extract/SKILL.md`

Use `browser` tool with `profile="chrome"` (relay). Classifies, saves to KB, notifies media agent.

---

## X (Twitter) — xurl

SKILL.md: `~/.nvm/versions/node/v22.21.1/lib/node_modules/openclaw/skills/xurl/SKILL.md`

For posting, reading, searching X. Michael approves all tweets before sending.

---

## Personal Knowledge Base (KB)

**Location:** `~/work/laniameda/laniameda-hq/knowledge-base/`
**Skill:** `~/.openclaw/workspace-meda/skills/youtube-kb/SKILL.md`

**When someone drops a YouTube URL → always run the youtube-kb skill.**

Key profile files (load before evaluating any content):
- `~/work/knowledge-base/profile/interests.md` — learning pillars + what "useful" means
- `~/work/knowledge-base/profile/expertise.md` — what Michael already knows
- `~/work/knowledge-base/profile/feedback-log.md` — distillation mistakes to avoid

---

## Content Extraction

- **Any URL:** `parallel-web-extract` skill
- **YouTube:** `youtube-watcher` (yt-dlp based) or `summarize` skill
- **X post:** `x-tweet-fetcher`
- **Summarize:** `summarize` skill

---

## Voice Transcription — Deepgram (REQUIRED)

**Always use Deepgram for transcription. Never use Whisper.**

- API key: stored in env as `DEEPGRAM_API_KEY`
- Script: `~/.openclaw/workspace-meda/scripts/transcribe-deepgram.sh <audio_file>`
- Model: `nova-2` (best accuracy for English)
- Setup: `curl -X POST https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true -H "Authorization: Token $DEEPGRAM_API_KEY" --data-binary @<file>`

---

## Key Context Files

| File | What's in it |
|---|---|
| `~/.openclaw/workspace/studio-positioning.md` | Full studio brand positioning |
| `~/.openclaw/workspace/marketing-system.md` | Full marketing pipeline description |
| `~/work/lania-marketing/context/style/voice.md` | Brand voice |
| `~/work/lania-marketing/context/style/writing-style-en.md` | Writing rules |
| `~/work/lania-marketing/context/style/platform-rules.md` | Per-platform rules |
| `~/.openclaw/workspace/USER.md` | Michael's profile (main workspace) |
| `~/.openclaw/workspace/MEMORY.md` | Main agent memory |
| `~/.openclaw/workspace/kb/` | Knowledge base (prompts, tutorials, ideas, resources) |

---

## Gemini CLI

SKILL.md: `~/.openclaw/workspace/skills/gemini/SKILL.md`

```bash
gemini "Your prompt here"
gemini --model <name> "Prompt"
```

---

## VPS Info

- **IPv4:** `82.25.85.143`
- **IPv6:** `2a02:4780:4:85f::1` (unreachable from outside, skip)

## Mac Node — Instagram Extraction Setup

**Mac node ID:** `52a0f5ea87bdfbade23c8927ae839a3f1ad8c7f0fe1d1c2a0c711d3b0881a993`
**Gateway token:** `59d05eccf1c92a4e59c3de44e07d0b23ef57b45b19dd2ada`
**Tunnel port:** `18790` (local) → `18789` (VPS)

**Status (2026-03-02):** launchd auto-connect confirmed working. Tunnel + node start automatically on Mac boot.
TUNNEL OK verified via `nc -z 127.0.0.1 18790`.

**How extraction works:**
1. I open browser on Mac via `profile="openclaw"` + `node=<mac-id>`
2. Inject Instagram cookies (exported once, stored in `/root/.openclaw/media/inbound/`)
3. Navigate post, click through carousel slides, screenshot each
4. Extract text/codes, save to KB at `~/work/laniameda/laniameda-hq/knowledge-base/sources/instagram/`

**Instagram cookies file:** `/root/.openclaw/media/inbound/file_19---4f9dfbfa-ab80-4543-977e-121e146cc981.txt`
*(Re-export if login stops working — cookies expire ~2026-04)*

## Repos / Project Paths

- `~/work/prompt-storage/` — prompt storage (prompt vault)
- `~/work/ai-creator-os/` — AI Creator OS
- `~/work/runmusic/` — RunMusic
- `~/work/laniameda/` — personal website + portfolio
- `~/work/laniameda/image-stitch/` — ImageStage (image stitch / combine images)
- `~/work/lania-marketing/` — marketing production system
- `~/work/` — main work directory

---

## Mac Node — Auto-connect Setup (launchd, v2 — two-plist)

**Two separate launchd services (tunnel + node run independently):**
- Tunnel plist: `~/Library/LaunchAgents/com.openclaw.tunnel.plist` — runs `ssh -N -L 18790:...` directly, KeepAlive
- Node plist: `~/Library/LaunchAgents/com.openclaw.node.plist` — runs `openclaw node run` directly, KeepAlive

**Why two plists:** launchd kills background `&` SSH processes spawned from a script. Running SSH as its own managed service keeps it alive independently.

### To restart if node drops:
```bash
launchctl kickstart -k gui/$(id -u)/com.openclaw.tunnel
launchctl kickstart -k gui/$(id -u)/com.openclaw.node
```

### To check tunnel:
```bash
nc -z 127.0.0.1 18790 && echo "TUNNEL OK"
tail -5 /tmp/openclaw-tunnel.err
```

### To check node:
```bash
tail -5 /tmp/openclaw-node.log
```

### If broken from scratch:
```bash
launchctl unload ~/Library/LaunchAgents/com.openclaw.tunnel.plist 2>/dev/null
launchctl unload ~/Library/LaunchAgents/com.openclaw.node.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/com.openclaw.tunnel.plist
launchctl load ~/Library/LaunchAgents/com.openclaw.node.plist
```

## Mac Node — Auto-connect Setup (launchd, legacy)

**Script:** `/Users/michael/.openclaw/node-launcher.sh`
**Plist:** `~/Library/LaunchAgents/com.openclaw.node.plist`

The launcher kills any existing port 18790 usage, starts SSH tunnel to VPS, waits for it to open, then starts openclaw node.

### To restart if node drops:
```bash
launchctl kickstart -k gui/$(id -u)/com.openclaw.node
```

### To check status:
```bash
launchctl print gui/$(id -u)/com.openclaw.node | grep -E "state|exit|runs|pid"
```

### If launchd is broken (fresh setup):
```bash
# Kill everything first
lsof -ti:18790 | xargs kill -9 2>/dev/null
pkill -f "ssh.*hostinger" 2>/dev/null

# Recreate the launcher script
cat > /Users/michael/.openclaw/node-launcher.sh << 'SCRIPT'
#!/bin/bash
lsof -ti:18790 | xargs kill -9 2>/dev/null
pkill -f "openclaw node run" 2>/dev/null
sleep 3
ssh -N -i /Users/michael/.ssh/hostinger_openclaw \
  -L 18790:127.0.0.1:18789 \
  -o StrictHostKeyChecking=no \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -o ExitOnForwardFailure=yes \
  hostinger &
SSHPID=$!
for i in {1..30}; do
  nc -z 127.0.0.1 18790 2>/dev/null && break
  sleep 1
done
export OPENCLAW_GATEWAY_TOKEN=59d05eccf1c92a4e59c3de44e07d0b23ef57b45b19dd2ada
/Users/michael/.nvm/versions/node/v22.21.1/bin/openclaw node run \
  --host 127.0.0.1 --port 18790 --display-name "Michael Mac"
kill $SSHPID 2>/dev/null
SCRIPT
chmod +x /Users/michael/.openclaw/node-launcher.sh
launchctl kickstart -k gui/$(id -u)/com.openclaw.node
```

### Logs:
- stdout: `/tmp/openclaw-node.log`
- stderr: `/tmp/openclaw-node.err`
