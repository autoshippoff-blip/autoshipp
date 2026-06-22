'use client';

import { useState } from 'react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/brand/orders
const ORDERS = [
  { id: 'ORD-8821', customer: 'Rahul Sharma', amount: 1299, callStatus: 'Confirmed', shipStatus: 'Label Generated', transcript: 'Customer confirmed order. No issues raised.' },
  { id: 'ORD-8822', customer: 'Priya Patel', amount: 2499, callStatus: 'Failed', shipStatus: 'Pending', transcript: 'No answer after 3 attempts. WhatsApp fallback sent.' },
  { id: 'ORD-8823', customer: 'Arjun Mehta', amount: 999, callStatus: 'Rejected', shipStatus: 'Cancelled', transcript: 'Customer requested cancellation.' },
  { id: 'ORD-8824', customer: 'Sneha Gupta', amount: 3499, callStatus: 'Confirmed', shipStatus: 'Shipped', transcript: 'Confirmed. Address updated on request.' },
  { id: 'ORD-8825', customer: 'Vikram Nair', amount: 1799, callStatus: 'Confirmed', shipStatus: 'Delivered', transcript: 'Smooth confirmation. Delivery completed.' },
  { id: 'ORD-8826', customer: 'Aisha Khan', amount: 599, callStatus: 'Failed', shipStatus: 'Pending', transcript: 'Number not reachable. WhatsApp delivered.' },
];

const CALL_COLORS = {
  Confirmed: 'bg-emerald-500/10 text-emerald-400',
  Failed: 'bg-red-500/10 text-red-400',
  Rejected: 'bg-orange-500/10 text-orange-400',
};
const SHIP_COLORS = {
  'Label Generated': 'bg-blue-500/10 text-blue-400',
  Pending: 'bg-slate-500/10 text-slate-400',
  Cancelled: 'bg-red-500/10 text-red-400',
  Shipped: 'bg-violet-500/10 text-violet-400',
  Delivered: 'bg-emerald-500/10 text-emerald-400',
};

export default function BrandOrdersPage() {
  const [search, setSearch] = useState('');
  const [drawer, setDrawer] = useState(null);

  const filtered = ORDERS.filter(
    (o) =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <DashboardHeader title="Order Management" />
      <main className="flex-1 p-6 overflow-auto relative">
        <input
          type="text"
          placeholder="Search by order ID or customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm mb-5 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
        />

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/10 bg-white/[0.02]">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
                <th className="px-5 py-3 font-medium">Call Status</th>
                <th className="px-5 py-3 font-medium">Shipping</th>
                <th className="px-5 py-3 font-medium">Transcript</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((o) => (
                <tr key={o.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-violet-300">{o.id}</td>
                  <td className="px-5 py-3">{o.customer}</td>
                  <td className="px-5 py-3 text-right font-mono">₹{o.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${CALL_COLORS[o.callStatus]}`}>
                      {o.callStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${SHIP_COLORS[o.shipStatus]}`}>
                      {o.shipStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setDrawer(o)}
                      className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No orders found.</p>
          )}
        </div>

        {/* Side drawer */}
        {drawer && (
          <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setDrawer(null)} />
            <div className="w-full max-w-sm bg-[#0c0a1a] border-l border-white/10 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">AI Transcript</h3>
                <button onClick={() => setDrawer(null)} className="text-slate-400 hover:text-white text-lg leading-none">×</button>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Order</p>
                <p className="text-sm text-violet-300 font-mono">{drawer.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Customer</p>
                <p className="text-sm text-white">{drawer.customer}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Call Status</p>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${CALL_COLORS[drawer.callStatus]}`}>
                  {drawer.callStatus}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-2">AI Summary</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{drawer.transcript}&rdquo;
                </div>
              </div>
              <p className="text-[10px] text-slate-600">Full transcripts available once API is connected.</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
