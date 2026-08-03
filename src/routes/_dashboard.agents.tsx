import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { AgentsView } from "@/features/agents";

export const Route = createFileRoute("/_dashboard/agents")({
  head: () => ({
    meta: [
      { title: "AI Agent Orchestration Center — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Orchestrate 7 specialized autonomous agents — Founder Research, Content Strategist, AI Visibility, CRM Assistant, Distribution, Analytics, and Weekly Review.",
      },
    ],
  }),
  component: AIAgentsPage,
});

function AIAgentsPage() {
  return <AgentsView />;
}
