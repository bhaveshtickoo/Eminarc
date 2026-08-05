import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ExecutiveDashboardView } from "@/features/dashboard/components/ExecutiveDashboardView";

export const Route = createFileRoute("/_dashboard/")({
  head: () => ({
    meta: [
      { title: "Executive Growth Dashboard — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "AI-First Executive Dashboard — Today's Priorities, Weekly Progress, Growth Score, Campaign Health, Research Queue, Open Risks, AI Recommendations, and Recent Activity.",
      },
    ],
  }),
  component: ExecutiveDashboardPage,
});

function ExecutiveDashboardPage() {
  return (
    <div className="pb-12">
      <ExecutiveDashboardView />
    </div>
  );
}
