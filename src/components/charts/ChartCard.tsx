"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  indexCode?: string;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  heightClass?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  className,
  title,
  subtitle,
  indexCode,
  badge,
  headerAction,
  footer,
  heightClass,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]",
        heightClass,
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            {indexCode && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
                {indexCode}
              </span>
            )}
            {badge}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>

        {title && (
          <h3 className="font-sans text-lg font-semibold tracking-tight text-[#111111] mb-1">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="font-sans text-xs text-[#716D64] mb-4 leading-relaxed">{subtitle}</p>
        )}

        {/* Main Chart Canvas */}
        <div className="w-full">{children}</div>
      </div>

      {/* Optional Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)] font-mono text-xs text-[#716D64]">
          {footer}
        </div>
      )}
    </div>
  );
};
