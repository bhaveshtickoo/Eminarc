'use client';

import React from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

export const ContentQueueCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const queueItems = [
    {
      title: 'Why Growth OS Architecture Replaces Fragmented SaaS',
      platform: 'LinkedIn Post',
      time: 'Today, 04:00 PM',
      status: 'Scheduled',
    },
    {
      title: 'Scaling B2B AI Visibility Citation Scores by 38%',
      platform: 'Medium Article',
      time: 'Tomorrow, 10:00 AM',
      status: 'Scheduled',
    },
    {
      title: 'Systemic Founder: Content Engine Workflows',
      platform: 'Reddit Case Study',
      time: 'Aug 6, 02:00 PM',
      status: 'Draft',
    },
  ];

  return (
    <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-[#18181B]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              CONTENT QUEUE
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#716D64] bg-[#EFEAE1] px-2 py-0.5 rounded font-bold">
            {currentWorkspace.metrics.contentPublishedCount}/{currentWorkspace.metrics.contentTargetCount} PACED
          </span>
        </div>

        <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
          Publishing Pipeline
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
          Upcoming multi-channel assets scheduled for distribution.
        </p>
      </div>

      <div className="space-y-2.5 my-4">
        {queueItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-xs shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          >
            <div className="min-w-0 pr-3">
              <h4 className="font-sans font-semibold text-[#111111] truncate">
                {item.title}
              </h4>
              <div className="flex items-center space-x-2 font-mono text-[9px] text-[#716D64] mt-0.5">
                <span className="bg-[#EFEAE1] text-[#18181B] px-1.5 py-0.2 rounded">
                  {item.platform}
                </span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>

            <span
              className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded font-semibold shrink-0 ${
                item.status === 'Scheduled'
                  ? 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]'
                  : 'bg-[#EFEAE1] text-[#716D64]'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono">
        <a href="/content" className="flex items-center space-x-1 text-[#18181B] hover:underline font-bold">
          <span>Open Content Studio</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};
