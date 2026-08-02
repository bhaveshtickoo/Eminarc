"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export interface LineSeriesConfig {
  key: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean | object;
}

export interface LineChartProps {
  data: Array<Record<string, any>>;
  xAxisKey: string;
  series: LineSeriesConfig[];
  height?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisFormatter?: (value: number) => string;
  className?: string;
  ariaLabel?: string;
}

export const defaultColors = [
  "#18181B", // Primary Ink / Charcoal
  "#2D6A4F", // Forest Green / Accent
  "#B45309", // Warm Amber
  "#0369A1", // Slate Blue
  "#64748B", // Muted Slate
];

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 260,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  yAxisFormatter,
  className,
  ariaLabel = "Line chart visualization",
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
                style={{ backgroundColor: s.color || defaultColors[idx % defaultColors.length] }}
              />
              <span className="font-medium text-[#18181B]">{s.name || s.key}</span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Canvas */}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
              const color = s.color || defaultColors[idx % defaultColors.length];
              return (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name || s.key}
                  stroke={color}
                  strokeWidth={s.strokeWidth || 2}
                  isAnimationActive={false}
                  dot={
                    s.dot !== undefined
                      ? s.dot
                      : { r: 3, strokeWidth: 0, fill: color }
                  }
                  activeDot={{ r: 5, fill: color }}
                />
              );
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
