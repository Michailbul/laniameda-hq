# Nano Banana 2 / Pro — Prompting Guide & Techniques

Sources:
- Official guide: https://dev.to/googleai/nano-banana-pro-prompting-guide-strategies-1h9n
- Curated prompts repo: https://github.com/ZeroLu/awesome-nanobanana-pro

---

## THE GOLDEN RULES (most important)

NB2 is a **Thinking model** — it understands intent, physics, composition. Stop using tag soups.

### 1. Edit, don't re-roll
If an image is 80% right, ask for the specific fix. Don't regenerate from scratch.
> "That's great, but change the lighting to sunset and make the text neon blue."

### 2. Use full sentences, not keyword lists
❌ `cool car, neon, city, night, 8k`
✅ `A cinematic wide shot of a futuristic sports car speeding through a rainy Tokyo street at night. The neon signs reflect off the wet pavement and the car's metallic chassis.`

### 3. Be specific on every dimension
- **Subject:** Not "a woman" → "a sophisticated elderly woman wearing a vintage chanel-style suit"
- **Materiality:** "matte finish", "brushed steel", "soft velvet", "crumpled paper"
- **Lighting:** define the mood + source
- **Format/ratio:** always specify

### 4. Give context (the "why" or "for whom")
The model uses context to make artistic decisions automatically.
> "Create an image of a sandwich for a Brazilian high-end gourmet cookbook."
→ Model infers professional plating, shallow DOF, perfect lighting.

---

## CAPABILITY MODULES + EXAMPLE PROMPTS

### 1. Text Rendering

NB2 renders accurate, legible, stylized text natively. Use for: signage, overlays, localization, branded text.

**In-image text + localization:**
> "Take this concept and localize it to a Tokyo setting, including translating the tagline into Japanese. Change the background to a bustling Shibuya street at night."

**Branded text overlay:**
> "Overlay massive, pop-style text: 'Done in 3 mins!'. Use a thick white outline and drop shadow."

---

### 2. Character Consistency / Viral Thumbnails

Best practice: explicitly state "Keep the person's facial features exactly the same as Image 1."

**Viral Thumbnail (identity + text + graphics):**
> "Design a viral video thumbnail using the person from Image 1. Face Consistency: Keep the person's facial features exactly the same as Image 1, but change their expression to look excited and surprised. Action: Pose the person on the left side, pointing their finger towards the right side of the frame. Subject: On the right side, place a high-quality image of a delicious avocado toast. Graphics: Add a bold yellow arrow connecting the person's finger to the toast. Text: Overlay massive, pop-style text in the middle: 'Done in 3 mins!'. Use a thick white outline and drop shadow. Background: A blurred, bright kitchen background. High saturation and contrast."

**Multi-character story (group consistency):**
> "Create a funny 10-part story with these 3 fluffy friends going on a tropical vacation. The story is thrilling throughout with emotional highs and lows and ends in a happy moment. Keep the attire and identity consistent for all 3 characters, but their expressions and angles should vary throughout all 10 images. Make sure to only have one of each character in each image."

**Brand Asset Batch (9 editorial shots):**
> "Create 9 stunning fashion shots as if they're from an award-winning fashion editorial. Use this reference as the brand style but add nuance and variety to the range so they convey a professional design touch. Please generate nine images, one at a time."

---

### 3. Grounding with Google Search (real-time data)

**Real-time data visualization:**
> "Visualize the current stock value of the main tech companies and the current trends. For each add some explanation on what happened recently which could explain that trend."

**Event-based infographic:**
> "Generate an infographic of the best times to visit the U.S. National Parks in 2025 based on current travel trends."

---

### 4. Editing / Restoration / Colorization

**Object removal + in-painting:**
> "Remove the tourists from the background of this photo and fill the space with logical textures (cobblestones and storefronts) that match the surrounding environment."

**Manga colorization:**
> "Colorize this manga panel. Use a vibrant anime style palette. Ensure the lighting effects on the energy beams are glowing neon blue and the character's outfit is consistent with their official colors."

**Localization (text translate + cultural adapt):**
> "Take this concept and localize it to a Tokyo setting, including translating the tagline into Japanese. Change the background to a bustling Shibuya street at night."

**Seasonal lighting swap:**
> "Turn this scene into winter time. Keep the house architecture exactly the same, but add snow to the roof and yard, and change the lighting to a cold, overcast afternoon."

---

### 5. Dimensional Translation (2D ↔ 3D)

**2D floor plan → 3D interior design board:**
> "Based on the uploaded 2D floor plan, generate a professional interior design presentation board in a single image. Layout: A collage with one large main image at the top (wide-angle perspective of the living area), and three smaller images below (Master Bedroom, Home Office, and a 3D top-down floor plan). Style: Apply a Modern Minimalist style with warm oak wood flooring and off-white walls across ALL images. Quality: Photorealistic rendering, soft natural lighting."

---

### 6. Photorealism / Professional Headshots

**Professional headshot (with face lock):**
> "Keep the facial features of the person in the uploaded image exactly consistent. Dress them in a professional navy blue business suit with a white shirt. Background: clean, solid dark gray studio photography backdrop with subtle gradient vignette. Shot on a Sony A7III with an 85mm f/1.4 lens. Lighting: classic three-point setup — key light with soft defining shadows, subtle rim light to separate subject from background. Render natural skin texture with visible pores. Add natural catchlights to the eyes. Fabric should show subtle wool texture. Ultra-realistic, 8K."

**Cinematic nostalgic portrait (Kodak Portra style):**
> "Without changing her original face, create a portrait captured with a 1990s-style camera using a direct front flash. Messy dark brown hair tied up, calm yet playful smile. Oversized cream sweater. Background: dark wall covered with aesthetic magazine posters and stickers — cozy bedroom atmosphere under dim lighting. The 35mm lens flash creates a nostalgic glow."

**Group celebrity editorial:**
> "Create a hyper-realistic, ultra-sharp, full-color large-format image featuring a massive group of celebrities from different eras, all standing together in a single wide cinematic frame. GENERAL STYLE & MOOD: Photorealistic, 8k, shallow depth of field, soft natural fill light + strong golden rim light. High dynamic range, calibrated color grading. Skin tones perfectly accurate. Crisp fabric detail with individual threads visible. Balanced composition, slightly wide-angle lens (35mm), center-weighted. All celebrities interacting naturally. THE ENVIRONMENT: A luxurious open-air rooftop terrace at sunset overlooking a modern city skyline."

---

## KEY TECHNIQUE SUMMARY

| Technique | How to use it |
|---|---|
| Identity Locking | "Keep the person's facial features exactly the same as Image 1" |
| Conversational editing | Start 80% right, iterate with specific requests |
| Context injection | State the purpose/audience → model infers style automatically |
| JSON-structured prompts | Use JSON object for complex scenes with many attributes |
| Materiality descriptors | "matte finish", "brushed steel", "crumpled paper" |
| Search grounding | Ask for real-world data → model pulls current info |
| Dimensional translation | Give 2D input, request 3D output (or vice versa) |
| Batch storytelling | "Generate 9 images one at a time" for consistent series |

---

## Resources
- GitHub curated prompts: https://github.com/ZeroLu/awesome-nanobanana-pro
- Official dev guide: https://dev.to/googleai/nano-banana-pro-prompting-guide-strategies-1h9n
- AI Studio (test prompts live): https://aistudio.google.com
- Model ID: `gemini-3.1-flash-image-preview` (NB2) / `gemini-3-pro-image-preview` (NB Pro)
