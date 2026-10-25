import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import chat from "./routes/chat.js";
import { init } from "./services/rag.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });
const k = process.env.GEMINI_API_KEY;
console.log("Gemini key:", k && k !== "your_key_here" ? "found" : "MISSING, add it to server/.env");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use("/api/chat", chat);
app.get("/", (_, res) => res.send("ok"));
await init();
const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
export default app;