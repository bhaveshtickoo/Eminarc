import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { TasksView } from "@/features/tasks";

export const Route = createFileRoute("/_dashboard/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks Management Hub — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Prioritized task backlog linked to companies, founder research, and campaigns — Kanban, Calendar, and AI Suggested views.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return <TasksView />;
}
