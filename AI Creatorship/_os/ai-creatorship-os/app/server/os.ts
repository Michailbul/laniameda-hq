import { spawn } from "node:child_process";
import { stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const APP_ROOT = /*turbopackIgnore: true*/ process.cwd();

export const OS_DIR = resolve(APP_ROOT, "..");
export const WORKSPACE = process.env.WORKSPACE
  ? resolve(APP_ROOT, process.env.WORKSPACE)
  : resolve(APP_ROOT, "..", "..", "..");
export const OS_BIN = "_os/ai-creatorship-os/bin/os.sh";
export const APP_HTML = join(OS_DIR, "storyboard.html");

export interface CommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export function isSafeSlug(s: string): boolean {
  return !!s && !s.startsWith("_") && !s.includes("/") && !s.includes("..") && !s.includes("\\");
}

export function isSafeProjectPath(s: string): boolean {
  return !!s && !s.startsWith("/") && !s.includes("..") && !s.includes("\\") && !s.startsWith(".git/");
}

export function spawnCommand(command: string, args: string[], cwd: string): Promise<CommandResult> {
  return new Promise((res) => {
    const child = spawn(command, args, { cwd });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => { stdout += d; });
    child.stderr.on("data", (d) => { stderr += d; });
    child.on("close", (code) => res({ code: code ?? 0, stdout: stdout.trim(), stderr: stderr.trim() }));
    child.on("error", (e) => res({ code: 127, stdout: "", stderr: e.message }));
  });
}

export function spawnGit(args: string[], cwd: string): Promise<CommandResult> {
  return spawnCommand("git", args, cwd);
}

export async function exists(path: string): Promise<boolean> {
  return !!(await stat(path).catch(() => null));
}
