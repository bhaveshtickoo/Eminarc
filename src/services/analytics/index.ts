// Analytics Service Layer — Isolates future Supabase analytics telemetry & data warehouse integrations.

import { overviewKpis, growthDays, channelMix, clientProgress } from "@/data/overview-data";
import { metrics, growthSeries, channelSeries } from "@/data/mock-data";

export async function getDashboard() {
  // Static mock dashboard service implementation
  return {
    kpis: overviewKpis,
    growthDays,
    channelMix,
    clientProgress,
    metrics,
  };
}

export async function getAnalytics(timeframe: string = "weekly") {
  // Static mock analytics service implementation
  return {
    timeframe,
    growthSeries,
    channelSeries,
    channelMix,
    totalLeads: channelMix.reduce((acc, c) => acc + c.value, 0),
    topChannel: "LinkedIn",
  };
}
