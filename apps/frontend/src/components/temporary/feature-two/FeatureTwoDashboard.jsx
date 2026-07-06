"use client";

import React, { useState } from "react";
import { AnalyticsView } from "./AnalyticsView";
import { CampaignsView } from "./CampaignsView";
import { TemplatesView } from "./TemplatesView";
import { InboxView } from "./InboxView";
import { BarChart3, Megaphone, LayoutTemplate, Inbox } from "lucide-react";

const TABS = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    component: AnalyticsView,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
    component: CampaignsView,
  },
  {
    id: "templates",
    label: "Templates",
    icon: LayoutTemplate,
    component: TemplatesView,
  },
  { id: "inbox", label: "Inbox", icon: Inbox, component: InboxView },
];

export function FeatureTwoDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  const ActiveComponent =
    TABS.find((t) => t.id === activeTab)?.component || AnalyticsView;

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-border/40 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-blue" />
            Communication & Messaging
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your customer outreach and view communication analytics.
          </p>
        </div>

        {/* Mock Data Toggle Warning */}
        <div className="px-2 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
          Demo Mode (Mock API)
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/10 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? "border-brand-orange text-foreground bg-card"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 flex-1 bg-muted/5 min-h-[500px]">
        <ActiveComponent />
      </div>
    </div>
  );
}
