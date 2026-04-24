// Top-level render router.

import { $, el } from "../util.ts";
import { app } from "../state.ts";
import { toast } from "../toast.ts";
import { createDoc, writeDoc } from "../io.ts";
import { renderLanding } from "./landing.ts";
import { renderShotPage } from "./threads.ts";
import { renderSessionsPage } from "./sessions.ts";
import { renderDock } from "./dock.ts";
import { renderSidebar } from "./sidebar.ts";
import { sidebar } from "../state.ts";
import { validateRegistry } from "../validate.ts";
import { editable, editableLine } from "./editable.ts";
import type { Doc, Kind } from "../types.ts";

export function renderAll(): void {
  const content = $("#content") as HTMLElement | null;
  const empty = $("#emptyState") as HTMLElement | null;
  if (!content || !empty) return;

  empty.style.display = "none";
  content.style.display = "block";
  content.replaceChildren();

  if (app.view === "landing") {
    content.appendChild(renderLanding());
    return;
  }

  const onShot = app.dockPage === "shot";
  const shell = el("div", {
    class: "project-shell" + (onShot ? " has-sidebar" : "") + (onShot && sidebar.collapsed ? " sidebar-collapsed" : ""),
  });
  if (onShot) {
    shell.appendChild(safe("sidebar", renderSidebar));
  }
  shell.appendChild(safe("page", renderCurrentPage));
  shell.appendChild(safe("dock", renderDock));
  content.appendChild(shell);
}

function renderCurrentPage(): HTMLElement {
  switch (app.dockPage) {
    case "shot":       return renderShotPage();
    case "brief":      return renderBriefPage();
    case "sessions":   return renderSessionsPage();
    case "directions": return renderEditableDocPage("Directions", "direction", [...(app.project?.directions ?? []), ...(app.project?.artDirection ?? [])]);
    case "characters": return renderEditableDocPage("Characters", "character", app.project?.characters ?? []);
    case "locations":  return renderEditableDocPage("Locations", "location", app.project?.locations ?? []);
    case "workflows":  return renderEditableDocPage("Workflows", "workflow", app.project?.workflows ?? []);
    case "notes":      return renderEditableDocPage("Notes", "note", app.project?.notes ?? []);
    case "health":     return renderHealthPage();
  }
}

function renderBriefPage(): HTMLElement {
  const wrap = el("div", { class: "dock-page" });
  wrap.appendChild(renderDockPageHead("Brief"));
  if (!app.project?.project) {
    wrap.appendChild(el("p", { class: "mono fg-4" }, "no project.md file in this project"));
    return wrap;
  }
  wrap.appendChild(renderDocEditor(app.project.project));
  return wrap;
}

function renderEditableDocPage(title: string, kind: Kind, docs: Doc[]): HTMLElement {
  const wrap = el("div", { class: "dock-page" });
  wrap.appendChild(renderDockPageHead(title, () => addDoc(kind)));
  if (!docs || docs.length === 0) {
    wrap.appendChild(el("p", { class: "mono fg-4" }, `no ${title.toLowerCase()} yet`));
    return wrap;
  }
  const stack = el("div", { class: "doc-editor-stack" });
  for (const doc of docs) stack.appendChild(renderDocEditor(doc));
  wrap.appendChild(stack);
  return wrap;
}

function renderDockPageHead(title: string, onAdd?: () => void): HTMLElement {
  const head = el("div", { class: "dock-page-head" });
  head.appendChild(el("h1", {}, title));
  if (onAdd) {
    const btn = el("button", { class: "primary" }, "+ add");
    btn.addEventListener("click", onAdd);
    head.appendChild(btn);
  }
  return head;
}

function renderDocEditor(doc: Doc): HTMLElement {
  const card = el("article", { class: "doc-editor" });
  const head = el("header", { class: "doc-editor-head" });
  head.appendChild(editableLine(doc.title, async (next) => {
    doc.title = next;
    doc.frontmatter.title = next;
    await writeDoc(doc);
  }, { className: "doc-editor-title", placeholder: "title" }));
  if (doc.path) head.appendChild(el("span", { class: "doc-editor-path mono" }, doc.path));
  card.appendChild(head);
  const body = editable(doc.body, async (next) => {
    doc.body = next;
    await writeDoc(doc);
  }, { as: "plain", minHeight: 260, placeholder: "write markdown..." });
  body.classList.add("doc-editor-body");
  card.appendChild(body);
  return card;
}

function addDoc(kind: Kind): void {
  const title = prompt(`New ${kind} title`);
  if (!title?.trim()) return;
  void createDoc(kind, title.trim()).catch((e) => {
    const msg = e instanceof Error ? e.message : String(e);
    toast(`create failed: ${msg}`, "err", 5000);
  });
}

function renderHealthPage(): HTMLElement {
  const wrap = el("div", { class: "dock-page health-page" });
  wrap.appendChild(el("h1", {}, "Health"));
  if (!app.project) {
    wrap.appendChild(el("p", { class: "mono fg-4" }, "no project open"));
    return wrap;
  }

  const issues = validateRegistry(app.project.registry);
  const errors = issues.filter((i) => i.level === "error").length;
  const warnings = issues.filter((i) => i.level === "warning").length;
  const summary = el("div", { class: "health-summary" });
  summary.appendChild(el("div", { class: errors ? "health-pill error" : "health-pill ok" }, errors ? `${errors} error${errors === 1 ? "" : "s"}` : "0 errors"));
  summary.appendChild(el("div", { class: warnings ? "health-pill warn" : "health-pill ok" }, warnings ? `${warnings} warning${warnings === 1 ? "" : "s"}` : "0 warnings"));
  summary.appendChild(el("div", { class: "health-pill" }, `${app.project.registry.threads.length} prompt thread${app.project.registry.threads.length === 1 ? "" : "s"}`));
  wrap.appendChild(summary);

  if (issues.length === 0) {
    wrap.appendChild(el("p", { class: "mono fg-4" }, "project graph is clean"));
    return wrap;
  }

  const list = el("div", { class: "health-list" });
  for (const issue of issues) {
    const item = el("article", { class: `health-item ${issue.level}` });
    const head = el("div", { class: "health-item-head" });
    head.appendChild(el("span", { class: "health-level mono" }, issue.level));
    head.appendChild(el("span", { class: "health-code mono" }, issue.code));
    item.appendChild(head);
    item.appendChild(el("div", { class: "health-message" }, issue.message));
    const meta = [issue.path, issue.id].filter(Boolean).join(" · ");
    if (meta) item.appendChild(el("div", { class: "health-meta mono" }, meta));
    list.appendChild(item);
  }
  wrap.appendChild(list);
  return wrap;
}

function safe(label: string, build: () => HTMLElement): HTMLElement {
  try { return build(); }
  catch (e) {
    console.error(`render error in ${label}:`, e);
    toast(`render error in ${label} — check console`, "err", 6000);
    const err = el("section", { class: "block render-error" });
    err.appendChild(el("h2", {}, `⚠ ${label} failed to render`));
    const msg = e instanceof Error ? e.message : String(e);
    err.appendChild(el("pre", {}, msg));
    return err;
  }
}
