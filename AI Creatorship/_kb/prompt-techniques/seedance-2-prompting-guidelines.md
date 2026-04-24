# Seedance 2.0 — Prompting Guidelines

> Comprehensive reference for writing production-grade Seedance 2.0 prompts.
> Compiled from tested techniques, official documentation, and real-world generation results.
>
> **Last updated:** 2026-04-14 | **Owner:** Michael / Apex

---

## 1. Core Philosophy

Write prompts like a director briefing a previs team. Not creative writing. Not keyword stacking. Clear, executable shot instructions.

The best Seedance 2.0 prompts do not sound clever. They sound clear.

**Primary rule:** Give every asset a job. Ambiguous uploads reduce controllability.

---

## 2. Prompt Hierarchy

Every prompt follows this priority stack:

1. **Subject** — who/what is on screen, locked identity
2. **Action** — what is happening, already in motion at second zero
3. **Camera** — shot size + movement + angle
4. **Style** — lighting, color system, lens, grain
5. **Constraints** — what must stay stable
6. **Audio** — sound design, silence, ending beat

**Optimal length:** 120–280 words. Under 120 is too thin for complex shots. Over 280 causes drift.

---

## 3. Prompt Structures

### 3.1 — Five-Segment (Default)

```
Subject + Scene/Atmosphere + Action/Performance + Camera Movement + Style/Lighting
```

**Example:**
```
A serious man in a black overcoat, expression firm but tinged with melancholy.
He slowly opens a red umbrella as raindrops slide along its edge.
He stands on a neon-lit urban street; water splashes around him.
The camera performs a slow push from a wide shot to a medium shot.
Strong cinematic style, film grain, teal-orange color grading, 4K ultra HD,
realistic physical simulation.
```

### 3.2 — Timeline Storyboard (Multi-Shot)

Divide by seconds. Each beat gets its own camera + action + style instruction.

```
[0-Xs]: [camera behavior] + [action] + [sound description]
[X-Ys]: [what changes] + [new camera movement]
[Y-Zs]: [resolution/ending] + [constraints]
```

**Example:**
```
0–4s: Wide shot. The samurai walks forward through a bamboo forest;
wind ripples his clothing; morning mist fills the scene.
4–9s: Medium tracking shot. He draws his sword and takes his opening stance;
leaves fall around him.
9–13s: Close-up. The blade cuts through the air; slow-motion water splashes.
13–15s: Whip pan. Sword flashes, Japanese-inspired epic atmosphere.
```

**Rules for multi-shot:**
- Max 3 shots per prompt — more causes character drift
- Each shot escalates or contrasts intentionally
- Final shot must land on reveal / impact / silence / cut to black
- Use timecodes: `[0s] [3s] [6s]` or `0–4s, 4–8s, 8–12s`

### 3.3 — CRAFT Multimodal Framework

When using reference assets:

```
Context + Reference (@assets) + Action + Framing/Timing + Tone/Audio
```

**Example:**
```
Context: 1940s film noir detective office, heavy with smoke.
Reference: Character face and wardrobe strictly follow @Image1;
movement pacing is based on @Video1.
Action: The detective steps out of the shadows, moves to the desk,
and picks up a photograph, studying it with a grave expression.
Framing: Dutch Angle composition with a tracking camera shot.
Tone: Tense and melancholic atmosphere, classic film grain,
background music @Audio1.
```

### 3.4 — Compact Single-Shot

Use for one clean clip or fast iteration. No timecodes needed.

```
[Subject]. [Action in progress]. [Camera]. [Style]. [Constraints]. [Audio if useful].
```

**Example:**
```
A red sports car races through a dusk mountain road. Low front three-quarter
tracking shot with subtle handheld vibration and heavy directional motion blur.
Premium automotive commercial realism, blue dusk sky, pink roadside flowers,
anamorphic 2.39:1, fine grain. Realistic tire grip, suspension compression,
petal turbulence in the slipstream. Deep engine note and rushing wind.
```

---

## 4. Multimodal References — @Asset System

### 4.1 — Upload Limits

