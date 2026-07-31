import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { KPICards } from '@/components/dashboard/KPICards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { GrowthFunnel } from '@/components/dashboard/GrowthFunnel';
import { AIAgentsPanel } from '@/components/dashboard/AIAgentsPanel';
import { CopilotCard } from '@/components/dashboard/CopilotCard';
import { ContentQueueCard } from '@/components/dashboard/ContentQueueCard';
import { TrafficSourcesCard } from '@/components/dashboard/TrafficSourcesCard';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { TaskList } from '@/components/dashboard/TaskList';

export default function GrowthOSDashboardPage() {
  return (
    <DashboardShell activeNavId="dashboard">
      {/* 1. Header Row: Greeting & Milestone Progress */}
      <section>
        <WelcomeHeader />
      </section>

      {/* 2. Quick Actions Bar */}
      <section>
        <QuickActions />
      </section>

      {/* 3. High-Density KPI Row (Growth Score, AI Visibility, Pipeline, Research Status) */}
      <section>
        <KPICards />
      </section>

      {/* 4. Row 2: Velocity Analytics Chart & B2B Growth Funnel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-5">
          <GrowthFunnel />
        </div>
      </section>

      {/* 5. Row 3: Autonomous AI Agents & AI Growth Copilot */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <AIAgentsPanel />
        <CopilotCard />
      </section>

      {/* 6. Row 4: Publishing Content Queue & Acquisition Traffic Sources */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ContentQueueCard />
        <TrafficSourcesCard />
      </section>

      {/* 7. Row 5: Live Activity Stream & Today's Priorities Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <RecentActivityFeed />
        <TaskList />
      </section>
    </DashboardShell>
  );
}
