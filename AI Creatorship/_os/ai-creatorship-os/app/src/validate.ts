import type { Doc, DocRegistry, Thread } from "./types.ts";

export type IssueLevel = "error" | "warning";

export interface ValidationIssue {
  level: IssueLevel;
  code: string;
  message: string;
  path?: string;
  id?: string;
}

const VALID_MEDIA = new Set(["image", "video", "audio"]);

export function validateRegistry(registry: DocRegistry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  issues.push(...registry.errors.map((message) => ({ level: "error" as const, code: "parse-error", message })));
  issues.push(...registry.warnings.map((message) => ({ level: "warning" as const, code: "registry-warning", message })));

  const scenes = new Set((registry.byKind.get("scene") ?? []).map((d) => d.id));
  const shots = new Set((registry.byKind.get("shot") ?? []).map((d) => d.id));
  const directions = new Set([
    ...(registry.byKind.get("direction") ?? []).map((d) => d.id),
    ...(registry.byKind.get("art-direction") ?? []).map((d) => d.id),
  ]);
  const threadsById = new Map(registry.threads.map((t) => [t.id, t]));

  for (const doc of registry.byKind.get("project") ?? []) {
    if (!doc.id) push(issues, "error", "missing-project-id", "Project doc is missing an id.", doc);
  }

  for (const doc of registry.byKind.get("scene") ?? []) {
    if (!doc.id) push(issues, "error", "missing-scene-id", "Scene is missing an id.", doc);
    if (!doc.title) push(issues, "warning", "missing-scene-title", "Scene is missing a title.", doc);
  }

  for (const doc of registry.byKind.get("shot") ?? []) {
    if (!doc.id) push(issues, "error", "missing-shot-id", "Shot is missing an id.", doc);
    const scene = asString(doc.frontmatter.scene);
    if (!scene) push(issues, "warning", "missing-shot-scene", "Shot is missing scene: <scene-id>; it will render under Orphaned shots.", doc);
    else if (!scenes.has(scene)) push(issues, "warning", "missing-parent-scene", `Shot points to missing scene "${scene}" and will render under Orphaned shots.`, doc);
  }

  for (const thread of registry.threads) validateThread(thread, scenes, shots, directions, threadsById, issues);

  for (const doc of registry.byKind.get("note") ?? []) {
    if (doc.path === "EXPLAINER.md") continue;
    if (doc.path.startsWith("_archive/")) continue;
    if (doc.body.trim() || Object.keys(doc.frontmatter).length > 0) {
      push(issues, "warning", "note-fallback", "Markdown file is classified as note. Add kind: if the app should wire it into the project graph.", doc);
    }
  }

  return issues;
}

function validateThread(
  thread: Thread,
  scenes: Set<string>,
  shots: Set<string>,
  directions: Set<string>,
  threadsById: Map<string, Thread>,
  issues: ValidationIssue[],
): void {
  if (!thread.id) push(issues, "error", "missing-thread-id", "Prompt thread is missing an id.", thread);

  if (!thread.scene) push(issues, "warning", "missing-thread-scene", "Prompt thread is missing scene: <scene-id>; it will render under Unassigned prompts.", thread);
  else if (!scenes.has(thread.scene)) push(issues, "warning", "thread-missing-scene", `Prompt thread points to missing scene "${thread.scene}"; it will still render by shot or under Unassigned prompts.`, thread);

  if (!thread.shot) push(issues, "warning", "missing-thread-shot", "Prompt thread is missing shot: <shot-id>; it will render under Unassigned prompts.", thread);
  else if (!shots.has(thread.shot)) push(issues, "warning", "thread-missing-shot", `Prompt thread points to missing shot "${thread.shot}"; it will render under Unassigned prompts.`, thread);

  if (!thread.model || thread.model === "unknown") push(issues, "warning", "missing-thread-model", "Prompt thread is missing model: <model-slug>; UI will group it as unknown.", thread);
  const rawMedia = asString(thread.frontmatter.media);
  if (!rawMedia) push(issues, "warning", "missing-media", "Prompt thread is missing media: image|video|audio; UI defaults to image.", thread);
  else if (!VALID_MEDIA.has(rawMedia)) push(issues, "warning", "invalid-media", `Prompt thread has invalid media "${rawMedia}"; UI defaults to image.`, thread);
  if (thread.direction && !directions.has(thread.direction)) push(issues, "warning", "thread-missing-direction", `Prompt thread points to missing direction "${thread.direction}".`, thread);
  if (thread.iterations.length === 0) push(issues, "warning", "empty-thread", "Prompt thread has no ## variations.", thread);

  for (const it of thread.iterations) {
    if (!it.flags.archived && !it.body.trim()) {
      issues.push({
        level: "warning",
        code: "empty-prompt-body",
        message: `Variation "${it.slug}" has no fenced prompt body.`,
        path: thread.path,
        id: `${thread.id}${it.fragment}`,
      });
    }
  }

  if (thread.startingFrame) {
    const [threadId, fragment] = thread.startingFrame.split("#");
    const source = threadId ? threadsById.get(threadId) : null;
    if (!source) push(issues, "warning", "missing-starting-frame-thread", `starting_frame points to missing thread "${threadId}".`, thread);
    else if (fragment && !source.iterations.some((it) => it.slug === fragment)) {
      push(issues, "warning", "missing-starting-frame-variation", `starting_frame points to missing variation "#${fragment}".`, thread);
    }
  }
}

function push(issues: ValidationIssue[], level: IssueLevel, code: string, message: string, doc: Doc): void {
  issues.push({ level, code, message, path: doc.path, id: doc.id });
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}
