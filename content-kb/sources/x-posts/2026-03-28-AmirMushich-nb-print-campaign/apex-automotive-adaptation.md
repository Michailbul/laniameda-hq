# APEX Automotive Adaptation — Nano Banana Print Campaign Template
Based on: @AmirMushich smart prompt (2026-03-28)
Adapted by: Apex / Laniameda
Model: Nano Banana Pro

---

## WHAT CHANGED FROM THE ORIGINAL

The original is fashion-oriented — handbag editorial logic. Cars need different treatment:

| Fashion original | Automotive APEX |
|---|---|
| 9:16 vertical | 16:9 horizontal OR 4:5 for social |
| Product cropped 60-75% | Full silhouette visible — cars are read whole |
| Enters bottom-right at 25-35° | Front 3/4 or rear 3/4, planted stance, all 4 wheels on plane |
| Leather/fabric material | Painted metal, glass, chrome, rubber |
| Softbox 1.2:1 ratio | Broader lighting range — paintwork needs reflectance to show form |
| No specular on leather | Specular on glass + chrome = essential |
| f/16 everything sharp | f/8–f/11 — slight depth on bg acceptable, car tack-sharp |

---

## THE PROMPT — APEX AUTOMOTIVE VERSION

**[BRAND NAME] + [MODEL NAME]**

Act as a Senior Automotive Art Director and Commercial Photographer specializing in hero product visuals for launch campaigns, press materials, and brand print advertising.

**PHASE 1: FORMAT & CANVAS**

Horizontal format, 16:9 aspect ratio (or 4:5 for mobile/social variant).
Canvas background: a single flat field of warm off-white. Target tone: soft ivory cream (#F4EFE6 equivalent), uniform across the entire plane. No environmental lighting, no horizon, no gradient sweep — pure studio infinite cove.

Autonomously determine [BRAND NAME]'s official brand neutral — if the brand uses a specific warm white or warm grey in press photography and brochure backgrounds (e.g. Porsche's warm linen, Ferrari's Bianco, Rolls-Royce's Silver Satin), shift the canvas to that exact tone.

**PHASE 2: BACKGROUND CREST (WATERMARK LAYER)**

Autonomously identify [BRAND NAME]'s official crest, shield, or heraldic emblem:
- Porsche → Stuttgart coat of arms / horse rampant within shield
- Ferrari → Prancing Horse (cavallino rampante) within shield
- Rolls-Royce → Spirit of Ecstasy silhouette / double-R monogram
- Lamborghini → Raging bull within shield
- BMW → Roundel
- Bentley → Flying B wings / encircled B

Render the crest as a tone-on-tone ghost across the center-background:
- Scale: crest fills 50-70% of canvas height — large, commanding, heraldic
- Opacity: 6-12% — visible on close inspection, not on first glance
- Value shift: 8-12% lighter or darker than background base
- No hard edges, no color saturation — fully desaturated, monochrome blend
- Position: centered or slightly right of center, behind the vehicle
- It must recede — the car is the subject, the crest is the context

**PHASE 3: BRAND MARK PLACEMENT**

Reproduce [BRAND NAME]'s official wordmark or emblem with complete fidelity.
Position: upper-left corner, not centered (automotive print convention vs fashion centering).
Scale: wordmark spans 20-28% of canvas width — restrained, confident.
Rendering: flat 2D, single brand color. No chrome extrusion.
Below wordmark: model designation in geometric sans-serif, tracking +150, reduced weight — e.g. "911 CARRERA", "SF90 STRADALE", "PHANTOM VIII".

**PHASE 4: VEHICLE PLACEMENT**

Render [MODEL NAME] as a photorealistic production vehicle:

Material fidelity requirements:
— Paint: metallic flake or solid coat with correct specular response and clear-coat depth. No plastic-smooth AI normals.
— Glass: semi-transparent with interior shadow suggestion. Correct Fresnel angle response.
— Chrome/polished metal: micro-reflections of studio environment only.
— Rubber: matte black with tread detail visible on outer sidewall.
— Interior: visible through glass in correct proportion, not over-detailed.

