"use client";

import { useEffect } from "react";

/** Swaps the tab title for a little nudge while she's looking at another tab. */
export function TabTitle({ away }: { away: string }) {
  useEffect(() => {
    const original = document.title;

    const onVisibilityChange = () => {
      document.title = document.hidden ? away : original;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.title = original;
    };
  }, [away]);

  return null;
}
