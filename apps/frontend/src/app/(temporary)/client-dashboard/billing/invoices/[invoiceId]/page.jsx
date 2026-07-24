"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useInvoice } from "@/hooks/useBilling";
import { billingApi } from "@/lib/billingApi";
import {
  formatCurrency,
  formatDate,
  getInvoiceStatusBadge,
} from "@/utils/billing";
import { FadeInUp } from "@/components/AnimatedUI";
import {
  ArrowLeft,
  AlertCircle,
  Loader2,
  CreditCard,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function InvoiceDetailPage() {
  const { invoiceId } = useParams();
  const { user } = useAuth();
  const orgId = user?.organization_id;

  const {
    data: invoice,
    isLoading,
    error,
    refetch,
  } = useInvoice(orgId, invoiceId);

  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Check if user has permission to pay (UX check only, backend is authoritative)
  // Assuming roles or permissions might be available in user object.
  // If not, we just rely on standard UX for now.
  const canPay = user?.role === "admin" || user?.role === "owner" || true;

  const handlePayment = async () => {
    if (!orgId || !invoiceId || isPaying) return;

    setIsPaying(true);
    setPaymentError(null);
    setPaymentSuccess(false);

    try {
      // In a real flow, you'd select a payment method. We'll use a placeholder or wallet method id.
      // Phase 4 implies wallet settlement, we'll pass a generic wallet PM ID or empty.
      const pmId = "wallet-pm-id";

      await billingApi.processPayment(orgId, invoiceId, pmId);

      setPaymentSuccess(true);
      // Wait a moment then refetch the invoice to get the updated status from server
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (err) {
      setPaymentError(err.message || "Payment failed to process");
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="space-y-6">
        <Link
          href="/client-dashboard/billing/invoices"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invoices
        </Link>
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex items-center gap-3 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Failed to load invoice: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const statusBadge = getInvoiceStatusBadge(invoice.status);
  const isPayable =
    invoice.status === "ISSUED" ||
    invoice.status === "PARTIALLY_PAID" ||
    invoice.status === "OVERDUE";

  return (
    <div className="space-y-8 pb-12">
      <FadeInUp>
        <div>
          <Link
            href="/client-dashboard/billing/invoices"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                Invoice {invoice.invoiceNumber}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusBadge.color}`}
                >
                  {statusBadge.label}
                </span>
              </h1>
              <p className="mt-1 text-muted-foreground">
                Issued on {formatDate(invoice.issueDate)} • Due on{" "}
                {formatDate(invoice.dueDate)}
              </p>
            </div>

            {isPayable && (
              <div className="flex-shrink-0">
                <button
                  onClick={handlePayment}
                  disabled={isPaying || !canPay}
                  className={`
                    inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-medium text-sm transition-all
                    ${
                      isPaying || !canPay
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-sm hover:shadow-md"
                    }
                  `}
                  title={
                    !canPay ? "You do not have permission to pay invoices" : ""
                  }
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Pay with Wallet
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        {paymentError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800">
                Payment Failed
              </h4>
              <p className="text-sm text-red-700 mt-1">{paymentError}</p>
            </div>
          </div>
        )}

        {paymentSuccess && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800">
                Payment Successful
              </h4>
              <p className="text-sm text-green-700 mt-1">
                Your wallet has been debited and the invoice is updated.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/20">
                <h3 className="font-semibold text-foreground">Line Items</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-center">Qty</th>
                      <th className="px-6 py-4 text-right">Unit Price</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {invoice.items?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 font-medium text-foreground">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 text-center text-muted-foreground">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-muted-foreground">
                          {formatCurrency(item.unitPrice, invoice.currency)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-foreground">
                          {formatCurrency(item.total, invoice.currency)}
                        </td>
                      </tr>
                    ))}
                    {(!invoice.items || invoice.items.length === 0) && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-8 text-center text-muted-foreground"
                        >
                          No line items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/20">
                <h3 className="font-semibold text-foreground">Summary</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(invoice.subtotal, invoice.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600">
                    -{formatCurrency(invoice.discountTotal, invoice.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(invoice.taxTotal, invoice.currency)}
                  </span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <span className="font-semibold text-foreground text-base">
                    Grand Total
                  </span>
                  <span className="font-bold text-foreground text-lg">
                    {formatCurrency(invoice.grandTotal, invoice.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
