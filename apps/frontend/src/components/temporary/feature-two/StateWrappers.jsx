import React from "react";
import { AlertCircle, Loader2, RefreshCcw } from "lucide-react";

export function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[200px]">
      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-destructive/20 rounded-xl bg-destructive/5 min-h-[200px]">
      <AlertCircle
        className="w-10 h-10 text-destructive mb-4"
        strokeWidth={1.5}
      />
      <h3 className="text-lg font-medium text-destructive">
        Something went wrong
      </h3>
      <p className="mt-1 text-sm text-destructive/80 max-w-sm mb-6">
        {error?.message || "Failed to load data from the server."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md text-sm font-medium transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
