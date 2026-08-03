import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { CRMView } from "@/features/crm";

export const Route = createFileRoute("/_dashboard/crm")({
  head: () => ({
    meta: [
      { title: "Growth CRM & Lead Intelligence — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Lead intelligence CRM — 7-stage Kanban pipeline, company profiles, contacts, activity timeline, meetings, and email studio.",
      },
    ],
  }),
  component: GrowthCRMPage,
});

function GrowthCRMPage() {
  return <CRMView />;
}
