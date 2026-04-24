---
kind: location
id: european-forest-road
title: European Forest Road
tags: [forest, road, automotive, location-lock]
---
# European Forest Road — Location Lock

## Identity Block

```json
{
  "setting": "dense European mountain forest, mixed conifers and deciduous trees",
  "road_surface": "smooth dark asphalt, two-lane, dry by default",
  "road_markings": "white edge lines on both sides, yellow center dividing line",
  "road_width": "narrow two-lane, barely wide enough for two cars side by side",
  "features": "stone arch tunnel or bridge overpasses, metal guardrails on curves, no streetlights",
  "trees": "tall conifers (spruce, pine) form dense walls on both sides, mixed with deciduous trees",
  "canopy": "partial high canopy that filters overhead light into shafts",
  "undergrowth": "moss-covered banks, fallen leaves on road shoulders, ferns at tree bases",
  "atmosphere": "haze and mist hanging between trees, thickens in hollows and under bridges, thins on straights",
  "debris": "leaves and small debris lifted off the road by car wake, suspended in the air",
  "elevation": "gently undulating, mild curves, occasional straights with a vanishing point into forest depth"
}
```

## Prompt-Ready Description

A narrow two-lane asphalt road cutting through a dense European mountain forest. Smooth dark road surface with white edge lines and a yellow center divider. Tall conifers, spruce and pine, form dense walls on both sides, mixed with deciduous trees. The canopy is high and partially open, letting shafts of late-afternoon light cut through haze and mist that hangs between the trunks. Moss-covered banks, scattered fallen leaves on the shoulders, ferns at tree bases. Stone arch tunnel bridges span the road at intervals. Metal guardrails appear on tighter curves. No streetlights. The road gently undulates with mild curves and occasional straights that vanish into deep forest. Leaves and small debris lift off the road surface in the wake of fast-moving cars, suspended in the misty air.

## Scene 01 Override

Scene 01 uses damp reflective asphalt with tire spray and road sheen, and warm golden-hour foliage in gold and amber tones. The base lock stays dry and season-neutral for any other scene.

## Hard Rules

- Haze and mist are load-bearing. Present in every prompt using this location.
- Road is dry by default. Only wet when the scene explicitly calls for it.
- Do not name the season in the base prompt. Scene overrides can.
- Stone tunnel is a landmark feature, not present in every frame.
