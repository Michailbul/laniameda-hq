---
kind: workflow
id: chinese-ferrari-perfume-midjourney-prompts
title: Chinese Ferrari Perfume Midjourney Prompts
applies_to: image
model: midjourney
---
# Midjourney Prompts — Simple

Stripped to basics. End every prompt with `--ar 21:9 --style raw --s 250` (adjust stylize per shot taste).

Add `--cref <img-1-url> --cw 100` to character shots for face lock.
Add `--sref <img-1-url> --sw 50` for red mood transfer if needed.

---

## R1 — Elevator mid-turn

```
East Asian woman mid-turn in private elevator, long black hair whipping across cheek, cold aloof chin-lifted expression, black high-neck bodysuit with V-split, black opera gloves, silver chest clasp with chain, silver drip earrings, black talon nails, polished black lacquer walls, deep red atmospheric wash, warm tungsten key, cool blue rim, anamorphic, 35mm film grain, editorial fashion film --ar 21:9 --style raw --s 300
```

---

## R2 — Claw hand on elevator wall

```
Extreme macro of black-gloved hand with long pointed metallic-black talon nails, fingers spread mid-flex reaching toward polished black lacquer wall, silver chain at wrist, deep red atmospheric wash, warm tungsten key, crushed shadow under hand, 100mm macro, razor-thin depth of field, anamorphic, 35mm film grain --ar 21:9 --style raw --s 250
```

---

## R3 — Silver earring profile

```
Macro profile of woman's right ear and neck, sculptural molten-silver drip earring mid-sway, single dark hair strand across earlobe, porcelain matte skin with pore texture, sharp jaw, deep red atmospheric wash, warm tungsten key carving jaw, cool blue rim on earring, 100mm macro, razor-thin depth of field, anamorphic, 35mm film grain, perfume ad aesthetic --ar 21:9 --style raw --s 250
```

---

## R4 — Reflection in elevator wall

```
East Asian woman in private elevator, half face real and half reflected in polished black lacquer wall, black-gloved hand lifted toward reflection mid-adjustment, long black hair, cold expression, black bodysuit with V-split, silver chest clasp, silver drip earrings, black talon nails, deep red atmospheric wash, warm tungsten key, doubling composition, anamorphic, 35mm film grain, editorial fashion film --ar 21:9 --style raw --s 300
```

---

## R5 — Close profile chin-lift

```
Tight profile close-up of East Asian woman, chin lifted in disdain, long black hair across collarbone, single hair strand across rose-nude lips, eyes half-closed, porcelain matte skin, sharp jaw, silver drip earring, polished black lacquer elevator corner, deep red atmospheric wash, warm tungsten key from high right, cool blue rim, crushed shadow under jaw, 85mm lens, anamorphic, 35mm film grain, perfume ad aesthetic --ar 21:9 --style raw --s 350
```

---

## G1 — F40 Tokyo street wide

```
1987 Ferrari F40 parked on quiet Tokyo side street, three-quarter front angle, deep gloss-black lacquer paint, dark five-spoke wheels in matte dark bronze, pop-up headlights closed, fixed rear wing, NACA side ducts, triple exhaust, low stance, Japanese license plate, overcast diffused daylight, cool gray sky, mid-rise glass architecture in soft focus, gray paving stones, yellow tactile strip along curb, empty street, 35mm lens, anamorphic, 35mm film grain, automotive editorial cinematic realism --ar 21:9 --style raw --s 200
```

---

## G2 — Character walking past F40

```
East Asian woman walking in full stride along Tokyo sidewalk in daylight, side profile, chin lifted, gaze forward not looking at car, 1987 deep gloss-black Ferrari F40 with dark five-spoke wheels tracking parallel beyond curb, black high-neck bodysuit with V-split, black opera gloves, silver chest clasp with chain, silver drip earrings, black talon nails, black satin wide-leg trousers with ankle slit, patent black stiletto pumps, long black hair swept by motion, overcast cool daylight, gray paving stones, yellow tactile strip, mid-rise architecture in soft focus, 50mm lens, parallel tracking shot, anamorphic, 35mm film grain, Japanese fashion film aesthetic --ar 21:9 --style raw --s 300
```

---

## G3 — Stiletto strike on paving stone

```
Extreme low-angle macro of pointed patent-black stiletto pump striking gray Tokyo paving stones, heel mid-impact, ankle and lower calf with black satin trouser fluttering, yellow tactile strip along edge of frame, deep gloss-black 1987 Ferrari F40 with dark five-spoke wheels in deep rack-focus background, overcast cool daylight, specular highlight on patent leather, crushed shadow under heel, 50mm lens, razor-thin depth of field, anamorphic, 35mm film grain, automotive editorial macro --ar 21:9 --style raw --s 250
```

---

## G4 — Claw hand on F40 door handle

```
Extreme close-up of black-gloved hand with long pointed metallic-black talon nails reaching and gripping flush door handle of 1987 Ferrari F40, deep gloss-black door panel filling frame, fingers curling around handle with glove tension, talon tip catching sky reflection, soft directional daylight from above right, gentle specular on handle and knuckles, crushed shadow under hand, 85mm macro, shallow depth of field, anamorphic, 35mm film grain, automotive fashion editorial macro --ar 21:9 --style raw --s 250
```

---

## G5 — F40 dashboard

```
Interior of 1987 Ferrari F40 from driver's perspective, analog Veglia round gauges in center dash with red tachometer needle at idle, carbon fiber dash panels with visible weave, exposed chrome-gate manual shifter with six-slot gate pattern and round black knob, keyed ignition port, lightweight black fabric racing bucket seats at frame edges, period-correct 1987 analog cockpit, soft cool daylight through windscreen, warm specular on chrome gate, 35mm lens, medium close-up driver POV, deep focus, anamorphic, 35mm film grain, automotive editorial cinematic realism --ar 21:9 --style raw --s 200
```

---

## MJ Notes

- Stylize tuned per shot: 200 for automotive realism, 250 for macros, 300 for full character beats, 350 for hero portrait moments
- Run each prompt 4x via `--repeat 4` or manual reroll, pick winners
- Add `--cref` to R1, R4, R5, G2 for face lock once you have the img-1 URL
- Pass MJ winners through Nano Banana for realism polish if needed (mj-nb2-pipeline skill)
