"use client";

import React, { useEffect, useState } from "react";
import { getCampaigns } from "../../../app/(temporary)/lib/api";
import { DataTable } from "../../DataTable";
import { LoadingState, ErrorState } from "./StateWrappers";
import { EmptyState } from "../../EmptyState";
import { Megaphone } from "lucide-react";

export function CampaignsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getCampaigns();
      setData(res);
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

  if (loading) return <LoadingState message="Loading campaigns..." />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={Megaphone}
        title="No campaigns found"
        description="You haven't sent any campaigns yet. Campaign creation is managed via the main portal."
      />
    );
  }

  const columns = [
    {
      header: "Campaign Name",
      accessorKey: "name",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: "Template",
      accessorKey: "templateName",
      cell: (row) => (
        <span className="text-muted-foreground">{row.templateName}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-medium ${
            row.status === "COMPLETED"
              ? "bg-success/10 text-success"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Performance",
      accessorKey: "stats",
      cell: (row) => (
        <div className="text-sm">
          <div>
            <span className="text-muted-foreground">Sent:</span>{" "}
            {row.stats.sent}/{row.stats.total}
          </div>
          <div>
            <span className="text-muted-foreground">Read:</span>{" "}
            {row.stats.read}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Campaign History
          </h3>
          <p className="text-sm text-muted-foreground">
            Review your past bulk messaging campaigns.
          </p>
        </div>
        {/* Creation is out of temporary scope, so we just show read-only */}
        <button
          disabled
          className="px-4 py-2 bg-brand-orange text-white font-medium rounded-md text-sm opacity-50 cursor-not-allowed"
          title="Campaign creation is managed in the main portal"
        >
          New Campaign
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
