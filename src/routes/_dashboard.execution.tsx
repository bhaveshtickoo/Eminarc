import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ExecutionPlannerView } from "@/features/execution/components/ExecutionPlannerView";

export const Route = createFileRoute("/_dashboard/execution")({
  head: () => ({
    meta: [
      { title: "Execution Planner — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Convert Research + Strategy into execution plans — Campaigns, Projects, Milestones, Tasks DAG, KPIs, and Timelines.",
      },
    ],
  }),
  component: ExecutionPage,
});

function ExecutionPage() {
  return (
    <div className="pb-12">
      <ExecutionPlannerView />
    </div>
  );
}
