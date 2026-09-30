import { LINKS } from "../data/content";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7l8 6 8-6" /></svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" /></svg>
);

/** Email, LinkedIn and GitHub in a glass pill, bottom-left on every page. */
export function Contacts() {
  return (
    <ul className="contacts" aria-label="Contact">
      <li>
        <a href={LINKS.email} title={LINKS.emailAddress}>
          <MailIcon />
          <span className="long">Contact</span>
          <span className="short">Email</span>
        </a>
      </li>
      <li>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><PersonIcon /><span>LinkedIn</span></a>
      </li>
      <li>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><CodeIcon /><span>GitHub</span></a>
      </li>
    </ul>
  );
}
