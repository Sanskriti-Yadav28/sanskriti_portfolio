import { skills, soft, links } from "../data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <h2>Skills I work with</h2>
        <div className="skill-grid">
          {skills.map((g) => (
            <article key={g.t} className="card">
              <h3>{g.t}</h3>
              <div className="chips">{g.i.map((x) => <span key={x}>{x}</span>)}</div>
            </article>
          ))}
        </div>
        <h3 className="soft-h">Soft skills</h3>
        <div className="chips big">{soft.map((x) => <span key={x}>{x}</span>)}</div>
        <a className="lc" href={links.leetcode} target="_blank" rel="noreferrer">
          <b>400+</b>
          <span>problems solved on LeetCode<small>Data structures and algorithms practice. View my profile</small></span>
        </a>
      </div>
    </section>
  );
}