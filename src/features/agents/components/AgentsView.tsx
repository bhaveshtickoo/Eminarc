"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  Search,
  FileText,
  Eye,
  Kanban,
  Share2,
  BarChart3,
  Calendar,
  ShieldCheck,
  Zap,
  Play,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { AgentCard, AgentCardData } from "./AgentCard";
import { AgentDetailPanel } from "./AgentDetailPanel";
import { AgentCharts } from "./AgentCharts";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { getAgentsList } from "@/services/agents";

export const initialAgents: AgentCardData[] = [
  {
    id: "ag-research",
    name: "Founder Research Agent",
    role: "Market & Founder Intelligence",
    icon: Search,
    status: "Completed",
    successRate: 98.8,
    avgRuntime: "1.2s",
    tasksCompleted: 142,
    lastRun: "10 mins ago",
    nextScheduledRun: "In 2 hours",
    confidenceScore: 98,
    purpose: "Scrapes domain headers, parses founder LinkedIn, and populates 13 Workspace Knowledge Base entities.",
  },
  {
    id: "ag-content",
    name: "Content Strategist Agent",
    role: "Editorial & Repurposing Engine",
    icon: FileText,
    status: "Running",
    successRate: 97.4,
    avgRuntime: "2.4s",
    tasksCompleted: 128,
    lastRun: "Running now",
    nextScheduledRun: "Continuous",
    confidenceScore: 96,
    purpose: "Transforms core research breakdowns into 8 multi-channel assets (LinkedIn, Medium, X, Newsletter, etc.).",
  },
  {
    id: "ag-visibility",
    name: "AI Visibility Agent",
    role: "Generative Engine Optimization (GEO)",
    icon: Eye,
    status: "Idle",
    successRate: 99.1,
    avgRuntime: "1.8s",
    tasksCompleted: 94,
    lastRun: "45 mins ago",
    nextScheduledRun: "In 1 hour",
    confidenceScore: 97,
    purpose: "Audits ChatGPT, Claude, and Perplexity brand citation indexing and outputs structured schema fixes.",
  },
  {
    id: "ag-crm",
    name: "CRM Assistant Agent",
    role: "Lead Intelligence & Pipeline",
    icon: Kanban,
    status: "Idle",
    successRate: 98.2,
    avgRuntime: "0.9s",
    tasksCompleted: 116,
    lastRun: "1 hour ago",
    nextScheduledRun: "In 3 hours",
    confidenceScore: 95,
    purpose: "Qualifies inbound founder prospects, calculates AI fit scores, and moves Kanban deals automatically.",
  },
  {
    id: "ag-distribution",
    name: "Distribution Agent",
    role: "Social Provider Dispatch",
    icon: Share2,
    status: "Completed",
    successRate: 96.5,
    avgRuntime: "1.5s",
    tasksCompleted: 88,
    lastRun: "15 mins ago",
    nextScheduledRun: "In 4 hours",
    confidenceScore: 94,
    purpose: "Dispatches approved assets to LinkedIn, X, Substack, and Reddit provider endpoints.",
  },
  {
    id: "ag-analytics",
    name: "Analytics Agent",
    role: "Telemetry & Attribution",
    icon: BarChart3,
    status: "Idle",
    successRate: 99.5,
    avgRuntime: "0.8s",
    tasksCompleted: 76,
    lastRun: "3 hours ago",
    nextScheduledRun: "In 6 hours",
    confidenceScore: 99,
    purpose: "Aggregates cross-channel engagement metrics, impressions, and CAC conversion velocity.",
  },
  {
    id: "ag-weekly-review",
    name: "Weekly Review Agent",
    role: "Executive Strategy Audit",
    icon: Calendar,
    status: "Idle",
    successRate: 97.9,
    avgRuntime: "3.1s",
    tasksCompleted: 45,
    lastRun: "2 days ago",
    nextScheduledRun: "Sunday 09:00 AM",
    confidenceScore: 96,
    purpose: "Synthesizes weekly growth OS telemetry into an executive board briefing for founders.",
  },
];

export const AgentsView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [agents, setAgents] = useState<AgentCardData[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<AgentCardData>(initialAgents[0]!);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAgentsData = async () => {
    setLoading(true);
    setError(null);
    try {
      await getAgentsList(currentWorkspace?.id);
    } catch (err) {
      setError((err as Error).message || "Failed to load agent runs from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgentsData();
  }, [currentWorkspace?.id]);

  const handleTriggerRunAll = () => {
    toast.success("Orchestrating All 7 Agents", {
      description: "Triggered sequential background workflow across Eminarc AI Agent suite.",
    });
  };

  const handleTriggerSingleRun = (id: string, name: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Running" } : a)),
    );
    toast.success(`Triggered ${name}`);
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "Completed" } : a)),
      );
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Banner Header */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              ORCHESTRATION CENTER / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              7 AGENTS OPERATIONAL
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            AI Agent Orchestration Center
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Autonomous growth agents powering research, content generation, GEO visibility, and CRM intelligence for {currentWorkspace.name}.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={handleTriggerRunAll}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer shadow-sm"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Run All 7 Agents</span>
          </button>
        </div>
      </div>

      {/* 7 Agent Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-[#716D64] px-1">
          <span className="font-bold text-[#111111]">7 AUTONOMOUS SPECIALIZED AGENTS</span>
          <span>SELECT AGENT CARD TO INSPECT</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : error ? (
          <ErrorState
            categoryTag="AGENTS ORCHESTRATION ERROR"
            title="Unable to query agent runs"
            description="A database connection error occurred while fetching autonomous agent logs from Supabase."
            errorMessage={error}
            onRetry={loadAgentsData}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent.id === agent.id}
                onSelect={setSelectedAgent}
                onTriggerRun={handleTriggerSingleRun}
              />
            ))}
          </div>
        )}
      </div>

      {/* Agent Detail Inspection Panel */}
      <AgentDetailPanel agent={selectedAgent} />

      {/* 4 Shared Recharts Charts */}
      <AgentCharts />
    </div>
  );
};
