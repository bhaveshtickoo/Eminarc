import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ResearchHeader } from "@/features/research/ResearchHeader";
import { ResearchHistory } from "@/features/research/ResearchHistory";

export const Route = createFileRoute("/_dashboard/research/history")({
  head: () => ({
    meta: [
      { title: "Research History — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Archive log of previous founder research reports, confidence metrics, and strategic audits.",
      },
    ],
  }),
  component: ResearchHistoryPage,
});

function ResearchHistoryPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <ResearchHeader activeStep={5} />

      {/* Main History Component View */}
      <ResearchHistory />
    </div>
  );
}
