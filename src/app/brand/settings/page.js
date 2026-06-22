'use client';

import { useState } from 'react';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

// TODO: Replace with GET /api/v1/brand/settings
const MOCK_SETTINGS = {
  companyName: 'FabIndia Direct',
  contactEmail: 'ops@fabindia.com',
  warehouseWhatsApp: '+91 98765 43210',
  apiKey: 'api_live_demo_key_placeholder_xxxxxxxxxx',
};

export default function BrandSettingsPage() {
  const [settings, setSettings] = useState(MOCK_SETTINGS);
  const [keyVisible, setKeyVisible] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setSettings((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    // TODO: POST /api/v1/brand/settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <>
      <DashboardHeader title="Brand Settings" />
      <main className="flex-1 p-6 overflow-auto max-w-2xl space-y-5">
        {saved && (
          <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            Settings saved!
          </div>
        )}

        {/* API Key */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">API Credentials</h2>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">API Key</label>
            <div className="flex gap-2">
              <input
                readOnly
                type={keyVisible ? 'text' : 'password'}
                value={settings.apiKey}
                className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-slate-300"
              />
              <button
                onClick={() => setKeyVisible(!keyVisible)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-sm transition-colors"
              >
                {keyVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Keep this key secure and never share it publicly.</p>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Company Name</label>
              <input
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Contact Email</label>
              <input
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">WhatsApp Number</label>
              <input
                name="warehouseWhatsApp"
                value={settings.warehouseWhatsApp}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Save Settings
        </button>
      </main>
    </>
  );
}
