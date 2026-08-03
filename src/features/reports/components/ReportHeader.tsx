"use client";

import React, { useState } from "react";
import {
  Download,
  Share2,
  Copy,
  Archive,
  Calendar,
  ShieldCheck,
  Check,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { cn } from "@/lib/utils";

export interface ReportHeaderProps {
  reportTitle: string;
  reportCategory: string;
  dateRange?: string;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  reportTitle,
  reportCategory,
  dateRange = "August 01 – August 07, 2026",
}) => {
  const { currentWorkspace } = useWorkspace();
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = () => {
    setExporting(true);
    toast.success("Generating McKinsey PDF Brief...", {
      description: "Compiling vector charts and executive summary into PDF format.",
    });
    setTimeout(() => setExporting(false), 2000);
  };

  const handleShare = () => {
    toast.success("Consulting Brief Link Copied", {
      description: "Secure share URL generated for board members and stakeholders.",
    });
  };

  const handleDuplicate = () => {
    toast.success(`Duplicated "${reportTitle}"`);
  };

  const handleArchive = () => {
    toast.success(`Archived "${reportTitle}"`);
  };

  const handleSchedule = () => {
    toast.success("Report Schedule Updated", {
      description: "Automated Monday 08:00 AM email dispatch configured.",
    });
  };

  return (
    <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-5 select-none">
      {/* Top Metadata */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              CONSULTING BRIEF / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              VERIFIED EXECUTIVE DATA
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            {reportTitle}
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Strategic consulting analysis prepared for {currentWorkspace.name} leadership team.
          </p>
        </div>

        <div className="font-mono text-xs text-right hidden sm:block">
          <span className="text-[#716D64] block">REPORT PERIOD</span>
          <span className="font-bold text-[#111111]">{dateRange}</span>
        </div>
      </div>

      {/* Action Toolbar: Export PDF, Share, Duplicate, Archive, Schedule */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#716D64]">
          <span>Category: <strong className="text-[#18181B]">{reportCategory}</strong></span>
          <span>•</span>
          <span>Status: <strong className="text-[#2D6A4F]">Published Brief</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {/* Export PDF */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            {exporting ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
            <span>{exporting ? "Exporting..." : "Export PDF"}</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-[#716D64]" />
            <span>Share</span>
          </button>

          {/* Duplicate */}
          <button
            type="button"
            onClick={handleDuplicate}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5 text-[#716D64]" />
            <span>Duplicate</span>
          </button>

          {/* Archive */}
          <button
            type="button"
            onClick={handleArchive}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#18181B] transition-colors cursor-pointer"
          >
            <Archive className="h-3.5 w-3.5" />
            <span>Archive</span>
          </button>

          {/* Schedule */}
          <button
            type="button"
            onClick={handleSchedule}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#EDF6F0] border border-[#C8E4D0] text-[#1E4620] font-bold hover:bg-[#E0F0E5] transition-colors cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-[#2D6A4F]" />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
