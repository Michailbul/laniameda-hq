# Shot Brief 01 — Squirrel Intro

> **Purpose:** Opens the film. Establishes the forest as a living place BEFORE machines arrive. The squirrel is the audience surrogate — we see the world through its calm, then feel the disruption with it.

> **Duration in edit:** 3-4 seconds

> **Seedance stress test:** Animal micro-motion — ear twitch, head turn, subtle body tension shift. Reaction to off-screen stimulus.

---

## Existing Asset

You already have: `freepik_a-red-squirrel-sitting-up_2790306043.png` — red squirrel on metal guardrail, forest road soft behind, haze, god rays. Strong start frame candidate.

---

## Variations to Try

### VAR A — "Guardrail Sentry"
**Start frame:** Squirrel sitting upright on guardrail post (existing image or refined version).
**Action:** Grooming its face with paws → freezes → ears rotate forward → head snaps left toward camera-left (where cars will come from). Tail bristles slightly.
**Camera:** Static. Locked tripod. Shallow DOF, f/1.8 feel. The stillness of the camera IS the point — the movement is all the animal.
**Why this works:** Maximum contrast with the speed that follows. Static camera = peace. When we cut to the tracking shots, the velocity hits harder.
**Risk:** Seedance may struggle with the paw-grooming detail. Fallback: start with squirrel already sitting alert, just the head-turn reaction.

### VAR B — "Branch Lookout"
**Start frame:** New — squirrel perched on an oak branch overhanging the road, seen from slightly below. Road visible through leaves in the background, out of focus.
**Action:** Squirrel is chewing something (acorn/pinecone) → pauses → looks down toward the road → the branch vibrates subtly (engine resonance through the tree).
**Camera:** Slight upward angle, like a nature documentary. Shallow DOF. Maybe a very slow push-in (2mm drift, barely perceptible).
**Why this works:** Establishes the vertical world — forest canopy above, road below. Sets up the "handoff" shot later where camera finds squirrel on a tree trunk.
**Risk:** More complex start frame to generate. Branch + squirrel + road in background is a lot of spatial information for the model.

### VAR C — "Forest Floor"
**Start frame:** New — ground-level, forest floor. Moss, ferns, fallen bark. Squirrel in mid-frame foraging in leaf litter. Road asphalt visible as a strip in the deep background.
**Action:** Squirrel nose-down in leaves → lifts head sharply → stands on hind legs → freezes in alert posture facing the road.
**Camera:** Low angle, almost bug's-eye. Static or imperceptible drift forward.
**Why this works:** Most "nature doc" of all options. Puts us in the animal's world completely. The road is an intrusion even in the composition.
**Risk:** Ground-level forest floor detail may get muddy in Seedance. Squirrel needs to be close enough to read clearly.

### VAR D — "The Stare" (simplest — highest success chance)
**Start frame:** Existing guardrail image, tighter crop or regenerated closer.
**Action:** Squirrel already alert, sitting upright. Only movement: slow head turn toward camera, direct eye contact for a beat, then snaps away looking down the road. Tail flick.
**Camera:** Static. Medium close-up.
**Why this works:** Minimal motion complexity = highest Seedance success rate. The direct-to-camera eye contact creates an emotional beat. "You're about to see something."
**Risk:** Might feel too simple. But simple that works > complex that breaks.

---

## Start Frame Strategy

| Variation | Start frame source | Need to generate? |
|-----------|-------------------|-------------------|
| A | Existing guardrail squirrel (crop/enhance) | Maybe enhance only |
| B | New — branch + squirrel + road below | Yes, Nano Banana |
| C | New — forest floor + foraging squirrel | Yes, Nano Banana |
| D | Existing guardrail squirrel (tighter) | Crop or re-gen |

---

## Recommendation

**Start with VAR D or VAR A.** Lowest risk, uses existing asset, tests animal motion in Seedance with minimal prompt complexity. If that works, try VAR B for the more cinematic version.

VAR B is the dream shot but save it for after we've proven Seedance can handle squirrel motion at all.

---

## Notes for Prompt Writing

- Do NOT over-describe the forest. The start frame handles environment. Prompt directs the action only.
- Keep squirrel motion to ONE clear action chain (e.g., "freezes → turns head left → ears flatten")
- Specify: "no camera movement" or "locked tripod" — Seedance defaults to adding drift if you don't lock it down
- The sound of approaching cars is implied through the animal's reaction. Don't write "engine sound" — write what the squirrel DOES in response to it.
