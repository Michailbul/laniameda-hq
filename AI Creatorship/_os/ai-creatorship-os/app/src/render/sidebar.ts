// Left sidebar — project title + scenes→shots tree (collapsible).

import { el } from "../util.ts";
import { app, sidebar, setActiveScene, setActiveShot, toggleSidebarCollapsed, toggleSceneExpanded } from "../state.ts";

export function renderSidebar(): HTMLElement {
  const host = el("aside", { class: "sidebar" + (sidebar.collapsed ? " collapsed" : "") });

  host.appendChild(renderSidebarTop());
  if (!sidebar.collapsed) host.appendChild(renderSidebarTree());

  return host;
}

function renderSidebarTop(): HTMLElement {
  const top = el("div", { class: "sidebar-top" });

  const collapse = el("button", {
    class: "sidebar-collapse ghost tiny",
    title: sidebar.collapsed ? "expand sidebar" : "collapse sidebar",
    "aria-label": sidebar.collapsed ? "expand sidebar" : "collapse sidebar",
  });
  collapse.appendChild(collapseIcon(sidebar.collapsed));
  collapse.addEventListener("click", toggleSidebarCollapsed);
  top.appendChild(collapse);

  if (!sidebar.collapsed) {
    const label = el("div", { class: "sidebar-top-label" });
    label.appendChild(el("span", { class: "sidebar-kicker mono" }, "project"));
    label.appendChild(el("span", { class: "sidebar-title" }, app.project?.project?.title ?? app.project?.project?.id ?? "workspace"));
    top.appendChild(label);
  }

  return top;
}

function renderSidebarTree(): HTMLElement {
  const tree = el("div", { class: "sidebar-tree" });

  const scenes = app.project?.scenes ?? [];
  if (scenes.length === 0) {
    tree.appendChild(el("div", { class: "sidebar-empty mono" }, "no scenes yet"));
    return tree;
  }

  tree.appendChild(el("div", { class: "sidebar-section-label mono" }, "scenes"));

  const list = el("div", { class: "sidebar-scene-list" });
  for (const scene of scenes) {
    const expanded = sidebar.expandedScenes.has(scene.doc.id);
    const isActive = scene.doc.id === app.activeSceneId;

    const group = el("div", { class: "sidebar-scene" + (isActive ? " active" : "") + (expanded ? " expanded" : "") });

    const row = el("button", { class: "sidebar-scene-row", title: scene.doc.title });
    const chev = el("span", { class: "sidebar-chev" });
    chev.appendChild(chevronIcon(expanded));
    chev.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSceneExpanded(scene.doc.id);
    });
    row.appendChild(chev);

    const name = el("span", { class: "sidebar-scene-name" }, scene.doc.title || scene.doc.id);
    row.appendChild(name);

    const count = el("span", { class: "sidebar-scene-count mono" }, String(scene.shots.length));
    row.appendChild(count);

    row.addEventListener("click", () => {
      setActiveScene(scene.doc.id);
    });

    group.appendChild(row);

    if (expanded) {
      const shots = el("div", { class: "sidebar-shot-list" });
      if (scene.shots.length === 0) {
        shots.appendChild(el("div", { class: "sidebar-shot-empty mono" }, "no shots"));
      } else {
        for (const shot of scene.shots) {
          const activeShot = shot.doc.id === app.activeShotId && isActive;
          const shotBtn = el("button", {
            class: "sidebar-shot" + (activeShot ? " active" : ""),
            title: shot.doc.title,
          });
          shotBtn.appendChild(el("span", { class: "sidebar-shot-dot" }));
          shotBtn.appendChild(el("span", { class: "sidebar-shot-name" }, shot.doc.title || shot.doc.id));
          const mediaCounts: string[] = [];
          const imgs = shot.threads.filter((t) => t.media === "image").length;
          const vids = shot.threads.filter((t) => t.media === "video").length;
          if (imgs) mediaCounts.push(`${imgs}i`);
          if (vids) mediaCounts.push(`${vids}v`);
          if (mediaCounts.length) {
            shotBtn.appendChild(el("span", { class: "sidebar-shot-meta mono" }, mediaCounts.join(" ")));
          }
          shotBtn.addEventListener("click", () => {
            if (!isActive) setActiveScene(scene.doc.id);
            setActiveShot(shot.doc.id);
          });
          shots.appendChild(shotBtn);
        }
      }
      group.appendChild(shots);
    }

    list.appendChild(group);
  }
  tree.appendChild(list);

  return tree;
}

function collapseIcon(collapsed: boolean): SVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "2");
  rect.setAttribute("y", "3");
  rect.setAttribute("width", "12");
  rect.setAttribute("height", "10");
  rect.setAttribute("rx", "1.5");
  svg.appendChild(rect);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", collapsed ? "10" : "6");
  line.setAttribute("y1", "3");
  line.setAttribute("x2", collapsed ? "10" : "6");
  line.setAttribute("y2", "13");
  svg.appendChild(line);
  return svg;
}

function chevronIcon(expanded: boolean): SVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "10");
  svg.setAttribute("height", "10");
  svg.setAttribute("viewBox", "0 0 12 12");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.style.transform = expanded ? "rotate(90deg)" : "rotate(0deg)";
  svg.style.transition = "transform .15s cubic-bezier(.16,1,.3,1)";
  const path = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  path.setAttribute("points", "4,3 8,6 4,9");
  svg.appendChild(path);
  return svg;
}
