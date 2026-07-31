import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tasks as initialTasks } from "@/lib/mock-data";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Eminarc Growth OS" },
      { name: "description", content: "Today's growth work, prioritized." },
    ],
  }),
  component: Tasks,
});

const priorityColor: Record<string, string> = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-chart-4/15 text-chart-4",
  low: "bg-muted text-muted-foreground",
};

function Tasks() {
  const [taskList, setTaskList] = useState(initialTasks);

  const toggle = (id: string) => {
    setTaskList((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    toast.success("Task updated");
  };

  const open = taskList.filter((t) => !t.done);
  const done = taskList.filter((t) => t.done);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task Center"
        description="Today's work — approved by you, executed by AI agents."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Open tasks" value={open.length} icon={<ListTodo className="h-4 w-4" />} />
        <StatCard
          label="Completed"
          value={done.length}
          icon={<CheckCircle2 className="h-4 w-4" />}
          accent="text-success"
        />
        <StatCard
          label="High priority"
          value={open.filter((t) => t.priority === "high").length}
          accent="text-destructive"
        />
      </div>

      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Today</h2>
          <Badge variant="secondary">{open.length} remaining</Badge>
        </div>
        <div className="space-y-1">
          {taskList.map((t) => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-accent/40"
            >
              {t.done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
              )}
              <span
                className={cn("flex-1 text-sm", t.done && "text-muted-foreground line-through")}
              >
                {t.title}
              </span>
              <Badge variant="outline" className="hidden sm:inline">
                {t.channel}
              </Badge>
              <Badge variant="secondary" className={priorityColor[t.priority]}>
                {t.priority}
              </Badge>
              <span className="w-16 text-right text-xs text-muted-foreground">{t.due}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
  accent?: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className={cn("rounded-lg bg-muted p-2.5", accent)}>{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
}
