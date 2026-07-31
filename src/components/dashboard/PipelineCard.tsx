import React from 'react';
import { Kanban, DollarSign } from 'lucide-react';

export interface PipelineStage {
  label: string;
  count: number;
  color: string;
  value: string;
}

export const pipelineStages: PipelineStage[] = [
  { label: 'Qualified', count: 14, color: '#18181B', value: '$6,800' },
  { label: 'Meetings', count: 6, color: '#716D64', value: '$3,200' },
  { label: 'Proposal', count: 3, color: '#B45309', value: '$1,600' },
  { label: 'Closed', count: 1, color: '#2D6A4F', value: '$800' },
];

export const PipelineCard: React.FC = () => {
  const totalCount = pipelineStages.reduce((acc, s) => acc + s.count, 0); // 24
  
  // Calculate SVG stroke-dasharray values for Donut chart
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.32

  let accumulatedPercent = 0;
  const donutSlices = pipelineStages.map((stage) => {
    const percent = stage.count / totalCount;
    const dashLength = percent * circumference;
    const spaceLength = circumference - dashLength;
    const strokeDashoffset = -accumulatedPercent * circumference;
    accumulatedPercent += percent;

    return {
      ...stage,
      dashArray: `${dashLength.toFixed(2)} ${spaceLength.toFixed(2)}`,
      dashOffset: strokeDashoffset.toFixed(2),
    };
  });

  return (
    <div className="flex flex-col justify-between h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              CRM / PIPELINE
            </span>
            <span className="font-mono text-[10px] text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              $12,400 TOTAL
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
            <Kanban className="h-4 w-4" />
          </div>
        </div>

        <h3 className="font-sans text-lg font-semibold tracking-tight text-[#111111] mb-2">
          Pipeline Overview
        </h3>

        {/* Donut Chart & Legend Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-3">
          {/* Pure SVG Donut Chart */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#E5E0D6"
                strokeWidth="12"
              />
              {/* Donut Segments */}
              {donutSlices.map((slice, idx) => (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="12"
                  strokeDasharray={slice.dashArray}
                  strokeDashoffset={slice.dashOffset}
                  className="transition-all duration-500 ease-out"
                />
              ))}
            </svg>

            {/* Donut Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-sans text-2xl font-bold text-[#111111] leading-none">
                {totalCount}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64] mt-1">
                Deals
              </span>
            </div>
          </div>

          {/* Legend Items Grid */}
          <div className="w-full space-y-2">
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-2 text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="font-sans font-medium text-[#18181B]">
                    {stage.label}
                  </span>
                </div>
                <div className="flex items-center space-x-3 font-mono">
                  <span className="font-bold text-[#111111]">{stage.count}</span>
                  <span className="text-[10px] text-[#716D64]">{stage.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3.5 w-3.5 text-[#2D6A4F]" />
          <span>AVERAGE DEAL SIZE: $516</span>
        </div>
        <span className="font-semibold text-[#18181B]">CONVERSION: 25%</span>
      </div>
    </div>
  );
};
