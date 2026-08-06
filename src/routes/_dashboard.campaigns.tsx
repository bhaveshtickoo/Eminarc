import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { CampaignEngineView } from "@/features/campaigns/components/CampaignEngineView";

export const Route = createFileRoute("/_dashboard/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaign Engine — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Multi-channel growth campaign engine supporting LinkedIn, Email, SEO, Website, Partnerships, Paid, Events, and Communities.",
      },
    ],
  }),
  component: CampaignPage,
});

function CampaignPage() {
  return (
    <div className="pb-12">
      <CampaignEngineView />
    </div>
  );
}
