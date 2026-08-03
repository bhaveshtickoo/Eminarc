// Mock data layer for Eminarc Growth OS UI prototype.
// All data is in-memory and resets on reload. Helpers mutate a local array.

export type Plan = "Free" | "Pro" | "Business" | "Enterprise";
export type LeadStatus = "New" | "Engaged" | "Qualified" | "Won" | "Lost";

export interface Metric {
  id: string;
  label: string;
  value: string;
  change: number; // percentage
  trend: "up" | "down";
  icon: string;
  spark: number[];
}

export interface GrowthPoint {
  month: string;
  revenue: number;
  pipeline: number;
}

export interface ChannelPoint {
  day: string;
  linkedin: number;
  email: number;
  reddit: number;
  search: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  plan: Plan;
  status: LeadStatus;
  score: number;
  mrr: number;
  source: string;
  joined: string;
  lastActive: string;
}

export interface Task {
  id: string;
  title: string;
  channel: string;
  priority: "high" | "medium" | "low";
  done: boolean;
  due: string;
}

export interface Recommendation {
  id: string;
  rank: number;
  title: string;
  detail: string;
  impact: string;
  effort: "low" | "medium" | "high";
}

export interface PlanInfo {
  name: Plan;
  price: number;
  tagline: string;
  features: string[];
  current: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
}

export const metrics: Metric[] = [
  {
    id: "mrr",
    label: "MRR",
    value: "$48,250",
    change: 12.4,
    trend: "up",
    icon: "dollar",
    spark: [30, 33, 31, 38, 42, 45, 48],
  },
  {
    id: "pipeline",
    label: "Pipeline",
    value: "$182,400",
    change: 8.1,
    trend: "up",
    icon: "trending",
    spark: [120, 130, 128, 145, 160, 170, 182],
  },
  {
    id: "active-leads",
    label: "Active Leads",
    value: "1,284",
    change: 5.6,
    trend: "up",
    icon: "users",
    spark: [900, 950, 1020, 1100, 1180, 1220, 1284],
  },
  {
    id: "linkedin-reach",
    label: "LinkedIn Reach",
    value: "318k",
    change: -2.3,
    trend: "down",
    icon: "linkedin",
    spark: [320, 330, 325, 322, 318, 316, 318],
  },
  {
    id: "ai-visibility",
    label: "AI Visibility",
    value: "47%",
    change: 6.0,
    trend: "up",
    icon: "sparkles",
    spark: [35, 36, 39, 41, 43, 45, 47],
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.8%",
    change: -0.4,
    trend: "down",
    icon: "activity",
    spark: [3.2, 3.0, 2.8, 2.4, 2.1, 2.0, 1.8],
  },
];

export const growthSeries: GrowthPoint[] = [
  { month: "Feb", revenue: 28, pipeline: 120 },
  { month: "Mar", revenue: 31, pipeline: 135 },
  { month: "Apr", revenue: 33, pipeline: 142 },
  { month: "May", revenue: 37, pipeline: 150 },
  { month: "Jun", revenue: 40, pipeline: 158 },
  { month: "Jul", revenue: 42, pipeline: 166 },
  { month: "Aug", revenue: 44, pipeline: 172 },
  { month: "Sep", revenue: 45, pipeline: 178 },
  { month: "Oct", revenue: 47, pipeline: 180 },
  { month: "Nov", revenue: 48, pipeline: 182 },
  { month: "Dec", revenue: 50, pipeline: 190 },
  { month: "Jan", revenue: 48, pipeline: 182 },
];

