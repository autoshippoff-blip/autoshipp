"use client";

import { DashboardProvider } from "@/contexts/DashboardContext";
import AuthGuard from "@/components/dashboard/AuthGuard";
import { AppShell } from "@/components/AppShell";
import { buildNavigationMenu } from "@/lib/navigationRegistry";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({ role, children }) {
  const { user } = useAuth();

  // Retrieve dynamic navigation config based on role and account context
  const accountContext = {
    products: user?.products || [],
    permissions: user?.permissions || [],
  };

  const organizationContext = {
    featureFlags: user?.organization?.featureFlags || [],
  };

  const compiledNav = buildNavigationMenu({
    role,
    accountContext,
    organizationContext,
  });

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
