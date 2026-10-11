import type { ReactNode } from "react";

/**
 * Eight little paper flowers, one per entry in the list. They're decorative,
 * so every one of them is hidden from screen readers by the element that
 * places it.
 */

/** Evenly spaced angles, for petals arranged around a centre. */
function ring(count: number) {
  return Array.from({ length: count }, (_, i) => (360 / count) * i);
}

/**
 * A tight viewBox keeps every flower roughly the same visual size, even the
 * narrow ones with stems that only fill part of the 64x64 grid they're drawn on.
 */
function Bloom({
  children,
  viewBox = "0 0 64 64",
}: {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className="h-full w-full">
      {children}
    </svg>
  );
}

/** Cherry blossom: five notched petals. */
function Sakura() {
  return (
    <Bloom>
      {ring(5).map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle} 32 32)`}
          fill="#f7a0c0"
          d="M32 34C24.5 28 22.5 16.5 26.5 9.5C28.4 6 30.6 10 32 10C33.4 10 35.6 6 37.5 9.5C41.5 16.5 39.5 28 32 34Z"
        />
      ))}
      {ring(5).map((angle) => (
        <ellipse
          key={angle}
          transform={`rotate(${angle} 32 32)`}
          cx="32"
          cy="22"
          rx="3.1"
          ry="5.2"
          fill="#ffd2e4"
        />
      ))}
      <circle cx="32" cy="32" r="4.3" fill="#ffcf5c" />
    </Bloom>
  );
}

/** Daisy: a lot of thin white petals. */
function Daisy() {
  return (
    <Bloom>
      {ring(13).map((angle) => (
        <ellipse
          key={angle}
          transform={`rotate(${angle} 32 32)`}
          cx="32"
          cy="16.5"
          rx="3.3"
          ry="9.5"
          fill="#fffdfa"
          stroke="#f0dfe9"
          strokeWidth="0.7"
        />
      ))}
      <circle cx="32" cy="32" r="6.6" fill="#ffcf5c" />
      <circle cx="32" cy="32" r="3.4" fill="#f5b53f" />
    </Bloom>
  );
}

/** Tulip, with a stem and one leaf. */
function Tulip() {
  return (
    <Bloom viewBox="17 16 30 44">
      <path
        d="M32 56C32 46 32 38 32 30"
        stroke="#9ed3a9"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 50C26 50.5 22 47 20.5 42C26 41.5 30.5 44.5 32 50Z"
        fill="#aadcb4"
      />
      <path
        d="M32 48C23.5 43.5 19.5 33 21 20C25.5 26 28.5 18.5 32 23C35.5 18.5 38.5 26 43 20C44.5 33 40.5 43.5 32 48Z"
        fill="#f2769d"
      />
      <path
        d="M32 48C28.5 43.5 27 33 27.6 21.5C29.3 24.4 30.8 20.8 32 23Z"
        fill="#ffa8c4"
      />
    </Bloom>
  );
}

/** A sprig of lavender. */
function Lavender() {
  const buds = [
    [32, 12, 0],
    [27, 19, -22],
    [37, 19, 22],
    [28, 27, -18],
    [36, 27, 18],
    [29, 35, -14],
    [35, 35, 14],
    [32, 21, 0],
    [32, 30, 0],
  ] as const;

  return (
    <Bloom viewBox="19 5 26 55">
      <path
        d="M32 58C32 48 32 40 32 16"
        stroke="#9ed3a9"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 46C27 46.5 23.5 43.5 22 39.5C26.5 39 30.5 41.5 32 46Z"
        fill="#aadcb4"
      />
      {buds.map(([x, y, rot], i) => (
        <ellipse
          key={i}
          transform={`rotate(${rot} ${x} ${y})`}
          cx={x}
          cy={y}
          rx="4"
          ry="5.6"
          fill={i % 2 === 0 ? "#bda4f0" : "#d6c6fb"}
        />
      ))}
    </Bloom>
  );
}

/** Hibiscus: five broad petals and a long stamen. */
function Hibiscus() {
  return (
    <Bloom>
      {ring(5).map((angle) => (
        <ellipse
          key={angle}
          transform={`rotate(${angle} 32 32)`}
          cx="32"
          cy="20"
          rx="10.5"
          ry="11.5"
          fill="#fda593"
        />
      ))}
      {ring(5).map((angle) => (
        <ellipse
          key={angle}
          transform={`rotate(${angle} 32 32)`}
          cx="32"
          cy="24"
          rx="5"
          ry="5.5"
          fill="#ffc4b3"
        />
      ))}
      <circle cx="32" cy="32" r="4" fill="#ffd9a0" />
      <path
        d="M32 32L44 20"
        stroke="#ffb15c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="45" cy="19" r="3" fill="#ffcf5c" />
    </Bloom>
  );
}

/** Lotus: a fan of pointed petals. */
function Lotus() {
  const back = [-78, -52, -26, 0, 26, 52, 78];
  const front = [-38, -13, 13, 38];

  return (
    <Bloom>
      {back.map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle} 32 46)`}
          fill="#f9bcd4"
          d="M32 46C27.5 37 27.5 24 32 14C36.5 24 36.5 37 32 46Z"
        />
      ))}
      {front.map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle} 32 48)`}
          fill="#f48bb3"
          d="M32 48C28.5 40 28.5 29 32 21C35.5 29 35.5 40 32 48Z"
        />
      ))}
      <ellipse cx="32" cy="48" rx="7" ry="4" fill="#ffd9e7" />
    </Bloom>
  );
}

/** Forget-me-nots: a little cluster. */
function ForgetMeNot() {
  const cluster = [
    { x: 21, y: 36, s: 1 },
    { x: 41, y: 28, s: 0.86 },
    { x: 33, y: 46, s: 0.74 },
  ];

  return (
    <Bloom>
      {cluster.map(({ x, y, s }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
          {ring(5).map((angle) => (
            <circle
              key={angle}
              transform={`rotate(${angle} 0 0)`}
              cx="0"
              cy="-9"
              r="6.4"
              fill="#9ec9f5"
            />
          ))}
          <circle cx="0" cy="0" r="3.6" fill="#fff3cd" />
          <circle cx="0" cy="0" r="1.7" fill="#ffcf5c" />
        </g>
      ))}
    </Bloom>
  );
}

/** Sunflower: pointed petals round a dark heart. */
function Sunflower() {
  return (
    <Bloom>
      {ring(14).map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle} 32 32)`}
          fill="#ffc34d"
          d="M32 7C35.6 13 35.6 23 32 29C28.4 23 28.4 13 32 7Z"
        />
      ))}
      <circle cx="32" cy="32" r="9.5" fill="#d9924a" />
      <circle cx="32" cy="32" r="6.5" fill="#c47c38" />
    </Bloom>
  );
}

/** In list order. One per entry in `site.adore.items`. */
export const FLOWERS = [
  Sakura,
  Daisy,
  Tulip,
  Lavender,
  Hibiscus,
  Lotus,
  ForgetMeNot,
  Sunflower,
];

/**
 * Where each flower sits on its photo. Fixed rather than random, so the
 * server and the browser always agree, and so it stays put between visits.
 */
export const FLOWER_SPOTS = [
  "-top-3 -left-3 -rotate-12 sm:-top-5 sm:-left-4",
  "-top-4 -right-3 rotate-6 sm:-top-6 sm:-right-4",
  "-right-3 -bottom-3 rotate-12 sm:-right-5 sm:-bottom-5",
  "-bottom-4 -left-3 -rotate-6 sm:-bottom-6 sm:-left-4",
  "-top-3 -right-2 rotate-[18deg] sm:-top-5 sm:-right-6",
  "-bottom-3 -left-2 -rotate-[14deg] sm:-bottom-5 sm:-left-6",
  "-top-4 -left-3 rotate-[8deg] sm:-top-6 sm:-left-5",
  "-right-3 -bottom-4 -rotate-[10deg] sm:-right-4 sm:-bottom-6",
];
