/**
 * Lightweight premium UI primitives shared by all dashboard pages.
 * Import individually — e.g. import { Card, StatCard, PageShell } from '@/components/dashboard/ui'
 */
'use client';

import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/DashboardContext';

/* ── PageShell ── wraps main content with correct padding + scroll */
export function PageShell({ children, className }) {
  return (
    <main className={cn('flex-1 overflow-auto p-4 md:p-6 space-y-5', className)}>
      {children}
    </main>
  );
}

/* ── Card ── glass card with optional gradient top line */
export function Card({ children, className, glow = false }) {
  const { isDark } = useDashboard();
  return (
    <div className={cn(
      'relative rounded-2xl border overflow-hidden transition-all duration-300',
      isDark
        ? 'bg-white/[0.03] border-white/[0.08] backdrop-blur-md hover:border-white/[0.14]'
        : 'bg-white border-slate-200 shadow-sm hover:shadow-md',
      glow && isDark && 'hover:border-violet-500/30',
      className
    )}>
      {/* Top gradient accent line */}
      <div className={cn(
        'absolute top-0 inset-x-0 h-px',
        isDark
          ? 'bg-gradient-to-r from-transparent via-violet-500/30 to-transparent'
          : 'bg-gradient-to-r from-transparent via-blue-400/20 to-transparent'
      )} />
      {children}
    </div>
  );
}

/* ── StatCard ── KPI tile with gradient number */
export function StatCard({ label, value, sub, accent = 'violet' }) {
  const { isDark } = useDashboard();
  const gradients = {
    violet: 'from-violet-400 to-fuchsia-400',
    emerald: 'from-emerald-400 to-teal-400',
    blue: 'from-blue-400 to-indigo-400',
    amber: 'from-amber-400 to-orange-400',
    red: 'from-red-400 to-rose-400',
  };
  return (
    <Card glow>
      <div className="p-5">
        <p className={cn('text-[11px] font-black uppercase tracking-widest mb-3', isDark ? 'text-slate-500' : 'text-slate-400')}>
          {label}
        </p>
        <p className={cn('text-3xl font-black tracking-tighter', isDark
          ? `bg-gradient-to-r ${gradients[accent]} bg-clip-text text-transparent`
          : 'text-slate-900'
        )}>
          {value}
        </p>
        {sub && (
          <p className={cn('text-xs font-medium mt-2', isDark ? 'text-slate-500' : 'text-slate-400')}>
            {sub}
          </p>
        )}
      </div>
    </Card>
  );
}

/* ── SectionTitle ── bold section header */
export function SectionTitle({ children, action }) {
  const { isDark } = useDashboard();
  return (
    <div className="flex items-center justify-between">
      <h2 className={cn('text-base font-black tracking-tight', isDark ? 'text-white' : 'text-slate-900')}>
        {children}
      </h2>
      {action}
    </div>
  );
}

/* ── Badge ── status pill */
export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-slate-500/10 text-slate-400',
    success: 'bg-emerald-500/10 text-emerald-400',
    danger: 'bg-red-500/10 text-red-400',
    warning: 'bg-amber-500/10 text-amber-400',
    info: 'bg-blue-500/10 text-blue-400',
    violet: 'bg-violet-500/10 text-violet-400',
    purple: 'bg-purple-500/10 text-purple-400',
  };
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full',
      variants[variant]
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', {
        'bg-slate-400': variant === 'default',
        'bg-emerald-400': variant === 'success',
        'bg-red-400': variant === 'danger',
        'bg-amber-400': variant === 'warning',
        'bg-blue-400': variant === 'info',
        'bg-violet-400': variant === 'violet',
        'bg-purple-400': variant === 'purple',
      })} />
      {children}
    </span>
  );
}

/* ── Table wrapper ── horizontal scroll + styled thead */
export function Table({ head, children, empty }) {
  const { isDark } = useDashboard();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className={cn(
            'text-left text-[11px] font-black uppercase tracking-widest border-b',
            isDark ? 'text-slate-500 border-white/[0.06] bg-white/[0.02]' : 'text-slate-400 border-slate-100 bg-slate-50'
          )}>
            {head.map((h, i) => (
              <th key={i} className={cn('px-5 py-3.5 font-black', h.right && 'text-right')}>
                {h.label ?? h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn('divide-y', isDark ? 'divide-white/[0.04]' : 'divide-slate-100')}>
          {children}
        </tbody>
      </table>
      {empty && (
        <p className={cn('px-5 py-10 text-center text-sm font-medium', isDark ? 'text-slate-500' : 'text-slate-400')}>
          {empty}
        </p>
      )}
    </div>
  );
}

/* ── TR — themed table row ── */
export function TR({ children, className }) {
  const { isDark } = useDashboard();
  return (
    <tr className={cn(
      'transition-colors',
      isDark ? 'text-slate-300 hover:bg-white/[0.03]' : 'text-slate-700 hover:bg-slate-50',
      className
    )}>
      {children}
    </tr>
  );
}

/* ── Input ── themed form input */
export function Input({ label, className, ...props }) {
  const { isDark } = useDashboard();
  return (
    <div className={className}>
      {label && (
        <label className={cn('block text-[11px] font-black uppercase tracking-widest mb-2', isDark ? 'text-slate-400' : 'text-slate-500')}>
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-xl px-4 py-2.5 text-sm font-medium border focus:outline-none focus:ring-2 transition',
          isDark
            ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-violet-500/60 focus:ring-violet-500/20'
            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-500/20'
        )}
        {...props}
      />
    </div>
  );
}

/* ── Select ── themed select */
export function Select({ label, children, className, ...props }) {
  const { isDark } = useDashboard();
  return (
    <div className={className}>
      {label && (
        <label className={cn('block text-[11px] font-black uppercase tracking-widest mb-2', isDark ? 'text-slate-400' : 'text-slate-500')}>
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full rounded-xl px-4 py-2.5 text-sm font-medium border focus:outline-none focus:ring-2 transition',
          isDark
            ? 'bg-white/5 border-white/10 text-white focus:border-violet-500/60 focus:ring-violet-500/20'
            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-400 focus:ring-blue-500/20'
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

/* ── PrimaryBtn ── gradient CTA button */
export function PrimaryBtn({ children, className, ...props }) {
  const { isDark } = useDashboard();
  return (
    <button
      className={cn(
        'font-black px-5 py-2.5 rounded-xl text-sm text-white transition-all active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed',
        isDark
          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-violet-500/20'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── GhostBtn ── secondary outlined button */
export function GhostBtn({ children, className, ...props }) {
  const { isDark } = useDashboard();
  return (
    <button
      className={cn(
        'font-bold px-5 py-2.5 rounded-xl text-sm border transition-all',
        isDark
          ? 'border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5'
          : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── AlertBanner ── inline feedback banner */
export function AlertBanner({ children, variant = 'success' }) {
  const styles = {
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    warn: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    info: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  };
  return (
    <div className={cn('px-4 py-3 rounded-2xl border text-sm font-medium', styles[variant])}>
      {children}
    </div>
  );
}
