'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Banknote, 
  RotateCcw, 
  PhoneForwarded, 
  TrendingDown, 
  Sparkles,
  ArrowDownRight
} from 'lucide-react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

const BIG_NUMBERS = [
  { label: 'RTOs Prevented', value: '284', sub: 'vs 412 last month', icon: ShieldCheck, color: 'emerald', trend: '-31%' },
  { label: 'Revenue Saved', value: '₹1.42L', sub: 'Calculated ROI', icon: Banknote, color: 'violet', trend: '+12%' },
  { label: 'Prepaid Upsells', value: '63', sub: 'COD to Prepaid', icon: RotateCcw, color: 'blue', trend: '+8%' },
  { label: 'Verification Rate', value: '81%', sub: 'Avg answer time: 14s', icon: PhoneForwarded, color: 'amber', trend: '+2%' },
];

const FUNNEL = [
  { label: 'Total Orders', value: 1400, pct: 100, color: 'bg-violet-500' },
  { label: 'Verification Attempted', value: 1120, pct: 80, color: 'bg-violet-400' },
  { label: 'Customer Confirmed', value: 897, pct: 64, color: 'bg-violet-300' },
  { label: 'Order Dispatched', value: 880, pct: 63, color: 'bg-indigo-400' },
  { label: 'Final Delivery', value: 820, pct: 59, color: 'bg-emerald-400' },
];

export default function BrandDashboard() {
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
  return (
    <div className="min-h-screen  text-slate-300">
      <DashboardHeader title="Performance Intelligence" />
      
      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {BIG_NUMBERS.map((n, i) => (
            <BigNumberCard key={n.label} {...n} index={i} theme={theme} isDark={isDark} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Order Funnel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Post-Purchase Funnel</h2>
                <p className="text-xs text-slate-500">Tracking every step from Shopify sync to successful delivery.</p>
              </div>
              <TrendingDown className="text-emerald-400 w-5 h-5" />
            </div>

            <div className="space-y-4">
              {FUNNEL.map((step, i) => (
                <div key={step.label} className="group">
                  <div className="flex justify-between items-end mb-1 px-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
                      {step.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {step.value.toLocaleString()} <span className="text-slate-600 ml-1">({step.pct}%)</span>
                    </span>
                  </div>
                  <div className="relative h-8 bg-white/5 rounded-xl overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.pct}%` }}
                      transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                      className={`h-full opacity-80 group-hover:opacity-100 transition-opacity ${step.color} shadow-[0_0_20px_rgba(139,92,246,0.1)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insight Card */}
          <div className="space-y-6">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-gradient-to-br from-emerald-600/20 to-teal-600/5 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-[-10%] right-[-10%] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles size={120} />
              </div>
              
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <Sparkles size={18} />
                <span className="text-xs font-black uppercase tracking-widest">AI Logistics Insight</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">RTO Efficiency Peak</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your RTO rate dropped from <strong className="text-emerald-300">29.4%</strong> to <strong className="text-emerald-300">20.3%</strong>. 
                Automation successfully filtered <strong className="text-white">128 fake orders</strong> this month that would have otherwise cost ₹64,000 in logistics.
              </p>
              
              <button className="mt-6 w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold transition-all">
                Download Savings Report
              </button>
            </motion.div>

            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-bold text-sm mb-4">Verification Health</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">Answer Rate</span>
                <span className="text-xs font-bold text-white">84%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 w-[84%]" />
              </div>
              <p className="text-[10px] text-slate-500 mt-3 italic">"Customers are most responsive between 11 AM - 1 PM."</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BigNumberCard({ label, value, sub, icon: Icon, color, trend, index, theme, isDark }) {
  const colorMap = {
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    violet: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-3xl border backdrop-blur-sm group hover:scale-[1.02] transition-all cursor-default ${colorMap[color]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-2xl bg-white/5">
          <Icon size={20} />
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-black flex items-center gap-1 ${trend.includes('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
            {trend} {trend.includes('+') && <ArrowDownRight className="w-3 h-3 rotate-[270deg]" />}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
      <p className="text-[10px] text-slate-500/80 mt-1 font-medium">{sub}</p>
    </motion.div>
  );
}