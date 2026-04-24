// Landing view — project picker as a card grid + "new project" card.

import { el } from "../util.ts";
import { app } from "../state.ts";
import { createProject, openProject, openWorkspace } from "../io.ts";

export function renderLanding(): HTMLElement {
  const root = el("div", { class: "landing" });

  // Heading
  const header = el("div", { class: "landing-header" });
  header.appendChild(el("h1", {}, "Projects"));
  header.appendChild(el("p", { class: "landing-sub" }, app.workspaceHandle
    ? `${app.projectList.length} in ${app.workspaceHandle.name}/`
    : "No workspace open — click the button to grant access."));
  root.appendChild(header);

  if (!app.workspaceHandle) {
    const cta = el("div", { class: "landing-cta" });
    const btn = el("button", { class: "primary" }, "Open workspace");
    btn.addEventListener("click", () => { void openWorkspace(); });
    cta.appendChild(btn);
    cta.appendChild(el("p", { class: "landing-hint" }, "Point it at your AI Creatorship/ folder. The OS scans for projects and lets you pick or create one."));
    root.appendChild(cta);
    return root;
  }

  const grid = el("div", { class: "project-grid" });
  for (const p of app.projectList) grid.appendChild(renderProjectCard(p));
  grid.appendChild(renderNewProjectCard());
  root.appendChild(grid);

  return root;
}

function renderProjectCard(p: { slug: string; title: string; sceneCount: number; shotCount: number }): HTMLElement {
  const card = el("button", { class: "project-card", type: "button" });
  card.appendChild(el("div", { class: "project-card-title" }, p.title));
  card.appendChild(el("div", { class: "project-card-slug mono" }, p.slug));
  const meta = el("div", { class: "project-card-meta" });
  const parts: string[] = [];
  if (p.sceneCount) parts.push(`${p.sceneCount} scene${p.sceneCount === 1 ? "" : "s"}`);
  if (p.shotCount) parts.push(`${p.shotCount} shot${p.shotCount === 1 ? "" : "s"}`);
  if (parts.length === 0) parts.push("empty");
  meta.appendChild(el("span", { class: "mono" }, parts.join(" · ")));
  card.appendChild(meta);
  card.addEventListener("click", () => { void openProject(p.slug); });
  return card;
}

function renderNewProjectCard(): HTMLElement {
  const card = el("button", { class: "project-card project-card-new", type: "button" });
  card.appendChild(el("div", { class: "project-card-plus" }, "+"));
  card.appendChild(el("div", { class: "project-card-title" }, "New project"));
  card.appendChild(el("div", { class: "project-card-slug mono" }, "scaffold from _template/"));
  card.addEventListener("click", openNewProjectModal);
  return card;
}

function openNewProjectModal(): void {
  const backdrop = el("div", { class: "modal-backdrop" });
  const dialog   = el("div", { class: "modal" });
  const close = () => backdrop.remove();

  dialog.appendChild(el("h2", { class: "modal-title" }, "New project"));
  dialog.appendChild(el("p", { class: "modal-sub" }, "Creates the folder under the workspace, scaffolds from _template/, inits its own git repo."));

  const fieldWrap = el("label", { class: "modal-field" });
  fieldWrap.appendChild(el("span", { class: "field-label" }, "slug"));
  const input = el("input", { type: "text", placeholder: "new-project-slug", autofocus: "true" }) as HTMLInputElement;
  fieldWrap.appendChild(input);
  fieldWrap.appendChild(el("span", { class: "tiny-help" }, "lowercase kebab-case · 2–48 chars · starts with a letter · e.g. 'ice-queen-f40'"));
  dialog.appendChild(fieldWrap);

  const actions = el("div", { class: "modal-actions" });
  const cancel = el("button", { class: "ghost" }, "Cancel");
  const submit = el("button", { class: "primary" }, "Create");
  cancel.addEventListener("click", close);
  const submitHandler = async (): Promise<void> => {
    const slug = input.value.trim();
    if (!slug) { input.focus(); return; }
    submit.disabled = true;
    await createProject(slug);
    close();
  };
  submit.addEventListener("click", () => { void submitHandler(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); void submitHandler(); }
    if (e.key === "Escape") close();
  });
  actions.appendChild(cancel);
  actions.appendChild(submit);
  dialog.appendChild(actions);

  backdrop.appendChild(dialog);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => {
    backdrop.classList.add("in");
    input.focus();
  });
}
