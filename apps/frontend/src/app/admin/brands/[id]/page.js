'use client';

import { useState } from 'react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/admin/brands/:id
const MOCK_BRAND = {
  name: 'FabIndia Direct',
  billingPlan: 'Pro',
  warehouseWhatsApp: '+91 98765 43210',
  customGreeting: 'Hi! This is an automated call from FabIndia regarding your order…',
  services: {
    codConfirmation: true,
    whatsappFallback: true,
    autoShipping: false,
    labelDispatch: true,
    whatsappCampaigns: false,
  },
};

export default function BrandConfigPage({ params }) {
  const [brand, setBrand] = useState(MOCK_BRAND);
  const [saved, setSaved] = useState(false);

  function toggleService(key) {
    setBrand((b) => ({ ...b, services: { ...b.services, [key]: !b.services[key] } }));
  }

  async function handleSave() {
    // TODO: PATCH /api/v1/admin/brands/:id with brand config
    await new Promise((r) => setTimeout(r, 400));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const services = [
    { key: 'codConfirmation', label: 'COD Confirmation', desc: 'AI voice calls to confirm cash-on-delivery orders' },
    { key: 'whatsappFallback', label: 'WhatsApp Fallback', desc: 'Send WhatsApp message if call fails' },
    { key: 'autoShipping', label: 'Auto-Shipping', desc: 'Automatically generate shipping labels post-confirmation' },
    { key: 'labelDispatch', label: 'Label Dispatch', desc: 'Send label to warehouse WhatsApp number' },
    { key: 'whatsappCampaigns', label: 'WhatsApp Campaigns', desc: 'Broadcast promotional messages' },
  ];

  return (
    <>
      <DashboardHeader title={`Configure — ${brand.name}`} />
      <main className="flex-1 p-6 overflow-auto max-w-2xl space-y-5">

        {saved && (
          <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            Configuration saved!
          </div>
        )}

        {/* Service Toggles */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">AI Service Toggles</h2>
          <div className="space-y-3">
            {services.map(({ key, label, desc }) => (
              <div key={key} className="flex items-start justify-between gap-4 py-2">
                <div>
                  <p className="text-sm text-slate-200 font-medium">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={brand.services[key]}
                  onClick={() => toggleService(key)}
                  className={`relative shrink-0 w-10 h-5.5 rounded-full transition-colors ${
                    brand.services[key] ? 'bg-violet-600' : 'bg-white/10'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${
                    brand.services[key] ? 'translate-x-4.5' : ''
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Inputs */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-1">Brand Settings</h2>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Warehouse WhatsApp Number</label>
            <input
              type="tel"
              value={brand.warehouseWhatsApp}
              onChange={(e) => setBrand((b) => ({ ...b, warehouseWhatsApp: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Custom Call Greeting</label>
            <textarea
              rows={3}
              value={brand.customGreeting}
              onChange={(e) => setBrand((b) => ({ ...b, customGreeting: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Billing Plan</label>
            <select
              value={brand.billingPlan}
              onChange={(e) => setBrand((b) => ({ ...b, billingPlan: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
            >
              <option>Starter</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          Save Configuration
        </button>
      </main>
    </>
  );
}
