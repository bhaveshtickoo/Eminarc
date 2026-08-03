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
import { getTasks } from "@/services/tasks";
import { cn } from "@/lib/utils";

export const initialTasks: TaskItemData[] = [
  {
    id: "tsk-1",
    title: "Deliver MSA Contract Draft to TrueLift.ai",
    priority: "High",
    owner: "Bhavesh Tickoo",
    dueDate: "Aug 03, 2026",
    relatedCompany: "TrueLift.ai",
    relatedResearch: "TrueLift Founder Audit",
    relatedCampaign: "System Over Campaign Q3",
    status: "To Do",
  },
  {
    id: "tsk-2",
    title: "Deploy FAQ JSON-LD Schema for ChatGPT Citations",
    priority: "High",
    owner: "Pratyush",
    dueDate: "Aug 04, 2026",
    relatedCompany: "Eminarc OS",
    relatedResearch: "GEO AI Citation Radar",
    relatedCampaign: "GEO AI Search Citation",
    status: "In Progress",
  },
  {
    id: "tsk-3",
    title: "Schedule Q3 Content Audit Call with Revix Systems",
    priority: "Medium",
    owner: "Aditya",
    dueDate: "Aug 05, 2026",
    relatedCompany: "Revix Systems",
    relatedResearch: "Revix Content Teardown",
    relatedCampaign: "Organic Inbound",
    status: "To Do",
  },
  {
    id: "tsk-4",
    title: "AI Suggestion: Re-index Perplexity Citation Metadata",
    priority: "Medium",
    owner: "Bhavesh Tickoo",
    dueDate: "Aug 06, 2026",
    relatedCompany: "Senpai AI",
    relatedResearch: "Senpai Market Report",
    relatedCampaign: "GEO AI Search Citation",
    status: "AI Suggested",
  },
  {
    id: "tsk-5",
    title: "Publish 10 Founder Bottlenecks X Thread",
    priority: "Low",
    owner: "Pratyush",
    dueDate: "Aug 02, 2026",
    relatedCompany: "HyperScale SaaS",
    relatedResearch: "ICP Pain Points Audit",
    relatedCampaign: "System Over Campaign Q3",
    status: "Done",
  },
];

export const taskSections = [
  "Today's Tasks",
  "Upcoming",
  "Completed",
  "AI Suggested",
  "Calendar View",
  "Kanban View",
] as const;

export const TasksView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState<TaskItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("Today's Tasks");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const loadTasksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks(currentWorkspace?.id);
      const mapped: TaskItemData[] = data.map((t) => ({
        id: t.id,
        title: t.title,
        priority: t.priority,
        owner: t.assignedTo || "Bhavesh Tickoo",
        dueDate: t.dueDate || "Aug 05, 2026",
        relatedCompany: currentWorkspace?.name || "Eminarc Growth OS",
        relatedResearch: "Growth Audit",
        relatedCampaign: "System Over Campaign Q3",
        status: t.status === "Completed" ? "Done" : t.status === "In Progress" ? "In Progress" : "To Do",
      }));
      setTasks(mapped);
    } catch (err) {
      setError((err as Error).message || "Failed to load tasks from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksData();
  }, [currentWorkspace?.id]);

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Done" ? "To Do" : "Done" }
          : t,
      ),
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

  const handleCreateNewTask = () => {
    const newTask: TaskItemData = {
      id: `tsk-${Date.now()}`,
      title: "New Strategic Growth Task",
      priority: "Medium",
      owner: "Bhavesh Tickoo",
      dueDate: "Tomorrow",
      relatedCompany: "Active Prospect",
      relatedResearch: "Growth Audit",
      relatedCampaign: "System Over Campaign Q3",
      status: "To Do",
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success("Created New Task", {
      description: "Task item added to workspace backlog.",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      search === "" ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.relatedCompany.toLowerCase().includes(search.toLowerCase()) ||
      task.relatedCampaign.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;

    if (activeSection === "Today's Tasks") return matchesSearch && matchesPriority && matchesStatus && task.status !== "Done";
    if (activeSection === "Upcoming") return matchesSearch && matchesPriority && matchesStatus && task.status !== "Done";
    if (activeSection === "Completed") return matchesSearch && matchesPriority && matchesStatus && task.status === "Done";
    if (activeSection === "AI Suggested") return matchesSearch && matchesPriority && matchesStatus && task.status === "AI Suggested";

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
              KNOWLEDGE BASE LINKED
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            Executive Tasks Management Hub
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Prioritized task backlog linked directly to companies, founder research, and campaigns.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={handleCreateNewTask}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* 6 View Mode Tabs */}
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

      {/* 4 Shared Recharts Charts */}
      <TaskCharts />

      {/* VIEW SWITCHING CONTENT */}
      {activeSection === "Kanban View" ? (
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
