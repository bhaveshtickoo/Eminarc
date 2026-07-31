'use client';

import React from 'react';
import {
  LayoutDashboard,
  SearchCode,
  FileText,
  Eye,
  Users,
  Bot,
  FileSpreadsheet,
  CheckSquare,
  Settings,
  UserPlus,
  CreditCard,
  X,
} from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { WorkspaceSwitcher } from '../workspace/WorkspaceSwitcher';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  activeItem?: string;
}

export const mainNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'research', label: 'Research', icon: SearchCode, href: '/research' },
  { id: 'content', label: 'Content OS', icon: FileText, href: '/content' },
  { id: 'ai-visibility', label: 'AI Visibility', icon: Eye, href: '/visibility' },
  { id: 'crm', label: 'Growth CRM', icon: Users, href: '/crm' },
  { id: 'analytics', label: 'Analytics', icon: LayoutDashboard, href: '/analytics' },
  { id: 'agents', label: 'AI Agents', icon: Bot, href: '/agents' },
  { id: 'reports', label: 'Reports', icon: FileSpreadsheet, href: '/reports' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, href: '/tasks' },
];

export const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'team', label: 'Team', icon: UserPlus, href: '#' },
  { id: 'billing', label: 'Billing', icon: CreditCard, href: '#' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
  className,
  activeItem = 'dashboard',
}) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#000000]/30 backdrop-blur-none lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-[#E5E0D6] bg-[#FBF9F5] p-5 transition-transform duration-200 ease-out lg:static lg:translate-x-0 shrink-0',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Workspace Switcher Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E5E0D6]/60 mb-5">
          <WorkspaceSwitcher variant="sidebar" />
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden rounded-lg p-1.5 text-[#716D64] hover:bg-[#EFEAE1] hover:text-[#111111] ml-2"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-6 overflow-y-auto pr-1">
          {/* Main Navigation */}
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E988D] px-3 block mb-2">
              Platform
            </span>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'group flex items-center justify-between rounded-xl px-3 py-2.5 font-sans text-xs md:text-sm font-medium tracking-tight transition-all duration-150 select-none',
                      isActive
                        ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                        : 'text-[#716D64] hover:bg-[#F0EBE1] hover:text-[#111111]'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={cn(
                          'h-4 w-4 shrink-0 transition-colors',
                          isActive ? 'text-[#FFFFFF]' : 'text-[#716D64] group-hover:text-[#111111]'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t border-[#E5E0D6] pt-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E988D] px-3 block mb-2">
            System
          </span>
          <nav className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-3 rounded-xl px-3 py-2 font-sans text-xs md:text-sm font-medium tracking-tight transition-all duration-150 select-none',
                    isActive
                      ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                      : 'text-[#716D64] hover:bg-[#F0EBE1] hover:text-[#111111]'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive ? 'text-[#FFFFFF]' : 'text-[#716D64] group-hover:text-[#111111]'
                    )}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
