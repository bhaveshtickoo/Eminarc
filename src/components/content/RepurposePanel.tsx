'use client';

import React, { useState } from 'react';
import {
  Share2,
  Globe,
  Send,
  FileText,
  Mail,
  MessageSquare,
  Layers,
  Video,
  Check,
} from 'lucide-react';
import { cn } from '@/design-system/utils/cn';

export interface RepurposeFormat {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

export const repurposeFormats: RepurposeFormat[] = [
  { id: 'linkedin', label: 'LinkedIn Post', icon: Globe, badge: 'READY' },
  { id: 'twitter', label: 'Twitter / X Thread', icon: Send, badge: '5 TWEETS' },
  { id: 'medium', label: 'Medium Article', icon: FileText, badge: 'LONGFORM' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, badge: 'SUBSTACK' },
  { id: 'reddit', label: 'Reddit Post', icon: MessageSquare, badge: 'CASE STUDY' },
  { id: 'carousel', label: 'LinkedIn Carousel', icon: Layers, badge: '7 SLIDES' },
  { id: 'video', label: 'Video Script', icon: Video, badge: '90s REEL' },
];

export const RepurposePanel: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<string | null>(null);

  const handleConvert = (id: string) => {
    setActiveFormat(id);
    setTimeout(() => setActiveFormat(null), 2000);
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Share2 className="h-4 w-4 text-[#18181B]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
            1-CLICK MULTI-CHANNEL REPURPOSE ENGINE
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
          7 CHANNELS READY
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {repurposeFormats.map((fmt) => {
          const Icon = fmt.icon;
          const isConverting = activeFormat === fmt.id;

          return (
            <button
              key={fmt.id}
              type="button"
              onClick={() => handleConvert(fmt.id)}
              className={cn(
                'group flex flex-col justify-between rounded-xl p-3 text-left transition-all duration-150 border active:scale-[0.98]',
                isConverting
                  ? 'bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]'
                  : 'bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isConverting ? 'text-[#2D6A4F] animate-bounce' : 'text-[#716D64] group-hover:text-[#18181B]'
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.2 rounded font-bold',
                    isConverting ? 'bg-[#2D6A4F] text-[#FFFFFF]' : 'bg-[#EFEAE1] text-[#716D64]'
                  )}
                >
                  {isConverting ? <Check className="h-2.5 w-2.5" /> : fmt.badge}
                </span>
              </div>

              <div>
                <span className="block font-sans font-bold text-xs leading-tight truncate">
                  {fmt.label}
                </span>
                <span className="block font-mono text-[9px] text-[#716D64] mt-0.5">
                  {isConverting ? 'Converted!' : 'Convert'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
