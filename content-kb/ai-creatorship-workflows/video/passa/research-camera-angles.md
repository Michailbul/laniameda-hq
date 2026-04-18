# PASSA — Camera Angle & Prompt Research
> Findings from web research. Automotive AI cinematography techniques, angle vocabulary, and prompt strategies.
> Use this as a reference when building new prompts for stills (NB Pro) and video (Seedance).

---

## PROMPT ANATOMY (3 layers, always)

Every strong automotive AI prompt needs all three:

1. **Subject** — vehicle model + action state (parked / driving / speeding / cornering / sliding)
2. **Style** — camera type, film stock, lens reference, time of day, weather
3. **Technical** — aspect ratio, grain, depth of field, motion blur behavior

---

## CAMERA ANGLE VOCABULARY

### Standard Angles
| Angle | Effect | Use for |
|---|---|---|
| **Low angle** | Dominant, powerful, imposing | Any hero shot of the car |
| **Eye level** | Natural, neutral, relatable | Studio shots, detail shots |
| **High angle / bird's eye** | Scale, geography, context | Aerial hairpin, environment establishing |
| **Worm's eye view** | Ground looks up, everything towers | Under-car, tarmac ricochet, extreme drama |
| **Dutch angle / canted** | Diagonal, tension, speed instability | Action shots, chase sequences |
| **Satellite / overhead** | Pure geometry, road pattern as design | Hairpin overhead, track overhead |

### Distance / Framing
| Frame | Use |
|---|---|
| **Extreme close-up / macro** | Detail, texture, engineering (taillights, badges, vents) |
| **Close-up** | Identity shot — headlight signature, wheel, exhaust tip |
| **Medium shot** | Car with partial environment context |
| **Wide shot** | Car in full environment — scale, location character |
| **Extreme wide** | Car as element in vast landscape |

### Movement Types (Seedance-ready terms)
| Move | Effect |
|---|---|
| `slow dolly-in` | Builds intensity, reveals subject |
| `dolly out / pull-back` | Reveals environment, scale |
| `tracking shot` | Follows subject — classic automotive pan/glide |
| `orbit around subject` | 360° stylized rotation, premium reverence |
| `handheld slight shake` | Documentary urgency, naturalism |
| `aerial pull-back` | Epic scale reveal |
| `tilt up from ground` | Dramatic reveal from road surface to full car |
| `crash zoom` | Shock, urgency, speed |

---

## TECHNIQUES FROM REAL AUTOMOTIVE FILMING

### Panning Shot
Camera fixed on a tripod, car moves through frame. Slow shutter speed. Car sharp, background blurs into horizontal speed streaks. The background does the work — not motion blur on the car itself. Add: `panning shot, slow shutter, car sharp, background motion-blurred into horizontal streaks`

### Suction Mount / Car-Mounted Camera
Camera physically attached to the car body. Everything shakes with road vibration. World moves, car body is the fixed reference. Positions:
- Hood cam (looking forward over the nose)
- Door cam (looking rearward along body)
- Wheel arch (looking out through wheel)
- Undercarriage (looking at road beneath)

### Long Lens Compression
Camera 300–400m away with telephoto. Car flattened into landscape. Mountains appear stacked directly behind car. Heat haze between camera and subject. `extreme telephoto compression, 600mm, heat shimmer over road surface, mountains compressed behind car`

### Dutch Tilt Tracking
Car in motion, camera tilted 15–25 degrees off horizontal. Horizon diagonal. Use sparingly — at right moment it amplifies speed more than any other technique. `camera tilted 20 degrees, dutch angle, horizon diagonal, car tracking through tilted frame`

### 15–30 Degree Down Angle
Best standard product angle for cars — slightly elevated, looking slightly down. Shows both top surface (hood, roof) and front face simultaneously. `camera at 15 degree downward angle, elevated slightly, looking down onto hood and front fascia`

---

## AI-ONLY TECHNIQUES (impossible with real camera)

### Slow Orbit at Speed
Car moving at full speed while camera simultaneously orbits 360° around it. Physically impossible. In AI: `camera orbiting full 360 degrees around the car while car is simultaneously at speed, world blurring with motion, car sharp`

### Tire Contact Patch
Camera beneath the car at the exact point where tire meets tarmac. `camera positioned at tire contact patch, extreme macro of rubber deforming against road surface, car body above in bokeh, physically impossible angle`

### Car Shadow Tracking
Camera tracks the shadow of the car on road surface rather than the car. `camera locked on car's shadow on tarmac, shadow is the subject, car soft above frame, shadow shows perfect body silhouette`

