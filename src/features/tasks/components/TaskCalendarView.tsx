"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { TaskItemData } from "./TaskCard";

export interface TaskCalendarViewProps {
  tasks: TaskItemData[];
}

export const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({ tasks }) => {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      <div className="flex items-center justify-between font-mono text-xs font-bold text-[#716D64] border-b border-[#E5E0D6] pb-3">
        <span>TASK CALENDAR / AUGUST 2026</span>
        <span>{tasks.length} TASKS PLANNED</span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          // Mock filter day tasks
          const dayTasks = tasks.filter((_, idx) => (idx % 7) + 1 === (day % 7) + 1);

          return (
            <div
              key={day}
              className="min-h-[100px] p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex flex-col justify-between"
            >
              <span className="font-mono text-xs font-bold text-[#18181B]">{day}</span>

              <div className="space-y-1">
                {dayTasks.slice(0, 2).map((t) => (
                  <div
                    key={t.id}
                    className="p-1 rounded bg-[#FCFAF7] border border-[#E5E0D6] font-mono text-[9px] truncate font-bold text-[#111111]"
                  >
                    {t.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
