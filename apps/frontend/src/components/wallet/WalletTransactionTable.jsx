import React from "react";
import { DataTable } from "@/components/DataTable";
import { formatCurrency } from "@/utils/currency";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function WalletTransactionTable({ transactions, currency }) {
  const [isDark] = useTheme();

  const theme = {
    text: isDark ? "text-slate-300" : "text-slate-600",
    date: isDark ? "text-slate-400" : "text-slate-500",
    id: isDark ? "text-slate-500" : "text-slate-400",
  };

  const columns = [
    {
      header: "Transaction",
      accessor: (tx) => (
        <div className="flex items-center gap-3 py-2">
          <div
            className={`p-2 rounded-xl ${tx.direction === "CREDIT" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
          >
            {tx.direction === "CREDIT" ? (
              <ArrowDownRight size={16} />
            ) : (
              <ArrowUpRight size={16} />
            )}
          </div>
          <div>
            <p className="font-semibold">
              {tx.referenceType}{" "}
              {tx.direction === "CREDIT" ? "Credit" : "Debit"}
            </p>
            <p className={`text-xs ${theme.id}`}>
              {tx.transactionId.split("-")[0]}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: (tx) => (
        <p className={`text-sm ${theme.text}`}>{tx.description || "-"}</p>
      ),
    },
    {
      header: "Date",
      accessor: (tx) => (
        <p className={`text-sm ${theme.date}`}>
          {new Date(tx.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      ),
    },
    {
      header: "Amount",
      accessor: (tx) => (
        <div className="text-right py-2">
          <p
            className={`font-black tracking-tighter ${tx.direction === "CREDIT" ? "text-emerald-500" : "text-slate-900 dark:text-white"}`}
          >
            {tx.direction === "CREDIT" ? "+" : "-"}
            {formatCurrency(tx.amount, currency)}
          </p>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={transactions} />;
}
