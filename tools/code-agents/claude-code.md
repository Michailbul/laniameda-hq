# Claude Code

- **Category:** code-agents
- **Status:** ✅ Active
- **What it does:** Agentic coding assistant by Anthropic that reads, writes, and edits code across a full codebase
- **What works:**
  - Full repo context awareness
  - File read/write/edit operations
  - Shell command execution
  - Multi-step coding tasks
  - Git operations
- **What doesn't work / limitations:**
  - Context window limits on very large repos
  - May need explicit instructions for complex architectural decisions
- **How we use it:** Primary coding agent for all development tasks; run via `claude` CLI or OpenClaw subagents
- **Links:** https://docs.anthropic.com/claude-code
- **Last updated:** 2026-03-02
