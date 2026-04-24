#!/usr/bin/env node
// Migrate a v2.0 flat-shots project to v2.1 scenes/shots/sets structure.
//
//   v2.0:  project.json + shots/*.json + communication/messages/*.jsonl
//   v2.1:  project.md + characters/<c>/lock.md + scenes/<s>/shots/<sh>/statics/<model>/<set>.md
//
// One-shot. Safe to re-run — writes new files; does not delete old ones.
// Usage:  node migrate-to-scenes.mjs <project-dir>

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

const dir = process.argv[2];
if (!dir) { console.error("usage: node migrate-to-scenes.mjs <project-dir>"); process.exit(1); }
const PROJECT = resolve(dir);

const MODEL_ALIASES = {
  "nano_banana_2": "nano-banana-pro",
  "nano_banana": "nano-banana-pro",
  "midjourney": "midjourney",
  "seedance_v2": "seedance",
  "kling": "kling",
};
const MODEL_SHORT = {
  "nano-banana-pro": "nbp",
  "midjourney": "mj",
  "seedance": "sd",
  "kling": "kl",
  "luma": "lu",
};

async function loadProject() {
  const projectPath = join(PROJECT, "project.json");
  return JSON.parse(await readFile(projectPath, "utf8"));
}

async function loadShots() {
  const shotsDir = join(PROJECT, "shots");
  const files = (await readdir(shotsDir)).filter((f) => f.endsWith(".json")).sort();
  const shots = [];
  for (const f of files) {
    const raw = JSON.parse(await readFile(join(shotsDir, f), "utf8"));
    shots.push(raw);
  }
  return shots;
}

async function loadCharacterLock() {
  const p = join(PROJECT, "character-lock.json");
  try { return JSON.parse(await readFile(p, "utf8")); } catch { return null; }
}

function yamlDump(obj) {
  // Minimal YAML writer for our flat frontmatter needs.
  const lines = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) lines.push(`${k}: []`);
      else lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(", ")}]`);
    } else if (typeof v === "string") {
      // Quote if contains special chars
      if (/[:#\[\]{}&*!|>'"%@`,\n]/.test(v) || v.trim() !== v || v === "") {
        lines.push(`${k}: ${JSON.stringify(v)}`);
      } else {
        lines.push(`${k}: ${v}`);
      }
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  return lines.join("\n");
}

function frontmatter(obj) { return `---\n${yamlDump(obj)}\n---\n`; }

// ─────────────────────────────────────────────────────────────

