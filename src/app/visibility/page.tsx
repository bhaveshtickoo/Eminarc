'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { AreaTrendChart } from '@/components/charts/AreaTrendChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function AIVisibilityPage() {
  const { currentWorkspace } = useWorkspace();

  const visibilityTrendLabels = ['W25', 'W26', 'W27', 'W28', 'W29', 'W30', 'W31'];
  const visibilitySeries = [
    { name: 'Eminarc Citation Score (%)', data: [42, 48, 52, 55, 58, 60, currentWorkspace.metrics.aiVisibility], color: '#2D6A4F' },
    { name: 'Competitor Avg Score (%)', data: [35, 38, 40, 42, 44, 45, 47], color: '#B45309' },
  ];

  const citationDistribution = [
    { label: 'Perplexity AI', value: 38, color: '#18181B', formattedValue: '38 citations' },
    { label: 'ChatGPT-4o', value: 32, color: '#2D6A4F', formattedValue: '32 citations' },
    { label: 'Claude 3.5 Sonnet', value: 24, color: '#B45309', formattedValue: '24 citations' },
    { label: 'Google AI Overviews', value: 16, color: '#0369A1', formattedValue: '16 citations' },
    { label: 'Gemini 1.5 Pro', value: 8, color: '#64748B', formattedValue: '8 citations' },
  ];

  const platformVisibilityBars = [
    { label: 'Perplexity AI', value: 88, formattedValue: '88% Coverage', color: '#2D6A4F' },
    { label: 'ChatGPT-4o', value: 82, formattedValue: '82% Coverage', color: '#2D6A4F' },
    { label: 'Claude 3.5 Sonnet', value: 76, formattedValue: '76% Coverage', color: '#2D6A4F' },
    { label: 'Google AI Overview', value: 64, formattedValue: '64% Coverage', color: '#B45309' },
    { label: 'LinkedIn Articles', value: 92, formattedValue: '92% Coverage', color: '#2D6A4F' },
    { label: 'Reddit Discussions', value: 70, formattedValue: '70% Coverage', color: '#2D6A4F' },
    { label: 'Medium Breakdowns', value: 74, formattedValue: '74% Coverage', color: '#2D6A4F' },
    { label: 'Gemini 1.5 Pro', value: 42, formattedValue: '42% Coverage (Missing)', color: '#DC2626' },
  ];

  return (
    <DashboardShell activeNavId="ai-visibility">
      <WorkspaceHeader />

      {/* Row 1: Visibility Score & Key Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64]">
            GLOBAL CITATION SCORE
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-3xl font-bold text-[#111111]">
              {currentWorkspace.metrics.aiVisibility}%
            </span>
            <span className="font-mono text-xs text-[#2D6A4F] font-bold">
              ↑ +8% this month
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#716D64] block">
            Ranked #1 in {currentWorkspace.industry}
          </span>
        </div>

        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64]">
            TOTAL LLM CITATIONS
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-3xl font-bold text-[#111111]">
              118
            </span>
            <span className="font-mono text-xs text-[#2D6A4F] font-bold">
              Active Citations
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#716D64] block">
            Across 9 Scanned AI Engines
          </span>
        </div>

        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64]">
            COMPETITOR GAP
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-3xl font-bold text-[#2D6A4F]">
              +16%
            </span>
            <span className="font-mono text-xs text-[#716D64]">
              Lead vs Industry Avg
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#716D64] block">
            Top citations vs Hubspot/Clay
          </span>
        </div>

        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64]">
            SCANNER AUDIT FREQUENCY
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-3xl font-bold text-[#111111]">
              24/7
            </span>
            <span className="font-mono text-xs text-[#2D6A4F] font-bold">
              Autonomous
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#716D64] block">
            Next scan in 12 minutes
          </span>
        </div>
      </div>

      {/* Row 2: AI Visibility Score Trend (AreaTrend) & Citation Distribution (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              CITATION PROGRESSION
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              AI Visibility Trend vs Competitor Benchmark
            </h3>
          </div>
          <AreaTrendChart labels={visibilityTrendLabels} series={visibilitySeries} height={200} />
        </div>

        <div className="lg:col-span-4 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              DISTRIBUTION
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Citation Breakdown
            </h3>
          </div>
          <DonutChart segments={citationDistribution} centerLabel="CITATIONS" centerValue="118" />
        </div>
      </div>

      {/* Row 3: Platform Visibility Breakdown Bar Chart */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            PLATFORM COVERAGE
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
            Visibility by AI Engine & Social Channel
          </h3>
        </div>
        <HorizontalBarChart data={platformVisibilityBars} />
      </div>
    </DashboardShell>
  );
}
