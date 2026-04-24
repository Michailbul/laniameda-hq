// App state for schema kinds v1 — frontmatter-driven.

import type { ProjectView, UsageState } from "./types.ts";

type Listener = () => void;
const listeners = new Set<Listener>();

export interface ProjectEntry {
  slug: string;
  title: string;
  sceneCount: number;
  shotCount: number;
}

export type View = "landing" | "project";
export type DockPage = "shot" | "brief" | "sessions" | "directions" | "characters" | "locations" | "workflows" | "notes" | "health";

export interface AppState {
  view: View;
  dockPage: DockPage;

  workspaceHandle: FileSystemDirectoryHandle | null;
  projectList: ProjectEntry[];

  project: ProjectView | null;
  projectHandle: FileSystemDirectoryHandle | null;

  /** Active focus — ids (not paths). */
  activeSceneId: string | null;
  activeShotId: string | null;

  usage: UsageState;

  /** Per-section collapse state: Map of section-key → collapsed? (true = collapsed) */
  collapsed: Set<string>;

  dirty: boolean;
  liveMode: boolean;
}

export const app: AppState = {
  view: "landing",
  dockPage: "shot",
  workspaceHandle: null,
  projectList: [],
  project: null,
  projectHandle: null,
  activeSceneId: null,
  activeShotId: null,
  usage: { copied: {} },
  collapsed: new Set(),
  dirty: false,
  liveMode: false,
};

export function markDirty(v: boolean): void { app.dirty = v; emit(); }

export function subscribe(l: Listener): () => void { listeners.add(l); return () => listeners.delete(l); }
export function emit(): void {
  for (const l of listeners) { try { l(); } catch (e) { console.error("listener error", e); } }
}

export function activeScene() {
  if (!app.project || !app.activeSceneId) return null;
  return app.project.scenes.find((s) => s.doc.id === app.activeSceneId) ?? null;
}

export function activeShot() {
  const scene = activeScene();
  if (!scene || !app.activeShotId) return null;
  return scene.shots.find((s) => s.doc.id === app.activeShotId) ?? null;
}

export function setActiveScene(id: string): void {
  app.activeSceneId = id;
  const scene = activeScene();
  app.activeShotId = scene?.shots[0]?.doc.id ?? null;
  sidebar.expandedScenes.add(id);
  emit();
}

export function setActiveShot(id: string): void { app.activeShotId = id; emit(); }

export function loadProject(view: ProjectView, handle: FileSystemDirectoryHandle, usage: UsageState): void {
  app.project = view;
  app.projectHandle = handle;
  app.usage = usage;
  app.view = "project";
  app.dockPage = "shot";
  app.activeSceneId = view.scenes[0]?.doc.id ?? null;
  app.activeShotId = view.scenes[0]?.shots[0]?.doc.id ?? null;
  sidebar.expandedScenes.clear();
  if (app.activeSceneId) sidebar.expandedScenes.add(app.activeSceneId);
  app.dirty = false;
  emit();
}

export function unloadProject(): void {
  app.project = null;
  app.projectHandle = null;
  app.activeSceneId = null;
  app.activeShotId = null;
  app.usage = { copied: {} };
  app.view = "landing";
  app.dockPage = "shot";
  app.dirty = false;
  emit();
}

export function setDockPage(page: DockPage): void { app.dockPage = page; emit(); }

export function toggleCollapsed(key: string): void {
  if (app.collapsed.has(key)) app.collapsed.delete(key);
  else app.collapsed.add(key);
  emit();
}
export function isCollapsed(key: string): boolean { return app.collapsed.has(key); }

/** Model filter: empty = show all. Otherwise only show threads whose model is in this set. */
export const filters = {
  models: new Set<string>(),
  showFavoriteOnly: false,
  showPinnedOnly: false,
  showArchived: false,
};

export function toggleModelFilter(model: string): void {
  if (filters.models.has(model)) filters.models.delete(model);
  else filters.models.add(model);
  emit();
}
export function clearModelFilters(): void { filters.models.clear(); emit(); }
export function setShowFavoriteOnly(v: boolean): void { filters.showFavoriteOnly = v; emit(); }
export function setShowPinnedOnly(v: boolean): void { filters.showPinnedOnly = v; emit(); }
export function setShowArchived(v: boolean): void { filters.showArchived = v; emit(); }

/** Right-edge context explorer state. Holds the key of the open entity or null. */
export const explorer = {
  /** Key shape: "<kind>:<id>" — matches the registry key. null = closed. */
  activeKey: null as string | null,
  collapsed: false,
};

/** Left sidebar state. Tracks collapse + which scenes are expanded in the tree. */
export const sidebar = {
  collapsed: false,
  expandedScenes: new Set<string>(),
};

export function toggleSidebarCollapsed(): void {
  sidebar.collapsed = !sidebar.collapsed;
  emit();
}

export function toggleSceneExpanded(sceneId: string): void {
  if (sidebar.expandedScenes.has(sceneId)) sidebar.expandedScenes.delete(sceneId);
  else sidebar.expandedScenes.add(sceneId);
  emit();
}

export function toggleExplorer(key: string): void {
  explorer.activeKey = explorer.activeKey === key ? null : key;
  emit();
}
export function openExplorer(key: string): void {
  explorer.activeKey = key;
  explorer.collapsed = false;
  emit();
}
export function closeExplorer(): void {
  if (explorer.activeKey !== null) { explorer.activeKey = null; emit(); }
}

export function toggleExplorerCollapsed(): void {
  explorer.collapsed = !explorer.collapsed;
  emit();
}
