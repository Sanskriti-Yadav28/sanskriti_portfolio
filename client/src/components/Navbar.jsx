import useActive from "../hooks/useActive";

const ids = ["home", "skills", "projects", "contact"];

export default function Navbar() {
  const active = useActive(ids);
  return (
    <header className="nav">
      <a href="#home" className="logo">SY</a>
      <nav>
        {ids.map((i) => (
          <a key={i} href={`#${i}`} className={active === i ? "on" : ""}>{i}</a>
        ))}
      </nav>
      <a className="btn small" href="/resume.pdf" download>Resume</a>
    </header>
  );
}