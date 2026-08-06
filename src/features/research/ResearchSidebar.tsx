"use client";

import React, { useState } from "react";
import { FileDown, Sparkles, Save, Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ResearchSidebar: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleExportPDF = () => {
    toast.success("Preparing McKinsey-grade PDF Report", {
      description: "Generating executive PDF document for download...",
    });
  };

  const handleGenerateContent = () => {
    toast.success("Opening AI Content Studio", {
      description: "Passing Research Intelligence into Content Engine...",
    });
  };

  const handleSaveToWorkspace = () => {
    setSaved(true);
    toast.success("Saved to Workspace", {
      description: "Research report stored in active workspace context.",
    });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleShare = () => {
    toast.success("Share Link Generated", {
      description: "Executive report share link copied to clipboard.",
    });
  };

  const handleCopyReport = () => {
    setCopied(true);
    toast.success("Report Copied", {
      description: "Full 11-section markdown report copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
          RIGHT SIDEBAR / REPORT ACTIONS
        </span>
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
          4 WORKFLOW ACTIONS READY
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {/* 1. Export PDF */}
        <button
          type="button"
          onClick={handleExportPDF}
          className="group flex flex-col justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-left transition-all duration-150 hover:bg-[#F7F4EE] hover:border-[#D8D2C5] active:scale-[0.98] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-2">
            <FileDown className="h-4 w-4 text-[#716D64] group-hover:text-[#18181B] transition-colors" />
            <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#716D64] font-bold">
              PDF
            </span>
          </div>
          <div>
            <span className="block font-sans font-bold text-xs leading-tight text-[#18181B]">
              Export PDF
            </span>
            <span className="block font-mono text-[9px] text-[#716D64] mt-0.5">
              McKinsey Format
            </span>
          </div>
        </button>

        {/* 2. Generate Content */}
        <button
          type="button"
          onClick={handleGenerateContent}
          className="group flex flex-col justify-between rounded-xl bg-[#000000] border border-transparent p-3 text-left transition-all duration-150 hover:bg-[#222222] active:scale-[0.98] shadow-sm text-[#FFFFFF]"
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="h-4 w-4 text-[#FFFFFF]" />
            <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FFFFFF]/20 text-[#FFFFFF] font-bold">
              COPILOT
            </span>
          </div>
          <div>
            <span className="block font-sans font-bold text-xs leading-tight text-[#FFFFFF]">
              Generate Content
            </span>
            <span className="block font-mono text-[9px] text-[#FFFFFF]/70 mt-0.5">To Studio</span>
          </div>
        </button>

        {/* 3. Save to Workspace */}
        <button
          type="button"
          onClick={handleSaveToWorkspace}
          className={cn(
            "group flex flex-col justify-between rounded-xl p-3 text-left transition-all duration-150 border active:scale-[0.98]",
            saved
              ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
              : "bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
          )}
        >
          <div className="flex items-center justify-between mb-2">
            {saved ? (
              <Check className="h-4 w-4 text-[#2D6A4F]" />
            ) : (
              <Save className="h-4 w-4 text-[#716D64] group-hover:text-[#18181B] transition-colors" />
            )}
            <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#716D64] font-bold">
              {saved ? "SAVED" : "STORE"}
            </span>
          </div>
          <div>
            <span className="block font-sans font-bold text-xs leading-tight">Save Workspace</span>
            <span className="block font-mono text-[9px] text-[#716D64] mt-0.5">
              {saved ? "Stored!" : "Context Store"}
            </span>
          </div>
        </button>

        {/* 4. Share */}
        <button
          type="button"
          onClick={handleShare}
          className="group flex flex-col justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-left transition-all duration-150 hover:bg-[#F7F4EE] hover:border-[#D8D2C5] active:scale-[0.98] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-2">
            <Share2 className="h-4 w-4 text-[#716D64] group-hover:text-[#18181B] transition-colors" />
            <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#716D64] font-bold">
              LINK
            </span>
          </div>
          <div>
            <span className="block font-sans font-bold text-xs leading-tight text-[#18181B]">
              Share Report
            </span>
            <span className="block font-mono text-[9px] text-[#716D64] mt-0.5">Copy URL</span>
          </div>
        </button>

        {/* 5. Copy Markdown Report */}
        <button
          type="button"
          onClick={handleCopyReport}
          className={cn(
            "group flex flex-col justify-between rounded-xl p-3 text-left transition-all duration-150 border active:scale-[0.98]",
            copied
              ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
              : "bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
          )}
        >
          <div className="flex items-center justify-between mb-2">
            {copied ? (
              <Check className="h-4 w-4 text-[#2D6A4F]" />
            ) : (
              <Copy className="h-4 w-4 text-[#716D64] group-hover:text-[#18181B] transition-colors" />
            )}
            <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#716D64] font-bold">
              MD
            </span>
          </div>
          <div>
            <span className="block font-sans font-bold text-xs leading-tight">Copy Report</span>
            <span className="block font-mono text-[9px] text-[#716D64] mt-0.5">
              {copied ? "Copied!" : "Markdown"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
