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

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  activeNavId = 'dashboard',
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#F6F2EB]">
      {/* Responsive Left Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeItem={activeNavId}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <Navbar onMenuToggle={() => setMobileMenuOpen(true)} />

        {/* Dashboard Scrollable Body Container */}
        <main className={cn('flex-1 p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};
