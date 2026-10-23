import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { embed, hasKey } from "./gemini.js";

const dir = fileURLToPath(new URL("../knowledge/", import.meta.url));
let chunks = [];

export async function init() {
  const text = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
  chunks = text.split(/\n(?=## )/).map((t) => ({ t: t.trim() })).filter((c) => c.t);
  if (!hasKey()) return console.log("No Gemini key, using keyword search");
  try {
    for (const c of chunks) c.v = await embed(c.t);
    console.log("Embeddings ready");
  } catch (e) {
    chunks.forEach((c) => delete c.v);
    console.log("Embeddings failed, using keyword search:", e.message.slice(0, 200));
  }
}

const cos = (a, b) => {
  let d = 0, x = 0, y = 0;
  for (let i = 0; i < a.length; i++) { d += a[i] * b[i]; x += a[i] ** 2; y += b[i] ** 2; }
  return d / Math.sqrt(x * y);
};

export async function search(q, k = 4) {
  let scored;
  try {
    if (chunks[0]?.v) { const v = await embed(q); scored = chunks.map((c) => [cos(v, c.v), c.t]); }
  } catch {}
  scored ??= chunks.map((c) => [q.toLowerCase().split(/\W+/).filter((w) => w.length > 3 && c.t.toLowerCase().includes(w)).length, c.t]);
  return scored.sort((a, b) => b[0] - a[0]).slice(0, k).map((s) => s[1]);
}