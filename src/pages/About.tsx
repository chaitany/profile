import { CERTS, EDUCATION, SKILLS, SUMMARY } from "../data/content";

export function About() {
  return (
    <article>
      <h1 className="name">Chaitanya Reddy Vaddula</h1>
      <p className="lede">Lead Software Engineer</p>

      <section>
        <h2 className="or-col">Professional Summary</h2>
        <p>{SUMMARY}</p>
      </section>

      <section>
        <h2 className="or-col">Skills</h2>
        {SKILLS.map((g) => (
          <div className="skill-group" key={g.group}>
            <h3>{g.group}</h3>
            <ul className="chips">
              {g.items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="or-col">Education</h2>
        <ul className="plain">
          {EDUCATION.map((e) => (
            <li key={e.degree} className="edu">
              <strong>{e.degree}</strong>
              <span>{e.school}</span>
              <span className="muted">{e.years}, {e.grade}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Certifications</h2>
        <ul className="plain">
          {CERTS.map((c) => (
            <li key={c.name}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a></li>
          ))}
        </ul>
      </section>
    </article>
  );
}
