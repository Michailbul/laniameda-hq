#!/usr/bin/env node
// One-shot migration: split a legacy monolithic storyboard.json into the
// folder-based project shape defined in the OS README. Safe to re-run
// (writes per-file, does not delete the source).
//
// Usage:  node split-storyboard.mjs <project-dir>
// Expects <project-dir>/storyboard.json to exist.
// Produces:
//   <project-dir>/project.json
//   <project-dir>/shots/<id>.json
//   <project-dir>/messages/user-to-claude.jsonl
//   <project-dir>/messages/claude-to-user.jsonl

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const dir = process.argv[2];
if (!dir) { console.error("usage: node split-storyboard.mjs <project-dir>"); process.exit(1); }

const projectDir = resolve(dir);
const src = JSON.parse(await readFile(join(projectDir, "storyboard.json"), "utf8"));

await mkdir(join(projectDir, "shots"), { recursive: true });
await mkdir(join(projectDir, "messages"), { recursive: true });
await mkdir(join(projectDir, "assets", "refs"), { recursive: true });
await mkdir(join(projectDir, "assets", "generated"), { recursive: true });

// project.json = everything except shots + messages
const project = {
  schema_version: "2.0",
  project: src.project,
  brief: src.brief,
  treatment: src.treatment,
  overview: src.overview,
  reference_keywords: src.reference_keywords,
  reference_vibes: src.reference_vibes,
  reference_works: src.reference_works,
  character_lock_file: src.character_lock_file ?? "character-lock.json",
  character_summary: src.character_summary,
  workflow_notes: src.workflow_notes,
};
await writeFile(join(projectDir, "project.json"), JSON.stringify(project, null, 2) + "\n", "utf8");
console.log(`  ✓ project.json`);

// shots/<id>.json — one file each
for (const shot of src.shots ?? []) {
  const path = join(projectDir, "shots", `${shot.id}.json`);
  await writeFile(path, JSON.stringify(shot, null, 2) + "\n", "utf8");
  console.log(`  ✓ shots/${shot.id}.json`);
}

// messages/*.jsonl — one message per line
const userLog = (src.communication?.user_to_claude ?? [])
  .map((m) => JSON.stringify(m))
  .join("\n");
const claudeLog = (src.communication?.claude_to_user ?? [])
  .map((m) => JSON.stringify(m))
  .join("\n");
await writeFile(join(projectDir, "messages", "user-to-claude.jsonl"), userLog ? userLog + "\n" : "", "utf8");
await writeFile(join(projectDir, "messages", "claude-to-user.jsonl"), claudeLog ? claudeLog + "\n" : "", "utf8");
console.log(`  ✓ messages/user-to-claude.jsonl (${(src.communication?.user_to_claude ?? []).length})`);
console.log(`  ✓ messages/claude-to-user.jsonl (${(src.communication?.claude_to_user ?? []).length})`);

console.log(`\n  split complete. Source left in place: ${join(projectDir, "storyboard.json")}`);
