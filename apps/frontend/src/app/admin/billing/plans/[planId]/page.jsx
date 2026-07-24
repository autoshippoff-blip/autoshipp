"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { billingApi } from "@/lib/billingApi";
import { usePlanPrices } from "@/hooks/useAdminBilling";
import { formatCurrency, formatDate } from "@/utils/billing";
import { FadeInUp } from "@/components/AnimatedUI";
import {
  ArrowLeft,
  Plus,
  AlertCircle,
  Loader2,
  CheckCircle2,
  History,
} from "lucide-react";
import Link from "next/link";

export default function AdminPlanDetailPage() {
  const { planId } = useParams();
  const { data: prices, isLoading, error, refetch } = usePlanPrices(planId);

  const [formData, setFormData] = useState({
    currency: "USD",
    billingCycle: "MONTHLY",
    amount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      await billingApi.addPlanPrice(planId, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setSuccess(true);
      setFormData({ ...formData, amount: "" });
      refetch();
    } catch (err) {
      setSubmitError(err.message || "Failed to add plan price");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <FadeInUp>
        <div>
          <Link
            href="/admin/billing/plans"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Plan Pricing History
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Manage pricing for plan {planId}
          </p>
        </div>
      </FadeInUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FadeInUp delay={0.1}>
          <div className="bg-card rounded-2xl border border-border overflow-hidden p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Plus className="mr-2 h-5 w-5 text-brand-orange" />
              Append New Price
            </h2>

            {submitError && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <p className="text-sm font-medium text-red-800">
                  {submitError}
                </p>
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <p className="text-sm font-medium text-green-800">
                  New price active.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Currency
                </label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Billing Cycle
                </label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  value={formData.billingCycle}
                  onChange={(e) =>
                    setFormData({ ...formData, billingCycle: e.target.value })
                  }
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="ANNUALLY">Annually</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="e.g. 29.99"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  mt-4 w-full inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors
                  ${
                    isSubmitting
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-brand-orange text-white hover:bg-brand-orange/90"
                  }
                `}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Set New Price
              </button>
            </form>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="bg-card rounded-2xl border border-border overflow-hidden p-6 h-full">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <History className="mr-2 h-5 w-5 text-muted-foreground" />
              Pricing History
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
              </div>
            ) : error ? (
              <div className="rounded-lg bg-red-50 p-4 border border-red-200 text-red-800 text-sm">
                Failed to load history: {error}
              </div>
            ) : prices?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No pricing history found.
              </div>
            ) : (
              <div className="space-y-4">
                {prices.map((price, index) => {
                  const isActive = !price.effectiveTo;
                  return (
                    <div
                      key={price.id}
                      className={`p-4 rounded-lg border ${isActive ? "bg-green-50/50 border-green-200" : "bg-muted/30 border-border"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-lg">
                          {formatCurrency(price.amount, price.currency)}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            / {price.billingCycle.toLowerCase()}
                          </span>
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Effective From: {formatDate(price.effectiveFrom)}</p>
                        {price.effectiveTo && (
                          <p>Effective To: {formatDate(price.effectiveTo)}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
