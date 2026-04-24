// Agent sessions page. The app does not host the conversation; it prepares
// copyable scope packets for separate Codex / Claude Code threads.

import { el } from "../util.ts";
import { app, setActiveScene, setActiveShot, setDockPage } from "../state.ts";
import { toast } from "../toast.ts";
import type { Doc, ProjectView, SceneView, ShotView, Thread } from "../types.ts";

const WORKSPACE_ROOT = "/Users/michael/work/laniameda/laniameda-hq/AI Creatorship";
const OS_CONTEXT_CMD = "_os/ai-creatorship-os/bin/os.sh context";
const OS_VALIDATE_CMD = "_os/ai-creatorship-os/bin/os.sh validate";

interface SessionScope {
  id: string;
  kind: "project" | "direction" | "scene" | "shot" | "unassigned";
  title: string;
  subtitle: string;
  sceneId?: string;
  shotId?: string;
  files: string[];
  threadCount: number;
  variationCount: number;
  command: string;
}

export function renderSessionsPage(): HTMLElement {
  const root = el("div", { class: "dock-page sessions-page" });
  root.appendChild(renderHeader());

  if (!app.project) {
    root.appendChild(el("p", { class: "mono fg-4" }, "no project open"));
    return root;
  }

  const scopes = collectScopes(app.project);
  root.appendChild(renderSummary(scopes));

  const grid = el("div", { class: "session-grid" });
  for (const scope of scopes) grid.appendChild(renderScopeCard(scope));
  root.appendChild(grid);
  return root;
}

function renderHeader(): HTMLElement {
  const header = el("div", { class: "sessions-head" });
  const copy = el("button", { class: "primary" }, "copy project packet");
  copy.addEventListener("click", () => {
    const projectScope = app.project ? collectScopes(app.project).find((s) => s.kind === "project") : null;
    if (projectScope) void copyPacket(projectScope);
  });
  header.appendChild(el("div", {}, [
    el("h1", {}, "Agent Sessions"),
    el("p", { class: "sessions-sub" }, "Launch separate Codex threads from stable filesystem scopes."),
  ]));
  header.appendChild(copy);
  return header;
}

function renderSummary(scopes: SessionScope[]): HTMLElement {
  const wrap = el("div", { class: "session-summary" });
  const shots = scopes.filter((s) => s.kind === "shot").length;
  const directions = scopes.filter((s) => s.kind === "direction").length;
  const threads = scopes.reduce((n, s) => s.kind === "project" ? n : n + s.threadCount, 0);
  wrap.appendChild(metric("scopes", String(scopes.length)));
  wrap.appendChild(metric("shots", String(shots)));
  wrap.appendChild(metric("directions", String(directions)));
  wrap.appendChild(metric("threads", String(threads)));
  return wrap;
}

function metric(label: string, value: string): HTMLElement {
  const item = el("div", { class: "session-metric" });
  item.appendChild(el("span", { class: "session-metric-value mono" }, value));
  item.appendChild(el("span", { class: "session-metric-label" }, label));
  return item;
}

function renderScopeCard(scope: SessionScope): HTMLElement {
  const card = el("article", { class: `session-card scope-${scope.kind}` });

  const head = el("header", { class: "session-card-head" });
  head.appendChild(el("span", { class: "session-kind mono" }, scope.kind));
  head.appendChild(el("h2", { class: "session-title" }, scope.title));
  card.appendChild(head);

  card.appendChild(el("div", { class: "session-subtitle" }, scope.subtitle));

  const stats = el("div", { class: "session-stats" });
  stats.appendChild(el("span", { class: "mono" }, `${scope.threadCount} threads`));
  stats.appendChild(el("span", { class: "mono" }, `${scope.variationCount} variations`));
  stats.appendChild(el("span", { class: "mono" }, `${scope.files.length} files`));
  card.appendChild(stats);

  const command = el("code", { class: "session-command" }, scope.command);
  card.appendChild(command);

  const files = el("div", { class: "session-files" });
  for (const file of scope.files.slice(0, 5)) files.appendChild(el("div", { class: "session-file mono" }, file));
  if (scope.files.length > 5) files.appendChild(el("div", { class: "session-file more mono" }, `+${scope.files.length - 5} more`));
  card.appendChild(files);

  const actions = el("div", { class: "session-actions" });
  const copy = el("button", { class: "primary" }, "copy launch packet");
  copy.addEventListener("click", () => { void copyPacket(scope); });
  actions.appendChild(copy);

  const commandBtn = el("button", { class: "ghost tiny" }, "copy command");
  commandBtn.addEventListener("click", () => { void copyText(scope.command, "command copied"); });
  actions.appendChild(commandBtn);

  if (scope.sceneId || scope.shotId) {
    const focus = el("button", { class: "ghost tiny" }, "focus");
    focus.addEventListener("click", () => focusScope(scope));
    actions.appendChild(focus);
  }
  card.appendChild(actions);

  return card;
}

