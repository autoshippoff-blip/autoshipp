"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Menu,
  X,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const BREADCRUMB_METADATA = {
  "/brand/dashboard": "Dashboard",
  "/brand/orders": "Orders",
  "/brand/analytics": "Analytics",
  "/brand/settings": "Settings",
  "/admin/dashboard": "Dashboard",
  "/admin/brands": "Brands",
  "/admin/brands/new": "New Brand",
  "/admin/call-logs": "Call Logs",
  "/admin/billing": "Billing",
  "/aggregator/dashboard": "Dashboard",
  "/aggregator/webhooks": "Webhooks",
};

const MOCK_ORGANIZATIONS = [
  {
    id: "org-root-111",
    name: "Autoshipp (Root)",
    slug: "autoshipp-root",
    type: "platform",
    status: "active",
  },
  {
    id: "org-momz-222",
    name: "Momzcradle (Brand)",
    slug: "momzcradle",
    type: "merchant",
    status: "active",
  },
  {
    id: "org-thot-333",
    name: "Thottil Maternity",
    slug: "thottil",
    type: "merchant",
    status: "active",
  },
];

export function AppShell({ navigation, children, userRole }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const {
    isDark,
    toggleTheme,
    sidebarOpen,
    setSidebarOpen,
    desktopSidebarCollapsed,
    setDesktopSidebarCollapsed,
  } = useDashboard();

  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const orgRef = useRef(null);
  const profileRef = useRef(null);

  // Set default active organization based on role
  const defaultOrg =
    userRole === "admin" || userRole === "super_admin"
      ? MOCK_ORGANIZATIONS[0]
      : MOCK_ORGANIZATIONS[1];
  const [activeOrg, setActiveOrg] = useState(defaultOrg);

  // Keyboard navigation & Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOrgDropdownOpen(false);
        setProfileDropdownOpen(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSidebarOpen]);

  // Click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (orgRef.current && !orgRef.current.contains(event.target)) {
        setOrgDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute initials for user avatar
  const getInitials = () => {
    if (!user) return "U";
    const first = user.firstName ? user.firstName[0] : "";
    const last = user.lastName ? user.lastName[0] : "";
    return (first + last).toUpperCase() || user.email[0].toUpperCase();
  };

  // Compute dynamic breadcrumbs
  const getBreadcrumbs = () => {
    if (!pathname) return [];
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];
    let currentPath = "";

    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label =
        BREADCRUMB_METADATA[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Group navigation items based on their meta group (e.g. Overview, Logistics)
  const groupedNav = navigation.reduce((acc, item) => {
    const groupName = item.group || "General";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card text-foreground sticky top-0 z-50 backdrop-blur-md bg-card/90">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Autoshipp Logo"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Autoshipp
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors focus:outline-none"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors focus:outline-none"
            aria-expanded={sidebarOpen}
            aria-label="Toggle mobile menu"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-over Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />

            {/* Mobile Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border flex flex-col md:hidden text-sidebar-foreground shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border bg-sidebar/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded overflow-hidden">
                    <Image
                      src="/images/logo.png"
                      alt="Autoshipp Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-semibold text-xl tracking-tight">
                    Autoshipp
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg border border-sidebar-border/50 hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                {Object.entries(groupedNav).map(([groupName, items]) => (
                  <div key={groupName} className="space-y-1 py-2">
                    <h4 className="px-6 text-[10px] font-black uppercase tracking-wider text-sidebar-foreground/40 mt-2 mb-1">
                      {groupName}
                    </h4>
                    <nav className="px-3 space-y-1">
                      {items.map((item) => {
                        const isActive =
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/");

                        const linkContent = (
                          <div className="flex items-center w-full">
                            <item.icon
                              className={cn(
                                "h-5 w-5 shrink-0 mr-3",
                                isActive
                                  ? "text-sidebar-accent-foreground"
                                  : "text-sidebar-foreground/50",
                              )}
                            />
                            <span>{item.name}</span>
                          </div>
                        );

                        if (item.state === "disabled") {
                          return (
                            <div
                              key={item.id}
                              className="flex items-center px-3 py-2 text-sm font-medium rounded-md opacity-40 cursor-not-allowed select-none text-sidebar-foreground/50"
                            >
                              {linkContent}
                            </div>
                          );
                        }

                        if (item.state === "locked") {
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setSidebarOpen(false);
                                alert(
                                  `The premium module "${item.name}" is currently locked. To enable this feature, please subscribe to it in the Marketplace.`,
                                );
                              }}
                              className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent/25 hover:text-sidebar-foreground transition-colors cursor-pointer text-left"
                            >
                              <div className="flex items-center">
                                <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-sidebar-foreground/45" />
                                <span>{item.name}</span>
                              </div>
                              <Lock className="h-4 w-4 text-sidebar-foreground/35 flex-shrink-0 ml-2" />
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={cn(
                              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                            )}
                          >
                            {linkContent}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
                <div className="flex items-center px-3 py-2 text-sm text-sidebar-foreground/70 mb-2 truncate font-medium">
                  {user?.email}
                </div>
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm font-semibold text-destructive rounded-lg hover:bg-destructive/5 transition-colors focus:outline-none"
                >
                  <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-destructive/80" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Collapsible) */}
      <motion.div
        animate={{ width: desktopSidebarCollapsed ? 80 : 256 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:flex md:flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground select-none shrink-0"
      >
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border text-sidebar-foreground justify-between bg-sidebar/30">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="Autoshipp Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            {!desktopSidebarCollapsed && (
              <span className="font-bold text-xl tracking-tight whitespace-nowrap animate-in fade-in duration-200">
                Autoshipp
              </span>
            )}
          </div>
          <button
            onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
            className="p-1.5 rounded-lg border border-sidebar-border/50 hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-all focus:outline-none"
            aria-label={
              desktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {desktopSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {Object.entries(groupedNav).map(([groupName, items]) => (
            <div key={groupName} className="space-y-1 py-1">
              {!desktopSidebarCollapsed ? (
                <h4 className="px-4 text-[10px] font-black uppercase tracking-wider text-sidebar-foreground/40 mt-3 mb-1 animate-in fade-in duration-200">
                  {groupName}
                </h4>
              ) : (
                <div className="border-t border-sidebar-border/30 my-2 mx-4" />
              )}
              <nav className="px-3 space-y-1">
                {items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  const linkContent = (
                    <div className="flex items-center w-full">
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform",
                          isActive
                            ? "text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground",
                          desktopSidebarCollapsed ? "mx-auto" : "mr-3",
                        )}
                      />
                      {!desktopSidebarCollapsed && (
                        <span className="animate-in fade-in duration-200">
                          {item.name}
                        </span>
                      )}
                    </div>
                  );

                  if (item.state === "disabled") {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center px-3 py-2 text-sm font-medium rounded-md opacity-40 cursor-not-allowed select-none text-sidebar-foreground/50"
                        title={
                          desktopSidebarCollapsed
                            ? `${item.name} (Disabled)`
                            : undefined
                        }
                      >
                        {linkContent}
                      </div>
                    );
                  }

                  if (item.state === "locked") {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          alert(
                            `The premium module "${item.name}" is currently locked. To enable this feature, please subscribe to it in the Marketplace.`,
                          )
                        }
                        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent/25 hover:text-sidebar-foreground transition-colors cursor-pointer text-left group"
                        title={
                          desktopSidebarCollapsed
                            ? `${item.name} (Locked)`
                            : undefined
                        }
                      >
                        <div className="flex items-center w-full">
                          <item.icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              desktopSidebarCollapsed ? "mx-auto" : "mr-3",
                              "text-sidebar-foreground/45",
                            )}
                          />
                          {!desktopSidebarCollapsed && <span>{item.name}</span>}
                        </div>
                        {!desktopSidebarCollapsed && (
                          <Lock className="h-4 w-4 text-sidebar-foreground/35 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      )}
                      title={desktopSidebarCollapsed ? item.name : undefined}
                    >
                      {linkContent}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-sidebar-border bg-sidebar/30">
          {!desktopSidebarCollapsed ? (
            <div className="px-3 py-2 text-xs text-sidebar-foreground/50 mb-2 truncate font-medium animate-in fade-in duration-200">
              {user?.email}
            </div>
          ) : null}
          <button
            onClick={() => logout()}
            className={cn(
              "flex w-full items-center px-3 py-2 text-sm font-semibold rounded-lg hover:bg-destructive/5 text-sidebar-foreground/65 hover:text-destructive transition-colors focus:outline-none",
              desktopSidebarCollapsed ? "justify-center" : "justify-start",
            )}
            title={desktopSidebarCollapsed ? "Sign out" : undefined}
          >
            <LogOut
              className={cn(
                "h-5 w-5 shrink-0",
                desktopSidebarCollapsed ? "" : "mr-3",
              )}
            />
            {!desktopSidebarCollapsed && (
              <span className="animate-in fade-in duration-200">Sign out</span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Sticky Desktop Top Navigation Bar */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/85 backdrop-blur-md px-6 shadow-xs select-none">
          {/* Left - Breadcrumbs */}
          <div className="flex items-center gap-3">
            <nav className="flex items-center space-x-1.5 text-sm font-medium text-muted-foreground">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.href}>
                    {idx > 0 && (
                      <span className="text-muted-foreground/30">/</span>
                    )}
                    {isLast ? (
                      <span className="text-foreground font-semibold">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Right - Controls, Switcher, Dropdowns */}
          <div className="flex items-center gap-4">
            {/* Organization Switcher */}
            <div className="relative" ref={orgRef}>
              <button
                onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 hover:bg-muted/70 border border-border rounded-lg text-xs font-semibold text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                aria-expanded={orgDropdownOpen}
                aria-haspopup="true"
                aria-label="Select organization"
              >
                <div className="w-2 h-2 rounded-full bg-success shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-[200px]">
                  {activeOrg.name}
                </span>
                <svg
                  className="w-4 h-4 opacity-50 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {orgDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[9px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 mb-1.5">
                    Switch Organization
                  </div>
                  {MOCK_ORGANIZATIONS.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setActiveOrg(org);
                        setOrgDropdownOpen(false);
                        console.log(
                          `[Switch Org] Switched to organization: ${org.name} (${org.slug})`,
                        );
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between hover:bg-muted focus:outline-none cursor-pointer",
                        activeOrg.id === org.id
                          ? "bg-muted/50 font-semibold text-primary"
                          : "text-foreground/80",
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs">
                          {org.name}
                        </span>
                        <span className="text-[9px] text-muted-foreground capitalize mt-0.5">
                          {org.type} • {org.status}
                        </span>
                      </div>
                      {activeOrg.id === org.id && (
                        <svg
                          className="w-4 h-4 text-primary shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-foreground/70" />
              )}
            </button>

            {/* User Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full cursor-pointer"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs hover:opacity-90 transition-opacity">
                  {getInitials()}
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-border/50">
                    <p className="text-sm font-bold text-foreground truncate">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : "User Profile"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href={userRole === "brand" ? "/brand/settings" : "#"}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex w-full items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted transition-colors"
                    >
                      Account Settings
                    </Link>
                  </div>
                  <div className="border-t border-border/50 my-1" />
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors font-semibold text-left focus:outline-none cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area with Dynamic Padding */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full h-full animate-in fade-in duration-300">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
