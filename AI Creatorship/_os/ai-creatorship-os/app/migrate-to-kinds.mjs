#!/usr/bin/env node
// Add `kind:` frontmatter to every .md file in a project, based on its path.
// Path is informational only — the kind + id in frontmatter become the source of truth
// so the agent can reshape folders freely going forward.
//
// Rules:
//   project.md                                   → kind: project
//   characters/<slug>/lock.md                    → kind: character, id: <slug>
//   locations/<slug>/lock.md                     → kind: location,  id: <slug>
//   workflows/<slug>.md                          → kind: workflow,  id: <slug>
//   scenes/<slug>/scene.md                       → kind: scene,     id: <slug>
//   scenes/<s>/shots/<sh>/shot.md                → kind: shot,      id: <sh>, scene: <s>
//   scenes/<s>/shots/<sh>/statics/<m>/<f>.md     → kind: prompt-thread, media: image, model: <m>, scene: <s>, shot: <sh>
//   scenes/<s>/shots/<sh>/videos/<m>/<f>.md      → kind: prompt-thread, media: video, model: <m>, scene: <s>, shot: <sh>
//   anything else                                → kind: note
//
// Idempotent: if a file already has `kind:` in frontmatter, the script updates id/parent fields
// but preserves existing kind.

import { readFile, writeFile } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
import { readdir, stat } from "node:fs/promises";

const dir = process.argv[2];
if (!dir) { console.error("usage: node migrate-to-kinds.mjs <project-dir>"); process.exit(1); }
const PROJECT = resolve(dir);
const PROJECT_SLUG = PROJECT.split(sep).pop();

async function walk(root, cb) {
  for (const name of await readdir(root)) {
    if (name.startsWith("_") || name.startsWith(".")) continue;
    const full = `${root}/${name}`;
    const s = await stat(full);
    if (s.isDirectory()) await walk(full, cb);
    else if (name.endsWith(".md")) await cb(full);
  }
}

/** Parse frontmatter; return { frontmatter, body, hadFrontmatter }. Keeps original scalars. */
function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { frontmatter: {}, body: text, hadFrontmatter: false };
  const fm = {};
  for (const rawLine of m[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim();
    fm[key] = val; // keep raw; we don't normalize
  }
  return { frontmatter: fm, body: text.slice(m[0].length), hadFrontmatter: true };
}

function stringifyFrontmatter(fm, body) {
  const keys = Object.keys(fm);
  if (keys.length === 0) return body;
  const lines = ["---"];
  for (const k of keys) {
    const v = fm[k];
    if (v === undefined || v === null || v === "") { lines.push(`${k}: ""`); continue; }
    lines.push(`${k}: ${v}`);
  }
  lines.push("---", "");
  return lines.join("\n") + body;
}

/** Infer the kind + derived frontmatter for a given file path (relative to project). */
function infer(relPath) {
  const parts = relPath.split("/");

  // project.md at root
  if (parts.length === 1 && parts[0] === "project.md") {
    return { kind: "project", id: PROJECT_SLUG, title: PROJECT_SLUG };
  }

  // characters/<slug>/lock.md  OR characters/<slug>.md
  if (parts[0] === "characters") {
    let slug;
    if (parts.length >= 3 && parts[parts.length - 1] === "lock.md") slug = parts[1];
    else if (parts.length === 2) slug = parts[1].replace(/\.md$/, "");
    if (slug) return { kind: "character", id: slug };
  }

  if (parts[0] === "locations") {
    let slug;
    if (parts.length >= 3 && parts[parts.length - 1] === "lock.md") slug = parts[1];
    else if (parts.length === 2) slug = parts[1].replace(/\.md$/, "");
    if (slug) return { kind: "location", id: slug };
  }

  if (parts[0] === "workflows" && parts.length === 2) {
    return { kind: "workflow", id: parts[1].replace(/\.md$/, "") };
  }

  if (parts[0] === "scenes") {
    const sceneSlug = parts[1];
    // scenes/<slug>/scene.md
    if (parts.length === 3 && parts[2] === "scene.md") {
      return { kind: "scene", id: sceneSlug };
    }
    // scenes/<s>/shots/<sh>/shot.md
    if (parts.length === 5 && parts[2] === "shots" && parts[4] === "shot.md") {
      return { kind: "shot", id: parts[3], scene: sceneSlug };
    }
    // scenes/<s>/shots/<sh>/statics/<model>/<file>.md
    if (parts.length === 7 && parts[2] === "shots" && (parts[4] === "statics" || parts[4] === "videos")) {
      const shot = parts[3];
      const media = parts[4] === "statics" ? "image" : "video";
      const model = parts[5];
      const file = parts[6].replace(/\.md$/, "");
      const id = `${shot}-${model}-${file}`;
      return {
        kind: "prompt-thread",
        id,
        scene: sceneSlug,
        shot,
        model,
        media,
      };
    }
  }

  return { kind: "note" };
}

async function migrate(filePath) {
  const rel = relative(PROJECT, filePath).split(sep).join("/");
  const text = await readFile(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(text);
  const inferred = infer(rel);

  // Merge: path-derived graph keys are authoritative for this migration script.
  // Free-form files still fall back to existing frontmatter.
  const next = { ...frontmatter };
  for (const [k, v] of Object.entries(inferred)) {
    const graphKey = ["kind", "id", "scene", "shot", "model", "media"].includes(k);
    if (graphKey || next[k] === undefined || next[k] === "") next[k] = v;
  }
  // Ensure kind first, id second (for readability)
  const ordered = {};
  for (const k of ["kind", "id", "title", "scene", "shot", "model", "media", "starting_frame"]) {
    if (next[k] !== undefined) ordered[k] = next[k];
  }
  for (const k of Object.keys(next)) {
    if (!(k in ordered)) ordered[k] = next[k];
  }

  // Quote if value contains special chars
  for (const [k, v] of Object.entries(ordered)) {
    if (typeof v === "string" && /[:#\[\]{}&*!|>'"%@`,\n]/.test(v) && !(v.startsWith('"') && v.endsWith('"'))) {
      ordered[k] = `"${v.replace(/"/g, '\\"')}"`;
    }
  }

  const out = stringifyFrontmatter(ordered, body);
  await writeFile(filePath, out, "utf8");
  console.log(`  ✓ ${rel}  [kind: ${inferred.kind}${inferred.id ? ` · ${inferred.id}` : ""}]`);
}

console.log(`Migrating ${PROJECT} → kind-tagged frontmatter\n`);
await walk(PROJECT, migrate);
console.log(`\n  done. Every .md file now declares its kind.`);
