import { NAVY } from "../lib/motion";
import type { Pose } from "../types";

interface BlockProps {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  grain?: boolean;
}

/** One wooden block: white fill, navy outline, faint grain lines. */
function Block({ x, y, w, h, r = 6, grain = true }: BlockProps) {
  const half = (w - 12) / 2;
  const quarter = (w - 12) / 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#FFFFFF" stroke={NAVY} strokeWidth={3} />
      {grain && (
        <path
          d={`M${x + 6} ${y + h * 0.32} q${quarter} -3 ${half} 0 t${half} 0 M${x + 6} ${y + h * 0.66} q${quarter} 3 ${half} 0 t${half} 0`}
          stroke={NAVY}
          strokeWidth={1.2}
          fill="none"
          opacity={0.16}
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

const Ring = ({ cx, cy }: { cx: number; cy: number }) => (
  <circle cx={cx} cy={cy} r={3.6} fill={NAVY} stroke="#FFFFFF" strokeWidth={2} />
);

interface RobotProps {
  pose?: Pose;
  className?: string;
}

/** The block robot. Poses are driven entirely by CSS classes (see styles.css). */
export function Robot({ pose = "idle", className = "" }: RobotProps) {
  return (
    <svg className={`robot pose-${pose} ${className}`} viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <ellipse className="rb-shadow" cx={100} cy={270} rx={50} ry={7} />
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
              <circle cx={80} cy={76} r={9} fill={NAVY} />
              <circle cx={120} cy={76} r={9} fill={NAVY} />
              <circle cx={83} cy={73} r={2.6} fill="#FFFFFF" />
              <circle cx={123} cy={73} r={2.6} fill="#FFFFFF" />
            </g>
          </g>
          <path className="rb-mouth" d="M88 97 Q100 109 112 97" stroke={NAVY} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
