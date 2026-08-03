import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { SettingsView } from "@/features/settings";

interface SettingsSearch {
  tab?: string;
}

export const Route = createFileRoute("/_dashboard/settings")({
  validateSearch: (search: Record<string, unknown>): SettingsSearch => {
    return {
      tab: (search["tab"] as string) || "workspace",
    };
  },
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
