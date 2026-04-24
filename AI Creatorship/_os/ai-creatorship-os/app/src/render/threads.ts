// Shot page — masonry of threads. Context lives in a right-edge explorer (tabs + slide-in panel).

import { el } from "../util.ts";
import { app, activeShot, activeScene, filters, toggleModelFilter, clearModelFilters, setShowFavoriteOnly, setShowPinnedOnly, setShowArchived, explorer, openExplorer, toggleExplorerCollapsed } from "../state.ts";
import { markPromptUsed, markPromptUnused, writeThread, writeDoc } from "../io.ts";
import { toast } from "../toast.ts";
import { editable, editableLine } from "./editable.ts";
import { renderMarkdown } from "../md-render.ts";
import type { Doc, Iteration, Thread } from "../types.ts";

export function renderShotPage(): HTMLElement {
  const root = el("div", { class: "shot-page" + (explorer.collapsed ? " explorer-collapsed" : "") });
  const shot = activeShot();
  const scene = activeScene();

  if (!shot) {
    root.appendChild(el("div", { class: "shot-empty mono" }, "no shot selected"));
    return root;
  }

  root.appendChild(renderAgentToolbar(shot.doc, scene?.doc ?? null, shot.threads));

  // Main masonry (full width now)
  root.appendChild(renderMain(shot.threads));

  // Right-edge explorer (tabs + optional slide-in panel)
  root.appendChild(renderExplorer(shot.doc, scene?.doc ?? null));

  return root;
}

function renderAgentToolbar(shotDoc: Doc, sceneDoc: Doc | null, threads: Thread[]): HTMLElement {
  const bar = el("div", { class: "agent-toolbar" });
  const text = el("div", { class: "agent-toolbar-text" });
  text.appendChild(el("span", { class: "agent-toolbar-kicker mono" }, "agent context"));
  text.appendChild(el("span", { class: "agent-toolbar-title" }, "Copy the active shot packet for Codex / Claude Code"));
  bar.appendChild(text);

  const copy = el("button", { class: "ghost tiny" }, "copy context");
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildAgentContext(shotDoc, sceneDoc, threads));
      toast("agent context copied", "ok", 1200);
    } catch (err) {
      toast("copy failed", "err");
      console.error(err);
    }
  });
  bar.appendChild(copy);
  return bar;
}

function buildAgentContext(shotDoc: Doc, sceneDoc: Doc | null, threads: Thread[]): string {
  const project = app.project;
  const lines: string[] = [];
  lines.push("AI Creatorship OS agent packet");
  lines.push("");
  lines.push(`Project: ${project?.project?.id ?? "(unknown)"}`);
  if (project?.project?.path) lines.push(`Project file: ${project.project.path}`);
  if (sceneDoc) {
    lines.push(`Scene: ${sceneDoc.id} — ${sceneDoc.title}`);
    lines.push(`Scene file: ${sceneDoc.path}`);
  }
  lines.push(`Shot: ${shotDoc.id} — ${shotDoc.title}`);
  lines.push(`Shot file: ${shotDoc.path}`);
  lines.push("");

  const entities = collectExplorerEntities(shotDoc, sceneDoc);
  const linked = entities.filter((e) => e.doc.path && e.key !== `shot:${shotDoc.id}` && e.key !== `scene:${sceneDoc?.id}`);
  if (linked.length > 0) {
    lines.push("Linked context files to read:");
    for (const e of linked) lines.push(`- ${e.doc.kind}:${e.doc.id} — ${e.doc.path}`);
    lines.push("");
  }

  lines.push("Prompt threads in this shot:");
  if (threads.length === 0) lines.push("- none yet");
  else {
    for (const t of threads) {
      const variations = t.iterations.map((it) => `${t.id}${it.fragment}`).join(", ");
      lines.push(`- ${t.id} (${t.model}, ${t.media}) — ${t.path}`);
      if (variations) lines.push(`  variations: ${variations}`);
    }
  }

  lines.push("");
  lines.push("Agent rules:");
  lines.push("- Read the listed files before writing.");
  lines.push("- Create or edit prompt-thread markdown; do not leave useful prompts only in chat.");
  lines.push("- Preserve kind: frontmatter and scene/shot references when known.");
  lines.push("- If links are missing, still save the prompt-thread; the app will render it under Unassigned prompts and Health will warn.");
  lines.push("- Commit meaningful changes inside this project repo.");
  lines.push("");
  lines.push("Task:");
  return lines.join("\n");
}

