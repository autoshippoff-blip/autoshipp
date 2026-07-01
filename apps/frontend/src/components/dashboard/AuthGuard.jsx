'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';

export default function AuthGuard({ allowedRole, children }) {
  const { user, role, loading } = useAuth();
  const { isDark } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (role && role !== allowedRole) {
      const destinations = {
        admin: '/admin/dashboard',
        super_admin: '/admin/dashboard',
        brand: '/brand/dashboard',
        aggregator: '/aggregator/dashboard',
      };
      router.replace(destinations[role] ?? '/login');
    }
  }, [user, role, loading, allowedRole, router]);

  if (loading || !user || (role && role !== allowedRole)) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-6 transition-colors ${
        isDark ? 'bg-[#030014]' : 'bg-slate-50'
      }`}>
        {/* Ambient glow */}
        {isDark && (
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full" />
          </div>
        )}

        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-2xl">
            <Zap size={28} fill="currentColor" />
          </div>
          <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-ping opacity-20" />
        </div>

        <div className="flex items-center gap-3">
          <span className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Loading…
          </span>
        </div>
      </div>
    );
  }

  return children;
}
