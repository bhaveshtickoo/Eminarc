import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ReportsView } from "@/features/reports";

export const Route = createFileRoute("/_dashboard/reports")({
  head: () => ({
    meta: [
      { title: "Consulting Reports — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "McKinsey & BCG-style executive consulting reports — Weekly Growth, Monthly Executive, Content Performance, CRM, AI Visibility, and Competitor analysis.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return <ReportsView />;
}
