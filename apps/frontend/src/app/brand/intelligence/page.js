"use client";

import React, { useState } from "react";
import { Download, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { intelligenceApi } from "@/lib/intelligenceApi";
import { IntelligenceScorecard } from "@/components/dashboard/IntelligenceScorecard";
import { ExecutiveNarrative } from "@/components/dashboard/ExecutiveNarrative";
import { OpportunitiesList } from "@/components/dashboard/OpportunitiesList";
import { ProductRecommendations } from "@/components/dashboard/ProductRecommendations";
import { PageHeader } from "@/components/PageHeader";
import { AlertBanner, PrimaryBtn } from "@/components/dashboard/ui";
import { useExecutiveReport } from "@/hooks/useIntelligence";

export default function BrandIntelligenceDashboard() {
  const { user } = useAuth();
  const orgId =
    user?.organizationId || user?.organization?.id || user?.organization_id;
  const { data, isLoading, error, refetch } = useExecutiveReport();

  const [isScanning, setIsScanning] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleManualScan = async () => {
    if (!orgId) return;

    try {
      setIsScanning(true);
      setActionError(null);
      await intelligenceApi.triggerScan(orgId);
      setTimeout(refetch, 2000);
    } catch (err) {
      console.error("Failed to trigger scan", err);
      setActionError("Failed to start new scan. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleExport = async () => {
    if (!orgId) return;

    try {
      setIsExporting(true);
      setActionError(null);
      await intelligenceApi.downloadExport(orgId);
    } catch (err) {
      console.error("Failed to export reports", err);
      setActionError("Failed to download CSV export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="AutoShipp Intelligence"
        description="Your store's dynamic health score and revenue insights."
        action={
          <div className="flex gap-3">
            <PrimaryBtn
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export CSV
            </PrimaryBtn>
            <PrimaryBtn
              onClick={handleManualScan}
              disabled={isScanning}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`}
              />
              Run Scan
            </PrimaryBtn>
          </div>
        }
      />

      {actionError && (
        <AlertBanner variant="error">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {actionError}
          </div>
        </AlertBanner>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntelligenceScorecard />

        <ExecutiveNarrative
          report={data}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <OpportunitiesList
          report={data}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />

        <ProductRecommendations
          report={data}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </div>
    </div>
  );
}
