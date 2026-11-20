import { motion } from "framer-motion";
import { links } from "../data";

const rings = [
  { r: 110, d: 24, items: ["React", "Java", "SQL"] },
  { r: 185, d: 38, rev: true, items: ["Python", "Git", "AWS", "C++"] },
  { r: 260, d: 52, items: ["LangChain", "RAG", "Gemini", "Redux", "Node.js"] },
];

const up = (d) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d } });

export default function Hero() {
  return (
    <div className="hero wrap">
      <div className="hero-top">
        <motion.p className="badge" {...up(0)}>Recent B.Tech CSE graduate, class of 2026</motion.p>
        <motion.h1 {...up(0.15)}>
          Sanskriti{" "}
          <span className="uline">
            Yadav
            <svg viewBox="0 0 300 12" preserveAspectRatio="none">
              <motion.path d="M2 8 C 50 0, 100 12, 150 6 S 250 2, 298 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.9 }} />
            </svg>
          </span>
        </motion.h1>
      </div>
      <div>
        <motion.p className="role" {...up(0.3)}>Software developer building React and AI-powered apps</motion.p>
        <motion.p className="lead" {...up(0.4)}>I turn AI ideas into clean, fast interfaces, from smart search to automated tagging.</motion.p>
        <motion.div className="stats" {...up(0.5)}>
          <a className="stat hot" href={links.leetcode} target="_blank" rel="noreferrer"><b>400+</b><span>LeetCode problems solved</span></a>
          <div className="stat"><b>3</b><span>Projects built</span></div>
          <div className="stat"><b>2026</b><span>B.Tech CSE graduate</span></div>
        </motion.div>
        <motion.div className="row" {...up(0.6)}>
          <a className="btn" href="#projects">See my projects</a>
          <button className="btn ghost" onClick={() => window.dispatchEvent(new Event("open-chat"))}>Ask my AI</button>
        </motion.div>
      </div>
      <motion.div className="scene" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <div className="orbit">
          {rings.map((g, gi) => (
            <div key={gi} className={g.rev ? "ring rev" : "ring"} style={{ "--r": `${g.r}px`, "--d": `${g.d}s` }}>
              <i className="track" />
              {g.items.map((t, i) => (
                <div key={t} className="pos" style={{ "--a": `${(360 / g.items.length) * i + gi * 20}deg` }}>
                  <span className="tag">{t}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="core"><b>SY</b><small>CSE 2026</small></div>
        </div>
      </motion.div>
    </div>
  );
}