"use client";

import { useState, useCallback, useEffect } from "react";
import { billingApi } from "@/lib/billingApi";

export function usePlanPrices(planId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = useCallback(async () => {
    if (!planId) return;
    setIsLoading(true);
    setError(null);
    try {
      const prices = await billingApi.getPlanPrices(planId);
      setData(prices);
    } catch (err) {
      setError(err.message || "Failed to fetch plan prices");
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return { data, isLoading, error, refetch: fetchPrices };
}