Placement:
- Preferred angle: front 3/4 (driver's side forward), 30-35° off-axis — shows nose, headlight signature, shoulder line, and wheel
- Alternative: rear 3/4 — menace, taillight drama, width
- The complete vehicle is visible — no editorial crop. All four wheels touch the ground plane.
- Vehicle positioned slightly right of canvas center, providing breathing room left for brand mark
- Wheel stance: planted. No jacked suspension, no lifted look. Correct OEM ride height.
- Ground plane: same ivory/cream tone as background with a seamless cove join — no visible horizon line
- Contact shadow: soft, directional, opacity 10-15% beneath chassis. Not a hard drop shadow — a ground anchor.

**PHASE 5: LIGHTING**

Primary: large overhead softbox, slightly front-left — fills the top shoulder of the body cleanly.
Secondary: large bounce panel from right — eliminates harsh shadows, preserves form reading in the side bodyline.
Accent: thin edge light from rear-right — separates vehicle from background, defines the C-pillar and rear quarter.

Color temperature: 5500K neutral daylight.

Paintwork philosophy: lighting must reveal the body sculpture — every crease, haunch, and vent shadow must read. Use the reflectance of the paint to draw the eye across the car's form. Reflections show studio only — no fake sky, no road reflections.

Glass: 20-30% transmission. Interior detail visible but not competing with exterior.
Chrome: micro-specular only. No blown-out highlights.
Headlights/taillights: unit detail visible, unlit (ambient only). Not glowing.

**PHASE 6: TYPOGRAPHY & FINISHING**

Bottom-right corner: model designation line — [MODEL NAME] in brand typeface or geometric sans-serif, tracking +200, small-caps or all-caps.
Below: a single product URL or campaign tagline — e.g. "porsche.com • 911 Carrera" — in reduced weight, tracking +100.
Optional: thin 1px horizontal rule, brand color, spanning 30% canvas width, above the text block.

No other graphic elements. No overlaid icons. No watermarks on the vehicle itself.

**TECH SPECS**

Render aesthetic: automotive CGI / production visualization — CGI studio standard (KeyShot / VRED / Octane).
Resolution: 16:9, ultra-high detail.
Depth of field: f/8 equivalent — vehicle tack-sharp from bumper to bumper. Background may have minimal softness (not bokeh — just off-focus cove).
Tone mapping: clean, accurate. No filmic color grade. No vignette. No grain. No lens flare.
Color grade: faithful to production color. Slight warmth in background ivory only.
Micro-detail: surface imperfections on paint (dust motes, fingerprint-free but real). Panel gap geometry must be correct.

Mood reference: Porsche official press photography / Ferrari press kit / Rolls-Royce brochure photography standard. Clean enough to run in Robb Report or AutoWeek without retouching.

---

## QUICK-FIRE BRAND SUBSTITUTIONS

| Brand | Crest watermark | Canvas tone | Brand color |
|---|---|---|---|
| Porsche | Stuttgart shield + horse | Warm linen | Black/gold |
| Ferrari | Prancing horse shield | Warm white | Rosso Corsa / black |
| Rolls-Royce | Spirit of Ecstasy / RR | Silver satin | Black |
| Lamborghini | Raging bull shield | Cool white | Black/gold |
| BMW M | Roundel | Warm grey | Blue/red |
| Bentley | Flying B wings | Warm cream | Dark green |
| Maserati | Trident | Off-white | Blue |

---

## APEX SHOT FAMILIES THIS ENABLES

1. **Hero still** — single car, full studio, press-quality
2. **Brand lockup** — car + logo + model name, print-ready
3. **Launch key visual** — new model announcement, no context needed
4. **Spec variant series** — same template, swap model + color → full lineup
5. **Social 4:5 cut** — same prompt, change aspect ratio → Instagram/LinkedIn post

---

## WHAT TO WATCH FOR IN NB

- NB may hallucinate incorrect crests or get the shield wrong → provide reference image with `--input-image`
- Wheel arch fill can go wrong → specify "production ride height, correct OEM wheel arch gap"
- Glass can go too dark or too transparent → specify "30% transmission, interior shadow visible"
- Paint can go plastic → add "metallic flake clear-coat, subsurface specular response, not smooth CG"
