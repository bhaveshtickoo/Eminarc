'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { useWorkspace } from './WorkspaceContextProvider';

export interface WorkspaceSwitcherProps {
  className?: string;
  variant?: 'sidebar' | 'navbar';
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  className,
  variant = 'sidebar',
}) => {
  const { currentWorkspace, availableWorkspaces, switchWorkspace } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn('relative w-full', className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group flex w-full items-center justify-between rounded-xl border transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#18181B] select-none',
          variant === 'sidebar'
            ? 'bg-[#FFFFFF] border-[#E5E0D6] p-2.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] hover:border-[#D8D2C5]'
            : 'bg-[#FFFFFF] border-[#E5E0D6] px-3 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] hover:border-[#D8D2C5]'
        )}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          {/* Logo Badge Icon */}
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#000000] font-serif italic text-sm font-bold text-[#FFFFFF] shrink-0 shadow-sm">
            {currentWorkspace.logoLetter}
          </div>

          <div className="text-left min-w-0">
            <span className="block font-sans text-xs font-bold tracking-tight text-[#111111] truncate">
              {currentWorkspace.name}
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-[#716D64] truncate">
              {currentWorkspace.industry}
            </span>
          </div>
        </div>

        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-[#716D64] shrink-0 transition-transform duration-200',
            isOpen && 'transform rotate-180 text-[#18181B]'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E0D6] p-2 shadow-[0_10px_25px_-5px_rgba(26,26,26,0.08)]">
          <div className="px-2 py-1.5 border-b border-[#E5E0D6]/60 mb-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] font-semibold text-[#716D64] block">
              WORKSPACES ({availableWorkspaces.length})
            </span>
          </div>

          <div className="space-y-1">
            {availableWorkspaces.map((ws) => {
              const isSelected = ws.id === currentWorkspace.id;

              return (
                <div
                  key={ws.id}
                  onClick={() => {
                    switchWorkspace(ws.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-sans font-medium transition-all duration-150 cursor-pointer select-none',
                    isSelected
                      ? 'bg-[#F5F0E6] text-[#111111] font-semibold'
                      : 'text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111]'
                  )}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-md font-serif italic text-xs font-bold shrink-0',
                        isSelected
                          ? 'bg-[#000000] text-[#FFFFFF]'
                          : 'bg-[#EFEAE1] text-[#716D64] group-hover:text-[#18181B]'
                      )}
                    >
                      {ws.logoLetter}
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans font-semibold text-[#18181B] truncate">
                        {ws.name}
                      </span>
                      <span className="block font-mono text-[9px] text-[#716D64] truncate">
                        {ws.targetMarket}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="h-3.5 w-3.5 text-[#2D6A4F] shrink-0 ml-2" />}
                </div>
              );
            })}
          </div>

          {/* Add New Workspace Placeholder */}
          <div className="pt-1.5 mt-1 border-t border-[#E5E0D6]/60">
            <button
              type="button"
              className="flex w-full items-center space-x-2 rounded-xl px-2.5 py-1.5 font-sans text-xs text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create New Workspace</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
