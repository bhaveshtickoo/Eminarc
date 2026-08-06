"use client";

import React from "react";
import { Clock, CheckCircle2, Database } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export const StatusCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
          RESEARCH TELEMETRY
        </span>
        <span className="inline-flex items-center font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          <span>ACTIVE KNOWLEDGE</span>
        </span>
      </div>

      <div className="space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
          <span className="text-[#716D64] flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-[#716D64]" />
            Generated:
          </span>
          <span className="font-bold text-[#111111]">Just Now (Live)</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
          <span className="text-[#716D64] flex items-center">
            <Database className="h-3.5 w-3.5 mr-1.5 text-[#716D64]" />
            Knowledge Base:
          </span>
          <span className="font-bold text-[#2D6A4F]">10 Entities Bound</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FBF9F5] border border-[#E5E0D6] text-[11px] font-sans text-[#716D64]">
          Workspace <strong className="text-[#111111]">{currentWorkspace.name}</strong> research
          intelligence active and synchronized across all growth modules.
        </div>
      </div>
    </div>
  );
};
