import { useCallback, useEffect, useRef, useState } from "react";
import { PAGES } from "../data/content";
import type { PageId } from "../types";

/** Segmented pill navigation with a sliding white indicator. */
export function Nav({ page }: { page: PageId }) {
  const refs = useRef<Partial<Record<PageId, HTMLAnchorElement | null>>>({});
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null);

  const measure = useCallback(() => {
    const el = refs.current[page];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [page]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure); // labels change width once the web font loads
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav className="nav" aria-label="Sections">
      <div className="nav-track">
        {ind && (
          <span className="nav-ind" style={{ width: ind.width, transform: `translateX(${ind.left}px)` }} aria-hidden="true" />
        )}
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
