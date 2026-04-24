// Dev mode: build + watch + serve. Used while developing the OS itself.
//
// `npm start` → plain server (server.mjs).
// `npm run dev` → this file: rebuilds storyboard.html on src/template changes, then serves it.

import { watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildOnce } from "./build.mjs";
import { startServer } from "./server.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR  = resolve(__dirname, "src");
const TEMPLATE = resolve(__dirname, "template.html");

async function rebuild(reason) {
  try {
    const t = Date.now();
    await buildOnce();
    console.log(`  rebuild (${reason}) in ${Date.now() - t}ms`);
  } catch (e) {
    console.error("✗ build failed:", e.message);
  }
}

await rebuild("initial");

const debounce = (fn, ms) => {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};
const onChange = debounce((reason) => rebuild(reason), 120);
watch(SRC_DIR, { recursive: true }, (_evt, file) => onChange(`src/${file}`));
watch(TEMPLATE, () => onChange("template.html"));

await startServer();
console.log(`  dev mode: watching app/src + template.html`);
