import React from "react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/charts/Sparkline";

export interface KPICardProps {
  title: string;
  value: string;
  badgeText?: string | undefined;
  badgeVariant?: "success" | "warning" | "neutral" | "info";
  subtitle?: string;
  sparklineData?: number[]; // Values for SVG sparkline
  sparklineColor?: string;
  indexCode?: string;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  badgeText,
  badgeVariant = "success",
  subtitle,
  sparklineData = [12, 18, 14, 22, 19, 28, 24, 32],
  sparklineColor = "#2D6A4F",
  indexCode,
  icon,
}) => {
  const badgeStyles = {
    success: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
    warning: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
    neutral: "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]",
    info: "bg-[#F1F5F9] text-[#1E293B] border-[#CBD5E1]",
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 md:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.05)]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            {indexCode && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
                {indexCode}
              </span>
            )}
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#716D64]">
              {title}
            </h4>
          </div>
          {icon && (
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#EFEAE1]/60 text-[#18181B] shrink-0">
              {icon}
            </div>
          )}
        </div>

        {/* Value Display */}
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <div className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
            {value}
          </div>
          {badgeText && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-medium border tracking-tight shrink-0",
                badgeStyles[badgeVariant],
              )}
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>

      {/* Sparkline & Subtitle Footer */}
      <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.05)] flex items-end justify-between gap-3">
        <div>
          {subtitle && (
            <p className="font-mono text-[11px] text-[#716D64] tracking-tight">{subtitle}</p>
          )}
        </div>

        {/* Shared Reusable Sparkline Component */}
        <Sparkline
          data={sparklineData}
          color={sparklineColor}
          width={100}
          height={30}
          showEndDot={true}
        />
      </div>
    </div>
  );
};
