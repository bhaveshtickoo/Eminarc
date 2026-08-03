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

export interface StackedBarSeriesConfig {
  key: string;
  name?: string;
  color?: string;
  stackId?: string;
  radius?: [number, number, number, number];
}

export interface LegacyStackedBarItem {
  label: string;
  values: {
    name: string;
    value: number;
    color: string;
  }[];
}

export interface StackedBarChartProps {
  data?: Array<Record<string, any>> | LegacyStackedBarItem[];
  xAxisKey?: string;
  series?: StackedBarSeriesConfig[];
  height?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisFormatter?: (value: number) => string;
  className?: string;
  ariaLabel?: string;
}

const defaultStackedColors = ["#18181B", "#2D6A4F", "#B45309", "#0369A1", "#64748B"];

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data = [],
  xAxisKey = "day",
  series,
  height = 260,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  yAxisFormatter,
  className,
  ariaLabel = "Stacked bar chart visualization",
}) => {
  // Check if data is using legacy format: Array<{ label, values: [{ name, value, color }] }>
  const isLegacyFormat =
    Array.isArray(data) && data.length > 0 && "values" in (data[0] as any);

  if (isLegacyFormat) {
    const legacyData = data as LegacyStackedBarItem[];
    const legendItems = legacyData[0]?.values || [];
    const maxBarTotal = Math.max(
      ...legacyData.map((d) => d.values.reduce((acc, v) => acc + v.value, 0)),
    );

    return (
      <div className={cn("w-full space-y-4 select-none", className)} role="img" aria-label={ariaLabel}>
        {showLegend && (
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {legendItems.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-[#18181B]">{item.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between gap-2.5 pt-2" style={{ height }}>
          {legacyData.map((bar, idx) => {
            const totalVal = bar.values.reduce((acc, v) => acc + v.value, 0);
            const barHeightPct = (totalVal / (maxBarTotal || 1)) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className="font-mono text-[9px] text-[#716D64] opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-bold">
                  {totalVal}
                </span>

                <div
                  className="w-full max-w-[40px] rounded-lg overflow-hidden flex flex-col-reverse bg-[#E5E0D6]/40"
                  style={{ height: `${barHeightPct}%` }}
                >
                  {bar.values.map((v, vIdx) => {
                    const subPct = (v.value / (totalVal || 1)) * 100;
                    return (
                      <div
                        key={vIdx}
                        className="w-full transition-all hover:opacity-80"
                        style={{
                          height: `${subPct}%`,
                          backgroundColor: v.color,
                        }}
                        title={`${v.name}: ${v.value}`}
                      />
                    );
                  })}
                </div>

                <span className="font-mono text-[10px] text-[#716D64] mt-2 font-medium">
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Recharts Object Data Format
  const objectData = data as Array<Record<string, any>>;
  const seriesConfig: StackedBarSeriesConfig[] =
    series ||
    (objectData[0]
      ? Object.keys(objectData[0])
          .filter((k) => k !== xAxisKey)
          .map((key, idx) => ({
            key,
            name: key.toUpperCase(),
            color: defaultStackedColors[idx % defaultStackedColors.length],
            stackId: "a",
          }))
      : []);

  return (
    <div className={cn("w-full space-y-3 select-none", className)} role="img" aria-label={ariaLabel}>
      {showLegend && (
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {seriesConfig.map((s, idx) => (
            <div key={s.key} className="flex items-center space-x-2">
              <span
                className="h-2.5 w-2.5 rounded"
                style={{ backgroundColor: s.color || defaultStackedColors[idx % defaultStackedColors.length] }}
              />
              <span className="font-medium text-[#18181B]">{s.name || s.key}</span>
            </div>
          ))}
        </div>
      )}

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={objectData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            barGap={2}
          >
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
            {seriesConfig.map((s, idx) => {
              const color = s.color || defaultStackedColors[idx % defaultStackedColors.length];
              const isLast = idx === seriesConfig.length - 1;
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.name || s.key}
                  stackId={s.stackId || "a"}
                  fill={color}
                  radius={s.radius || (isLast ? [4, 4, 0, 0] : [0, 0, 0, 0])}
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
