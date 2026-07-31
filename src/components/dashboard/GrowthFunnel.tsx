"use client";

import React from "react";
import { Filter } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface FunnelStage {
  label: string;
  count: string;
  conversion: string;
  pct: number; // 0 to 100
  color: string;
}

export const GrowthFunnel: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const funnelStages: FunnelStage[] = [
    {
      label: "Brand Impressions",
      count: "42,800",
      conversion: "100%",
      pct: 100,
      color: "bg-[#18181B]",
    },
    {
      label: "AI Search Citations",
      count: "14,200",
      conversion: "33.1%",
      pct: 75,
      color: "bg-[#2D6A4F]",
    },
    {
      label: "Qualified Web Visits",
      count: "2,850",
      conversion: "20.1%",
      pct: 55,
      color: "bg-[#B45309]",
    },
    {
      label: "Active Pipeline Opportunities",
      count: `${currentWorkspace.metrics.opportunitiesCount} Deals`,
      conversion: "0.49%",
      pct: 35,
      color: "bg-[#000000]",
    },
  ];

  return (
    <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-[#18181B]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              GROWTH FUNNEL
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0] font-bold">
            CONVERSION: 4.8%
          </span>
        </div>

        <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
          Lead Funnel Velocity
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
          Impression to pipeline conversion pipeline.
        </p>
      </div>

      {/* Funnel Visual Stack */}
      <div className="space-y-3 my-4">
        {funnelStages.map((stage, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-semibold text-[#18181B]">{stage.label}</span>
              <div className="flex items-center space-x-2 font-mono text-[10px]">
                <span className="font-bold text-[#111111]">{stage.count}</span>
                <span className="text-[#716D64]">({stage.conversion})</span>
              </div>
            </div>

            {/* Stage Bar */}
            <div className="h-2.5 w-full bg-[#E5E0D6]/60 rounded-full overflow-hidden">
              <div
                className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                style={{ width: `${stage.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <span>PIPELINE VALUE</span>
        <span className="font-bold text-[#111111]">{currentWorkspace.metrics.pipelineValue}</span>
      </div>
    </div>
  );
};
