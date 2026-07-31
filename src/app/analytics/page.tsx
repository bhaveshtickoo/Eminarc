import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { AreaTrendChart } from '@/components/charts/AreaTrendChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { AIVisibilityAuditorCards } from '@/components/analytics/AIVisibilityAuditorCards';

export default function UnifiedAnalyticsPage() {

  const revenueTrendLabels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  const revenueSeries = [
    { name: 'Revenue Pipeline ($k)', data: [120, 135, 142, 150, 160, 168, 172, 178, 182, 185, 188, 192], color: '#18181B' },
    { name: 'Qualified Deals MRR ($k)', data: [28, 32, 35, 38, 42, 45, 48, 50, 52, 55, 58, 62], color: '#2D6A4F' },
  ];

  const leadSourceSegments = [
    { label: 'LinkedIn', value: 48, color: '#18181B' },
    { label: 'Email', value: 24, color: '#2D6A4F' },
    { label: 'AI Search', value: 18, color: '#B45309' },
    { label: 'Reddit', value: 14, color: '#0369A1' },
    { label: 'Website', value: 8, color: '#64748B' },
  ];

  const weeklyActivityData = [
    {
      label: 'Mon',
      values: [
        { name: 'LinkedIn', value: 120, color: '#18181B' },
        { name: 'Email', value: 75, color: '#2D6A4F' },
        { name: 'Reddit', value: 45, color: '#B45309' },
        { name: 'AI Search', value: 30, color: '#0369A1' },
      ],
    },
    {
      label: 'Tue',
      values: [
        { name: 'LinkedIn', value: 140, color: '#18181B' },
        { name: 'Email', value: 90, color: '#2D6A4F' },
        { name: 'Reddit', value: 50, color: '#B45309' },
        { name: 'AI Search', value: 45, color: '#0369A1' },
      ],
    },
    {
      label: 'Wed',
      values: [
        { name: 'LinkedIn', value: 150, color: '#18181B' },
        { name: 'Email', value: 85, color: '#2D6A4F' },
        { name: 'Reddit', value: 60, color: '#B45309' },
        { name: 'AI Search', value: 40, color: '#0369A1' },
      ],
    },
    {
      label: 'Thu',
      values: [
        { name: 'LinkedIn', value: 160, color: '#18181B' },
        { name: 'Email', value: 95, color: '#2D6A4F' },
        { name: 'Reddit', value: 55, color: '#B45309' },
        { name: 'AI Search', value: 42, color: '#0369A1' },
      ],
    },
    {
      label: 'Fri',
      values: [
        { name: 'LinkedIn', value: 190, color: '#18181B' },
        { name: 'Email', value: 120, color: '#2D6A4F' },
        { name: 'Reddit', value: 65, color: '#B45309' },
        { name: 'AI Search', value: 48, color: '#0369A1' },
      ],
    },
    {
      label: 'Sat',
      values: [
        { name: 'LinkedIn', value: 80, color: '#18181B' },
        { name: 'Email', value: 40, color: '#2D6A4F' },
        { name: 'Reddit', value: 30, color: '#B45309' },
        { name: 'AI Search', value: 20, color: '#0369A1' },
      ],
    },
    {
      label: 'Sun',
      values: [
        { name: 'LinkedIn', value: 60, color: '#18181B' },
        { name: 'Email', value: 30, color: '#2D6A4F' },
        { name: 'Reddit', value: 25, color: '#B45309' },
        { name: 'AI Search', value: 15, color: '#0369A1' },
      ],
    },
  ];

  return (
    <DashboardShell activeNavId="analytics">
      {/* Workspace Banner */}
      <WorkspaceHeader />

      {/* Row 1: Revenue & Pipeline Line Trend + Lead Source Mix Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              UNIFIED ANALYTICS
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Revenue & Pipeline Progression
            </h3>
            <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
              LinkedIn, email, CRM, Reddit, search, and AI visibility — one source of truth.
            </p>
          </div>
          <AreaTrendChart labels={revenueTrendLabels} series={revenueSeries} height={200} />
        </div>

        <div className="lg:col-span-4 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              LEAD SOURCE MIX
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Channel Proportions
            </h3>
          </div>
          <DonutChart segments={leadSourceSegments} centerLabel="INBOUND" centerValue="112" />
        </div>
      </div>

      {/* Row 2: Weekly Channel Activity Stacked Bar */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            WEEKLY ACTIVITY
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
            Channel Activity (Weekly Stack)
          </h3>
        </div>
        <StackedBarChart data={weeklyActivityData} height={180} />
      </div>

      {/* Row 3: AI Visibility Auditor Cards */}
      <AIVisibilityAuditorCards />
    </DashboardShell>
  );
}
