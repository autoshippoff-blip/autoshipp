"use client";

import { DashboardProvider } from "@/contexts/DashboardContext";
import AuthGuard from "@/components/dashboard/AuthGuard";
import { AppShell } from "@/components/AppShell";
import {
  LayoutDashboard,
  Users,
  Phone,
  CreditCard,
  Package,
  BarChart,
  Settings,
  Webhook,
} from "lucide-react";

const NAV = {
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Brands", href: "/admin/brands", icon: Users },
    { name: "Call Logs", href: "/admin/call-logs", icon: Phone },
    { name: "Billing", href: "/admin/billing", icon: CreditCard },
    { name: "Developer Logs", href: "#", icon: Settings, state: "disabled" },
  ],
  brand: [
    { name: "Dashboard", href: "/brand/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/brand/orders", icon: Package },
    { name: "Analytics", href: "/brand/analytics", icon: BarChart },
    { name: "Settings", href: "/brand/settings", icon: Settings },
    { name: "AI Returns", href: "#", icon: Package, state: "locked" },
  ],
  aggregator: [
    { name: "Dashboard", href: "/aggregator/dashboard", icon: LayoutDashboard },
    { name: "Webhooks", href: "/aggregator/webhooks", icon: Webhook },
  ],
};

export default function DashboardLayout({ role, children }) {
  const rawNav = NAV[role] || [];
  const compiledNav = rawNav
    .map((item) => ({
      ...item,
      state: item.state || "visible", // Default state is visible if not specified
    }))
    .filter((item) => item.state !== "hidden"); // Exclude hidden items from rendering

  return (
    <DashboardProvider>
      <AuthGuard allowedRole={role}>
        <AppShell navigation={compiledNav} userRole={role}>
          {children}
        </AppShell>
      </AuthGuard>
    </DashboardProvider>
  );
}
