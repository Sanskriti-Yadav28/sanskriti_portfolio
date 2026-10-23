const BASE = "https://generativelanguage.googleapis.com/v1beta/";
const key = () => (process.env.GEMINI_API_KEY || "").trim().replace(/^["']|["']$/g, "");
let cache;

async function api(path, body) {
  const r = await fetch(BASE + path, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key() },
    body: body && JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`${path} ${r.status}: ${await r.text()}`);
  return r.json();
}

async function available() {
  if (cache) return cache;
  const { models = [] } = await api("models?pageSize=200");
  cache = models.map((m) => ({ name: m.name.replace("models/", ""), methods: m.supportedGenerationMethods || [] }));
  return cache;
}

const ver = (n) => parseFloat((n.match(/(\d+(\.\d+)?)/) || [0])[0]);
const rank = (n) => (/flash/.test(n) ? 0 : 1) + (/lite|image|tts|live|audio|exp|preview|thinking|robotics|computer|learnlm|gemma/.test(n) ? 10 : 0);

async function pick(method) {
  const list = (await available()).filter((m) => m.methods.includes(method)).map((m) => m.name);
  return list.sort((a, b) => rank(a) - rank(b) || ver(b) - ver(a));
}

export const hasKey = () => key() && key() !== "your_key_here";

export async function embed(text) {
  const list = await pick("embedContent");
  const name = process.env.EMBED_MODEL || list.find((n) => /^gemini-embedding/.test(n)) || list.find((n) => /embedding/.test(n));
  if (!name) throw new Error("No embedding model available for this key");
  return (await api(`models/${name}:embedContent`, { content: { parts: [{ text }] } })).embedding.values;
}

export async function generate(system, contents) {
  let listErr;
  const auto = await pick("generateContent").catch((e) => { listErr = e.message; return []; });
  const names = [...new Set([process.env.GEMINI_MODEL, ...auto].filter(Boolean))].slice(0, 5);
  if (!names.length) throw new Error(listErr || "No Gemini model available for this key");
  const tried = [];
  for (const m of names) {
    try {
      const j = await api(`models/${m}:generateContent`, { systemInstruction: { parts: [{ text: system }] }, contents });
      const t = j.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");
      if (t) { console.log("Gemini model used:", m); return t; }
    } catch (e) {
      tried.push(e.message.slice(0, 250));
      console.error(e.message.slice(0, 250));
    }
  }
  throw new Error(tried.join(" | "));
}