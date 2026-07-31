import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { clientProgress } from "@/lib/overview-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_dashboard/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Eminarc Growth OS" },
      {
        name: "description",
        content: "Every active growth program, its owner and delivery progress.",
      },
      { property: "og:title", content: "Clients — Eminarc Growth OS" },
      {
        property: "og:description",
        content: "Every active growth program, its owner and delivery progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Clients,
});

function Clients() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Every active growth program, its owner and delivery progress."
        actions={
          <Button asChild size="sm">
            <Link to="/leads">Open pipeline</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clientProgress.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-sm font-bold">
                {c.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-base font-bold">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">{c.program}</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Program progress</span>
                <span className="font-semibold">{c.progress}%</span>
              </div>
              <Progress value={c.progress} className="h-2" />
            </div>

            <div className="mt-5 flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/reports">Report</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 gap-1">
                <Link to="/outreach">
                  Outreach <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
