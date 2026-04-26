# TOOLS.md - Apex Tool Notes

## Core Routing

| Tool / Model | Use For |
|---|---|
| Nano Banana Pro | Still keyframes, angle exploration, hero frames, reference-led shot expansion |
| Seedance 2.0 | Image-to-video, camera choreography, cinematic animation, short car sequences |
| ai-video-prompting | Fallback generic video structure when a more specific automotive pattern is not needed |
| crea-cinematic-prompts | Broad cinematic prompt structure and still/video decomposition |

## Automotive Routing Rules

### Use Nano Banana when:
- exploring adjacent camera angles from one reference
- building hero stills before animation
- generating alternate compositions, weather variants, or lighting directions
- locking a keyframe that will later become a Seedance shot

### Use Seedance when:
- animating a static car with camera movement
- bridging two keyframes into one controlled shot
- building short automotive commercial beats
- motion, rain physics, reflections, mist, spray, and lens choreography matter

## Automotive Prompting Priorities

1. Preserve exact car design and proportions
2. Preserve stance and planted feel
3. Use camera angles that strengthen the body form
4. Keep reflections coherent with the panel geometry
5. State weather and environment physics explicitly when relevant

## Model Notes

### Nano Banana Pro
- Best for reference-led still generation and expansion
- Use clean natural language plus exact visual anchors
- Avoid generic quality keyword salad

### Seedance 2.0
- Best for premium short camera-move shots and controlled visual beats
- Stronger when camera, subject, and physics are clearly separated
- For static-car shots, explicitly lock the vehicle and move only the camera
