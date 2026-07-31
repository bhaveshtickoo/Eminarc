'use client';

import React from 'react';

export interface StackedBarItem {
  label: string;
  values: {
    name: string;
    value: number;
    color: string;
  }[];
}

export interface StackedBarChartProps {
  data: StackedBarItem[];
  height?: number;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  height = 180,
}) => {
  // Extract legend names from first item
  const legendItems = data[0]?.values || [];
  const maxBarTotal = Math.max(
    ...data.map((d) => d.values.reduce((acc, v) => acc + v.value, 0))
  );

  return (
    <div className="w-full space-y-4 select-none">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium text-[#18181B]">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Bars Stack */}
      <div className="flex items-end justify-between gap-2.5 pt-2" style={{ height }}>
        {data.map((bar, idx) => {
          const totalVal = bar.values.reduce((acc, v) => acc + v.value, 0);
          const barHeightPct = (totalVal / (maxBarTotal || 1)) * 100;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              {/* Tooltip value on hover */}
              <span className="font-mono text-[9px] text-[#716D64] opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-bold">
                {totalVal}
              </span>

              {/* Stacked Pillar Container */}
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

              {/* X Label */}
              <span className="font-mono text-[10px] text-[#716D64] mt-2 font-medium">
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
