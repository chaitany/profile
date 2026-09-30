import React from "react";

/* Chaitanya Reddy Vaddula — portfolio
   React 18 (UMD globals: React, ReactDOM). Compiled with esbuild. */
const { useState, useEffect, useRef, useCallback } = React;

const NAVY = "#0E1524";

const LINKS = {
  email: "mailto:crvaddula@gmail.com",
  linkedin: "https://www.linkedin.com/in/chaitanya-vaddula-a2772077/",
  github: "https://github.com/chaitany",
};

const PAGES = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageFromHash = () => {
  const h = (window.location.hash || "").replace("#", "");
  return PAGES.some((p) => p.id === h) ? h : "about";
};

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

const SUMMARY =
  "Lead Software Engineer with 11 years of experience designing and scaling high-traffic SaaS and ecommerce applications using React, TypeScript, Node.js, Python, and AWS, now extending products with LLMs, AI agents, and MCP servers. Proven track record of leading engineering teams through RFC-driven technical decisions, scaling real-time platforms to 1,000 users per second and building an AI research agent that reduced audit time by 60%.";

const SKILLS = [
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Node.js", "Redux", "TanStack Query", "HTML5", "CSS", "Tailwind CSS", "styled-components", "WebSockets", "Design Systems", "Figma", "Microfrontend", "Sitecore XMC", "AEM"],
  },
  {
    group: "Backend and data",
    items: ["Python", "FastAPI", "Django", "GraphQL", "REST APIs", "SQL", "PostgreSQL", "Redis", "Microservices", "System Design", "Event-driven", "Distributed Systems"],
  },
  {
    group: "Cloud, testing and tools",
    items: ["AWS", "Azure Blob Storage", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Webpack", "Vite", "Vitest", "TDD", "Jest", "React Testing Library", "Playwright", "GA4", "WCAG / Accessibility", "Sentry", "LLMs", "GenAI", "LangChain", "LangGraph", "GitHub Copilot", "Claude Code", "Agentic AI", "MCP Servers", "RAG"],
  },
  {
    group: "Leadership",
    items: ["Team leadership", "Technical design", "Mentoring", "Code review", "RFC / ADR authorship", "Agile / Scrum", "Cross-team collaboration"],
  },
];

const EDUCATION = [
  { degree: "Master's in Computer Science", school: "University of Massachusetts Boston", years: "2013 – 2015", grade: "CGPA 3.2 / 4.0" },
  { degree: "Bachelor's in Electronics and Communications", school: "Koneru Lakshmaiah Education Foundation", years: "2009 – 2013", grade: "CGPA 7.7 / 10" },
];

const CERTS = [
  { name: "ISB Certified Executive Product Management Program", url: "https://www.credential.net/b11fef44-d3ef-49f2-bfd0-ac620ac44f15#acc.F5IlodhP" },
  { name: "Meta Certified WhatsApp for Business Technical Implementation", url: "https://www.credly.com/badges/b3257eba-1752-42d7-9b17-393fef2fe4d8/linked_in_profile" },
];

