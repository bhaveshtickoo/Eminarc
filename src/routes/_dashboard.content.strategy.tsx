import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ContentStrategyView } from "@/features/content/components/ContentStrategyView";

export const Route = createFileRoute("/_dashboard/content/strategy")({
  head: () => ({
    meta: [
      { title: "Content Strategy Blueprint — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Knowledge-driven content strategy blueprint — editorial mission, audience, messaging pillars, brand voice, and priority topics.",
      },
    ],
  }),
  component: ContentStrategyPage,
});

function ContentStrategyPage() {
  return (
    <div className="pb-12">
      <ContentStrategyView />
    </div>
  );
}
