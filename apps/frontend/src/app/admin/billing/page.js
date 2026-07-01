'use client';

import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/admin/billing
const BILLING = [
  { brand: 'FabIndia Direct', calls: 1400, whatsapps: 300, callCost: 8400, waCost: 600 },
  { brand: 'Pepperfry', calls: 4200, whatsapps: 900, callCost: 25200, waCost: 1800 },
  { brand: 'HealthKart', calls: 520, whatsapps: 120, callCost: 3120, waCost: 240 },
  { brand: 'Bewakoof', calls: 2100, whatsapps: 450, callCost: 12600, waCost: 900 },
  { brand: 'Nykaa Fashion', calls: 5800, whatsapps: 1200, callCost: 34800, waCost: 2400 },
  { brand: 'Boat Lifestyle', calls: 3300, whatsapps: 700, callCost: 19800, waCost: 1400 },
];

function fmt(n) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function AdminBillingPage() {
  const totalCalls = BILLING.reduce((a, b) => a + b.callCost + b.waCost, 0);

  function exportCSV() {
    const rows = [
      ['Brand', 'Calls', 'Call Cost', 'WhatsApps', 'WA Cost', 'Total'],
      ...BILLING.map((b) => [
        b.brand, b.calls, b.callCost, b.whatsapps, b.waCost, b.callCost + b.waCost,
      ]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'autoshipp-billing.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <DashboardHeader title="Billing & Usage" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-slate-500">Month-to-date revenue</p>
            <p className="text-2xl font-bold text-white">{fmt(totalCalls)}</p>
          </div>
          <button
            onClick={exportCSV}
            className="text-sm bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-xl transition-colors"
          >
            Export CSV
          </button>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/10 bg-white/[0.02]">
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium text-right">Calls</th>
                <th className="px-5 py-3 font-medium text-right">Call Cost</th>
                <th className="px-5 py-3 font-medium text-right">WhatsApps</th>
                <th className="px-5 py-3 font-medium text-right">WA Cost</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BILLING.map((b) => (
                <tr key={b.brand} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-white">{b.brand}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-slate-400">{b.calls.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{fmt(b.callCost)}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-slate-400">{b.whatsapps.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{fmt(b.waCost)}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-violet-300">
                    {fmt(b.callCost + b.waCost)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-white/10">
              <tr className="text-slate-200 font-semibold">
                <td className="px-5 py-3" colSpan={5}>Total MTD</td>
                <td className="px-5 py-3 text-right font-mono text-violet-300">{fmt(totalCalls)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </>
  );
}