/* ═══ Right-edge context explorer ═══ */

interface ExplorerEntity { key: string; label: string; icon: string; doc: Doc; }

function collectExplorerEntities(shotDoc: Doc, sceneDoc: Doc | null): ExplorerEntity[] {
  const list: ExplorerEntity[] = [];
  list.push({ key: `shot:${shotDoc.id}`, label: "Shot", icon: "🎬", doc: shotDoc });
  if (sceneDoc) list.push({ key: `scene:${sceneDoc.id}`, label: "Scene", icon: "🎭", doc: sceneDoc });

  const charIds = collectIds([shotDoc, sceneDoc], "characters");
  for (const id of charIds) {
    const d = findDoc("character", id);
    if (d) list.push({ key: `character:${id}`, label: d.title || id, icon: "👤", doc: d });
  }
  const locIds = collectSingleOrMany([shotDoc, sceneDoc], "location", "locations");
  for (const id of locIds) {
    const d = findDoc("location", id);
    if (d) list.push({ key: `location:${id}`, label: d.title || id, icon: "📍", doc: d });
  }
  const directionIds = collectSingleOrMany([shotDoc, sceneDoc], "direction", "directions");
  for (const id of directionIds) {
    const d = findDoc("direction", id) ?? findDoc("art-direction", id);
    if (d) list.push({ key: `${d.kind}:${id}`, label: d.title || id, icon: "◇", doc: d });
  }
  const propIds = collectSingleOrMany([shotDoc, sceneDoc], "prop", "props");
  for (const id of propIds) {
    const d = findDoc("note", id) ?? findDoc("character", id) ?? findDoc("location", id);
    if (d) list.push({ key: `${d.kind}:${id}`, label: d.title || id, icon: "📦", doc: d });
  }
  return list;
}

function renderExplorer(shotDoc: Doc, sceneDoc: Doc | null): HTMLElement {
  const host = el("div", { class: "explorer" + (explorer.collapsed ? " collapsed" : "") });
  const entities = collectExplorerEntities(shotDoc, sceneDoc);
  const active = entities.find((e) => e.key === explorer.activeKey) ?? entities[0] ?? null;

  const top = el("div", { class: "explorer-top" });
  const collapse = el("button", {
    class: "ghost tiny explorer-collapse",
    title: explorer.collapsed ? "expand context panel" : "collapse context panel",
  }, explorer.collapsed ? "‹" : "›");
  collapse.addEventListener("click", toggleExplorerCollapsed);
  top.appendChild(collapse);
  if (!explorer.collapsed) top.appendChild(el("span", { class: "explorer-top-label mono" }, "context"));
  host.appendChild(top);

  // Vertical tab strip (always visible on the right edge)
  const strip = el("nav", { class: "explorer-tabs" });
  for (const e of entities) {
    const tab = el("button", {
      class: "explorer-tab" + (e.key === active?.key ? " active" : ""),
      title: `${e.label} · ${e.doc.id}`,
    });
    tab.appendChild(el("span", { class: "explorer-tab-icon" }, e.icon));
    tab.appendChild(el("span", { class: "explorer-tab-label" }, shortLabel(e.label)));
    tab.addEventListener("click", () => openExplorer(e.key));
    strip.appendChild(tab);
  }
  host.appendChild(strip);

  // Slide-in panel
  if (active && !explorer.collapsed) {
    const panel = el("aside", { class: "explorer-panel" });
    panel.appendChild(renderExplorerPanel(active));
    host.appendChild(panel);
  }

  return host;
}

