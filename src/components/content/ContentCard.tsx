import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';

export interface ContentCardProps {
  title: string;
  type: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  updatedAt: string;
  active?: boolean;
  onClick?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  type,
  status,
  updatedAt,
  active = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex flex-col justify-between rounded-xl border p-3 text-xs transition-all duration-150 cursor-pointer select-none space-y-2',
        active
          ? 'bg-[#FFFFFF] border-[#18181B] shadow-[0_2px_4px_0_rgba(0,0,0,0.04)]'
          : 'bg-[#FFFFFF]/60 border-[#E5E0D6] hover:bg-[#FFFFFF] hover:border-[#D8D2C5]'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-sans font-semibold text-[#111111] line-clamp-2 leading-snug">
          {title}
        </h4>
        <span
          className={cn(
            'font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0 font-medium',
            status === 'Published'
              ? 'bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]'
              : status === 'Scheduled'
              ? 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]'
              : 'bg-[#EFEAE1] text-[#716D64]'
          )}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center justify-between font-mono text-[9px] text-[#716D64] pt-1 border-t border-[rgba(0,0,0,0.04)]">
        <span className="flex items-center space-x-1">
          <FileText className="h-3 w-3 text-[#716D64]" />
          <span>{type}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-[#716D64]" />
          <span>{updatedAt}</span>
        </span>
      </div>
    </div>
  );
};
