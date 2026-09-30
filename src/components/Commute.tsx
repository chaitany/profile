import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import { rand, timeline } from "../lib/motion";
import type { Pose } from "../types";
import { Robot } from "./Robot";

interface Point {
  x: number;
  y: number;
}

/** Route in % of the stage: right 3 steps, down 4 steps, right 3 steps. */
const ROUTE: [Point, Point, Point, Point] = [
  { x: 31, y: 43 }, // leaves the shrunken scene
  { x: 52, y: 43 }, // 3 steps right
  { x: 52, y: 80 }, // 4 steps down
  { x: 78, y: 80 }, // 3 steps right, at the door
];
const STEP_MS = 520; // one leg swing of the walk cycle
const STEPS = [3, 4, 3] as const;

/** Hand-drawn gravel road with grass tufts and a post-and-rail fence. */
function RoadSketch({ w, h }: { w: number; h: number }) {
  if (!w || !h) return null;
  const pts = ROUTE.map((p): [number, number] => [(p.x * w) / 100, (p.y * h) / 100]);
  const d =
    `M${pts[0][0] - 20} ${pts[0][1]} ` +
    pts.slice(1).map((p) => `L${p[0]} ${p[1]}`).join(" ") +
    ` L${pts[3][0] + 6} ${pts[3][1]}`;
  const road = Math.max(26, Math.min(46, w * 0.055));

  const tufts: string[] = [];
  const fence: ReactElement[] = [];
  const pebbles: ReactElement[] = [];
  let seed = 1;

  for (let s = 0; s < 3; s++) {
    const [x1, y1] = pts[s];
    const [x2, y2] = pts[s + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const nx = -uy;
    const ny = ux;

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
      for (let y = y1 + 10; y < y2 - 20; y += 34) {
        fence.push(<rect key={y} x={fx - 3} y={y} width={6} height={26} rx={1.5} />);
      }
      fence.push(<path key="rails" d={`M${fx} ${y1 + 16} V${y2 - 14} M${fx + 0.5} ${y1 + 26} V${y2 - 4}`} className="rail" />);
    }

    const vertical = x1 === x2;
    for (let k = 0; k < 14; k++) {
      seed++;
      const t = rand(seed);
      const o = (rand(seed + 3) - 0.5) * road * 0.6;
      pebbles.push(
        <circle
          key={`${s}-${k}`}
          cx={x1 + (x2 - x1) * t + (vertical ? o : 0)}
          cy={y1 + (y2 - y1) * t + (vertical ? 0 : o)}
          r={0.9 + rand(seed + 5) * 1.3}
        />,
      );
    }
  }

  return (
    <svg className="road" width={w} height={h} aria-hidden="true">
      <path d={d} className="road-edge" style={{ strokeWidth: road + 4 }} pathLength={100} />
      <path d={d} className="road-edge ghost" style={{ strokeWidth: road + 9 }} pathLength={100} />
      <path d={d} className="road-fill" style={{ strokeWidth: road - 1 }} />
      <g className="pebbles">{pebbles}</g>
      <path d={tufts.join(" ")} className="tufts" />
      <g className="fence">{fence}</g>
    </svg>
  );
}

interface CommuteProps {
  /** Which building the road leads to. */
  door: "office" | "house";
  /** True once arrived: the road fades out. */
  done: boolean;
  onArrive: () => void;
}

interface WalkerState extends Point {
  dur: number;
  pose: Pose;
  show: boolean;
  enter: boolean;
}

/** The robot walks the road from the shrunken scene to a door, then steps inside. */
export function Commute({ door, done, onArrive }: CommuteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [r, setR] = useState<WalkerState>({ ...ROUTE[0], dur: 0, pose: "walk", show: false, enter: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const tl = timeline();
    let t = 900;
    tl.at(t, () => setR((p) => ({ ...p, show: true })));
    t += 80;
    STEPS.forEach((n, i) => {
      const dur = n * STEP_MS;
      tl.at(t, () => setR((p) => ({ ...p, ...ROUTE[i + 1], dur, pose: "walk" })));
      t += dur;
    });
    tl.at(t, () => setR((p) => ({ ...p, pose: "idle", dur: 0, enter: true }))); // steps into the door
    tl.at(t + 650, onArrive);
    return tl.clear;
    // runs once per commute; onArrive is stable
  }, []);

  return (
    <div className={`commute ${done ? "done" : ""}`} ref={ref}>
      <RoadSketch w={size.w} h={size.h} />
      <div className={`door door-${door} ${r.enter ? "open" : ""}`} aria-hidden="true" />
      <div
        className={`walker ${r.show ? "show" : ""} ${r.enter ? "enter" : ""}`}
        style={{
          left: `${r.x}%`,
          top: `${r.y}%`,
          transition: `left ${r.dur}ms linear, top ${r.dur}ms linear, opacity .5s, transform .6s ease-in`,
        }}
      >
        <Robot pose={r.pose} />
      </div>
    </div>
  );
}
