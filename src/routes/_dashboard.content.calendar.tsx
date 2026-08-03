import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ContentCalendarView } from "@/features/content/components/ContentCalendarView";

export const Route = createFileRoute("/_dashboard/content/calendar")({
  head: () => ({
    meta: [
      { title: "Content Calendar — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Professional multi-channel content calendar — month, week, and list views with visual drag-and-drop scheduling.",
      },
    ],
  }),
  component: ContentCalendarPage,
});

function ContentCalendarPage() {
  return (
    <div className="pb-12">
      <ContentCalendarView />
    </div>
  );
}