function shortLabel(label: string): string {
  if (label.length <= 10) return label;
  return label.slice(0, 9) + "…";
}

function renderExplorerPanel(e: ExplorerEntity): HTMLElement {
  const panel = el("div", { class: "explorer-panel-inner" });

  const head = el("header", { class: "explorer-head" });
  const labelBadge = el("span", { class: "explorer-kind mono" }, e.label.toUpperCase());
  head.appendChild(labelBadge);
  head.appendChild(editableLine(e.doc.title, async (next) => {
    e.doc.title = next;
    e.doc.frontmatter.title = next;
    await writeDoc(e.doc);
  }, { className: "explorer-title", placeholder: "untitled" }));
  head.appendChild(copyButton(e.doc.body.trim(), `copy ${e.label.toLowerCase()} body`));
  const close = el("button", { class: "ghost tiny explorer-close", title: "collapse context panel" }, "›");
  close.addEventListener("click", toggleExplorerCollapsed);
  head.appendChild(close);
  panel.appendChild(head);

  const idRow = el("div", { class: "explorer-id mono" }, e.doc.id);
  panel.appendChild(idRow);

  // Slugs strip for character/location
  const slugs = extractSlugs(e.doc.body);
  if (slugs.length > 0 && (e.doc.kind === "character" || e.doc.kind === "location")) {
    const slugsWrap = el("div", { class: "explorer-slugs" });
    for (const s of slugs) slugsWrap.appendChild(renderSlugChip(s));
    panel.appendChild(slugsWrap);
  }

  // Body rendered as markdown (scrollable). Double-click to open the full edit overlay.
  const body = el("div", { class: "explorer-body markdown-content" });
  if (e.doc.body.trim()) body.appendChild(renderMarkdown(e.doc.body));
  else body.appendChild(el("p", { class: "mono fg-4" }, "empty · double-click to edit"));
  body.addEventListener("dblclick", (ev) => {
    const t = ev.target as HTMLElement;
    if (t.closest("button, .slug-chip, a, input, textarea")) return;
    openEditOverlay(e.doc);
  });
  panel.appendChild(body);

  return panel;
}

function collectIds(docs: (Doc | null)[], key: string): string[] {
  const out = new Set<string>();
  for (const d of docs) {
    if (!d) continue;
    const v = d.frontmatter[key];
    if (Array.isArray(v)) for (const x of v) if (typeof x === "string" && x) out.add(x);
    else if (typeof v === "string" && v) out.add(v);
  }
  return [...out];
}
function collectSingleOrMany(docs: (Doc | null)[], singleKey: string, pluralKey: string): string[] {
  const out = new Set<string>();
  for (const d of docs) {
    if (!d) continue;
    const p = d.frontmatter[pluralKey];
    if (Array.isArray(p)) for (const x of p) if (typeof x === "string" && x) out.add(x);
    const s = d.frontmatter[singleKey];
    if (typeof s === "string" && s) out.add(s);
  }
  return [...out];
}
function findDoc(kind: string, id: string): Doc | null {
  return app.project?.registry.byId.get(`${kind}:${id}`) ?? null;
}

/* ═══ Slug extraction + chips (used by the explorer panel) ═══ */

