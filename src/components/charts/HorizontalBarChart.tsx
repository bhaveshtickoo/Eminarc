"use client";

import React from "react";

export interface HorizontalBarItem {
  label: string;
  value: number;
  formattedValue?: string;
  color?: string;
}

export interface HorizontalBarChartProps {
  data: HorizontalBarItem[];
  maxVal?: number;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data, maxVal }) => {
  const highest = maxVal || Math.max(...data.map((d) => d.value)) || 100;

  return (
    <div className="space-y-3 w-full select-none">
      {data.map((item, idx) => {
        const pct = Math.round((item.value / highest) * 100);
        const barColor = item.color || "#18181B";

        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-semibold text-[#18181B] truncate pr-2">{item.label}</span>
              <span className="font-mono text-[10px] font-bold text-[#111111] shrink-0">
                {item.formattedValue || item.value}
              </span>
            </div>

            <div className="h-2.5 w-full bg-[#E5E0D6]/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: barColor }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
