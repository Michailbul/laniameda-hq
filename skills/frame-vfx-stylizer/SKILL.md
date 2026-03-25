---
name: frame-vfx-stylizer
version: 1.0.0
status: draft
created: 2026-03-24
updated: 2026-03-24
owner: Lani
source: https://www.instagram.com/reel/DWPEdC_AWOR/
credit: "@lewis_carrot (Саида | Съемка & Монтаж & Ai | Казань)"
agents: [Lani, Persey]
departments: [Marketing, Dev]
purposes: [Content Creation, AI Creatorship, Visual Workflow]
tags:
  - frame-by-frame
  - video-stylization
  - stop-motion
  - mixed-media
  - ai-image-editing
  - cinematic
  - reels
  - instagram
  - vfx
  - animation
depends_on: []
replaces: []
---

# Frame VFX Stylizer

**Purpose:** Convert a source video into a stylized frame-by-frame mixed-media animation using AI image editing — white marker outlines, painted brush strokes, or selective graphic fill.

**Use when:** Creating editorial reels, music video overlays, fashion/cinematic social content, or any clip that needs an "AI-assisted hand-crafted" motion aesthetic.

---

## What This Skill Does

Takes a video → explodes it into frames → runs an AI graphic effect on each frame → reassembles into a stylized clip.

Three distinct effect presets:
1. **White marker outline** — hand-drawn contour lines over subjects
2. **Painted background** — expressive brush strokes in negative space
3. **Selective graphic fill** — partial paint-fill over the hero object

Output looks like stop-motion mixed-media animation. Feels handmade, editorial, cinematic.

---

## Trigger Phrases

- "add hand-drawn overlay to this video"
- "make this look like stop-motion animation"
- "add marker lines to the footage"
- "painted brush stroke effect on this clip"
- "stylize this video frame by frame"
- "add AI graphic effect to this reel"
- "make this look like animated sketch"

---

## Required Inputs

| Input | Type | Notes |
|---|---|---|
| `video` | file path or URL | source clip to stylize |
| `preset` | enum | `white-marker-outline` / `painted-background-strokes` / `selective-graphic-fill` |
| `timing_mode` | enum | `stop-motion` (0.2s/frame) or `smooth` (0.04s/frame) |
| `subject_focus` | string (optional) | `person`, `object`, `background`, `auto` |
| `style_modifiers` | string (optional) | additional style direction, color, mood |

---

## Output Contract

| Output | Description |
|---|---|
| `output.mp4` | stylized video |
| `preview.gif` | lightweight preview |
| `frames/` | folder of processed frame images |
| `manifest.json` | settings used: preset, timing, prompt, frame count |

---

## Effect Presets

### Preset 1 — `white-marker-outline`

**Visual intent:**
- White sketch/marker lines tracing selected contours of main subject and key shapes
- Imperfect, rough, torn, hand-drawn feel
- Only selected contours — not dense full-frame outlining
- Best for: music videos, editorial portraits, subject separation

**Prompt kernel (shortened, from source):**
> Add rough torn white hand-drawn lines over the footage, tracing selected contours of the main subjects and key shapes in the frame.

**Production prompt (preservation-safe):**
```
Preserve the original composition, camera angle, subject identity, pose, clothing,
lighting, and scene structure. Add rough imperfect white hand-drawn marker lines that
trace only selected contours of the main subject and key shapes in the frame. The lines
should feel handmade, slightly torn, expressive, and editorial. Do not redraw the whole
image. Do not replace the subject. Keep the underlying footage visible.
```

---

### Preset 2 — `painted-background-strokes`

**Visual intent:**
- Expressive painterly brush strokes in background and negative space
- Subject stays clean and readable
- Inject movement/emotion into background only
- Best for: moody cinematic scenes, atmospheric ambient clips

**Prompt kernel (shortened, from source):**
> Add expressive painted brush strokes into the background of the footage, especially in empty or atmospheric areas behind the subjects.

**Production prompt (preservation-safe):**
```
Preserve the original composition, subject identity, pose, foreground objects, lighting,
and framing. Add expressive painted brush strokes only into the background and
negative-space areas behind the subject. The brush strokes should feel gestural,
cinematic, textured, and emotionally charged. Do not cover the face unless explicitly
requested. Keep the subject readable and realistic.
```

---

### Preset 3 — `selective-graphic-fill`

