'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { AreaTrendChart } from '@/components/charts/AreaTrendChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';
import { FileDown, Check, Printer } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function ExecutiveReportsPage() {
  const { currentWorkspace } = useWorkspace();
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const monthlyTrendLabels = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'];
  const monthlyTrendSeries = [
    { name: 'Growth Score Trend', data: [45, 54, 62, 68, 72, currentWorkspace.metrics.growthScore], color: '#2D6A4F' },
    { name: 'AI Visibility Score (%)', data: [30, 42, 48, 55, 59, currentWorkspace.metrics.aiVisibility], color: '#18181B' },
  ];

  const kpiComparisonData = [
    { label: 'Growth Score (vs Target 85)', value: currentWorkspace.metrics.growthScore, formattedValue: `${currentWorkspace.metrics.growthScore} / 100`, color: '#2D6A4F' },
    { label: 'AI Search Citation Score', value: currentWorkspace.metrics.aiVisibility, formattedValue: `${currentWorkspace.metrics.aiVisibility}%`, color: '#2D6A4F' },
    { label: 'Weekly Content Output Pacing', value: Math.round((currentWorkspace.metrics.contentPublishedCount / currentWorkspace.metrics.contentTargetCount) * 100), formattedValue: `${currentWorkspace.metrics.contentPublishedCount}/${currentWorkspace.metrics.contentTargetCount} (${Math.round((currentWorkspace.metrics.contentPublishedCount / currentWorkspace.metrics.contentTargetCount) * 100)}%)`, color: '#18181B' },
    { label: 'Weekly Goal Progress', value: currentWorkspace.weeklyGoal.percentage, formattedValue: `${currentWorkspace.weeklyGoal.percentage}% (${currentWorkspace.weeklyGoal.currentCount}/${currentWorkspace.weeklyGoal.targetCount})`, color: '#B45309' },
  ];

  const opportunityBreakdown = [
    { label: 'Qualified SaaS Leads', value: 14, color: '#18181B', formattedValue: '14 Deals ($12,400)' },
    { label: 'In-Discovery Proposals', value: 6, color: '#2D6A4F', formattedValue: '6 Proposals' },
    { label: 'Demo Bookings', value: 3, color: '#B45309', formattedValue: '3 Demos' },
    { label: 'Closed Won', value: 1, color: '#0369A1', formattedValue: '1 Won' },
  ];

  return (
    <DashboardShell activeNavId="reports">
      {/* Workspace Banner */}
      <WorkspaceHeader />

      {/* Export & Report Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              EXECUTIVE REPORTS
            </span>
            <span className="font-mono text-[9px] uppercase font-bold text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#FDE68A]">
              BOARD AUDIT READY
            </span>
          </div>
          <h2 className="font-sans font-bold text-2xl text-[#111111] tracking-tight">
            Growth & AI Visibility Executive Summary
          </h2>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Quarterly performance audit prepared for {currentWorkspace.name} leadership.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center space-x-2 rounded-xl bg-[#000000] px-4 py-2 text-xs font-sans font-bold text-[#FFFFFF] shadow-sm hover:bg-[#222222] transition-all"
          >
            {exported ? <Check className="h-4 w-4 text-[#2D6A4F]" /> : <FileDown className="h-4 w-4" />}
            <span>{exported ? 'Report Downloaded!' : 'Export PDF Report'}</span>
          </button>

          <button
            type="button"
            className="flex items-center space-x-2 rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-3.5 py-2 text-xs font-sans font-medium text-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] transition-all"
          >
            <Printer className="h-4 w-4 text-[#716D64]" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* Row 1: Quarterly Growth Trends & KPI Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              GROWTH TRENDS
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Multi-Quarter Growth Score & AI Citation Progression
            </h3>
          </div>
          <AreaTrendChart labels={monthlyTrendLabels} series={monthlyTrendSeries} height={200} />
        </div>

        <div className="lg:col-span-5 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              KPI BENCHMARKS
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Executive Target Comparison
            </h3>
          </div>
          <HorizontalBarChart data={kpiComparisonData} />
        </div>
      </div>

      {/* Row 2: Opportunity Breakdown Donut */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            OPPORTUNITY DISTRIBUTION
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
            Pipeline Opportunity Breakdown by Stage
          </h3>
        </div>
        <DonutChart segments={opportunityBreakdown} centerLabel="TOTAL VALUE" centerValue={currentWorkspace.metrics.pipelineValue} />
      </div>
    </DashboardShell>
  );
}
