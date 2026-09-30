import { PROJECTS } from "../data/content";

export function Projects() {
  return (
    <article>
      <h1 className="page-title">Projects</h1>
      <p className="lede">Open-source backends I designed and shipped, each with a live demo.</p>
      <p className="note">The demos run on a free tier, so the first load can take up to a minute while the server wakes up.</p>

      <ul className="projects">
        {PROJECTS.map((p) => (
          <li key={p.repo} className="project">
            <h2 className="or-col">{p.name}</h2>
            <p className="tagline">{p.tagline}</p>
            <p>{p.text}</p>
            <ul className="points">
              {p.points.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            <ul className="chips small">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <div className="actions">
              <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer">Live demo<span className="sr-only"> of {p.name}</span></a>
              <a className="btn ghost" href={p.github} target="_blank" rel="noopener noreferrer">Code on GitHub<span className="sr-only"> for {p.name}</span></a>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
