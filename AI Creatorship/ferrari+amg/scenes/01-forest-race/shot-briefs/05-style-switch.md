# Shot Brief 05 — Style Switch (The AI Flex)

> **Purpose:** A deliberate rupture in the visual language. Mid-shot, reality bends — the photorealistic footage shifts into a completely different rendering style, holds for 2-3 seconds, and snaps back. This is the "AI can do this" moment. It's not a glitch — it's a flex.

> **Duration in edit:** 3-5 seconds (the transition is the point)

> **Seedance stress test:** Mid-generation style transformation. Can the model shift visual language while maintaining subject continuity, motion, and camera?

---

## Approach Options

There are two fundamentally different ways to do this:

### APPROACH 1 — In-Prompt Style Shift (pure Seedance)
Write a single Seedance prompt that instructs a style change mid-clip. Something like: "photorealistic tracking shot... at 5 seconds the rendering shifts to [style]... returns to photorealistic by 10 seconds."
**Pros:** If it works, it's a single-clip miracle. True AI showcase.
**Cons:** Seedance may not support timecoded style instructions reliably. High failure rate expected.

### APPROACH 2 — Post-Production Composite (frame-vfx-stylizer)
Generate a normal photorealistic tracking shot. Then run the middle frames through the frame-vfx-stylizer skill to convert them to a different style. Reassemble in edit: real → stylized → real.
**Pros:** Guaranteed to work. Full control over the transition point and duration.
**Cons:** Less "pure" — it's compositing, not generation. But the audience doesn't know or care.

### APPROACH 3 — Parallel Generation, Hard Cut
Generate the same shot twice — once photorealistic, once with a style prompt (sketch, anime, oil painting). Cut between them at matching motion points.
**Pros:** Each clip is fully rendered in its style. Clean.
**Cons:** Motion may not match exactly between the two versions. Needs careful frame-matching in post.

**Recommendation:** Try Approach 1 first (2-3 attempts). Fall back to Approach 2 if it doesn't hold.

---

## Style Variations — What to Switch TO

### VAR A — "White Marker Sketch"
The photorealistic footage becomes hand-drawn white outlines on dark background. Like an animator's keyframe pass. Cars are recognizable by silhouette. Motion continues.
**Vibe:** Technical, behind-the-scenes, "you're seeing the wireframe of reality."
**frame-vfx-stylizer preset:** White marker outline.
**Why:** High contrast with the photorealism. Instantly reads as "different." Very graphic.

### VAR B — "Oil Paint / Impressionist"
The footage becomes thick brushstrokes, Impressionist color. Trees become Monet blurs. Cars become smears of red and dark grey. Motion becomes painterly.
**Vibe:** Art-meets-machine. The race as a painting.
**Why:** Beautiful contrast. The motion blur of speed already looks painterly — this leans into it.

### VAR C — "Rain Storm" (weather shift, not style shift)
Instead of changing the rendering, change the world. Mid-tracking shot: sky darkens in 1 second. Rain hits. Road goes from damp to soaked. Water flies off everything. Visibility drops. The haze becomes a wall of rain.
**Vibe:** Nature fighting back. The forest asserting dominance.
**Why:** Doesn't break photorealism — it breaks the ENVIRONMENT. Arguably more impressive because it has to maintain physical plausibility while changing conditions.
**Seedance challenge:** Dynamic weather transition. Lighting change. Water physics appearing from nothing.

### VAR D — "Night Flash"
Mid-shot, the lighting drops to night. Only the headlights and taillights illuminate the scene. Forest becomes silhouettes. Road is lit by two moving light sources. Holds for 2-3 seconds. Then — dawn, light returns, back to the diffused day.
**Vibe:** Time compression. Like 12 hours passed in 3 seconds.
**Why:** Tests dramatic lighting shifts. Headlight rendering. The forest at night is a different film entirely.

### VAR E — "Graphic Cel / Anime"
Flat colors, bold outlines, simplified shapes. Like the cars were drawn into an anime. Speed lines. Exaggerated motion blur as graphic streaks.
**Vibe:** Japanese automotive culture nod. Initial D energy.
**Why:** Completely different rendering pipeline. If Seedance can shift to flat cel-shading mid-clip, that's genuinely impressive.

---

## Best Base Shot for the Switch

Use a SIMPLE tracking angle as the base — the style shift is the event, so the camera work should be stable and predictable. Best candidates:

1. Rear chase, both cars, straight road — your most proven angle
2. Ferrari solo rear tracking — clean single subject

Don't try a style shift on a complex shot (overtake, tunnel, detail). Too many variables.

---

## Transition Technique Notes

**For in-prompt approach:** Use timecoded language if Seedance supports it: "at the 4-second mark, the visual style transforms to..." or "halfway through the shot, the rendering shifts..."

**For post approach (frame-vfx-stylizer):**
1. Generate the full photorealistic clip
2. Extract frames 60-120 (roughly seconds 2-4 at 30fps)
3. Run through chosen style preset
4. Reassemble: frames 1-59 (real) → frames 60-120 (styled) → frames 121-end (real)
5. Add 3-5 frame cross-dissolve at each transition boundary

**For parallel generation approach:**
1. Generate photorealistic version
2. Generate same prompt with style addition: "in the style of [X], [same action]"
3. Match motion in post, cut at cleanest point

---

## Recommendation

**VAR C (rain storm)** is my top pick. It doesn't break the photorealism contract — it just breaks the weather. It's narratively motivated (nature responding to the intrusion). And it tests something genuinely hard: dynamic environment change mid-shot.

**VAR A (white marker)** is the backup — guaranteed to work via frame-vfx-stylizer and reads instantly as "style shift."

If you want maximum audience impact: do BOTH. Rain storm as the mid-film moment, white marker sketch as a 1-second flash cut somewhere else.

---

## Notes

- The style switch should happen ONCE in the film. Maybe twice max. More than that and it becomes a gimmick instead of a moment.
- Sound design will sell this in post — the style shift should have an audio cue (silence drop, bass hit, record scratch, whatever).
- The snap BACK to photorealism should be instant. Don't fade. Hard cut back = more impact.
