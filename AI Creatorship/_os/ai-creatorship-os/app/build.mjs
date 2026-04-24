// Bundle TS + CSS into a single self-contained storyboard.html at the parent dir.
// Keeps the PRD's single-file deliverable intact.

import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "src/main.ts");
const TEMPLATE = resolve(__dirname, "template.html");
const CSS = resolve(__dirname, "src/styles.css");
const OUT = resolve(__dirname, "..", "storyboard.html");

export async function buildOnce() {
  const result = await build({
    entryPoints: [SRC],
    bundle: true,
    format: "iife",
    target: ["es2020", "chrome110", "safari16", "firefox110"],
    write: false,
    minify: true,
    sourcemap: false,
    legalComments: "none",
    logLevel: "error",
  });
  const outputFiles = result.outputFiles ?? [];
  if (outputFiles.length === 0) throw new Error("esbuild produced no output");
  const js = outputFiles[0].text;
  const css = await readFile(CSS, "utf8");
  const template = await readFile(TEMPLATE, "utf8");
  const html = template.replace("__STYLES__", () => css).replace("__SCRIPT__", () => js);
  await writeFile(OUT, html, "utf8");
  const kb = (html.length / 1024).toFixed(1);
  console.log(`✓ built storyboard.html  ·  ${kb} KB  ·  ${new Date().toLocaleTimeString()}`);
  return { path: OUT, size: html.length };
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  buildOnce().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
