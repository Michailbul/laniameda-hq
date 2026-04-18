# Shot Brief 02 — Ferrari Continuous Tracking

> **Purpose:** Introduce the Ferrari as a solo presence. Pure speed, pure machine. This is also the technical proving ground for continuous shot chaining — using the last frame of clip A as the start frame of clip B to create a seamless long take.

> **Duration in edit:** 5-8 seconds (may be assembled from 2 Seedance clips stitched)

> **Seedance stress test:** Continuous tracking consistency across two chained clips. Speed-matched camera. Maintaining car identity and environment continuity at the seam.

---

## The Core Idea

One unbroken tracking shot that follows the Ferrari from behind/rear-quarter as it carves through the forest road. Camera is speed-matched — the car holds position in frame while the forest streaks past.

The challenge: Seedance caps at 15 seconds. If we want a longer continuous feel, we extract the last frame of clip 1, use it as the start frame of clip 2, and write a prompt that continues the motion seamlessly. In post we cut at the cleanest overlap point.

---

## Variations

### VAR A — "Clean Rear Track" (simplest, prove the chain first)
**Clip 1 start frame:** Existing `ferari back lone .png` — Ferrari rear, centered, haze, god rays.
**Clip 1 action:** Camera tracks Ferrari from dead center rear. Car holds frame. Road bends gently left. Trees streak. Haze parts around the car. Brake lights pulse once mid-clip.
**Clip 1→2 seam:** Extract last frame. The road should be mid-curve.
**Clip 2 action:** Continues the curve. Ferrari completes the turn, road straightens. Camera holds same distance. As road straightens, Ferrari accelerates — pulls slightly further from camera. Exhaust heat shimmer visible.
**Camera:** Rear tracking, road-level, speed-matched. No height change. No lateral drift. Pure pursuit.
**Why this works:** Dead simple motion = cleanest possible seam test. If the two clips don't match, we'll see it instantly. This is the calibration shot.

### VAR B — "Quarter Track with Drift"
**Clip 1 start frame:** New — Ferrari rear-quarter (camera offset to the right), tighter than dead center. More of the left bodywork visible. Forest wall on the left.
**Clip 1 action:** Tracking from right-rear quarter. Ferrari's left flank catches dappled light through the canopy. Road spray trails from rear tires. Camera is slightly lower than roofline.
**Clip 1→2 seam:** Extract last frame.
**Clip 2 action:** Camera slowly drifts from right-quarter toward center-rear over the 15 seconds. By end of clip, we're back to dead-center rear view. This drift gives the continuous shot internal movement beyond just "following."
**Camera:** Starts right-quarter, drifts to center. Low. Speed-matched.
**Why this works:** The camera drift makes the stitch less detectable — any small inconsistency reads as part of the camera's repositioning. Smarter stitching strategy.

### VAR C — "Speed Build" (most cinematic)
**Clip 1 start frame:** New — Ferrari at moderate speed, more frame headroom, road clearly visible ahead. Almost leisurely pace for the car.
**Clip 1 action:** Ferrari cruising, camera tracking. Forest is calm. Then: downshift moment — rear dips slightly, exhaust note implied by heat shimmer, car pulls forward in frame.
**Clip 1→2 seam:** Extract last frame at the moment the car is accelerating away.
**Clip 2 action:** Full attack. The car is closer to camera now (it slowed relative to the car's acceleration). Motion blur increases. Road spray intensifies. Trees are pure streaks. Camera struggles to keep up — the Ferrari slowly gains distance, shrinking in frame.
**Camera:** Starts speed-matched, ends with car outrunning the camera.
**Why this works:** Narrative within a single shot — calm → attack. The speed change is the story. In edit this is the moment the film shifts from "beauty" to "race."
**Risk:** Speed change across the seam is the hardest to match. The acceleration moment IS the stitch point.

---

## Keyframe Chain Technique — How To Execute

```
1. Generate Clip 1 with Seedance (start frame → 15s)
2. Export Clip 1
3. Extract final frame:
   ffmpeg -sseof -0.1 -i clip1.mp4 -frames:v 1 -q:v 1 clip1-lastframe.png
4. Use clip1-lastframe.png as --start-frame for Clip 2
5. Write Clip 2 prompt as CONTINUATION — same camera, same speed, same direction
6. Generate Clip 2
7. In edit: overlap by 0.5-1s, find cleanest cut point or cross-dissolve
```

**Critical prompt rule for Clip 2:** Do NOT re-describe the scene from scratch. The start frame IS the scene. Only direct what CONTINUES — "camera maintains rear tracking, Ferrari continues through the curve, road straightens ahead."

---

## Start Frame Strategy

| Variation | Start frame | Source |
|-----------|------------|--------|
| A | Existing Ferrari rear solo | Have it |
| B | Ferrari rear-quarter, offset right | New — Nano Banana |
| C | Ferrari at moderate speed, more road ahead | New — Nano Banana |

---

## Recommendation

**Start with VAR A.** It's the calibration run. Prove the chain works with the simplest possible motion before adding complexity. If the seam is clean, move to VAR B or C for the cinematic version.

VAR C is the one that goes in the final cut — but only after we know the technique works.

---

## Notes

- This is the shot where we introduce Ferrari ALONE. No AMG visible. The audience doesn't know there's a second car yet.
- Keep prompts SHORT for tracking shots. The model knows what "rear tracking" looks like. Over-describing the camera makes it confused.
- Specify road surface: "damp asphalt" — this gives reflections and spray that sell speed.
- Do NOT describe the forest color. Let the start frame handle it. Prompt = motion only.
