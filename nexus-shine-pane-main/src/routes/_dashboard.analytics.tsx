import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChannelChart } from "@/components/charts/channel-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/_dashboard/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Every channel — LinkedIn, email, CRM, Reddit, search, AI visibility — in one place.",
      },
    ],
  }),
  component: Analytics,
});

const channelMix = [
  { name: "LinkedIn", value: 38, color: "var(--color-primary)" },
  { name: "Email", value: 27, color: "var(--color-chart-2)" },
  { name: "AI Search", value: 18, color: "var(--color-chart-3)" },
  { name: "Reddit", value: 11, color: "var(--color-chart-4)" },
  { name: "Website", value: 6, color: "var(--color-chart-5)" },
];

const aiVisibility = [
  { model: "ChatGPT", found: true, citations: 12 },
  { model: "Claude", found: true, citations: 8 },
  { model: "Gemini", found: false, citations: 0 },
  { model: "Perplexity", found: true, citations: 15 },
];

function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Unified Analytics"
        description="LinkedIn, email, CRM, Reddit, search, and AI visibility — one source of truth."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue & Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Lead Source Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={channelMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {channelMix.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Channel Activity (weekly)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChannelChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">AI Visibility Auditor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aiVisibility.map((a) => (
              <div key={a.model} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{a.model}</span>
                  <Badge
                    variant={a.found ? "secondary" : "outline"}
                    className={a.found ? "text-success" : "text-destructive"}
                  >
                    {a.found ? "Found" : "Missing"}
                  </Badge>
                </div>
                <p className="mt-2 text-2xl font-bold">{a.citations}</p>
                <p className="text-xs text-muted-foreground">citations this month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
