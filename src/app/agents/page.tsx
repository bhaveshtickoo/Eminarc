import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { AreaTrendChart } from '@/components/charts/AreaTrendChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';
import { Bot } from 'lucide-react';

export interface FullAgentItem {
  name: string;
  role: string;
  status: 'Active' | 'Scanning' | 'Idle';
  lastRun: string;
  successRate: string;
  tasksCompleted: number;
}

export default function AIAgentsPage() {

  const agents: FullAgentItem[] = [
    {
      name: 'Founder Research Agent',
      role: 'Company & Founder Intelligence',
      status: 'Active',
      lastRun: '5m ago',
      successRate: '98.4%',
      tasksCompleted: 312,
    },
    {
      name: 'Content Copilot Agent',
      role: 'Multi-Format Asset Generation',
      status: 'Active',
      lastRun: '12m ago',
      successRate: '99.1%',
      tasksCompleted: 428,
    },
    {
      name: 'AI Visibility Agent',
      role: 'LLM Citation & Radar Auditor',
      status: 'Scanning',
      lastRun: 'Just now',
      successRate: '97.8%',
      tasksCompleted: 580,
    },
    {
      name: 'CRM Qualification Agent',
      role: 'Lead Scoring & Account Enrichment',
      status: 'Active',
      lastRun: '30m ago',
      successRate: '96.5%',
      tasksCompleted: 245,
    },
    {
      name: 'Analytics Intelligence Agent',
      role: 'Growth Metric & Trend Engine',
      status: 'Idle',
      lastRun: '2h ago',
      successRate: '99.8%',
      tasksCompleted: 190,
    },
    {
      name: 'Weekly Review Agent',
      role: 'Report Summarizer & Action Generator',
      status: 'Idle',
      lastRun: 'Yesterday',
      successRate: '100%',
      tasksCompleted: 52,
    },
  ];

  const usageTrendLabels = ['W26', 'W27', 'W28', 'W29', 'W30', 'W31'];
  const usageTrendSeries = [
    { name: 'Total Agent Executions', data: [850, 1120, 1340, 1580, 1720, 1807], color: '#18181B' },
    { name: 'Automated Tasks Succeeded', data: [840, 1100, 1315, 1550, 1690, 1780], color: '#2D6A4F' },
  ];

  const tasksCompletedBarData = agents.map((a) => ({
    label: a.name,
    value: a.tasksCompleted,
    formattedValue: `${a.tasksCompleted} tasks (${a.successRate})`,
    color: a.status === 'Scanning' ? '#B45309' : '#2D6A4F',
  }));

  return (
    <DashboardShell activeNavId="agents">
      <WorkspaceHeader />

      {/* Agents Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF]">
                  <Bot className="h-4 w-4" />
                </div>
                <span
                  className={`font-mono text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    agent.status === 'Scanning'
                      ? 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]'
                      : agent.status === 'Active'
                      ? 'bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]'
                      : 'bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]'
                  }`}
                >
                  {agent.status}
                </span>
              </div>

              <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
                {agent.name}
              </h3>
              <span className="font-mono text-[10px] text-[#716D64] block">
                {agent.role}
              </span>
            </div>

            <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] grid grid-cols-3 gap-2 font-mono text-[10px] text-center">
              <div>
                <span className="text-[#716D64] block">LAST RUN</span>
                <span className="font-bold text-[#111111]">{agent.lastRun}</span>
              </div>
              <div>
                <span className="text-[#716D64] block">SUCCESS</span>
                <span className="font-bold text-[#2D6A4F]">{agent.successRate}</span>
              </div>
              <div>
                <span className="text-[#716D64] block">TASKS</span>
                <span className="font-bold text-[#111111]">{agent.tasksCompleted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Agent Usage Trend (AreaTrend) & Tasks Completed (HorizontalBar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              EXECUTION HISTORY
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Autonomous Agent Usage & Execution Volume
            </h3>
          </div>
          <AreaTrendChart labels={usageTrendLabels} series={usageTrendSeries} height={200} />
        </div>

        <div className="lg:col-span-5 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              TASK DISTRIBUTION
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Tasks Completed by Agent
            </h3>
          </div>
          <HorizontalBarChart data={tasksCompletedBarData} />
        </div>
      </div>
    </DashboardShell>
  );
}
