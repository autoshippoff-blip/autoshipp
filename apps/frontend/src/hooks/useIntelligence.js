"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { intelligenceApi } from "@/lib/intelligenceApi";

export function useIntelligenceScorecard() {
  const { user } = useAuth();
  const orgId = user?.organizationId || user?.organization?.id;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScorecard = useCallback(async () => {
    if (!orgId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const scorecard = await intelligenceApi.getScorecard(orgId);
      setData(scorecard);
    } catch (err) {
      setError(err.message || "Failed to fetch intelligence scorecard");
    } finally {
      setIsLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchScorecard();
  }, [fetchScorecard]);

  return { data, isLoading, error, refetch: fetchScorecard };
}

export function useExecutiveReport() {
  const { user } = useAuth();
  const orgId = user?.organizationId || user?.organization?.id;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReport = useCallback(async () => {
    if (!orgId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const report = await intelligenceApi.getExecutiveReport(orgId);
      setData(report);
    } catch (err) {
      setError(err.message || "Failed to fetch executive report");
    } finally {
      setIsLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchReport();
  }, [fetchReport]);

  return { data, isLoading, error, refetch: fetchReport };
}
