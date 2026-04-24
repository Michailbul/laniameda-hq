---
kind: character
id: mercedes-amg-gt3
title: Mercedes-AMG GT3
tags: [car, identity-lock, threat]
---
# Mercedes-AMG GT3 — Identity Lock

## Identity Block

```json
{
  "make": "Mercedes-AMG",
  "model": "GT3",
  "variant": "full GT3 race spec, not street-legal",

  "body": {
    "silhouette": "wide-body race car, long hood, low roofline, aggressive stance",
    "fenders": "massively flared front and rear fenders with exposed carbon fiber edges",
    "splitter": "deep carbon fiber front splitter with black mesh intake beneath, vertical dive planes on outer edges, extends well beyond bumper line",
    "diffuser": "large carbon fiber rear diffuser with 5-6 vertical fins, center-mounted dual round exhaust tips visible through the fins",
    "side": "deep side skirts, side-exit cooling vents behind rear wheels with vertical louvers"
  },

  "paint": {
    "color": "matte dark charcoal grey, satin finish",
    "behavior": "absorbs light, no sharp reflections, only soft ambient gradients across panels",
    "carbon_accents": "exposed matte carbon fiber weave on splitter, diffuser, wing, fender edges, mirror housings"
  },

  "wing": {
    "type": "massive full-width GT3 rear wing extending beyond body edges",
    "material": "carbon fiber with visible weave pattern",
    "mounting": "angular geometric swan-neck pylons, two pylons, black",
    "branding": "large red striped AMG emblem on the rear face of the wing element, spanning most of the wing width",
    "endplates": "large carbon fiber endplates with cutout slots"
  },

  "front_face": {
    "grille": "Panamericana vertical slat grille, black chrome finish, large three-pointed star emblem at center",
    "headlights": "slim aggressive LED headlights with bright white DRL strips, angular shape following fender contour",
    "hood_flag": "small German flag tri-stripe decal (black-red-gold) on upper left edge of hood near fender"
  },

  "rear_face": {
    "taillights": "center high-mount LED brake light strip across the trunk lid, plus two wide horizontal LED taillights flanking the trunk, glowing red-orange",
    "trunk_emblem": "small Mercedes three-pointed star emblem center of trunk between taillights",
    "bumper_upper": "two yellow Pirelli logo rectangles, one on each side above the diffuser",
    "bumper_lower": "red Motul logo rectangles on lower left and lower right corners",
    "exhaust": "dual round exhaust tips, center-mounted, visible through the diffuser fins"
  },

  "driver_side_left": "vertical German flag stripe (black-yellow-red) on the rear pillar from roofline to side skirt, plus a small striped AMG emblem with 'AMG' text in subtle grey-white on the lower door near the side skirt. Nothing else.",
  "passenger_side_right": "completely clean, no text, no labels, no sponsor logos, no decals, plain matte charcoal grey body only",

  "wheels": {
    "design": "matte black dense mesh-pattern racing wheels, not simple spokes",
    "center_lock": "silver center-lock single nut, flush-mounted",
    "tires": "Pirelli slick racing tires, no tread pattern, smooth black rubber",
    "brakes": "large red AMG-branded brake calipers visible through the mesh, cross-drilled rotors behind"
  },

  "mirrors": "carbon fiber mirror housings with red accent tips",
  "antenna": "thin black roof antenna, centered",
  "plates": "none, no license plate front or rear",
  "race_number": "none, no race number on any panel anywhere"
}
```

## Prompt-Ready Description

A Mercedes-AMG GT3 race car in matte dark charcoal grey with a satin finish that absorbs light, no sharp reflections, only soft ambient gradients across the panels. Full GT3 spec with massively flared fenders exposing carbon fiber edges, a deep carbon front splitter with black mesh intake and vertical dive planes, and a large carbon rear diffuser with 5-6 vertical fins housing center-mounted dual round exhaust tips. A massive full-width carbon fiber rear wing with visible weave pattern sits on angular black swan-neck pylons, carrying a large red striped AMG emblem on the wing's rear face. Front face: Panamericana vertical slat grille in black chrome with a large three-pointed star at center, slim aggressive LED headlights with bright white DRL strips, small German flag tri-stripe on the upper left hood edge. Rear face: center high-mount LED brake strip, two wide horizontal taillights glowing red-orange, small Mercedes three-pointed star on the trunk, two yellow Pirelli rectangles on the upper bumper, two red Motul rectangles on the lower bumper corners. Driver side (left) carries only two elements: a vertical German flag stripe (black-yellow-red) on the rear pillar from roofline to side skirt, and a small striped AMG emblem with "AMG" text in subtle grey-white on the lower door near the side skirt. Passenger side (right) is completely clean, no text, no logos, no decals, plain matte charcoal grey body only. Matte black dense mesh-pattern racing wheels with silver center-lock nuts, large red AMG brake calipers visible through the mesh, Pirelli slick tires. Carbon fiber mirror housings with red accent tips. Thin black roof antenna. No license plates. No race number anywhere.

## Side Asymmetry Rule

Driver side (left): vertical German flag stripe on rear pillar, small AMG emblem on lower door. Nothing else.
Passenger side (right): completely clean matte charcoal, no markings.

## Hard Rules

- GT3 race car, not a street AMG. Wing, splitter, diffuser, wide body, slick tires, carbon details are mandatory.
- Wing branding is red AMG on the wing element itself, not on the rear trunk deck.
- Taillights are horizontal LED strips, not round.
- Exhaust is center through the diffuser, not side-exit.
- Pirelli = yellow rectangles. Motul = red rectangles.
- Passenger side stays clean. No sponsor logos bleeding from left to right.
- No license plates. No race number. Negate both explicitly in every prompt.
- Copy the Prompt-Ready Description verbatim when the AMG must stay consistent.