export const channelSeries: ChannelPoint[] = [
  { day: "Mon", linkedin: 120, email: 80, reddit: 24, search: 45 },
  { day: "Tue", linkedin: 145, email: 95, reddit: 30, search: 52 },
  { day: "Wed", linkedin: 132, email: 110, reddit: 28, search: 60 },
  { day: "Thu", linkedin: 168, email: 88, reddit: 35, search: 58 },
  { day: "Fri", linkedin: 190, email: 120, reddit: 42, search: 72 },
  { day: "Sat", linkedin: 95, email: 40, reddit: 18, search: 30 },
  { day: "Sun", linkedin: 70, email: 30, reddit: 12, search: 22 },
];

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    rank: 1,
    title: "Re-engage 47 cold leads with founder-personalized sequences",
    detail:
      "47 leads scored above 80 haven't been contacted in 14 days. Founder Research Agent flagged 12 with fresh funding signals.",
    impact: "+$24k potential pipeline",
    effort: "medium",
  },
  {
    id: "r2",
    rank: 2,
    title: "Publish 3 LinkedIn carousels on AI agent evaluation",
    detail:
      "Top-performing topic cluster by engagement. Content OS drafted outlines; approval pending.",
    impact: "+18% reach est.",
    effort: "low",
  },
  {
    id: "r3",
    rank: 3,
    title: "Fix 4 missing AI-citation pages on your site",
    detail:
      "AI Visibility Auditor shows ChatGPT and Perplexity cannot find your pricing or features pages. SEO Agent generated fixes.",
    impact: "+12% AI visibility",
    effort: "low",
  },
  {
    id: "r4",
    rank: 4,
    title: "Launch Reddit growth test in r/SaaS and r/startups",
    detail:
      "Reddit Agent found 6 high-intent discussions this week. Drafted responses ready for review.",
    impact: "+30 inbound leads est.",
    effort: "medium",
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Approve LinkedIn carousel: 'How we evaluate AI agents'",
    channel: "LinkedIn",
    priority: "high",
    done: false,
    due: "Today",
  },
  {
    id: "t2",
    title: "Reply to 6 Reddit discussions",
    channel: "Reddit",
    priority: "medium",
    done: false,
    due: "Today",
  },
  {
    id: "t3",
    title: "Send 20 personalized outreach emails",
    channel: "Email",
    priority: "high",
    done: false,
    due: "Today",
  },
  {
    id: "t4",
    title: "Review AI visibility report",
    channel: "AI Search",
    priority: "medium",
    done: false,
    due: "Tomorrow",
  },
  {
    id: "t5",
    title: "Call 5 warm leads (score > 85)",
    channel: "Calls",
    priority: "high",
    done: false,
    due: "Tomorrow",
  },
  {
    id: "t6",
    title: "Approve weekly newsletter draft",
    channel: "Content",
    priority: "low",
    done: true,
    due: "Done",
  },
  {
    id: "t7",
    title: "Update ICP after competitor launch",
    channel: "Research",
    priority: "medium",
    done: true,
    due: "Done",
  },
];

export const plans: PlanInfo[] = [
  {
    name: "Free",
    price: 0,
    tagline: "Explore the Growth OS",
    features: ["1 workspace", "Founder Research (3/mo)", "Basic dashboard", "Community support"],
    current: false,
  },
  {
    name: "Pro",
    price: 79,
    tagline: "For founder-led growth teams",
    features: [
      "5 workspaces",
      "Lead Intelligence + scoring",
      "Outreach engine",
      "LinkedIn Copilot",
      "Weekly action plan",
      "Email support",
    ],
    current: true,
  },
  {
    name: "Business",
    price: 199,
    tagline: "For scaling GTM teams",
    features: [
      "20 workspaces",
      "All agents unlocked",
      "Reddit + Content OS",
      "Competitor Intelligence",
      "AI Visibility Auditor",
      "Priority support",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: 499,
    tagline: "For revenue teams at scale",
    features: [
      "Unlimited workspaces",
      "Custom AI agents",
      "SSO + audit logs",
      "Dedicated strategist",
      "API access",
      "SLA + onboarding",
    ],
    current: false,
  },
];

export const invoices: Invoice[] = [
  { id: "INV-2026-007", date: "Jul 1, 2026", amount: 79, status: "Paid" },
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: 79, status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: 79, status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: 79, status: "Paid" },
];

