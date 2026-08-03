import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ContentLibraryView } from "@/features/content/components/ContentLibraryView";

export const Route = createFileRoute("/_dashboard/content/library")({
  head: () => ({
    meta: [
      { title: "Content Library — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Central content asset repository — filter by platform, status, tags, and campaign.",
      },
    ],
  }),
  component: ContentLibraryPage,
});

function ContentLibraryPage() {
  return (
    <div className="pb-12">
      <ContentLibraryView />
    </div>
  );
}
