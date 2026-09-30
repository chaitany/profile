import type { Cert, Education, Job, PageId, PageLink, Project, SkillGroup } from "../types";

export const LINKS = {
  email: "mailto:crvaddula@gmail.com",
  emailAddress: "crvaddula@gmail.com",
  linkedin: "https://www.linkedin.com/in/chaitanya-vaddula-a2772077/",
  github: "https://github.com/chaitany",
} as const;

export const PAGES: PageLink[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export const SUMMARY ="Software Engineer with 11 years of experience designing and scaling high-traffic SaaS and ecommerce applications using React, TypeScript, Node.js, Python, and AWS, now extending products with LLMs, AI agents, and MCP servers. Proven track record of leading engineering teams through RFC-driven technical decisions, scaling real-time platforms to 1,000 users per second and building an AI research agent that reduced audit time by 60%."

export const SKILLS: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React.js", "TypeScript", "Next.js", "JavaScript (ES6+)", "Node.js", "Redux", "TanStack Query", "HTML5", "CSS", "Tailwind CSS", "styled-components", "WebSockets", "Design Systems", "Figma", "Microfrontend", "Sitecore XMC"],
  },
  {
    group: "Backend and data",
    items: ["Python", "FastAPI", "Django", "GraphQL", "REST APIs", "SQL", "PostgreSQL", "Redis", "Pinecone", "pgvector", "Microservices", "System Design", "Kafka", "Event-driven", "Distributed Systems"],
  },
  {
    group: "Cloud, testing and tools",
    items: ["AWS", "Azure Blob Storage", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Webpack", "Vite", "Vitest", "TDD", "Jest", "React Testing Library", "Playwright", "GA4", "WCAG / Accessibility", "Sentry", "Lighthouse", "LLMs", "GenAI", "LangChain", "LangGraph", "Claude Code", "GitHub Copilot", "Agentic AI", "AI Governance", "RAG", "MCP Servers"],
  },
  {
    group: "Leadership",
    items: ["Team leadership", "Technical design", "Mentoring", "Code review", "RFC / ADR authorship", "Agile / Scrum", "Cross-team collaboration"],
  },
];

export const EDUCATION: Education[] = [
  { degree: "Master's in Computer Science", school: "University of Massachusetts Boston", years: "2013 – 2015", grade: "CGPA 3.2 / 4.0" },
  { degree: "Bachelor's in Electronics and Communications", school: "Koneru Lakshmaiah Education Foundation", years: "2009 – 2013", grade: "CGPA 7.7 / 10" },
];

export const CERTS: Cert[] = [
  { name: "ISB Certified Executive Product Management Program", url: "https://www.credential.net/b11fef44-d3ef-49f2-bfd0-ac620ac44f15#acc.F5IlodhP" },
  { name: "Meta Certified WhatsApp for Business Technical Implementation", url: "https://www.credly.com/badges/b3257eba-1752-42d7-9b17-393fef2fe4d8/linked_in_profile" },
];

export const JOBS: Job[] = [
  {
    company: "Persistent Systems",
    role: "Project Lead",
    dates: "Feb 2024 – Present",
    place: "Hyderabad, India",
    url: "http://persistent.com/",
    points: [
      "Leading architecture and delivery of a real-time Kafka-based Meta Business Agent platform (React/TypeScript, Node.js, PostgreSQL) and scaling live state to 1,000 users/second on AWS.",
      "Built LLM-powered features and a Python AI research agent pulling live data from Sitecore XMC using RAG approach, reducing audit time by 60%.",
      "Delivered server-driven, content-configured app via Sitecore XMC and migrated a full-stack app to Next.js with TanStack Query, shipping in small increments with zero production downtime and 55% faster page loads.",
      "Led a team of 5 engineers on high-signal code reviews, RFC-driven decisions, mentoring and reliability practices (Sentry, Lighthouse, CI/CD) that maintained zero critical production issues.",
    ],
  },
  {
    company: "GoTo Technologies",
    role: "Senior Software Engineer",
    dates: "Sep 2021 – Jan 2024",
    place: "Boston, USA",
    url: "https://goto.com/",
    points: [
      "Built a scalable, type-safe design system and shared component library (React/TypeScript, styled-components, Storybook) within a microfrontend architecture and monorepo tooling across 5 enterprise products, reducing UI inconsistencies by 80%.",
      "Defined SLIs/SLOs and built alerts and structured logging to proactively monitor frontend reliability.",
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

export const PROJECTS: Project[] = [
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


/** What the robot says in each room, per page. */
export const HIGHLIGHTS: Record<PageId, string[]> = {
  about: [
    "Hi, meet Chaitanya!",
    "He's a Lead Software Engineer.",
    "11 years shipping apps.",
    "React, TypeScript, Node.js, Python, AWS and AI.",
    "He mentors a team of 5 engineers.",
    "Master's in Computer Science from UMass Boston.",
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

export const OFFICE_LINES: string[] = ["Made it to the office!", ...HIGHLIGHTS.experience];
export const HOME_LINES: string[] = ["Home sweet home!", ...HIGHLIGHTS.projects];
