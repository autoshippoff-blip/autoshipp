'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Terminal, 
  RefreshCw, 
  Server, 
  Activity, 
  Globe, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

const STATS = [
  { label: 'Total Orders Routed', value: '24,381', sub: 'Historical volume', icon: Zap, color: 'violet' },
  { label: 'Active Brand Connections', value: '12', sub: 'Direct API links', icon: Globe, color: 'blue' },
  { label: 'Orders Today', value: '842', sub: 'Synced: Just now', icon: Activity, color: 'emerald' },
  { label: 'Node Uptime', value: '99.97%', sub: 'Global average', icon: Server, color: 'amber' },
];

const LATENCY = [12, 14, 11, 13, 10, 15, 12, 9, 11, 13, 14, 12, 10, 11, 13, 15, 11, 10, 12, 14];

export default function AggregatorDashboard() {
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
  const maxL = Math.max(...LATENCY);

  return (
    <div className={`min-h-screen ${theme.text}`}>
      <DashboardHeader title="Aggregator Console" />
      
      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${theme.heading} tracking-tight`}>Partner Overview</h1>
            <p className={`${theme.text} text-sm`}>Managing data pipelines for aggregator connections.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Connection: Stable
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} theme={theme} isDark={isDark} />
          ))}
        </div>

        {/* Technical Overview Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Latency & Throughput */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Activity size={18} />
                </div>
                <div>
                  <h2 className={`text-sm font-bold ${theme.heading} uppercase tracking-wider`}>API Latency</h2>
                  <p className={`text-[10px] ${theme.text} font-medium`}>Global Edge Response Time (ms)</p>
                </div>
              </div>
              <span className={`text-xs font-mono font-bold ${theme.accent} bg-emerald-400/5 px-2 py-1 rounded`}>Avg: 11.8ms</span>
            </div>
            
            <div className="flex items-end gap-1.5 h-32 group">
              {LATENCY.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxL) * 100}%` }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/10 to-emerald-500/40 hover:to-emerald-400 transition-all relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {v}ms
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions / Webhook Settings */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Terminal size={16} className="text-violet-400" /> 
                Developer Shortcuts
              </h3>
              <div className="space-y-3">
                <ActionButton label="Rotate API Keys" icon={RefreshCw} theme={theme} />
                <ActionButton label="Webhook Simulator" icon={Terminal} theme={theme} />
                <ActionButton label="View Documentation" icon={ExternalLink} theme={theme} />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                <span>Webhook Failover</span>
                <span className="text-emerald-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Health & Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Endpoint Status */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Endpoint Health</h3>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="space-y-4">
              {[
                { ep: 'POST /webhooks/orders', status: 'Operational', time: '4ms' },
                { ep: 'POST /webhooks/updates', status: 'Operational', time: '7ms' },
                { ep: 'GET /v1/connection/health', status: 'Operational', time: '2ms' },
              ].map(({ ep, status, time }) => (
                <div key={ep} className="flex items-center justify-between group cursor-default">
                  <div className="flex flex-col">
                    <span className={`font-mono text-xs ${theme.text} group-hover:${theme.accent} transition-colors`}>{ep}</span>
                    <span className={`text-[10px] ${theme.text}`}>{time} latency</span>
                  </div>
                  <span className={`flex items-center gap-2 text-[10px] font-bold ${theme.accent} bg-emerald-400/5 px-2 py-1 rounded-lg`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Snapshot */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Traffic Analysis (MTD)</h3>
            <div className="space-y-4">
               <TrafficRow label="Total Webhooks" value="18,420" color={theme.heading} theme={theme} />
               <TrafficRow label="Success (200 OK)" value="18,204" color="text-emerald-400" theme={theme} />
               <TrafficRow label="Client Errors (4xx)" value="216" color="text-red-400" theme={theme} />
               <div className="pt-2">
                 <div className="flex justify-between text-[10px] font-bold mb-2">
                    <span className={`${theme.text} uppercase`}>System Error Rate</span>
                    <span className="text-amber-400">1.17%</span>
                 </div>
                 <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '1.17%' }}
                      className="bg-amber-500 h-full"
                    />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, color, index, theme, isDark }) {
  const colorMap = {
    violet: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 rounded-2xl border backdrop-blur-sm ${colorMap[color]} group hover:bg-white/[0.02] transition-all`}
    >
      <div className="flex justify-between items-start mb-3">
        <Icon size={18} className="opacity-70" />
        <span className="text-[10px] font-bold opacity-40 uppercase">Live</span>
      </div>
      <p className={`text-[10px] ${theme.text} font-bold uppercase tracking-widest mb-1`}>{label}</p>
      <p className={`text-2xl font-black ${theme.heading}`}>{value}</p>
      <p className={`text-[10px] ${theme.text} mt-1 font-medium`}>{sub}</p>
    </motion.div>
  );
}

function ActionButton({ label, icon: Icon, theme }) {
  return (
    <button className={`w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all text-xs font-bold ${theme.text}`}>
      <div className="flex items-center gap-3">
        <Icon size={14} className={theme.text} />
        {label}
      </div>
      <RefreshCw size={12} className="opacity-0 group-hover:opacity-100" />
    </button>
  );
}

function TrafficRow({ label, value, color, theme }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className={`${theme.text} font-medium`}>{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
}