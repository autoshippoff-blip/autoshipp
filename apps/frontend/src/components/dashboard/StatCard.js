import React from "react";
import { motion } from "framer-motion";

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  index = 0,
  theme,
  isDark,
}) {
  const colorMap = {
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 rounded-3xl border ${colorMap[color]} backdrop-blur-sm group hover:scale-[1.02] transition-all`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-xl bg-white/5">
          <Icon size={20} />
        </div>
        {sub && (
          <span
            className={`text-[10px] font-black px-2 py-1 rounded-lg bg-white/5 uppercase tracking-tighter ${theme?.text}`}
          >
            {sub}
          </span>
        )}
      </div>
      <p
        className={`text-xs ${theme?.text} font-bold uppercase tracking-widest mb-1`}
      >
        {label}
      </p>
      <p className={`text-3xl font-black ${theme?.heading} tracking-tighter`}>
        {value}
      </p>
    </motion.div>
  );
}
