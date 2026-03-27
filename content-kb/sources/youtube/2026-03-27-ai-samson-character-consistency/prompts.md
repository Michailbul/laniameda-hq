# Prompts — AI Samson Character Consistency

Source: https://www.youtube.com/watch?v=G01kghX152g
Prompts from: https://organic-slayer-d96.notion.site/Character-Sheet-Prompts-2f50c243208080a2b31bebeef4d6ce4e

---

## 1️⃣ Photorealistic Character Identity Sheet (Using a Reference Image)

Create a photorealistic multi-angle photographic identity sheet based strictly on the uploaded reference image.

**Prompt:**
- "Match the exact real-world appearance of the person: facial structure, proportions, skin texture, age, asymmetry, and natural imperfections."
- The result must look like real photography of a real human, not a digital character or 3D asset.
- Use a simple, neutral background, similar to a studio or indoor wall.
- The overall feeling should be documentary and natural, not stylized or cinematic.

**Layout:**
Two horizontal rows, presented as a clean photo contact sheet.
- Top row: four full-body photographs of the same person:
  1. Facing the camera
  2. Left-facing profile
  3. Right-facing profile
  4. Facing away from the camera
- Bottom row: three close-up photographic portraits:
  1. Facing the camera
  2. Left-facing profile
  3. Right-facing profile

**Pose & Body Language:**
- The subject stands naturally and casually, as a real person would when asked to stand still.
- No exaggerated stance, no rigid pose, no symmetry.
- Subtle, natural weight distribution and relaxed posture.
- Shoulders relaxed, arms resting naturally at the sides.

**Consistency & Accuracy:**
- Maintain strong identity consistency across all images.
- Preserve natural human asymmetry.
- Proportions must remain realistic and consistent without looking mechanically aligned.
- The subject should feel like the same person photographed multiple times, not a replicated model.

**Lighting & Camera:**
- Soft, neutral, real-world lighting (similar to window light or soft studio light).
- No dramatic, cinematic, or stylized lighting.
- Natural shadows with gentle falloff.
- Realistic camera perspective and lens behavior.

**Critical constraints:**
- Not a 3D render
- Not CGI
- Not a game character
- Not stylized
- Not a model turnaround

---

## 2️⃣ Photorealistic Character Identity Sheet (No Reference Image)

"Create a photorealistic photographic identity sheet of the following person:"
"[INSERT REALISTIC HUMAN DESCRIPTION HERE]"

- The subject must look like a real human photographed in the real world.
- Avoid any stylized, animated, or synthetic appearance.
- Use a simple neutral background, similar to an ID or documentary shoot.

**Layout:**
Two horizontal rows, presented as a photo contact sheet.
- Top row: four full-body photographs:
  1. Facing the camera
  2. Left-facing profile
  3. Right-facing profile
  4. Facing away
- Bottom row: three close-up portraits:
  1. Facing the camera
  2. Left-facing profile
  3. Right-facing profile

**Pose & Presence:**
- Natural stance, relaxed posture.
- No posing for presentation.
- Subtle variation in head angle and body balance, like multiple photos taken moments apart.

**Lighting & Finish:**
- Soft, neutral, realistic lighting.
- No stylization, no dramatic contrast.
- The final result should resemble real reference photography, not a character asset.

---

## 3️⃣ Changing Wardrobe (Photorealistic Edit)

Use the same photographic identity sheet as reference.

- "Maintain the exact same person: face, body, age, proportions, posture, and expression."
- "Change only the clothing to the following:"
"[INSERT OUTFIT DESCRIPTION OR REFERENCE IMAGE]"

**Constraints:**
- The clothing must behave like real fabric on a real body.
- No change to lighting, camera angle, or body posture.
- The person should still feel like the same individual photographed on the same day, just wearing different clothes.
- No stylization, no CGI look, no character redesign.

---

## 🔑 Why this works

| Old language | New language |
|--------------|--------------|
| "Character reference sheet" | "Photographic identity sheet" |
| "Model turnaround" | "Contact sheet" |
| A-pose | Natural posture |
| Mechanical perfection | Identity consistency without mechanical perfection |
| Implicit CG | Explicit suppression of CG language |

This keeps consistency but restores human realism.

---

## Full-Body Fix Prompt

Use when the sheet crops legs/feet:

Remake this image, ensuring the entire top row shows full body views from head to toe.
All subjects in top row must be fully visible including feet with no cropping at the ankles, knees or head.

---

## Aging Prompt (intent)

- Insert character sheet as image reference
- Prompt: "[CHARACTER] aged [X] years — same person, same features"
- Run for each age milestone

---

## Aging Time-lapse (Frames to Video)

Time-lapse between these two ages. Smooth transition. Same person throughout.

Frame 1: younger portrait
Frame 2: older portrait

---

## Scene Composition (Multi-character)

Method: reference both character sheets + describe the scene interaction.
Use ChatGPT to expand the scene prompt before sending to Flow:

[Metaprompt to ChatGPT]: Enhance this scene description for use as an AI image generation prompt.
Be specific about lighting, composition, emotional tone, and physical interaction between characters.
My scene: [brief description]

---

## Animation from Still (Frames to Video)

1. Generate the scene still: character sheet ref + scene prompt → output image
2. Flow → Frames to Video → use still as first frame
3. Prompt: describe the action/movement
