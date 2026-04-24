import { ClientBootstrap } from "./client-bootstrap";

export default function HomePage() {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          ai-creatorship<em>-</em>os
        </div>
        <span id="modeBadge" className="mode-badge">
          detecting...
        </span>
        <button id="btnProjects" className="ghost topbar-projects" style={{ display: "none" }} title="Back to all projects">
          ← projects
        </button>
        <div id="projectTitle" className="project-title" style={{ display: "none" }} />
        <div className="spacer" />
        <button id="btnTheme" className="ghost icon-btn" aria-label="Toggle theme" />
        <button id="btnOpen" className="ghost" title="Grant access to the AI Creatorship/ workspace folder.">
          Open workspace
        </button>
        <button id="btnReload" className="ghost" style={{ display: "none" }} disabled title="Re-read the active project from disk.">
          Reload
        </button>
        <button id="btnSave" className="primary" style={{ display: "none" }} disabled title="Save + auto-commit.">
          Save ⌘S
        </button>
      </header>

      <main>
        <div id="emptyState" style={{ display: "none" }} />
        <div id="content" />
      </main>

      <ClientBootstrap />
    </>
  );
}
