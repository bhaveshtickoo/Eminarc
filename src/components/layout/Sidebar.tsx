'use client';

import React from 'react';
import {
  LayoutGrid,
  Users,
  GitMerge,
  FileText,
  Send,
  Target,
  BarChart2,
  FileSpreadsheet,
  Bot,
  ListCheck,
  Layers,
  Settings,
  X,
  ArrowRight,
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
  { id: 'dashboard', label: 'Overview', icon: LayoutGrid, href: '/' },
  { id: 'research', label: 'Clients', icon: Users, href: '/research' },
  { id: 'crm', label: 'Growth Pipeline', icon: GitMerge, href: '/crm' },
  { id: 'content', label: 'Content Hub', icon: FileText, href: '/content' },
  { id: 'visibility', label: 'Outreach', icon: Send, href: '/visibility' },
  { id: 'leads', label: 'Leads & ICP', icon: Target, href: '/crm' },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '/analytics' },
  { id: 'reports', label: 'Reports', icon: FileSpreadsheet, href: '/reports' },
  { id: 'agents', label: 'Agents (AI)', icon: Bot, href: '/agents' },
  { id: 'tasks', label: 'Tasks', icon: ListCheck, href: '/tasks' },
  { id: 'integrations', label: 'Integrations', icon: Layers, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
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
          'fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-[#E5E0D6] bg-[#FBF9F5] p-4 transition-transform duration-200 ease-out lg:static lg:translate-x-0 shrink-0 select-none overflow-y-auto',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Top Header: Workspace Switcher */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D6]/60 mb-4">
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

        {/* Navigation Items (Exact Match to Image Reference) */}
        <div className="flex-1 space-y-1">
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeItem === item.id ||
                (activeItem === 'ai-visibility' && item.id === 'visibility') ||
                (activeItem === 'dashboard' && item.id === 'dashboard');

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-3 rounded-xl px-3 py-2 font-sans text-xs md:text-sm font-medium tracking-tight transition-all duration-150',
                    isActive
                      ? 'bg-[#EFEAE1] text-[#111111] font-bold shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]'
                      : 'text-[#716D64] hover:bg-[#F0EBE1]/80 hover:text-[#111111]'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive ? 'text-[#111111]' : 'text-[#716D64] group-hover:text-[#111111]'
                    )}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Left Bottom Side Stack: Active Plan, Version, and System Status */}
        <div className="mt-6 pt-4 border-t border-[#E5E0D6] space-y-2.5">
          {/* Card 1: Active Plan Card */}
          <div className="rounded-2xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-3.5 space-y-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[#716D64] block">
              ACTIVE PLAN
            </span>
            <h4 className="font-sans font-bold text-sm text-[#111111]">
              Eminarc Pro
            </h4>
            <span className="font-mono text-[10px] text-[#716D64] block">
              Renews on Aug 24, 2026
            </span>
            <a
              href="#"
              className="inline-flex items-center space-x-1 font-sans text-xs font-semibold text-[#111111] hover:underline pt-1"
            >
              <span>Manage Plan</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Card 2: Version Badge */}
          <div className="flex items-center space-x-3 rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#000000] text-[#FFFFFF] font-mono text-[11px] font-extrabold shrink-0 shadow-sm">
              e
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-[#111111] uppercase tracking-wider block leading-tight">
                EMINARC OS
              </span>
              <span className="font-mono text-[9px] text-[#716D64] block">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Card 3: System Status Pill */}
          <div className="flex items-center space-x-2 rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] px-3 py-2 text-[11px] font-mono text-[#716D64]">
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse shrink-0" />
            <span>All systems operational</span>
          </div>
        </div>
      </aside>
    </>
  );
};
