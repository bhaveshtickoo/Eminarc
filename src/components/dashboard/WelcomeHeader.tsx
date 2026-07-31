import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { EmptyCardPlaceholder } from '../shared/EmptyCardPlaceholder';

export const WelcomeHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Welcome Greeting Banner */}
      <div className="lg:col-span-2 flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 md:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              OVERVIEW / 001
            </span>
            <span className="flex items-center text-xs font-mono text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full font-medium border border-[#C8E4D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] mr-1.5 animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>

          <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#111111] leading-[1.05]">
            Welcome back, <span className="text-[#18181B]">Bhavesh</span>
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#716D64] mt-2 font-normal">
            &quot;What should we grow today?&quot;
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#716D64]">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-3.5 w-3.5 text-[#B45309]" />
            <span>AI Growth Partner initialized — 0 active bottlenecks detected</span>
          </div>
          <span className="hidden sm:inline">LAST SYNC: JUST NOW</span>
        </div>
      </div>

      {/* Weekly Goal Placeholder Card */}
      <EmptyCardPlaceholder
        title="Weekly Goal"
        subtitle="Current target iteration & focus milestone"
        indexCode="GOAL / W31"
        heightClass="min-h-full"
        badge={
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#FDE68A]">
            IN PROGRESS
          </span>
        }
      >
        <div className="space-y-2 py-2">
          <Target className="h-6 w-6 mx-auto text-[#716D64]" />
          <p className="font-sans text-xs font-medium text-[#18181B]">
            Weekly Goal Container Placeholder
          </p>
          <p className="font-mono text-[10px] text-[#9E988D]">
            Set & track primary growth objective
          </p>
        </div>
      </EmptyCardPlaceholder>
    </div>
  );
};
