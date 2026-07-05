"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Package,
  Users,
  FileText,
  Phone,
  Webhook,
  CreditCard,
  LogOut,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "./StatCard";

// This is a generic AppShell that takes navigation items
export function AppShell({ navigation, children, userRole }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card text-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded overflow-hidden">
            <img
              src="/images/logo.png"
              alt="Autoshipp Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Autoshipp
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 text-muted-foreground"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border text-sidebar-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded overflow-hidden">
              <img
                src="/images/logo.png"
                alt="Autoshipp Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold text-xl tracking-tight">
              Autoshipp
            </span>
          </div>
          {userRole && (
            <span className="ml-3 px-2 py-0.5 text-xs font-medium bg-sidebar-accent text-sidebar-accent-foreground rounded-full uppercase tracking-wider">
              {userRole}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              if (item.state === "disabled") {
                return (
                  <div
                    key={item.name}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md opacity-40 cursor-not-allowed select-none text-sidebar-foreground/50"
                  >
                    <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-sidebar-foreground/30" />
                    <span>{item.name}</span>
                  </div>
                );
              }

              if (item.state === "locked") {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      alert(
                        `The premium module "${item.name}" is currently locked. To enable this feature, please subscribe to it in the Marketplace.`,
                      )
                    }
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
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/50",
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center px-3 py-2 text-sm text-sidebar-foreground/70 mb-2 truncate">
            {user?.email}
          </div>
          <button
            onClick={() => logout()}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-sidebar-foreground/70 rounded-md hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-sidebar-foreground/50" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
