/**
 * Research Memory Layer
 * Eminarc Growth OS Core
 */

import { SupabaseMemoryStore } from "../supabase-memory-store";
import { ResearchMemoryData } from "../types";

export class ResearchMemoryLayer {
  static async load(workspaceId: string, companyId?: string): Promise<ResearchMemoryData | null> {
    const entries = await SupabaseMemoryStore.queryMemories({
      workspaceId,
      type: "research",
      entityId: companyId,
      limit: 1,
    });

    if (entries.length > 0 && entries[0]?.metadata) {
      return entries[0].metadata as unknown as ResearchMemoryData;
    }

    return null;
  }

  static async save(workspaceId: string, data: ResearchMemoryData): Promise<void> {
    await SupabaseMemoryStore.saveMemory({
      workspace_id: workspaceId,
      memory_type: "research",
      entity_id: data.companyId,
      key: `res-${data.companyId}`,
      content: `Research Memory for Company ${data.companyId}:\nICP: ${data.icpSummary}\nPain Points: ${data.painPoints.join("; ")}\nBuying Signals: ${data.buyingSignals.join("; ")}\nTech Stack: ${data.techStack.join(", ")}\nOpportunity Match Score: ${data.opportunityScore}/100.`,
      metadata: data as any,
    });
  }
}
