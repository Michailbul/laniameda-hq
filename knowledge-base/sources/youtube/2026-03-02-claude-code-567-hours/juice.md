# Juice — 567 Hours of Claude Code (Chase AI)

## 15 Tips Distilled

### BEGINNER

**1. Install** — One-line install, works Mac/Windows/Linux. Less than a minute.

**2. IDEs** — Don't stay in terminal. Use VS Code, Cursor, or Claude Code Desktop for visual interface.

**3. Permissions (Shift+Tab cycles through)**
- Default: reads only, asks before edits
- Accept edits on: edits without asking, still asks for bash
- `claude --dangerously-skip-permissions`: full autonomous mode. Use as you advance.

**4. Plan Mode** — ALWAYS use for new projects or new features. Forces Claude to ask questions first, create a plan you approve before executing. Output: setup → files affected → steps → verification.
- After plan: "Yes, clear context and bypass permissions" to execute

**5. Slash Commands (key ones)**
- `/model` — switch between Opus 4.6 / Sonnet / HiQ, adjust effort level
- `/rewind` — go back to previous save point in code + conversation
- `/context` — see current token usage (e.g. 21K/200K = 11%)
- `/clear` — reset context window (safe — Claude still has your files)

---

### INTERMEDIATE

**6. Context Window Management** ← MOST IMPORTANT
- Budget: 200K tokens
- **Context rot kicks in at ~100K (halfway)**. Effectiveness nosedives past that.
- Stay out of the back half if doing complex work.
- Monitor: use `/context` regularly OR build a status line (prompt: "build me a status line with context window percentage always visible")
- Status line shows: folder / model / context % — always visible
- Clear proactively at 60-70%, don't let it autocompact
- After clearing: Claude still has all context from your files — not a hit

**7. Git + GitHub**
- Rewind = novice save points. Git = pro save points.
- GitHub = free cloud storage for all code versions
- Claude Code is expert at Git. Just say: "connect my GitHub account, commit this code and push"
- Commit = save point. Push = send to GitHub.

**8. Debugging**
- Screenshot the bug → drop it into prompt (Claude reads images)
- Copy/paste error messages directly into Claude
- Prevention: during plan mode, say "execute in a test-driven development manner"

**9. Research Agent**
- Claude Code can web search live data
- Use: "Make this look nicer (use web search for best practices for UI design in 2026)"
- Useful because Opus 4.6 knowledge cutoff is ~9 months ago

**10. Mindset** ← Most important for non-technical
- You don't know what you don't know → walk into minefields
- Ask Claude: "What am I not thinking about?" / "Is this the best way forward?" / "What would an expert do here?"
- Don't be an accept monkey. Understand why Claude does what it does.
- You don't need to know the answers. But you need to know what to ask.

---

### PRO

**11. Skills**
- Skills = markdown files. Just specialized prompts.
- Official skills: `/plugins` marketplace (frontend design, code review, GitHub, Context7, etc.)
- Invoke: "use the frontend design skill to improve our UI" OR `/frontend-design`
- Create custom: "create a custom skill that does X" → gives it a name → invoke via natural language or slash command

**12. Agent Teams (experimental, disabled by default)**
- Multiple Claude Code sessions running in parallel, working on different tasks
- They communicate with each other + have a team leader coordinating
- Mocks a real dev crew (UI dev + auth dev + blog dev all talking)
- Enable: get prompt from official Claude Code docs → paste → Claude sets it up
- Invoke: "use agent teams to do A, B, C, D"
- Each agent shows their task, files, status

**13. MCP Servers**
- Connect Claude to external tools: Notion, Figma, Slack, etc.
- Install: find command in Claude Code docs or "set up X MCP server, use web search for guidance"
- Warning: heavy MCP servers can eat 10-20% of context window on load, even if not actively used

**14. Frameworks (GSD, BMAD)**
- "Mods" for Claude Code — change how it approaches problems
- GSD (Get Stuff Done): good for context window handling + sub-agent usage
- Personal preference — not required, but powerful for complex projects

**15. Worktrees**
- Parallel git branches with separate Claude Code terminals
- Command: `claude --worktree feature/dark-mode` in terminal 1, `claude --worktree feature/export` in terminal 2
- Each terminal works on its branch simultaneously
- Merge when both features done
- Similar to agent teams but at the git branch level

---

## Key Mental Models

**Context rot:** Effectiveness drops sharply past 100K tokens. Manage proactively.

**Skills = just prompts:** Demystifies the "skill marketplace" — it's markdown files, not magic.

**Agent teams vs worktrees:**
- Agent teams: same branch, agents communicate with each other
- Worktrees: different git branches, separate terminals, merge at end

**Plan before code:** Always. Even for small features. Saves massive debugging time.

---

## Marketing Angles [CONTENT-READY]

1. **"Context rot is killing your Claude Code sessions"** — The halfway point reveal (100K tokens = nosedive). Most people don't know this. Add a status line. Never autocompact again.

2. **"5 Claude Code features nobody uses (but should)"** — Worktrees, agent teams, plan mode, /rewind, research agent mode

3. **"Stop being an accept monkey"** — The mindset shift from vibe coder to AI developer. Strong for Building in Public pillar.

4. **Carousel: 15 Claude Code tips (beginner → pro)** — Structured perfectly for a 15-slide carousel.
