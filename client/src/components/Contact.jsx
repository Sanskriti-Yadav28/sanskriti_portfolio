import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "../data";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [ok, setOk] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent("Hello from " + f.name)}&body=${encodeURIComponent(f.msg + "\n\n" + f.name + " (" + f.email + ")")}`;
    setOk(true);
    setTimeout(() => setOk(false), 4000);
  };
  return (
    <section id="contact">
      <div className="wrap contact">
        <div>
          <h2>Let's work together</h2>
          <p className="lead">Hiring for a frontend, full stack or AI application role? Send a message and I will reply.</p>
          <ul>
            <li><a href={`mailto:${links.email}`}>{links.email}</a></li>
            <li><a href={`tel:${links.phone.replace(/\s/g, "")}`}>{links.phone}</a></li>
            <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        <form className="cf" onSubmit={send}>
          <input required placeholder="Your name" value={f.name} onChange={set("name")} />
          <input required type="email" placeholder="Your email" value={f.email} onChange={set("email")} />
          <textarea required placeholder="Your message" value={f.msg} onChange={set("msg")} />
          <button className="btn">Send message</button>
        </form>
      </div>
      <footer>© 2026 Sanskriti Yadav</footer>
      <AnimatePresence>
        {ok && (
          <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            Opening your email app. If nothing opens, write to {links.email}.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}