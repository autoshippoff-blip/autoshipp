import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  className,
}) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-4 shadow-sm",
        className,
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-foreground tracking-tight">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-sm font-medium",
              trend === "up"
                ? "text-success"
                : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground",
            )}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
