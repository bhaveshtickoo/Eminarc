"use client";

import React from "react";
import { ChartCard } from "@/components/charts/ChartCard";
import { LineChart } from "@/components/charts/LineChart";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";

// 1. Revenue Trend (Line)
export const revenueData = [
  { month: "Jan", arr: 42, mrr: 12 },
  { month: "Feb", arr: 58, mrr: 16 },
  { month: "Mar", arr: 74, mrr: 21 },
  { month: "Apr", arr: 89, mrr: 26 },
  { month: "May", arr: 110, mrr: 32 },
  { month: "Jun", arr: 142, mrr: 41 },
];

// 2. Growth Trend (Area)
export const growthData = [
  { week: "W1", leads: 18, qualified: 12 },
  { week: "W2", leads: 24, qualified: 17 },
  { week: "W3", leads: 32, qualified: 22 },
  { week: "W4", leads: 41, qualified: 29 },
  { week: "W5", leads: 52, qualified: 38 },
  { week: "W6", leads: 64, qualified: 48 },
];

// 3. Visibility Trend (Line)
export const visibilityData = [
  { week: "W1", score: 48, citations: 24 },
  { week: "W2", score: 56, citations: 32 },
  { week: "W3", score: 64, citations: 42 },
  { week: "W4", score: 72, citations: 54 },
  { week: "W5", score: 78, citations: 66 },
];

// 4. Pipeline Funnel (Bar)
export const funnelData = [
  { stage: "Lead", count: 45 },
  { stage: "Qual", count: 32 },
  { stage: "Disc", count: 24 },
  { stage: "Prop", count: 18 },
  { stage: "Nego", count: 14 },
  { stage: "Won", count: 10 },
];

// 5. Traffic Sources (Donut)
export const trafficSourcesData = [
  { name: "GEO AI Search (ChatGPT & Perplexity)", value: 42, color: "#18181B", share: 38 },
  { name: "LinkedIn Founder Brand", value: 30, color: "#2D6A4F", share: 27 },
  { name: "Cold Founder Email", value: 22, color: "#0369A1", share: 20 },
  { name: "Substack / Medium", value: 16, color: "#B45309", share: 15 },
];

// 6. Content Performance (Bar)
export const contentPerfData = [
  { asset: "System OS Post", views: 14200, conversions: 14 },
  { asset: "GEO Playbook", views: 9800, conversions: 11 },
  { asset: "X Thread #4", views: 18400, conversions: 18 },
  { asset: "Newsletter #42", views: 5200, conversions: 8 },
  { asset: "Reddit AMA", views: 12600, conversions: 12 },
];

export const ReportCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 select-none">
      {/* 1. Revenue Trend (Line) */}
      <ChartCard
        indexCode="CHART 01"
        title="ARR & MRR Trajectory"
        subtitle="6-month compounding revenue growth."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]">
            $142K ARR
          </span>
        }
      >
        <LineChart
          data={revenueData}
          xAxisKey="month"
          series={[
            { key: "arr", name: "ARR ($k)", color: "#18181B" },
            { key: "mrr", name: "MRR ($k)", color: "#2D6A4F" },
          ]}
          height={200}
        />
      </ChartCard>

      {/* 2. Growth Trend (Area) */}
      <ChartCard
        indexCode="CHART 02"
        title="Weekly Lead Growth"
        subtitle="Inbound lead acquisition & qualification."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
            +48% QUALIFIED
          </span>
        }
      >
        <AreaChart
          data={growthData}
          xAxisKey="week"
          series={[
            { key: "leads", name: "Total Leads", color: "#18181B" },
            { key: "qualified", name: "Qualified Leads", color: "#2D6A4F" },
          ]}
          height={200}
        />
      </ChartCard>

      {/* 3. Visibility Trend (Line) */}
      <ChartCard
        indexCode="CHART 03"
        title="AI Search Visibility Score"
        subtitle="ChatGPT, Perplexity & Claude citation rank."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]">
            78% INDEXED
          </span>
        }
      >
        <LineChart
          data={visibilityData}
          xAxisKey="week"
          series={[
            { key: "score", name: "Visibility Score (%)", color: "#2D6A4F" },
            { key: "citations", name: "Indexed Citations", color: "#18181B" },
          ]}
          height={200}
        />
      </ChartCard>

      {/* 4. Pipeline Funnel (Bar) */}
      <ChartCard
        indexCode="CHART 04"
        title="Sales Pipeline Funnel"
        subtitle="Stage-by-stage deal volume."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]">
            14 ACTIVE DEALS
          </span>
        }
      >
        <BarChart
          data={funnelData}
          xAxisKey="stage"
          series={[{ key: "count", name: "Deals Count", color: "#18181B" }]}
          height={200}
        />
      </ChartCard>

      {/* 5. Traffic Sources (Donut) */}
      <ChartCard
        indexCode="CHART 05"
        title="Traffic Acquisition Sources"
        subtitle="Inbound channel attribution."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EFEAE1] text-[#716D64]">
            4 CHANNELS
          </span>
        }
      >
        <DonutChart
          data={trafficSourcesData}
          centerLabel="TRAFFIC"
          centerValue="100%"
          size={145}
          innerRadius={45}
          outerRadius={68}
        />
      </ChartCard>

      {/* 6. Content Performance (Bar) */}
      <ChartCard
        indexCode="CHART 06"
        title="Top Content Asset Conversions"
        subtitle="Impressions vs inbound lead conversions."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]">
            71 CONVERSIONS
          </span>
        }
      >
        <BarChart
          data={contentPerfData}
          xAxisKey="asset"
          series={[
            { key: "conversions", name: "Conversions", color: "#2D6A4F" },
          ]}
          height={200}
        />
      </ChartCard>
    </div>
  );
};
