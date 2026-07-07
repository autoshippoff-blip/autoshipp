import React from "react";

export function StatusBadge({ status, isDark }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${isActive ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-500/10 text-emerald-600") : isDark ? "bg-slate-500/10 text-slate-400" : "bg-slate-500/10 text-slate-600"}`}
    >
      <span
        className={`w-1 h-1 rounded-full ${isActive ? "bg-emerald-400" : "bg-slate-400"} ${isActive && "animate-pulse"}`}
      />
      {status}
    </span>
  );
}