### Interior Fisheye / Cockpit POV
Ultra-wide fisheye from inside cockpit. Steering wheel in extreme foreground, road rushing to vanishing point through windscreen. `interior ultra-wide fisheye, steering wheel extreme foreground, road rushing through windscreen, tunnel effect`

### Rearview Mirror POV
Camera looks at the rearview mirror — road receding in the reflection is the subject. `camera looking at rearview mirror, mirror reflection shows road receding behind car, shallow DOF, mirror sharp`

---

## LIGHTING VOCABULARY (descriptive not technical)

Instead of photography jargon, use descriptive phrases that AI models read better:

| Instead of | Use |
|---|---|
| Butterfly lighting | Light from directly above |
| Rembrandt lighting | Single light from 45 degrees, strong shadow on one side |
| Rim lighting | Light from behind, outlining the subject |
| Fill light | Soft light from opposite side of key light |
| Golden hour | Sun at horizon, warm amber, long shadows |
| Blue hour | 20 minutes after sunset, deep blue sky, no harsh shadows |
| Volumetric light | Light visible as physical beam through atmosphere |

---

## SPEED LANGUAGE

Add these to any car-in-motion prompt to push speed reading:
- `200 MPH implied speed`
- `directional motion blur on environment`
- `speed lines`
- `road surface motion blur`
- `flowers blurring into horizontal streaks`
- `kinetic, mid-motion, already at speed`
- `slipstream visible in air behind rear diffuser`

---

## FILM / LENS REFERENCES THAT WORK

| Reference | Effect |
|---|---|
| `Kodak Portra 400` | Warm, skin-friendly, slightly desaturated |
| `Fujifilm Velvia` | High saturation, punchy, landscape-oriented |
| `anamorphic 2.39:1` | Letterbox, horizontal lens flares, cinema feel |
| `35mm grain` | Classic film texture, not digital clean |
| `600mm telephoto` | Compression, flatness, heat haze |
| `16mm macro` | Extreme close-up, shallow DOF, organic grain |
| `8mm fisheye` | Extreme distortion, interior/immersive |

---

## SEEDANCE-SPECIFIC FINDINGS

- Seedance responds accurately to **professional cinematography terminology** — use real camera terms
- `same character/car throughout all shots` is the most important consistency lock
- **Timecodes** `[0s] [3s] [6s]` are required for multi-shot — without them the sequence becomes mushy
- **Action must already be underway at [0s]** — never open with stillness unless intentional tension
- Reference video technique: feed a reference video + car image to replicate camera movement patterns
- Physics must be **explicitly named** — `water splashing with surface tension`, `flower petals reacting to slipstream`, `dust displacement`
- Max 3 shots per prompt before character/car drift becomes a problem

---

## SOURCE REFERENCES

- [Awesome Seedance 2.0 Prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)
- [Car Commercial Cinematography — Seedance 2.0](https://www.atlascloud.ai/seedance-2-prompt/17)
- [Ad-worthy automotive shots with AI — Medium](https://medium.com/@davezillamedia/how-to-create-ad-worthy-automotive-shots-with-ai-8ea52a924490)
- [42 AI Camera Angle Prompts](https://zsky.ai/blog/ai-camera-angle-prompts)
- [Seedance 2.0 Prompt Guide](https://www.seedance.tv/blog/seedance-2-0-prompt-guide)
- [Dutch Tilt in Motorsport Photography](https://www.motorsportphotographer.com/what-is-dutch-tilt-and-how-can-you-use-it-to-convey-speed-in-motorsport-photography/)
- [Car Photography Tips — Armin Ausejo](https://www.arminausejo.com/car-photography-tips/)

---

---

## SAVED PROMPT FRAGMENTS (reusable templates)

**15-second continuous arc (no cuts)**
```
15-second continuous single-shot action sequence. No cuts. No scene transitions. Hyper-realistic cinematic automotive, large-scale aerodynamic physics, volumetric exhaust heat simulation, heat distortion rising from quad pipes, dynamic airflow visible over bodywork, atmospheric perspective. Single continuous subject: [CAR IDENTITY LOCK]. Camera arc: front three-quarter → side profile → rear three-quarter in one unbroken move. [environment]. Global: anamorphic 2.39:1, car identity locked every frame, wheel contact maintained, 35mm grain.
```

**Freeze time / bullet time weave**
```
Use image as the starting frame for a single, continuous shot in freeze time. The camera dramatically weaves through the completely frozen scene. [describe what is frozen — car mid-corner, flowers suspended mid-blur, pollen cloud frozen in air, exhaust shimmer locked]. Camera moves freely through the frozen world — close to the paint, under the car, around the taillights — all in one unbroken move. Then time snaps back to full speed.
```

---

*Created: 2026-04-12 | Project: PASSA | Owner: Michael / Apex*
