import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Building } from "lucide-react";

export function ProfileWidget({ user, organization, theme }) {
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-3xl border ${theme.card} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400">
          <User size={24} />
        </div>
        <div>
          <h2 className={`text-lg font-bold ${theme.heading}`}>
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Shield size={16} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
              Platform Role
            </p>
            <p className={`font-medium ${theme.text}`}>
              {user.role || "Administrator"}
            </p>
          </div>
        </div>

        {organization && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Building size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                Current Context
              </p>
              <p className={`font-medium ${theme.text}`}>{organization.name}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
