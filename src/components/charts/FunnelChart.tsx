"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FunnelStage {
  label: string;
  count: string | number;
  conversion?: string;
  pct: number;
  color?: string;
}

export interface FunnelChartProps {
  stages: FunnelStage[];
  height?: number | string;
  className?: string;
  ariaLabel?: string;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  stages,
  className,
  ariaLabel = "Growth conversion funnel chart",
}) => {
  return (
    <div
      className={cn("space-y-3.5 w-full select-none", className)}
      role="img"
      aria-label={ariaLabel}
    >
      {stages.map((stage, idx) => {
        const barColor = stage.color || "#18181B";

        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-sans">
              <div className="flex items-center space-x-2 truncate">
                <span className="font-mono text-[10px] text-[#716D64] font-bold">0{idx + 1}.</span>
                <span className="font-semibold text-[#18181B] truncate">{stage.label}</span>
              </div>
              <div className="flex items-center space-x-3 font-mono text-[10px]">
                <span className="font-bold text-[#111111]">{stage.count}</span>
                {stage.conversion && (
                  <span className="text-[#2D6A4F] bg-[#EDF6F0] px-1.5 py-0.5 rounded border border-[#C8E4D0] font-bold">
                    {stage.conversion}
                  </span>
                )}
              </div>
            </div>

            {/* Funnel Bar Container */}
            <div className="h-3 w-full bg-[#E5E0D6]/50 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(stage.pct, 4)}%`,
                  backgroundColor: barColor,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
