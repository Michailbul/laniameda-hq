# PRD — F40 Driver · Storyboard Web App

> Product requirements for the two-way synced storyboard web app used to track prompts, character lock, treatment, and revisions across a multi-model AI creative project.

**Owner:** Michael / laniameda
**Version:** 1.0 (draft)
**Last updated:** 2026-04-18
**Status:** v1 shipped, iterating

---

## 1. Problem

A multi-model AI creative project (Midjourney + Nano Banana Pro + Seedance V2) produces dozens of prompts across shots, each versioned and revised over many turns. Without a persistent structure:

- Prompts get re-pasted into chat every turn, wasting context window and creating divergence.
- Revisions from the human operator ("no gloves, manicure only") are easy to lose between sessions.
- The character identity lock and brand aesthetic decisions need to travel across models without drifting.
- There is no shared surface where both the human and the AI agent can see the same state at the same time.

**What's missing** is a lightweight, persistent, two-way synced artifact that both parties can read and write — effectively a shared project file that lives between turns.

---

## 2. Goal

Ship a single-file web app (`storyboard.html`) that:

1. Renders a structured storyboard stored in a local `storyboard.json` file.
2. Lets the human edit any field inline and save back to the same file.
3. Lets Claude edit the same JSON file directly via chat, with the human seeing updates on reload.
4. Provides a message thread inside the JSON so the human can leave revision notes that Claude reads in the next turn without re-pasting.

Non-goal: any server-side component, any account system, any cloud sync. This must work fully offline from one HTML file + one JSON file.

---

## 3. Users & context

**Primary user:** the project operator (Michael). A creative director building AI cinematic work who iterates on prompts many times per shot.

**Secondary user:** Claude (the AI collaborator). Reads and writes the JSON directly through file tools in chat.

**Context of use:**
- The operator is in Brave/Chrome with the web app open in one tab and a chat with Claude in another.
- Between chat turns, the operator reviews shots in the app, makes revisions, and leaves notes.
- Claude reads the JSON at the start of each turn, applies changes, and writes back.

---

## 4. Core requirements (v1 — shipped)

### 4.1 Data model — `storyboard.json`

Single JSON file with the following top-level sections:

- `project` — name, working title, version, last updated, owner
- `brief` — narrative brief
- `treatment` — aesthetic and editorial treatment
- `overview` — three-act arc
- `reference_keywords` — array of tag strings
- `reference_vibes` — array of longer mood/reference strings
- `reference_works` — array of `{title, year, director, use}`
- `character_lock_file` — pointer to the external character JSON
- `character_summary` — one-paragraph summary
- `shots` — array of shot objects
- `communication` — `{ user_to_claude: [], claude_to_user: [] }`
- `workflow_notes` — sequence recommendation + pipeline notes

Shot object shape:

```json
{
  "id": "shot_001_name",
  "name": "Human-readable shot name",
  "purpose": "Why this shot exists",
  "category": "identity_anchor | marketing_hero | beauty_insert | emotional_insert | kinetic_insert | mood_beat | interaction_beat | hero_car | hero_product",
  "status": "draft | generated | approved | revised",
  "primary_model": "nano_banana_2 | midjourney | seedance_v2",
  "secondary_model": "same set",
  "version": 1,
  "created": "YYYY-MM-DD",
  "aspect_ratio": "16:9 | 3:4 | 21:9 | 2.39:1",
  "reference_images": [],
  "midjourney_prompt": "...",
  "nano_banana_2_prompt": "...",
  "notes_from_user": "",
  "edits_history": [
    { "version": 1, "date": "YYYY-MM-DD", "change": "Initial draft" }
  ]
}
```

### 4.2 Rendering

- **Header** — project name, working title, version, last updated, owner.
- **Brief / Treatment / Overview** — editable multiline text fields.
- **References** — keywords (tag chips, add/remove), vibes (textareas, add/remove), works (editable four-field rows, add/remove).
- **Character** — editable summary plus pointer to `character-lock-f40-driver.json`.
- **Shots** — one expandable card per shot. Collapsed: id, category, aspect ratio, version, status dot, name, purpose. Expanded: status dropdown, primary/secondary model fields, aspect ratio field, MJ prompt textarea with copy button, NB2 prompt textarea with copy button, notes from user textarea, edits history list + "+ log revision" button.
- **Communication** — two-column message thread. Left: user-to-Claude messages + input box + "Add & save" button (auto-saves). Right: Claude-to-user messages (read-only, from JSON).
- **Workflow notes** — numbered sequence recommendation + editable pipeline notes.

### 4.3 Two-way sync

Two modes, auto-detected.

