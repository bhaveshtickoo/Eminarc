'use client';

import React from 'react';
import { Building2, Globe, Megaphone } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { useWorkspace } from '@/hooks/useWorkspace';

export interface WorkspaceHeaderProps {
  className?: string;
  showMetrics?: boolean;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  className,
  showMetrics = true,
}) => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div
      className={cn(
        'rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Company Identity */}
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              ACTIVE WORKSPACE
            </span>
            <span className="flex items-center text-xs font-mono text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full font-medium border border-[#C8E4D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] mr-1.5 animate-pulse" />
              {currentWorkspace.status.toUpperCase()}
            </span>
          </div>

          <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-[#111111]">
            {currentWorkspace.name}
          </h2>

          <p className="font-serif italic text-base text-[#716D64] mt-0.5 font-normal">
            &quot;{currentWorkspace.tagline}&quot;
          </p>

          {/* Context Details Grid */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-[#716D64]">
            <div className="flex items-center space-x-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#18181B]" />
              <span>{currentWorkspace.industry}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <Globe className="h-3.5 w-3.5 text-[#18181B]" />
              <span>{currentWorkspace.targetMarket.join(', ')}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <Megaphone className="h-3.5 w-3.5 text-[#18181B]" />
              <span>Voice: {currentWorkspace.brandVoice.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Live Context Metrics */}
        {showMetrics && (
          <div className="flex items-center space-x-4 border-t lg:border-t-0 lg:border-l border-[rgba(0,0,0,0.06)] pt-4 lg:pt-0 lg:pl-6 shrink-0">
            <div className="text-center rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-4 py-2.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64] block">
                GROWTH SCORE
              </span>
              <span className="font-sans text-xl font-bold text-[#111111]">
                {currentWorkspace.metrics.growthScore} / 100
              </span>
            </div>

            <div className="text-center rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-4 py-2.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64] block">
                AI VISIBILITY
              </span>
              <span className="font-sans text-xl font-bold text-[#B45309]">
                {currentWorkspace.metrics.aiVisibility}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
