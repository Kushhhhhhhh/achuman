"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "petals-seen";
const PETAL_COUNT = 20;
/** Long enough for the slowest petal to land, then the whole thing unmounts. */
const TEARDOWN_MS = 13_000;

const TINTS = ["#ffc2dc", "#ffd9ea", "#e4d4ff", "#ffe6b8"];

type Petal = {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  size: number;
  tint: string;
};

/**
 * Petals drifting down, but only the very first time this browser opens the
 * page. After that it's remembered in localStorage and never runs again.
 */
export function Petals() {
  const [petals, setPetals] = useState<Petal[] | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // private mode or storage blocked, so show them once for this page view
    }

    setPetals(
      Array.from({ length: PETAL_COUNT }, (): Petal => {
        const toss = (min: number, max: number) =>
          min + Math.random() * (max - min);
        return {
          left: toss(-5, 100),
          delay: toss(0, 4),
          duration: toss(6, 9.5),
          drift: toss(-14, 14),
          spin: toss(220, 620),
          size: toss(10, 20),
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        };
      }),
    );

    const teardown = setTimeout(() => setPetals(null), TEARDOWN_MS);
    return () => clearTimeout(teardown);
  }, []);

  if (!petals) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {petals.map((petal, index) => (
        <span
          key={index}
          className="petal"
          style={
            {
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.25}px`,
              backgroundColor: petal.tint,
              "--petal-delay": `${petal.delay}s`,
              "--petal-duration": `${petal.duration}s`,
              "--petal-drift": `${petal.drift}vw`,
              "--petal-spin": `${petal.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