const JOBS = [
  {
    company: "Persistent Systems",
    role: "Project Lead",
    dates: "Feb 2024 – Present",
    place: "Hyderabad, India",
    url: "https://www.persistent.com/",
    points: [
      "Leading delivery of a real-time Kafka-based WhatsApp Business AI agent chatbot (React/TypeScript, Node.js, PostgreSQL), and scaling live state to around 1,000 users/second on AWS.",
      "Built LLM-powered features and a Python AI research agent pulling live data from Sitecore XMC, reducing audit time by 60%.",
      "Delivered server-driven, content-configured app via Sitecore XMC and migrated a full-stack app to Next.js with TanStack Query, shipping in small increments with zero production downtime and 55% faster page loads.",
      "Led a team of 5 engineers on high-signal code reviews, RFC-driven decisions, mentoring and reliability practices (Sentry, Lighthouse, CI/CD) that maintained zero critical production issues.",
    ],
  },
  {
    company: "GoTo Technologies",
    role: "Senior Software Engineer",
    dates: "Sep 2021 – Jan 2024",
    place: "Boston, USA",
    url: "https://www.goto.com/",
    points: [
      "Built a scalable, type-safe design system and shared component library (React/TypeScript, Storybook) within a microfrontend architecture across 5 enterprise products, reducing UI inconsistencies by 80%.",
      "Defined SLIs/SLOs and built alerts and structured logging to proactively monitor frontend reliability for Grasshopper.com, cutting debugging time by 85%",
      "Established TDD with 92% coverage (Jest/RTL), embedded Playwright E2E into a clean CI/CD release workflow with safe rollouts, and integrated with backend teams on RESTful APIs, reducing latency by 35%.",
    ],
  },
  {
    company: "Isobar US",
    role: "Interactive Developer",
    dates: "Aug 2015 – Sep 2021",
    place: "Boston, USA",
    url: "https://www.dentsu.com/",
    points: [
      "Reduced page load time by 60% (from 4s to 1.6s) for National/Enterprise Car Rentals using React lazy loading and render optimization.",
      "Built a centralized API management and state governance architecture (Redux, Node.js) that reduced complexity across a large, distributed codebase serving 14M+ visits/month.",
      "Reduced technical debt by 40% by refactoring legacy modules into clean, composable component architecture, improving long-term maintainability, performance, and iteration speed.",
    ],
  },
];

const PROJECTS = [
  {
    name: "TenantGuard",
    repo: "Multi-Tenant-Guard",
    tagline: "Multi-tenant SaaS platform with strict data isolation",
    text: "Manages organizational hierarchies, granular role-based permissions and fully isolated data for each tenant company, all in a single PostgreSQL database.",
    points: [
      "Tenant isolation enforced inside the database with PostgreSQL Row-Level Security.",
      "JSONB-based roles and permissions, with every user change captured by audit-log triggers.",
      "Two interchangeable backends (Express with Drizzle, FastAPI with async SQLAlchemy), JWT auth and 22 tests.",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Express", "FastAPI", "PostgreSQL", "Drizzle", "SQLAlchemy"],
    github: "https://github.com/chaitany/Multi-Tenant-Guard",
    live: "https://tenantguard-kcqn.onrender.com/",
  },
  {
    name: "Event Query Engine",
    repo: "Event-Query-Engine",
    tagline: "Event ingestion and analytics API",
    text: "Async API that ingests single or batched events and answers analytics questions such as daily active users, events by type and conversion funnels, using raw SQL with no ORM.",
    points: [
      "Materialized views with query timeouts and automatic fallback to raw queries.",
      "GIN index on JSONB payloads plus composite B-tree indexes, validated with EXPLAIN ANALYZE.",
      "Controller, service and repository layers, per-IP rate limiting and 25 tests.",
    ],
    stack: ["Python", "FastAPI", "asyncpg", "PostgreSQL", "Pydantic", "pytest"],
    github: "https://github.com/chaitany/Event-Query-Engine",
    live: "https://event-query-engine.onrender.com/",
  },
  {
    name: "dtask",
    repo: "Redis-Task-Queue",
    tagline: "Distributed task scheduler on Redis",
    text: "Background job processing built for correctness over complexity: a single Redis instance, fault-tolerant workers and a clear seven-state task lifecycle.",
    points: [
      "Every state change is one atomic Lua script, so tasks never end up inconsistent under concurrency.",
      "Heartbeat-based crash detection recovers a dead worker's in-flight tasks automatically.",
      "Exponential backoff retries, a dead-letter queue, graceful shutdown and 28 tests against real Redis.",
    ],
    stack: ["Python", "Redis", "Lua", "pytest"],
    github: "https://github.com/chaitany/Redis-Task-Queue",
    live: "https://dtask-demo.onrender.com/",
  },
];


/* What the robot says in the room, per page. */
const HIGHLIGHTS = {
  about: [
    "Hi, meet Chaitanya!",
    "He's a Lead Software Engineer.",
    "11 years shipping apps.",
    "React, TypeScript, Node.js, Python and AWS.",
    "He mentors a team of 5 engineers.",
    "Master's in CS from UMass Boston.",
  ],
  experience: [
    "Here's where he has worked.",
    "Project Lead at Persistent Systems.",
    "Scaled live state to 1,000 users a second.",
    "55% faster page loads after a Next.js move.",
    "A design system across 5 products at GoTo.",
    "92% test coverage with TDD.",
    "Car rental pages from 4s to 1.6s.",
  ],
  projects: [
    "Look what he built!",
    "TenantGuard isolates every tenant's data.",
    "Row-Level Security right inside PostgreSQL.",
    "Event Query Engine answers analytics fast.",
    "dtask recovers jobs when a worker crashes.",
    "All three have live demos. Try them!",
  ],
};

/* ------------------------------------------------------------------ */
/* Robot: wooden-block style, drawn in navy and white                 */
/* ------------------------------------------------------------------ */

function Block({ x, y, w, h, r = 6, grain = true }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#FFFFFF" stroke={NAVY} strokeWidth="3" />
      {grain && (
        <path
          d={`M${x + 6} ${y + h * 0.32} q${(w - 12) / 4} -3 ${(w - 12) / 2} 0 t${(w - 12) / 2} 0 M${x + 6} ${y + h * 0.66} q${(w - 12) / 4} 3 ${(w - 12) / 2} 0 t${(w - 12) / 2} 0`}
          stroke={NAVY} strokeWidth="1.2" fill="none" opacity="0.16" strokeLinecap="round"
        />
      )}
    </g>
  );
}

