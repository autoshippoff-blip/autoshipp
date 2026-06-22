'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, BarChart3, Info, ChevronRight } from 'lucide-react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

const COD_BREAKDOWN = [
  { label: 'Confirmed', value: 80, color: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
  { label: 'Rejected', value: 10, color: 'bg-red-500', glow: 'shadow-red-500/20' },
  { label: 'Fallback Flow', value: 10, color: 'bg-amber-400', glow: 'shadow-amber-400/20' },
];

const SHIPPING_TIMELINE = [
  { stage: 'Order → Call Made', avg: '18 min', status: 'Fast' },
  { stage: 'Call Made → Confirmed', avg: '2.4 hrs', status: 'Optimal' },
  { stage: 'Confirmed → Label', avg: '22 min', status: 'Fast' },
  { stage: 'Label → Shipped', avg: '6.1 hrs', status: 'Delayed', warning: true },
  { stage: 'Shipped → Delivered', avg: '2.3 days', status: 'Normal' },
];

const MONTHLY_TREND = [62, 68, 71, 74, 78, 80, 80];
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export default function BrandAnalyticsPage() {
  const maxTrend = Math.max(...MONTHLY_TREND);

  return (
    <div className="min-h-screen  text-slate-300">
      <DashboardHeader title="Logistics Intelligence" />
      
      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Top Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* COD Outcomes - High Contrast Breakdown */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-violet-400 w-5 h-5" />
                <h2 className="text-sm font-black uppercase tracking-widest text-white">COD Intent Analysis</h2>
              </div>
              <Info className="text-slate-600 w-4 h-4 cursor-help" />
            </div>

            {/* Visual Stacked Bar */}
            <div className="flex h-10 rounded-2xl overflow-hidden mb-8 border border-white/5 shadow-inner bg-white/5">
              {COD_BREAKDOWN.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                  className={`${s.color} h-full relative group cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {COD_BREAKDOWN.map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${s.color} shadow-lg ${s.glow}`} />
                    <span className="text-xs font-bold text-slate-400">{s.label}</span>
                  </div>
                  <div className="text-sm font-mono font-black text-white">{s.value}%</div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-600 mt-6 font-bold uppercase tracking-tighter">
              Sample size: {(1120).toLocaleString()} Automated Calls • 99.2% Success Rate
            </p>
          </motion.div>

          {/* Shipping Timeline - Step Visualizer */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-8">
              <Clock className="text-amber-400 w-5 h-5" />
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Efficiency Timeline</h2>
            </div>
            
            <div className="space-y-4">
              {SHIPPING_TIMELINE.map((t, i) => (
                <div key={t.stage} className="relative flex items-center justify-between group">
                  <div className="flex items-center gap-4 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${t.warning ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                      {i + 1}
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{t.stage}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${t.warning ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>
                      {t.status}
                    </span>
                    <span className="text-sm font-mono font-black text-violet-300 min-w-[60px] text-right">{t.avg}</span>
                  </div>
                  
                  {/* Vertical Connector Line */}
                  {i !== SHIPPING_TIMELINE.length - 1 && (
                    <div className="absolute left-4 top-8 w-[1px] h-4 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Long-term Trends - Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-2">COD Confirmation Trend</h2>
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp size={16} />
                <span className="text-xs font-bold">+18% Absolute Growth YoY</span>
              </div>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold px-3 py-1 text-slate-400 outline-none">
              <option>Last 7 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          <div className="flex items-end gap-4 h-40">
            {MONTHLY_TREND.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex flex-col items-center">
                   {/* Value Tooltip on Hover */}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -top-8 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl pointer-events-none"
                  >
                    {v}%
                  </motion.span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / maxTrend) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.8, ease: "backOut" }}
                    className={`w-full max-w-[60px] rounded-t-xl bg-gradient-to-t from-violet-600/10 via-violet-500/40 to-violet-400 hover:to-white transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                <span className="text-[10px] font-black uppercase text-slate-600 group-hover:text-slate-300 transition-colors">
                  {MONTHS[i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Insight Note */}
        <div className="flex items-center justify-between p-6 bg-violet-600/10 border border-violet-500/20 rounded-3xl">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                 <TrendingUp size={24} />
              </div>
              <div>
                 <p className="text-sm font-bold text-white mb-1">Optimal Sync Detected</p>
                 <p className="text-xs text-slate-500">Your average time from <span className="text-violet-300">Order → Confirmation</span> is 12% faster than the industry average.</p>
              </div>
           </div>
           <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400 hover:text-white transition-colors">
              Full Report <ChevronRight size={14} />
           </button>
        </div>
      </main>
    </div>
  );
}