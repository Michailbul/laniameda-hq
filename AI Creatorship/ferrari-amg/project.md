---
kind: project
id: ferrari-amg
title: Ferrari + AMG — "Rollin'"
schema_version: kinds-v1
status: active
runtime: "~3:00"
shot_count: 14
characters: [mark, leo, michael, ferrari-812-superfast, mercedes-amg-gt3]
locations: [european-forest-road]
soundtrack: "Limp Bizkit — Rollin' (Air Raid Vehicle)"
---

# Ferrari + AMG — "Rollin'"

## Concept

Two childhood friends in tuxedos race their dream cars through a golden-hour European forest on the way to the wedding of a third mutual friend. The film opens slow and cinematic — a squirrel, a single red Ferrari cutting through god rays — then erupts into a full-tilt race as the AMG appears in Mark's rearview, scored by Limp Bizkit's *Rollin'*. The chase is the point, but the real subject is that two guys who drive serious grown-up cars and wear serious grown-up suits are still twelve years old inside.

**Theme:** You're never too old to be a kid. Past reclaims present.

**Tone arc:** Cinematic quiet → absurd humor mid → euphoric release. European automotive realism with the soul of a coming-of-age short.

## Logline

Two childhood friends in tuxedos, en route to the wedding of a third, race their dream cars through a golden-hour forest and remember they're still twelve years old.

## Characters

| Character | Car | Role | Energy |
|---|---|---|---|
| **Mark** (31) | Ferrari 812 Superfast (red) | Best man. Three-piece tux, buttoned up. Piercing in left ear, tattoo edge under right cuff — the "serious adult" is a costume. | Holds out. Converts under pressure. |
| **Leo** (32) | Mercedes-AMG (matte charcoal) | Groomsman. Same friend group, different interpretation of formal — bow tie undone, white sneakers, stubble, crushed boutonnière on the dash. | Showed up authentic. Never stopped being a kid. |
| **Michael** | — | The groom. Childhood friend of both. Seen only in Act III. | Offscreen pressure in Act I → warm release in Act III. |
| **Squirrel** | — | Forest POV. Scared in Act I, judging in Act II. The film's tonal barometer. | Deadpan. |

## Structure — 14 shots, 3 acts, ~3:00

- **Act I — The Forest** (~00:45) — Shots 1–6. Cold open on squirrel. Ferrari arrives. Mark established (tux, ring box, wedding invitation in visor). Phone call with Leo — banter establishes Michael = groom, Mark = best man. AMG revealed in mirror. Music cue.
- **Act II — The Race** (~01:45) — Shots 7–13. Side-by-side forest chase. Mark locked / Leo grinning. Aerial canopy. **Squirrel "they're nuts" cameo** = tonal pivot. Chorus peak — Mark is now singing. Low two-shot. Airborne crest.
- **Act III — The Arrival** (~00:30) — Shots 14–15. Cars roll into a Goblet-of-Fire-scale wedding camp. "Damn, we're still late." / "At least neither of us showed up in a Tesla." Thesis hug. Crane up to golden sky. Fade.

Full shooting script: [`screenplay.md`](./screenplay.md)

## Visual Contrast

| Ferrari 812 Superfast | Mercedes-AMG |
|---|---|
| Red metallic, glossy, warm, reflective | Matte dark charcoal grey, cool, light-absorbing |
| Sculptural grand tourer | Aggressive GT presence |
| Hero visual anchor, pops in frame | Darker threat presence, recedes |

The Ferrari is always the warmer, more visible object. The AMG is always the darker, heavier presence.

## Time of Day / Season

Late afternoon golden hour. Sun low in the west, 15–20° above horizon, backlighting the cars in most chase angles. God rays rake through the autumn canopy. Gold and amber deciduous foliage mixed with deep green conifers. Fallen leaves on road shoulders. Warm foliage echoes the Ferrari's paint without competing.

## Mood

Tense, grounded, cinematic. Real race energy captured as if by a real film crew on a closed forest road — speed-matched tracking, low pass-bys, lens compression, road vibration, tire spray, backlit haze, debris in the slipstream. The AI flex is never the main event. The forest has weight. The speed has consequence. The joke lands because the frame is serious.

## Soundtrack Logic

- **Music cue is the skeleton.** *Rollin'* is non-diegetic. Drops on Leo's gear change in Shot 6.
- Verse / pre-chorus carries Shots 7–10.
- Chorus lands on Shot 11 — first time Mark sings along.
- Outro carries under Shots 14–15 into the fade.
- No dialogue during the race except the mouthed/sung chorus.

## Continuity Locks

- Ferrari stays **red metallic**. Not copper, not burnt orange.
- AMG stays **matte dark charcoal grey**.
- No license plates on either car. Negate plates explicitly in every car prompt.
- **Mark** — three-piece tuxedo, black. Platinum ear piercing (left). Tattoo edge visible under right cuff. See [`characters/mark/wardrobe.md`](./characters/mark/wardrobe.md).
- **Leo** — tuxedo with bow tie hanging undone. White sneakers. Dress shoes on passenger seat. Crushed rose boutonnière on dash. Three-day stubble. See [`characters/leo/wardrobe.md`](./characters/leo/wardrobe.md).
- Haze and mist are always present. Without them the forest goes flat.
- **One action per shot.** Do not stack overtake, weather change, and singing in the same beat.
- Mark's conversion to the race is implied between Shot 10 (squirrel) and Shot 11 (chorus peak). **Never shown directly.**

## Pipeline

1. **Wardrobe + identity locks** in Nano Banana Pro — character sheets for Mark and Leo, referenceable for every in-car shot.
2. **Start frames** for each of the 14 shots in Nano Banana Pro using the character + car + location locks.
3. **Animate** with Seedance 2.0 using start frame as noun, prompt as verb.
4. **Chain tracking clips** by extracting the final frame of clip A and feeding it as start frame of clip B.
5. **Approved clips** land in the matching shot's `videos/` folder. Unsorted raw clips live in `scenes/01-forest-race/shots/raw/` until triaged.
6. Keep winning prompts as `prompt-thread` files — never leave useful prompts only in chat.

## Working Files

- [`screenplay.md`](./screenplay.md) — locked shooting script, 14 shots
- [`scenes/01-forest-race/scene.md`](./scenes/01-forest-race/scene.md) — scene-level doc with shot list
- [`characters/mark/wardrobe.md`](./characters/mark/wardrobe.md) — Mark's wardrobe lock + prompt blocks
- [`characters/leo/wardrobe.md`](./characters/leo/wardrobe.md) — Leo's wardrobe lock + prompt blocks
- [`characters/ferrari-812-superfast/lock.md`](./characters/ferrari-812-superfast/lock.md) — Ferrari identity lock
- [`characters/mercedes-amg-gt3/lock.md`](./characters/mercedes-amg-gt3/lock.md) — AMG identity lock
- [`locations/european-forest-road/lock.md`](./locations/european-forest-road/lock.md) — forest road lock
- [`art-direction/forest-race-grade.md`](./art-direction/forest-race-grade.md) — color grading reference
- [`directions/core-forest-chase.md`](./directions/core-forest-chase.md) — core chase direction
- [`scenes/01-forest-race/_archive/`](./scenes/01-forest-race/_archive/) — old concept docs (pre-wedding-narrative). Footage preserved in `scenes/01-forest-race/shots/*/videos/`.
