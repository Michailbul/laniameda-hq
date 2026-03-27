# Prompts — AI Samson Character Consistency

Source: https://www.youtube.com/watch?v=G01kghX152g

---

## Character Sheet Prompt (core — exact from video description)
Prompts gated behind email signup (https://delightfuldesign.eo.page/5m7md)
The transcript describes the prompt as:
- Defines a specific multi-angle layout (front, side, 3/4, back, face front, face profile)
- Specifies hyperrealistic style (not 3D render)
- Designed to work in Google Flow with an image reference upload

**Reconstruct the intent:**
```
Create a character reference sheet for [CHARACTER DESCRIPTION]. Show the character from 6 angles:
- Top row: full body front, full body side, full body three-quarter view, full body back (all head to toe, no cropping)
- Bottom row: face close-up front, face close-up profile

Style: hyperrealistic, photographic, not 3D rendered. Neutral background.
Maintain all distinctive features: [LIST SPECIFIC FEATURES — scars, tattoos, piercings, hair, clothing].
```
*(Reconstructed from transcript description — get the actual prompt from the free guide)*

---

## Full-Body Fix Prompt
Use when the sheet crops legs/feet:
```
Remake this image, ensuring the entire top row shows full body views from head to toe.
All subjects in top row must be fully visible including feet with no cropping at the ankles, knees or head.
```

---

## Outfit Change Prompt (intent)
- Insert character sheet as image reference
- Optionally insert outfit reference image as second reference
- Prompt: describe the character wearing the new outfit

---

## Lighting Change Prompt (intent)
- Insert character sheet as image reference
- Prompt: describe the desired lighting scenario
- Output: character sheet re-rendered in new lighting

---

## Aging Prompt (intent)
- Insert character sheet as image reference
- Prompt: "[CHARACTER] aged [X] years — same person, same features"
- Run for each age milestone

---

## Aging Time-lapse (Frames to Video)
```
Time-lapse between these two ages. Smooth transition. Same person throughout.
```
Frame 1: younger portrait
Frame 2: older portrait

---

## Scene Composition (Multi-character)
Method: reference both character sheets + describe the scene interaction.
Use ChatGPT to expand the scene prompt before sending to Flow:
```
[Metaprompt to ChatGPT]: Enhance this scene description for use as an AI image generation prompt.
Be specific about lighting, composition, emotional tone, and physical interaction between characters.
My scene: [brief description]
```

---

## Animation from Still (Frames to Video)
1. Generate the scene still: character sheet ref + scene prompt → output image
2. Flow → Frames to Video → use still as first frame
3. Prompt: describe the action/movement

---

## Text-Only Character (No Image Reference)
For minor characters. Faster, less control.
```
[CHARACTER DESCRIPTION — appearance, features, style, age, ethnicity].
Create a character reference sheet with 6 views: front full body, side full body, three-quarter full body, back full body, face close-up front, face close-up profile.
Hyperrealistic. Neutral background.
```
