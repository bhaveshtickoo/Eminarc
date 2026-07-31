import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { KPICards } from '@/components/dashboard/KPICards';
import { SecondRow } from '@/components/dashboard/SecondRow';
import { ThirdRow } from '@/components/dashboard/ThirdRow';
import { FourthRow } from '@/components/dashboard/FourthRow';

export default function DashboardPage() {
  return (
    <DashboardShell activeNavId="dashboard">
      {/* Row 1: Welcome Header Banner + Weekly Goal & 4 KPI Cards */}
      <section className="space-y-6">
        <WelcomeHeader />
        <KPICards />
      </section>

      {/* Row 2: Today's Priorities & AI Growth Copilot */}
      <section>
        <SecondRow />
      </section>

      {/* Row 3: Content Calendar & Pipeline */}
      <section>
        <ThirdRow />
      </section>

      {/* Row 4: Activity Feed & Running Experiments */}
      <section>
        <FourthRow />
      </section>
    </DashboardShell>
  );
}
