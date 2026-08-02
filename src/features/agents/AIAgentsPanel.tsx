"use client";

import React from "react";
import { Bot } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface AIAgentItem {
  id: string;
  name: string;
  role: string;
  status: "Scanning" | "Active" | "Idle";
  lastRun: string;
  tasksCompleted: number;
}

export const aiAgentsList: AIAgentItem[] = [
  {
    id: "agent-1",
    name: "Search Visibility Radar",
    role: "LLM Citation Tracker",
    status: "Scanning",
    lastRun: "2m ago",
    tasksCompleted: 142,
  },
  {
    id: "agent-2",
    name: "Content Generation Engine",
    role: "Multi-Format Asset Creator",
    status: "Active",
    lastRun: "15m ago",
    tasksCompleted: 88,
  },
  {
    id: "agent-3",
    name: "Lead Enrichment Agent",
    role: "ICP Account Scanner",
    status: "Active",
    lastRun: "1h ago",
    tasksCompleted: 215,
  },
  {
    id: "agent-4",
    name: "Competitor Radar Agent",
    role: "Messaging Gap Monitor",
    status: "Idle",
    lastRun: "3h ago",
    tasksCompleted: 64,
  },
];

export const AIAgentsPanel: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Bot className="h-4 w-4 text-[#18181B]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              AUTONOMOUS AI AGENTS
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0] font-bold">
            4 AGENTS DEPLOYED
          </span>
        </div>

        <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
          AI Growth Agents Status
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
          Background intelligent agents operating for {currentWorkspace.name}.
        </p>
      </div>

      {/* Agents List */}
      <div className="space-y-2.5 my-4">
        {aiAgentsList.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-xs shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#000000] text-[#FFFFFF] shrink-0 font-mono font-bold text-[10px]">
                AI
              </div>
              <div>
                <h4 className="font-sans font-semibold text-[#111111] leading-snug">
                  {agent.name}
                </h4>
                <span className="font-mono text-[9px] text-[#716D64] block">{agent.role}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 font-mono text-[10px]">
              <span className="text-[#716D64] hidden sm:inline">{agent.tasksCompleted} tasks</span>
              <span
                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full font-semibold ${
                  agent.status === "Scanning"
                    ? "bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]"
                    : agent.status === "Active"
                      ? "bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]"
                      : "bg-[#EFEAE1] text-[#716D64]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === "Idle" ? "bg-[#716D64]" : "bg-[#2D6A4F] animate-pulse"
                  }`}
                />
                <span>{agent.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <span>ALL AGENTS HEALTHY</span>
        <span className="font-bold text-[#111111]">100% UPTIME</span>
      </div>
    </div>
  );
};