**Visual intent:**
- Partial paint-fill over hero object only
- Not a full repaint of the whole frame
- Feels like a deliberate hand-applied graphic accent
- Best for: emphasis beats, fashion, object-centric edits

**Prompt kernel (shortened, from source):**
> Add selective graphic fill focused on the main subject of the frame, as if the primary object is briefly painted over by hand.

**Production prompt (preservation-safe):**
```
Preserve the original composition, subject identity, pose, lighting, and environment.
Add a selective hand-painted graphic fill over the main subject or chosen object only,
as if part of the hero object is briefly painted over by hand. Keep the effect partial,
deliberate, and editorial. Do not fully repaint the full frame. Maintain recognizability
and scene coherence.
```

---

## Execution Protocol

### Step 1 — Ingest source clip
- Validate format (MP4, MOV, etc.)
- Extract source fps and duration
- Determine target frame sampling rate

### Step 2 — Extract frames
```bash
ffmpeg -i input.mp4 -vf fps=5 frames/frame_%04d.png
```
- For stop-motion: extract at ~5fps (1 frame per 0.2s)
- For smooth: extract at ~25fps (1 frame per 0.04s)
- Use zero-padded filenames for ordered reassembly

### Step 3 — Apply preset to each frame
- Run chosen preset prompt against each frame via image edit model
- Enforce preservation constraints in prompt
- Optional: lock seed if tool supports it for consistency

### Step 4 — Consistency check
- Review first / middle / last frame
- Check for prompt drift, identity loss, or composition shift
- If drift detected: tighten prompt with stricter preservation instruction

### Step 5 — Rebuild video
```bash
# Stop-motion (0.2s/frame = 5fps)
ffmpeg -framerate 5 -i frames/processed_frame_%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4

# Smooth (0.04s/frame = 25fps)
ffmpeg -framerate 25 -i frames/processed_frame_%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4
```

### Step 6 — Add audio back (optional)
```bash
ffmpeg -i output_video.mp4 -i original_audio.mp4 -c:v copy -c:a aac output_final.mp4
```

### Step 7 — Deliver artifacts
- `output.mp4`
- `preview.gif`
- `manifest.json` with: preset, timing_mode, frame_count, prompt_used, fps

---

## Timing Reference

| Mode | Frame duration | fps equivalent | Vibe |
|---|---|---|---|
| `stop-motion` | 0.2s | ~5fps | Chunky, stylized, old-school stop-motion |
| `smooth` | 0.04s | ~25fps | Fluid, closer to normal motion |

---

## "If X Then Y" Mappings

| If you need... | Then use... |
|---|---|
| Rough indie / music video sketch feel | `white-marker-outline` + `stop-motion` |
| Moody cinematic atmosphere without touching subject | `painted-background-strokes` |
| Emphasis hit on hero object | `selective-graphic-fill` |
| Long source clip | Sample fewer frames first for style test, then full batch |
| Too much flicker between frames | Reduce edit strength / tighten preservation prompt / try keyframes only |
| Fast preview before full render | Process 5–10 sample frames first |

---

## Known Risks + Mitigations

| Risk | Mitigation |
|---|---|
| Frame-to-frame flicker | Use seed locking, tighter preservation prompt, or lower denoise strength |
| Subject identity loss | Add "Preserve subject identity, pose, face" to prompt |
| Prompt drift on long clips | Process in batches of 20–30 frames, review each batch |
| Output too similar to input | Increase style strength / effect strength in edit model |
| Output too far from input | Add preservation constraints, lower denoise |

---

## Better Variants to Explore

- Direct video stylization models (skip frame extraction entirely)
- img2img with low denoise + strict preservation
- Reference-constrained editing (lock visual style via reference frame)
- Keyframe stylization + interpolation between keyframes
- ControlNet-based edge-guided stylization

---

## v1 Scope (MVP)

- [ ] Accept local video file
- [ ] Extract frames via ffmpeg
- [ ] Apply one preset to all frames (or sampled frames)
- [ ] Rebuild at chosen cadence
- [ ] Export MP4

## v2 Nice-to-Haves

- [ ] Add original audio back automatically
- [ ] Segmentation-based masking (apply effect to specific object only)
- [ ] Multi-preset comparison export
- [ ] Preview contact sheet before full run
- [ ] Branded color accent layer
