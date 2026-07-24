/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "../../../components/AppShell";
import { DataTable } from "../../../components/DataTable";
import { EmptyState } from "../../../components/EmptyState";
import { marketplaceApi } from "../../../lib/marketplaceApi";
import { Button } from "../../../components/ui/button";

// Extracted UI component for products
const ProductCard = ({ product, onSubscribe, disabled }) => (
  <div className="bg-card border border-border rounded-lg p-5 shadow-sm flex flex-col h-full">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-lg">{product.name}</h3>
      {product.status === "DEPRECATED" && (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          Deprecated
        </span>
      )}
    </div>
    <p className="text-sm text-muted-foreground flex-grow mb-4">
      {product.description || "No description provided."}
    </p>
    <Button
      onClick={() => onSubscribe(product.id)}
      disabled={
        disabled || product.isSubscribed || product.status === "DEPRECATED"
      }
      className="w-full"
    >
      {product.isSubscribed
        ? "Subscribed"
        : product.status === "DEPRECATED"
          ? "Unavailable"
          : "Subscribe Now"}
    </Button>
  </div>
);

export default function BrandMarketplacePage() {
  const [catalog, setCatalog] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [catalogData, assignmentData] = await Promise.all([
        marketplaceApi.getMyCatalog(),
        marketplaceApi.getMyAssignments(),
      ]);
      setCatalog(catalogData);
      setAssignments(assignmentData);
    } catch (err) {
      setError(err.message || "Failed to load marketplace data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubscribe = async (productId) => {
    setIsSubscribing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await marketplaceApi.purchaseSubscription({
        productId,
        billingCycle: "MONTHLY", // Default for this simplified phase
      });
      setSuccessMsg("Successfully subscribed to the product.");
      await loadData(); // Server-confirmed refresh
    } catch (err) {
      setError(err.message || "Failed to complete subscription");
    } finally {
      setIsSubscribing(false);
    }
  };

  const columns = [
    {
      header: "ID",
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
      header: "Assigned At",
      accessorKey: "assignedAt",
      cell: (row) => new Date(row.assignedAt).toLocaleDateString(),
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
  ];

  return (
    <AppShell title="Marketplace" activeItem="Marketplace">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Notifications */}
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

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Available Products
          </h2>
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
            </div>
          ) : catalog.length === 0 ? (
            <EmptyState
              title="No Products Available"
              description="There are currently no products in the catalog."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalog.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSubscribe={handleSubscribe}
                  disabled={isSubscribing}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            My Subscriptions & Assignments
          </h2>
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
            </div>
          ) : assignments.length === 0 ? (
            <EmptyState
              title="No Assignments"
              description="You have not been assigned any products yet."
            />
          ) : (
            <DataTable columns={columns} data={assignments} />
          )}
        </section>
      </div>
    </AppShell>
  );
}
