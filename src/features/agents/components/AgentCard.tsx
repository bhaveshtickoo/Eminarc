"use client";

import React from "react";
import {
  Bot,
  CheckCircle2,
  Clock,
  Play,
  RotateCw,
  AlertTriangle,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AgentCardData {
  id: string;
  name: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "Idle" | "Running" | "Completed" | "Error";
  successRate: number; // e.g. 98.4
  avgRuntime: string; // e.g. "1.2s"
  tasksCompleted: number; // e.g. 142
  lastRun: string; // e.g. "10 mins ago"
  nextScheduledRun: string; // e.g. "In 2 hours"
  confidenceScore: number; // e.g. 96
  purpose: string;
}

export interface AgentCardProps {
  agent: AgentCardData;
  isSelected?: boolean;
  onSelect?: (agent: AgentCardData) => void;
  onTriggerRun?: (id: string, name: string) => void;
}

export const statusBadges: Record<string, string> = {
  Idle: "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
  Running: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Completed: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
  Error: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
};

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  isSelected,
  onSelect,
  onTriggerRun,
}) => {
  const Icon = agent.icon;

  return (
    <div
      onClick={() => onSelect?.(agent)}
      className={cn(
        "group rounded-[18px] bg-[#FCFAF7] border p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 cursor-pointer select-none space-y-3",
        isSelected
          ? "border-[#18181B] bg-[#FFFFFF] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06)] ring-1 ring-[#18181B]"
          : "border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.14)] hover:bg-[#FFFFFF]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold shrink-0">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-[#111111] leading-tight">
              {agent.name}
            </h3>
            <span className="font-mono text-[9px] text-[#716D64] block">{agent.role}</span>
          </div>
        </div>

        <span
          className={cn(
            "font-mono text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border shrink-0 flex items-center space-x-1",
            statusBadges[agent.status],
          )}
        >
          {agent.status === "Running" && <RotateCw className="h-3 w-3 animate-spin mr-1" />}
          <span>{agent.status}</span>
        </span>
      </div>

      <p className="font-sans text-xs text-[#716D64] leading-relaxed line-clamp-2">
        {agent.purpose}
      </p>

      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-3 gap-2 font-mono text-[10px] bg-[#FCFAF7] p-2.5 rounded-xl border border-[#E5E0D6]">
        <div>
          <span className="text-[#716D64] block text-[8px]">SUCCESS RATE</span>
          <strong className="text-[#2D6A4F]">{agent.successRate}%</strong>
        </div>
        <div>
          <span className="text-[#716D64] block text-[8px]">AVG RUNTIME</span>
          <strong className="text-[#18181B]">{agent.avgRuntime}</strong>
        </div>
        <div>
          <span className="text-[#716D64] block text-[8px]">TASKS DONE</span>
          <strong className="text-[#18181B]">{agent.tasksCompleted}</strong>
        </div>
      </div>

      {/* Footer & Confidence */}
      <div className="flex items-center justify-between pt-2 border-t border-[rgba(0,0,0,0.06)] font-mono text-[10px] text-[#716D64]">
        <div className="flex items-center space-x-1 text-[#0369A1] font-bold">
          <Sparkles className="h-3 w-3 text-[#0369A1]" />
          <span>Confidence: {agent.confidenceScore}%</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTriggerRun?.(agent.id, agent.name);
          }}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
        >
          <Play className="h-3 w-3 fill-current" />
          <span>Run</span>
        </button>
      </div>
    </div>
  );
};