function extractSlugs(body: string): { title: string; body: string }[] {
  const out: { title: string; body: string }[] = [];
  const lines = body.split(/\r?\n/);
  let currentTitle = "";
  let inCode = false;
  let buf: string[] = [];
  for (const line of lines) {
    const h3 = /^###\s+(.+)/.exec(line);
    if (h3 && !inCode) { currentTitle = h3[1]!.trim(); continue; }
    if (/^```/.test(line)) {
      if (inCode) {
        if (currentTitle) out.push({ title: currentTitle, body: buf.join("\n").trim() });
        buf = [];
        inCode = false;
      } else { inCode = true; }
      continue;
    }
    if (inCode) buf.push(line);
  }
  return out;
}

function renderSlugChip(slug: { title: string; body: string }): HTMLElement {
  const chip = el("button", { class: "slug-chip", title: `copy ${slug.title}` });
  chip.appendChild(el("span", { class: "slug-chip-label mono" }, slug.title));
  chip.appendChild(el("span", { class: "slug-chip-icon" }, "📋"));
  chip.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(slug.body);
      chip.classList.add("copied");
      setTimeout(() => chip.classList.remove("copied"), 900);
    } catch (err) { toast("copy failed", "err"); console.error(err); }
  });
  return chip;
}

function openEditOverlay(doc: Doc): void {
  const backdrop = el("div", { class: "overlay-backdrop" });
  const dialog = el("div", { class: "overlay-dialog" });
  const head = el("div", { class: "overlay-head" });
  head.appendChild(el("span", { class: "mono", style: "color: var(--fg-4); font-size: 10px;" }, `editing ${doc.kind} · ${doc.id}`));
  const close = el("button", { class: "ghost tiny" }, "close  esc");
  close.addEventListener("click", () => backdrop.remove());
  head.appendChild(close);
  dialog.appendChild(head);

  const ta = el("textarea", { class: "overlay-textarea" }) as HTMLTextAreaElement;
  ta.value = doc.body;
  dialog.appendChild(ta);

  const foot = el("div", { class: "overlay-foot" });
  const save = el("button", { class: "primary" }, "Save  ⌘Enter");
  save.addEventListener("click", async () => {
    doc.body = ta.value;
    try { await writeDoc(doc); backdrop.remove(); }
    catch (e) { toast("save failed: " + (e as Error).message, "err"); }
  });
  foot.appendChild(save);
  dialog.appendChild(foot);

  backdrop.appendChild(dialog);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) backdrop.remove(); });
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => { backdrop.classList.add("in"); ta.focus(); });

  ta.addEventListener("keydown", (e) => {
    if (e.key === "Escape") backdrop.remove();
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); save.click(); }
  });
}

function copyButton(text: string, title: string): HTMLButtonElement {
  const btn = el("button", { class: "ghost tiny copy-id-btn", title }, "📋") as HTMLButtonElement;
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "✓";
      setTimeout(() => { btn.textContent = "📋"; }, 900);
    } catch (err) { toast("copy failed", "err"); console.error(err); }
  });
  return btn;
}

/* ═══ MAIN — filter bar + masonry of THREADS ═══ */

function renderMain(threads: Thread[]): HTMLElement {
  const main = el("section", { class: "shot-main" });

  // Apply filters at the thread level
  const shownThreads = threads.filter((t) => {
    if (filters.models.size > 0 && !filters.models.has(t.model)) return false;
    // Per-flag filters are applied at iteration level inside the thread card
    return true;
  });

  const totalIters = threads.reduce((n, t) => n + t.iterations.length, 0);
  const shownIters = shownThreads.reduce((n, t) => {
    let count = 0;
    for (const it of t.iterations) {
      if (filters.showFavoriteOnly && !it.flags.favorite) continue;
      if (filters.showPinnedOnly && !it.flags.pinned) continue;
      if (!filters.showArchived && it.flags.archived) continue;
      count++;
    }
    return n + count;
  }, 0);

  main.appendChild(renderFilterBar(threads, totalIters, shownIters));

  if (shownThreads.length === 0) {
    main.appendChild(el("div", { class: "masonry-empty mono" },
      threads.length === 0
        ? "no threads in this shot · ask the agent to write one"
        : "nothing matches the active filters"));
    return main;
  }

  const layout = el("div", { class: "thread-layout" });
  layout.appendChild(renderThreadRail(shownThreads));
  const groups = el("div", { class: "thread-groups" });
  for (const t of shownThreads) {
    const iterations = t.iterations.filter((it) => {
      if (filters.showFavoriteOnly && !it.flags.favorite) return false;
      if (filters.showPinnedOnly && !it.flags.pinned) return false;
      if (!filters.showArchived && it.flags.archived) return false;
      return true;
    }).sort((a, b) => {
      if (a.flags.pinned !== b.flags.pinned) return a.flags.pinned ? -1 : 1;
      if (a.flags.archived !== b.flags.archived) return a.flags.archived ? 1 : -1;
      return 0;
    });
    if (iterations.length > 0) groups.appendChild(renderPromptGroup(t, iterations));
  }
  layout.appendChild(groups);
  main.appendChild(layout);

  return main;
}

function renderThreadRail(threads: Thread[]): HTMLElement {
  const rail = el("aside", { class: "thread-rail" });
  rail.appendChild(el("div", { class: "thread-rail-kicker mono" }, "threads"));
  const list = el("div", { class: "thread-rail-list" });
  for (const thread of threads) {
    const item = el("div", { class: "thread-rail-item" });
    item.setAttribute("data-model", thread.model);
    item.appendChild(editableLine(thread.title || thread.id, async (next) => {
      thread.title = next;
      thread.frontmatter.title = next;
      await writeThread(thread);
    }, { className: "thread-rail-title", placeholder: "session name" }));
    const meta = el("span", { class: "thread-rail-meta mono" }, `${thread.iterations.length} prompts`);
    item.appendChild(meta);
    item.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).closest("input")) return;
      document.getElementById(threadDomId(thread))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    list.appendChild(item);
  }
  rail.appendChild(list);
  return rail;
}

function renderPromptGroup(thread: Thread, iterations: Iteration[]): HTMLElement {
  const section = el("section", { class: "prompt-group", id: threadDomId(thread) });
  const head = el("header", { class: "prompt-group-head" });
  head.appendChild(editableLine(thread.title || thread.id, async (next) => {
    thread.title = next;
    thread.frontmatter.title = next;
    await writeThread(thread);
  }, { className: "prompt-group-title", placeholder: "session name" }));
  head.appendChild(el("span", { class: "prompt-group-meta mono" }, `${thread.model} · ${iterations.length}`));
  section.appendChild(head);

  const list = el("div", { class: "prompt-list" });
  for (const it of iterations) list.appendChild(renderIterCard(thread, it));
  section.appendChild(list);
  return section;
}

function threadDomId(thread: Thread): string {
  return `thread-${thread.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function renderFilterBar(threads: Thread[], total: number, shown: number): HTMLElement {
  const bar = el("div", { class: "filter-bar" });
  const title = el("div", { class: "filter-bar-head" });
  title.appendChild(el("span", { class: "filter-bar-title" }, "Prompts"));
  title.appendChild(el("span", { class: "filter-bar-count mono" },
    total === shown ? `${total}` : `${shown} / ${total}`));
  bar.appendChild(title);

  const models = [...new Set(threads.map((t) => t.model))].sort();
  const chipsRow = el("div", { class: "filter-chips" });
  for (const m of models) {
    const active = filters.models.has(m);
    const chip = el("button", { class: "filter-chip" + (active ? " active" : "") });
    chip.appendChild(el("span", { class: "filter-chip-dot" }));
    chip.appendChild(el("span", { class: "filter-chip-label mono" }, m));
    const count = threads.filter((t) => t.model === m).reduce((n, t) => n + t.iterations.length, 0);
    chip.appendChild(el("span", { class: "filter-chip-count mono" }, String(count)));
    chip.setAttribute("data-model", m);
    chip.addEventListener("click", () => toggleModelFilter(m));
    chipsRow.appendChild(chip);
  }
  if (filters.models.size > 0) {
    const clear = el("button", { class: "filter-chip-clear ghost tiny" }, "clear");
    clear.addEventListener("click", () => clearModelFilters());
    chipsRow.appendChild(clear);
  }
  bar.appendChild(chipsRow);

  const togglesRow = el("div", { class: "filter-toggles" });
  togglesRow.appendChild(renderToggle("★ favorites only", filters.showFavoriteOnly, setShowFavoriteOnly));
  togglesRow.appendChild(renderToggle("📌 pinned only", filters.showPinnedOnly, setShowPinnedOnly));
  togglesRow.appendChild(renderToggle("🗑 include archived", filters.showArchived, setShowArchived));
  bar.appendChild(togglesRow);

  return bar;
}

function renderToggle(label: string, active: boolean, set: (v: boolean) => void): HTMLElement {
  const btn = el("button", { class: "filter-toggle" + (active ? " active" : "") }, label);
  btn.addEventListener("click", () => set(!active));
  return btn;
}

/* ═══ Thread block (one masonry item = one thread) ═══ */

function renderThreadBlock(thread: Thread): HTMLElement | null {
  // Apply per-iteration filters
  const iterations = thread.iterations.filter((it) => {
    if (filters.showFavoriteOnly && !it.flags.favorite) return false;
    if (filters.showPinnedOnly && !it.flags.pinned) return false;
    if (!filters.showArchived && it.flags.archived) return false;
    return true;
  });
  if (iterations.length === 0) return null;

  const block = el("article", { class: "thread-block" });
  block.setAttribute("data-model", thread.model);

  if (!thread.scene || !thread.shot) {
    block.appendChild(el("div", { class: "thread-link-warning mono" }, "missing scene/shot link · rendered here so it is not lost"));
  }

  if (thread.startingFrame) {
    block.appendChild(el("div", { class: "thread-starting-frame mono" }, `← from ${thread.startingFrame}`));
  }

  // Iterations stack (visible threaded connector)
  const stack = el("div", { class: "iter-stack" });
  const sorted = [...iterations].sort((a, b) => {
    if (a.flags.pinned !== b.flags.pinned) return a.flags.pinned ? -1 : 1;
    if (a.flags.archived !== b.flags.archived) return a.flags.archived ? 1 : -1;
    return 0;
  });
  for (const it of sorted) stack.appendChild(renderIterCard(thread, it));
  block.appendChild(stack);

  // Add iteration
  const foot = el("div", { class: "thread-block-foot" });
  const addBtn = el("button", { class: "ghost tiny", title: `Add variation to ${thread.title || thread.id}` }, "+ variation");
  addBtn.addEventListener("click", () => addIteration(thread));
  foot.appendChild(addBtn);
  block.appendChild(foot);

  return block;
}

/* ═══ Iteration card (lives inside a thread block) ═══ */

function renderIterCard(thread: Thread, it: Iteration): HTMLElement {
  const id = `${thread.id}${it.fragment}`;
  const usage = app.usage.copied[id];
  const used = !!usage;

  const card = el("article", {
    class: "iter-card" + (used ? " used" : "") + (it.flags.pinned ? " pinned" : "") + (it.flags.archived ? " archived" : ""),
  });
  card.setAttribute("data-model", thread.model);

  // Heading row — the prompt card should lead with the usable variation, not file metadata.
  const headRow = el("div", { class: "iter-head-row" });
  headRow.appendChild(editableLine(it.title, async (next) => {
    it.title = next;
    await writeThread(thread);
  }, { className: "iter-heading", placeholder: "heading · double-click" }));
  const flagRow = el("div", { class: "iter-flag-row" });
  flagRow.appendChild(flagBtn("★", "favorite", it.flags.favorite, () => toggleFlag(thread, it, "favorite")));
  flagRow.appendChild(flagBtn("📌", "pin", it.flags.pinned, () => toggleFlag(thread, it, "pinned")));
  headRow.appendChild(flagRow);
  card.appendChild(headRow);

  if (it.notes.trim()) {
    card.appendChild(el("div", { class: "iter-notes" }, it.notes));
  }

  // Body — editable textarea on dblclick
  const bodyWrap = editable(it.body, async (next) => {
    it.body = next;
    await writeThread(thread);
  }, { as: "plain", minHeight: 120, placeholder: "prompt body · double-click to edit" });
  bodyWrap.classList.add("iter-body-wrap");
  card.appendChild(bodyWrap);

  if (used && usage) {
    card.appendChild(el("div", { class: "iter-used mono" }, `copied ${usage.count}× · ${relativeTime(usage.lastAt)}`));
  }

  // Footer actions
  const foot = el("div", { class: "iter-foot" });
  const copyMain = el("button", { class: "primary iter-copy" }, "📋 copy");
  copyMain.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(it.body);
      await markPromptUsed(id);
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 400);
    } catch (err) { toast("copy failed", "err"); console.error(err); }
  });
  foot.appendChild(copyMain);

  const fork = el("button", { class: "ghost tiny", title: "fork as new iteration" }, "⎇");
  fork.addEventListener("click", () => forkIteration(thread, it));
  foot.appendChild(fork);

  const arch = el("button", { class: "ghost tiny", title: it.flags.archived ? "unarchive" : "archive" }, "🗑");
  arch.addEventListener("click", () => toggleFlag(thread, it, "archived"));
  foot.appendChild(arch);

  if (used) {
    const reset = el("button", { class: "ghost tiny" }, "reset");
    reset.addEventListener("click", async () => { await markPromptUnused(id); });
    foot.appendChild(reset);
  }
  card.appendChild(foot);

  return card;
}

