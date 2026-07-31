import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Linkedin, Sparkles, TrendingUp, Heart, MessageSquare, Share2, Eye } from "lucide-react";

export const Route = createFileRoute("/_dashboard/linkedin")({
  head: () => ({
    meta: [
      { title: "LinkedIn — Eminarc Growth OS" },
      {
        name: "description",
        content: "Your AI LinkedIn copilot — content, engagement, growth analytics.",
      },
    ],
  }),
  component: LinkedIn,
});

const followerData = [
  { week: "W1", followers: 4200, impressions: 58 },
  { week: "W2", followers: 4380, impressions: 72 },
  { week: "W3", followers: 4610, impressions: 95 },
  { week: "W4", followers: 4980, impressions: 110 },
  { week: "W5", followers: 5400, impressions: 142 },
  { week: "W6", followers: 5950, impressions: 168 },
];

const posts = [
  {
    title: "How we evaluate AI agents before shipping",
    type: "Carousel",
    impressions: 38200,
    engagement: 7.2,
    status: "Draft",
  },
  {
    title: "The #1 mistake founders make with outbound",
    type: "Text",
    impressions: 0,
    engagement: 0,
    status: "Scheduled",
  },
  {
    title: "We rebuilt our ICP in 2 days. Here's the framework.",
    type: "Document",
    impressions: 51200,
    engagement: 9.1,
    status: "Published",
  },
];

function LinkedIn() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="LinkedIn Copilot"
        description="Content, engagement, and growth analytics — your AI copilot handles the rest."
        actions={
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" /> Generate post
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MiniStat
          icon={<TrendingUp className="h-4 w-4" />}
          label="Followers"
          value="5,950"
          delta="+15.4%"
        />
        <MiniStat
          icon={<Eye className="h-4 w-4" />}
          label="Impressions (30d)"
          value="318k"
          delta="-2.3%"
          down
        />
        <MiniStat
          icon={<Heart className="h-4 w-4" />}
          label="Engagement rate"
          value="6.8%"
          delta="+1.2%"
        />
        <MiniStat
          icon={<MessageSquare className="h-4 w-4" />}
          label="Inbound DMs"
          value="42"
          delta="+8%"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Follower & Impression Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={followerData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="impressions"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Content Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {posts.map((p) => (
              <div key={p.title} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-snug">{p.title}</p>
                  <Badge
                    variant={p.status === "Published" ? "secondary" : "outline"}
                    className={p.status === "Published" ? "text-success" : ""}
                  >
                    {p.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.type}</p>
                {p.status === "Published" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {(p.impressions / 1000).toFixed(0)}k views · {p.engagement}% engagement
                  </p>
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" /> Schedule carousel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
  delta,
  down,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  down?: boolean;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
        <Badge variant="secondary" className={down ? "text-destructive" : "text-success"}>
          {delta}
        </Badge>
      </div>
      <p className="mt-3 text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </Card>
  );
}
