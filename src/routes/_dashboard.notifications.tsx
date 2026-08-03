import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { NotificationsView } from "@/features/notifications";

export const Route = createFileRoute("/_dashboard/notifications")({
  head: () => ({
    meta: [
      { title: "Notification Center — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Real-time executive notification center — research, AI visibility alerts, content generation, and CRM activities.",
      },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return <NotificationsView />;
}
