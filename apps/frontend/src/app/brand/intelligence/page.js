"use client";

import { IntelligenceScorecard } from "@/components/dashboard/IntelligenceScorecard";
import { ExecutiveNarrative } from "@/components/dashboard/ExecutiveNarrative";
import { OpportunitiesList } from "@/components/dashboard/OpportunitiesList";
import { PageHeader } from "@/components/PageHeader";
import { useExecutiveReport } from "@/hooks/useIntelligence";

export default function IntelligencePage() {
  const { data, isLoading, error, refetch } = useExecutiveReport();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="AutoShipp Intelligence"
        description="Your store's dynamic health score and revenue insights."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntelligenceScorecard />

        <ExecutiveNarrative
          report={data}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </div>

      <OpportunitiesList
        report={data}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </div>
  );
}
