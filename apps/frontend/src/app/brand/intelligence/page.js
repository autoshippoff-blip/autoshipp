"use client";

import { IntelligenceScorecard } from "@/components/dashboard/IntelligenceScorecard";
import { PageHeader } from "@/components/PageHeader";

export default function IntelligencePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="AutoShipp Intelligence"
        description="Your store's dynamic health score and revenue insights."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntelligenceScorecard />

        {/* Placeholder for the Executive Narrative Report (Slice 2) */}
        <div className="rounded-xl border border-dashed bg-muted/10 flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">
            Executive Narrative Report (Coming in Slice 2)
          </p>
        </div>
      </div>
    </div>
  );
}