function collectScopes(project: ProjectView): SessionScope[] {
  const slug = project.project?.id ?? app.projectHandle?.name ?? "project";
  const scopes: SessionScope[] = [];
  const allThreads = project.registry.threads;

  scopes.push({
    id: "project",
    kind: "project",
    title: project.project?.title ?? slug,
    subtitle: slug,
    files: compact([
      "CLAUDE.md",
      "_os/ai-creatorship-os/CLAUDE.md",
      project.project?.path,
      ...project.directions.map((d) => d.path),
    ]),
    threadCount: allThreads.length,
    variationCount: countVariations(allThreads),
    command: `${OS_CONTEXT_CMD} ${slug}`,
  });

  for (const doc of [...project.directions, ...project.artDirection]) {
    const threads = allThreads.filter((t) => t.direction === doc.id);
    scopes.push({
      id: `direction:${doc.id}`,
      kind: "direction",
      title: doc.title || doc.id,
      subtitle: doc.id,
      files: compact([doc.path, project.project?.path, ...threads.map((t) => t.path)]),
      threadCount: threads.length,
      variationCount: countVariations(threads),
      command: `${OS_CONTEXT_CMD} ${slug}`,
    });
  }

  for (const scene of project.scenes) {
    const threads = scene.shots.flatMap((shot) => shot.threads);
    const kind = scene.doc.id === "_unassigned" ? "unassigned" : "scene";
    scopes.push({
      id: `scene:${scene.doc.id}`,
      kind,
      title: scene.doc.title || scene.doc.id,
      subtitle: scene.doc.id,
      sceneId: scene.doc.id.startsWith("_") ? undefined : scene.doc.id,
      files: sceneFiles(scene, threads),
      threadCount: threads.length,
      variationCount: countVariations(threads),
      command: scene.doc.id.startsWith("_") ? `${OS_CONTEXT_CMD} ${slug}` : `${OS_CONTEXT_CMD} ${slug} ${scene.doc.id}`,
    });

    for (const shot of scene.shots) {
      const shotKind = scene.doc.id === "_unassigned" ? "unassigned" : "shot";
      scopes.push({
        id: `shot:${shot.doc.id}`,
        kind: shotKind,
        title: shot.doc.title || shot.doc.id,
        subtitle: `${scene.doc.id} / ${shot.doc.id}`,
        sceneId: scene.doc.id.startsWith("_") ? undefined : scene.doc.id,
        shotId: shot.doc.id.startsWith("_") ? undefined : shot.doc.id,
        files: shotFiles(scene.doc, shot),
        threadCount: shot.threads.length,
        variationCount: countVariations(shot.threads),
        command: scene.doc.id.startsWith("_") || shot.doc.id.startsWith("_")
          ? `${OS_CONTEXT_CMD} ${slug}`
          : `${OS_CONTEXT_CMD} ${slug} ${scene.doc.id} ${shot.doc.id}`,
      });
    }
  }

  return scopes.filter((scope, index) => {
    if (scope.kind === "direction" && scope.threadCount === 0 && scope.files.length <= 2) return true;
    if (scope.kind === "scene" && scope.threadCount === 0 && scope.files.length === 0) return false;
    if (scope.kind === "unassigned" && scope.threadCount === 0) return false;
    return index === 0 || scope.files.length > 0 || scope.threadCount > 0;
  });
}

