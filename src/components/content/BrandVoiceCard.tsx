'use client';

import React from 'react';
import { Megaphone, Globe } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

export const BrandVoiceCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Megaphone className="h-3.5 w-3.5 text-[#18181B]" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#18181B]">
            Brand Voice
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
          SYNCED
        </span>
      </div>

      {/* Voice Tags */}
      <div className="flex flex-wrap gap-1.5">
        {currentWorkspace.brandVoice.map((voice, idx) => (
          <span
            key={idx}
            className="font-mono text-[10px] font-medium text-[#18181B] bg-[#F5F0E6] border border-[#E5E0D6] px-2 py-0.5 rounded-full"
          >
            {voice}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-[#E5E0D6]/60 flex items-center justify-between text-[10px] font-mono text-[#716D64]">
        <div className="flex items-center space-x-1">
          <Globe className="h-3 w-3 text-[#716D64]" />
          <span>Market: {currentWorkspace.targetMarket.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};
