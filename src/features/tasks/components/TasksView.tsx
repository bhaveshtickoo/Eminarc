"use client";

import React, { useState, useEffect } from "react";
import {
  ListCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  Kanban,
  Plus,
  ShieldCheck,
  ListTodo,
  RefreshCw,
  Clock,
  Layers,
  Zap,
  FolderKanban,
  CheckSquare,
  Square,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { TaskCard, TaskItemData } from "./TaskCard";
import { TaskToolbar } from "./TaskToolbar";
import { TaskKanbanView } from "./TaskKanbanView";
import { TaskCalendarView } from "./TaskCalendarView";
import { TaskCharts } from "./TaskCharts";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { getTasks, createTask } from "@/services/tasks";
import { aiTaskGenerator } from "@/core/tasks/task-generator";
import { TaskGeneratorService } from "@/core/tasks/task-generator-service";
import { GeneratedProjectSpec, GeneratedTaskSpec } from "@/core/tasks/types";
import { cn } from "@/lib/utils";

export const taskSections = [
  "Today's Tasks",
  "Upcoming",
  "Completed",
  "AI Suggested",
  "AI Task Generator",
  "Calendar View",
  "Kanban View",
] as const;

export const TasksView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState<TaskItemData[]>([]);
  const [generatedProjects, setGeneratedProjects] = useState<GeneratedProjectSpec[]>([]);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTaskSpec[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("Today's Tasks");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const loadTasksData = async () => {
    if (!currentWorkspace?.id) return;
    setLoading(true);
    setError(null);
    try {
      const [dbTasks, aiProjects, aiTasks] = await Promise.all([
        getTasks(currentWorkspace.id),
        TaskGeneratorService.getWorkspaceProjects(currentWorkspace.id),
        TaskGeneratorService.getWorkspaceTasks(currentWorkspace.id),
      ]);

      const mapped: TaskItemData[] = dbTasks.map((t) => ({
        id: t.id,
        title: t.title,
        priority: t.priority,
        owner: t.assignedTo || "Growth OS Agent",
        dueDate: t.dueDate || "Aug 05, 2026",
        relatedCompany: currentWorkspace.name,
        relatedResearch: "Growth Audit",
        relatedCampaign: "Multi-Channel Growth Engine",
        status:
          t.status === "Completed" ? "Done" : t.status === "In Progress" ? "In Progress" : "To Do",
      }));

      setTasks(mapped);

      if (aiProjects.data) {
        setGeneratedProjects(
          aiProjects.data.map((p) => ({
            id: p.id,
            workspaceId: p.workspace_id,
            ...(p.campaign_id ? { campaignId: p.campaign_id } : {}),
            title: p.title,
            description: p.description || "",
            category: p.category,
            status: p.status as any,
          })),
        );
      }

      if (aiTasks.data) {
        setGeneratedTasks(
          aiTasks.data.map((t) => ({
            id: t.id,
            workspaceId: t.workspace_id,
            ...(t.campaign_id ? { campaignId: t.campaign_id } : {}),
            ...(t.project_id ? { projectId: t.project_id } : {}),
            title: t.title,
            description: t.description || "",
            subtasks: (t.subtasks as any) || [],
            dependencies: (t.dependencies as any) || [],
            dueDate: t.due_date,
            priority: t.priority as any,
            estimatedEffortHours: t.estimated_effort_hours,
            assignedOwner: t.assigned_owner,
            status: t.status as any,
          })),
        );
      }
    } catch (err) {
      setError((err as Error).message || "Failed to load tasks from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksData();
  }, [currentWorkspace?.id]);

  const handleGenerateAITaskGraph = async () => {
    if (!currentWorkspace?.id) return;
    setGenerating(true);
    setError(null);
    try {
      toast.info("Auto-Generating AI Task Graph...", {
        description:
          "Executing AI Task Generator to map Projects, Tasks, Subtasks, Dependencies, and Effort.",
      });

      const res = await aiTaskGenerator.generateFromPlan({
        workspaceId: currentWorkspace.id,
      });

      setGeneratedProjects(res.projects);
      setGeneratedTasks(res.tasks);

      toast.success("AI Task Graph Generated!", {
        description: `Created ${res.projects.length} Projects & ${res.tasks.length} Tasks with subtasks & DAG dependencies.`,
      });
    } catch (err) {
      const msg = (err as Error).message || "Failed to generate AI task graph.";
      setError(msg);
      toast.error("Generation Error", { description: msg });
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleSubtask = async (taskId: string, subtaskId: string) => {
    setGeneratedTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSub = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st,
          );
          TaskGeneratorService.updateTask(taskId, { subtasks: updatedSub });
          return { ...t, subtasks: updatedSub };
        }
        return t;
      }),
    );
    toast.success("Updated subtask completion state");
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "Done" ? "To Do" : "Done" } : t)),
    );
    toast.success("Updated task completion state");
  };

  const handleBulkComplete = () => {
    setTasks((prev) =>
      prev.map((t) => (selectedIds.includes(t.id) ? { ...t, status: "Done" } : t)),
    );
    toast.success(`Completed ${selectedIds.length} tasks`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setTasks((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
    toast.success(`Deleted ${selectedIds.length} tasks`);
    setSelectedIds([]);
  };

  const handleCreateNewTask = async () => {
    if (!currentWorkspace?.id) return;
    const newTaskTitle = "Strategic ICP Outreach & Qualification";
    try {
      await createTask(
        {
          title: newTaskTitle,
          description: "Manual strategic growth task created from Tasks Executive Hub.",
          category: "Outreach",
          priority: "High",
          dueDate: new Date().toISOString().split("T")[0] || new Date().toISOString().slice(0, 10),
        },
        currentWorkspace.id,
      );
      loadTasksData();
      toast.success("Task Created & Saved to Supabase");
    } catch (err) {
      toast.error("Failed to save task to Supabase");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      search === "" ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.relatedCompany.toLowerCase().includes(search.toLowerCase()) ||
      task.relatedCampaign.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;

    if (activeSection === "Today's Tasks")
      return matchesSearch && matchesPriority && matchesStatus && task.status !== "Done";
    if (activeSection === "Upcoming")
      return matchesSearch && matchesPriority && matchesStatus && task.status !== "Done";
    if (activeSection === "Completed")
      return matchesSearch && matchesPriority && matchesStatus && task.status === "Done";
    if (activeSection === "AI Suggested")
      return matchesSearch && matchesPriority && matchesStatus && task.status === "AI Suggested";

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              TASKS ENGINE / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              AI DAG GENERATOR ACTIVE
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            Executive Tasks & AI Project Generator
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Prioritized task backlog linked to workspace, campaign, and project initiatives with AI
            DAG dependencies.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            disabled={generating}
            onClick={handleGenerateAITaskGraph}
            className={cn(
              "flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm cursor-pointer",
              generating
                ? "bg-[#EFEAE1] text-[#716D64] cursor-not-allowed"
                : "bg-[#000000] text-[#FFFFFF] hover:bg-[#222222]",
            )}
          >
            {generating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-[#716D64]" />
                <span>Generating Graph...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-[#FFD700]" />
                <span>Auto-Generate AI Task Graph</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCreateNewTask}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#FFFFFF] text-[#111111] border border-[#E5E0D6] hover:bg-[#F7F4EE] font-mono text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* 7 View Mode Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 font-mono text-xs border-b border-[#E5E0D6]">
        {taskSections.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setActiveSection(sec)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium shrink-0",
              activeSection === sec
                ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
            )}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Toolbar & Filters */}
      {activeSection !== "AI Task Generator" && (
        <>
          <TaskToolbar
            search={search}
            onSearchChange={setSearch}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            selectedCount={selectedIds.length}
            onBulkComplete={handleBulkComplete}
            onBulkDelete={handleBulkDelete}
          />
          <TaskCharts />
        </>
      )}

      {/* VIEW SWITCHING CONTENT */}
      {activeSection === "AI Task Generator" ? (
        <div className="space-y-6">
          {/* Projects Summary */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64]">
                AI GENERATED PROJECTS ({generatedProjects.length})
              </h3>
              <button
                type="button"
                disabled={generating}
                onClick={handleGenerateAITaskGraph}
                className="font-mono text-xs text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> Regenerate Projects & Tasks
              </button>
            </div>

            {generatedProjects.length === 0 ? (
              <p className="font-sans text-xs text-[#716D64] italic">
                No AI Projects generated yet. Click "Auto-Generate AI Task Graph" to compile.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedProjects.map((prj) => (
                  <div
                    key={prj.id}
                    className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                        {prj.category}
                      </span>
                      <span className="font-mono text-[10px] text-[#059669] font-bold uppercase">
                        {prj.status}
                      </span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-[#111111]">{prj.title}</h4>
                    <p className="font-sans text-xs text-[#52525B]">{prj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generated Tasks List */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#716D64]">
              AI GENERATED TASK GRAPH & DEPENDENCIES ({generatedTasks.length})
            </h3>

            {generatedTasks.length === 0 ? (
              <EmptyState
                categoryTag="AI TASK ENGINE"
                icon={ListCheck}
                title="No AI Tasks Generated"
                description="Synthesize structured tasks with subtasks, DAG dependencies, effort hours, and priority."
                nextActionText="Auto-Generate AI Task Graph"
                onNextAction={handleGenerateAITaskGraph}
              />
            ) : (
              <div className="space-y-4">
                {generatedTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-white border border-[#E5E0D6] hover:border-black transition-all shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3F0E6] pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={cn(
                              "font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded text-white",
                              t.priority === "Critical"
                                ? "bg-[#DC2626]"
                                : t.priority === "High"
                                  ? "bg-[#D97706]"
                                  : "bg-[#2563EB]",
                            )}
                          >
                            {t.priority} Priority
                          </span>
                          <span className="font-mono text-[11px] text-[#716D64]">
                            Due: {t.dueDate}
                          </span>
                          <span className="font-mono text-[11px] text-[#059669] font-bold">
                            Effort: {t.estimatedEffortHours}h
                          </span>
                        </div>
                        <h4 className="font-sans font-bold text-base text-[#111111]">{t.title}</h4>
                      </div>

                      <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
                        <span className="px-2.5 py-1 rounded-md bg-[#F7F4EE] border border-[#E5E0D6] text-[#111111]">
                          Owner: <strong>{t.assignedOwner}</strong>
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-bold">
                          {t.status}
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-[#52525B]">{t.description}</p>

                    {/* Subtasks Checklist */}
                    {t.subtasks && t.subtasks.length > 0 && (
                      <div className="bg-[#FCFAF7] p-3 rounded-xl border border-[#E5E0D6] space-y-2">
                        <span className="font-mono text-[10px] font-bold uppercase text-[#716D64]">
                          Subtasks ({t.subtasks.filter((s) => s.completed).length} /{" "}
                          {t.subtasks.length}):
                        </span>
                        <div className="space-y-1.5 font-sans text-xs">
                          {t.subtasks.map((st) => (
                            <div
                              key={st.id}
                              onClick={() => handleToggleSubtask(t.id, st.id)}
                              className="flex items-center space-x-2 cursor-pointer text-[#111111] hover:text-black"
                            >
                              {st.completed ? (
                                <CheckSquare className="h-4 w-4 text-[#059669] shrink-0" />
                              ) : (
                                <Square className="h-4 w-4 text-[#716D64] shrink-0" />
                              )}
                              <span className={cn(st.completed && "line-through text-[#716D64]")}>
                                {st.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dependencies DAG footer */}
                    {t.dependencies && t.dependencies.length > 0 && (
                      <div className="font-mono text-[11px] text-[#716D64] flex items-center space-x-2">
                        <ArrowRight className="h-3.5 w-3.5 text-[#D97706]" />
                        <span>Prerequisite DAG Dependencies: </span>
                        <span className="font-bold text-[#111111]">
                          {t.dependencies.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : activeSection === "Kanban View" ? (
        <TaskKanbanView tasks={tasks} onToggleComplete={handleToggleComplete} />
      ) : activeSection === "Calendar View" ? (
        <TaskCalendarView tasks={tasks} />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-[#716D64] px-1">
            <span className="font-bold text-[#111111]">
              {activeSection.toUpperCase()} ({filteredTasks.length})
            </span>
            <span>CLICK CHECKBOX TO COMPLETE TASK</span>
          </div>

          {loading ? (
            <div className="space-y-3">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : error ? (
            <ErrorState
              categoryTag="TASKS FETCH ERROR"
              title="Unable to load tasks backlog"
              description="A database connection error occurred while querying tasks from Supabase."
              errorMessage={error}
              onRetry={loadTasksData}
            />
          ) : filteredTasks.length > 0 ? (
            <div className="space-y-2.5">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isSelected={selectedIds.includes(task.id)}
                  onToggleSelect={(id) =>
                    setSelectedIds((prev) =>
                      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
                    )
                  }
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              categoryTag="TASKS BACKLOG"
              icon={ListTodo}
              title="No Tasks Matching Selected Criteria"
              description="Create a new strategic growth task linked directly to founder research, companies, or active campaigns."
              nextActionText="Create New Task"
              onNextAction={handleCreateNewTask}
              secondaryActionText="Clear Task Filters"
              onSecondaryAction={() => {
                setSearch("");
                setPriorityFilter("All");
                setStatusFilter("All");
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
