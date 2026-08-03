"use client";

import React from "react";
import {
  Building2,
  User,
  DollarSign,
  Sparkles,
  ArrowRight,
  GripVertical,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DealCardData {
  id: string;
  company: string;
  contact: string;
  role: string;
  dealValue: number; // e.g. 24000
  aiScore: number; // e.g. 94
  priority: "High" | "Medium" | "Low";
  stage: "Lead" | "Qualified" | "Discovery" | "Proposal" | "Negotiation" | "Won" | "Lost";
  owner: string;
  nextAction: string;
}

export interface DealCardProps {
  deal: DealCardData;
  onSelect?: ((deal: DealCardData) => void) | undefined;
}

export const priorityStyles: Record<string, string> = {
  High: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
  Medium: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Low: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
};

export const DealCard: React.FC<DealCardProps> = ({ deal, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(deal)}
      className="group rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5 space-y-2.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-150 hover:border-[#18181B] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.04)] cursor-pointer select-none"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 min-w-0">
          <GripVertical className="h-3.5 w-3.5 text-[#A19B8E] shrink-0" />
          <Building2 className="h-3.5 w-3.5 text-[#18181B] shrink-0" />
          <h4 className="font-sans font-bold text-xs text-[#111111] truncate">
            {deal.company}
          </h4>
        </div>

        <span
          className={cn(
            "font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold border shrink-0",
            priorityStyles[deal.priority],
          )}
        >
          {deal.priority}
        </span>
      </div>

      {/* Contact & Deal Value */}
      <div className="space-y-1 font-sans text-xs">
        <p className="text-[#716D64] text-[11px] flex items-center">
          <User className="h-3 w-3 mr-1 text-[#18181B]" />
          {deal.contact} ({deal.role})
        </p>

        <div className="flex items-center justify-between font-mono pt-1">
          <span className="font-bold text-[#111111] text-sm">
            ${deal.dealValue.toLocaleString()}
          </span>

          <span className="flex items-center space-x-1 text-[10px] text-[#0369A1] bg-[#E0F2FE] px-1.5 py-0.5 rounded font-bold border border-[#BAE6FD]">
            <Sparkles className="h-3 w-3 text-[#0369A1]" />
            <span>AI: {deal.aiScore}%</span>
          </span>
        </div>
      </div>

      {/* Next Action & Owner */}
      <div className="pt-2 border-t border-[rgba(0,0,0,0.05)] font-mono text-[9px] text-[#716D64] flex items-center justify-between">
        <span className="truncate pr-1">Next: <strong className="text-[#18181B]">{deal.nextAction}</strong></span>
        <span className="bg-[#EFEAE1] px-1.5 py-0.5 rounded text-[#18181B] font-bold shrink-0">
          {deal.owner.split(" ")[0]}
        </span>
      </div>
    </div>
  );
};
