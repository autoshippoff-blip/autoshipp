'use client';

import { useState, Fragment } from 'react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/admin/call-logs
const CALL_LOGS = [
  { id: 'cl1', orderId: 'ORD-8821', brand: 'FabIndia', customer: '+91 98765 00001', status: 'Answered', duration: '1m 12s', attempts: 1, summary: 'Customer confirmed COD order. Delivery address verified.' },
  { id: 'cl2', orderId: 'ORD-8822', brand: 'Bewakoof', customer: '+91 98765 00002', status: 'Failed', duration: '—', attempts: 3, summary: 'No answer after 3 attempts. WhatsApp fallback triggered.' },
  { id: 'cl3', orderId: 'ORD-8823', brand: 'HealthKart', customer: '+91 98765 00003', status: 'Answered', duration: '0m 48s', attempts: 1, summary: 'Customer requested cancellation. Order flagged for review.' },
  { id: 'cl4', orderId: 'ORD-8824', brand: 'Nykaa Fashion', customer: '+91 98765 00004', status: 'Answered', duration: '1m 05s', attempts: 1, summary: 'Confirmed. Requested different delivery slot.' },
  { id: 'cl5', orderId: 'ORD-8825', brand: 'Pepperfry', customer: '+91 98765 00005', status: 'Failed', duration: '—', attempts: 3, summary: 'Number unreachable. WhatsApp message sent.' },
  { id: 'cl6', orderId: 'ORD-8826', brand: 'Boat Lifestyle', customer: '+91 98765 00006', status: 'Answered', duration: '0m 55s', attempts: 2, summary: 'Confirmed on second attempt. Slight address correction noted.' },
];

export default function CallLogsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = CALL_LOGS.filter((c) => {
    const matchStatus = filter === 'All' || c.status === filter;
    const matchSearch =
      !search ||
      c.orderId.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <>
      <DashboardHeader title="AI Call Logs" />
      <main className="flex-1 p-6 overflow-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search order or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
          />
          <div className="flex gap-2">
            {['All', 'Answered', 'Failed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  filter === f
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/10 bg-white/[0.02]">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Attempts</th>
                <th className="px-5 py-3 font-medium">Transcript</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c) => (
                <Fragment key={c.id}>
                  <tr className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-violet-300">{c.orderId}</td>
                    <td className="px-5 py-3">{c.brand}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full
                        ${c.status === 'Answered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{c.duration}</td>
                    <td className="px-5 py-3 text-slate-400">{c.attempts}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                        className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        {expanded === c.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expanded === c.id && (
                    <tr className="bg-violet-500/5">
                      <td colSpan={6} className="px-5 py-3 text-xs text-slate-400 italic">
                        AI Summary: &ldquo;{c.summary}&rdquo;
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No call logs match your filters.</p>
          )}
        </div>
      </main>
    </>
  );
}
