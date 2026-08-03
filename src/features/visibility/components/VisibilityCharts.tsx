"use client";

import React from "react";
import { ChartCard } from "@/components/charts/ChartCard";
import { LineChart } from "@/components/charts/LineChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { AreaChart } from "@/components/charts/AreaChart";

// 1. Overall Visibility Trend Data (Line)
export const visibilityTrendData = [
  { week: "W1", score: 48, citations: 24 },
  { week: "W2", score: 54, citations: 31 },
  { week: "W3", score: 58, citations: 38 },
  { week: "W4", score: 63, citations: 45 },
  { week: "W5", score: 68, citations: 52 },
  { week: "W6", score: 74, citations: 61 },
  { week: "W7", score: 78, citations: 72 },
];

// 2. Citation Distribution Data (Donut)
export const citationDistributionData = [
  { name: "ChatGPT (GPT-4o)", value: 42, color: "#18181B", share: 35 },
  { name: "Perplexity AI", value: 30, color: "#2D6A4F", share: 25 },
  { name: "Claude 3.5 Sonnet", value: 24, color: "#0369A1", share: 20 },
  { name: "Google AI Overview", value: 14, color: "#B45309", share: 12 },
  { name: "Gemini 1.5 Pro", value: 10, color: "#64748B", share: 8 },
];

// 3. Platform Comparison Data (Bar)
export const platformComparisonData = [
  { platform: "ChatGPT", score: 82, citations: 42 },
  { platform: "Claude", score: 76, citations: 24 },
  { platform: "Perplexity", score: 79, citations: 30 },
  { platform: "Gemini", score: 61, citations: 10 },
  { platform: "Google AI", score: 68, citations: 14 },
  { platform: "Google Search", score: 72, citations: 28 },
  { platform: "Reddit", score: 85, citations: 54 },
  { platform: "LinkedIn", score: 88, citations: 62 },
];

// 4. Weekly Citation Growth Data (Area)
export const weeklyGrowthData = [
  { day: "Mon", citations: 12, mentions: 8 },
  { day: "Tue", citations: 18, mentions: 12 },
  { day: "Wed", citations: 25, mentions: 19 },
  { day: "Thu", citations: 32, mentions: 24 },
  { day: "Fri", citations: 41, mentions: 31 },
  { day: "Sat", citations: 48, mentions: 36 },
  { day: "Sun", citations: 54, mentions: 42 },
];

export const VisibilityCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
      {/* 1. Overall Visibility Trend (Line) */}
      <ChartCard
        indexCode="CHART 01"
        title="Overall Visibility Trend"
        subtitle="7-week AI search score trajectory and citation compounding."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]">
            +30% COMPOUNDING
          </span>
        }
      >
        <LineChart
          data={visibilityTrendData}
          xAxisKey="week"
          series={[
            { key: "score", name: "AI Visibility Score (%)", color: "#18181B" },
            { key: "citations", name: "Indexed Citations", color: "#2D6A4F" },
          ]}
          height={240}
        />
      </ChartCard>

      {/* 2. Citation Distribution (Donut) */}
      <ChartCard
        indexCode="CHART 02"
        title="LLM Citation Share Distribution"
        subtitle="Breakdown of brand mention citations across major AI search engines."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EFEAE1] text-[#716D64]">
            120 TOTAL CITATIONS
          </span>
        }
      >
        <DonutChart
          data={citationDistributionData}
          centerLabel="CITATIONS"
          centerValue="120"
          size={170}
          innerRadius={55}
          outerRadius={80}
        />
      </ChartCard>

      {/* 3. Platform Comparison (Bar) */}
      <ChartCard
        indexCode="CHART 03"
        title="Platform Score Comparison"
        subtitle="Visibility benchmark across 8 search & LLM platforms."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
            8 PLATFORMS
          </span>
        }
      >
        <BarChart
          data={platformComparisonData}
          xAxisKey="platform"
          series={[
            { key: "score", name: "Visibility Score (%)", color: "#18181B" },
            { key: "citations", name: "Citations Count", color: "#2D6A4F" },
          ]}
          height={240}
        />
      </ChartCard>

      {/* 4. Weekly Growth (Area) */}
      <ChartCard
        indexCode="CHART 04"
        title="Weekly Citation Velocity"
        subtitle="Daily citation index and brand mention volume this week."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]">
            LIVE VELOCITY
          </span>
        }
      >
        <AreaChart
          data={weeklyGrowthData}
          xAxisKey="day"
          series={[
            { key: "citations", name: "Daily Citations", color: "#2D6A4F" },
            { key: "mentions", name: "Brand Mentions", color: "#18181B" },
          ]}
          height={240}
        />
      </ChartCard>
    </div>
  );
};
