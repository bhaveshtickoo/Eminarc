'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { useWorkspace } from './WorkspaceContextProvider';

export interface BreadcrumbsProps {
  moduleName?: string;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  moduleName = 'Dashboard',
  className,
}) => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div
      className={cn(
        'flex items-center space-x-2 font-mono text-xs text-[#716D64] select-none',
        className
      )}
    >
      {/* Workspace Name */}
      <span className="font-sans font-bold text-[#111111] tracking-tight">
        {currentWorkspace.name}
      </span>

      <ChevronRight className="h-3.5 w-3.5 text-[#9E988D]" />

      {/* Current Module */}
      <span className="font-mono text-xs text-[#716D64] uppercase tracking-wider font-medium">
        {moduleName}
      </span>
    </div>
  );
};