#### Live sync mode (preferred)
- Requires `http://localhost` or `https://` origin.
- Uses File System Access API (`showOpenFilePicker`, `createWritable`).
- **Open storyboard.json** — opens file picker, stores file handle for the session.
- **Save to disk** — writes JSON in place with 2-space indent.
- **Reload from disk** — re-reads the same file handle, picks up changes made by Claude in chat.
- **⌘S / Ctrl+S** shortcut saves.
- User-to-Claude messages auto-save on submit.

#### Fallback mode
- Triggers when `file://` protocol or no File System Access API.
- **Open storyboard.json** — uses classic `<input type="file">` or drag-and-drop.
- **Save to disk** — triggers a download of the updated JSON; user manually replaces the old file.
- **Reload from disk** — re-prompts to pick the file.
- Mode badge visible in the top bar so the user knows which mode they're in.

### 4.4 Visual design

- Black background (`#0a0a0a`), paper panels (`#121212`), silver text (`#d6d6d6`), oxblood red accent (`#6b0f1a` / `#8c1726`).
- Playfair Display serif for titles, Inter for body, JetBrains Mono for technical content (IDs, prompts, tags, mono labels).
- Cinematic restraint — minimal chrome, hairline rules, oxblood accents only where they add hierarchy.

### 4.5 Resilience

- `beforeunload` warning if there are unsaved changes.
- "unsaved" indicator in the top bar when dirty.
- "Saved · [time]" flash after successful write.
- Graceful fallback for unsupported browsers — never crashes, always offers a path forward.

---

## 5. Success criteria

1. A shot revision flow takes under 30 seconds: open app → expand shot → edit field → save → tell Claude in chat.
2. Claude can make an edit in chat and the operator sees it in the app within one click (Reload from disk) without needing to re-paste.
3. The JSON file remains human-readable and diffable; version history is preserved per shot.
4. The app works in Brave, Chrome, Edge, and Arc without modification.
5. The app opens from a double-click (fallback mode) without breaking — the operator is never blocked by setup.

---

## 6. Known limitations (v1)

- **Safari / Firefox** — no File System Access API; fallback mode only (load via picker, save via download).
- **Polling** — no auto-refresh. The operator must click **Reload from disk** to see Claude's edits. Intentional: avoids over-engineering, keeps conflicts impossible.
- **No conflict resolution** — last write wins. If both the operator and Claude edit in parallel, whoever saves last overwrites. Mitigation: the operator saves before asking Claude to edit; Claude reads before writing.
- **No image preview** — v1 does not display generated images inline. Each shot references external image files.
- **Character lock is external** — `character-lock-f40-driver.json` is pointed to but not rendered. v1 scope assumes the operator edits it by hand or via chat.

---

## 7. Roadmap

### v1.1 — quick wins
- Inline preview of generated images (drag-drop onto shot card, render at reduced size, path stored in JSON).
- Collapsible Claude-to-user message thread with unread count.
- Export-to-Markdown button (one-click brief dump for sharing).
- Keyboard navigation between shot cards.

### v1.2 — character lock integration
- Render the character-lock JSON inline in a dedicated section.
- Let the operator edit slugs and context recipes in the UI.
- Changelog entries auto-generated on edit.

### v1.3 — multi-project
- Project picker at the top (swap between `storyboard.json` files for different projects).
- Project index page listing all local projects.
- Cross-project character reuse (shared character-lock library).

### v2 — presence
- Claude's chat-side edits poll-notify the web app via a tiny local watcher (optional opt-in).
- Live "Claude is editing shot 003" indicator.
- Auto-reload on file change.

---

## 8. Out of scope

- Cloud sync, accounts, collaboration across machines.
- Direct model invocation from the app (no "generate this shot" button — the app is a prompt-and-state manager, not a runtime).
- Rich text editing (plain textareas are sufficient for prompt content).
- Mobile responsiveness beyond graceful degradation.

---

## 9. Open questions

- **Does the operator want a "generate" button that copies a prompt to clipboard and opens the model's web UI in a new tab?** — would compress the loop further but requires per-model URL handling.
- **Should the character-lock be rendered inline or remain external?** — inline is more discoverable; external keeps the app smaller and the character reusable across projects.
- **Should edits_history diff the prompt text automatically?** — would be powerful for learning over time but adds complexity to the data model.

---

## 10. References

- `character-lock-f40-driver.json` — identity lock schema
- `storyboard.json` — live project file
- `storyboard.html` — app implementation
- Seedance V2 skill — `laniameda-ai-creatorship:seedance-prompting`
- Nano Banana Pro skill — `laniameda-ai-creatorship:nano-banana-pro`

---

*v1 authored 2026-04-18 during build session.*
