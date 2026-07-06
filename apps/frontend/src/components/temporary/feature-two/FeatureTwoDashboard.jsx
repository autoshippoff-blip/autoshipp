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
  { id: "inbox", label: "Inbox", icon: Inbox, component: InboxView },
];

export function FeatureTwoDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  const ActiveComponent =
    TABS.find((t) => t.id === activeTab)?.component || AnalyticsView;

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/10 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
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
