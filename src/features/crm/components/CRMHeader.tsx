"use client";

import React from "react";
import { DollarSign, ShieldCheck, TrendingUp, Users, Target } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { cn } from "@/lib/utils";

export interface CRMHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const crmSections = [
  "Pipeline",
  "Companies",
  "Contacts",
  "Opportunities",
  "Tasks",
  "Meetings",
  "Timeline",
  "Notes",
  "Emails",
] as const;

export const CRMHeader: React.FC<CRMHeaderProps> = ({ activeSection, onSectionChange }) => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="space-y-4 select-none">
      {/* Top Header Banner */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              GROWTH CRM / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              KNOWLEDGE BASE LINKED
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Lead Intelligence & Growth CRM
          </h1>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Unified pipeline, founder contact records, company profiles, and engagement telemetry.
          </p>
        </div>

        {/* Header Telemetry Stat Badges */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">TOTAL PIPELINE</span>
            <strong className="text-[#2D6A4F] text-sm">$142,000</strong>
          </div>

          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">ACTIVE DEALS</span>
            <strong className="text-[#111111] text-sm">14 Accounts</strong>
          </div>

          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">WIN RATE</span>
            <strong className="text-[#0369A1] text-sm">68% Average</strong>
          </div>
        </div>
      </div>

      {/* 9 Section Navigation Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1 font-mono text-xs border-b border-[#E5E0D6]">
        {crmSections.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => onSectionChange(sec)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium shrink-0",
              activeSection === sec
                ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
            )}
          >
            {sec}
          </button>
        ))}
      </div>
    </div>
  );
};
