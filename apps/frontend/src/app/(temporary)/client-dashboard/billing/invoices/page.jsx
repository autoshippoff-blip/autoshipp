"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useInvoices } from "@/hooks/useBilling";
import {
  formatCurrency,
  formatDate,
  getInvoiceStatusBadge,
} from "@/utils/billing";
import { FadeInUp } from "@/components/AnimatedUI";
import { Receipt, AlertCircle, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function InvoicesPage() {
  const { user } = useAuth();
  const orgId = user?.organization_id;

  const { data: invoices, isLoading, error } = useInvoices(orgId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 border border-red-200">
        <div className="flex items-center gap-3 text-red-800">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">Failed to load invoices: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FadeInUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Invoices
          </h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            View and manage your organization's billing invoices.
          </p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {invoices?.length === 0 ? (
            <div className="p-12 text-center">
              <Receipt className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground">
                No invoices found
              </h3>
              <p className="text-muted-foreground mt-1">
                Your organization doesn't have any invoices yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                  <tr>
                    <th className="px-6 py-4">Invoice Number</th>
                    <th className="px-6 py-4">Issue Date</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Total</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices?.map((invoice) => {
                    const statusBadge = getInvoiceStatusBadge(invoice.status);
                    return (
                      <tr
                        key={invoice.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-foreground">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatDate(invoice.issueDate)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatDate(invoice.dueDate)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}
                          >
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {formatCurrency(invoice.grandTotal, invoice.currency)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/client-dashboard/billing/invoices/${invoice.id}`}
                            className="inline-flex items-center text-brand-orange hover:text-brand-orange/80 font-medium"
                          >
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </FadeInUp>
    </div>
  );
}
