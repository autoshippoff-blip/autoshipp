'use client';

import { useState, Fragment } from 'react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/aggregator/webhooks
const WEBHOOK_LOGS = [
  {
    id: 'wh1', ts: '2026-04-16 14:32:01', method: 'POST', path: '/webhooks/orders',
    status: 200, brand: 'FabIndia', payload: '{"order_id":"ORD-8821","amount":1299,"phone":"+91987650001","type":"COD"}',
  },
  {
    id: 'wh2', ts: '2026-04-16 14:31:44', method: 'POST', path: '/webhooks/orders',
    status: 400, brand: 'Pepperfry', payload: '{"order_id":"ORD-8822"}', // missing required fields
  },
  {
    id: 'wh3', ts: '2026-04-16 14:30:12', method: 'POST', path: '/webhooks/updates',
    status: 200, brand: 'Bewakoof', payload: '{"order_id":"ORD-8800","status":"delivered"}',
  },
  {
    id: 'wh4', ts: '2026-04-16 14:28:55', method: 'POST', path: '/webhooks/orders',
    status: 200, brand: 'Nykaa Fashion', payload: '{"order_id":"ORD-8819","amount":3499,"phone":"+91987654321","type":"COD"}',
  },
  {
    id: 'wh5', ts: '2026-04-16 14:27:30', method: 'POST', path: '/webhooks/orders',
    status: 422, brand: 'HealthKart', payload: '{"order_id":"ORD-8818","amount":"invalid","phone":"+91987654300"}',
  },
  {
    id: 'wh6', ts: '2026-04-16 14:25:11', method: 'POST', path: '/webhooks/updates',
    status: 200, brand: 'Boat Lifestyle', payload: '{"order_id":"ORD-8817","status":"shipped","tracking":"DL1234567"}',
  },
];

export default function AggregatorWebhooksPage() {
  const [expanded, setExpanded] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = WEBHOOK_LOGS.filter((w) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === '2xx') return w.status >= 200 && w.status < 300;
    if (filterStatus === 'Errors') return w.status >= 400;
    return true;
  });

  return (
    <>
      <DashboardHeader title="Webhook Delivery Logs" />
      <main className="flex-1 p-6 overflow-auto">
        {/* Filters */}
        <div className="flex gap-2 mb-5">
          {['All', '2xx', 'Errors'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filterStatus === f
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/10 bg-white/[0.02]">
                <th className="px-5 py-3 font-medium">Timestamp</th>
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Endpoint</th>
                <th className="px-5 py-3 font-medium">HTTP Status</th>
                <th className="px-5 py-3 font-medium">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((w) => (
                <Fragment key={w.id}>
                  <tr className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{w.ts}</td>
                    <td className="px-5 py-3">{w.brand}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{w.path}</td>
                    <td className="px-5 py-3">
                      <StatusCode code={w.status} />
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => setExpanded(expanded === w.id ? null : w.id)}
                        className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        {expanded === w.id ? 'Collapse' : 'Preview'}
                      </button>
                    </td>
                  </tr>
                  {expanded === w.id && (
                    <tr className="bg-white/[0.015]">
                      <td colSpan={5} className="px-5 py-3">
                        <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap break-all bg-black/30 rounded-lg p-3">
                          {JSON.stringify(JSON.parse(w.payload), null, 2)}
                        </pre>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No webhooks match the filter.</p>
          )}
        </div>
      </main>
    </>
  );
}

function StatusCode({ code }) {
  const is2xx = code >= 200 && code < 300;
  const is4xx = code >= 400 && code < 500;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full
      ${is2xx ? 'bg-emerald-500/10 text-emerald-400' : is4xx ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
      {code}
    </span>
  );
}
