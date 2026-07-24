"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { WalletBalanceCard } from "@/components/wallet/WalletBalanceCard";
import { WalletTransactionTable } from "@/components/wallet/WalletTransactionTable";
import { EmptyState } from "@/components/EmptyState";
import { walletApi } from "@/lib/walletApi";
import { Wallet, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";

export default function AggregatorWalletPage() {
  const { user } = useAuth();
  const params = useParams();
  const orgId = params.orgId;

  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWalletData = async () => {
    if (!orgId) return;
    try {
      setLoading(true);
      setError(null);
      const [balanceData, txData] = await Promise.all([
        walletApi.getManagedBalance(orgId),
        walletApi.getManagedTransactions(orgId, page, 20),
      ]);
      setBalance(balanceData);
      setTransactions(txData.data);
      setTotal(txData.meta.total);
    } catch (err) {
      setError(err.message || "Failed to load managed wallet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && orgId) {
      fetchWalletData();
    }
  }, [user, orgId, page]);

  if (loading && !balance) {
    return (
      <div className="min-h-screen p-6 max-w-[1600px] mx-auto animate-pulse flex flex-col gap-6">
        <div className="h-40 bg-slate-200 dark:bg-white/5 rounded-3xl w-full max-w-md"></div>
        <div className="h-96 bg-slate-200 dark:bg-white/5 rounded-3xl w-full"></div>
      </div>
    );
  }

  if (error) {
    if (error === "Wallet not found") {
      return (
        <div className="min-h-screen p-6 max-w-[1600px] mx-auto">
          <EmptyState
            icon={Wallet}
            title="Wallet Not Provisioned"
            description="The selected organization does not have an active wallet."
          />
        </div>
      );
    }
    return (
      <div className="min-h-screen p-6 max-w-[1600px] mx-auto flex items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Unable to connect"
          description={error}
          action={{
            label: "Try Again",
            onClick: fetchWalletData,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-300">
      <PageHeader title={`Managed Wallet`} />

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WalletBalanceCard balance={balance} />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Transaction History
            </h2>
            <button
              onClick={() => fetchWalletData()}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          {transactions.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="No transactions yet"
              description="This managed wallet has no recorded transactions."
            />
          ) : (
            <div className="bg-white dark:bg-[#030014] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <WalletTransactionTable
                transactions={transactions}
                currency={balance.currency}
              />

              {/* Simple Pagination Controls */}
              <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center text-sm text-slate-500">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <span>
                  Page {page} of {Math.ceil(total / 20) || 1}
                </span>
                <button
                  disabled={page >= Math.ceil(total / 20)}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
