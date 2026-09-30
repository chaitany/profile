export type PageId = "about" | "experience" | "projects";

/** The three places the robot can be. */
export type Place = "living" | "office" | "home";

export type Pose = "idle" | "walk" | "wave" | "talk" | "peek" | "pull";

export interface PageLink {
  id: PageId;
  label: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  years: string;
  grade: string;
}

export interface Cert {
  name: string;
  url: string;
}

export interface Job {
  company: string;
  role: string;
  dates: string;
  place: string;
  points: string[];
  url: string;
}

export interface Project {
  name: string;
  repo: string;
  tagline: string;
  text: string;
  points: string[];
  stack: string[];
  github: string;
  live: string;
}
