import { useEffect, useRef, useState } from "react";
import { REDUCED } from "../lib/motion";
import type { Pose } from "../types";
import { Robot } from "./Robot";

interface RoamingRobotProps {
  /** Speech-bubble lines; the first is said on arrival. */
  list: string[];
  /** "exit" walks off the right edge, then calls onExited. */
  mode?: "roam" | "exit";
  onExited?: () => void;
  /** Play the drop-in animation when it appears. */
  arrive?: boolean;
  /** Starting position as a percentage of the scene width. */
  startX?: number;
}

interface RobotState {
  x: number;
  pose: Pose;
  dur: number;
  bubble: string | null;
}

/** Robot that walks around a scene, waves and shares highlights. */
export function RoamingRobot({ list, mode = "roam", onExited, arrive = false, startX = 50 }: RoamingRobotProps) {
  const [st, setSt] = useState<RobotState>({ x: startX, pose: "wave", dur: 0, bubble: list[0] ?? null });
  const xRef = useRef(startX);

  useEffect(() => {
    let alive = true;
    let timer: number | undefined;
    const wait = (ms: number) => new Promise<void>((resolve) => { timer = window.setTimeout(resolve, ms); });

    if (mode === "exit") {
      const dur = Math.round((112 - xRef.current) * 24);
      xRef.current = 112;
      setSt({ x: 112, pose: "walk", dur, bubble: null });
      timer = window.setTimeout(() => onExited?.(), dur);
      return () => window.clearTimeout(timer);
    }

    if (REDUCED) {
      setSt({ x: xRef.current, pose: "idle", dur: 0, bubble: list[0] ?? null });
      return undefined;
    }

    void (async () => {
      let i = 0;
      setSt({ x: xRef.current, pose: "wave", dur: 0, bubble: list[0] ?? null });
      await wait(3000);
      while (alive) {
        let nx: number;
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

    return () => { alive = false; window.clearTimeout(timer); };
    // onExited is stable (useCallback in App); restarting on it would reset the walk
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
