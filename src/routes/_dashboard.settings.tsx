import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { SettingsView } from "@/features/settings";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Workspace Settings — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Enterprise workspace settings — Organization, Members, Roles, Branding, Billing, Integrations, Security, API Keys, and Audit Logs.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return <SettingsView />;
}
