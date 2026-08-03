"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ResearchSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionNumber: string; // e.g. "01"
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: "success" | "warning" | "neutral" | "info";
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  className,
  sectionNumber,
  title,
  subtitle,
  icon,
  badgeText,
  badgeVariant = "success",
  children,
  ...props
}) => {
  const badgeStyles = {
    success: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
    warning: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
    neutral: "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
    info: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  };

  return (
    <div
      className={cn(
        "group relative rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 md:p-7 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(0,0,0,0.06)] mb-5 select-none">
        <div className="flex items-center space-x-3">
          {/* Section Number Badge */}
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] font-mono text-xs font-bold text-[#FFFFFF] shrink-0">
            {sectionNumber}
          </span>

          <div>
            <div className="flex items-center space-x-2">
              {icon && <span className="text-[#18181B]">{icon}</span>}
              <h3 className="font-serif text-xl font-bold tracking-tight text-[#111111] font-display">
                {title}
              </h3>
            </div>
            {subtitle && (
              <p className="font-sans text-xs text-[#716D64] mt-0.5 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        {badgeText && (
          <span
            className={cn(
              "font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border self-start sm:self-auto shrink-0",
              badgeStyles[badgeVariant],
            )}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Section Content */}
      <div className="font-sans text-xs md:text-sm text-[#18181B] leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
};
