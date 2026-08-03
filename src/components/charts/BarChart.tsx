"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export interface BarSeriesConfig {
  key: string;
  name?: string;
  color?: string;
  radius?: [number, number, number, number];
}

export interface BarChartProps {
  data: Array<Record<string, any>>;
  xAxisKey: string;
  series: BarSeriesConfig[];
  height?: number | string;
  layout?: "horizontal" | "vertical";
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisFormatter?: (value: number) => string;
  className?: string;
  ariaLabel?: string;
}

const defaultBarColors = ["#18181B", "#2D6A4F", "#B45309", "#0369A1", "#64748B"];

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 260,
  layout = "horizontal",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  yAxisFormatter,
  className,
  ariaLabel = "Bar chart visualization",
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
                className="h-2.5 w-2.5 rounded"
                style={{ backgroundColor: s.color || defaultBarColors[idx % defaultBarColors.length] }}
              />
              <span className="font-medium text-[#18181B]">{s.name || s.key}</span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Canvas */}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            layout={layout}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            barGap={4}
          >
            {showGrid && <CartesianGrid stroke="#E5E0D6" strokeDasharray="3 3" vertical={false} />}
            <XAxis
              {...(layout === "horizontal" && xAxisKey ? { dataKey: xAxisKey } : {})}
              type={layout === "horizontal" ? "category" : "number"}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#716D64", fontSize: 11, fontFamily: "monospace" }}
            />
            <YAxis
              {...(layout === "vertical" && xAxisKey ? { dataKey: xAxisKey } : {})}
              type={layout === "vertical" ? "category" : "number"}
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
                cursor={{ fill: "#E5E0D6", opacity: 0.3 }}
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
              const color = s.color || defaultBarColors[idx % defaultBarColors.length];
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.name || s.key}
                  fill={color}
                  radius={s.radius || [4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              );
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
