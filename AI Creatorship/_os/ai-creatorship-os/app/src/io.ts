// File I/O — recursive .md scan, frontmatter-driven registry.
//
// openWorkspace()    → user grants workspace folder → list projects (any subdir with at least one *.md)
// openProject(slug)  → recursively read every .md, parse frontmatter, build registry + view
// save()             → autocommit via server (no-op if nothing changed on disk)
// writeThread()      → write a thread's md file back (round-trips the parsed form)

import { app, loadProject, markDirty, emit, type ProjectEntry, setActiveScene, setActiveShot, unloadProject } from "./state.ts";
import { toast } from "./toast.ts";
import { parseFrontmatter, parseThreadBody, stringifyThread } from "./markdown.ts";
import type {
  Doc,
  DocRegistry,
  Kind,
  ProjectView,
  SceneView,
  ShotView,
  Thread,
  UsageState,
} from "./types.ts";
import { KIND_VALUES } from "./types.ts";

const USAGE_FILE = ".usage.json";

/* ---------- Mode detection ---------- */

export function detectMode(): void {
  const hasAPI = "showDirectoryPicker" in window;
  const secure =
    location.protocol === "https:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1";
  app.liveMode = hasAPI && secure;
}

/* ---------- Reading ---------- */

async function readText(h: FileSystemFileHandle): Promise<{ text: string; mtime: number }> {
  const file = await h.getFile();
  return { text: await file.text(), mtime: file.lastModified };
}

async function readJSON<T = unknown>(h: FileSystemFileHandle): Promise<T> {
  const { text } = await readText(h);
  return JSON.parse(text) as T;
}

async function tryFile(dir: FileSystemDirectoryHandle, name: string): Promise<FileSystemFileHandle | null> {
  try { return await dir.getFileHandle(name); } catch { return null; }
}

/* ---------- Workspace open + project list ---------- */

export async function openWorkspace(): Promise<void> {
  if (!window.showDirectoryPicker) {
    const inIframe = (() => { try { return window.self !== window.top; } catch { return true; } })();
    if (inIframe) toast("iframes can't access the filesystem. Open in a real Brave tab.", "err", 8000);
    else toast("Brave Shields may be blocking. Set Fingerprinting to Standard.", "err", 8000);
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ mode: "readwrite", id: "ai-creatorship-os" });
    app.workspaceHandle = handle;
    await scanWorkspace();
    if (app.projectList.length === 0) {
      toast(`"${handle.name}" has no .md files. Pick the workspace root or a project folder.`, "warn", 7000);
    }
    emit();
  } catch (e) {
    const err = e as { name?: string; message?: string };
    if (err.name !== "AbortError") { console.error(e); toast("open failed: " + (err.message ?? "unknown"), "err"); }
  }
}

/** Fast shallow scan to list projects — NOT a full recursive read. */
export async function scanWorkspace(): Promise<void> {
  if (!app.workspaceHandle) return;
  const entries: ProjectEntry[] = [];
  const own = await buildProjectEntryShallow(app.workspaceHandle);
  if (own) entries.push(own);
  else {
    for await (const item of app.workspaceHandle.values()) {
      if (item.kind !== "directory") continue;
      if (item.name.startsWith("_") || item.name.startsWith(".")) continue;
      const entry = await buildProjectEntryShallow(item);
      if (entry) entries.push(entry);
    }
  }
  entries.sort((a, b) => a.slug.localeCompare(b.slug));
  app.projectList = entries;
  emit();
}

async function buildProjectEntryShallow(dir: FileSystemDirectoryHandle): Promise<ProjectEntry | null> {
  // Heuristic: a project has project.md at root OR at least one .md anywhere
  const projectMd = await tryFile(dir, "project.md");
  let title = dir.name;
  let sceneCount = 0;
  let shotCount = 0;
  let hasMd = !!projectMd;

  if (projectMd) {
    try {
      const { text } = await readText(projectMd);
      const { frontmatter } = parseFrontmatter(text);
      const t = frontmatter.title ?? frontmatter.working_title ?? frontmatter.name;
      if (typeof t === "string" && t) title = t;
    } catch { /* ignore */ }
  }

  // Quick recursive md count (shallow — just walk until we find some)
  try {
    const counts = await quickCount(dir, 3);
    sceneCount = counts.scenes;
    shotCount = counts.shots;
    if (!hasMd) hasMd = counts.mdFiles > 0;
  } catch { /* ignore */ }

  if (!hasMd) return null;
  return { slug: dir.name, title, sceneCount, shotCount };
}

