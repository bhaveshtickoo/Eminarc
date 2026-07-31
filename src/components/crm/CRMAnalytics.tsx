'use client';

import React from 'react';
import { DonutChart } from '../charts/DonutChart';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { AreaTrendChart } from '../charts/AreaTrendChart';
import { StackedBarChart } from '../charts/StackedBarChart';

export const CRMAnalytics: React.FC = () => {
  const leadSourceSegments = [
    { label: 'LinkedIn Outreach', value: 42, color: '#18181B', formattedValue: '42 (37%)' },
    { label: 'Content / SEO', value: 28, color: '#2D6A4F', formattedValue: '28 (25%)' },
    { label: 'Reddit Communities', value: 19, color: '#B45309', formattedValue: '19 (17%)' },
    { label: 'AI Search Citations', value: 15, color: '#0369A1', formattedValue: '15 (13%)' },
    { label: 'Direct & Other', value: 8, color: '#64748B', formattedValue: '8 (8%)' },
  ];

  const pipelineFunnelData = [
    { label: 'Total Inbound Leads', value: 112, formattedValue: '112 Leads', color: '#18181B' },
    { label: 'Outreach Contacted', value: 67, formattedValue: '67 Contacted', color: '#2D6A4F' },
    { label: 'Engaged & Replied', value: 28, formattedValue: '28 Replied', color: '#B45309' },
    { label: 'AI Qualified Opportunities', value: 14, formattedValue: '14 Qualified', color: '#0369A1' },
    { label: 'Demos Booked & Closed', value: 7, formattedValue: '7 Deals', color: '#000000' },
  ];

  const conversionTrendLabels = ['W26', 'W27', 'W28', 'W29', 'W30', 'W31'];
  const conversionSeries = [
    { name: 'Lead Conversion Rate (%)', data: [2.8, 3.4, 3.8, 4.1, 4.5, 4.8], color: '#2D6A4F' },
  ];

  const qualificationDistributionData = [
    {
      label: 'Mon',
      values: [
        { name: 'High (90+)', value: 12, color: '#2D6A4F' },
        { name: 'Med (70-89)', value: 18, color: '#B45309' },
        { name: 'Low (<70)', value: 5, color: '#64748B' },
      ],
    },
    {
      label: 'Tue',
      values: [
        { name: 'High (90+)', value: 15, color: '#2D6A4F' },
        { name: 'Med (70-89)', value: 22, color: '#B45309' },
        { name: 'Low (<70)', value: 8, color: '#64748B' },
      ],
    },
    {
      label: 'Wed',
      values: [
        { name: 'High (90+)', value: 18, color: '#2D6A4F' },
        { name: 'Med (70-89)', value: 20, color: '#B45309' },
        { name: 'Low (<70)', value: 6, color: '#64748B' },
      ],
    },
    {
      label: 'Thu',
      values: [
        { name: 'High (90+)', value: 22, color: '#2D6A4F' },
        { name: 'Med (70-89)', value: 25, color: '#B45309' },
        { name: 'Low (<70)', value: 9, color: '#64748B' },
      ],
    },
    {
      label: 'Fri',
      values: [
        { name: 'High (90+)', value: 26, color: '#2D6A4F' },
        { name: 'Med (70-89)', value: 28, color: '#B45309' },
        { name: 'Low (<70)', value: 10, color: '#64748B' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Lead Source Mix */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            CRM DISTRIBUTION
          </span>
          <h4 className="font-sans font-bold text-lg text-[#111111] mt-1">
            Top Growth Channels & Source Mix
          </h4>
        </div>
        <DonutChart segments={leadSourceSegments} centerLabel="TOTAL LEADS" centerValue="112" />
      </div>

      {/* 2. Pipeline Funnel */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            FUNNEL CONVERSION
          </span>
          <h4 className="font-sans font-bold text-lg text-[#111111] mt-1">
            Lead Pipeline Funnel
          </h4>
        </div>
        <HorizontalBarChart data={pipelineFunnelData} />
      </div>

      {/* 3. Conversion Rate Trend */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            VELOCITY TREND
          </span>
          <h4 className="font-sans font-bold text-lg text-[#111111] mt-1">
            Weekly Lead Conversion Rate Trend
          </h4>
        </div>
        <AreaTrendChart labels={conversionTrendLabels} series={conversionSeries} height={160} />
      </div>

      {/* 4. Qualification Score Distribution */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            QUALIFICATION BREAKDOWN
          </span>
          <h4 className="font-sans font-bold text-lg text-[#111111] mt-1">
            AI Lead Score Distribution by Day
          </h4>
        </div>
        <StackedBarChart data={qualificationDistributionData} height={150} />
      </div>
    </div>
  );
};
