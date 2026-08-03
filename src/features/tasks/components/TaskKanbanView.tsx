"use client";

import React, { useState } from "react";
import { TaskCard, TaskItemData } from "./TaskCard";

export interface TaskKanbanViewProps {
  tasks: TaskItemData[];
  onToggleComplete?: (id: string) => void;
}

export const kanbanStages = ["To Do", "In Progress", "Done", "AI Suggested"] as const;

export const TaskKanbanView: React.FC<TaskKanbanViewProps> = ({
  tasks,
  onToggleComplete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start select-none">
      {kanbanStages.map((stage) => {
        const stageTasks = tasks.filter((t) => t.status === stage);

        return (
          <div
            key={stage}
            className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-4 space-y-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] min-h-[360px]"
          >
            <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-2 font-mono text-xs">
              <span className="font-bold text-[#111111]">{stage}</span>
              <span className="h-5 w-5 rounded-full bg-[#EFEAE1] text-[#18181B] flex items-center justify-center font-bold text-[10px]">
                {stageTasks.length}
              </span>
            </div>

            <div className="space-y-2">
              {stageTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                />
              ))}

              {stageTasks.length === 0 && (
                <div className="h-32 border border-dashed border-[#E5E0D6] rounded-xl flex items-center justify-center font-mono text-[10px] text-[#A19B8E]">
                  No tasks in {stage}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
