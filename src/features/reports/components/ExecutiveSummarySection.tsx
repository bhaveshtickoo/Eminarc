"use client";

import React from "react";
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { cn } from "@/lib/utils";

export interface ConsultingReportData {
  summary: string;
  keyWins: string[];
  risks: Array<{ title: string; severity: "High" | "Medium" | "Low"; mitigation: string }>;
  opportunities: Array<{ title: string; impact: string; effort: string }>;
  recommendations: Array<{ priority: string; title: string; action: string }>;
  nextWeekPriorities: string[];
}

export interface ExecutiveSummarySectionProps {
  data: ConsultingReportData;
}

export const severityBadges: Record<string, string> = {
  High: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
  Medium: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Low: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
};

export const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({ data }) => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="space-y-6 select-none">
      {/* 1. Executive Summary */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(0,0,0,0.06)]">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <Compass className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
            SECTION 01 / EXECUTIVE SUMMARY
          </span>
          <span className="font-mono text-[9px] bg-[#EFEAE1] px-2 py-0.5 rounded font-bold text-[#716D64]">
            STRATEGIC BRIEF
          </span>
        </div>

        <p className="font-serif text-sm md:text-base text-[#18181B] leading-relaxed italic font-medium">
          &quot;{data.summary}&quot;
        </p>

        <p className="font-sans text-xs text-[#52525B] leading-normal">
          This analysis synthesizes multi-channel telemetry for {currentWorkspace.name}, evaluating brand messaging alignment, generative engine visibility (GEO), and pipeline velocity.
        </p>
      </div>

      {/* 2 Grid Columns: Key Wins & Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Key Wins */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-[#2D6A4F]" />
              SECTION 02 / KEY WINS & MILESTONES
            </span>
            <span className="font-mono text-[9px] bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded font-bold border border-[#C8E4D0]">
              VERIFIED WINS
            </span>
          </div>

          <div className="space-y-2">
            {data.keyWins.map((win, idx) => (
              <div key={idx} className="flex items-start space-x-2 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs">
                <CheckCircle2 className="h-4 w-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span className="font-sans font-medium text-[#111111] leading-relaxed">{win}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment Matrix */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-[#B45309]" />
              SECTION 03 / RISK ASSESSMENT MATRIX
            </span>
            <span className="font-mono text-[9px] bg-[#FEF3C7] text-[#78350F] px-2 py-0.5 rounded font-bold border border-[#FDE68A]">
              RISK AUDIT
            </span>
          </div>

          <div className="space-y-2">
            {data.risks.map((risk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#111111]">{risk.title}</h4>
                  <span
                    className={cn(
                      "font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold border",
                      severityBadges[risk.severity],
                    )}
                  >
                    {risk.severity} RISK
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#716D64]">Mitigation: {risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Grid Columns: Opportunities, Recommended Actions, Next Week Priorities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Growth Opportunities */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase block pb-2 border-b border-[rgba(0,0,0,0.06)]">
            SECTION 04 / GROWTH LEVERS
          </span>
          <div className="space-y-2">
            {data.opportunities.map((opp, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs space-y-1">
                <strong className="text-[#111111] block">{opp.title}</strong>
                <div className="flex justify-between font-mono text-[9px] text-[#716D64] pt-1">
                  <span>Impact: <strong className="text-[#2D6A4F]">{opp.impact}</strong></span>
                  <span>Effort: <strong>{opp.effort}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase block pb-2 border-b border-[rgba(0,0,0,0.06)]">
            SECTION 05 / RECOMMENDED ACTIONS
          </span>
          <div className="space-y-2">
            {data.recommendations.map((rec, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs space-y-1">
                <span className="font-mono text-[9px] uppercase font-bold text-[#0369A1] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD] inline-block mb-1">
                  {rec.priority}
                </span>
                <strong className="text-[#111111] block">{rec.title}</strong>
                <p className="text-[#716D64] text-[11px]">{rec.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Week Priorities */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase block pb-2 border-b border-[rgba(0,0,0,0.06)]">
            SECTION 06 / NEXT WEEK PRIORITIES
          </span>
          <div className="space-y-2">
            {data.nextWeekPriorities.map((prio, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex items-center space-x-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-[#2D6A4F]">0{idx + 1}</span>
                <span className="font-bold text-[#111111]">{prio}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
