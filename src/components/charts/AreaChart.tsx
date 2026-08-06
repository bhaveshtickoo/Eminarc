"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export interface AreaSeriesConfig {
  key: string;
  name?: string;
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}

export interface AreaChartProps {
  data: Array<Record<string, any>>;
  xAxisKey: string;
  series: AreaSeriesConfig[];
  height?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisFormatter?: (value: number) => string;
  className?: string;
  ariaLabel?: string;
}

const defaultAreaColors = ["#18181B", "#2D6A4F", "#B45309", "#0369A1", "#64748B"];

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 260,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  yAxisFormatter,
  className,
  ariaLabel = "Area chart visualization",
}) => {
  return (
    <div
      className={cn("w-full space-y-3 select-none", className)}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {series.map((s, idx) => (
            <div key={s.key} className="flex items-center space-x-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: s.color || defaultAreaColors[idx % defaultAreaColors.length],
                }}
              />
              <span className="font-medium text-[#18181B]">{s.name || s.key}</span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Canvas */}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              {series.map((s, idx) => {
                const color = s.color || defaultAreaColors[idx % defaultAreaColors.length];
                const gradId = `areaGrad-${s.key}-${idx}`;
                return (
                  <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={s.fillOpacity || 0.35} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                  </linearGradient>
                );
              })}
            </defs>

            {showGrid && <CartesianGrid stroke="#E5E0D6" strokeDasharray="3 3" vertical={false} />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#716D64", fontSize: 11, fontFamily: "monospace" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#716D64", fontSize: 11, fontFamily: "monospace" }}
              tickFormatter={
                yAxisFormatter ||
                ((v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`))
              }
            />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FCFAF7",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontFamily: "sans-serif",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              />
            )}
            {series.map((s, idx) => {
              const color = s.color || defaultAreaColors[idx % defaultAreaColors.length];
              const gradId = `areaGrad-${s.key}-${idx}`;
              return (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name || s.key}
                  stroke={color}
                  strokeWidth={s.strokeWidth || 2}
                  fill={`url(#${gradId})`}
                  isAnimationActive={false}
                />
              );
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
