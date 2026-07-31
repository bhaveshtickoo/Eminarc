import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Bell,
  Bot,
  CalendarCheck,
  ChevronDown,
  CheckCircle2,
  FileText,
  Linkedin,
  Pause,
  Play,
  Plus,
  Target,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GrowthLineChart } from "@/components/charts/growth-line-chart";
import { ChannelDonut } from "@/components/charts/channel-donut";
import {
  activity,
  agents as seedAgents,
  clientProgress as seedClients,
  leadFunnel,
  overviewKpis,
  upcomingTasks,
} from "@/lib/overview-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/")({
  head: () => ({
    meta: [
      { title: "Overview — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Your growth command center — clients, pipeline, content and AI agents in one view.",
      },
      { property: "og:title", content: "Overview — Eminarc Growth OS" },
      {
        property: "og:description",
        content: "Track MRR, pipeline, content and AI agents from one growth command center.",
      },
    ],
  }),
  component: Overview,
});

const kpiIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  trending: TrendingUp,
  target: Target,
  file: FileText,
  calendar: CalendarCheck,
};

const kpiLinks: Record<string, string> = {
  clients: "/leads",
  mrr: "/analytics",
  pipeline: "/leads",
  content: "/linkedin",
  meetings: "/tasks",
};

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  meeting: CheckCircle2,
  content: FileText,
  lead: Target,
};

const ranges = ["Last 7 Days", "Last 30 Days", "Last 90 Days", "Year to date"];

function Panel({
  title,
  action,
  className,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border bg-card p-5 card-glow", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="section-label">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ViewAll({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
    >
      View all
    </Link>
  );
}

