import { PAGES } from "../data/content";
import type { PageId } from "../types";

export const NAVY = "#0E1524";

/** True when the visitor asked their OS for less motion. */
export const REDUCED: boolean =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = (): boolean => window.matchMedia("(max-width: 860px)").matches;

export const pageFromHash = (): PageId => {
  const h = window.location.hash.replace("#", "");
  const match = PAGES.find((p) => p.id === h);
  return match ? match.id : "about";
};

/** Deterministic pseudo-random number in [0, 1) so drawings stay stable between renders. */
export const rand = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/** Schedules callbacks and returns a function that cancels all of them. */
export function timeline(): { at: (ms: number, fn: () => void) => void; clear: () => void } {
  const ids: number[] = [];
  return {
    at: (ms, fn) => { ids.push(window.setTimeout(fn, ms)); },
    clear: () => ids.forEach((id) => window.clearTimeout(id)),
  };
}
