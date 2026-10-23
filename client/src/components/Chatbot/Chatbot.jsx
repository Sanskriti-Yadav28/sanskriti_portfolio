import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/chat";
const ideas = ["Why should we hire Sanskriti?", "What are her strongest skills?", "Tell me about Memora AI", "How can I contact her?"];
const hello = { role: "model", text: "Hi! I'm Sanskriti's AI assistant. Ask me anything about her skills, projects, or why she'd be a great hire." };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState(false);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([hello]);
  const end = useRef();

  useEffect(() => {
    const t = setTimeout(() => setTip(true), 4000);
    const o = () => { setOpen(true); setTip(false); };
    window.addEventListener("open-chat", o);
    return () => { clearTimeout(t); window.removeEventListener("open-chat", o); };
  }, []);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy, open]);

  const send = async (q) => {
    q = q.trim();
    if (!q || busy) return;
    const history = msgs.slice(1);
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setText("");
    setBusy(true);
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: q, history }) });
      const d = await r.json();
      setMsgs((m) => [...m, { role: "model", text: d.reply || d.error }]);
    } catch {
      setMsgs((m) => [...m, { role: "model", text: "I can't reach the server. Make sure the server terminal is running, or email sanskritiy230@gmail.com." }]);
    }
    setBusy(false);
  };

  return (
    <>
      <AnimatePresence>
        {tip && !open && (
          <motion.button className="tip" onClick={() => { setOpen(true); setTip(false); }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            Curious why Sanskriti is a great hire? Ask me.
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div className="chat" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }}>
            <div className="chat-head">
              <span className="av">SY</span>
              <div><b>Sanskriti's assistant</b><small>Answers from her CV and projects</small></div>
              <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
            </div>
            <div className="chat-body">
              {msgs.map((m, i) => <p key={i} className={m.role}>{m.text}</p>)}
              {busy && <p className="model typing"><i /><i /><i /></p>}
              {msgs.length === 1 && <div className="sugg">{ideas.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}</div>}
              <div ref={end} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(text); }}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about skills, projects, hiring..." aria-label="Your question" />
              <button disabled={busy}>Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="fab" onClick={() => { setOpen(!open); setTip(false); }} aria-label="Toggle chat">
        <span className="dot" />{open ? "Close chat" : "Ask my AI"}
      </button>
    </>
  );
}