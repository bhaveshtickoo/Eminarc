// Mock data for the Overview command center (UI prototype only).

export interface OverviewKpi {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: string;
}

export const overviewKpis: OverviewKpi[] = [
  { id: "clients", label: "Active Clients", value: "3", change: 50, icon: "users" },
  { id: "mrr", label: "MRR (INR)", value: "₹2,07,000", change: 27, icon: "trending" },
  { id: "pipeline", label: "Leads in Pipeline", value: "112", change: 18, icon: "target" },
  { id: "content", label: "Content Published", value: "48", change: 41, icon: "file" },
  { id: "meetings", label: "Meetings Booked", value: "17", change: 41, icon: "calendar" },
];

export interface GrowthDay {
  day: string;
  profileViews: number;
  engagements: number;
  leads: number;
  meetings: number;
}

const base: Array<[number, number, number, number]> = [
  [1050, 610, 300, 240],
  [1180, 640, 305, 244],
  [1240, 700, 320, 248],
  [1360, 760, 350, 250],
  [1420, 800, 360, 254],
  [1520, 880, 385, 258],
  [1610, 900, 400, 262],
  [1720, 980, 430, 265],
  [1880, 1010, 455, 268],
  [1810, 1060, 470, 272],
  [1900, 1120, 500, 276],
  [1960, 1150, 540, 280],
  [1940, 1220, 575, 284],
  [2010, 1260, 610, 290],
  [2080, 1290, 650, 296],
  [2050, 1330, 680, 300],
  [2140, 1380, 700, 304],
  [2190, 1400, 740, 308],
  [2230, 1440, 770, 312],
  [2260, 1470, 800, 316],
  [2300, 1500, 842, 320],
];

export const growthDays: GrowthDay[] = base.map((row, i) => {
  const start = new Date(2026, 5, 24);
  start.setDate(start.getDate() + i);
  return {
    day: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    profileViews: row[0],
    engagements: row[1],
    leads: row[2],
    meetings: row[3],
  };
});

export interface ClientProgress {
  id: string;
  name: string;
  initials: string;
  program: string;
  progress: number;
}

export const clientProgress: ClientProgress[] = [
  {
    id: "c1",
    name: "TrueLift.ai",
    initials: "TL",
    program: "Growth Program • Month 1 of 3",
    progress: 66,
  },
  {
    id: "c2",
    name: "Revix",
    initials: "RX",
    program: "Growth Program • Month 2 of 3",
    progress: 74,
  },
  {
    id: "c3",
    name: "Senpai",
    initials: "SP",
    program: "Growth Program • Month 1 of 3",
    progress: 52,
  },
];

export interface ChannelSlice {
  name: string;
  value: number;
  share: number;
  color: string;
}

export const channelMix: ChannelSlice[] = [
  { name: "LinkedIn Outreach", value: 42, share: 37, color: "var(--color-chart-1)" },
  { name: "Content / SEO", value: 28, share: 25, color: "var(--color-chart-2)" },
  { name: "Reddit / Communities", value: 19, share: 17, color: "var(--color-chart-4)" },
  { name: "Email Outreach", value: 15, share: 13, color: "var(--color-chart-3)" },
  { name: "Other", value: 8, share: 8, color: "var(--color-chart-5)" },
];

export const leadFunnel = [
  { stage: "Total Leads", value: 112 },
  { stage: "Contacted", value: 67 },
  { stage: "Replied", value: 28 },
  { stage: "Qualified", value: 14 },
  { stage: "Meetings Booked", value: 7 },
];

export interface Agent {
  id: string;
  name: string;
  detail: string;
  status: "Active" | "Paused";
}

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Founder Research Agent",
    detail: "Researching prospects & founders",
    status: "Active",
  },
  {
    id: "a2",
    name: "LinkedIn Co-Pilot",
    detail: "Optimizing profiles and content",
    status: "Active",
  },
  { id: "a3", name: "Outreach Agent", detail: "Running outreach sequences", status: "Active" },
  { id: "a4", name: "Reddit Growth Agent", detail: "Engaging in communities", status: "Active" },
];

export interface ActivityItem {
  id: string;
  kind: "linkedin" | "meeting" | "content" | "lead";
  title: string;
  detail: string;
  time: string;
}

export const activity: ActivityItem[] = [
  {
    id: "e1",
    kind: "linkedin",
    title: "New connection request accepted from Ankit Sharma",
    detail: "VP Growth at Pepper Content",
    time: "2m ago",
  },
  {
    id: "e2",
    kind: "meeting",
    title: "Meeting booked with Livofy",
    detail: "Scheduled on Jul 28, 2026 at 4:00 PM",
    time: "15m ago",
  },
  {
    id: "e3",
    kind: "content",
    title: "LinkedIn post published for TrueLift.ai",
    detail: "1,204 impressions in the first hour",
    time: "1h ago",
  },
  {
    id: "e4",
    kind: "lead",
    title: "12 new leads scored by Founder Research Agent",
    detail: "8 marked as high intent",
    time: "3h ago",
  },
];

export interface UpcomingTask {
  id: string;
  title: string;
  when: string;
}

export const upcomingTasks: UpcomingTask[] = [
  { id: "t1", title: "Review content calendar for TrueLift.ai", when: "Today" },
  { id: "t2", title: "Follow up with 12 warm leads", when: "Tomorrow" },
  { id: "t3", title: "Publish LinkedIn post – Founder POV", when: "Jul 26" },
  { id: "t4", title: "Send monthly report to Revix", when: "Jul 27" },
];