function sceneFiles(scene: SceneView, threads: Thread[]): string[] {
  return compact([
    scene.doc.path,
    ...scene.shots.map((shot) => shot.doc.path),
    ...threads.map((thread) => thread.path),
  ]);
}

function shotFiles(sceneDoc: Doc, shot: ShotView): string[] {
  return compact([
    sceneDoc.path,
    shot.doc.path,
    ...collectReferenceFiles(shot.doc),
    ...shot.threads.map((thread) => thread.path),
  ]);
}

function collectReferenceFiles(doc: Doc): string[] {
  const ids = [
    ...asList(doc.frontmatter.characters),
    ...asList(doc.frontmatter.locations),
    ...asList(doc.frontmatter.direction ? [doc.frontmatter.direction] : []),
  ];
  const files: string[] = [];
  for (const id of ids) {
    const found =
      app.project?.registry.byId.get(`character:${id}`) ??
      app.project?.registry.byId.get(`location:${id}`) ??
      app.project?.registry.byId.get(`direction:${id}`) ??
      app.project?.registry.byId.get(`art-direction:${id}`);
    if (found?.path) files.push(found.path);
  }
  return files;
}

function buildPacket(scope: SessionScope): string {
  const project = app.project;
  const slug = project?.project?.id ?? app.projectHandle?.name ?? "project";
  const lines: string[] = [];
  lines.push("We are starting a separate Codex / Claude Code thread for AI Creatorship.");
  lines.push("");
  lines.push(`Scope: ${scope.kind}:${scope.id} - ${scope.title}`);
  lines.push(`Project: ${slug}`);
  lines.push(`Workspace: ${WORKSPACE_ROOT}`);
  lines.push("");
  lines.push("Run first:");
  lines.push(`cd "${WORKSPACE_ROOT}"`);
  lines.push(scope.command);
  lines.push("");
  lines.push("Read before writing:");
  lines.push("- CLAUDE.md");
  lines.push("- _os/ai-creatorship-os/CLAUDE.md");
  for (const file of scope.files) lines.push(`- ${file}`);
  lines.push("");
  lines.push("Working rules:");
  lines.push("- Stay inside this scope unless Michael explicitly expands it.");
  lines.push("- Use chat for collaboration; use bash/file edits to persist useful prompts.");
  lines.push("- Save useful prompts as prompt-thread markdown files.");
  lines.push("- One prompt-thread file per concept; multiple variations as ## v1, ## v2.");
  lines.push("- Preserve kind: frontmatter and scene/shot/direction ids when known.");
  lines.push(`- Validate with: ${OS_VALIDATE_CMD} ${slug}`);
  lines.push("- Commit meaningful project changes inside the project repo.");
  lines.push("");
  lines.push("Current scope stats:");
  lines.push(`- ${scope.threadCount} prompt threads`);
  lines.push(`- ${scope.variationCount} prompt variations`);
  lines.push(`- ${scope.files.length} files to inspect`);
  lines.push("");
  lines.push("Task:");
  return lines.join("\n");
}

async function copyPacket(scope: SessionScope): Promise<void> {
  await copyText(buildPacket(scope), "launch packet copied");
}

async function copyText(text: string, message: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast(message, "ok", 1200);
  } catch (err) {
    toast("copy failed", "err");
    console.error(err);
  }
}

function focusScope(scope: SessionScope): void {
  if (scope.sceneId) setActiveScene(scope.sceneId);
  if (scope.shotId) setActiveShot(scope.shotId);
  setDockPage("shot");
}

function countVariations(threads: Thread[]): number {
  return threads.reduce((total, thread) => total + thread.iterations.length, 0);
}

function asList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string" && v) return [v];
  return [];
}

function compact(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.filter((v): v is string => !!v))];
}
