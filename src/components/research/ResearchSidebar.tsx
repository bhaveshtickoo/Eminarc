'use client';

import React, { useState } from 'react';
import {
  FileDown,
  Copy,
  Sparkles,
  Users,
  CalendarCheck,
  Check,
} from 'lucide-react';
import { cn } from '@/design-system/utils/cn';

export const ResearchSidebar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actionItems = [
    {
      id: 'export-pdf',
      label: 'Export PDF',
      icon: FileDown,
      onClick: () => {},
      badge: 'REPORT',
    },
    {
      id: 'copy-report',
      label: copied ? 'Copied to Clipboard!' : 'Copy Report',
      icon: copied ? Check : Copy,
      onClick: handleCopy,
      badge: 'MARKDOWN',
      highlight: copied,
    },
    {
      id: 'generate-content',
      label: 'Generate Content',
      icon: Sparkles,
      onClick: () => {},
      badge: 'COPILOT',
      primary: true,
    },
    {
      id: 'save-crm',
      label: 'Save to CRM',
      icon: Users,
      onClick: () => {},
      badge: 'PIPELINE',
    },
    {
      id: 'weekly-plan',
      label: 'Create Weekly Plan',
      icon: CalendarCheck,
      onClick: () => {},
      badge: 'ROADMAPPING',
    },
  ];

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
          REPORT ACTIONS
        </span>
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
          5 TOOLS READY
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actionItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={cn(
                'group flex items-center justify-between rounded-xl px-4 py-3 text-xs font-sans font-medium tracking-tight transition-all duration-150 border active:scale-[0.98]',
                item.primary
                  ? 'bg-[#000000] text-[#FFFFFF] border-transparent hover:bg-[#222222] shadow-sm'
                  : item.highlight
                  ? 'bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]'
                  : 'bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]'
              )}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    item.primary
                      ? 'text-[#FFFFFF]'
                      : item.highlight
                      ? 'text-[#2D6A4F]'
                      : 'text-[#716D64] group-hover:text-[#18181B]'
                  )}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <span
                className={cn(
                  'font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 hidden xl:inline-block ml-2',
                  item.primary
                    ? 'bg-[#FFFFFF]/20 text-[#FFFFFF]'
                    : 'bg-[#EFEAE1] text-[#716D64]'
                )}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
