"use client";

import React from "react";
import { Users, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface CompetitorComparisonRow {
  feature: string;
  eminarc: string;
  competitorA: string; // HubSpot
  competitorB: string; // Taplio
}

export const comparisonRows: CompetitorComparisonRow[] = [
  {
    feature: "Overall AI Search Visibility Score",
    eminarc: "78% (Active)",
    competitorA: "42% (Low)",
    competitorB: "35% (Low)",
  },
  {
    feature: "ChatGPT & Claude Citation Radar",
    eminarc: "Indexed (66 Citations)",
    competitorA: "No Citation Tracking",
    competitorB: "No Citation Tracking",
  },
  {
    feature: "McKinsey Founder Research Engine",
    eminarc: "Included (10 KB Entities)",
    competitorA: "Manual CRM Setup Only",
    competitorB: "No Research Layer",
  },
  {
    feature: "1-Click Multi-Channel Repurposing",
    eminarc: "8 Channels Native",
    competitorA: "Single Channel Email",
    competitorB: "LinkedIn Only",
  },
  {
    feature: "Integrated Lead Intelligence CRM",
    eminarc: "Native Growth OS Board",
    competitorA: "Enterprise Enterprise CRM",
    competitorB: "No CRM Board",
  },
];

export const CompetitorComparison: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            BENCHMARK MATRIX
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1.5 tracking-tight flex items-center">
            <Users className="h-4 w-4 mr-2 text-[#18181B]" />
            AI Search Citation Competitor Comparison
          </h3>
        </div>

        <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
          EMINARC ADVANTAGE +43%
        </span>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E0D6] bg-[#FFFFFF]">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-[#E5E0D6] bg-[#FBF9F5] font-mono text-[10px] uppercase text-[#716D64]">
              <th className="py-3 px-4">Evaluation Criteria</th>
              <th className="py-3 px-4 bg-[#EDF6F0]/60 text-[#1E4620] font-bold">
                {currentWorkspace.name} (Your Company)
              </th>
              <th className="py-3 px-4">Competitor A (HubSpot)</th>
              <th className="py-3 px-4">Competitor B (Taplio)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D6]/60 text-xs">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F7F4EE]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-[#111111]">{row.feature}</td>
                <td className="py-3 px-4 bg-[#EDF6F0]/30 font-bold text-[#2D6A4F]">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#2D6A4F] shrink-0" />
                    <span>{row.eminarc}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#716D64]">
                  <div className="flex items-center space-x-1.5">
                    <XCircle className="h-3.5 w-3.5 text-[#A19B8E] shrink-0" />
                    <span>{row.competitorA}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#716D64]">
                  <div className="flex items-center space-x-1.5">
                    <XCircle className="h-3.5 w-3.5 text-[#A19B8E] shrink-0" />
                    <span>{row.competitorB}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
