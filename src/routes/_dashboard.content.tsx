import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/content")({
  head: () => ({
    meta: [
      { title: "Content Hub — Eminarc Growth OS" },
      {
        name: "description",
        content: "Drafts, scheduled posts and published content across every client.",
      },
      { property: "og:title", content: "Content Hub — Eminarc Growth OS" },
      {
        property: "og:description",
        content: "Drafts, scheduled posts and published content across every client.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentHub,
});

type Status = "Draft" | "Scheduled" | "Published";

const initial: Array<{
  id: string;
  title: string;
  client: string;
  channel: string;
  status: Status;
  when: string;
}> = [
  {
    id: "p1",
    title: "Founder POV: why campaigns die in 30 days",
    client: "TrueLift.ai",
    channel: "LinkedIn",
    status: "Draft",
    when: "Today",
  },
  {
    id: "p2",
    title: "Case study — 3x qualified pipeline in 60 days",
    client: "Revix",
    channel: "LinkedIn",
    status: "Scheduled",
    when: "Jul 27",
  },
  {
    id: "p3",
    title: "The B2B growth system teardown",
    client: "Senpai",
    channel: "Newsletter",
    status: "Scheduled",
    when: "Jul 29",
  },
  {
    id: "p4",
    title: "5 signals a lead is actually in-market",
    client: "TrueLift.ai",
    channel: "LinkedIn",
    status: "Published",
    when: "Jul 22",
  },
  {
    id: "p5",
    title: "Reddit AMA recap: growth without ad spend",
    client: "Revix",
    channel: "Reddit",
    status: "Published",
    when: "Jul 19",
  },
];

const statusStyle: Record<Status, string> = {
  Draft: "bg-muted text-muted-foreground",
  Scheduled: "bg-chart-4/15 text-chart-4",
  Published: "bg-success/15 text-success",
};

const filters = ["All", "Draft", "Scheduled", "Published"] as const;

function ContentHub() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = filter === "All" ? items : items.filter((i) => i.status === filter);

  const advance = (id: string) => {
    setItems((list) =>
      list.map((i) =>
        i.id === id
          ? {
              ...i,
              status:
                i.status === "Draft"
                  ? "Scheduled"
                  : i.status === "Scheduled"
                    ? "Published"
                    : "Published",
            }
          : i,
      ),
    );
    toast.success("Content status updated");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Hub"
        description="Drafts, scheduled posts and published content across every client."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to="/linkedin">LinkedIn analytics</Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <Card className="divide-y p-0">
        {visible.map((i) => (
          <div key={i.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{i.title}</p>
              <p className="text-xs text-muted-foreground">
                {i.client} • {i.channel} • {i.when}
              </p>
            </div>
            <Badge className={cn("border-0", statusStyle[i.status])}>{i.status}</Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => advance(i.id)}
              disabled={i.status === "Published"}
            >
              {i.status === "Draft" ? "Schedule" : i.status === "Scheduled" ? "Publish" : "Done"}
            </Button>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">Nothing here yet.</p>
        )}
      </Card>
    </div>
  );
}
