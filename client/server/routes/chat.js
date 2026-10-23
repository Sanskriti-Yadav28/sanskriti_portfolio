import { Router } from "express";
import { search } from "../services/rag.js";
import { generate } from "../services/gemini.js";

const SYSTEM = `You are the AI assistant on Sanskriti Yadav's portfolio, talking to recruiters and hiring managers.
Answer only from the CONTEXT below. Never invent employers, years of experience, grades or projects.
Be confident, warm, specific and under 150 words. Name real projects and skills as evidence.
For "why should we hire her" questions, build the case from her projects, skills and attitude, and be honest that she is a fresh 2026 graduate who brings fast learning and hands-on AI frontend work.
If the answer is not in the context, say so and suggest emailing sanskritiy230@gmail.com.`;

const router = Router();

router.get("/test", async (_, res) => {
  try {
    res.json({ ok: true, reply: await generate("Reply with the word working.", [{ role: "user", parts: [{ text: "test" }] }]) });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/", async (req, res) => {
  const { message = "", history = [] } = req.body;
  if (!message.trim()) return res.status(400).json({ error: "Please type a question." });
  let found = [];
  try { found = await search(message); } catch {}
  try {
    const past = history.slice(-6).map((h) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.text }] }));
    while (past.length && past[0].role !== "user") past.shift();
    const reply = await generate(`${SYSTEM}\n\nCONTEXT:\n${found.join("\n\n")}`, [...past, { role: "user", parts: [{ text: message }] }]);
    res.json({ reply });
  } catch (e) {
    console.error("Gemini failed:", e.message.slice(0, 400));
    const best = found[0] ? found[0].replace(/^#+ /gm, "") : "Please email sanskritiy230@gmail.com.";
    res.json({ reply: `My AI is offline right now, but here is the closest part of Sanskriti's profile:\n\n${best}` });
  }
});

export default router;