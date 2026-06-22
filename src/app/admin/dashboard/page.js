'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Plus, 
  Search, 
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

const STATS = [
  { label: 'Orders Processed Today', value: '1,284', delta: '+12%', icon: Activity, color: 'violet' },
  { label: 'Active Brands', value: '34', delta: '+2 new', icon: Users, color: 'emerald' },
  { label: 'MRR (Estimated)', value: '₹4.2L', delta: '+8.4%', icon: TrendingUp, color: 'blue' },
  { label: 'RTOs Prevented', value: '18,740', delta: '94% Accuracy', icon: ShieldCheck, color: 'amber' },
];

const CHART_DATA = [
  820, 932, 901, 934, 1290, 1330, 1320, 980, 860, 940,
  780, 1040, 1100, 950, 1200, 1340, 1280, 1190, 1320, 1450,
  1380, 1420, 1500, 1380, 1480, 1530, 1420, 1520, 1600, 1284,
];

const BRANDS_SUMMARY = [
  { name: 'FabIndia Direct', type: 'Direct', status: 'Active', orders: 3400, health: 98 },
  { name: 'Pepperfry', type: 'Aggregator', status: 'Active', orders: 8200, health: 94 },
  { name: 'HealthKart', type: 'Direct', status: 'Paused', orders: 1200, health: 0 },
  { name: 'Bewakoof', type: 'Direct', status: 'Active', orders: 5100, health: 91 },
];

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(true);
  
  // Theme-specific color classes
  const theme = {
    dark: isDark,
    bg: isDark ? 'bg-[#030014]' : 'bg-slate-50',
    text: isDark ? 'text-slate-300' : 'text-slate-600',
    heading: isDark ? 'text-white' : 'text-slate-900',
    accent: isDark ? 'text-violet-400' : 'text-blue-600',
    primaryBtn: isDark ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
    secondaryBtn: isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm',
    card: isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm',
    glow: isDark ? 'opacity-20' : 'opacity-10',
    accentGradient: isDark ? 'from-violet-500 to-fuchsia-500' : 'from-blue-600 to-indigo-600',
  };
  
  const maxVal = Math.max(...CHART_DATA);

  return (
    <div className={`min-h-screen ${theme.text}`}>
      <DashboardHeader title="System Intelligence" />
      
      <main className="p-6 space-y-8 max-w-[1600px] mx-auto">
        
        {/* Top Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${theme.heading} tracking-tight`}>Executive Overview</h1>
            <p className={`text-slate-500 text-sm`}>Real-time system performance and brand logistics health.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-violet-400 transition-colors" />
              <input 
                placeholder="Search brands..." 
                className={`bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-violet-500/50 transition-all w-64 ${!isDark && 'text-slate-800'}`}
              />
            </div>
            <button className={`bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-violet-600/20 ${!isDark && 'bg-blue-600 hover:bg-blue-700'}`}>
              <Plus size={18} /> New Brand
            </button>
          </div>
        </div>

        {/* Dynamic Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} theme={theme} isDark={isDark} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Chart Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-lg font-bold ${theme.heading}`}>Throughput Analysis</h2>
                <p className={`text-xs ${theme.text}`}>Order verification volume across all channels.</p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-lg">
                {['24h', '7d', '30d'].map(t => (
                  <button key={t} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${t === '30d' ? (isDark ? 'bg-violet-500 text-white' : 'bg-blue-600 text-white') : 'hover:bg-white/5'}`}>{t}</button>
                ))}
              </div>
            </div>
            
            <div className="flex items-end gap-1.5 h-48 mb-4">
              {CHART_DATA.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxVal) * 100}%` }}
                  transition={{ delay: i * 0.02, duration: 0.5 }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-600/20 via-violet-500/40 to-violet-400/60 hover:to-violet-400 transition-all cursor-pointer relative group"
                >
                   {/* Tooltip placeholder */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {v} orders
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={`flex justify-between text-[10px] font-bold uppercase tracking-wider ${theme.text}`}>
              <span>Mar 18, 2026</span>
              <span>Today</span>
            </div>
          </motion.div>

          {/* Call Performance Radar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden group">
              <ArrowUpRight className="absolute top-4 right-4 text-white/50 group-hover:text-white transition-colors cursor-pointer" />
              <p className={`text-white/70 text-xs font-bold uppercase tracking-widest mb-1 ${!isDark && 'text-slate-700'}`}>Call Center Efficiency</p>
              <h3 className={`text-4xl font-black mb-4 ${!isDark && 'text-slate-900'}`}>78.4%</h3>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '78.4%' }}
                  className="bg-white h-full"
                />
              </div>
              <p className={`mt-4 text-xs text-white/60 font-medium ${!isDark && 'text-slate-600'}`}>+2.1% improvement from last month</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
               <h3 className={`text-white font-bold text-sm mb-4 ${!isDark && 'text-slate-900'}`}>Live System Health</h3>
               <div className="space-y-4">
                  <HealthItem label="AI Voice Node (Mumbai)" status="Optimal" theme={theme} />
                  <HealthItem label="WhatsApp Gateway" status="Congested" warning theme={theme} />
                  <HealthItem label="Shopify Webhooks" status="Optimal" theme={theme} />
               </div>
            </div>
          </div>
        </div>

        {/* Brand snapshot */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Brand Performance Snapshot</h2>
            <button className="text-xs text-slate-500 hover:text-white transition-colors">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-left text-[10px] uppercase tracking-widest ${theme.text} border-b border-white/5`}>
                  <th className="px-6 py-4 font-bold">Brand Entity</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Health</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Volume</th>
                  <th className="px-6 py-4 font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {BRANDS_SUMMARY.map((b) => (
                  <tr key={b.name} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{b.name}</div>
                    </td>
                    <td className={`px-6 py-4 ${theme.text}`}>{b.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/5 h-1 rounded-full overflow-hidden">
                           <div className="bg-violet-500 h-full" style={{ width: `${b.health}%` }} />
                        </div>
                        <span className="text-[10px] font-mono">{b.health}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={b.status} isDark={isDark} />
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-white">
                      {b.orders.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 text-right ${theme.text} group-hover:${theme.heading}`}>
                       <MoreHorizontal className="w-4 h-4 cursor-pointer ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ label, value, delta, icon: Icon, color, index, theme, isDark }) {
  const colorMap = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
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
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg bg-white/5 uppercase tracking-tighter ${theme.text}`}>
          {delta}
        </span>
      </div>
      <p className={`text-xs ${theme.text} font-bold uppercase tracking-widest mb-1`}>{label}</p>
      <p className={`text-3xl font-black ${theme.heading} tracking-tighter`}>{value}</p>
    </motion.div>
  );
}

function HealthItem({ label, status, warning, theme }) {
  return (
    <div className={`flex items-center justify-between text-xs ${theme.text}`}>
      <span className={theme.text}>{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${warning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
        <span className={warning ? 'text-amber-500' : 'text-emerald-500'}>{status}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status, isDark }) {
  const isActive = status === 'Active';
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${isActive ? (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600') : (isDark ? 'bg-slate-500/10 text-slate-400' : 'bg-slate-500/10 text-slate-600')}`}>
      <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-slate-400'} ${isActive && 'animate-pulse'}`} />
      {status}
    </span>
  );
}