"use client";

import React from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface PlatformAuditorItem {
  name: string;
  citationsMonth: number;
  status: "Found" | "Missing";
}

export const AIVisibilityAuditorCards: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const auditorPlatforms: PlatformAuditorItem[] = [
    { name: "ChatGPT", citationsMonth: 12, status: "Found" },
    { name: "Claude", citationsMonth: 8, status: "Found" },
    { name: "Gemini", citationsMonth: 0, status: "Missing" },
    { name: "Perplexity", citationsMonth: 15, status: "Found" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-[#18181B]" />
          <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
            AI Visibility Auditor Status
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase text-[#716D64]">
          OVERALL CITATION SCORE: {currentWorkspace.metrics.aiVisibility}%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {auditorPlatforms.map((p) => {
          const isFound = p.status === "Found";

          return (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans font-bold text-sm text-[#111111]">{p.name}</span>
                <span
                  className={cn(
                    "font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border",
                    isFound
                      ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                      : "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
                  )}
                >
                  {p.status}
                </span>
              </div>

              <div>
                <span className="font-sans font-bold text-2xl text-[#111111]">
                  {p.citationsMonth}
                </span>
                <span className="font-mono text-[10px] text-[#716D64] block mt-0.5">
                  citations this month
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
