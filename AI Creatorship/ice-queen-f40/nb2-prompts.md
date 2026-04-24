---
kind: workflow
id: chinese-ferrari-perfume-nb2-prompts
title: Chinese Ferrari Perfume Nano Banana Pro Prompts
applies_to: image
model: nano-banana-pro
---
# Nano Banana Pro Prompts — Simple

Stripped to basics. Use the locks file as identity reference; feed `@img-1` as `--input-image` for character shots.

---

## R1 — Elevator mid-turn
**Input:** `@img-1`

```
East Asian woman mid-turn inside private elevator, long black hair whipping across cheek, cold aloof chin-lifted expression, black high-neck bodysuit with deep V-split, black opera gloves, molten silver chest clasp with chain, silver drip earrings, long black talon nails. Polished black lacquer walls, deep blood-red atmospheric wash, warm tungsten key from high right, cool blue rim, crushed black shadows. Cinematic anamorphic 2.39:1, 35mm film grain, editorial fashion film. Avoid: neon, daylight, smile, cigarette, logos, crowd.
```

---

## R2 — Claw hand on elevator wall

```
Extreme macro of black-gloved hand with long pointed metallic-black talon nails, fingers spread mid-flex, reaching toward polished black lacquer wall, silver chain at wrist edge. Deep red atmospheric wash, warm tungsten key, crushed shadow under hand. 100mm macro, razor-thin depth of field, anamorphic 2.39:1, 35mm film grain. Avoid: face, full body, daylight, neon, cyan, teal, cigarette.
```

---

## R3 — Silver earring profile
**Input:** `@img-1`

```
Macro profile of woman's right ear and neck, sculptural molten-silver drip earring mid-sway, single dark hair strand across earlobe, porcelain matte skin with visible pore texture, sharp jaw. Deep red atmospheric wash, warm tungsten key from high right carving jaw, cool blue rim on earring back. 100mm macro, razor-thin depth of field, anamorphic 2.39:1, 35mm film grain, perfume ad aesthetic. Avoid: cyan, teal, eye visible, face straight-on, daylight, cigarette.
```

---

## R4 — Reflection in elevator wall
**Input:** `@img-1`

```
East Asian woman in private elevator, half face in real and half reflected against polished black lacquer wall, mid-adjustment gesture with black-gloved hand lifted toward her reflection, long black hair, cold expression, black high-neck bodysuit with V-split, silver chest clasp, silver drip earrings, black talon nails. Deep red atmospheric wash, warm tungsten key, crushed shadows along reflection seam. Anamorphic 2.39:1, shallow depth of field, 35mm film grain, editorial fashion film. Avoid: mirror frame, daylight, multiple people, smile, cigarette.
```

---

## R5 — Close profile chin-lift
**Input:** `@img-1`

```
Tight profile close-up of East Asian woman, chin lifted in disdain, long black hair across collarbone, single hair strand across rose-nude lips, eyes half-closed mid-exhalation, porcelain matte skin, sharp jaw, silver drip earring visible. Polished black lacquer elevator corner, deep red atmospheric wash, warm tungsten key from high right, cool blue rim on back of head, crushed shadow under jaw. 85mm lens, shallow depth of field, anamorphic 2.39:1, 35mm film grain, perfume ad aesthetic. Avoid: full body, daylight, smile, symmetrical front framing, cigarette.
```

---

## G1 — F40 Tokyo street wide

```
1987 Ferrari F40 parked on quiet Tokyo side street in daylight, three-quarter front angle, deep gloss-black lacquer paint, dark five-spoke wheels in matte dark bronze, pop-up headlights closed, fixed rear wing, NACA side ducts, triple exhaust, low stance, Japanese license plate. Overcast diffused daylight, cool gray sky, gentle specular highlights. Mid-rise glass architecture in soft focus, gray paving stones, yellow tactile strip along curb, empty street. 35mm lens, deep focus, anamorphic 2.39:1, 35mm film grain, automotive editorial cinematic realism. Avoid: rain, night, neon, harsh sun, sunset, crowds, body kits, aftermarket rims, cherry blossoms.
```

---

## G2 — Character walking past F40
**Input:** `@img-1`

```
East Asian woman walking in full stride along Tokyo sidewalk in daylight, side profile to camera, chin lifted, gaze locked forward, not looking at the car. 1987 deep gloss-black Ferrari F40 with dark five-spoke wheels tracking parallel just beyond the curb. Black high-neck bodysuit with V-split, black opera gloves, silver chest clasp with chain, silver drip earrings, black talon nails, black satin wide-leg trousers with ankle slit, patent black stiletto pumps, long black hair swept by motion. Overcast cool daylight, soft directional key. Gray paving stones, yellow tactile strip, mid-rise architecture in soft focus. 50mm lens, medium-wide parallel tracking shot, anamorphic 2.39:1, 35mm film grain, Japanese fashion film aesthetic. Avoid: rain, night, neon, smile, looking at car, cigarette, crowd, cherry blossoms.
```

---

## G3 — Stiletto strike on paving stone

```
Extreme low-angle macro of pointed patent-black stiletto pump striking gray Tokyo paving stones, heel mid-impact, ankle and lower calf visible with black satin trouser fluttering, yellow tactile strip along edge of frame. Deep gloss-black 1987 Ferrari F40 with dark five-spoke wheels in deep rack-focus background. Overcast cool daylight, soft diffused key, specular highlight on patent leather, crushed shadow under heel. 50mm lens, razor-thin depth of field, anamorphic 2.39:1, 35mm film grain, automotive editorial macro. Avoid: rain, puddles, wet reflections, night, neon, sunset, cherry blossoms, multiple shoes, cigarette.
```

---

## G4 — Claw hand on F40 door handle

```
Extreme close-up of black-gloved hand with long pointed metallic-black talon nails reaching and gripping flush door handle of 1987 Ferrari F40, deep gloss-black door panel filling frame, fingers curling around handle with glove-material tension, talon tip catching reflection of overcast sky. Soft directional daylight from above right, gentle specular on handle and glove knuckles, crushed shadow under hand. 85mm macro, shallow depth of field, anamorphic 2.39:1, 35mm film grain, automotive fashion editorial macro. Avoid: warm gold, sunset, neon, rain, night, multiple hands, visible logos, face, cigarette.
```

---

## G5 — F40 dashboard

```
Interior of 1987 Ferrari F40 from driver's perspective, analog Veglia round gauges in center dash with red-accented tachometer needle at idle, carbon fiber dash panels with visible weave, exposed chrome-gate manual shifter with six-slot gate pattern and round black knob on center console, keyed ignition port, lightweight black fabric racing bucket seats at frame edges, period-correct 1987 analog cockpit. Soft cool daylight through windscreen, gentle ambient fill, warm specular on chrome gate. 35mm lens, medium close-up driver POV, deep focus, anamorphic 2.39:1, 35mm film grain, automotive editorial cinematic realism. Avoid: digital screens, push-start, touchscreens, leather quilting, sunset, neon, aftermarket parts, passenger.
```

---

## Run Commands

Draft (1K):
```bash
uv run ~/skills/nano-banana-pro/scripts/generate_image.py --prompt "<paste>" --filename "ice-queen-R1-draft.png" --resolution 1K --input-image "path/to/img-1.png"
```

Final (4K, after lock):
```bash
uv run ~/skills/nano-banana-pro/scripts/generate_image.py --prompt "<paste>" --filename "ice-queen-R1-final.png" --resolution 4K --input-image "path/to/img-1.png"
```

Run each shot 3-5x, pick winners.