| Type | Max files | Max size | Duration/Format |
|------|-----------|----------|-----------------|
| Images | 9 | 30MB each | jpeg, png, webp, bmp, tiff, gif |
| Video | 3 | 50MB each | 2–15 sec, mp4/mov |
| Audio | 3 | 15MB each | up to 15 sec, mp3/wav |
| **Combined total** | **12 files** | | |
| **Output duration** | | | 4–15 seconds |

### 4.2 — Reference Hierarchy

When upload slots are exhausted, protect in this priority:
1. **Motion reference** (video) — camera + movement rhythm
2. **Subject consistency** (image) — identity lock
3. **Mood/audio** (audio/image) — atmosphere

### 4.3 — What Each Input Type Controls Best

| Input | Best at |
|-------|---------|
| **@Image** | First/final frame lock, character styling, product silhouette, textures, scene mood, palette, composition |
| **@Video** | Camera movement, body motion, blocking, transition rhythm, shot pacing, embedded ambient sound |
| **@Audio** | Voice tone, music mood, ambience, sound design, beat timing, lip-sync anchor |
| **Text** | Shot-by-shot direction, action/timing, dialogue, constraints, narrative logic |

### 4.4 — Assignment Syntax

**Weak (don't do this):**
```
@image1 @image2 @video1 create a 12-second cinematic video
```

**Strong (do this):**
```
@image1 as first-frame reference
@image2 as outfit and material reference
@video1 as camera movement and pacing reference
Create a 12-second nighttime chase scene in a subway station.
```

**Critical distinction:**
- `"Use as"` = pins a specific frame/shot (exact match)
- `"Reference"` = borrows the visual idea without forcing exact reproduction

### 4.5 — Character Consistency with @Assets

```
@image1 as front-face reference
@image2 as side-profile reference
@image3 as outfit reference
Keep the same facial features, hairstyle, and clothing details across all shots.
```

Additional locks:
- Reiterate key traits in text: "short silver hair, mole under left eye"
- Always use the same facial reference (@Image1) across all prompts in a project

### 4.6 — Product / Vehicle Consistency

```
@image1 as overall silhouette reference
@image2 as side profile reference
@image3 as material texture reference
@image4 as hardware detail reference
```

### 4.7 — Scene Consistency

```
@image1 as warm cafe lighting reference
@image2 as wood texture and tabletop reference
Maintain the same amber color temperature throughout the sequence.
```

### 4.8 — Camera Movement Transfer

```
Reference @video1 for camera work and pacing.
Use @image1 for the new subject/scene.
```

Keep these on separate lines. Don't combine both into one sentence.

---

## 5. Camera Language

### 5.1 — Shot Types

| Shot | Best for |
|------|----------|
| Extreme close-up | Texture, detail, emotion in eyes/hands |
| Close-up | Facial expressions, small objects |
| Medium shot | People and action |
| Wide shot | Landscapes, establishing context |
| Aerial / drone | Scale, geography, epic establishing |
| Tracking / dolly | Following subjects, momentum |
| Static / locked-down | Atmosphere, stillness, contemplation |

### 5.2 — Camera Movements

| Move | Effect |
|------|--------|
| `slow dolly-in` | Builds intensity, intimacy |
| `pull-back` / `dolly out` | Reveals environment, scale, loneliness |
| `slow push-in` | Emotional intensity, focus |
| `dramatic pull out` | Environment reveal, scale shock |
| `extreme low-angle` | Heroic, dominant, powerful |
| `overhead top-down` | Geometry, choreography, battlefield logic |
| `360° orbit` | Frozen tension, stylized rotation, sculptural reveal |
| `handheld natural lag` | Documentary urgency, realism |
| `tracking shot` | Side-follow motion, continuity |
| `crash zoom` | Shock, urgency |
| `aerial pull-back` | Epic reveal |
| `pan left / right` | Space exploration |
| `whip pan` | Dynamic transition, energy |
| `tilt up / down` | Height reveal, power shift |
| `truck left / right` | Lateral move, parallax |
| `gimbal smooth` | Controlled precision, commercial feel |
| `slight handheld sway` | Naturalism without chaos |
| `rack focus` | Focus shift between foreground/background |
| `POV (first person)` | Immersion, subjective experience |
| `crane rising slowly` | Grandeur, farewell, overview |
| `locked-off` / `static` | Atmosphere, stillness, contemplation |

**Rule:** Choose the move that matches the emotional beat. Don't add camera variety just because it sounds good.

**Rule:** Shot size + movement + angle is usually enough. Example: `close-up slow dolly-in from low angle with telephoto compression`.

**Rule:** If the prompt is already action-heavy, simplify camera movement. Seedance breaks when everything moves at once.

---

## 6. Lighting & Color Direction

Act as a cinematographer and color expert when writing lighting and color into prompts. Do not rely on preset palettes or generic lighting labels. Instead:

- **Describe the light source, its direction, quality, and temperature** as a DP would call it on set. Name where the light comes from, how hard or soft it is, what color it casts, and what it does to the surfaces it hits.
- **Build the color system from the scene's logic.** What materials are present? What time of day? What emotional register? The palette should emerge from those answers, not from a moodboard label.
- **Specify color temperature directly** when it matters: `warm amber key light from camera-left` or `cool blue fill from above, no warmth`.
- **Name what the light does to the subject** — rim separation, under-eye shadow, specular highlight on wet surfaces, silhouette crush. This is more useful than naming a lighting "type."
- **Commit to a narrow palette.** Two or three dominant colors per shot. State them explicitly. If the scene is red, say what kind of red and what else is allowed. Vague "cinematic lighting" produces vague results.
- **Use contrast as a tool.** Warm subject against cool environment. Single hard source against ambient darkness. Color isolation against desaturated background. State the contrast relationship, not just the colors.

---

## 7. Style Modifiers

### 7.1 — Production Style

- `35mm film grain, Kodak palette`
- `anamorphic lens flares`
- `anamorphic 2.39:1`
- `shallow depth of field, bokeh background`
- `telephoto compression`
- `ultra-wide ground-up lens`
- `cinematic film texture`
- `minimalist tech aesthetic`
- `4K ultra HD, realistic physical simulation`

### 7.2 — Mood / Atmosphere

- `moody`, `ethereal`, `gritty`, `cinematic`, `documentary`, `dreamlike`, `clean and minimal`
- `tense and melancholic atmosphere`
- `Japanese-inspired epic atmosphere`

### 7.3 — Era / Aesthetic

- `1970s muted tones`
- `noir black-and-white`
- `contemporary clean`
- `vintage 8mm`
- `1940s film noir`

---

## 8. Physics — Always Name Explicitly

Seedance under-specifies physics unless you state them directly. If water, dust, hair, cloth, sparks, debris, petals, or vehicle wake are visually important, write the physics.

| Material | Physics language |
|----------|-----------------|
| **Cloth** | `cloth inertia`, `fabric lags behind movement`, `cloth settles after landing` |
| **Sand / dust** | `sand displacement under foot`, `radial dust shockwave` |
| **Water** | `water splashing with surface tension`, `droplets scattering`, `floor puddle mirror reflections` |
| **Slow motion** | `120fps slow-motion on impact, hard snap back to 24fps realtime` |
| **Hair** | `hair reacts to acceleration vector and wind direction` |
| **Impact** | `skin distorting on impact`, `delayed follow-through motion` |
| **Cars / racing** | `suspension compression`, `tire grip under load`, `road vibration through the chassis`, `side mirror vibration`, `slipstream pulling leaves and petals`, `gravel flicking outward from the tire line` |
| **Environment** | `grass bending in airflow`, `debris dragged in the wake`, `petals spiraling after the car passes`, `branches reacting to pressure wave` |
| **Wind** | `realistic wind physics`, `light diffusion`, `fabric movement` |

---

## 9. Action Language

### 9.1 — Starting the Scene

Action must already be underway at `[0s]`. Do not open with stillness unless the scene is driven by environmental movement, emotional tension, or deliberate micro-movement.

**Good openings:**
- "she runs through shallow flood water"
- "he turns sharply as sparks fall behind him"
- "the train is already entering the station"
- "the car is already cornering at speed as petals lift into the slipstream"
- "the dog stands perfectly still while sheep flow around him"

**Rule:** One clear action verb per shot is stronger than a list of actions.

### 9.2 — Physical Action Verbs (Preferred)

Use strong physical verbs over vague transformation language:

**Use:** melt, fracture, stretch, implode, snap open, burst, drift, rise, glide, orbit, sweep, crack, collapse, scatter, shatter

**Avoid:** becomes, transforms, changes, transitions (too vague for reliable generation)

### 9.3 — Transitions

Use only when the scene truly needs a cut:

- `match cut`
- `whip pan`
- `smash cut`
- `cut to black`
- `natural fade`

Frame transitions as actions, not scene breaks:
- **Weak:** "Cut to next scene"
- **Strong:** "Light converges into the logo from @image2"

Best practice: finish with the strongest possible final beat instead of overusing transitions.

---

## 10. STOP MOTION — Use Exactly Once

The strongest dramatic tool in the system. Use once per prompt, at peak tension. During the freeze: complete audio silence.

```
STOP MOTION [duration]s — complete audio silence — [describe what is frozen] — explosive snap-back to full speed
```

**Duration guide:**
- `0.5s` = sharp impact beat
- `1.0s` = standard dramatic freeze
- `1.5s + 360° orbit` = bullet-time style moment

Do not use STOP MOTION more than once per prompt.

---

## 11. Audio & Sound Direction

### 11.1 — Audio Ending Beats

- `audio silence`
- `rain fades to three final drops`
- `distant subway rumble continues under silence`
- `hard cut to black, audio drops out completely`

### 11.2 — Voice Tone Reference

```
@audio1 as voiceover tone reference
Narration should sound [mood descriptors].
```

### 11.3 — Ambient Sound from Video

```
Reference the ambient sound in @video1.
Use the same [specific atmosphere] with [specific elements].
```

### 11.4 — Dialogue with Emotional Direction

```
Dialogue: "[exact words]"
Delivery: [emotional state], [vocal quality], [mic distance/intimacy].
```

### 11.5 — Beat-Sync Prompting

```
@audio1 as beat reference
@image1-4 as visual content
Cut only on strong beats.
Use high-energy transitions.
Every major beat triggers [scene change/text reveal/scale shift].
```

### 11.6 — Sound as Motion Cue

Treat sound effects as motion cues: bass = impact, suction = collapse, crack = snap energy.

---

## 12. Continuity Locks

Use locks only when sameness matters. Do not force `same character` on campaign montages or deliberately different subjects.

**For characters:**
```
same character throughout all shots, same character consistent appearance every shot.
```

**For vehicles:**
```
same car throughout all shots, same car consistent appearance every shot.
```

**For products:**
```
same product throughout all shots, same product consistent appearance every shot.
```

**Additional constraint language:**
- `same wardrobe every shot`
- `continuous rain throughout`
- `no extra characters entering frame`
- `single light source only`
- `maintain the same amber color temperature throughout the sequence`

---

## 13. Video Extension (Continuation)

When extending an existing clip, set duration to the **new section only**, not combined runtime.

```
Extend @video1 by 6 seconds.

0-2s: Camera tilts upward as neon sign flickers on.
2-4s: Steam rises from coffee cup. Door opens. Warm street light spills.
4-6s: Title text fades in: [text]
```

---

## 14. Targeted Editing (Without Full Regeneration)

```
Keep the original motion and camera work from @video1.
Change [specific element].
Add [new element] [location/timing].
```

**Example:**
```
Keep the original motion and camera work from @video1.
Change the character's hair to long red hair.
Add the shark from @image1 slowly rising in the background.
```

---

## 15. Effect / Template Replication

Transfer a visual effect logic from one video to new content:

```
Reference @video1 for the [specific effect type] transition effect.
Use @image1 as the subject and reveal [desired outcome].
```

Works for: puzzle-shatter transitions, particle sweep reveals, gold-dust reveals, ad structure replication.

---

## 16. Text & Typography Constraints

Explicitly state text rules when typography appears:

- `Keep the typography crisp, correctly spelled, and free of visual distortion`
- `All English text must be correctly spelled and visually intact`
- Specify layout: centered, diagonal, full-frame typographic

---

## 17. Platform Formatting

| Platform | Add to prompt |
|----------|---------------|
| TikTok / Reels | `vertical format, 9:16`, favor close-ups, `dynamic energy` |
| YouTube | `cinematic widescreen`, default 16:9 |
| Instagram | `1:1 square format`, center compositions |
| Ultra-wide cinematic | `anamorphic 2.39:1` or `21:9` |

---

## 18. Writing Modes

### Mode 1 — Single-shot
One subject, one action beat, one camera move, one color system, one ending beat. Use the compact template.

### Mode 2 — Multi-shot
Max 3 shots. Each shot escalates or contrasts. Final shot lands on reveal / impact / silence / cut to black. Use timecoded template.

### Mode 3 — Reference-controlled
Lock identity from reference assets. Keep camera complexity lower than normal. Max 2 shots unless necessary. Build from what is visible in the reference, not invented off-frame lore.

### Mode 4 — Commercial / product montage
Continuity lock can be `same car`, `same dog`, or `same product`. Each shot features one sellable detail: silhouette, texture, behavior, material, or hero moment. Use contrast deliberately: prestige shot, detail shot, playful shot, hero shot.

---

## 19. Positive Anchors for Quality

Include these when relevant to push generation quality:

- `Detailed hands, Anatomically correct` — improved anatomy
- `Physically accurate, Natural motion` — better movement
- `Ultra sharp, Masterpiece` — higher visual fidelity
- `Realistic physical simulation` — better physics

---

## 20. Failure Patterns & Debug

### Common failures

| Problem | Cause | Fix |
|---------|-------|-----|
| Character drift | Too many shots | Reduce to max 3, simplify wardrobe, strengthen lock |
| Chaotic motion | Camera + action + effects all peaking | Remove one camera move or one effects layer |
| Static / boring | No motion described | Add subject action + environmental motion |
| Dead realism | No physics named | Add environment reaction physics, inertia, secondary motion |
| Flat lighting | No directional source | Include specific light source + temperature |
| Weak output | One-liner prompt | Use full structure, hit 120+ words |
| Subject inconsistent | No continuity lock | Use identical detailed description in all prompts |
| Mushy sequencing | No timecodes in multi-shot | Add `[0s] [3s] [6s]` markers |
| Conflicting output | Contradicting audio/visual | Align audio cues with visual action |

### Debug order

1. **Action clarity** — is one readable thing happening from second zero?
2. **Camera simplicity** — is the camera doing too much while the subject moves?
3. **Continuity logic** — should this be `same character`, `same car`, or no lock?
4. **Physics specificity** — are materials reacting believably?
5. **Ending beat** — does the clip land on something memorable?

### Change one variable at a time

Hold continuity lock, style, and constraints steady. Change only one of: subject, action, camera, environment, color system, ending beat.

---

## 21. Safe Reframing

If a prompt gets blocked, reframe with cleaner cinematic language:

- `fight` → `impact sequence`, `collision`, `force exchange`
- `soldiers` → `armored figures`
- `kill` → `final moment`, `collapse`, `aftermath`
- Remove graphic injury details — keep it cinematic and non-graphic

---

## 22. Prompt Templates — Copy-Paste Ready

### Template A — Single-shot cinematic
```
same [subject] throughout all shots, same [subject] consistent appearance every shot.
[0s] [camera angle] [subject] [action already in progress] in [environment].
[camera movement]. [color system]. [physics].
Global: [aspect ratio], [lens/style], [grain], [constraints].
Audio: [sound design or silence].
```

### Template B — Three-beat sequence
```
same character throughout all shots, same character consistent appearance every shot.
[0s] [subject] [action already happening]. [camera]. [environment]. [style].
[3s] [escalation / reaction / transition]. [camera adjustment]. [physics].
[6s] [final beat / reveal / collapse / cut]. [ending transition or cut to black].
Global: [aspect ratio], [anamorphic note], [grain], [single light source or palette rule],
[consistency constraints].
Audio: [specific ending beat].
```

### Template C — STOP MOTION beat
```
same character throughout all shots, same character consistent appearance every shot.
[0s] [action in progress]. [camera]. [color system].
[3s] STOP MOTION 1.0s — complete audio silence — [exact frozen visual] —
explosive snap-back to full speed.
[6s] [final impact or reveal].
Global: [constraints], [physics], [format].
```

### Template D — Multimodal with @assets
```
@image1 as [role: first-frame / identity / wardrobe / texture]
@video1 as [role: camera movement / pacing / rhythm]
@audio1 as [role: music mood / beat reference / voice tone]

[0-Xs]: [camera behavior] + [action] + [sound cue]
[X-Ys]: [what changes] + [new camera movement]
[Y-Zs]: [resolution/ending] + [constraints]

Constraints: [continuity lock], [physics], [text legibility if applicable].
```

### Template E — Video extension
```
Extend @video1 by [N] seconds.

0-2s: [continuation action + camera].
2-4s: [development + new element].
4-6s: [ending beat / text / resolve].
```

---

## 23. Full Working Examples

### Example 1 — Action scene with STOP MOTION

```
same character throughout all shots, same character consistent appearance every shot.
[0s] Extreme low-angle inside a Tokyo metro car. Same young woman throughout:
black hair, dark structured coat, two swords. Fire alarm already active,
sprinkler indoor rain already falling. She walks forward without stopping,
each step creating a precise water circle on the floor. Handheld natural lag
with tracking shot, continuous motion, no sprint. Deep red color system:
single deep red emergency light, no other colors, floor puddle mirror
reflections, anamorphic 2.39:1, 35mm grain.
[5s] STOP MOTION 1.0s — complete audio silence — all droplets frozen mid-air
in red light, her face completely calm — explosive snap-back to full speed.
[6s] Final impact, opponent mask flies spinning, hard cut to black.
Global: same wardrobe every shot, sprinkler water throughout, water splashing
with surface tension, cloth inertia, 9:16 output.
Audio: rain fades to three final drops, then total silence.
```

### Example 2 — Automotive single-shot

```
A red sports car races through a dusk mountain road. Low front three-quarter
tracking shot with subtle handheld vibration and heavy directional motion blur.
Premium automotive commercial realism, blue dusk sky, pink roadside flowers,
anamorphic 2.39:1, fine grain. Realistic tire grip, suspension compression,
petal turbulence in the slipstream. Deep engine note and rushing wind.
```

### Example 3 — Product with timeline + @assets

```
@image1 as product design reference
@video1 as camera movement reference
@audio1 as music mood reference

0-4s: Slow push-in on product on reflective black surface. Soft rim light.
4-8s: Camera orbits slightly; particles drift synchronized to beat.
8-12s: Bold centered text. Keep typography crisp, correctly spelled.
```

### Example 4 — Post-apocalyptic scene

```
Wind whips sand across ruins. Female survivor stands on crumbling structure,
torn cape billows, face covered in dust and scars. Camera pushes from medium
to close-up guided by her line of sight. Post-apocalyptic sci-fi style,
desaturated earth tones. Realistic wind physics, light diffusion,
fabric movement.
```

---

## 24. 10 Non-Negotiable Rules

1. Every @asset requires an explicit job assignment
2. Timeline format outperforms narrative blocks for multi-shot
3. Distinguish "use as" (pins frame) vs. "reference" (borrows mood/layout)
4. State "one continuous take" or "no cuts" if needed
5. Protect motion references first when hitting upload limits
6. Use physical verbs over transformation words
7. Treat sound effects as motion cues
8. Define composition before action
9. Frame transitions as actions, not scene breaks
10. Action starts at second zero — never open with stillness unless intentional

---

*Sources: LinkedIn Seedance 2.0 Ultimate Guide, fal.ai Seedance 1.5 Prompt Guide, SeaArt Seedance 2.0 Prompts, laniameda studio testing.*
*Compiled: 2026-04-14 | Project: AI-Cars / Laniameda Studio*
