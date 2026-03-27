# Workflows — AI Samson Character Consistency

---

## Core Workflow: Character Sheet → Anything

```
Midjourney (aesthetics) → Google Flow (character sheet) → [downstream]
```

### Step-by-step
1. Create or find reference character in Midjourney (highest aesthetic baseline)
2. Upload to Google Flow as image reference
3. Run character sheet prompt → generate 4 outputs
4. Pick best sheet → upscale (2K or 4K in Flow)
5. Fix feet if cropped → run full-body fix prompt
6. Save character sheet → use as anchor for all downstream work

---

## If X Then Y

| I need... | Do this |
|-----------|---------|
| New character from scratch | Midjourney → image ref in Flow → character sheet prompt |
| Quick minor/background character | Text-only character prompt in Flow, no image ref |
| Character in new lighting | Sheet as image ref + lighting description prompt |
| Character in new outfit | Sheet as image ref + outfit ref image + outfit prompt |
| Character with complex markings (tattoos/scars) | Include in initial sheet prompt with specific description → maintains across all uses |
| Character in a scene (solo) | Sheet as image ref + scene prompt → still image → Frames to Video |
| Character in a scene (multi-cast) | Both character sheets as refs + ChatGPT-enhanced scene prompt |
| Animate a character | Method A (fast): Ingredients to Video in Flow / Method B (quality): still first → Frames to Video |
| Age a character | Sheet ref + aging prompt → portrait at each age → Frames to Video for time-lapse |
| Better prompts | Paste rough idea into ChatGPT → use metaprompt to enhance → run in Flow |

---

## Animation: Fast vs Quality

**Fast (Ingredients to Video)**
```
Flow → switch dropdown to "Ingredients to Video"
Upload character sheet → write action prompt → generate
```
Trade-off: less control over exact frame

**Quality (Frames to Video)**
```
1. Flow: sheet as ref → generate scene still
2. Flow → Frames to Video → set still as first frame
3. Write motion/action prompt → generate
```
Trade-off: one extra step, but higher quality and more control

---

## Aging Time-lapse
```
1. Sheet ref → portrait at current age
2. Sheet ref → portrait at target age (e.g., "+50 years")
3. Frames to Video: young portrait = frame 1, old portrait = frame 2
4. Prompt: "time-lapse between these two ages"
```

---

## Multi-character Scene
```
1. Develop characters A and B separately (each with own sheet)
2. ChatGPT: metaprompt the scene → get detailed scene description
3. Flow: both sheets as image references → paste enhanced prompt → generate
4. Use output as first frame for video if animating
```
