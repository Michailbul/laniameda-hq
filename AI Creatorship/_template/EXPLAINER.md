# [Project Name] — Explainer

> What this project is, what we've tried, what we've learned, what comes next.

**Last updated:** YYYY-MM-DD

---

## 1. The creative universe

_One paragraph: what we're making, who the subject is, the emotional register, the aesthetic universe. Treat this as the fixed north star for the project._

---

## 2. What has been done so far

_Each session or creative move that produced a reusable artifact. Date + what was built + why it exists._

---

## 3. What we learned

_Specifics only — prompt patterns that worked, tool interactions, failure modes. Generalisations have no value here._

---

## 4. Current status

| Artifact | State |
|---|---|
| character-lock.json | — |
| shots/ | — |
| generated stills | — |
| generated video | — |

---

## 5. Pipeline — what to run next

_Concrete sequenced steps. Numbered. What tool. What reference. What to lock. What gates to pass before moving on._

---

## 6. File map

```
<this project>/
  project.json              ← brief, treatment, overview, references, workflow
  character-lock.json       ← identity (if character-driven)
  shots/                    ← one JSON per shot
  messages/                 ← operator ⇄ Claude log (append-only)
  assets/
    refs/                   ← inputs fed to generation
    generated/<shot_id>/    ← model outputs per shot
```