async function writeProjectMd(project) {
  const fm = frontmatter({
    schema_version: "2.1",
    name: project.project?.name,
    working_title: project.project?.working_title,
    owner: project.project?.owner,
    version: project.project?.version,
    last_updated: project.project?.last_updated,
  });

  const body = [
    `# ${project.project?.working_title ?? project.project?.name ?? "Project"}`,
    "",
    "## Brief",
    "",
    project.brief ?? "",
    "",
    "## Treatment",
    "",
    project.treatment ?? "",
    "",
    "## Overview",
    "",
    project.overview?.act_1 ? `### Act 1\n\n${project.overview.act_1}` : "",
    project.overview?.act_2 ? `\n### Act 2\n\n${project.overview.act_2}` : "",
    project.overview?.act_3 ? `\n### Act 3\n\n${project.overview.act_3}` : "",
    "",
    "## References",
    "",
    "### Keywords",
    "",
    (project.reference_keywords ?? []).map((k) => `- ${k}`).join("\n") || "_(none)_",
    "",
    "### Vibes",
    "",
    (project.reference_vibes ?? []).map((v) => `- ${v}`).join("\n") || "_(none)_",
    "",
    "### Works",
    "",
    (project.reference_works ?? []).map((w) => `- **${w.title}** (${w.year}) — ${w.director}: ${w.use}`).join("\n") || "_(none)_",
    "",
    "## Workflow notes",
    "",
    project.workflow_notes?.pipeline_notes ?? "",
    "",
    "### Sequence recommendation",
    "",
    (project.workflow_notes?.sequence_recommendation ?? []).map((s) => `${s}`).join("\n") || "_(none)_",
  ].join("\n");

  await writeFile(join(PROJECT, "project.md"), fm + body + "\n", "utf8");
  console.log("  ✓ project.md");

  // Keep project.json slim — meta only
  const meta = {
    schema_version: "2.1",
    name: project.project?.name,
    working_title: project.project?.working_title,
    owner: project.project?.owner,
    version: project.project?.version,
    last_updated: project.project?.last_updated,
    models: { nbp: "nano-banana-pro", mj: "midjourney", sd: "seedance", kl: "kling", lu: "luma" },
  };
  await writeFile(join(PROJECT, "project.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");
  console.log("  ✓ project.json (slim meta)");
}

async function writeCharacterLock(lockJson) {
  if (!lockJson) return;
  const slug = lockJson.id || "character";
  const dirPath = join(PROJECT, "characters", slug);
  await mkdir(dirPath, { recursive: true });
  await mkdir(join(dirPath, "refs"), { recursive: true });

  const fm = frontmatter({
    schema_version: "1.0",
    id: lockJson.id,
    project: lockJson.project,
    last_updated: lockJson.last_updated,
  });

  const body = [
    `# ${lockJson.identity?.name || slug}`,
    "",
    "## Identity",
    "",
    Object.entries(lockJson.identity ?? {}).map(([k, v]) => `- **${k}**: ${v}`).join("\n"),
    "",
    "## Face",
    "",
    Object.entries(lockJson.face ?? {}).map(([k, v]) => `- **${k}**: ${v}`).join("\n"),
    "",
    "## Hair",
    "",
    Object.entries(lockJson.hair ?? {}).map(([k, v]) => `- **${k}**: ${v}`).join("\n"),
    "",
    "## Wardrobe",
    "",
    Object.entries(lockJson.wardrobe ?? {}).map(([k, v]) => `- **${k}**: ${v}`).join("\n"),
    "",
    lockJson.manicure ? `## Manicure\n\n${Object.entries(lockJson.manicure).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}\n` : "",
    lockJson.psychotype ? `## Psychotype\n\n${lockJson.psychotype}\n` : "",
    lockJson.visual_style_dna ? `## Visual Style DNA\n\n${lockJson.visual_style_dna}\n` : "",
    lockJson.environment_context ? `## Environment Context\n\n${lockJson.environment_context}\n` : "",
    lockJson.universal_negative_prompt ? `## Universal Negative Prompt\n\n\`\`\`\n${lockJson.universal_negative_prompt}\n\`\`\`\n` : "",
    "",
    "## Slugs (copy-paste ready)",
    "",
    Object.entries(lockJson.slugs ?? {}).map(([k, v]) => `### ${k}\n\n\`\`\`\n${v}\n\`\`\``).join("\n\n"),
    "",
    "## Context recipes",
    "",
    Object.entries(lockJson.context_recipes ?? {}).map(([k, v]) => `### ${k}\n\n${v}`).join("\n\n"),
  ].filter(Boolean).join("\n");

  await writeFile(join(dirPath, "lock.md"), fm + body + "\n", "utf8");
  console.log(`  ✓ characters/${slug}/lock.md`);
}

async function writeSceneAndShots(project, shots) {
  const sceneSlug = "01-tokyo-night";
  const sceneDir = join(PROJECT, "scenes", sceneSlug);
  await mkdir(join(sceneDir, "shots"), { recursive: true });

  // Scene description
  const sceneFm = frontmatter({
    schema_version: "2.1",
    title: "Tokyo Night",
    characters: ["driver"],
    locations: [],
    last_updated: project.project?.last_updated,
  });
  const sceneBody = [
    `# Tokyo Night`,
    "",
    "## Description",
    "",
    "The full arc of the short distilled into a single scene: F40 through Tokyo, with the driver as the anchor. Shots cover identity, marketing hero, beauty inserts, emotional beat, kinetic insert, mood beats, and hero car. Later projects will split this into multiple scenes.",
    "",
    "## Storyboard",
    "",
    project.treatment ?? "",
    "",
    "### Act arcs",
    "",
    project.overview?.act_1 ? `**Act 1** — ${project.overview.act_1}` : "",
    project.overview?.act_2 ? `\n\n**Act 2** — ${project.overview.act_2}` : "",
    project.overview?.act_3 ? `\n\n**Act 3** — ${project.overview.act_3}` : "",
  ].join("\n");
  await writeFile(join(sceneDir, "scene.md"), sceneFm + sceneBody + "\n", "utf8");
  console.log(`  ✓ scenes/${sceneSlug}/scene.md`);

  // One shot folder per old flat shot
  for (const shot of shots) {
    // Slug = <NN>-<rest> from shot.id like "shot_001_turnaround"
    const m = /^shot_(\d+)_(.+)$/.exec(shot.id ?? "");
    const slug = m ? `${m[1]}-${m[2]}` : shot.id;
    const shotDir = join(sceneDir, "shots", slug);
    await mkdir(join(shotDir, "generated"), { recursive: true });

    // shot.md — description + metadata frontmatter
    const shotFm = frontmatter({
      schema_version: "2.1",
      id: slug,
      legacy_id: shot.id,
      name: shot.name,
      category: shot.category,
      status: shot.status,
      aspect_ratio: shot.aspect_ratio,
      characters: [], // TBD per-shot; old schema didn't track
      location: null,
      version: shot.version ?? 1,
      created: shot.created ?? project.project?.last_updated,
    });
    const shotBody = [
      `# ${shot.name}`,
      "",
      "## Description",
      "",
      shot.purpose ?? "",
      "",
      shot.notes_from_user ? `## Notes\n\n${shot.notes_from_user}\n` : "",
      "",
      (shot.edits_history ?? []).length
        ? "## Edit history\n\n" + shot.edits_history.map((e) => `- v${e.version} (${e.date}): ${e.change}`).join("\n") + "\n"
        : "",
    ].filter(Boolean).join("\n");
    await writeFile(join(shotDir, "shot.md"), shotFm + shotBody + "\n", "utf8");

    // Prompts → statics/<model>/initial.md with one `## v1` section each
    const primary = MODEL_ALIASES[shot.primary_model] ?? shot.primary_model;
    const secondary = MODEL_ALIASES[shot.secondary_model] ?? shot.secondary_model;

    if (shot.nano_banana_2_prompt) {
      await writePromptSet(shotDir, "statics", "nano-banana-pro", "initial", {
        title: "Initial",
        description: `The first lock for this shot's ${primary} pass.`,
        prompts: [{ heading: "v1", body: shot.nano_banana_2_prompt }],
      });
    }
    if (shot.midjourney_prompt) {
      await writePromptSet(shotDir, "statics", "midjourney", "initial", {
        title: "Initial",
        description: `Fast ideation pass.`,
        prompts: [{ heading: "v1", body: shot.midjourney_prompt }],
      });
    }
    console.log(`  ✓ shots/${slug}/ + statics/`);
  }
}

async function writePromptSet(shotDir, category, modelSlug, setSlug, { title, description, prompts }) {
  const dirPath = join(shotDir, category, modelSlug);
  await mkdir(dirPath, { recursive: true });
  const fm = frontmatter({
    schema_version: "1.0",
    model: modelSlug,
    tags: [],
    created: new Date().toISOString().slice(0, 10),
  });
  const body = [
    `# ${title}`,
    "",
    description ?? "",
    "",
    ...prompts.map((p) => [
      `## ${p.heading}`,
      "",
      "```",
      p.body,
      "```",
      "",
    ].join("\n")),
  ].join("\n");
  await writeFile(join(dirPath, `${setSlug}.md`), fm + body, "utf8");
}

// ─────────────────────────────────────────────────────────────

async function main() {
  const project = await loadProject();
  const shots = await loadShots();
  const characterLock = await loadCharacterLock();

  console.log(`Migrating ${PROJECT} (schema v${project.schema_version ?? "unknown"} → v2.1)\n`);
  await writeProjectMd(project);
  if (characterLock) await writeCharacterLock(characterLock);
  await mkdir(join(PROJECT, "locations"), { recursive: true });
  await mkdir(join(PROJECT, "workflows"), { recursive: true });
  await writeSceneAndShots(project, shots);

  console.log(`\n  migration complete. Old files left in place:`);
  console.log(`    shots/               (remove after verifying)`);
  console.log(`    messages/            (deprecated)`);
  console.log(`    storyboard.json      (legacy monolith)`);
  console.log(`    character-lock.json  (copied to characters/<slug>/lock.md)`);
}

await main();
