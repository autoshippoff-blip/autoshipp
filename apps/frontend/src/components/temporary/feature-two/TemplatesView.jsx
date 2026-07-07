"use client";

import React, { useEffect, useState } from "react";
import { getTemplates } from "../../../app/(temporary)/lib/api";
import { DataTable } from "../../DataTable";
import { LoadingState, ErrorState } from "./StateWrappers";
import { EmptyState } from "../../EmptyState";
import { LayoutTemplate } from "lucide-react";

export function TemplatesView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getTemplates();
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

  if (loading) return <LoadingState message="Loading templates..." />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={LayoutTemplate}
        title="No templates found"
        description="You don't have any approved templates yet."
      />
    );
  }

  const columns = [
    {
      header: "Template Name",
      accessorKey: "name",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (row) => (
        <span className="text-muted-foreground">{row.category}</span>
      ),
    },
    {
      header: "Language",
      accessorKey: "language",
      cell: (row) => (
        <span className="text-muted-foreground uppercase">{row.language}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-medium ${
            row.status === "APPROVED"
              ? "bg-success/10 text-success"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Message Templates
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your pre-approved WhatsApp templates.
          </p>
        </div>
        <button
          disabled
          className="px-4 py-2 bg-brand-orange text-white font-medium rounded-md text-sm opacity-50 cursor-not-allowed"
          title="Template submission requires main portal access"
        >
          New Template
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
