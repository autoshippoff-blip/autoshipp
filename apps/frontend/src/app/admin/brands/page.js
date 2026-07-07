"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader as DashboardHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { Users } from "lucide-react";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/organizations`,
          {
            credentials: "include",
          },
        );
        if (res.ok) {
          const data = await res.json();
          setBrands(data);
        } else {
          console.error("Failed to fetch brands");
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  return (
    <>
      <DashboardHeader title="Brand Registry" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-400">
            {brands.length} brands registered
          </p>
          <Link
            href="/admin/brands/new"
            className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors"
          >
            + Onboard brand
          </Link>
        </div>

        {loading ? (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-12 bg-white/[0.02] border-b border-white/10" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-white/5 rounded w-1/3" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        ) : brands.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No brands found"
            description="Get started by onboarding your first brand."
            action={
              <Link
                href="/admin/brands/new"
                className="inline-flex items-center justify-center text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors"
              >
                + Onboard brand
              </Link>
            }
          />
        ) : (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-white/10 bg-white/[0.02]">
                  <th className="px-5 py-3 font-medium">Brand</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Timezone</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {brands.map((b) => (
                  <tr
                    key={b.id}
                    className="text-slate-300 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-white">
                      {b.name}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                        {b.type?.displayName || "Unknown"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">{b.timezone}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full
                        ${b.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${b.status === "ACTIVE" ? "bg-emerald-400" : "bg-slate-400"}`}
                        />
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/brands/${b.id}`}
                        className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Configure →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
