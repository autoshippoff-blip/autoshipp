"use client";

import { useState, useEffect } from "react";

/**
 * Returns true if the current hour is "night" (6pm–6am).
 */
function isNightTime() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

/**
 * useTheme
 *
 * Resolves the initial dark-mode state using this priority:
 *   1. Saved user preference in localStorage ('autoshipp-theme' key)
 *   2. Time of day  – night (18:00–05:59) → dark, day (06:00–17:59) → light
 *
 * Also persists the user's manual toggle back to localStorage.
 * Re-checks the time every minute so the mode flips automatically
 * at 6am / 6pm if the user hasn't overridden it.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("autoshipp-theme");
    if (saved !== null) {
      return saved === "dark";
    }
    return isNightTime();
  });

  // Re-evaluate every minute in case the threshold (6am/6pm) is crossed
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem("autoshipp-theme");
      if (saved === null) {
        // Only auto-switch when no user preference is saved
        setIsDark(isNightTime());
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  function setIsDarkAndPersist(value) {
    setIsDark(value);
    localStorage.setItem("autoshipp-theme", value ? "dark" : "light");
  }

  return [isDark, setIsDarkAndPersist];
}
