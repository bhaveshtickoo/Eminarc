import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDashboard } from "@/services/analytics";
import { useWorkspace } from "@/hooks/useWorkspace";
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

interface ClientItem {
  id: string;
  initials: string;
  name: string;
  program: string;
  progress: number;
  status: string;
  mrr: string;
}

function Clients() {
  const { currentWorkspace } = useWorkspace();
  const [clients, setClients] = useState<ClientItem[]>([
    {
      id: "c1",
      initials: "AC",
      name: "Acme Corp",
      program: "Enterprise Growth OS",
      progress: 85,
      status: "Active",
      mrr: "$2,500",
    },
    {
      id: "c2",
      initials: "SM",
      name: "Starlight Media",
      program: "GEO & Content Engine",
      progress: 62,
      status: "Onboarding",
      mrr: "$1,800",
    },
    {
      id: "c3",
      initials: "AS",
      name: "Apex SaaS",
      program: "Pipeline Automation",
      progress: 94,
      status: "Active",
      mrr: "$4,200",
    },
  ]);

  useEffect(() => {
    getDashboard(currentWorkspace?.id).then((dash) => {
      if (dash.clientProgress) {
        setClients(dash.clientProgress);
      }
    });
  }, [currentWorkspace?.id]);

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
        {clients.map((c) => (
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
                {c.status || "Active"}
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
