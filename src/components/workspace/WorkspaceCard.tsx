"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { useWorkspace } from "./WorkspaceContextProvider";

export interface WorkspaceCardProps {
  className?: string;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ className }) => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div
      className={cn(
        "group flex items-center justify-between rounded-2xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#18181B] hover:shadow-[0_4px_12px_-2px_rgba(26,26,26,0.04)]",
        className,
      )}
    >
      <div className="flex items-center space-x-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000000] font-sans font-extrabold text-lg text-[#FFFFFF] shadow-sm shrink-0">
          {currentWorkspace.logoLetter}
        </div>
        <div>
          <h4 className="font-sans font-bold text-sm text-[#111111]">{currentWorkspace.name}</h4>
          <p className="font-mono text-[10px] text-[#716D64] uppercase tracking-wider">
            {currentWorkspace.industry} • {currentWorkspace.targetMarket}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 font-mono text-xs">
        <div className="text-right">
          <span className="text-[10px] text-[#716D64] block">GROWTH SCORE</span>
          <span className="font-bold text-[#111111]">{currentWorkspace.metrics.growthScore}</span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-[#716D64] group-hover:text-[#18181B] transition-colors" />
      </div>
    </div>
  );
};
