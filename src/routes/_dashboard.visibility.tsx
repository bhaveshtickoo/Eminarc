import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { VisibilityView } from "@/features/visibility";

export const Route = createFileRoute("/_dashboard/visibility")({
  head: () => ({
    meta: [
      { title: "AI Search Visibility Radar — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Track brand citations across ChatGPT, Claude, Gemini, Perplexity, Google AI Overview, Reddit, and LinkedIn.",
      },
    ],
  }),
  component: AIVisibilityPage,
});

function AIVisibilityPage() {
  return <VisibilityView />;
}
