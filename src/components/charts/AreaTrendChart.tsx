"use client";

import React from "react";

export interface AreaTrendSeries {
  name: string;
  data: number[];
  color: string;
}

export interface AreaTrendChartProps {
  labels: string[];
  series: AreaTrendSeries[];
  height?: number;
  showGrid?: boolean;
}

export const AreaTrendChart: React.FC<AreaTrendChartProps> = ({
  labels,
  series,
  height = 200,
  showGrid = true,
}) => {
  const svgWidth = 600;
  const svgHeight = height;
  const paddingX = 40;
  const paddingY = 25;

  // Flatten all values to compute Y domain
  const allValues = series.flatMap((s) => s.data);
  const minVal = Math.min(...allValues) * 0.9;
  const maxVal = Math.max(...allValues) * 1.1 || 100;

  const pointsForSeries = (data: number[]) => {
    return data.map((val, idx) => {
      const x = paddingX + (idx * (svgWidth - 2 * paddingX)) / (labels.length - 1);
      const y =
        svgHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 2 * paddingY);
      return { x, y, val };
    });
  };

  return (
    <div className="w-full space-y-3 select-none">
      {/* Legend Header */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        {series.map((s, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-medium text-[#18181B]">{s.name}</span>
          </div>
        ))}
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          {showGrid &&
            [0, 0.33, 0.66, 1].map((pct, i) => (
              <line
                key={i}
                x1={paddingX}
                y1={paddingY + pct * (svgHeight - 2 * paddingY)}
                x2={svgWidth - paddingX}
                y2={paddingY + pct * (svgHeight - 2 * paddingY)}
                stroke="rgba(0,0,0,0.06)"
                strokeDasharray="4 4"
              />
            ))}

          {/* Series Paths */}
          {series.map((s, sIdx) => {
            const pts = pointsForSeries(s.data);
            const polylinePoints = pts.map((p) => `${p.x},${p.y}`).join(" ");
            const gradientId = `areaGrad-${sIdx}`;

            return (
              <g key={sIdx}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <polygon
                  points={`${paddingX},${svgHeight - paddingY} ${polylinePoints} ${
                    svgWidth - paddingX
                  },${svgHeight - paddingY}`}
                  fill={`url(#${gradientId})`}
                />

                {/* Line */}
                <polyline
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylinePoints}
                />

                {/* Circles */}
                {pts.map((pt, pIdx) => (
                  <circle
                    key={pIdx}
                    cx={pt.x}
                    cy={pt.y}
                    r="3.5"
                    fill="#FFFFFF"
                    stroke={s.color}
                    strokeWidth="2"
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* X Labels */}
        <div className="flex justify-between px-2 pt-2 border-t border-[rgba(0,0,0,0.06)] font-mono text-[10px] text-[#716D64]">
          {labels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
