/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "../../../components/AppShell";
import { DataTable } from "../../../components/DataTable";
import { EmptyState } from "../../../components/EmptyState";
import { marketplaceApi } from "../../../lib/marketplaceApi";
import { Button } from "../../../components/ui/button";

export default function AdminMarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    apiEndpoint: "",
    version: "1.0.0",
  });

  const loadRegistry = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await marketplaceApi.listAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load product registry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistry();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await marketplaceApi.registerProduct(newProduct);
      setSuccessMsg("Product registered successfully.");
      setNewProduct({
        name: "",
        description: "",
        apiEndpoint: "",
        version: "1.0.0",
      });
      // Server-confirmed refresh
      await loadRegistry();
    } catch (err) {
      setError(err.message || "Failed to register product");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDeprecate = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to deprecate this product? It will no longer be available for new subscriptions.",
      )
    ) {
      return;
    }
    setError(null);
    setSuccessMsg(null);
    try {
      await marketplaceApi.deprecateProduct(id);
      setSuccessMsg("Product deprecated successfully.");
      // Server-confirmed refresh
      await loadRegistry();
    } catch (err) {
      setError(err.message || "Failed to deprecate product");
    }
  };

  const columns = [
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
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Version", accessorKey: "version" },
    {
      header: "Actions",
      cell: (row) => (
        <Button
          variant="destructive"
          size="sm"
          disabled={row.status === "DEPRECATED"}
          onClick={() => handleDeprecate(row.id)}
        >
          {row.status === "DEPRECATED" ? "Deprecated" : "Deprecate"}
        </Button>
      ),
    },
  ];

  return (
    <AppShell title="Marketplace Registry (Admin)" activeItem="Marketplace">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Notifications */}
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {error}
          </div>
        )}
        {successMsg && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            {successMsg}
          </div>
        )}

        <div className="bg-card border border-border rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Register New Product
          </h2>
          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              required
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
              placeholder="Description (Optional)"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <input
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
              placeholder="API Endpoint (Optional)"
              value={newProduct.apiEndpoint}
              onChange={(e) =>
                setNewProduct({ ...newProduct, apiEndpoint: e.target.value })
              }
            />
            <Button type="submit" disabled={isRegistering}>
              {isRegistering ? "Registering..." : "Register Product"}
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">
          Product Catalog
        </h2>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="No Products Found"
            description="There are currently no products registered in the platform catalog."
          />
        ) : (
          <DataTable columns={columns} data={products} />
        )}
      </div>
    </AppShell>
  );
}
