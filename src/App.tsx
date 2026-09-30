import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { Commute } from "./components/Commute";
import { Contacts } from "./components/Contacts";
import { Intro, settleX } from "./components/Intro";
import { Nav } from "./components/Nav";
import { RoamingRobot } from "./components/RoamingRobot";
import { HIGHLIGHTS, HOME_LINES, OFFICE_LINES } from "./data/content";
import { REDUCED, pageFromHash } from "./lib/motion";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { Projects } from "./pages/Projects";
import type { PageId, Place } from "./types";

/** Where the robot lives for each page. */
const PLACE: Record<PageId, Place> = { about: "living", experience: "office", projects: "home" };

const PAGE_COMPONENT: Record<PageId, ComponentType> = {
  about: About,
  experience: Experience,
  projects: Projects,
};

interface SceneState {
  /** Scene the robot is in right now. */
  at: Place;
  phase: "idle" | "exiting" | "commute";
  /** Destination while exiting or commuting. */
  to: Place;
}

type LayerState = "show" | "mini" | "hide";

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const [intro, setIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [sc, setSc] = useState<SceneState>({ at: "living", phase: "idle", to: "living" });
  const [trail, setTrail] = useState(false); // keeps the road on screen while it fades out
  const [handoff, setHandoff] = useState(true); // robot continues from the intro without a drop-in
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [page]);

  // Move the robot to the place that belongs to the current page.
  useEffect(() => {
    if (!revealed) return undefined;
    const target = PLACE[page];
    if (sc.phase !== "idle") {
      // page changed mid-trip: jump straight to the new place
      if (sc.to !== target) setSc({ at: target, phase: "idle", to: target });
      return undefined;
    }
    if (sc.at === target) return undefined;
    if (target === "living" || REDUCED) {
      setSc({ at: target, phase: "idle", to: target });
      return undefined;
    }
    // when the site opens straight on this page, let the robot say hello first
    const t = window.setTimeout(() => setSc((s) => ({ ...s, phase: "exiting", to: target })), intro ? 1600 : 0);
    return () => window.clearTimeout(t);
  }, [page, revealed, sc, intro]);

  const onLeave = useCallback(() => setRevealed(true), []);
  const onDone = useCallback(() => {
    setIntro(false);
    window.setTimeout(() => setHandoff(false), 1500);
  }, []);

  // After walking out: take the road, unless it's just the next room in the same house.
  const onExited = useCallback(
    () =>
      setSc((s) =>
        s.at === "living" && s.to === "home" ? { at: "home", phase: "idle", to: "home" } : { ...s, phase: "commute" },
      ),
    [],
  );

  const onArrive = useCallback(() => {
    setSc((s) => ({ at: s.to, phase: "idle", to: s.to }));
    setTrail(true);
    window.setTimeout(() => setTrail(false), 900);
  }, []);

  const layer = (name: Place): LayerState => {
    if (sc.at !== name) return "hide";
    return sc.phase === "commute" ? "mini" : "show";
  };

  const robotIn = (name: Place, list: string[]) => {
    if (!revealed || sc.at !== name || sc.phase === "commute") return null;
    const fromIntro = handoff && name === "living";
    return (
      <RoamingRobot
        list={list}
        mode={sc.phase === "exiting" ? "exit" : "roam"}
        onExited={onExited}
        arrive={!fromIntro}
        startX={fromIntro ? settleX() * 100 : 50}
      />
    );
  };

  const Page = PAGE_COMPONENT[page];

  return (
    <>
      <div className={`app ${revealed ? "revealed" : ""}`} aria-hidden={!revealed}>
        <section className="stage" ref={stageRef}>
          <div
            className={`scene scene-living ${layer("living")}`}
            role="img"
            aria-label="A robot made of blocks walks around a sketched living room, sharing highlights about Chaitanya"
          >
            <div className="room-floor">{robotIn("living", HIGHLIGHTS.about)}</div>
          </div>
          <div
            className={`scene scene-office ${layer("office")}`}
            role="img"
            aria-label="The robot at work in a sketched office, sharing highlights from Chaitanya's experience"
          >
            <div className="room-floor">{robotIn("office", OFFICE_LINES)}</div>
          </div>
          <div
            className={`scene scene-home ${layer("home")}`}
            role="img"
            aria-label="The robot back home in a sketched home office, sharing highlights from Chaitanya's projects"
          >
            <div className="room-floor">{robotIn("home", HOME_LINES)}</div>
          </div>

          {(sc.phase === "commute" || trail) && (
            <Commute
              key={sc.to}
              door={sc.to === "office" ? "office" : "house"}
              done={sc.phase !== "commute"}
              onArrive={onArrive}
            />
          )}

          <Nav page={page} />
          <Contacts />
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