async function toggleFlag(thread: Thread, it: Iteration, flag: "favorite" | "pinned" | "archived"): Promise<void> {
  it.flags[flag] = !it.flags[flag];
  try { await writeThread(thread); }
  catch (e) { toast("write failed: " + (e as Error).message, "err"); }
}

async function addIteration(thread: Thread): Promise<void> {
  const nums = thread.iterations
    .map((i) => { const m = /^v(\d+)/.exec(i.slug); return m ? parseInt(m[1]!, 10) : 0; })
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  const slug = `v${next}`;
  thread.iterations.push({
    slug, title: slug, fragment: `#${slug}`,
    flags: { favorite: false, pinned: false, archived: false },
    notes: "", body: "",
  });
  try { await writeThread(thread); toast(`added ${slug}`, "ok", 1000); }
  catch (e) { toast("add failed: " + (e as Error).message, "err"); }
}

async function forkIteration(thread: Thread, source: Iteration): Promise<void> {
  const nums = thread.iterations
    .map((i) => { const m = /^v(\d+)/.exec(i.slug); return m ? parseInt(m[1]!, 10) : 0; })
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  const slug = `v${next}-fork`;
  thread.iterations.push({
    slug, title: `${slug} ← from ${source.slug}`, fragment: `#${slug}`,
    flags: { favorite: false, pinned: false, archived: false },
    notes: `Forked from ${source.slug}.`, body: source.body,
  });
  try { await writeThread(thread); toast(`forked → ${slug}`, "ok", 1000); }
  catch (e) { toast("fork failed: " + (e as Error).message, "err"); }
}

function flagBtn(icon: string, label: string, active: boolean, onClick: () => void): HTMLButtonElement {
  const btn = el("button", { class: "ghost tiny flag-btn" + (active ? " active" : ""), title: label }, icon) as HTMLButtonElement;
  btn.addEventListener("click", (e) => { e.stopPropagation(); onClick(); });
  return btn;
}

function relativeTime(iso: string): string {
  const dt = new Date(iso).getTime();
  const diff = Math.floor((Date.now() - dt) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
