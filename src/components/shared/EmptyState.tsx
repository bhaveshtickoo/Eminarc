"use client";

import React from "react";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  categoryTag?: string; // e.g. "FOUNDER RESEARCH"
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  nextActionText?: string;
  onNextAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  categoryTag = "EMPTY STATE",
  icon: Icon,
  title,
  description,
  nextActionText = "Get Started",
  onNextAction,
  secondaryActionText,
  onSecondaryAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "p-8 md:p-12 rounded-[18px] bg-[#FCFAF7] border border-dashed border-[#E5E0D6] flex flex-col items-center text-center space-y-4 select-none shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#18181B] text-[#FFFFFF] shadow-sm font-mono text-sm">
        <Icon className="h-6 w-6" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full inline-block">
          {categoryTag}
        </span>

        <h3 className="font-sans font-bold text-lg md:text-xl text-[#111111] tracking-tight pt-1">
          {title}
        </h3>

        <p className="font-sans text-xs md:text-sm text-[#52525B] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
        {onNextAction && (
          <button
            type="button"
            onClick={onNextAction}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#222222] transition-colors cursor-pointer shadow-sm"
          >
            <span>{nextActionText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}

        {secondaryActionText && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] font-bold hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          >
            <span>{secondaryActionText}</span>
          </button>
        )}
      </div>
    </div>
  );
};
