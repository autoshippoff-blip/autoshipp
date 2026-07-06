"use client";

import React, { useEffect, useState } from "react";
import {
  getWhatsAppAnalytics,
  getCallAnalytics,
  getRecentActivity,
} from "../../../app/(temporary)/lib/api";
import { StatCard } from "../../StatCard";
import { LoadingState, ErrorState } from "./StateWrappers";
import { EmptyState } from "../../EmptyState";
import { Activity } from "lucide-react";

export function AnalyticsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [wa, calls, activity] = await Promise.all([
        getWhatsAppAnalytics(),
        getCallAnalytics(),
        getRecentActivity(),
      ]);
      setData({ wa, calls, activity });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  if (loading) return <LoadingState message="Loading analytics..." />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;
  if (!data) return <EmptyState icon={Activity} title="No analytics found" />;

  const { wa, calls, activity } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          WhatsApp Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Sent" value={wa?.SENT || 0} />
          <StatCard
            title="Delivered"
            value={wa?.DELIVERED || 0}
            trend="up"
            change="+12%"
          />
          <StatCard
            title="Read"
            value={wa?.READ || 0}
            trend="up"
            change="+5%"
          />
          <StatCard
            title="Failed"
            value={wa?.FAILED || 0}
            trend="down"
            change="-2%"
            className="border-destructive/20"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          AI Call Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Initiated" value={calls?.INITIATED || 0} />
          <StatCard
            title="Answered"
            value={calls?.ANSWERED || 0}
            trend="up"
            change="+8%"
          />
          <StatCard
            title="Completed"
            value={calls?.COMPLETED || 0}
            trend="up"
            change="+4%"
          />
          <StatCard
            title="No Answer"
            value={calls?.NO_ANSWER || 0}
            trend="down"
            change="-1%"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          Recent Activity
        </h3>
        {activity && activity.length > 0 ? (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-border">
              {activity.map((item, i) => (
                <li
                  key={item.id || i}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs font-medium uppercase">
                      {item.type.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.type === "whatsapp"
                          ? "WhatsApp Message"
                          : "Voice Call"}{" "}
                        to {item.recipient}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full uppercase tracking-wider font-medium">
                      {item.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState
            icon={Activity}
            title="No recent activity"
            description="Activity will appear here once campaigns are sent."
          />
        )}
      </div>
    </div>
  );
}