async function quickCount(dir: FileSystemDirectoryHandle, depth: number, acc = { scenes: 0, shots: 0, mdFiles: 0 }): Promise<{ scenes: number; shots: number; mdFiles: number }> {
  if (depth <= 0) return acc;
  for await (const item of dir.values()) {
    if (item.name.startsWith("_") || item.name.startsWith(".")) continue;
    if (item.kind === "file" && item.name.endsWith(".md")) {
      acc.mdFiles++;
      try {
        const { text } = await readText(item);
        const { frontmatter } = parseFrontmatter(text);
        if (frontmatter.kind === "scene") acc.scenes++;
        if (frontmatter.kind === "shot") acc.shots++;
      } catch { /* ignore */ }
    } else if (item.kind === "directory") {
      await quickCount(item, depth - 1, acc);
    }
  }
  return acc;
}

/* ---------- Open a project (full recursive scan) ---------- */

export async function openProject(slug: string): Promise<void> {
  if (!app.workspaceHandle) { toast("open the workspace first", "warn"); return; }
  if (app.dirty) {
    if (!confirm(`Discard unsaved changes and switch to ${slug}?`)) return;
  }
  try {
    const projectHandle = slug === app.workspaceHandle.name
      ? app.workspaceHandle
      : await app.workspaceHandle.getDirectoryHandle(slug);
    const t0 = performance.now();
    const registry = await scanProject(projectHandle);
    const view = buildView(registry, slug);
    const usage = await readUsage(projectHandle);
    const dt = Math.round(performance.now() - t0);
    console.log(`scanned ${slug}: ${registry.byKind.get("prompt-thread")?.length ?? 0} threads, ${registry.byKind.get("shot")?.length ?? 0} shots, ${registry.byKind.get("scene")?.length ?? 0} scenes (${dt}ms)`);
    loadProject(view, projectHandle, usage);
    toast(`opened ${slug}`, "ok", 1500);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(e);
    toast("open project failed: " + msg, "err", 5000);
  }
}

/* ---------- Recursive scan: read every .md, parse frontmatter ---------- */

