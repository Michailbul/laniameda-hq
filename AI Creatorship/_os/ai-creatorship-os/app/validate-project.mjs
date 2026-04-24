#!/usr/bin/env node
// CLI validator for the markdown `kind:` project graph.

import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node validate-project.mjs <project-dir>");
  process.exit(1);
}

const PROJECT = resolve(process.cwd(), dir);
const VALID_KINDS = new Set(["project", "scene", "shot", "prompt-thread", "character", "location", "workflow", "direction", "art-direction", "note"]);
const VALID_MEDIA = new Set(["image", "video", "audio"]);

const docs = [];
const issues = [];

await walk(PROJECT);
validate();
print();

async function walk(root) {
  for (const name of await readdir(root)) {
    if (name.startsWith(".") || name.startsWith("_")) continue;
    const full = `${root}/${name}`;
    const s = await stat(full);
    if (s.isDirectory()) await walk(full);
    else if (name.endsWith(".md")) await readDoc(full);
  }
}

async function readDoc(file) {
  const text = await readFile(file, "utf8");
  const rel = relative(PROJECT, file).split(sep).join("/");
  const { frontmatter, body } = parseFrontmatter(text);
  const kind = VALID_KINDS.has(frontmatter.kind) ? frontmatter.kind : "note";
  const id = frontmatter.id || rel.replace(/\.md$/, "");
  docs.push({ kind, id, path: rel, frontmatter, body });
}

function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { frontmatter: {}, body: text };
  const fm = {};
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    fm[key] = parseScalar(line.slice(i + 1).trim());
  }
  return { frontmatter: fm, body: text.slice(m[0].length) };
}