let leadStore: Lead[] = [
  {
    id: "l1",
    name: "Sarah Chen",
    email: "sarah@neuralflow.ai",
    company: "NeuralFlow",
    title: "VP Marketing",
    plan: "Pro",
    status: "Qualified",
    score: 92,
    mrr: 79,
    source: "LinkedIn",
    joined: "2026-07-12",
    lastActive: "2h ago",
  },
  {
    id: "l2",
    name: "Marcus Webb",
    email: "marcus@dataray.io",
    company: "DataRay",
    title: "Founder",
    plan: "Business",
    status: "Engaged",
    score: 88,
    mrr: 199,
    source: "Reddit",
    joined: "2026-07-10",
    lastActive: "5h ago",
  },
  {
    id: "l3",
    name: "Priya Nair",
    email: "priya@loopgpt.com",
    company: "LoopGPT",
    title: "Head of Growth",
    plan: "Pro",
    status: "New",
    score: 81,
    mrr: 79,
    source: "AI Search",
    joined: "2026-07-14",
    lastActive: "1d ago",
  },
  {
    id: "l4",
    name: "James Okafor",
    email: "james@vaultsec.dev",
    company: "VaultSec",
    title: "CTO",
    plan: "Free",
    status: "New",
    score: 64,
    mrr: 0,
    source: "Website",
    joined: "2026-07-13",
    lastActive: "1d ago",
  },
  {
    id: "l5",
    name: "Elena Rossi",
    email: "elena@brightml.co",
    company: "BrightML",
    title: "CEO",
    plan: "Enterprise",
    status: "Won",
    score: 96,
    mrr: 499,
    source: "LinkedIn",
    joined: "2026-07-05",
    lastActive: "30m ago",
  },
  {
    id: "l6",
    name: "Tom Becker",
    email: "tom@fleetops.ai",
    company: "FleetOps",
    title: "VP Sales",
    plan: "Pro",
    status: "Qualified",
    score: 89,
    mrr: 79,
    source: "Email",
    joined: "2026-07-08",
    lastActive: "3h ago",
  },
  {
    id: "l7",
    name: "Aisha Khan",
    email: "aisha@promptlab.io",
    company: "PromptLab",
    title: "Founder",
    plan: "Business",
    status: "Engaged",
    score: 85,
    mrr: 199,
    source: "LinkedIn",
    joined: "2026-07-11",
    lastActive: "6h ago",
  },
  {
    id: "l8",
    name: "David Lin",
    email: "david@synthexa.com",
    company: "Synthexa",
    title: "Head of GTM",
    plan: "Free",
    status: "Lost",
    score: 42,
    mrr: 0,
    source: "Reddit",
    joined: "2026-06-28",
    lastActive: "12d ago",
  },
  {
    id: "l9",
    name: "Nora Bergman",
    email: "nora@cloudpeak.ai",
    company: "CloudPeak",
    title: "Founder",
    plan: "Pro",
    status: "New",
    score: 78,
    mrr: 79,
    source: "AI Search",
    joined: "2026-07-14",
    lastActive: "2h ago",
  },
  {
    id: "l10",
    name: "Ravi Patel",
    email: "ravi@inferred.ai",
    company: "Inferred",
    title: "VP Marketing",
    plan: "Business",
    status: "Engaged",
    score: 87,
    mrr: 199,
    source: "Website",
    joined: "2026-07-09",
    lastActive: "4h ago",
  },
  {
    id: "l11",
    name: "Lisa Park",
    email: "lisa@graphiq.dev",
    company: "Graphiq",
    title: "CEO",
    plan: "Pro",
    status: "Qualified",
    score: 91,
    mrr: 79,
    source: "LinkedIn",
    joined: "2026-07-07",
    lastActive: "1h ago",
  },
  {
    id: "l12",
    name: "Henrik Lund",
    email: "henrik@northsignal.io",
    company: "NorthSignal",
    title: "Head of Growth",
    plan: "Free",
    status: "New",
    score: 70,
    mrr: 0,
    source: "Email",
    joined: "2026-07-13",
    lastActive: "8h ago",
  },
];

export const leads: Lead[] = leadStore;

export function getLeads(): Lead[] {
  return [...leadStore];
}

export function createLead(data: Omit<Lead, "id">): Lead {
  const lead: Lead = { ...data, id: `l${Date.now()}` };
  leadStore = [lead, ...leadStore];
  return lead;
}

export function updateLead(id: string, data: Partial<Lead>): void {
  leadStore = leadStore.map((l) => (l.id === id ? { ...l, ...data } : l));
}

export function deleteLead(id: string): void {
  leadStore = leadStore.filter((l) => l.id !== id);
}
