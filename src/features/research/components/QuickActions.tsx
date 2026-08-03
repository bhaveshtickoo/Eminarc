"use client";

import React, { useState } from "react";
import { Sparkles, Target, Save, FileDown, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const QuickActions: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const actions = [
    {
      id: "gen-strategy",
      label: "Generate Content Strategy",
      icon: Sparkles,
      onClick: () => {
        toast.success("Content Strategy Generated", {
          description: "Created 4-week editorial calendar from research knowledge base.",
        });
      },
      primary: true,
    },
    {
      id: "create-icp",
      label: "Create ICP Definition",
      icon: Target,
      onClick: () => {
        toast.success("ICP Created in Leads Engine", {
          description: "Target account parameters saved to lead intelligence board.",
        });
      },
    },
    {
      id: "save-ws",
      label: saved ? "Saved to Workspace!" : "Save to Workspace",
      icon: saved ? Check : Save,
      onClick: () => {
        setSaved(true);
        toast.success("Research Saved to Workspace Knowledge Base");
        setTimeout(() => setSaved(false), 2000);
      },
      highlight: saved,
    },
    {
      id: "export-pdf",
      label: "Export PDF Report",
      icon: FileDown,
      onClick: () => {
        toast.success("Generating McKinsey-Grade PDF Report", {
          description: "Executive PDF summary download started.",
        });
      },
    },
    {
      id: "share-report",
      label: "Share Executive Report",
      icon: Share2,
      onClick: () => {
        toast.success("Share Link Copied to Clipboard");
      },
    },
  ];

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
          QUICK ACTIONS
        </span>
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
          5 TOOLS
        </span>
      </div>

      <div className="space-y-2">
        {actions.map((act) => {
          const Icon = act.icon;

          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className={cn(
                "w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-sans font-medium transition-all duration-150 border active:scale-[0.98]",
                act.primary
                  ? "bg-[#000000] text-[#FFFFFF] border-transparent hover:bg-[#222222] shadow-sm font-bold"
                  : act.highlight
                    ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                    : "bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5]",
              )}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    act.primary
                      ? "text-[#FFFFFF]"
                      : act.highlight
                        ? "text-[#2D6A4F]"
                        : "text-[#716D64]",
                  )}
                />
                <span className="truncate">{act.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
