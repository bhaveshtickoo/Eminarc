import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getLeads } from "@/lib/mock-data";
import { Send, Mail, Linkedin, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/outreach")({
  head: () => ({
    meta: [
      { title: "Outreach — Eminarc Growth OS" },
      {
        name: "description",
        content: "AI-generated, founder-personalized outreach across channels.",
      },
    ],
  }),
  component: Outreach,
});

const sequences = [
  { id: "s1", name: "Founder Funding Signals", channel: "Email", leads: 47, replies: 9, sent: 32 },
  {
    id: "s2",
    name: "LinkedIn warm intro batch",
    channel: "LinkedIn",
    leads: 28,
    replies: 14,
    sent: 28,
  },
  {
    id: "s3",
    name: "Reddit high-intent responders",
    channel: "Reddit",
    leads: 18,
    replies: 6,
    sent: 12,
  },
  {
    id: "s4",
    name: "AI-search visitors re-target",
    channel: "Email",
    leads: 35,
    replies: 5,
    sent: 22,
  },
];

const drafts = [
  {
    lead: "Sarah Chen · NeuralFlow",
    subject: "Noticed your Series A — congrats + a quick idea",
    body: "Hi Sarah, saw NeuralFlow closed its Series A last week — congratulations. Most founders scaling post-raise hit the same bottleneck: outbound that worked at seed stops converting. We help teams rebuild the ICP and sequences in days, not quarters. Open to a 15-min look at how? — Jordan",
    channel: "Email",
  },
  {
    lead: "Marcus Webb · DataRay",
    subject: "Your post on eval pipelines resonated",
    body: "Marcus — your thread on agent eval pipelines was spot on. We just published our internal framework; thought it might be useful as you scale the team. Worth a quick connect?",
    channel: "LinkedIn",
  },
];

function Outreach() {
  const qualified = getLeads()
    .filter((l) => l.score > 80)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Outreach Engine"
        description="AI-generated, personalized outreach across email, LinkedIn, and Reddit."
        actions={
          <Button className="gap-2">
            <Send className="h-4 w-4" /> Launch batch
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Sequences sent (7d)</p>
          <p className="mt-1 text-2xl font-bold">94</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Reply rate</p>
          <p className="mt-1 text-2xl font-bold text-success">23.4%</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Meetings booked</p>
          <p className="mt-1 text-2xl font-bold">11</p>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Active Sequences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sequences.map((s) => {
            const rate = s.sent ? Math.round((s.replies / s.sent) * 100) : 0;
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent/40"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.channel === "Email" ? (
                    <Mail className="h-4 w-4" />
                  ) : s.channel === "LinkedIn" ? (
                    <Linkedin className="h-4 w-4" />
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.leads} leads · {s.sent} sent · {s.replies} replies
                  </p>
                </div>
                <Badge variant="secondary" className="text-success">
                  {rate}% reply
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              AI-Drafted Messages <Sparkles className="ml-1 inline h-3.5 w-3.5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {drafts.map((d, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{d.lead}</span>
                  <Badge variant="outline" className="text-xs">
                    {d.channel}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{d.subject}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.body}</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" className="gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top Qualified Leads (high score)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {qualified.map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/40">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {l.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.company}</p>
                </div>
                <Badge className="bg-success/15 text-success">{l.score}</Badge>
                <Button size="sm" variant="outline">
                  Draft
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