async function scanProject(projectDir: FileSystemDirectoryHandle): Promise<DocRegistry> {
  const docs: Doc[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  await walk(projectDir, "", docs, errors);

  const registry: DocRegistry = {
    byKind: new Map(),
    byId: new Map(),
    threads: [],
    errors,
    warnings,
  };

  for (const k of KIND_VALUES) registry.byKind.set(k, []);

  for (const doc of docs) {
    registry.byKind.get(doc.kind)!.push(doc);
    const key = `${doc.kind}:${doc.id}`;
    if (registry.byId.has(key)) {
      warnings.push(`duplicate id: ${key} at ${doc.path} and ${registry.byId.get(key)!.path}`);
    } else {
      registry.byId.set(key, doc);
    }

    if (doc.kind === "prompt-thread") {
      registry.threads.push(parseThread(doc));
    }
  }

  // Sort docs within each kind by path for stable rendering
  for (const list of registry.byKind.values()) {
    list.sort((a, b) => a.path.localeCompare(b.path));
  }
  registry.threads.sort((a, b) => a.path.localeCompare(b.path));

  return registry;
}

async function walk(dir: FileSystemDirectoryHandle, prefix: string, out: Doc[], errors: string[]): Promise<void> {
  for await (const item of dir.values()) {
    const name = item.name;
    if (name.startsWith("_") || name.startsWith(".")) continue;
    const path = prefix ? `${prefix}/${name}` : name;
    if (item.kind === "directory") {
      await walk(item, path, out, errors);
    } else if (item.kind === "file" && name.endsWith(".md")) {
      try {
        const doc = await readDoc(item, path);
        out.push(doc);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        errors.push(`parse failed: ${path} — ${msg}`);
        console.error(e);
      }
    }
  }
}

async function readDoc(file: FileSystemFileHandle, path: string): Promise<Doc> {
  const { text, mtime } = await readText(file);
  const { frontmatter, content } = parseFrontmatter(text);

  let kind = (frontmatter.kind as Kind) ?? "note";
  if (!KIND_VALUES.includes(kind)) kind = "note";

  const id = String(frontmatter.id ?? slugFromPath(path));
  let title = String(frontmatter.title ?? "");
  if (!title) {
    const m = /^#\s+(.+)$/m.exec(content);
    if (m) title = m[1]!.trim();
    else title = id;
  }

  return { kind, id, title, path, frontmatter, body: content, mtime };
}

function slugFromPath(path: string): string {
  const base = path.split("/").pop() ?? path;
  return base.replace(/\.md$/, "");
}

function parseThread(doc: Doc): Thread {
  const fm = doc.frontmatter;
  const tags = Array.isArray(fm.tags) ? fm.tags.map(String) : [];
  const { description, iterations } = parseThreadBody(doc.body);
  return {
    ...doc,
    kind: "prompt-thread",
    scene: String(fm.scene ?? ""),
    shot: String(fm.shot ?? ""),
    model: String(fm.model ?? "unknown"),
    media: (fm.media === "video" || fm.media === "audio" ? fm.media : "image") as Thread["media"],
    direction: String(fm.direction ?? ""),
    startingFrame: fm.starting_frame ? String(fm.starting_frame) : null,
    tags,
    description,
    iterations,
  };
}

/* ---------- Build the derived view for the UI ---------- */

function buildView(registry: DocRegistry, slug: string): ProjectView {
  const scenes = registry.byKind.get("scene") ?? [];
  const shots = registry.byKind.get("shot") ?? [];
  const threads = registry.threads;
  const placedThreadPaths = new Set<string>();

  const sceneViews: SceneView[] = scenes
    .map((sceneDoc) => ({
      doc: sceneDoc,
      shots: shots
        .filter((s) => s.frontmatter.scene === sceneDoc.id)
        .map<ShotView>((shotDoc) => ({
          doc: shotDoc,
          threads: threads.filter((t) => {
            const matched = t.shot === shotDoc.id;
            if (matched) placedThreadPaths.add(t.path);
            return matched;
          }),
        })),
    }));

  // Include shots whose parent scene is missing — orphaned but still visible
  const referencedShotIds = new Set<string>();
  for (const sv of sceneViews) for (const sh of sv.shots) referencedShotIds.add(sh.doc.id);
  const orphanShots = shots.filter((s) => !referencedShotIds.has(s.id));
  if (orphanShots.length > 0) {
    sceneViews.push({
      doc: { kind: "scene", id: "_orphans", title: "Orphaned shots", path: "", frontmatter: {}, body: "", mtime: 0 },
      shots: orphanShots.map((sd) => ({
        doc: sd,
        threads: threads.filter((t) => {
          const matched = t.shot === sd.id;
          if (matched) placedThreadPaths.add(t.path);
          return matched;
        }),
      })),
    });
  }

  const unplacedThreads = threads.filter((t) => !placedThreadPaths.has(t.path));
  if (unplacedThreads.length > 0) {
    const byShot = new Map<string, Thread[]>();
    for (const thread of unplacedThreads) {
      const key = thread.shot || "_unassigned-prompts";
      byShot.set(key, [...(byShot.get(key) ?? []), thread]);
    }
    sceneViews.push({
      doc: syntheticDoc("scene", "_unassigned", "Unassigned prompts"),
      shots: [...byShot.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([shotId, groupedThreads]) => ({
        doc: syntheticDoc("shot", shotId, shotId === "_unassigned-prompts" ? "No shot reference" : `Missing shot: ${shotId}`),
        threads: groupedThreads,
      })),
    });
  }

  const project = (registry.byKind.get("project") ?? [])[0] ?? null;

  return {
    project,
    directions: registry.byKind.get("direction") ?? [],
    artDirection: registry.byKind.get("art-direction") ?? [],
    scenes: sceneViews,
    characters: registry.byKind.get("character") ?? [],
    locations: registry.byKind.get("location") ?? [],
    workflows: registry.byKind.get("workflow") ?? [],
    notes: registry.byKind.get("note") ?? [],
    registry,
  };
}

function syntheticDoc(kind: Kind, id: string, title: string): Doc {
  return { kind, id, title, path: "", frontmatter: {}, body: "", mtime: 0 };
}

/* ---------- Usage tracking ---------- */

async function readUsage(projectDir: FileSystemDirectoryHandle): Promise<UsageState> {
  const f = await tryFile(projectDir, USAGE_FILE);
  if (!f) return { copied: {} };
  try {
    const { text } = await readText(f);
    if (!text.trim()) return { copied: {} };
    const parsed = JSON.parse(text) as UsageState;
    return { copied: parsed.copied ?? {} };
  } catch { return { copied: {} }; }
}

export async function writeUsage(): Promise<void> {
  if (!app.projectHandle) return;
  try {
    const h = await app.projectHandle.getFileHandle(USAGE_FILE, { create: true });
    const w = await h.createWritable();
    await w.write(JSON.stringify(app.usage, null, 2) + "\n");
    await w.close();
  } catch (e) { console.warn("usage write failed:", e); }
}

export async function markPromptUsed(promptId: string): Promise<void> {
  const existing = app.usage.copied[promptId];
  app.usage.copied[promptId] = {
    lastAt: new Date().toISOString(),
    count: (existing?.count ?? 0) + 1,
  };
  await writeUsage();
  emit();
}

export async function markPromptUnused(promptId: string): Promise<void> {
  delete app.usage.copied[promptId];
  await writeUsage();
  emit();
}

/* ---------- Write a thread file (round-trip) ---------- */

export async function writeThread(thread: Thread): Promise<void> {
  if (!app.projectHandle) throw new Error("no project open");
  const handle = await resolveFileHandle(app.projectHandle, thread.path);
  const w = await handle.createWritable();
  await w.write(stringifyThread(thread));
  await w.close();
  const slug = app.project?.project?.id ?? app.projectHandle.name;
  void autoCommit(slug, [thread.path]);
}

/** Generic doc writer — preserves frontmatter, replaces body with edited text. */
export async function writeDoc(doc: import("./types.ts").Doc): Promise<void> {
  if (!app.projectHandle) throw new Error("no project open");
  const handle = await resolveFileHandle(app.projectHandle, doc.path);
  const out = stringifyDoc(doc);
  const w = await handle.createWritable();
  await w.write(out);
  await w.close();
  // Auto-commit in the background — best effort
  const slug = app.project?.project?.id ?? app.projectHandle.name;
  void autoCommit(slug, [doc.path]);
}

export async function createDoc(kind: Kind, title: string, body = ""): Promise<void> {
  if (!app.projectHandle) throw new Error("no project open");
  const target = await uniqueDocTarget(kind, slugifyDocId(title || kind));
  const { id, path } = target;
  const frontmatter: Record<string, unknown> = { kind, id, title: title || id };
  if (kind === "workflow") {
    frontmatter.applies_to = "image";
    frontmatter.model = "all";
  }
  const doc: Doc = {
    kind,
    id,
    title: title || id,
    path,
    frontmatter,
    body: body.trim() ? body.trim() : `# ${title || id}\n\nWrite notes here.`,
    mtime: Date.now(),
  };
  const handle = await resolveFileHandle(app.projectHandle, path);
  const w = await handle.createWritable();
  await w.write(stringifyDoc(doc));
  await w.close();
  const slug = app.project?.project?.id ?? app.projectHandle.name;
  void autoCommit(slug, [path]);
  const prevDock = app.dockPage;
  await reload();
  app.dockPage = prevDock;
  emit();
}

function stringifyDoc(doc: import("./types.ts").Doc): string {
  const out: string[] = [];
  const entries = Object.entries(doc.frontmatter);
  if (entries.length > 0) {
    out.push("---");
    for (const [k, v] of entries) out.push(`${k}: ${yamlScalar(v)}`);
    out.push("---", "");
  }
  out.push(doc.body);
  return out.join("\n");
}

function yamlScalar(v: unknown): string {
  if (v == null) return "null";
  if (Array.isArray(v)) return `[${v.map((x) => yamlScalar(x)).join(", ")}]`;
  if (typeof v === "string") {
    if (v === "" || /[:#\[\]{}&*!|>'"%@`,\n]/.test(v) || v.trim() !== v) return JSON.stringify(v);
    return v;
  }
  return JSON.stringify(v);
}

function slugifyDocId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 64) || "untitled";
}

async function uniqueDocTarget(kind: Kind, baseId: string): Promise<{ id: string; path: string }> {
  const root = docRoot(kind);
  let id = baseId;
  let n = 2;
  while (await pathExists(docPath(kind, root, id))) {
    id = `${baseId}-${n++}`;
  }
  return { id, path: docPath(kind, root, id) };
}

function docRoot(kind: Kind): string {
  if (kind === "character") return "characters";
  if (kind === "location") return "locations";
  if (kind === "workflow") return "workflows";
  if (kind === "direction") return "directions";
  if (kind === "art-direction") return "art-direction";
  if (kind === "note") return "notes";
  return "notes";
}

function docPath(kind: Kind, root: string, id: string): string {
  if (kind === "character" || kind === "location") return `${root}/${id}/lock.md`;
  return `${root}/${id}.md`;
}

async function pathExists(path: string): Promise<boolean> {
  if (!app.projectHandle) return false;
  const parts = path.split("/");
  let dir: FileSystemDirectoryHandle = app.projectHandle;
  try {
    for (let i = 0; i < parts.length - 1; i++) dir = await dir.getDirectoryHandle(parts[i]!);
    await dir.getFileHandle(parts[parts.length - 1]!);
    return true;
  } catch {
    return false;
  }
}

async function resolveFileHandle(root: FileSystemDirectoryHandle, path: string): Promise<FileSystemFileHandle> {
  const parts = path.split("/");
  let dir: FileSystemDirectoryHandle = root;
  for (let i = 0; i < parts.length - 1; i++) {
    dir = await dir.getDirectoryHandle(parts[i]!, { create: true });
  }
  return dir.getFileHandle(parts[parts.length - 1]!, { create: true });
}

/* ---------- Reload ---------- */

export async function reload(): Promise<void> {
  if (!app.projectHandle || !app.project) { toast("no project open", "warn"); return; }
  if (app.dirty) {
    if (!confirm("Discard unsaved changes and reload from disk?")) return;
  }
  try {
    const prevScene = app.activeSceneId;
    const prevShot = app.activeShotId;
    const registry = await scanProject(app.projectHandle);
    const view = buildView(registry, app.project.project?.id ?? "");
    const usage = await readUsage(app.projectHandle);
    loadProject(view, app.projectHandle, usage);
    if (prevScene && view.scenes.some((s) => s.doc.id === prevScene)) {
      setActiveScene(prevScene);
      const scene = view.scenes.find((s) => s.doc.id === prevScene);
      if (prevShot && scene?.shots.some((s) => s.doc.id === prevShot)) setActiveShot(prevShot);
    }
    toast("reloaded", "ok");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    toast("reload failed: " + msg, "err");
  }
}

/* ---------- Save (commit via server) ---------- */

export async function save(): Promise<boolean> {
  if (!app.project || !app.projectHandle) return false;
  markDirty(false);
  toast("saved · " + new Date().toLocaleTimeString(), "ok", 1500);
  const slug = app.project.project?.id ?? app.projectHandle.name;
  void autoCommit(slug);
  return true;
}

async function autoCommit(slug: string, paths: string[] = []): Promise<void> {
  try {
    const res = await fetch("/__os/commit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug, message: `${slug}: save (UI)`, paths }),
    });
    if (!res.ok) { console.warn("auto-commit failed:", await res.text()); return; }
    const json = (await res.json()) as { commit?: string; nothing?: boolean };
    if (json.nothing) return;
    if (json.commit) toast(`committed ${json.commit}`, "info", 1200);
  } catch (e) { console.debug("commit endpoint unreachable:", e); }
}

/* ---------- New project ---------- */

export async function createProject(slug: string): Promise<void> {
  const trimmed = slug.trim();
  if (!/^[a-z][a-z0-9-]{1,47}$/.test(trimmed)) {
    toast("slug must be lowercase kebab-case, 2-48 chars, start with a letter", "err", 5000);
    return;
  }
  try {
    const res = await fetch("/__os/new-project", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: trimmed }),
    });
    if (!res.ok) {
      const err = (await res.json().catch(() => ({ error: "unknown" }))) as { error?: string };
      toast("create failed: " + (err.error ?? "see console"), "err", 6000);
      return;
    }
    toast(`created ${trimmed}`, "ok");
    await scanWorkspace();
    if (app.workspaceHandle) await openProject(trimmed);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    toast("create failed: " + msg + " (is the server running?)", "err", 6000);
  }
}

export function leaveProject(): void {
  if (app.dirty) {
    if (!confirm("Discard unsaved changes and return to projects?")) return;
  }
  unloadProject();
}

export function installBeforeUnloadGuard(): void {
  window.addEventListener("beforeunload", (e) => {
    if (app.dirty) { e.preventDefault(); e.returnValue = ""; }
  });
}
