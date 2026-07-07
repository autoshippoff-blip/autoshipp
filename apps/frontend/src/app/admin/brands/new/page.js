"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader as DashboardHeader } from "@/components/PageHeader";

export default function NewBrandPage() {
  const router = useRouter();
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    displayName: "",
    typeId: "",
    timezone: "UTC",
    currencyCode: "USD",
    languageCode: "en-US",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/organizations/types`,
          {
            credentials: "include",
          },
        );
        if (res.ok) {
          const data = await res.json();
          setTypes(data);
          if (data.length > 0) {
            setForm((f) => ({ ...f, typeId: data[0].id }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch organization types", err);
      }
    }
    fetchTypes();
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/organizations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        },
      );

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/brands"), 1500);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to create organization");
        setSubmitting(false);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      setSubmitting(false);
    }
  }

  return (
    <>
      <DashboardHeader title="Onboard New Organization" />
      <main className="flex-1 p-6 overflow-auto max-w-2xl">
        {success && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            Organization created! Redirecting…
          </div>
        )}

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              label="Organization Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. FabIndia Direct"
            />
            <Field
              label="Display Name"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              required
              placeholder="e.g. FabIndia"
            />
            <Field
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="e.g. fabindia"
            />

            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Organization Type
              </label>
              <select
                name="typeId"
                value={form.typeId}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
              >
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Field
                label="Timezone"
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                required
              />
              <Field
                label="Currency Code"
                name="currencyCode"
                value={form.currencyCode}
                onChange={handleChange}
                required
              />
              <Field
                label="Language Code"
                name="languageCode"
                value={form.languageCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting || !form.typeId}
                className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors gap-2 min-w-[150px]"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating…</span>
                  </>
                ) : (
                  "Create Organization"
                )}
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

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1.5" htmlFor={name}>
        {label}
      </label>
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
