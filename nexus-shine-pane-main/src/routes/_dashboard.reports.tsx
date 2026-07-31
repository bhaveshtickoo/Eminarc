import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clientProgress } from "@/lib/overview-data";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/_dashboard/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Eminarc Growth OS" },
      {
        name: "description",
        content: "Monthly growth reports generated for every client program.",
      },
      { property: "og:title", content: "Reports — Eminarc Growth OS" },
      {
        property: "og:description",
        content: "Monthly growth reports generated for every client program.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reports,
});

const months = ["July 2026", "June 2026", "May 2026"];

function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Monthly growth reports generated for every client program."
        actions={
          <Button size="sm" onClick={() => toast.success("New report queued for generation")}>
            Generate report
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {clientProgress.flatMap((c) =>
          months.map((m, idx) => (
            <Card key={`${c.id}-${m}`} className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {c.name} — {m}
                </p>
                <p className="text-xs text-muted-foreground">Growth Program performance summary</p>
              </div>
              {idx === 0 ? <Badge variant="secondary">Latest</Badge> : null}
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => toast.success(`Downloading ${c.name} — ${m}`)}
              >
                <Download className="h-3.5 w-3.5" /> PDF
              </Button>
            </Card>
          )),
        )}
      </div>

      <Card className="flex flex-wrap items-center gap-3 p-5">
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold">Need the raw numbers?</p>
          <p className="text-sm text-muted-foreground">
            Dive into channel mix, pipeline and revenue trends.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/analytics">Open analytics</Link>
        </Button>
      </Card>
    </div>
  );
}
