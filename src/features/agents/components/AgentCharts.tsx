"use client";

import React from "react";
import { ChartCard } from "@/components/charts/ChartCard";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { LineChart } from "@/components/charts/LineChart";
import { AreaChart } from "@/components/charts/AreaChart";

// 1. Tasks Completed Data (Bar)
export const tasksCompletedData = [
  { agent: "Research", tasks: 142 },
  { agent: "Content", tasks: 128 },
  { agent: "Visibility", tasks: 94 },
  { agent: "CRM", tasks: 116 },
  { agent: "Distribution", tasks: 88 },
  { agent: "Analytics", tasks: 76 },
  { agent: "Weekly Rev", tasks: 45 },
];

// 2. Agent Usage Data (Donut)
export const agentUsageData = [
  { name: "Founder Research", value: 30, color: "#18181B", share: 30 },
  { name: "Content Strategist", value: 25, color: "#2D6A4F", share: 25 },
  { name: "AI Visibility Agent", value: 20, color: "#0369A1", share: 20 },
  { name: "CRM Assistant", value: 15, color: "#B45309", share: 15 },
  { name: "Distribution Agent", value: 10, color: "#64748B", share: 10 },
];

// 3. Success Rate Data (Line)
export const successRateData = [
  { week: "W1", success: 94 },
  { week: "W2", success: 96 },
  { week: "W3", success: 95 },
  { week: "W4", success: 98 },
  { week: "W5", success: 97 },
  { week: "W6", success: 99 },
];

// 4. Execution Trend Data (Area)
export const executionTrendData = [
  { day: "Mon", executions: 24 },
  { day: "Tue", executions: 38 },
  { day: "Wed", executions: 42 },
  { day: "Thu", executions: 56 },
  { day: "Fri", executions: 64 },
  { day: "Sat", executions: 48 },
  { day: "Sun", executions: 52 },
];

export const AgentCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
      {/* 1. Tasks Completed (Bar) */}
      <ChartCard
        indexCode="CHART 01"
        title="Tasks Completed Per Agent"
        subtitle="Total autonomous task resolutions logged across the 7 agents."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]">
            689 TOTAL TASKS
          </span>
        }
      >
        <BarChart
          data={tasksCompletedData}
          xAxisKey="agent"
          series={[{ key: "tasks", name: "Tasks Completed", color: "#18181B" }]}
          height={230}
        />
      </ChartCard>

      {/* 2. Agent Usage (Donut) */}
      <ChartCard
        indexCode="CHART 02"
        title="Agent Usage Distribution"
        subtitle="Share of execution compute spent per specialized agent."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#EFEAE1] text-[#716D64]">
            7 AGENTS ACTIVE
          </span>
        }
      >
        <DonutChart
          data={agentUsageData}
          centerLabel="AGENTS"
          centerValue="7 Active"
          size={165}
          innerRadius={52}
          outerRadius={76}
        />
      </ChartCard>

      {/* 3. Success Rate (Line) */}
      <ChartCard
        indexCode="CHART 03"
        title="Agent Success Rate Trajectory"
        subtitle="Historical reliability score across autonomous execution cycles."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
            98.4% AVERAGE
          </span>
        }
      >
        <LineChart
          data={successRateData}
          xAxisKey="week"
          series={[{ key: "success", name: "Success Rate (%)", color: "#2D6A4F" }]}
          height={230}
        />
      </ChartCard>

      {/* 4. Execution Trend (Area) */}
      <ChartCard
        indexCode="CHART 04"
        title="Daily Execution Volume"
        subtitle="Daily agent run velocity and background workflow triggers."
        badge={
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]">
            VELOCITY HIGH
          </span>
        }
      >
        <AreaChart
          data={executionTrendData}
          xAxisKey="day"
          series={[{ key: "executions", name: "Daily Executions", color: "#18181B" }]}
          height={230}
        />
      </ChartCard>
    </div>
  );
};