function Overview() {
  const navigate = useNavigate();
  const funnelMax = leadFunnel[0]?.value ?? 1;

  const [range, setRange] = useState(ranges[1]!);
  const [chartRange, setChartRange] = useState(ranges[1]!);
  const [clients, setClients] = useState(seedClients);
  const [agentList, setAgentList] = useState(seedAgents);
  const [doneTasks, setDoneTasks] = useState<Record<string, boolean>>({});
  const [addOpen, setAddOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", program: "" });

  const remaining = useMemo(
    () => upcomingTasks.filter((t) => !doneTasks[t.id]).length,
    [doneTasks],
  );

  const addClient = () => {
    const name = newClient.name.trim();
    if (!name) {
      toast.error("Client name is required");
      return;
    }
    setClients((prev) => [
      ...prev,
      {
        id: `c${prev.length + 1}-${Date.now()}`,
        name,
        initials: name.slice(0, 2).toUpperCase(),
        program: newClient.program.trim() || "Growth Program • Month 1 of 3",
        progress: 5,
      },
    ]);
    setNewClient({ name: "", program: "" });
    setAddOpen(false);
    toast.success(`${name} added to Client Progress`);
  };

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Good morning, Pratyush 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's your growth command center · {remaining} tasks left today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 gap-2 rounded-xl px-4 font-medium">
                {range}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {ranges.map((r) => (
                <DropdownMenuItem key={r} onClick={() => setRange(r)}>
                  {r}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative h-11 w-11 rounded-xl"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="border-b px-4 py-3">
                <p className="section-label">Notifications</p>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {activity.map((e) => (
                  <li key={e.id} className="border-b px-4 py-3 last:border-0">
                    <p className="text-sm">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.time}</p>
                  </li>
                ))}
              </ul>
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => toast.success("All notifications marked as read")}
                >
                  Mark all as read
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {overviewKpis.map((kpi) => {
          const Icon = kpiIcons[kpi.icon] ?? Target;
          return (
            <button
              key={kpi.id}
              type="button"
              onClick={() => navigate({ to: kpiLinks[kpi.id] ?? "/analytics" })}
              className="rounded-2xl border bg-card p-5 text-left card-glow transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="mt-0.5 font-display text-2xl font-bold tracking-tight">
                    {kpi.value}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-success">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {kpi.change}%<span className="text-muted-foreground">vs last 30 days</span>
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Growth + clients */}
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel
          title="Growth Overview"
          className="xl:col-span-2"
          action={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2 rounded-lg">
                  {chartRange}
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ranges.map((r) => (
                  <DropdownMenuItem key={r} onClick={() => setChartRange(r)}>
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          }
        >
          <GrowthLineChart />
        </Panel>

        <Panel title="Client Progress" action={<ViewAll to="/leads" />}>
          <div className="space-y-5">
            {clients.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-xs font-bold">
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.program}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold tabular-nums">
                  {c.progress}%
                </span>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl border-dashed"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="h-4 w-4" /> Add New Client
            </Button>
          </div>
        </Panel>
      </div>

      {/* Channels + funnel + agents */}
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Top Growth Channels" action={<ViewAll to="/analytics" />}>
          <ChannelDonut />
        </Panel>

        <Panel title="Lead Funnel" action={<ViewAll to="/leads" />}>
          <ul className="space-y-3">
            {leadFunnel.map((s, i) => (
              <li key={s.stage}>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/leads" })}
                  className="flex w-full items-center gap-3 rounded-md text-left transition-opacity hover:opacity-80"
                >
                  <div className="h-8 flex-1 overflow-hidden rounded-md bg-secondary">
                    <div
                      className="h-full rounded-md bg-primary"
                      style={{
                        width: `${(s.value / funnelMax) * 100}%`,
                        opacity: 1 - i * 0.15,
                      }}
                    />
                  </div>
                  <span className="w-36 shrink-0 text-sm text-muted-foreground">{s.stage}</span>
                  <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums">
                    {s.value}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="AI Agents" action={<ViewAll to="/outreach" />}>
          <div className="space-y-3.5">
            {agentList.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 shrink-0 gap-1.5 rounded-md bg-secondary px-2 text-xs font-medium"
                  onClick={() => {
                    const next = a.status === "Active" ? "Paused" : "Active";
                    setAgentList((prev) =>
                      prev.map((x) => (x.id === a.id ? { ...x, status: next } : x)),
                    );
                    toast.success(`${a.name} ${next.toLowerCase()}`);
                  }}
                >
                  {a.status === "Active" ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  {a.status}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Activity + tasks */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Recent Activity" action={<ViewAll to="/outreach" />}>
          <div className="space-y-4">
            {activity.map((e) => {
              const Icon = activityIcons[e.kind] ?? Sparkles;
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => toast(e.title, { description: e.detail })}
                  className="flex w-full items-start gap-3 rounded-lg p-1 text-left transition-colors hover:bg-secondary/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{e.time}</span>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title="Upcoming Tasks" action={<ViewAll to="/tasks" />}>
          <div className="space-y-4">
            {upcomingTasks.map((t) => {
              const done = !!doneTasks[t.id];
              return (
                <label
                  key={t.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-secondary/60"
                >
                  <Checkbox
                    className="rounded-[5px]"
                    checked={done}
                    onCheckedChange={(v) => {
                      const checked = v === true;
                      setDoneTasks((prev) => ({ ...prev, [t.id]: checked }));
                      if (checked) toast.success(`Completed: ${t.title}`);
                    }}
                  />
                  <span
                    className={cn("flex-1 text-sm", done && "text-muted-foreground line-through")}
                  >
                    {t.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{t.when}</span>
                </label>
              );
            })}
          </div>
        </Panel>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new client</DialogTitle>
            <DialogDescription>
              Create a client workspace and start tracking their growth program.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Client name</Label>
              <Input
                id="client-name"
                placeholder="Acme Labs"
                value={newClient.name}
                onChange={(e) => setNewClient((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-program">Program</Label>
              <Input
                id="client-program"
                placeholder="Growth Program • Month 1 of 3"
                value={newClient.program}
                onChange={(e) => setNewClient((p) => ({ ...p, program: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addClient}>Add client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
