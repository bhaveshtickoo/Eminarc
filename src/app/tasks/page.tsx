'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { AreaTrendChart } from '@/components/charts/AreaTrendChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { CheckSquare, Sparkles, Clock, Check } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

export interface TaskItemData {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  completed?: boolean;
  aiSuggested?: boolean;
}

export const initialTasksList: TaskItemData[] = [
  {
    id: 't-1',
    title: 'Publish LinkedIn Carousel: Growth OS Architecture',
    category: 'Content',
    priority: 'High',
    due: 'Today, 04:00 PM',
  },
  {
    id: 't-2',
    title: 'Review AI Visibility Perplexity Citation Audit',
    category: 'AI Audit',
    priority: 'High',
    due: 'Today, 06:00 PM',
    aiSuggested: true,
  },
  {
    id: 't-3',
    title: 'Follow up with 3 enriched B2B SaaS leads in Growth CRM',
    category: 'CRM',
    priority: 'Medium',
    due: 'Tomorrow, 10:00 AM',
  },
  {
    id: 't-4',
    title: 'Approve Substack Newsletter Draft for Week 32',
    category: 'Content',
    priority: 'Medium',
    due: 'Tomorrow, 02:00 PM',
  },
  {
    id: 't-5',
    title: 'Run Gemini 1.5 Pro Citation Visibility Scan',
    category: 'AI Scanner',
    priority: 'Low',
    due: 'Aug 6, 11:00 AM',
    aiSuggested: true,
  },
];

export default function TasksAndWorkloadPage() {
  const { currentWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState<TaskItemData[]>(initialTasksList);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'ai'>('today');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'today') return t.due.includes('Today');
    if (activeTab === 'upcoming') return !t.due.includes('Today');
    if (activeTab === 'ai') return t.aiSuggested;
    return true;
  });

  const productivityTrendLabels = ['W26', 'W27', 'W28', 'W29', 'W30', 'W31'];
  const productivitySeries = [
    { name: 'Tasks Completed', data: [18, 22, 26, 29, 34, 38], color: '#2D6A4F' },
    { name: 'AI Suggested Auto-Tasks', data: [8, 11, 14, 16, 19, 22], color: '#18181B' },
  ];

  const tasksByCategoryBars = [
    { label: 'ContentOS Tasks', value: 18, formattedValue: '18 Tasks Done', color: '#18181B' },
    { label: 'AI Visibility Scans', value: 14, formattedValue: '14 Tasks Done', color: '#2D6A4F' },
    { label: 'Growth CRM Followups', value: 12, formattedValue: '12 Tasks Done', color: '#B45309' },
    { label: 'Research & Audits', value: 8, formattedValue: '8 Tasks Done', color: '#0369A1' },
  ];

  const weeklyWorkloadData = [
    {
      label: 'Mon',
      values: [
        { name: 'Content', value: 4, color: '#18181B' },
        { name: 'CRM', value: 3, color: '#2D6A4F' },
        { name: 'AI Audit', value: 2, color: '#B45309' },
      ],
    },
    {
      label: 'Tue',
      values: [
        { name: 'Content', value: 5, color: '#18181B' },
        { name: 'CRM', value: 4, color: '#2D6A4F' },
        { name: 'AI Audit', value: 3, color: '#B45309' },
      ],
    },
    {
      label: 'Wed',
      values: [
        { name: 'Content', value: 6, color: '#18181B' },
        { name: 'CRM', value: 3, color: '#2D6A4F' },
        { name: 'AI Audit', value: 4, color: '#B45309' },
      ],
    },
    {
      label: 'Thu',
      values: [
        { name: 'Content', value: 5, color: '#18181B' },
        { name: 'CRM', value: 5, color: '#2D6A4F' },
        { name: 'AI Audit', value: 2, color: '#B45309' },
      ],
    },
    {
      label: 'Fri',
      values: [
        { name: 'Content', value: 7, color: '#18181B' },
        { name: 'CRM', value: 6, color: '#2D6A4F' },
        { name: 'AI Audit', value: 3, color: '#B45309' },
      ],
    },
  ];

  return (
    <DashboardShell activeNavId="tasks">
      <WorkspaceHeader />

      {/* Row 1: Tasks Manager Card */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <CheckSquare className="h-4 w-4 text-[#18181B]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
                TASK ENGINE
              </span>
            </div>
            <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
              Growth Execution & Task Backlog
            </h3>
            <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
              Prioritized tasks for {currentWorkspace.name} growth team.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl shrink-0 self-start sm:self-auto select-none">
            <button
              type="button"
              onClick={() => setActiveTab('today')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'today'
                  ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                  : 'text-[#716D64] hover:bg-[#F7F4EE]'
              }`}
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                  : 'text-[#716D64] hover:bg-[#F7F4EE]'
              }`}
            >
              Upcoming
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                activeTab === 'ai'
                  ? 'bg-[#000000] text-[#FFFFFF] font-bold shadow-sm'
                  : 'text-[#716D64] hover:bg-[#F7F4EE]'
              }`}
            >
              <Sparkles className="h-3 w-3 text-[#2D6A4F]" />
              <span>AI Suggested</span>
            </button>
          </div>
        </div>

        {/* Task Items List */}
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`group flex items-center justify-between rounded-xl border p-3.5 text-xs transition-all duration-150 cursor-pointer select-none ${
                task.completed
                  ? 'bg-[#F5F0E6]/50 border-[#E5E0D6] opacity-60'
                  : 'bg-[#FFFFFF] border-[#E5E0D6] hover:border-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border shrink-0 transition-colors ${
                    task.completed
                      ? 'bg-[#000000] text-[#FFFFFF] border-transparent'
                      : 'bg-[#FFFFFF] border-[#D8D2C5]'
                  }`}
                >
                  {task.completed && <Check className="h-3.5 w-3.5" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-sans font-semibold text-[#111111] truncate ${
                        task.completed && 'line-through'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.aiSuggested && (
                      <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-1.5 py-0.2 rounded border border-[#C8E4D0] shrink-0">
                        AI SUGGESTED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 font-mono text-[9px] text-[#716D64] mt-0.5">
                    <span className="bg-[#EFEAE1] px-1.5 py-0.2 rounded text-[#18181B]">
                      {task.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{task.due}</span>
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold shrink-0 ml-2 ${
                  task.priority === 'High'
                    ? 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]'
                    : task.priority === 'Medium'
                    ? 'bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]'
                    : 'bg-[#EFEAE1] text-[#716D64]'
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Productivity Trend (AreaTrend) & Category Breakdown (HorizontalBar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              PRODUCTIVITY TREND
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Weekly Task Completion Velocity
            </h3>
          </div>
          <AreaTrendChart labels={productivityTrendLabels} series={productivitySeries} height={200} />
        </div>

        <div className="lg:col-span-5 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              WORKLOAD BY CATEGORY
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
              Tasks Completed by Module
            </h3>
          </div>
          <HorizontalBarChart data={tasksByCategoryBars} />
        </div>
      </div>

      {/* Row 3: Weekly Workload Stacked Bar */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            WORKLOAD STACK
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">
            Daily Task Load Distribution
          </h3>
        </div>
        <StackedBarChart data={weeklyWorkloadData} height={160} />
      </div>
    </DashboardShell>
  );
}
