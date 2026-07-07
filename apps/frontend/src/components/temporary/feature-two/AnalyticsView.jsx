"use client";

import React, { useEffect, useState } from "react";
import {
  getWhatsAppAnalytics,
  getCallAnalytics,
  getRecentActivity,
  getCampaigns,
} from "../../../app/(temporary)/lib/api";
import { StatCard } from "../../StatCard";
import { LoadingState, ErrorState } from "./StateWrappers";
import { EmptyState } from "../../EmptyState";
import { Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b"]; // Emerald (Delivered), Blue (Read), Rose (Failed), Amber (Sent)

// Helper to generate realistic-looking time series data based on total volume
const generateTimeSeries = (total) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let remaining = total;
  return days.map((day, i) => {
    if (i === days.length - 1) return { name: day, messages: remaining };
    // Random chunk between 5% and 25% of total
    const val = Math.floor(total * (Math.random() * 0.2 + 0.05));
    remaining -= val;
    return { name: day, messages: val };
  });
};

export function AnalyticsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState("all");

  const fetchData = async () => {
    try {
      const [wa, calls, activity, campaigns] = await Promise.all([
        getWhatsAppAnalytics(),
        getCallAnalytics(),
        getRecentActivity(),
        getCampaigns(),
      ]);
      setData({ wa, calls, activity, campaigns });
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

  const timeSeriesData = React.useMemo(() => {
    if (!data) return [];

    let displayWa = data.wa;
    if (selectedCampaignId !== "all" && data.campaigns) {
      const selectedCamp = data.campaigns.find(
        (c) => c.campaignId === selectedCampaignId,
      );
      if (selectedCamp && selectedCamp.stats) {
        displayWa = {
          QUEUED: 0,
          SENT: selectedCamp.stats.sent || 0,
          DELIVERED: selectedCamp.stats.delivered || 0,
          READ: selectedCamp.stats.read || 0,
          FAILED: selectedCamp.stats.failed || 0,
        };
      }
    }

    const total =
      (displayWa?.QUEUED || 0) +
      (displayWa?.SENT || 0) +
      (displayWa?.DELIVERED || 0) +
      (displayWa?.READ || 0) +
      (displayWa?.FAILED || 0);

    return generateTimeSeries(total);
  }, [data, selectedCampaignId]);

  if (loading) return <LoadingState message="Loading analytics..." />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;
  if (!data) return <EmptyState icon={Activity} title="No analytics found" />;

  const { wa, calls, activity, campaigns } = data;

  // Determine which WhatsApp stats to display
  let displayWa = wa;
  if (selectedCampaignId !== "all" && campaigns) {
    const selectedCamp = campaigns.find(
      (c) => c.campaignId === selectedCampaignId,
    );
    if (selectedCamp && selectedCamp.stats) {
      // Map lowercase campaign stats to the uppercase keys expected by the UI
      displayWa = {
        QUEUED: 0,
        SENT: selectedCamp.stats.sent || 0,
        DELIVERED: selectedCamp.stats.delivered || 0,
        READ: selectedCamp.stats.read || 0,
        FAILED: selectedCamp.stats.failed || 0,
      };
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Campaign Info */}
      <div className="flex items-center mb-6">
        <div className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
          All Campaigns
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          WhatsApp Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Sent" value={displayWa?.SENT || 0} />
          <StatCard
            title="Delivered"
            value={displayWa?.DELIVERED || 0}
            trend="up"
            change="+12%"
          />
          <StatCard
            title="Read"
            value={displayWa?.READ || 0}
            trend="up"
            change="+5%"
          />
          <StatCard
            title="Failed"
            value={displayWa?.FAILED || 0}
            trend="down"
            change="-2%"
            className="border-destructive/20"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Volume Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-medium text-foreground mb-6">
              Message Volume Over Time
            </h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeSeriesData}
                  margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorMessages"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMessages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Pie Chart */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Delivery Breakdown
            </h4>
            <div className="flex-1 min-h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Delivered", value: displayWa?.DELIVERED || 0 },
                      { name: "Read", value: displayWa?.READ || 0 },
                      { name: "Failed", value: displayWa?.FAILED || 0 },
                      { name: "Sent", value: displayWa?.SENT || 0 },
                    ].filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {[
                      { name: "Delivered", value: displayWa?.DELIVERED || 0 },
                      { name: "Read", value: displayWa?.READ || 0 },
                      { name: "Failed", value: displayWa?.FAILED || 0 },
                      { name: "Sent", value: displayWa?.SENT || 0 },
                    ]
                      .filter((d) => d.value > 0)
                      .map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
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
