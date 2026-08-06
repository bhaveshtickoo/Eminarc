"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  categoryTag?: string;
  title?: string;
  description?: string;
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  categoryTag = "ERROR STATE",
  title = "Failed to load data",
  description = "An error occurred while fetching information from Supabase. Please try again.",
  errorMessage,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "p-8 md:p-12 rounded-[18px] bg-red-500/5 border border-red-500/20 flex flex-col items-center text-center space-y-4 select-none shadow-sm transition-all",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 font-mono text-sm">
        <AlertTriangle className="h-6 w-6" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-red-600 bg-red-500/10 px-2.5 py-1 rounded-full inline-block">
          {categoryTag}
        </span>

        <h3 className="font-sans font-bold text-lg md:text-xl text-foreground tracking-tight pt-1">
          {title}
        </h3>

        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {errorMessage && (
          <p className="font-mono text-[11px] text-red-600/90 bg-red-500/10 p-2 rounded border border-red-500/20 mt-2 truncate">
            {errorMessage}
          </p>
        )}
      </div>

      {onRetry && (
        <div className="pt-2 font-mono text-xs">
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-sm gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}
    </div>
  );
};
