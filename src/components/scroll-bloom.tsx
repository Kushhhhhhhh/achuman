"use client";

import { useEffect, useRef } from "react";

/** Where each petal sits, and how far down the page it opens. */
const PETALS = [
  { angle: 0, at: 0.05 },
  { angle: 72, at: 0.24 },
  { angle: 144, at: 0.43 },
  { angle: 216, at: 0.62 },
  { angle: 288, at: 0.81 },
];

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A small flower in the corner that opens one petal at a time as she scrolls,
 * with a thin rose ring tracking the exact position. Same five petals as the
 * site icon.
 *
 * Progress is written straight to the DOM on an animation frame rather than
 * held in state, so scrolling never triggers a React render.
 */
export function ScrollBloom() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const petals = Array.from(
      el.querySelectorAll<SVGGElement>("[data-petal]"),
    );
    let frame = 0;

    const paint = () => {
      frame = 0;

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;

      el.style.setProperty("--p", progress.toFixed(4));
      toggle(el, "awake", progress > 0.015);
      toggle(el, "bloomed", progress > 0.995);

      petals.forEach((petal, index) => {
        toggle(petal, "open", progress >= PETALS[index].at);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // The page gets taller as lazy images arrive, which changes how far
    // "all the way down" actually is. Without this the flower can sit at the
    // wrong stage until the next scroll.
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="bloom pointer-events-none fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <circle
          cx="24"
          cy="24"
          r="23"
          className="fill-white/75 [filter:drop-shadow(0_6px_14px_rgba(120,70,130,0.28))]"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeWidth="1.75"
          className="stroke-petal/70"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="bloom-ring stroke-rose"
        />

        {PETALS.map((petal) => (
          <g
            key={petal.angle}
            data-petal=""
            style={{ "--a": `${petal.angle}deg` } as React.CSSProperties}
          >
            <ellipse cx="24" cy="16.5" rx="5" ry="6.8" className="fill-rose" />
            <ellipse
              cx="24"
              cy="18.2"
              rx="2.5"
              ry="3.5"
              className="fill-petal"
            />
          </g>
        ))}

        <circle cx="24" cy="24" r="3.4" className="bloom-heart fill-[#ffcf5c]" />
      </svg>
    </div>
  );
}

function toggle(el: HTMLElement | SVGElement, name: string, on: boolean) {
  if (on === (el.dataset[name] !== undefined)) return;
  if (on) el.dataset[name] = "";
  else delete el.dataset[name];
}
