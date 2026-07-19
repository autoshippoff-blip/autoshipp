"use client";

import { createContext, useContext, useEffect, useState } from "react";

/** Returns true if the current hour is "night" (18:00–05:59). */
function isNightTime() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

const DashboardContext = createContext({
  isDark: true,
  toggleTheme: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
  desktopSidebarCollapsed: false,
  setDesktopSidebarCollapsed: () => {},
});

export function DashboardProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("dashboard-theme");
    if (saved !== null) {
      return saved === "dark";
    }
    return isNightTime();
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  // Sync dark class with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Re-evaluate every minute at the 6am/6pm threshold (only if no saved preference)
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem("dashboard-theme");
      if (saved === null) {
        setIsDark(isNightTime());
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("dashboard-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <DashboardContext.Provider
      value={{
        isDark,
        toggleTheme,
        sidebarOpen,
        setSidebarOpen,
        desktopSidebarCollapsed,
        setDesktopSidebarCollapsed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
