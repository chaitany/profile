import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { REDUCED, isMobile, timeline } from "../lib/motion";
import type { Pose } from "../types";
import { Robot } from "./Robot";

const PULL_MS = 3200;
const EASE = "cubic-bezier(.45,.05,.35,1)";

/** Where the robot rests after pulling the room in (share of the stage width). */
export const settleX = (): number => (isMobile() ? 0.68 : 0.8);

interface PullState {
  rect: DOMRect;
  robotH: number;
  robotW: number;
  /** x of the room's right edge, in px from the stage's left. */
  edge: number;
  robotX: number;
  dur: number;
  pose: Pose;
  done: boolean;
}

interface IntroProps {
  /** The real stage, measured so the pulled room lines up exactly. */
  stageRef: RefObject<HTMLElement>;
  /** Called when the content should fade in. */
  onLeave: () => void;
  /** Called when the intro overlay can be removed. */
  onDone: () => void;
}

/** Robot peeks in from the left, ducks out, then drags the living room onto the screen. */
export function Intro({ stageRef, onLeave, onDone }: IntroProps) {
  const [peek, setPeek] = useState<{ pos: "off" | "peek"; dur: number }>({ pos: "off", dur: 0 });
  const [pull, setPull] = useState<PullState | null>(null);
  const [leaving, setLeaving] = useState(false);
  const ended = useRef(false);

  const leave = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    setLeaving(true);
    onLeave();
    window.setTimeout(onDone, 750);
  }, [onLeave, onDone]);

  useEffect(() => {
    const tl = timeline();
    if (REDUCED) {
      tl.at(400, leave);
      return tl.clear;
    }

    tl.at(250, () => setPeek({ pos: "peek", dur: 1200 })); // slow peek
    tl.at(2300, () => setPeek({ pos: "off", dur: 800 })); // ducks back out

    tl.at(3300, () => {
      const el = stageRef.current;
      if (!el) { leave(); return; }
      const rect = el.getBoundingClientRect();
      // same size as the robot in the room (see .roamer in styles.css)
      const robotH = isMobile() ? rect.height * 0.46 : Math.min(rect.height * 0.34, 290);
      const robotW = (robotH * 2) / 3;
      const hand = robotW * 0.39; // hand-to-center offset while leaning into the pull
      setPull({ rect, robotH, robotW, edge: -robotW, robotX: -robotW + hand, dur: 0, pose: "pull", done: false });
    });
    tl.at(3360, () =>
      setPull((p) => p && { ...p, edge: p.rect.width, robotX: p.rect.width + p.robotW * 0.39, dur: PULL_MS }),
    );
    tl.at(3360 + PULL_MS + 150, () =>
      setPull((p) => p && { ...p, pose: "walk", robotX: p.rect.width * settleX(), dur: 800, done: true }),
    );
    tl.at(3360 + PULL_MS + 1000, leave);
    return tl.clear;
  }, [leave, stageRef]);

  return (
    <div className={`intro ${leaving ? "leaving" : ""}`}>
      <h1 className="sr-only">Chaitanya Reddy Vaddula, Lead Software Engineer</h1>

      {!pull && (
        <div className={`intro-robot ir-${peek.pos}`} style={{ transition: `left ${peek.dur}ms ${EASE}` }}>
          <Robot pose="peek" />
        </div>
      )}

      {pull && (
        <div
          className="pull-stage"
          style={{ left: pull.rect.left, top: pull.rect.top, width: pull.rect.width, height: pull.rect.height }}
        >
          <div
            className={`scene pull-scene ${pull.done ? "done" : ""}`}
            style={{
              transform: `translateX(${pull.edge - pull.rect.width}px)`,
              transition: `transform ${pull.done ? 0 : pull.dur}ms ${EASE}`,
            }}
          >
            <span className="pull-edge" aria-hidden="true" />
          </div>
          <div
            className="pull-robot"
            style={{
              left: pull.robotX,
              height: pull.robotH,
              transition: `left ${pull.dur}ms ${pull.done ? "ease-in-out" : EASE}`,
            }}
          >
            <Robot pose={pull.pose} />
          </div>
        </div>
      )}

      <button type="button" className="skip" onClick={leave}>Skip intro</button>
    </div>
  );
}
