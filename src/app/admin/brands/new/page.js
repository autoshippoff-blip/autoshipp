'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader as DashboardHeader } from '@/components/PageHeader';

export default function NewBrandPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    brandName: '',
    integrationType: 'Direct',
    webhookSecret: '',
    adminEmail: '',
    adminPassword: '',
    billingPlan: 'Starter',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: POST /api/v1/admin/brands with form data
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => router.push('/admin/brands'), 1500);
  }

  return (
    <>
      <DashboardHeader title="Onboard New Brand" />
      <main className="flex-1 p-6 overflow-auto max-w-2xl">
        {success && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            Brand created! Redirecting…
          </div>
        )}

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Brand Name" name="brandName" value={form.brandName} onChange={handleChange} required placeholder="e.g. FabIndia Direct" />

            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Integration Type</label>
              <select
                name="integrationType"
                value={form.integrationType}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
              >
                <option value="Direct">Direct</option>
                <option value="Aggregator">Aggregator</option>
              </select>
            </div>

            {form.integrationType === 'Direct' && (
              <Field label="Webhook Secret" name="webhookSecret" value={form.webhookSecret} onChange={handleChange} placeholder="Auto-generated if blank" />
            )}

            <hr className="border-white/10" />
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Initial Admin User</p>

            <Field label="Admin Email" name="adminEmail" type="email" value={form.adminEmail} onChange={handleChange} required placeholder="admin@brand.com" />
            <Field label="Temporary Password" name="adminPassword" type="password" value={form.adminPassword} onChange={handleChange} required placeholder="Min. 8 characters" />

            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Billing Plan</label>
              <select
                name="billingPlan"
                value={form.billingPlan}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
              >
                <option>Starter</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                {submitting ? 'Creating…' : 'Create Brand'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-slate-400 hover:text-white border border-white/10 px-5 py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1.5" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
      />
    </div>
  );
}
