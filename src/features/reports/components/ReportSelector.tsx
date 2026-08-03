"use client";

import React from "react";
import { FileText, Calendar, BarChart3, Target, Eye, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReportOption {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const reportsList: ReportOption[] = [
  { id: "rep-weekly", name: "Weekly Growth Report", category: "Weekly Cadence", icon: Calendar },
  { id: "rep-monthly", name: "Monthly Executive Report", category: "Board Brief", icon: FileText },
  { id: "rep-content", name: "Content Performance", category: "Editorial OS", icon: BarChart3 },
  { id: "rep-crm", name: "CRM Report", category: "Revenue Pipeline", icon: Target },
  { id: "rep-visibility", name: "AI Visibility Report", category: "GEO Radar", icon: Eye },
  { id: "rep-competitor", name: "Competitor Report", category: "Market Share", icon: Users },
];

export interface ReportSelectorProps {
  selectedReportId: string;
  onSelectReport: (id: string) => void;
}

export const ReportSelector: React.FC<ReportSelectorProps> = ({
  selectedReportId,
  onSelectReport,
}) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-1 select-none font-mono text-xs border-b border-[#E5E0D6]">
      {reportsList.map((r) => {
        const Icon = r.icon;
        const isSelected = selectedReportId === r.id;

        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectReport(r.id)}
            className={cn(
              "flex items-center space-x-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer shrink-0 font-medium",
              isSelected
                ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{r.name}</span>
          </button>
        );
      })}
    </div>
  );
};
