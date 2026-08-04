"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { ShieldAlert, Activity } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { useIntelligenceScorecard } from "@/hooks/useIntelligence";

// Assuming some basic Card components exist in UI (based on standard shadcn)
// If not fully implemented, falling back to standard div structures
const Card = ({ children, className }) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground shadow ${className || ""}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">{children}</div>
);
const CardTitle = ({ children }) => (
  <h3 className="font-semibold leading-none tracking-tight">{children}</h3>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className || ""}`}>{children}</div>
);

export function IntelligenceScorecard() {
  const { data, isLoading, error } = useIntelligenceScorecard();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intelligence Scorecard</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intelligence Scorecard</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={error ? ShieldAlert : Activity}
            title={
              error ? "Failed to load scorecard" : "No Scorecard Available"
            }
            description={
              error ||
              "We haven't generated an intelligence scorecard for your store yet."
            }
          />
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { subject: "Business", A: data.businessScore, fullMark: 100 },
    { subject: "Technical", A: data.technicalScore, fullMark: 100 },
    { subject: "Marketing", A: data.marketingScore, fullMark: 100 },
    { subject: "Security", A: data.securityScore, fullMark: 100 },
    { subject: "Operations", A: data.operationsScore, fullMark: 100 },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Intelligence Scorecard</CardTitle>
        <div className="text-sm text-muted-foreground">
          Overall Health Score
        </div>
        <div className="text-4xl font-bold tracking-tight text-primary mt-2">
          {data.overallScore}
          <span className="text-xl text-muted-foreground font-normal">
            /100
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto w-full max-w-[350px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" className="text-xs" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="A"
                stroke="var(--color-primary, #3b82f6)"
                fill="var(--color-primary, #3b82f6)"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
