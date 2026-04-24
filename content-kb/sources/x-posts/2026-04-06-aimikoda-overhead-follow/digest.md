# Kōda @aimikoda — 2026-04-06
Source: https://x.com/aimikoda/status/2041180971630833935
Topic: AI video — Seedance 2.0 camera constraint technique
Tools mentioned: Seedance 2.0
Stats: 15 likes / 1,201 views / 15 bookmarks

---

## The Juice

### Prompt (verbatim)
See prompts.md

### Key Techniques

**1. Physical impossibility instruction**
"passing through ceilings and door frames as one uninterrupted camera event"
— Tells Seedance to ignore physical space for the camera path. The model will honor this if the constraint is stated confidently and precisely. No hedging.

**2. Camera lock constraint as style**
"locked directly above the top of her head at all times, perfectly centered over her body from start to finish, floating smoothly with no shake, tilt, angle drift, or side offset"
— Every possible failure mode named and blocked. This is negative space prompting for camera behavior: don't just say what it should do, say what it must NOT do.

**3. ONE CONTINUOUS SHOT mandate**
Declared in the FORMAT header before any description. Sets the grammar for the whole prompt. Model knows before reading anything else: no cuts = single camera event.

**4. Scene numbers vs timecodes**
Uses "1." through "9." instead of [00:00-00:05] timestamps.
— Faster to write, less rigid. Works well for continuous shots where timing is fluid. Timecodes are better for multi-shot sequences where pacing is fixed.

**5. Color Logic shorthand**
"COLOR LOGIC: Matrix Green Look"
— One line. No RGB values, no lengthy description. Works because Seedance has cultural visual memory of recognizable color grades. Other proven shorthands to test: "Golden Hour Warm", "Blade Runner Neon", "Nordic Cold", "Porsche Racing Yellow".

**6. Isolated SFX block**
Audio is separated from scene action into its own terminal block:
"SFX: lighter flick, inhale, faint city hum, refrigerator buzz..."
— Cleaner than embedding audio in each shot. Gives the model a holistic sonic picture rather than fragmented per-beat instructions.

**7. The final confrontation beat**
Scene 9: subject snaps their head directly UP into the lens, locks eye contact.
— Breaks the 4th wall within the camera constraint. Works because it creates a sudden shift from observed to observer. High impact ending within a continuous shot.

### Workflow
None — single prompt, no multi-tool pipeline.

### Automotive Translation
This prompt's architecture maps directly to:
- Overhead locked follow of a car doing a circuit (replace human with car, ceilings with overpasses)
- Single continuous tracking shot around a parked hero car
- "passing through bodywork" instruction for interior-to-exterior camera moves
- Color Logic shorthands: "Tarmac Black & Brake Disc Orange", "Wet Asphalt Silver", "Dawn Ferrari Red"

### Negative findings
None observed — post is clean technique with working output.
