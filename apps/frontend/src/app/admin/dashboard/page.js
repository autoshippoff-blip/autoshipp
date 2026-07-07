"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { Building2, Users, MoreHorizontal } from "lucide-react";
import { PageHeader as DashboardHeader } from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProfileWidget } from "@/components/dashboard/ProfileWidget";

export default function AdminDashboard() {
  const [isDark, setIsDark] = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Theme-specific color classes
  const theme = {
    dark: isDark,
    bg: isDark ? "bg-[#030014]" : "bg-slate-50",
    text: isDark ? "text-slate-300" : "text-slate-600",
    heading: isDark ? "text-white" : "text-slate-900",
    accent: isDark ? "text-violet-400" : "text-blue-600",
    primaryBtn: isDark
      ? "bg-violet-600 hover:bg-violet-500 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white",
    secondaryBtn: isDark
      ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
      : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm",
    card: isDark
      ? "bg-white/[0.03] border-white/10"
      : "bg-white border-slate-200 shadow-sm",
    glow: isDark ? "opacity-20" : "opacity-10",
    accentGradient: isDark
      ? "from-violet-500 to-fuchsia-500"
      : "from-blue-600 to-indigo-600",
  };

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/dashboard/platform/summary`,
          {
            credentials: "include",
          },
        );
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          console.error("Failed to fetch dashboard summary");
        }
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className={`min-h-screen ${theme.text}`}>
      <DashboardHeader title="System Intelligence" />

      <main className="p-6 space-y-8 max-w-[1600px] mx-auto">
        {/* Top Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-2xl font-bold ${theme.heading} tracking-tight`}
            >
              Executive Overview
            </h1>
            <p className={`text-slate-500 text-sm`}>
              Platform administration and entity monitoring.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Profile Context Widget */}
              <div className="xl:col-span-1">
                <ProfileWidget
                  user={user}
                  organization={{ name: "AutoShipp Platform" }}
                  theme={theme}
                />
              </div>

              {/* Dynamic Stat Grid */}
              <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <StatCard
                  label="Registered Organizations"
                  value={data?.kpis?.organizationCount || 0}
                  icon={Building2}
                  color="violet"
                  index={0}
                  theme={theme}
                  isDark={isDark}
                />
                <StatCard
                  label="Registered Users"
                  value={data?.kpis?.userCount || 0}
                  icon={Users}
                  color="emerald"
                  index={1}
                  theme={theme}
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Brand snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">
                  Recent Organizations
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className={`text-left text-[10px] uppercase tracking-widest ${theme.text} border-b border-white/5`}
                    >
                      <th className="px-6 py-4 font-bold">Organization</th>
                      <th className="px-6 py-4 font-bold">Type</th>
                      <th className="px-6 py-4 font-bold">Timezone</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Joined</th>
                      <th className="px-6 py-4 font-bold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data?.recentOrganizations?.map((b) => (
                      <tr
                        key={b.id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div
                            className={`font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}
                          >
                            {b.name}
                          </div>
                        </td>
                        <td className={`px-6 py-4 ${theme.text}`}>
                          {b.type?.code}
                        </td>
                        <td className="px-6 py-4">{b.timezone}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={b.status} isDark={isDark} />
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          className={`px-6 py-4 text-right ${theme.text} group-hover:${theme.heading}`}
                        >
                          <MoreHorizontal className="w-4 h-4 cursor-pointer ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
