/**
 * Company Memory Layer
 * Eminarc Growth OS Core
 */

import { SupabaseMemoryStore } from "../supabase-memory-store";
import { CompanyMemoryData } from "../types";

export class CompanyMemoryLayer {
  static async load(workspaceId: string, companyId?: string): Promise<CompanyMemoryData | null> {
    const entries = await SupabaseMemoryStore.queryMemories({
      workspaceId,
      type: "company",
      entityId: companyId,
      limit: 1,
    });

    if (entries.length > 0 && entries[0]?.metadata) {
      return entries[0].metadata as unknown as CompanyMemoryData;
    }

    return null;
  }

  static async save(workspaceId: string, data: CompanyMemoryData): Promise<void> {
    await SupabaseMemoryStore.saveMemory({
      workspace_id: workspaceId,
      memory_type: "company",
      entity_id: data.companyId,
      key: `company-${data.name.toLowerCase()}`,
      content: `Company: ${data.name}. Website: ${data.website || "N/A"}. Industry: ${data.industry || "B2B Technology"}. Size: ${data.companySize || "N/A"}. ${data.description || ""}`,
      metadata: data as any,
    });
  }
}
