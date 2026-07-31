'use client';

import React, { useState } from 'react';
import { ListTodo, Check } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';

export interface TaskItem {
  id: string;
  label: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  category?: string;
}

export const initialTasks: TaskItem[] = [
  {
    id: 't-1',
    label: 'Publish LinkedIn Post',
    priority: 'High',
    completed: false,
    category: 'Content',
  },
  {
    id: 't-2',
    label: 'Review AI Visibility Audit',
    priority: 'High',
    completed: false,
    category: 'Audit',
  },
  {
    id: 't-3',
    label: 'Follow up with 3 leads',
    priority: 'Medium',
    completed: false,
    category: 'CRM',
  },
  {
    id: 't-4',
    label: 'Approve Carousel Content',
    priority: 'Medium',
    completed: false,
    category: 'Content',
  },
  {
    id: 't-5',
    label: 'Run Visibility Scan',
    priority: 'Low',
    completed: false,
    category: 'Audit',
  },
];

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const priorityBadges = {
    High: 'bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]',
    Medium: 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]',
    Low: 'bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]',
  };

  return (
    <div className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              TASKS / 001
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              {tasks.filter((t) => t.completed).length}/{tasks.length} DONE
            </span>
          </div>
          <h3 className="font-sans text-lg font-semibold tracking-tight text-[#111111] mt-1">
            Today&apos;s Priorities
          </h3>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
          <ListTodo className="h-4 w-4" />
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="space-y-2.5 flex-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              'group flex items-center justify-between rounded-xl border p-3.5 transition-all duration-150 cursor-pointer select-none',
              task.completed
                ? 'bg-[#F5F0E6]/50 border-[#E5E0D6] opacity-70'
                : 'bg-[#FFFFFF] border-[#E5E0D6] hover:border-[#D8D2C5] hover:bg-[#FBF9F5] shadow-[0_1px_2px_0_rgba(0,0,0,0.01)]'
            )}
          >
            <div className="flex items-center space-x-3 min-w-0">
              {/* Checkbox Icon */}
              <div
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-md border transition-all shrink-0',
                  task.completed
                    ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                    : 'border-[#D8D2C5] bg-[#FFFFFF] group-hover:border-[#000000]'
                )}
              >
                {task.completed && <Check className="h-3.5 w-3.5" />}
              </div>

              {/* Task Label */}
              <span
                className={cn(
                  'font-sans text-sm font-medium tracking-tight text-[#18181B] truncate',
                  task.completed && 'line-through text-[#716D64]'
                )}
              >
                {task.label}
              </span>
            </div>

            {/* Priority Badge */}
            <span
              className={cn(
                'ml-3 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider shrink-0',
                priorityBadges[task.priority]
              )}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
