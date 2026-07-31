'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/hooks/useWorkspace';

export const AnalyticsChart: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [activeMetric, setActiveMetric] = useState<'visibility' | 'traffic' | 'leads'>('visibility');

  // Chart dataset for Week 25 -> Week 31
  const weeks = ['W25', 'W26', 'W27', 'W28', 'W29', 'W30', 'W31'];

  const metricsData = {
    visibility: [42, 48, 52, 55, 58, 60, currentWorkspace.metrics.aiVisibility],
    traffic: [1200, 1450, 1600, 1900, 2100, 2400, 2850],
    leads: [3, 4, 6, 7, 9, 10, currentWorkspace.weeklyGoal.currentCount],
  };

  const currentData = metricsData[activeMetric];

  // SVG Chart Dimensions
  const svgWidth = 500;
  const svgHeight = 180;
  const padding = 25;

  const minVal = Math.min(...currentData) * 0.85;
  const maxVal = Math.max(...currentData) * 1.1;

  const points = currentData
    .map((val, idx) => {
      const x = padding + (idx * (svgWidth - 2 * padding)) / (weeks.length - 1);
      const y = svgHeight - padding - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 2 * padding);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              ANALYTICS / VELOCITY
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              LIVE STREAM
            </span>
          </div>

          <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
            Growth & AI Visibility Analytics
          </h3>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Weekly citation trends & acquisition pacing for {currentWorkspace.name}.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl shrink-0 self-start sm:self-auto select-none">
          <button
            type="button"
            onClick={() => setActiveMetric('visibility')}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'visibility'
                ? 'bg-[#000000] text-[#FFFFFF] font-bold'
                : 'text-[#716D64] hover:bg-[#F7F4EE]'
            }`}
          >
            AI Visibility
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('traffic')}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'traffic'
                ? 'bg-[#000000] text-[#FFFFFF] font-bold'
                : 'text-[#716D64] hover:bg-[#F7F4EE]'
            }`}
          >
            Traffic
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('leads')}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'leads'
                ? 'bg-[#000000] text-[#FFFFFF] font-bold'
                : 'text-[#716D64] hover:bg-[#F7F4EE]'
            }`}
          >
            Leads
          </button>
        </div>
      </div>

      {/* SVG Line Graph */}
      <div className="relative w-full overflow-hidden pt-2">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {/* Subtle Grid Lines */}
          {[0, 0.33, 0.66, 1].map((pct, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + pct * (svgHeight - 2 * padding)}
              x2={svgWidth - padding}
              y2={padding + pct * (svgHeight - 2 * padding)}
              stroke="rgba(0,0,0,0.05)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Sparkline Curve Area Gradient */}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#18181B" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <polygon
            points={`${padding},${svgHeight - padding} ${points} ${svgWidth - padding},${
              svgHeight - padding
            }`}
            fill="url(#chartGrad)"
          />

          {/* Trend Polyline */}
          <polyline
            fill="none"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Nodes */}
          {currentData.map((val, idx) => {
            const x = padding + (idx * (svgWidth - 2 * padding)) / (weeks.length - 1);
            const y =
              svgHeight - padding - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 2 * padding);

            return (
              <g key={idx} className="group">
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#18181B"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-150 cursor-pointer"
                />
              </g>
            );
          })}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between px-3 pt-3 border-t border-[rgba(0,0,0,0.06)] font-mono text-[10px] text-[#716D64]">
          {weeks.map((w, idx) => (
            <span key={w} className="font-medium">
              {w} ({currentData[idx]}
              {activeMetric === 'visibility' ? '%' : ''})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
