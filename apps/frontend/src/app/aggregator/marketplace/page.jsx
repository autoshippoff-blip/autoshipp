/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AppShell } from "../../../components/AppShell";
import { DataTable } from "../../../components/DataTable";
import { EmptyState } from "../../../components/EmptyState";
import { marketplaceApi } from "../../../lib/marketplaceApi";
import { Button } from "../../../components/ui/button";

function AggregatorMarketplaceContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("organization") || "";

  const [inputOrgId, setInputOrgId] = useState(orgId);
  const [catalog, setCatalog] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const loadData = async (targetOrgId) => {
    if (!targetOrgId) return;
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const [catalogData, assignmentData] = await Promise.all([
        marketplaceApi.getManagedCatalog(targetOrgId),
        marketplaceApi.getManagedAssignments(targetOrgId),
      ]);
      setCatalog(catalogData);
      setAssignments(assignmentData);
    } catch (err) {
      setError(
        err.message || "Failed to load marketplace data for this organization",
      );
      setCatalog([]);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  // Sync state when URL changes
  useEffect(() => {
    if (orgId) {
      setInputOrgId(orgId);
      loadData(orgId);
    }
  }, [orgId]);

  const handleOrgSearch = (e) => {
    e.preventDefault();
    if (inputOrgId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("organization", inputOrgId);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleAssign = async (subscriptionId) => {
    setActionLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await marketplaceApi.assignSubscription(orgId, subscriptionId);
      setSuccessMsg("Successfully assigned subscription to the organization.");
      await loadData(orgId);
    } catch (err) {
      setError(err.message || "Failed to assign subscription");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevoke = async (subscriptionId) => {
    if (!window.confirm("Are you sure you want to revoke this assignment?"))
      return;
    setActionLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await marketplaceApi.revokeAssignment(orgId, subscriptionId);
      setSuccessMsg("Successfully revoked assignment.");
      await loadData(orgId);
    } catch (err) {
      setError(err.message || "Failed to revoke assignment");
    } finally {
      setActionLoading(false);
    }
  };

  const catalogColumns = [
    {
      header: "Product ID",
      accessorKey: "id",
      cell: (row) => (
        <span className="text-xs font-mono">{row.id.substring(0, 8)}...</span>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (row) => <span className="font-semibold">{row.name}</span>,
    },
    {
      header: "Status",
      cell: (row) =>
        row.status === "DEPRECATED" ? (
          <span className="text-red-600 text-xs font-semibold">Deprecated</span>
        ) : (
          <span className="text-green-600 text-xs font-semibold">Active</span>
        ),
    },
    {
      header: "Subscription",
      cell: (row) =>
        row.isSubscribed ? (
          <span className="text-green-600 text-xs font-semibold">
            Subscribed
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">Unsubscribed</span>
        ),
    },
  ];

  const assignmentColumns = [
    {
      header: "Assignment ID",
      accessorKey: "id",
      cell: (row) => (
        <span className="text-xs font-mono">{row.id.substring(0, 8)}...</span>
      ),
    },
    {
      header: "Subscription ID",
      accessorKey: "subscriptionId",
      cell: (row) => (
        <span className="text-xs font-mono">
          {row.subscriptionId.substring(0, 8)}...
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: (row) => (
        <Button
          variant="destructive"
          size="sm"
          disabled={actionLoading}
          onClick={() => handleRevoke(row.subscriptionId)}
        >
          Revoke
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Organization Selector */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Select Managed Organization
        </h2>
        <form onSubmit={handleOrgSearch} className="flex gap-4">
          <input
            className="flex-grow px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
            placeholder="Enter Organization UUID"
            value={inputOrgId}
            onChange={(e) => setInputOrgId(e.target.value)}
          />
          <Button type="submit">Load Marketplace</Button>
        </form>
      </div>

      {error && (
        <div
          className="p-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {error}
        </div>
      )}
      {successMsg && (
        <div
          className="p-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          {successMsg}
        </div>
      )}

      {orgId && (
        <>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Organization Catalog Visibility
            </h2>
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              </div>
            ) : catalog.length === 0 ? (
              <EmptyState
                title="No Products"
                description="No products available to assign."
              />
            ) : (
              <DataTable columns={catalogColumns} data={catalog} />
            )}
            <div className="mt-4 flex gap-4 items-center">
              <input
                id="assignSubId"
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm w-64"
                placeholder="Enter Subscription ID to Assign"
              />
              <Button
                onClick={() => {
                  const subId = document.getElementById("assignSubId").value;
                  if (subId) handleAssign(subId);
                }}
                disabled={actionLoading}
              >
                Assign Product
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Current Assignments
            </h2>
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              </div>
            ) : assignments.length === 0 ? (
              <EmptyState
                title="No Assignments"
                description="This organization has no active assignments."
              />
            ) : (
              <DataTable columns={assignmentColumns} data={assignments} />
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default function AggregatorMarketplacePage() {
  return (
    <AppShell
      title="Marketplace Management (Aggregator)"
      activeItem="Marketplace"
    >
      <Suspense
        fallback={
          <div className="p-8 text-center text-muted-foreground">
            Loading interface...
          </div>
        }
      >
        <AggregatorMarketplaceContent />
      </Suspense>
    </AppShell>
  );
}
