"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResearchSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionNumber: string; // e.g. "01"
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: "success" | "warning" | "neutral" | "info";
  defaultOpen?: boolean;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  className,
  sectionNumber,
  title,
  subtitle,
  icon,
  badgeText,
  badgeVariant = "success",
  defaultOpen = true,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeStyles = {
    success: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
    warning: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
    neutral: "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
    info: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  };

  return (
    <div
      className={cn(
        "group relative rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      {/* Header Bar with Collapsible Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 pb-4 border-b border-[rgba(0,0,0,0.06)] cursor-pointer select-none"
      >
        <div className="flex items-center space-x-3 min-w-0">
          {/* Section Number Badge */}
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] font-mono text-xs font-bold text-[#FFFFFF] shrink-0">
            {sectionNumber}
          </span>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              {icon && <span className="text-[#18181B] shrink-0">{icon}</span>}
              <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#111111] truncate">
                {title}
              </h3>
            </div>
            {subtitle && (
              <p className="font-sans text-xs text-[#716D64] mt-0.5 font-medium truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {badgeText && (
            <span
              className={cn(
                "hidden sm:inline-block font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border",
                badgeStyles[badgeVariant],
              )}
            >
              {badgeText}
            </span>
          )}

          <button
            type="button"
            className="p-1 rounded-lg hover:bg-[#EFEAE1] text-[#716D64] hover:text-[#111111] transition-colors"
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="pt-4 font-sans text-xs md:text-sm text-[#18181B] leading-relaxed space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