function parseScalar(raw) {
  if (raw === "[]" || raw === "") return raw === "[]" ? [] : "";
  if (raw.startsWith("[") && raw.endsWith("]")) {
    const inner = raw.slice(1, -1).trim();
    return inner ? inner.split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")) : [];
  }
  return raw.replace(/^["']|["']$/g, "");
}

function validate() {
  const byKey = new Map();
  for (const doc of docs) {
    const key = `${doc.kind}:${doc.id}`;
    if (byKey.has(key)) {
      issue("error", "duplicate-id", `Duplicate ${key}; first seen at ${byKey.get(key).path}.`, doc);
    } else {
      byKey.set(key, doc);
    }
  }

  const scenes = new Set(docs.filter((d) => d.kind === "scene").map((d) => d.id));
  const shots = new Set(docs.filter((d) => d.kind === "shot").map((d) => d.id));
  const directions = new Set(docs.filter((d) => d.kind === "direction" || d.kind === "art-direction").map((d) => d.id));
  const threads = docs.filter((d) => d.kind === "prompt-thread").map(parseThread);
  const threadsById = new Map(threads.map((t) => [t.id, t]));

  for (const doc of docs.filter((d) => d.kind === "shot")) {
    const scene = doc.frontmatter.scene;
    if (!scene) issue("warning", "missing-shot-scene", "Shot is missing scene: <scene-id>; it will render under Orphaned shots.", doc);
    else if (!scenes.has(scene)) issue("warning", "missing-parent-scene", `Shot points to missing scene "${scene}" and will render under Orphaned shots.`, doc);
  }

  for (const thread of threads) {
    if (!thread.scene) issue("warning", "missing-thread-scene", "Prompt thread is missing scene: <scene-id>; it will render under Unassigned prompts.", thread);
    else if (!scenes.has(thread.scene)) issue("warning", "thread-missing-scene", `Prompt thread points to missing scene "${thread.scene}"; it will still render by shot or under Unassigned prompts.`, thread);

    if (!thread.shot) issue("warning", "missing-thread-shot", "Prompt thread is missing shot: <shot-id>; it will render under Unassigned prompts.", thread);
    else if (!shots.has(thread.shot)) issue("warning", "thread-missing-shot", `Prompt thread points to missing shot "${thread.shot}"; it will render under Unassigned prompts.`, thread);

    if (!thread.model) issue("warning", "missing-thread-model", "Prompt thread is missing model: <model-slug>; UI will group it as unknown.", thread);
    if (!thread.media) issue("warning", "missing-media", "Prompt thread is missing media: image|video|audio; UI defaults to image.", thread);
    else if (!VALID_MEDIA.has(thread.media)) issue("warning", "invalid-media", `Prompt thread has invalid media "${thread.media}"; UI defaults to image.`, thread);
    if (thread.direction && !directions.has(thread.direction)) issue("warning", "thread-missing-direction", `Prompt thread points to missing direction "${thread.direction}".`, thread);
    if (thread.iterations.length === 0) issue("warning", "empty-thread", "Prompt thread has no ## variations.", thread);
    for (const it of thread.iterations) {
      if (!it.archived && !it.body.trim()) issue("warning", "empty-prompt-body", `Variation "${it.slug}" has no fenced prompt body.`, thread, `${thread.id}#${it.slug}`);
    }

    if (thread.startingFrame) {
      const [threadId, fragment] = thread.startingFrame.split("#");
      const source = threadsById.get(threadId);
      if (!source) issue("warning", "missing-starting-frame-thread", `starting_frame points to missing thread "${threadId}".`, thread);
      else if (fragment && !source.iterations.some((it) => it.slug === fragment)) {
        issue("warning", "missing-starting-frame-variation", `starting_frame points to missing variation "#${fragment}".`, thread);
      }
    }
  }

  for (const doc of docs.filter((d) => d.kind === "note")) {
    if (doc.path === "EXPLAINER.md") continue;
    if (doc.body.trim() || Object.keys(doc.frontmatter).length) {
      issue("warning", "note-fallback", "Markdown file is classified as note. Add kind: if the app should wire it into the graph.", doc);
    }
  }
}

function parseThread(doc) {
  const iterations = [];
  const parts = doc.body.split(/^##\s+/m).slice(1);
  for (const part of parts) {
    const [headingLine = "", ...rest] = part.split(/\r?\n/);
    const archived = headingLine.includes("🗑");
    const title = headingLine.trim().replace(/[★📌🗑️]/g, "").trim();
    const slug = slugify(title) || `v${iterations.length + 1}`;
    const body = /```[^\n]*\n([\s\S]*?)\n```/.exec(rest.join("\n"))?.[1] ?? "";
    iterations.push({ slug, body, archived });
  }
  if (iterations.length === 0) {
    const fallback = fallbackPromptBody(doc.body);
    if (fallback) iterations.push({ slug: "v1", body: fallback, archived: false });
  }
  return {
    ...doc,
    scene: doc.frontmatter.scene || "",
    shot: doc.frontmatter.shot || "",
    model: doc.frontmatter.model || "",
    media: doc.frontmatter.media || "",
    direction: doc.frontmatter.direction || "",
    startingFrame: doc.frontmatter.starting_frame || "",
    iterations,
  };
}

function fallbackPromptBody(body) {
  const withoutH1 = body.replace(/^#\s+.+\r?\n?/, "").trim();
  if (!withoutH1) return "";
  const fenced = /```[^\n]*\n([\s\S]*?)\n```/.exec(withoutH1)?.[1]?.trim();
  return fenced || withoutH1;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-");
}

function issue(level, code, message, doc, id = doc.id) {
  issues.push({ level, code, message, path: doc.path, id });
}

function print() {
  const errors = issues.filter((i) => i.level === "error").length;
  const warnings = issues.filter((i) => i.level === "warning").length;
  if (issues.length === 0) {
    console.log(`✓ project graph clean (${docs.length} markdown docs)`);
    return;
  }
  for (const i of issues) {
    console.log(`${i.level.toUpperCase()} ${i.code}: ${i.message}`);
    console.log(`  ${i.path}${i.id ? ` · ${i.id}` : ""}`);
  }
  console.log("");
  console.log(`${errors} error(s), ${warnings} warning(s), ${docs.length} markdown docs`);
  process.exit(errors > 0 ? 2 : 0);
}
