import { detectMode, installBeforeUnloadGuard, openWorkspace, save, reload, leaveProject } from "./io.ts";
import { app, subscribe, setActiveScene, setActiveShot, activeScene } from "./state.ts";
import { renderAll } from "./render/index.ts";
import { toast } from "./toast.ts";
import { initTheme } from "./theme.ts";
import { $ } from "./util.ts";

window.addEventListener("error", (e) => {
  console.error("uncaught", e.error ?? e.message);
  toast("error: " + (e.message ?? "unknown — check console"), "err", 5000);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("unhandled rejection", e.reason);
  const msg = e.reason instanceof Error ? e.reason.message : String(e.reason);
  toast("error: " + msg, "err", 5000);
});

detectMode();
initTheme();
installBeforeUnloadGuard();
initTopbar();
subscribe(() => renderAll());
renderAll();

function initTopbar(): void {
  const modeBadge = $("#modeBadge") as HTMLElement;
  const btnOpen = $("#btnOpen") as HTMLButtonElement;
  const btnReload = $("#btnReload") as HTMLButtonElement;
  const btnSave = $("#btnSave") as HTMLButtonElement;
  const btnProjects = $("#btnProjects") as HTMLButtonElement;
  const projectTitle = $("#projectTitle") as HTMLElement;

  btnOpen.addEventListener("click", () => { void openWorkspace(); });
  btnReload.addEventListener("click", () => { void reload(); });
  btnSave.addEventListener("click", () => { void save(); });
  btnProjects.addEventListener("click", () => leaveProject());

  if (app.liveMode) {
    modeBadge.textContent = "live";
    modeBadge.className = "mode-badge live";
  } else {
    modeBadge.textContent = "unsupported";
    modeBadge.className = "mode-badge fallback";
    modeBadge.title = "Use Chrome / Edge / Brave.";
  }

  const sync = (): void => {
    const inProject = app.view === "project";
    btnOpen.style.display = inProject ? "none" : "";
    btnReload.style.display = inProject ? "" : "none";
    btnSave.style.display = inProject ? "" : "none";
    btnProjects.style.display = inProject ? "" : "none";
    btnSave.disabled = !app.project;
    btnReload.disabled = !app.project;

    if (inProject && app.project) {
      projectTitle.style.display = "";
      projectTitle.replaceChildren();
      projectTitle.appendChild(textSpan("project-title-name", app.project.project?.title ?? "project"));
      projectTitle.appendChild(textSpan("project-title-slug mono", app.project.project?.id ?? ""));
    } else {
      projectTitle.style.display = "none";
    }
  };
  subscribe(sync);
  sync();

  document.addEventListener("keydown", (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === "s") { e.preventDefault(); if (app.project) void save(); return; }
    if (isEditable(e.target)) return;
    if (meta && e.key === "ArrowRight") { e.preventDefault(); nextScene(+1); return; }
    if (meta && e.key === "ArrowLeft")  { e.preventDefault(); nextScene(-1); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); nextShot(+1); return; }
    if (e.key === "ArrowLeft")  { e.preventDefault(); nextShot(-1); return; }
  });
}

function textSpan(className: string, text: string): HTMLElement {
  const s = document.createElement("span");
  s.className = className;
  s.textContent = text;
  return s;
}

function nextShot(delta: number): void {
  const scene = activeScene();
  if (!scene) return;
  const i = scene.shots.findIndex((s) => s.doc.id === app.activeShotId);
  const n = scene.shots[i + delta];
  if (n) setActiveShot(n.doc.id);
}

function nextScene(delta: number): void {
  const scenes = app.project?.scenes ?? [];
  const i = scenes.findIndex((s) => s.doc.id === app.activeSceneId);
  const n = scenes[i + delta];
  if (n) setActiveScene(n.doc.id);
}

function isEditable(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false;
  return t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable;
}
