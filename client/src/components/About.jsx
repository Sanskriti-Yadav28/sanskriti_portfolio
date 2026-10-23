import { edu, certs } from "../data";

export default function About() {
  return (
    <div className="about wrap">
      <div>
        <h2>A 2026 graduate ready to build</h2>
        <p>
          I am a recent B.Tech Computer Science graduate with hands-on experience building web applications with JavaScript, React, HTML and CSS. I also work with Java, SQL, cloud computing and Git/GitHub, and I have used Generative AI and AI APIs in my projects. I want to build AI-enabled software that real people use.
        </p>
        <div className="chips">{certs.map((c) => <span key={c}>{c}</span>)}</div>
      </div>
      <ul className="edu">
        {edu.map((e) => (
          <li key={e.n}>
            <b>{e.n}</b>
            <span>{e.d}</span>
            <em>{e.y}</em>
            <em>{e.s}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}