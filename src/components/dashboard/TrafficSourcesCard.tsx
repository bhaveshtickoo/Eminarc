'use client';

import React from 'react';
import { PieChart, Globe, Eye, Share2, Compass } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

export interface TrafficSourceItem {
  name: string;
  pct: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TrafficSourcesCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const sources: TrafficSourceItem[] = [
    { name: 'LLM Search Engines', pct: 42, color: 'bg-[#18181B]', icon: Eye },
    { name: 'Organic Search', pct: 28, color: 'bg-[#2D6A4F]', icon: Globe },
    { name: 'Direct & Referral', pct: 18, color: 'bg-[#B45309]', icon: Compass },
    { name: 'Social & Founder Brand', pct: 12, color: 'bg-[#64748B]', icon: Share2 },
  ];

  return (
    <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <PieChart className="h-4 w-4 text-[#18181B]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              ACQUISITION CHANNELS
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0] font-bold">
            LLM TOP SHARE
          </span>
        </div>

        <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
          Traffic & Citation Sources
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
          Inbound traffic distribution for {currentWorkspace.name}.
        </p>
      </div>

      <div className="space-y-3 my-4">
        {sources.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-sans">
                <div className="flex items-center space-x-2">
                  <Icon className="h-3.5 w-3.5 text-[#716D64]" />
                  <span className="font-semibold text-[#18181B]">{item.name}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-[#111111]">
                  {item.pct}%
                </span>
              </div>

              {/* Meter Bar */}
              <div className="h-2 w-full bg-[#E5E0D6]/60 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <span>LLM CITATION SHARE</span>
        <span className="font-bold text-[#2D6A4F]">#1 CHANNEL (42%)</span>
      </div>
    </div>
  );
};
