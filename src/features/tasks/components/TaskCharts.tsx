"use client";

import React from "react";
import { ChartCard } from "@/components/charts/ChartCard";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { AreaChart } from "@/components/charts/AreaChart";

// 1. Task Completion Data (Bar)
export const taskCompletionData = [
  { category: "Research", completed: 42, total: 48 },
  { category: "Content OS", completed: 38, total: 40 },
  { category: "GEO Radar", completed: 24, total: 28 },
  { category: "CRM Outreach", completed: 31, total: 35 },
  { category: "Distribution", completed: 29, total: 30 },
];

// 2. Weekly Productivity Data (Line)
export const weeklyProductivityData = [
  { day: "Mon", tasks: 12 },
  { day: "Tue", tasks: 18 },
  { day: "Wed", tasks: 24 },
  { day: "Thu", tasks: 29 },
  { day: "Fri", tasks: 35 },
  { day: "Sat", tasks: 20 },
  { day: "Sun", tasks: 15 },
];

// 3. Workload Distribution Data (Donut)
export const workloadData = [
  { name: "Bhavesh Tickoo", value: 45, color: "#18181B", share: 40 },
  { name: "Pratyush", value: 35, color: "#2D6A4F", share: 31 },
  { name: "Aditya", value: 30, color: "#0369A1", share: 29 },
];

// 4. Completion Rate Data (Area)
export const completionRateData = [
  { week: "W1", rate: 82 },
  { week: "W2", rate: 88 },
  { week: "W3", rate: 91 },
  { week: "W4", rate: 94 },
  { week: "W5", rate: 96 },
];

export const TaskCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {/* 1. Task Completion (Bar) */}
      <ChartCard
        indexCode="CHART 01"
        title="Task Completion"
        subtitle="Completed vs total tasks."
      >
        <BarChart
          data={taskCompletionData}
          xAxisKey="category"
          series={[{ key: "completed", name: "Completed", color: "#18181B" }]}
          height={180}
        />
      </ChartCard>

      {/* 2. Weekly Productivity (Line) */}
      <ChartCard
        indexCode="CHART 02"
        title="Weekly Productivity"
        subtitle="Daily task execution velocity."
      >
        <LineChart
          data={weeklyProductivityData}
          xAxisKey="day"
          series={[{ key: "tasks", name: "Tasks Resolved", color: "#2D6A4F" }]}
          height={180}
        />
      </ChartCard>

      {/* 3. Workload Distribution (Donut) */}
      <ChartCard
        indexCode="CHART 03"
        title="Workload Distribution"
        subtitle="Task assignment per team owner."
      >
        <DonutChart
          data={workloadData}
          centerLabel="TASKS"
          centerValue="110"
          size={135}
          innerRadius={42}
          outerRadius={62}
        />
      </ChartCard>

      {/* 4. Completion Rate (Area) */}
      <ChartCard
        indexCode="CHART 04"
        title="Completion Rate"
        subtitle="Efficiency trajectory curve."
      >
        <AreaChart
          data={completionRateData}
          xAxisKey="week"
          series={[{ key: "rate", name: "Completion Rate (%)", color: "#0369A1" }]}
          height={180}
        />
      </ChartCard>
    </div>
  );
};
