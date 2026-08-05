/**
 * Founder Memory Layer
 * Eminarc Growth OS Core
 */

import { SupabaseMemoryStore } from "../supabase-memory-store";
import { FounderMemoryData } from "../types";

export class FounderMemoryLayer {
  static async load(workspaceId: string, companyId?: string): Promise<FounderMemoryData | null> {
    const entries = await SupabaseMemoryStore.queryMemories({
      workspaceId,
      type: "founder",
      entityId: companyId,
      limit: 1,
    });

    if (entries.length > 0 && entries[0]?.metadata) {
      return entries[0].metadata as unknown as FounderMemoryData;
    }

    return null;
  }

  static async save(workspaceId: string, data: FounderMemoryData): Promise<void> {
    await SupabaseMemoryStore.saveMemory({
      workspace_id: workspaceId,
      memory_type: "founder",
      entity_id: data.companyId,
      key: `founder-${data.fullName.toLowerCase()}`,
      content: `Founder: ${data.fullName}. Title: ${data.title || "CEO"}. Bio: ${data.bio || ""}. LinkedIn: ${data.linkedinUrl || "N/A"}`,
      metadata: data as any,
    });
  }
}
