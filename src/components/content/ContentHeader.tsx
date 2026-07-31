'use client';

import React from 'react';
import { PenTool, Calendar, ShieldCheck } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { useWorkspace } from '@/hooks/useWorkspace';

export interface ContentHeaderProps {
  activeTab?: 'editor' | 'calendar';
  onTabChange?: (tab: 'editor' | 'calendar') => void;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({
  activeTab = 'editor',
  onTabChange,
}) => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              CONTENT OS / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              <ShieldCheck className="h-3 w-3 mr-0.5" />
              <span>BRAND VOICE ACTIVE</span>
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-[#111111]">
            Content Operating System
          </h1>
          <p className="font-sans font-medium text-xs md:text-sm text-[#52525B] mt-1">
            &quot;Plan, write, refine, and repurpose distribution assets for {currentWorkspace.name}.&quot;
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl shrink-0 self-start sm:self-auto select-none">
          <button
            type="button"
            onClick={() => onTabChange?.('editor')}
            className={cn(
              'flex items-center space-x-2 rounded-lg px-3.5 py-1.5 font-sans text-xs font-medium transition-all',
              activeTab === 'editor'
                ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                : 'text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111]'
            )}
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>Studio Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange?.('calendar')}
            className={cn(
              'flex items-center space-x-2 rounded-lg px-3.5 py-1.5 font-sans text-xs font-medium transition-all',
              activeTab === 'calendar'
                ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                : 'text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111]'
            )}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Weekly Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
