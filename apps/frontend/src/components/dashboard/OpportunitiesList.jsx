"use client";

import React from "react";
import { EmptyState } from "@/components/EmptyState";
import {
  AlertCircle,
  Target,
  RefreshCw,
  AlertTriangle,
  Info,
} from "lucide-react";

export function OpportunitiesList({ report, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 mt-6">
        <div className="h-6 w-1/4 bg-slate-200 dark:bg-white/5 rounded-lg mb-6 animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-24 w-full bg-slate-200 dark:bg-white/5 rounded-xl animate-pulse"></div>
          <div className="h-24 w-full bg-slate-200 dark:bg-white/5 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10">
        <EmptyState
          icon={AlertCircle}
          title="Unable to load opportunities"
          description={error}
          action={
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          }
        />
      </div>
    );
  }

  if (
    !report ||
    !report.opportunitiesJson ||
    report.opportunitiesJson.length === 0
  ) {
    return (
      <div className="mt-6 bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10">
        <EmptyState
          icon={Target}
          title="No Opportunities Found"
          description="Your intelligence report did not identify any immediate optimization opportunities."
        />
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getSeverityConfig = (severity) => {
    switch (severity?.toUpperCase()) {
      case "HIGH":
        return {
          icon: AlertCircle,
          color: "text-rose-500",
          bg: "bg-rose-50 dark:bg-rose-500/10",
          border: "border-rose-100 dark:border-rose-500/20",
        };
      case "MEDIUM":
        return {
          icon: AlertTriangle,
          color: "text-amber-500",
          bg: "bg-amber-50 dark:bg-amber-500/10",
          border: "border-amber-100 dark:border-amber-500/20",
        };
      default:
        return {
          icon: Info,
          color: "text-blue-500",
          bg: "bg-blue-50 dark:bg-blue-500/10",
          border: "border-blue-100 dark:border-blue-500/20",
        };
    }
  };

  return (
    <div className="bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 mt-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="text-emerald-500" size={24} />
          Optimization Opportunities
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-full">
          {report.opportunitiesJson.length} Identified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {report.opportunitiesJson.map((opp, idx) => {
          const config = getSeverityConfig(opp.severity);
          const Icon = config.icon;

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${config.border} bg-white dark:bg-[#030014] hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${config.bg} rounded-bl-full -z-10 opacity-50`}
              ></div>

              <div className="flex justify-between items-start mb-4">
                <div
                  className={`flex items-center gap-2 ${config.color} font-semibold text-sm`}
                >
                  <Icon size={16} />
                  {opp.severity} PRIORITY
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(opp.estimatedMonthlyLoss)}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Estimated Monthly Loss
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {opp.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {opp.impactDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
