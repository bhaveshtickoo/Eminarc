"use client";

import React from "react";
import { TrendingUp, TrendingDown, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlatformCardData {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  visibilityScore: number; // e.g. 74
  trend: number; // e.g. 12 (means +12%)
  citationsCount: number; // e.g. 48
  lastScan: string; // e.g. "2 hours ago"
}

export interface PlatformCardProps {
  platform: PlatformCardData;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const Icon = platform.icon;
  const isPositiveTrend = platform.trend >= 0;

  return (
    <div className="group rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold shrink-0">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-[#111111] leading-tight">
              {platform.name}
            </h3>
            <span className="font-mono text-[9px] text-[#716D64] block">{platform.category}</span>
          </div>
        </div>

        {/* Trend Pill */}
        <span
          className={cn(
            "font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center shrink-0",
            isPositiveTrend
              ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
              : "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
          )}
        >
          {isPositiveTrend ? (
            <TrendingUp className="h-3 w-3 mr-0.5 text-[#2D6A4F]" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-0.5 text-[#EF4444]" />
          )}
          <span>{isPositiveTrend ? `+${platform.trend}%` : `${platform.trend}%`}</span>
        </span>
      </div>

      {/* Visibility Score Gauge */}
      <div className="py-2 space-y-1">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] text-[#716D64] uppercase font-bold">
            Visibility Score
          </span>
          <span className="font-sans font-bold text-2xl text-[#111111]">
            {platform.visibilityScore}%
          </span>
        </div>

        <div className="h-1.5 w-full bg-[#E5E0D6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#18181B] rounded-full transition-all duration-500"
            style={{ width: `${platform.visibilityScore}%` }}
          />
        </div>
      </div>

      {/* Citations & Last Scan Footer */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-[rgba(0,0,0,0.06)] font-mono text-[10px] text-[#716D64]">
        <span className="font-bold text-[#18181B]">
          {platform.citationsCount} Citations Indexed
        </span>
        <span className="flex items-center">
          <Clock className="h-3 w-3 mr-1 text-[#716D64]" />
          {platform.lastScan}
        </span>
      </div>
    </div>
  );
};
