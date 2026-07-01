'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

export default function AnimatedPieChart({ profit = 94, rto = 6 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full max-w-[400px] h-[440px] mx-auto bg-card/50 animate-pulse rounded-[2.5rem] border border-border" />;
  }

  const radius = 76;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius; // ~477.52

  // Continuous ring calculations (joined arcs)
  const profitLen = (profit / 100) * circumference;
  const rtoLen = (rto / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-between p-8 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-slate-100 dark:border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden w-full max-w-[400px] mx-auto group">
      
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-110" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-rose-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between w-full mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[11px] font-extrabold tracking-wider text-slate-700 dark:text-slate-200 uppercase">
            AI Margin Impact
          </span>
        </div>
        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-500/20">
          Live Recovery
        </span>
      </div>

      {/* Donut Chart Display */}
      <div className="relative w-64 h-64 my-2 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 200 200">
          <defs>
            {/* Rich Curated Emerald Gradient for Profit */}
            <linearGradient id="profitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Curated Rose-Coral Gradient for RTO */}
            <linearGradient id="rtoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>

            {/* Subtle Drop Shadow for Chart Segments */}
            <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10B981" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-slate-100 dark:text-white/[0.06]"
            strokeWidth={strokeWidth}
          />

          {/* Profit Segment */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="url(#profitGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={0}
            filter="url(#chartGlow)"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${profitLen} ${circumference}` }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* RTO Segment */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="url(#rtoGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={-profitLen}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${rtoLen} ${circumference}` }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
        </svg>

        {/* Center Display KPI */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-start">
              <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {profit}
              </span>
              <span className="text-2xl font-extrabold text-emerald-500 mt-1 ml-0.5">%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-tight">
              <span>Retained Revenue</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Comparative Legend */}
      <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.08] relative z-10">
        
        {/* Business Profit KPI */}
        <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] transition-colors hover:bg-emerald-50/50 dark:hover:bg-emerald-500/[0.05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-sm shadow-emerald-500/50" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 select-none">Profit</span>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{profit}%</span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">+28% vs avg</span>
          </div>
        </div>

        {/* RTO Losses KPI */}
        <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] transition-colors hover:bg-rose-50/50 dark:hover:bg-rose-500/[0.05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 bg-rose-500 shadow-sm shadow-rose-500/50" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 select-none">RTO Rate</span>
            </div>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{rto}%</span>
            <span className="text-[11px] font-semibold text-rose-500 dark:text-rose-400">Shielded</span>
          </div>
        </div>

      </div>

    </div>
  );
}
