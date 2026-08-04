"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { intelligenceApi } from "@/lib/intelligenceApi";
import { PageHeader as DashboardHeader } from "@/components/PageHeader";
import {
  PageShell,
  Card,
  StatCard,
  SectionTitle,
  Badge,
  AlertBanner,
  PrimaryBtn,
} from "@/components/dashboard/ui";
import { EmptyState } from "@/components/EmptyState";
import { DataTable } from "@/components/DataTable";

export default function BrandIntelligenceDashboard() {
  const { user } = useAuth();
  const [scorecard, setScorecard] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);
  const orgId = user?.organization_id;

  const fetchDashboardData = React.useCallback(async () => {
    if (!orgId) return;
    try {
      setIsLoading(true);
      setError(null);

      const [scorecardData, reportsData] = await Promise.all([
        intelligenceApi.getScorecard(orgId).catch((e) => {
          if (e.message === "NO_INTELLIGENCE_DATA") return null;
          throw e;
        }),
        intelligenceApi.getReports(orgId).catch(() => []),
      ]);

      setScorecard(scorecardData);
      setReports(reportsData);
    } catch (err) {
      console.error("Failed to load intelligence data", err);
      setError("Failed to load intelligence data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [orgId]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!orgId) return;

    fetchDashboardData();

    // Poll every 30 seconds for updates
    const interval = setInterval(fetchDashboardData, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [orgId, fetchDashboardData]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleManualScan = async () => {
    if (!orgId) return;

    try {
      setIsScanning(true);
      await intelligenceApi.triggerScan(orgId);
      // Wait a bit before refreshing to let the background job start
      setTimeout(fetchDashboardData, 2000);
    } catch (err) {
      console.error("Failed to trigger scan", err);
      setError("Failed to start new scan. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleExport = async () => {
    if (!user?.organization_id) return;

    try {
      setIsExporting(true);
      await intelligenceApi.downloadExport(user.organization_id);
    } catch (err) {
      console.error("Failed to export reports", err);
      setError("Failed to download CSV export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading && !scorecard) {
    return (
      <PageShell>
        <DashboardHeader title="Brand Intelligence" />
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <DashboardHeader
        title="Brand Intelligence"
        action={
          <div className="flex gap-3">
            <PrimaryBtn
              onClick={handleExport}
              disabled={isExporting || reports.length === 0}
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

      {error && (
        <AlertBanner variant="error">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        </AlertBanner>
      )}

      {!scorecard ? (
        <EmptyState
          icon={AlertCircle}
          title="No Intelligence Data"
          description="We haven't generated an intelligence scorecard for your brand yet. Run a scan to get started."
          action={
            <PrimaryBtn onClick={handleManualScan} disabled={isScanning}>
              Generate Scorecard
            </PrimaryBtn>
          }
        />
      ) : (
        <div className="space-y-6">
          {/* Executive Summary */}
          {(scorecard.executiveSummary ||
            scorecard.executive_summary ||
            reports[0]?.executiveSummary) && (
            <Card className="p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
                Executive Summary
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                {scorecard.executiveSummary ||
                  scorecard.executive_summary ||
                  reports[0]?.executiveSummary}
              </p>
            </Card>
          )}

          {/* Scores Grid */}
          <div>
            <SectionTitle>Intelligence Scores</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <StatCard
                label="Overall Score"
                value={scorecard.overallScore ?? scorecard.overall_score}
                accent="violet"
              />
              <StatCard
                label="Technical"
                value={scorecard.technicalScore ?? scorecard.technical_score}
                accent="blue"
              />
              <StatCard
                label="Marketing"
                value={scorecard.marketingScore ?? scorecard.marketing_score}
                accent="emerald"
              />
              <StatCard
                label="Operations"
                value={scorecard.operationsScore ?? scorecard.operations_score}
                accent="amber"
              />
            </div>
          </div>

          {/* Opportunities / Reports */}
          <div>
            <SectionTitle>Identified Opportunities</SectionTitle>
            <div className="mt-4">
              {reports.length === 0 ? (
                <EmptyState
                  icon={CheckCircle}
                  title="No issues found"
                  description="Your store is highly optimized. No critical opportunities identified."
                />
              ) : (
                <DataTable
                  columns={[
                    {
                      header: "Priority",
                      accessorKey: "priority",
                      cell: (row) => {
                        const variant =
                          row.priority === "HIGH"
                            ? "danger"
                            : row.priority === "MEDIUM"
                              ? "warning"
                              : "info";
                        return <Badge variant={variant}>{row.priority}</Badge>;
                      },
                    },
                    {
                      header: "Category",
                      accessorKey: "category",
                      cell: (row) => (
                        <span className="font-medium">{row.category}</span>
                      ),
                    },
                    {
                      header: "Finding",
                      accessorKey: "finding_type",
                    },
                    {
                      header: "Status",
                      accessorKey: "status",
                      cell: (row) => (
                        <div className="flex items-center gap-1.5">
                          {row.status === "OPEN" ? (
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                          <span className="text-xs font-medium">
                            {row.status}
                          </span>
                        </div>
                      ),
                    },
                    {
                      header: "Recommended Action",
                      accessorKey: "recommendation",
                      cell: (row) => (
                        <div
                          className="max-w-md truncate"
                          title={row.recommendation}
                        >
                          {row.recommendation}
                        </div>
                      ),
                    },
                  ]}
                  data={reports}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
