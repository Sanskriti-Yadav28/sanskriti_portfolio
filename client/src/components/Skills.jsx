import { skills, soft } from "../data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <h2>Skills I work with</h2>
        <div className="skill-grid">
          {skills.map((g) => (
            <article key={g.t} className={g.hot ? "card hot" : "card"}>
              <h3>{g.t}</h3>
              <div className="chips">{g.i.map((x) => <span key={x}>{x}</span>)}</div>
            </article>
          ))}
        </div>
        <h3 className="soft-h">Soft skills</h3>
        <div className="chips big">{soft.map((x) => <span key={x}>{x}</span>)}</div>
      </div>
    </section>
  );
}