# Color Grading Profile — Forest Race

## Identity Block

```json
{
  "palette": "teal and orange cinematic split",
  "time_of_day": "late afternoon golden hour, sun low in the west, 15-20 degrees above horizon",
  "color_temperature": "mixed — warm direct light (approx 4500K amber) vs cool ambient shade (approx 7000K blue-teal)",
  "highlights": "warm amber-gold, soft rolloff, not blown — retains detail in brightest areas",
  "midtones": "neutral to slightly warm, desaturated enough to feel filmic rather than saturated",
  "shadows": "pushed toward deep teal-green, never pure black — slightly lifted with a cool cast",
  "blacks": "lifted slightly, never crushed, retaining shadow detail in forest floor and car undersides",
  "contrast": "medium-high filmic contrast, strong separation between light shafts and shadow areas without HDR look",
  "saturation": "overall slightly desaturated, selective push on: Ferrari orange-red (hero color), autumn foliage golds, teal in shadows. Greens desaturated and shifted toward teal.",
  "greens": "desaturated and cooled — forest greens pulled toward teal/cyan, never vivid grass-green",
  "reds_oranges": "protected and slightly boosted — the Ferrari's paint and autumn leaves remain warm and punchy against the cooled environment",
  "grain": "subtle film grain, fine structure, adds texture without noise"
}
```

## Light Direction

Sun comes from behind and above the cars in most chase angles (backlighting). This creates:
- Rim light on car edges and roof lines
- God rays slicing diagonally through canopy haze
- Car bodies in partial silhouette with environmental reflections filling the shadow side
- Road surface catching specular highlights from low sun angle
- Mist and debris particles backlit and glowing

## Prompt-Ready Description

Late afternoon golden hour, teal-and-orange cinematic color grade. Warm amber backlight from the low western sun raking through a partially open forest canopy, casting diagonal god rays through atmospheric haze. Shadows pushed deep teal-green, never pure black, slightly lifted to retain detail. Highlights warm and soft, no blown areas. Forest greens desaturated and cooled toward teal-cyan. The Ferrari's burnt orange-red paint and autumn foliage golds remain warm and punchy — protected hero colors against the cool environment. Medium-high filmic contrast with strong light-shadow separation. Subtle film grain. The overall feel is cinematic, atmospheric, and grounded — like a scene from a European automotive commercial shot on film.

## Reference Feel

Think Wes Anderson's teal-and-amber palette meets a BMW Films-era chase sequence. Filmic, not digital. Graded, not filtered. The kind of image that looks like it was color-timed in DaVinci Resolve by someone who shoots car commercials for a living.

## Notes

- The teal-orange split is the backbone. If shadows aren't teal and highlights aren't amber, the grade is off.
- Greens must be desaturated/teal-shifted. Vivid green kills the mood.
- Ferrari red-orange is the warmest thing in frame at all times. Nothing else should compete with it in saturation.
- The AMG's matte grey reads as cool/neutral in this grade — it recedes while the Ferrari pops. This is intentional visual hierarchy.
