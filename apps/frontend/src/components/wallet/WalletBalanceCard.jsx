import React from "react";
import { motion } from "framer-motion";
import { Wallet, Info } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { useTheme } from "@/hooks/useTheme";

export function WalletBalanceCard({ balance, index = 0 }) {
  const [isDark] = useTheme();

  const theme = {
    dark: isDark,
    bg: isDark ? "bg-[#030014]" : "bg-slate-50",
    text: isDark ? "text-slate-300" : "text-slate-600",
    heading: isDark ? "text-white" : "text-slate-900",
  };

  const formattedAvailable = formatCurrency(
    balance.availableBalance,
    balance.currency,
  );
  const formattedReserved = formatCurrency(
    balance.reservedBalance,
    balance.currency,
  );

  const isActive = balance.status === "ACTIVE";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-3xl border ${
        isDark
          ? "bg-white/[0.03] border-white/10"
          : "bg-white border-slate-200 shadow-sm"
      } relative overflow-hidden flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
            <Wallet size={24} />
          </div>
          <div>
            <h3
              className={`font-bold tracking-widest text-xs uppercase ${theme.text}`}
            >
              Current Balance
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`}
              ></span>
              <span
                className={`text-[10px] font-black uppercase tracking-tighter ${theme.text}`}
              >
                {balance.status}
              </span>
            </div>
          </div>
        </div>

        {/* Placeholder for future top-up button */}
        {/* <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-500 transition-colors">
          Top Up
        </button> */}
      </div>

      <div>
        <p
          className={`text-4xl sm:text-5xl font-black ${theme.heading} tracking-tighter`}
        >
          {formattedAvailable}
        </p>

        {parseFloat(balance.reservedBalance) > 0 && (
          <div className="flex items-center gap-1 mt-2 text-amber-500">
            <Info size={14} />
            <span className="text-xs font-semibold">
              {formattedReserved} reserved
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
