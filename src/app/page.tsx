import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { KPICards } from '@/components/dashboard/KPICards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { TaskList } from '@/components/dashboard/TaskList';
import { CopilotCard } from '@/components/dashboard/CopilotCard';
import { CalendarCard } from '@/components/dashboard/CalendarCard';
import { PipelineCard } from '@/components/dashboard/PipelineCard';
import { NotificationList } from '@/components/dashboard/NotificationList';
import { ExperimentCard } from '@/components/dashboard/ExperimentCard';

export default function ProductionDashboardPage() {
  return (
    <DashboardShell activeNavId="dashboard">
      {/* Header Banner: Greeting & Weekly Goal */}
      <section>
        <WelcomeHeader />
      </section>

      {/* Quick Actions Bar */}
      <section>
        <QuickActions />
      </section>

      {/* KPI Cards (4 Cards with SVG Sparklines) */}
      <section>
        <KPICards />
      </section>

      {/* Row 2: Today's Priorities & AI Growth Copilot */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList />
        <CopilotCard />
      </section>

      {/* Row 3: Content Calendar & Pipeline Donut */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarCard />
        <PipelineCard />
      </section>

      {/* Row 4: System Notifications & Running Experiments */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationList />
        <ExperimentCard />
      </section>
    </DashboardShell>
  );
}
