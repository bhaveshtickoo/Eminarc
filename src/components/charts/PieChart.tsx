"use client";

import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

export interface PieItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieItem[];
  height?: number | string;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  ariaLabel?: string;
}

const defaultPieColors = ["#18181B", "#2D6A4F", "#B45309", "#0369A1", "#64748B"];

export const PieChart: React.FC<PieChartProps> = ({
  data,
  height = 260,
  innerRadius = 0,
  outerRadius = 80,
  showLegend = true,
  showTooltip = true,
  className,
  ariaLabel = "Pie chart visualization",
}) => {
  return (
    <div
      className={cn("w-full select-none", className)}
      role="img"
      aria-label={ariaLabel}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#FCFAF7",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="font-mono text-xs text-[#18181B] font-medium">{value}</span>
              )}
            />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            isAnimationActive={false}
            stroke="#FCFAF7"
            strokeWidth={2}
          >
            {data.map((entry, idx) => {
              const color = entry.color || defaultPieColors[idx % defaultPieColors.length];
              return <Cell key={`pie-cell-${idx}`} fill={color} />;
            })}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
