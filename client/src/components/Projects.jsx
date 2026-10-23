import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data";

export default function Projects() {
  const [p, setP] = useState(null);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setP(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <section id="projects">
      <div className="wrap">
        <h2>Projects</h2>
        <div className="proj-list">
          {projects.map((x) => (
            <button key={x.name} className="proj" onClick={() => setP(x)}>
              <h3>{x.name}</h3>
              <p>{x.short}</p>
              <div className="chips">{x.tags.slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>
              <small>View details</small>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {p && (
          <motion.div className="overlay" onClick={() => setP(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.96 }}>
              <button className="x" onClick={() => setP(null)} aria-label="Close">×</button>
              <h3>{p.name}</h3>
              <p className="lead">{p.short}</p>
              <ul>{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}