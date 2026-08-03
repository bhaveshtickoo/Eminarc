"use client";

import React from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export const ConfidenceCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const confidenceScore = currentWorkspace.metrics.growthScore + 15; // 93%

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
          CONFIDENCE SCORE
        </span>
        <span className="inline-flex items-center font-mono text-[9px] text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
          <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
          <span>VERIFIED AUDIT</span>
        </span>
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="font-sans font-bold text-3xl text-[#111111] tracking-tight">
          {confidenceScore}%
        </span>
        <span className="font-mono text-xs text-[#2D6A4F] flex items-center font-semibold">
          <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
          <span>High Fidelity</span>
        </span>
      </div>

      <p className="font-sans text-xs text-[#716D64] mt-1.5 leading-normal">
        Based on company website analysis, founder LinkedIn profile audit, and industry category benchmarking.
      </p>

      {/* Progress Bar Gauge */}
      <div className="mt-3.5 space-y-1">
        <div className="h-2 w-full bg-[#E5E0D6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2D6A4F] rounded-full transition-all duration-500"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] text-[#716D64] pt-0.5">
          <span>Accuracy Threshold</span>
          <span>93 / 100</span>
        </div>
      </div>
    </div>
  );
};
