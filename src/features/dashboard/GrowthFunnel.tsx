"use client";

import React from "react";
import { Filter } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { FunnelChart } from "@/components/charts/FunnelChart";
import { ChartCard } from "@/components/charts/ChartCard";

export const GrowthFunnel: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const funnelStages = [
    {
      label: "Brand Impressions",
      count: "42,800",
      conversion: "100%",
      pct: 100,
      color: "#18181B",
    },
    {
      label: "AI Search Citations",
      count: "14,200",
      conversion: "33.1%",
      pct: 75,
      color: "#2D6A4F",
    },
    {
      label: "Qualified Web Visits",
      count: "2,850",
      conversion: "20.1%",
      pct: 55,
      color: "#B45309",
    },
    {
      label: "Active Pipeline Opportunities",
      count: `${currentWorkspace.metrics.opportunitiesCount} Deals`,
      conversion: "0.49%",
      pct: 35,
      color: "#000000",
    },
  ];

  return (
    <ChartCard
      indexCode="GROWTH FUNNEL"
      badge={
        <div className="flex items-center space-x-1.5">
          <Filter className="h-3.5 w-3.5 text-[#18181B]" />
        </div>
      }
      headerAction={
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0] font-bold">
          CONVERSION: 4.8%
        </span>
      }
      title="Lead Funnel Velocity"
      subtitle="Impression to pipeline conversion pipeline."
      footer={
        <div className="flex items-center justify-between text-xs font-mono text-[#716D64]">
          <span>PIPELINE VALUE</span>
          <span className="font-bold text-[#111111]">{currentWorkspace.metrics.pipelineValue}</span>
        </div>
      }
      heightClass="h-full"
    >
      <FunnelChart stages={funnelStages} ariaLabel="Lead funnel velocity chart" />
    </ChartCard>
  );
};
