"use client";

import React from "react";
import { EmptyState } from "@/components/EmptyState";
import {
  AlertCircle,
  Box,
  RefreshCw,
  CheckCircle,
  Package,
} from "lucide-react";

export function ProductRecommendations({ report, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 mt-6 h-full flex flex-col">
        <div className="h-6 w-1/3 bg-slate-200 dark:bg-white/5 rounded-lg mb-6 animate-pulse"></div>
        <div className="space-y-4 flex-1">
          <div className="h-20 w-full bg-slate-200 dark:bg-white/5 rounded-xl animate-pulse"></div>
          <div className="h-20 w-full bg-slate-200 dark:bg-white/5 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 h-full flex items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Unable to load recommendations"
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
    !report.productRecommendations ||
    report.productRecommendations.length === 0
  ) {
    return (
      <div className="mt-6 bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 h-full flex items-center justify-center">
        <EmptyState
          icon={CheckCircle}
          title="All Optimal"
          description="You are currently utilizing all recommended AutoShipp products."
        />
      </div>
    );
  }

  const getConfidenceConfig = (confidence) => {
    switch (confidence?.toUpperCase()) {
      case "HIGH":
        return {
          color: "text-emerald-500",
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          border: "border-emerald-100 dark:border-emerald-500/20",
        };
      case "MEDIUM":
        return {
          color: "text-blue-500",
          bg: "bg-blue-50 dark:bg-blue-500/10",
          border: "border-blue-100 dark:border-blue-500/20",
        };
      default:
        return {
          color: "text-slate-500",
          bg: "bg-slate-50 dark:bg-white/5",
          border: "border-slate-100 dark:border-white/10",
        };
    }
  };

  return (
    <div className="bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 mt-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Box className="text-indigo-500" size={24} />
          Recommended Solutions
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-full">
          {report.productRecommendations.length} Products
        </span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {report.productRecommendations.map((product, idx) => {
          const config = getConfidenceConfig(product.confidence);

          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${config.border} bg-white dark:bg-[#030014] hover:shadow-md transition-shadow flex items-start gap-4`}
            >
              <div className={`p-3 rounded-xl ${config.bg} ${config.color}`}>
                <Package size={20} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {product.productName}
                  </h3>
                  <span
                    className={`text-xs font-bold ${config.color} uppercase tracking-wider`}
                  >
                    {product.confidence} Match
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {product.roiEstimate}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
