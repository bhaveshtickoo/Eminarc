"use client";

import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

export interface DonutSegment {
  label?: string;
  name?: string;
  value: number;
  color?: string;
  share?: number;
  formattedValue?: string;
}

export interface DonutChartProps {
  segments?: DonutSegment[];
  data?: DonutSegment[];
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  ariaLabel?: string;
}

const defaultDonutColors = ["#18181B", "#2D6A4F", "#B45309", "#0369A1", "#64748B"];

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  data,
  centerLabel = "TOTAL",
  centerValue,
  size = 180,
  innerRadius = 58,
  outerRadius = 88,
  showLegend = true,
  showTooltip = false,
  className,
  ariaLabel = "Donut chart visualization",
}) => {
  const chartData = segments || data || [];
  const total = chartData.reduce((acc, s) => acc + (s.value || 0), 0);
  const displayCenterVal = centerValue !== undefined ? centerValue : total.toLocaleString();

  return (
    <div
      className={cn("flex flex-col sm:flex-row items-center gap-6 select-none", className)}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Recharts Donut Canvas */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
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
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={1}
              isAnimationActive={false}
              stroke="#FCFAF7"
              strokeWidth={2}
            >
              {chartData.map((entry, idx) => {
                const color = entry.color || defaultDonutColors[idx % defaultDonutColors.length];
                return <Cell key={`cell-${idx}`} fill={color} />;
              })}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Center Label Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64]">
            {centerLabel}
          </span>
          <span className="font-sans font-bold text-lg text-[#111111] leading-tight">
            {displayCenterVal}
          </span>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="space-y-2 flex-1 w-full min-w-[160px]">
          {chartData.map((seg, idx) => {
            const labelText = seg.label || seg.name || `Segment ${idx + 1}`;
            const pct = seg.share !== undefined ? seg.share : Math.round(((seg.value || 0) / (total || 1)) * 100);
            const color = seg.color || defaultDonutColors[idx % defaultDonutColors.length];

            return (
              <div key={idx} className="flex items-center justify-between text-xs font-sans">
                <div className="flex items-center space-x-2 truncate pr-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-medium text-[#18181B] truncate">{labelText}</span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-[10px] shrink-0">
                  <span className="font-bold text-[#111111]">{seg.formattedValue || seg.value}</span>
                  <span className="text-[#716D64]">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
