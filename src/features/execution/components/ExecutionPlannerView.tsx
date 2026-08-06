"use client";

import React, { useState, useEffect } from "react";
import {
  Rocket,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Clock,
  Layers,
  Target,
  BarChart3,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { executionPlanner } from "@/core/execution/planner";
import { ExecutionService } from "@/core/execution/execution-service";
import { StructuredOperatingPlan, TaskSpec } from "@/core/execution/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";

export const ExecutionPlannerView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [plan, setPlan] = useState<StructuredOperatingPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [synthesizing, setSynthesizing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "campaigns" | "projects" | "milestones" | "tasks" | "kpis"
  >("overview");

  const loadPlan = async () => {
    if (!currentWorkspace?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await ExecutionService.getOperatingPlan(currentWorkspace.id);
      if (res.data?.operating_plan_spec) {
        setPlan(res.data.operating_plan_spec as unknown as StructuredOperatingPlan);
      } else {
        setPlan(null);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to load operating plan from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
  }, [currentWorkspace?.id]);

  const handleSynthesizePlan = async () => {
    if (!currentWorkspace?.id) return;
    setSynthesizing(true);
    setError(null);
    try {
      toast.info("Synthesizing Execution Operating Plan...", {
        description: "Executing AI Orchestrator across Research, Strategy, and Memory layers.",
      });

      const compiled = await executionPlanner.generateExecutionPlan({
        workspaceId: currentWorkspace.id,
      });

      setPlan(compiled);
      toast.success("Execution Operating Plan Synthesized!", {
        description:
          "Campaigns, Projects, Milestones, Task DAG, and KPIs generated and persisted to Supabase.",
      });
    } catch (err) {
      const msg = (err as Error).message || "Failed to synthesize execution plan.";
      setError(msg);
      toast.error("Synthesis Error", { description: msg });
    } finally {
      setSynthesizing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              EXECUTION PLANNER / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              AI ORCHESTRATOR ACTIVE
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            AI Growth Operating Plan Engine
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Convert Research + Strategy into machine-executable campaigns, projects, milestones,
            tasks DAG, and KPIs.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            disabled={synthesizing}
            onClick={handleSynthesizePlan}
            className={cn(
              "flex items-center space-x-2 px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-sm cursor-pointer",
              synthesizing
                ? "bg-[#EFEAE1] text-[#716D64] cursor-not-allowed"
                : "bg-[#000000] text-[#FFFFFF] hover:bg-[#222222]",
            )}
          >
            {synthesizing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-[#716D64]" />
                <span>Synthesizing Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-[#FFD700]" />
                <span>Synthesize Operating Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 font-mono text-xs border-b border-[#E5E0D6]">
        {(["overview", "campaigns", "projects", "milestones", "tasks", "kpis"] as const).map(
          (tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium capitalize shrink-0",
                activeTab === tab
                  ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                  : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
              )}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      {/* Content State Handling */}
      {loading ? (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          categoryTag="EXECUTION PLANNER ERROR"
          title="Operating Plan Generation Failed"
          description="An error occurred while compiling strategy and research into the execution plan."
          errorMessage={error}
          onRetry={loadPlan}
        />
      ) : !plan ? (
        <EmptyState
          categoryTag="EXECUTION ENGINE"
          icon={Rocket}
          title="No Operating Plan Synthesized Yet"
          description="Click 'Synthesize Operating Plan' to run the AI Execution Engine and automatically generate campaigns, projects, milestones, task DAG, and KPIs."
          nextActionText="Synthesize Operating Plan"
          onNextAction={handleSynthesizePlan}
        />
      ) : (
        <div className="space-y-6">
          {/* Plan Header Specs */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] font-bold text-[#D97706] uppercase tracking-wider">
                ACTIVE SPECIFICATION
              </span>
              <h2 className="font-sans font-bold text-xl text-[#111111] mt-0.5">{plan.title}</h2>
              <p className="font-sans text-xs text-[#716D64] mt-1">
                Workspace ID: <span className="font-mono">{plan.workspaceId}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] border border-[#E5E0D6] text-[#111111]">
                Campaigns: <strong>{plan.campaigns.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] border border-[#E5E0D6] text-[#111111]">
                Projects: <strong>{plan.projects.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] border border-[#E5E0D6] text-[#111111]">
                Milestones: <strong>{plan.milestones.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] border border-[#E5E0D6] text-[#111111]">
                Tasks DAG: <strong>{plan.tasks.length}</strong>
              </span>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {(activeTab === "overview" || activeTab === "campaigns") && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64] px-1">
                Growth Campaigns ({plan.campaigns.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.campaigns.map((cmp) => (
                  <div
                    key={cmp.id}
                    className="p-5 rounded-2xl bg-white border border-[#E5E0D6] hover:border-black transition-all shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0]">
                        {cmp.channel}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded-md">
                        {cmp.priority} Priority
                      </span>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-base text-[#111111]">{cmp.name}</h4>
                      <p className="font-sans text-xs text-[#52525B] mt-1">{cmp.objective}</p>
                    </div>

                    <div className="pt-2 border-t border-[#F3F0E6] flex flex-wrap items-center justify-between text-xs font-mono text-[#716D64]">
                      <span>
                        Owner: <strong>{cmp.owner}</strong>
                      </span>
                      <span>
                        Timeline: <strong>{cmp.timeline}</strong>
                      </span>
                    </div>

                    <div className="bg-[#FCFAF7] p-2.5 rounded-xl border border-[#E5E0D6] text-[11px] font-mono">
                      <span className="font-bold text-[#111111]">Impact: </span>
                      <span className="text-[#D97706] font-semibold">{cmp.expectedImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {(activeTab === "overview" || activeTab === "projects") && (
            <div className="space-y-4 pt-4 border-t border-[#E5E0D6]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64] px-1">
                Growth Projects ({plan.projects.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.projects.map((prj) => (
                  <div
                    key={prj.id}
                    className="p-5 rounded-2xl bg-white border border-[#E5E0D6] hover:border-black transition-all shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                        {prj.category}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded-md">
                        {prj.priority} Priority
                      </span>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-base text-[#111111]">{prj.name}</h4>
                      <p className="font-sans text-xs text-[#52525B] mt-1">
                        Impact: {prj.expectedImpact}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1 font-sans text-xs text-[#111111]">
                        {prj.deliverables?.map((d, i) => (
                          <li key={i} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#059669] shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MILESTONES TAB */}
          {(activeTab === "overview" || activeTab === "milestones") && (
            <div className="space-y-4 pt-4 border-t border-[#E5E0D6]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64] px-1">
                Execution Milestones ({plan.milestones.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.milestones.map((mls) => (
                  <div
                    key={mls.id}
                    className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#E5E0D6] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-md">
                        {mls.timeframe}
                      </span>
                      <span className="font-mono text-[11px] text-[#2563EB] font-bold">
                        Target: {mls.targetDateIso}
                      </span>
                    </div>
                    <h4 className="font-sans font-bold text-base text-[#111111]">{mls.title}</h4>
                    <p className="font-sans text-xs text-[#059669] font-medium">
                      {mls.expectedImpact}
                    </p>
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase">
                        Deliverables:
                      </span>
                      <ul className="space-y-1 font-sans text-xs text-[#111111]">
                        {mls.keyDeliverables?.map((kd, i) => (
                          <li key={i} className="flex items-center space-x-1.5">
                            <Zap className="h-3.5 w-3.5 text-[#D97706] shrink-0" />
                            <span>{kd}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TASKS DAG TAB */}
          {(activeTab === "overview" || activeTab === "tasks") && (
            <div className="space-y-4 pt-4 border-t border-[#E5E0D6]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64] px-1">
                Task Execution Graph (DAG Dependencies) ({plan.tasks.length})
              </h3>
              <div className="space-y-3">
                {plan.tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-white border border-[#E5E0D6] hover:border-black transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#F7F4EE] text-[#111111] border border-[#E5E0D6]">
                          Step #{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#DC2626] text-white">
                          {task.priority}
                        </span>
                        <span className="font-mono text-[10px] text-[#716D64]">{task.owner}</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-[#111111]">{task.title}</h4>
                      <p className="font-sans text-xs text-[#52525B]">{task.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
                      {task.dependencies && task.dependencies.length > 0 ? (
                        <span className="px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[11px] font-bold">
                          Prereq: {task.dependencies.join(", ")}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-[11px] font-bold">
                          Root Task
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md bg-[#F7F4EE] text-[#111111] border border-[#E5E0D6]">
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KPIS TAB */}
          {(activeTab === "overview" || activeTab === "kpis") && (
            <div className="space-y-4 pt-4 border-t border-[#E5E0D6]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64] px-1">
                Target KPIs & Measurement Cadence ({plan.kpis.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plan.kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="p-4 rounded-xl bg-white border border-[#E5E0D6] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">
                        {kpi.cadence}
                      </span>
                      <span className="font-mono text-[10px] text-[#716D64]">{kpi.owner}</span>
                    </div>
                    <h5 className="font-sans font-bold text-sm text-[#111111]">{kpi.metric}</h5>
                    <p className="font-mono text-xs font-bold text-[#059669]">
                      {kpi.targetBenchmark}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
