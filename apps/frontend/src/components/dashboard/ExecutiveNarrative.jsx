"use client";

import React from "react";
import { EmptyState } from "@/components/EmptyState";
import { AlertCircle, FileText, RefreshCw } from "lucide-react";

export function ExecutiveNarrative({ report, isLoading, error, onRetry }) {
  // Handle strict react-hooks/set-state-in-effect lint rule for EmptyState action rendering
  // Rather than passing an object to action, we pass a valid React Node.

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex flex-col h-full min-h-[400px] animate-pulse">
        <div className="h-6 w-1/3 bg-slate-200 dark:bg-white/5 rounded-lg mb-6"></div>
        <div className="space-y-3 flex-1">
          <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded"></div>
          <div className="h-4 w-11/12 bg-slate-200 dark:bg-white/5 rounded"></div>
          <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded"></div>
          <div className="h-4 w-10/12 bg-slate-200 dark:bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Unable to load narrative"
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

  if (!report) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center">
        <EmptyState
          icon={FileText}
          title="No Narrative Available"
          description="Your intelligence report has not been generated yet."
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#030014] rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="text-blue-500" size={24} />
          Executive Summary
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-full">
          AI Generated
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {report.executiveSummary.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex justify-between items-center text-xs text-slate-400">
        <span>Report ID: {report.id}</span>
        <span>
          Generated: {new Date(report.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
