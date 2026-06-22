'use client';

import Link from 'next/link';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/admin/brands
const BRANDS = [
  { id: 'b1', name: 'FabIndia Direct', type: 'Direct', status: 'Active', orders: 3400, billing: 'Pro' },
  { id: 'b2', name: 'Pepperfry', type: 'Aggregator', status: 'Active', orders: 8200, billing: 'Enterprise' },
  { id: 'b3', name: 'HealthKart', type: 'Direct', status: 'Paused', orders: 1200, billing: 'Starter' },
  { id: 'b4', name: 'Bewakoof', type: 'Direct', status: 'Active', orders: 5100, billing: 'Pro' },
  { id: 'b5', name: 'Nykaa Fashion', type: 'Aggregator', status: 'Active', orders: 12000, billing: 'Enterprise' },
  { id: 'b6', name: 'Boat Lifestyle', type: 'Direct', status: 'Active', orders: 7600, billing: 'Pro' },
];

export default function AdminBrandsPage() {
  return (
    <>
      <DashboardHeader title="Brand Registry" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-400">{BRANDS.length} brands registered</p>
          <Link
            href="/admin/brands/new"
            className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors"
          >
            + Onboard brand
          </Link>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/10 bg-white/[0.02]">
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Integration</th>
                <th className="px-5 py-3 font-medium">Billing</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Orders</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BRANDS.map((b) => (
                <tr key={b.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-white">{b.name}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full
                      ${b.type === 'Direct' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {b.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{b.billing}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full
                      ${b.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                      <span className={`w-1 h-1 rounded-full ${b.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono">{b.orders.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right">
                    <Link href={`/admin/brands/${b.id}`}
                      className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                      Configure →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