const Ring = ({ cx, cy }) => <circle cx={cx} cy={cy} r="3.6" fill={NAVY} stroke="#FFFFFF" strokeWidth="2" />;

function Robot({ pose = "idle", extraClass = "" }) {
  return (
    <svg className={`robot pose-${pose} ${extraClass}`} viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <ellipse className="rb-shadow" cx="100" cy="270" rx="50" ry="7" />
      <g className="rb-all">
        <g className="rb-leg rb-leg-l">
          <Block x={71} y={206} w={26} h={44} r={5} />
          <Block x={64} y={248} w={36} h={16} r={4} grain={false} />
        </g>
        <g className="rb-leg rb-leg-r">
          <Block x={103} y={206} w={26} h={44} r={5} />
          <Block x={100} y={248} w={36} h={16} r={4} grain={false} />
        </g>

        <Block x={62} y={128} w={76} h={84} r={8} />
        <path
          className="rb-heart"
          d="M100 184 C88 174 84 168 84 161 C84 155 89 151 94 151 C97 151 99 153 100 155 C101 153 103 151 106 151 C111 151 116 155 116 161 C116 168 112 174 100 184 Z"
          fill={NAVY}
        />

        <g className="rb-arm rb-arm-l">
          <Block x={32} y={132} w={26} h={32} r={5} />
          <Block x={30} y={166} w={28} h={30} r={5} />
        </g>
        <g className="rb-arm rb-arm-r">
          <Block x={142} y={132} w={26} h={32} r={5} />
          <Block x={142} y={166} w={28} h={30} r={5} />
        </g>
        <Ring cx={60} cy={139} />
        <Ring cx={140} cy={139} />
        <Ring cx={100} cy={126} />

        <g className="rb-head">
          <Block x={48} y={44} w={104} h={80} r={9} />
          <g className="rb-eyes">
            <g className="rb-pupils">
              <circle cx="80" cy="76" r="9" fill={NAVY} />
              <circle cx="120" cy="76" r="9" fill={NAVY} />
              <circle cx="83" cy="73" r="2.6" fill="#FFFFFF" />
              <circle cx="123" cy="73" r="2.6" fill="#FFFFFF" />
            </g>
          </g>
          <path className="rb-mouth" d="M88 97 Q100 109 112 97" stroke={NAVY} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/* Robot roaming a scene: walks, waves and shares highlights.
   mode "exit" makes it walk off the right edge, then calls onExited. */
function RoamingRobot({ list, mode = "roam", onExited, arrive, startX = 50 }) {
  const [st, setSt] = useState({ x: startX, pose: "wave", dur: 0, bubble: list[0] });
  const xRef = useRef(startX);

  useEffect(() => {
    let alive = true;
    let timer;
    const wait = (ms) => new Promise((r) => { timer = setTimeout(r, ms); });

    if (mode === "exit") {
      const dur = Math.round((112 - xRef.current) * 24);
      xRef.current = 112;
      setSt({ x: 112, pose: "walk", dur, bubble: null });
      timer = setTimeout(() => onExited && onExited(), dur);
      return () => clearTimeout(timer);
    }
    if (REDUCED) {
      setSt({ x: xRef.current, pose: "idle", dur: 0, bubble: list[0] });
      return;
    }

    (async () => {
      let i = 0;
      setSt({ x: xRef.current, pose: "wave", dur: 0, bubble: list[0] });
      await wait(3000);
      while (alive) {
        let nx;
        do { nx = 20 + Math.random() * 60; } while (Math.abs(nx - xRef.current) < 18);
        const dur = Math.round(Math.abs(nx - xRef.current) * 60);
        xRef.current = nx;
        setSt({ x: nx, pose: "walk", dur, bubble: null });
        await wait(dur);
        if (!alive) break;
        i = (i + 1) % list.length;
        setSt({ x: nx, pose: i === 0 ? "wave" : "talk", dur: 0, bubble: list[i] });
        await wait(3400);
      }
    })();

    return () => { alive = false; clearTimeout(timer); };
  }, [list, mode]);

  return (
    <div className={`roamer ${arrive ? "arrive" : ""}`} style={{ left: `${st.x}%`, transitionDuration: `${st.dur}ms` }}>
      {st.bubble && (
        <div className="bubble bubble-say" key={st.bubble} aria-live="polite">{st.bubble}</div>
      )}
      <Robot pose={st.pose} />
    </div>
  );
}

const OFFICE_LINES = ["Made it to the office!", ...HIGHLIGHTS.experience];
const HOME_LINES = ["Home sweet home!", ...HIGHLIGHTS.projects];

/* ------------------------------------------------------------------ */
/* Commute: a scene shrinks away, robot walks the road to a door      */
/* ------------------------------------------------------------------ */

/* Route in % of the stage: right 3 steps, down 4 steps, right 3 steps. */
const ROUTE = [
  { x: 31, y: 43 },   // leaves the (shrunken) living room
  { x: 52, y: 43 },   // 3 steps right
  { x: 52, y: 80 },   // 4 steps down
  { x: 78, y: 80 },   // 3 steps right, at the door
];
const STEP_MS = 520;   // one leg swing of the walk cycle
const STEPS = [3, 4, 3];

/* Deterministic pseudo-random so the drawing is stable between renders. */
const rand = (seed) => { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); };

function RoadSketch({ w, h }) {
  if (!w || !h) return null;
  const pts = ROUTE.map((p) => [p.x * w / 100, p.y * h / 100]);
  const d = `M${pts[0][0] - 20} ${pts[0][1]} ` + pts.slice(1).map((p) => `L${p[0]} ${p[1]}`).join(" ") + ` L${pts[3][0] + 6} ${pts[3][1]}`;
  const road = Math.max(26, Math.min(46, w * 0.055));

  // grass tufts on both road edges and a post-and-rail fence beside the long stretch
  const tufts = [];
  const fence = [];
  let seed = 1;
  for (let s = 0; s < 3; s++) {
    const [x1, y1] = pts[s], [x2, y2] = pts[s + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    const nx = -uy, ny = ux;
    for (let t = 14; t < len - 8; t += 16 + rand(seed) * 10) {
      for (const side of [-1, 1]) {
        seed++;
        const off = road / 2 + 5 + rand(seed) * 9;
        const bx = x1 + ux * t + nx * off * side;
        const by = y1 + uy * t + ny * off * side;
        const hgt = 6 + rand(seed + 7) * 9;
        tufts.push(`M${bx - 3} ${by} l-2 ${-hgt * 0.7} M${bx} ${by} l1 ${-hgt} M${bx + 3} ${by} l3 ${-hgt * 0.75}`);
      }
    }
    if (s === 1) {
      const fx = x1 + road / 2 + 26;
      for (let y = y1 + 10; y < y2 - 20; y += 34) fence.push(<rect key={y} x={fx - 3} y={y} width="6" height="26" rx="1.5" />);
      fence.push(<path key="rails" d={`M${fx} ${y1 + 16} V${y2 - 14} M${fx + 0.5} ${y1 + 26} V${y2 - 4}`} className="rail" />);
    }
  }
  const pebbles = [];
  for (let s = 0; s < 3; s++) {
    const [x1, y1] = pts[s], [x2, y2] = pts[s + 1];
    for (let k = 0; k < 14; k++) {
      seed++;
      const t = rand(seed), o = (rand(seed + 3) - 0.5) * road * 0.6;
      const vertical = x1 === x2;
      pebbles.push(<circle key={`${s}-${k}`} cx={x1 + (x2 - x1) * t + (vertical ? o : 0)} cy={y1 + (y2 - y1) * t + (vertical ? 0 : o)} r={0.9 + rand(seed + 5) * 1.3} />);
    }
  }

  return (
    <svg className="road" width={w} height={h} aria-hidden="true">
      <path d={d} className="road-edge" style={{ strokeWidth: road + 4 }} pathLength="100" />
      <path d={d} className="road-edge ghost" style={{ strokeWidth: road + 9 }} pathLength="100" />
      <path d={d} className="road-fill" style={{ strokeWidth: road - 1 }} />
      <g className="pebbles">{pebbles}</g>
      <path d={tufts.join(" ")} className="tufts" />
      <g className="fence">{fence}</g>
    </svg>
  );
}

function Commute({ door, done, onArrive }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [r, setR] = useState({ ...ROUTE[0], dur: 0, pose: "walk", show: false, enter: false });

  useEffect(() => {
    const el = ref.current;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const ts = [];
    const at = (ms, fn) => ts.push(setTimeout(fn, ms));
    let t = 900;
    at(t, () => setR((p) => ({ ...p, show: true })));
    t += 80;
    STEPS.forEach((n, i) => {
      const dur = n * STEP_MS;
      at(t, () => setR((p) => ({ ...p, ...ROUTE[i + 1], dur, pose: "walk" })));
      t += dur;
    });
    at(t, () => setR((p) => ({ ...p, pose: "idle", dur: 0, enter: true })));   // steps into the door
    at(t + 650, onArrive);
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className={`commute ${done ? "done" : ""}`} ref={ref}>
      <RoadSketch w={size.w} h={size.h} />
      <div className={`door door-${door} ${r.enter ? "open" : ""}`} aria-hidden="true" />
      <div
        className={`walker ${r.show ? "show" : ""} ${r.enter ? "enter" : ""}`}
        style={{ left: `${r.x}%`, top: `${r.y}%`, transition: `left ${r.dur}ms linear, top ${r.dur}ms linear, opacity .5s, transform .6s ease-in` }}
      >
        <Robot pose={r.pose} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intro: peek from the left, duck out, then pull the living room in  */
/* ------------------------------------------------------------------ */

const PULL_MS = 3200;
// where the robot rests in the room after pulling it in (share of the stage width)
const settleX = () => (window.matchMedia("(max-width: 860px)").matches ? 0.68 : 0.8);

function Intro({ stageRef, onLeave, onDone }) {
  const [s, setS] = useState({ pos: "off", dur: 0 });
  // pull phase, measured against the real stage so the hand-off is seamless
  const [pull, setPull] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const ended = useRef(false);

  const leave = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    setLeaving(true);
    onLeave();
    setTimeout(onDone, 750);
  }, [onLeave, onDone]);

  useEffect(() => {
    if (REDUCED) { const t = setTimeout(leave, 400); return () => clearTimeout(t); }
    const ts = [];
    const at = (ms, fn) => ts.push(setTimeout(fn, ms));
    at(250, () => setS({ pos: "peek", dur: 1200 }));    // slow peek
    at(2300, () => setS({ pos: "off", dur: 800 }));     // ducks back out

    at(3300, () => {
      const el = stageRef.current;
      if (!el) return leave();
      const r = el.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 860px)").matches;
      const rh = mobile ? r.height * 0.46 : Math.min(r.height * 0.34, 290);   // same size as the robot in the room
      const rw = rh * 2 / 3;
      const hand = rw * 0.39;                            // hand-to-center offset while leaning back to pull
      setPull({ r, rh, rw, edge: -rw, robotX: -rw + hand, dur: 0, pose: "pull", done: false });
    });
    at(3360, () => setPull((p) => p && ({ ...p, edge: p.r.width, robotX: p.r.width + p.rw * 0.39, dur: PULL_MS })));
    at(3360 + PULL_MS + 150, () => setPull((p) => p && ({ ...p, pose: "walk", robotX: p.r.width * settleX(), dur: 800, done: true })));
    at(3360 + PULL_MS + 1000, leave);
    return () => ts.forEach(clearTimeout);
  }, []);

  const ease = "cubic-bezier(.45,.05,.35,1)";
  return (
    <div className={`intro ${leaving ? "leaving" : ""}`}>
      <h1 className="sr-only">Chaitanya Reddy Vaddula, Lead Software Engineer</h1>

      {!pull && (
        <div className={`intro-robot ir-${s.pos}`} style={{ transition: `left ${s.dur}ms ${ease}` }}>
          <Robot pose="peek" />
        </div>
      )}

      {pull && (
        <div className="pull-stage" style={{ left: pull.r.left, top: pull.r.top, width: pull.r.width, height: pull.r.height }}>
          <div
            className={`scene pull-scene ${pull.done ? "done" : ""}`}
            style={{ transform: `translateX(${pull.edge - pull.r.width}px)`, transition: `transform ${pull.done ? 0 : pull.dur}ms ${ease}` }}
          >
            <span className="pull-edge" aria-hidden="true" />
          </div>
          <div
            className="pull-robot"
            style={{ left: pull.robotX, height: pull.rh, transition: `left ${pull.dur}ms ${pull.done ? "ease-in-out" : ease}` }}
          >
            <Robot pose={pull.pose} />
          </div>
        </div>
      )}

      <button className="skip" onClick={leave}>Skip intro</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pages                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <article>
      <h1 className="name">Chaitanya Reddy Vaddula</h1>
      <p className="lede">Lead Software Engineer</p>

      <section>
        <h2 className="or-col">Professional summary</h2>
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

function Experience() {
  return (
    <article>
      <h1 className="page-title">Experience</h1>
      <p className="lede">11 years across three teams, from agency builds to leading platform work.</p>
      <ol className="timeline">
        {JOBS.map((j) => (
          <li key={j.company}>
            <div className="job-head">
              <h2><a className="" href={j.url} target="_blank" rel="noopener noreferrer">{j.company}</a></h2>
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

function Projects() {
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

/* ------------------------------------------------------------------ */
/* Shell                                                              */
/* ------------------------------------------------------------------ */

const Icon = {
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7l8 6 8-6" /></svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" /></svg>
  ),
};

/* Segmented pill navigation with a sliding indicator. */
function Nav({ page }) {
  const refs = useRef({});
  const [ind, setInd] = useState(null);

  const measure = useCallback(() => {
    const el = refs.current[page];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [page]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav className="nav" aria-label="Sections">
      <div className="nav-track">
        {ind && <span className="nav-ind" style={{ width: ind.width, transform: `translateX(${ind.left}px)` }} aria-hidden="true" />}
        {PAGES.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            ref={(el) => { refs.current[p.id] = el; }}
            aria-current={page === p.id ? "page" : undefined}
          >
            {p.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* Where the robot lives for each page */
const PLACE = { about: "living", experience: "office", projects: "home" };

function App() {
  const [page, setPage] = useState(pageFromHash);
  const [intro, setIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  // at: scene the robot is in; phase: idle | exiting | commute; to: destination scene
  const [sc, setSc] = useState({ at: "living", phase: "idle", to: "living" });
  const [trail, setTrail] = useState(false);   // keeps the road on screen while it fades out
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const [handoff, setHandoff] = useState(true);   // robot continues from the intro without a drop-in

  useEffect(() => {
    const on = () => setPage(pageFromHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [page]);

  useEffect(() => {
    if (!revealed) return;
    const target = PLACE[page];
    if (sc.phase !== "idle") {
      // page changed mid-trip: jump straight to the new place
      if (sc.to !== target) setSc({ at: target, phase: "idle", to: target });
      return;
    }
    if (sc.at === target) return;
    if (target === "living" || REDUCED) { setSc({ at: target, phase: "idle", to: target }); return; }
    // let the robot say hello first when the site opens straight on this page
    const t = setTimeout(() => setSc((s) => ({ ...s, phase: "exiting", to: target })), intro ? 1600 : 0);
    return () => clearTimeout(t);
  }, [page, revealed, sc]);

  const onLeave = useCallback(() => setRevealed(true), []);
  const onDone = useCallback(() => { setIntro(false); setTimeout(() => setHandoff(false), 1500); }, []);
  // after walking out: take the road, unless it's just the next room in the same house
  const onExited = useCallback(() => setSc((s) => (
    s.at === "living" && s.to === "home"
      ? { at: "home", phase: "idle", to: "home" }
      : { ...s, phase: "commute" }
  )), []);
  const onArrive = useCallback(() => {
    setSc((s) => ({ at: s.to, phase: "idle", to: s.to }));
    setTrail(true);
    setTimeout(() => setTrail(false), 900);
  }, []);

  const Page = page === "experience" ? Experience : page === "projects" ? Projects : About;

  // show | mini (shrunk into the corner while commuting) | hide
  const layer = (name) => {
    if (sc.at === name) return sc.phase === "commute" ? "mini" : "show";
    return "hide";
  };
  const robotIn = (name, list) =>
    revealed && sc.at === name && sc.phase !== "commute" && (
      <RoamingRobot
        list={list}
        mode={sc.phase === "exiting" ? "exit" : "roam"}
        onExited={onExited}
        arrive={!(handoff && name === "living")}
        startX={handoff && name === "living" ? settleX() * 100 : 50}
      />
    );

  return (
    <>
      <div className={`app ${revealed ? "revealed" : ""}`} aria-hidden={!revealed}>
        <section className="stage" ref={stageRef}>
          <div className={`scene scene-living ${layer("living")}`} role="img" aria-label="A robot made of blocks walks around a sketched living room, sharing highlights about Chaitanya">
            <div className="room-floor">{robotIn("living", HIGHLIGHTS.about)}</div>
          </div>
          <div className={`scene scene-office ${layer("office")}`} role="img" aria-label="The robot at work in a sketched office, sharing highlights from Chaitanya's experience">
            <div className="room-floor">{robotIn("office", OFFICE_LINES)}</div>
          </div>
          <div className={`scene scene-home ${layer("home")}`} role="img" aria-label="The robot back home in a sketched home office, sharing highlights from Chaitanya's projects">
            <div className="room-floor">{robotIn("home", HOME_LINES)}</div>
          </div>

          {(sc.phase === "commute" || trail) && (
            <Commute key={sc.to} door={sc.to === "office" ? "office" : "house"} done={sc.phase !== "commute"} onArrive={onArrive} />
          )}

          <Nav page={page} />

          <ul className="contacts" aria-label="Contact">
            <li><a href={LINKS.email} title="contact">{Icon.mail}<span className="long">Contact</span><span className="short">Email</span></a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">{Icon.person}<span>LinkedIn</span></a></li>
            <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer">{Icon.code}<span>GitHub</span></a></li>
          </ul>
        </section>

        <main className="panel">
          <div className="panel-scroll" ref={scrollRef} tabIndex={0} aria-label={`${page} content`}>
            <div className="panel-inner" key={page}>
              <Page />
            </div>
          </div>
        </main>
      </div>

      {intro && <Intro stageRef={stageRef} onLeave={onLeave} onDone={onDone} />}
    </>
  );
}

export default App;