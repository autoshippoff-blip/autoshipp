import {
  LayoutDashboard,
  Users,
  Phone,
  CreditCard,
  Settings,
  Package,
  BarChart,
  Webhook,
} from "lucide-react";

export const NAVIGATION_REGISTRY = [
  // Admin Navigation
  {
    id: "admin-dashboard",
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "super_admin"],
    group: "Overview",
  },
  {
    id: "admin-brands",
    name: "Brands",
    href: "/admin/brands",
    icon: Users,
    roles: ["admin", "super_admin"],
    group: "Overview",
  },
  {
    id: "admin-call-logs",
    name: "Call Logs",
    href: "/admin/call-logs",
    icon: Phone,
    roles: ["admin", "super_admin"],
    group: "Overview",
  },
  {
    id: "admin-billing",
    name: "Billing",
    href: "/admin/billing",
    icon: CreditCard,
    roles: ["admin", "super_admin"],
    group: "Management",
  },
  {
    id: "admin-dev-logs",
    name: "Developer Logs",
    href: "#",
    icon: Settings,
    roles: ["admin", "super_admin"],
    group: "Management",
    state: "disabled",
  },

  // Brand Navigation
  {
    id: "brand-dashboard",
    name: "Dashboard",
    href: "/brand/dashboard",
    icon: LayoutDashboard,
    roles: ["brand"],
    group: "Overview",
  },
  {
    id: "brand-orders",
    name: "Orders",
    href: "/brand/orders",
    icon: Package,
    roles: ["brand"],
    group: "Logistics",
  },
  {
    id: "brand-analytics",
    name: "Analytics",
    href: "/brand/analytics",
    icon: BarChart,
    roles: ["brand"],
    group: "Overview",
  },
  {
    id: "brand-settings",
    name: "Settings",
    href: "/brand/settings",
    icon: Settings,
    roles: ["brand"],
    group: "Management",
  },
  {
    id: "brand-ai-returns",
    name: "AI Returns",
    href: "#",
    icon: Package,
    roles: ["brand"],
    group: "Logistics",
    requiredProduct: "returns",
    state: "locked",
  },

  // Aggregator Navigation
  {
    id: "aggregator-dashboard",
    name: "Dashboard",
    href: "/aggregator/dashboard",
    icon: LayoutDashboard,
    roles: ["aggregator"],
    group: "Overview",
  },
  {
    id: "aggregator-webhooks",
    name: "Webhooks",
    href: "/aggregator/webhooks",
    icon: Webhook,
    roles: ["aggregator"],
    group: "Management",
  },
];

/**
 * Builds the navigation menu list for a given context.
 * Consumes generic context inputs to filter permissions, feature flags, and product locks.
 *
 * @param {Object} params
 * @param {string} params.role - User role
 * @param {Object} [params.accountContext] - Dynamic account/user context (for products, roles, permissions)
 * @param {Object} [params.organizationContext] - Dynamic organization context (for tenant features/flags)
 * @returns {Array} List of processed navigation menu items
 */
export function buildNavigationMenu({
  role,
  accountContext = {},
  organizationContext = {},
}) {
  const activeProducts = accountContext?.products || [];
  const activeFlags = organizationContext?.featureFlags || [];
  const userPermissions = accountContext?.permissions || [];

  return (
    NAVIGATION_REGISTRY
      // 1. Filter by role
      .filter((item) => item.roles.includes(role))
      // 2. Evaluate dynamic product locks, flags, permissions
      .map((item) => {
        let state = item.state || "visible";

        if (
          item.requiredProduct &&
          !activeProducts.includes(item.requiredProduct)
        ) {
          state = "locked";
        }

        if (
          item.requiredFeatureFlag &&
          !activeFlags.includes(item.requiredFeatureFlag)
        ) {
          state = "hidden";
        }

        if (
          item.requiredPermission &&
          !userPermissions.includes(item.requiredPermission)
        ) {
          state = "hidden";
        }

        return {
          ...item,
          state,
        };
      })
      // 3. Exclude hidden items
      .filter((item) => item.state !== "hidden")
  );
}
