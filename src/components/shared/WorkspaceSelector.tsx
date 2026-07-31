import React from 'react';
import { ChevronDown, Building2 } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';

export interface WorkspaceSelectorProps {
  className?: string;
  workspaceName?: string;
}

export const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  className,
  workspaceName = 'Acme Growth Lab',
}) => {
  return (
    <button
      type="button"
      className={cn(
        'group flex items-center space-x-2.5 rounded-full bg-[#FFFFFF] border border-[#E5E0D6] px-3.5 py-1.5 text-xs font-sans font-medium text-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] transition-all hover:bg-[#F7F4EE] hover:border-[#D8D2C5] focus:outline-none focus:ring-1 focus:ring-[#18181B]',
        className
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#000000] text-[#FFFFFF]">
        <Building2 className="h-3 w-3" />
      </div>
      <span className="font-semibold tracking-tight text-[#111111] max-w-[130px] sm:max-w-[180px] truncate">
        {workspaceName}
      </span>
      <ChevronDown className="h-3.5 w-3.5 text-[#716D64] transition-transform group-hover:translate-y-[0.5px]" />
    </button>
  );
};
