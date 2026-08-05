/**
 * Campaign Memory Layer
 * Eminarc Growth OS Core
 */

import { SupabaseMemoryStore } from "../supabase-memory-store";
import { CampaignMemoryData } from "../types";

export class CampaignMemoryLayer {
  static async load(workspaceId: string, campaignId?: string): Promise<CampaignMemoryData | null> {
    const entries = await SupabaseMemoryStore.queryMemories({
      workspaceId,
      type: "campaign",
      entityId: campaignId,
      limit: 1,
    });

    if (entries.length > 0 && entries[0]?.metadata) {
      return entries[0].metadata as unknown as CampaignMemoryData;
    }

    return null;
  }

  static async save(workspaceId: string, data: CampaignMemoryData): Promise<void> {
    await SupabaseMemoryStore.saveMemory({
      workspace_id: workspaceId,
      memory_type: "campaign",
      entity_id: data.campaignId,
      key: `cmp-${data.campaignId}`,
      content: `Campaign: ${data.name}. Channel: ${data.channel}. Target Leads: ${data.targetLeadsCount}. Active Sequence: ${data.activeSequence}. Response Rate: ${data.responseRate || "N/A"}.`,
      metadata: data as any,
    });
  }
}
