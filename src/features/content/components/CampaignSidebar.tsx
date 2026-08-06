"use client";

import React, { useState } from "react";
import { Layers, Target, CheckSquare, Filter, Flame, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";
import { BrandVoiceCard } from "./BrandVoiceCard";
import { ContentCalendar } from "./ContentCalendar";

export interface CampaignSidebarProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export const CampaignSidebar: React.FC<CampaignSidebarProps> = ({
  activeFilter = "All",
  onFilterChange,
}) => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;
  const metrics = currentWorkspace.metrics;

  const filters = ["All", "Drafts", "Scheduled", "Published"];

  return (
    <div className="flex flex-col space-y-5 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      {/* Header */}
      <div>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
          STRATEGY & CAMPAIGNS
        </span>
        <h3 className="font-sans font-bold text-xl text-[#111111] mt-2 tracking-tight">
          Editorial Strategy
        </h3>
        <p className="font-sans text-xs text-[#52525B] mt-0.5">
          Knowledge Base powered campaign hub.
        </p>
      </div>

      {/* 1. Current Campaign */}
      <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
            ACTIVE CAMPAIGN
          </span>
          <span className="font-mono text-[9px] text-[#716D64]">Q3 2026</span>
        </div>
        <h4 className="font-sans font-bold text-sm text-[#111111]">System Over Campaign Scale</h4>
        <p className="font-sans text-xs text-[#716D64]">
          Positioning {currentWorkspace.name} as the premier AI Growth Operating System.
        </p>
      </div>

      {/* 2. Content Pillars (from KB) */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase font-bold text-[#716D64] flex items-center">
          <Layers className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
          CONTENT PILLARS
        </span>
        <div className="space-y-1.5">
          {kb.messaging.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-sans"
            >
              <span className="font-mono text-[9px] font-bold text-[#2D6A4F] block">
                0{idx + 1}. {pillar.title.toUpperCase()}
              </span>
              <span className="text-[#18181B] font-medium leading-tight block mt-0.5">
                {pillar.hook}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Brand Voice Card */}
      <BrandVoiceCard />

      {/* 4. Target Audience (from KB) */}
      <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1 text-xs font-sans">
        <span className="font-mono text-[9px] uppercase font-bold text-[#716D64] flex items-center">
          <Globe className="h-3.5 w-3.5 mr-1 text-[#18181B]" />
          TARGET AUDIENCE
        </span>
        <p className="font-bold text-[#111111]">{kb.idealCustomerProfile.primaryICP}</p>
        <p className="text-[#716D64] text-[11px]">Regions: {kb.targetMarkets.join(", ")}</p>
      </div>

      {/* 5. Weekly Publishing Target */}
      <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
        <div className="flex justify-between font-mono text-xs">
          <span className="text-[#716D64] font-bold">WEEKLY TARGET:</span>
          <span className="font-bold text-[#2D6A4F]">
            {metrics.contentPublishedCount} / {metrics.contentTargetCount} Published
          </span>
        </div>
        <div className="h-1.5 w-full bg-[#E5E0D6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2D6A4F] rounded-full transition-all duration-300"
            style={{
              width: `${(metrics.contentPublishedCount / metrics.contentTargetCount) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 6. Mini Content Calendar */}
      <ContentCalendar />

      {/* 7. Quick Filters */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase font-bold text-[#716D64] flex items-center">
          <Filter className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
          QUICK FILTERS
        </span>
        <div className="flex flex-wrap gap-1 font-mono text-xs">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onFilterChange?.(f)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                activeFilter === f
                  ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                  : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
