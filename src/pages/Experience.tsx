import { JOBS } from "../data/content";

export function Experience() {
  return (
    <article>
      <h1 className="page-title">Experience</h1>
      <p className="lede">11 years across three teams, from agency builds to leading platform work.</p>
      <ol className="timeline">
        {JOBS.map((j) => (
          <li key={j.company}>
            <div className="job-head">
              <h2><a href={j.url} target="_blank" rel="noopener noreferrer">{j.company}</a></h2>
              <p className="role">{j.role}</p>
              <p className="muted">{j.dates}, {j.place}</p>
            </div>
            <ul className="points">
              {j.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </article>
  );
}
