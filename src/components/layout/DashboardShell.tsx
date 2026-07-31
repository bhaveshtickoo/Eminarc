'use client';

import React, { useState } from 'react';
import { cn } from '@/design-system/utils/cn';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export interface DashboardShellProps {
  children: React.ReactNode;
  activeNavId?: string;
  className?: string;
}

export const moduleNames: Record<string, string> = {
  dashboard: 'Overview',
  research: 'Clients',
  crm: 'Growth Pipeline',
  content: 'Content Hub',
  visibility: 'Outreach',
  'ai-visibility': 'Outreach',
  leads: 'Leads & ICP',
  analytics: 'Analytics',
  reports: 'Reports',
  agents: 'Agents (AI)',
  tasks: 'Tasks',
  integrations: 'Integrations',
  settings: 'Settings',
  team: 'Team',
  billing: 'Billing',
};

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  activeNavId = 'dashboard',
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeModuleLabel = moduleNames[activeNavId] || 'Overview';

  return (
    <div className="flex min-h-screen w-full bg-[#F6F2EB]">
      {/* Left Sidebar with Workspace Switcher */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeItem={activeNavId}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen">
        {/* Top Navbar with Breadcrumbs */}
        <Navbar
          onMenuToggle={() => setMobileMenuOpen(true)}
          activeModule={activeModuleLabel}
        />

        {/* Dashboard Scrollable Body Container */}
        <main className={cn('flex-1 p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};
