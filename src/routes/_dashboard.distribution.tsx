import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { DistributionQueueView } from "@/features/distribution/DistributionQueueView";

export const Route = createFileRoute("/_dashboard/distribution")({
  head: () => ({
    meta: [
      { title: "Distribution Queue — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Multi-channel distribution dispatch queue — track scheduled posts, pending approvals, queue, completed dispatches, and failures.",
      },
    ],
  }),
  component: DistributionQueuePage,
});

function DistributionQueuePage() {
  return (
    <div className="pb-12">
      <DistributionQueueView />
    </div>
  );
}
