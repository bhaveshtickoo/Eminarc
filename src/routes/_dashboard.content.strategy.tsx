import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { StrategyDashboardView } from "@/features/strategy/components/StrategyDashboardView";

export const Route = createFileRoute("/_dashboard/content/strategy")({
  head: () => ({
    meta: [
      { title: "Strategy Dashboard — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Autonomous Growth Strategy Playbook — Executive Summary, ICP, Personas, Messaging, Positioning, Channels, Roadmap, KPIs, and Regeneration.",
      },
    ],
  }),
  component: ContentStrategyPage,
});

function ContentStrategyPage() {
  return (
    <div className="pb-12">
      <StrategyDashboardView />
    </div>
  );
}
