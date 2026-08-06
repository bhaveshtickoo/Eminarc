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
  size = 140,
  innerRadius = 44,
  outerRadius = 65,
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
      className={cn(
        "flex flex-col sm:flex-row items-center gap-3 select-none w-full min-w-0 overflow-hidden",
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Recharts Donut Canvas */}
      <div className="relative shrink-0 mx-auto sm:mx-0" style={{ width: size, height: size }}>
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
              paddingAngle={1.5}
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#716D64] truncate max-w-[90%]">
            {centerLabel}
          </span>
          <span className="font-sans font-bold text-sm sm:text-base text-[#111111] leading-tight truncate max-w-[90%]">
            {displayCenterVal}
          </span>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="space-y-1.5 flex-1 w-full min-w-0 overflow-hidden">
          {chartData.map((seg, idx) => {
            const labelText = seg.label || seg.name || `Segment ${idx + 1}`;
            const pct =
              seg.share !== undefined
                ? seg.share
                : Math.round(((seg.value || 0) / (total || 1)) * 100);
            const color = seg.color || defaultDonutColors[idx % defaultDonutColors.length];

            return (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] font-sans gap-1.5 min-w-0"
              >
                <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-medium text-[#18181B] truncate" title={labelText}>
                    {labelText}
                  </span>
                </div>
                <div className="flex items-center space-x-1 font-mono text-[10px] shrink-0">
                  <span className="font-bold text-[#111111]">
                    {seg.formattedValue || seg.value}
                  </span>
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
