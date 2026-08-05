/**
 * Usage Telemetry & Cost Tracking Utilities
 * Eminarc Growth OS AI Core
 */

import { TokenUsage } from "../providers/base";

export interface UsageRecord {
  id: string;
  providerName: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  latencyMs: number;
  timestamp: string;
}

export class UsageTracker {
  private records: UsageRecord[] = [];

  track(record: Omit<UsageRecord, "id" | "timestamp">): UsageRecord {
    const fullRecord: UsageRecord = {
      ...record,
      id: `use-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };

    this.records.push(fullRecord);
    if (this.records.length > 500) {
      this.records.shift(); // Keep latest 500 records in memory
    }

    return fullRecord;
  }

  getSummary(): {
    totalRequests: number;
    totalTokens: number;
    totalEstimatedCostUsd: number;
    averageLatencyMs: number;
    byProvider: Record<string, number>;
  } {
    const totalRequests = this.records.length;
    let totalTokens = 0;
    let totalEstimatedCostUsd = 0;
    let totalLatency = 0;
    const byProvider: Record<string, number> = {};

    for (const r of this.records) {
      totalTokens += r.totalTokens;
      totalEstimatedCostUsd += r.estimatedCostUsd || 0;
      totalLatency += r.latencyMs;
      byProvider[r.providerName] = (byProvider[r.providerName] || 0) + 1;
    }

    return {
      totalRequests,
      totalTokens,
      totalEstimatedCostUsd,
      averageLatencyMs: totalRequests > 0 ? Math.round(totalLatency / totalRequests) : 0,
      byProvider,
    };
  }

  getHistory(): UsageRecord[] {
    return [...this.records];
  }
}

export const globalUsageTracker = new UsageTracker();
