import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Blocks } from "lucide-react";

export const Route = createFileRoute("/_dashboard/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Eminarc Growth OS" },
      { name: "description", content: "Connect the tools your growth system runs on." },
      { property: "og:title", content: "Integrations — Eminarc Growth OS" },
      { property: "og:description", content: "Connect the tools your growth system runs on." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Integrations,
});

const initial = [
  {
    id: "linkedin",
    name: "LinkedIn",
    detail: "Profile, posts and connection activity",
    connected: true,
  },
  { id: "gmail", name: "Gmail", detail: "Outreach sequences and replies", connected: true },
  {
    id: "calendar",
    name: "Google Calendar",
    detail: "Meeting booking and reminders",
    connected: true,
  },
  { id: "slack", name: "Slack", detail: "Agent alerts in your team channel", connected: false },
  { id: "hubspot", name: "HubSpot", detail: "Two-way CRM contact sync", connected: false },
  { id: "reddit", name: "Reddit", detail: "Community engagement tracking", connected: false },
];

function Integrations() {
  const [apps, setApps] = useState(initial);

  const toggle = (id: string) => {
    setApps((list) =>
      list.map((a) => {
        if (a.id !== id) return a;
        toast.success(`${a.name} ${a.connected ? "disconnected" : "connected"}`);
        return { ...a, connected: !a.connected };
      }),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect the tools your growth system runs on."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apps.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <Blocks className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-base font-bold">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Badge variant={a.connected ? "secondary" : "outline"}>
                {a.connected ? "Connected" : "Not connected"}
              </Badge>
              <Button
                size="sm"
                variant={a.connected ? "outline" : "default"}
                onClick={() => toggle(a.id)}
              >
                {a.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
