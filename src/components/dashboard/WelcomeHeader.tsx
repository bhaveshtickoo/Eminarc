'use client';

import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { useWorkspace } from '../workspace/WorkspaceContextProvider';

export const WelcomeHeader: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Welcome Greeting Banner */}
      <div className="lg:col-span-2 flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 md:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)]">
        <div>
          <div className="flex items-center space-x-2.5 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              WORKSPACES / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="flex items-center text-xs font-mono text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full font-medium border border-[#C8E4D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] mr-1.5 animate-pulse" />
              {currentWorkspace.status.toUpperCase()}
            </span>
          </div>

          <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#111111] leading-[1.05]">
            Good Morning, <span className="text-[#18181B]">Pratyush</span> 👋
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#716D64] mt-2 font-normal">
            &quot;Here&apos;s what&apos;s happening with {currentWorkspace.name} today.&quot;
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#716D64]">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-3.5 w-3.5 text-[#B45309]" />
            <span>AI Partner active — {currentWorkspace.industry} engine online</span>
          </div>
          <span className="hidden sm:inline">PIPELINE: {currentWorkspace.pipelineValue}</span>
        </div>
      </div>

      {/* Weekly Goal Progress Card */}
      <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)]">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
                MILESTONE
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#FDE68A]">
                WEEK 31
              </span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF]">
              <Target className="h-4 w-4" />
            </div>
          </div>

          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#716D64]">
            Weekly Goal ({currentWorkspace.name})
          </h3>
          <p className="font-sans text-lg font-bold text-[#111111] tracking-tight mt-1">
            Generate 12 Qualified Leads
          </p>
        </div>

        {/* Goal Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[rgba(0,0,0,0.06)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#716D64]">8 / 12 Leads Acquired</span>
            <span className="font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              68%
            </span>
          </div>
          <ProgressBar progress={68} barColor="bg-[#000000]" heightClass="h-2.5" />
          <p className="font-mono text-[10px] text-[#716D64] pt-1">
            TARGET MARKET: {currentWorkspace.targetMarket}
          </p>
        </div>
      </div>
    </div>
  );
};
