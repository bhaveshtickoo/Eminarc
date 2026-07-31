'use client';

import React from 'react';

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
  formattedValue?: string;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  centerLabel = 'TOTAL',
  centerValue,
  size = 180,
}) => {
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  const displayCenterVal = centerValue || total.toLocaleString();

  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 select-none">
      {/* SVG Donut */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {segments.map((seg, idx) => {
            const pct = seg.value / (total || 1);
            const dashArray = `${pct * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += pct * circumference;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
        </svg>

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

      {/* Segment Legend */}
      <div className="space-y-2 flex-1 w-full min-w-[160px]">
        {segments.map((seg, idx) => {
          const pct = Math.round((seg.value / (total || 1)) * 100);

          return (
            <div key={idx} className="flex items-center justify-between text-xs font-sans">
              <div className="flex items-center space-x-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="font-medium text-[#18181B] truncate">{seg.label}</span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-[10px] shrink-0 ml-2">
                <span className="font-bold text-[#111111]">
                  {seg.formattedValue || seg.value}
                </span>
                <span className="text-[#716D64]">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
