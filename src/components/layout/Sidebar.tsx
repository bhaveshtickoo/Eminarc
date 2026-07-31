import React from 'react';
import {
  LayoutDashboard,
  SearchCode,
  FileText,
  Eye,
  Share2,
  Users,
  FlaskConical,
  CalendarCheck,
  Settings,
  UserPlus,
  CreditCard,
  X,
} from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { Logo } from '@/design-system/components/Navigation';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  activeItem?: string;
}

export const mainNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#' },
  { id: 'research', label: 'Research', icon: SearchCode, href: '#' },
  { id: 'content', label: 'Content', icon: FileText, href: '#' },
  { id: 'ai-visibility', label: 'AI Visibility', icon: Eye, href: '#' },
  { id: 'distribution', label: 'Distribution', icon: Share2, href: '#' },
  { id: 'crm', label: 'CRM', icon: Users, href: '#' },
  { id: 'experiments', label: 'Experiments', icon: FlaskConical, href: '#' },
  { id: 'weekly-review', label: 'Weekly Review', icon: CalendarCheck, href: '#' },
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
        {/* Sidebar Header with Logo & Mobile Close */}
        <div className="flex items-center justify-between pb-6 pt-1 px-2 border-b border-[#E5E0D6]/60 mb-4">
          <Logo subtitle="OS" />
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden rounded-lg p-1.5 text-[#716D64] hover:bg-[#EFEAE1] hover:text-[#111111]"
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
                        ? 'bg-[#000000] text-[#FFFFFF] font-semibold shadow-sm'
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
                      ? 'bg-[#000000] text-[#FFFFFF] font-semibold shadow-sm'
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
