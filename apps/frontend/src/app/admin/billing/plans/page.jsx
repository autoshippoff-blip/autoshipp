"use client";

import { useState } from "react";
import { billingApi } from "@/lib/billingApi";
import { FadeInUp } from "@/components/AnimatedUI";
import { Plus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminPlansPage() {
  const [formData, setFormData] = useState({
    productId: "",
    code: "",
    name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await billingApi.createPlan(formData);
      setSuccess(true);
      setFormData({ productId: "", code: "", name: "" });
    } catch (err) {
      setError(err.message || "Failed to create plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <FadeInUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Billing Plans
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Create and manage commercial plans across the platform.
          </p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <div className="bg-card rounded-2xl border border-border overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Plus className="mr-2 h-5 w-5 text-brand-orange" />
            Create New Plan
          </h2>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p className="text-sm font-medium text-green-800">
                Plan created successfully.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Product ID (UUID)
              </label>
              <input
                type="text"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
                placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Code
              </label>
              <input
                type="text"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="e.g. PRO_MONTHLY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Pro Plan"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors
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
              Create Plan
            </button>
          </form>
        </div>
      </FadeInUp>
    </div>
  );
}
