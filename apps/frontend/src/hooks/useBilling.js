"use client";

import { useState, useEffect, useCallback } from "react";
import { billingApi } from "@/lib/billingApi";

/**
 * Custom hook for fetching organization invoices
 * Manages loading states, errors, and explicit refetching
 */
export function useInvoices(orgId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoices = useCallback(async () => {
    if (!orgId) return;
    setIsLoading(true);
    setError(null);
    try {
      const invoices = await billingApi.getInvoices(orgId);
      setData(invoices);
    } catch (err) {
      setError(err.message || "Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return { data, isLoading, error, refetch: fetchInvoices };
}

/**
 * Custom hook for fetching a single invoice
 */
export function useInvoice(orgId, invoiceId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoice = useCallback(async () => {
    if (!orgId || !invoiceId) return;
    setIsLoading(true);
    setError(null);
    try {
      const invoice = await billingApi.getInvoice(orgId, invoiceId);
      setData(invoice);
    } catch (err) {
      setError(err.message || "Failed to fetch invoice");
    } finally {
      setIsLoading(false);
    }
  }, [orgId, invoiceId]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  return { data, isLoading, error, refetch: fetchInvoice };
}
