/**
 * Workspace Memory Layer
 * Eminarc Growth OS Core
 */

import { SupabaseMemoryStore } from "../supabase-memory-store";
import { WorkspaceMemoryData } from "../types";

export class WorkspaceMemoryLayer {
  static async load(workspaceId: string): Promise<WorkspaceMemoryData | null> {
    const entries = await SupabaseMemoryStore.queryMemories({
      workspaceId,
      type: "workspace",
      limit: 1,
    });

    if (entries.length > 0 && entries[0]?.metadata) {
      return entries[0].metadata as unknown as WorkspaceMemoryData;
    }

    return null;
  }

  static async save(workspaceId: string, data: WorkspaceMemoryData): Promise<void> {
    await SupabaseMemoryStore.saveMemory({
      workspace_id: workspaceId,
      memory_type: "workspace",
      key: `ws-${data.name.toLowerCase()}`,
      content: `Workspace: ${data.name}. Industry: ${data.industry || "B2B SaaS"}. Tagline: ${data.tagline || ""}. Brand voice: ${data.brandVoice?.join(", ") || "Strategic, Founder-first"}.`,
      metadata: data as any,
    });
  }
}
