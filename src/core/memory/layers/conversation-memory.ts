/**
 * Conversation Memory Layer
 * Eminarc Growth OS Core
 */

import { SupabaseMemoryStore } from "../supabase-memory-store";
import { ConversationMemoryData } from "../types";

export class ConversationMemoryLayer {
  static async load(
    workspaceId: string,
    sessionId?: string,
  ): Promise<ConversationMemoryData | null> {
    const entries = await SupabaseMemoryStore.queryMemories({
      workspaceId,
      type: "conversation",
      entityId: sessionId,
      limit: 1,
    });

    if (entries.length > 0 && entries[0]?.metadata) {
      return entries[0].metadata as unknown as ConversationMemoryData;
    }

    return null;
  }

  static async save(workspaceId: string, data: ConversationMemoryData): Promise<void> {
    const summaryText = data.messages
      .slice(-5)
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    await SupabaseMemoryStore.saveMemory({
      workspace_id: workspaceId,
      memory_type: "conversation",
      entity_id: data.sessionId,
      key: `chat-${data.sessionId}`,
      content: `Session: ${data.sessionId}\nRecent Chat Log:\n${summaryText}`,
      metadata: data as any,
    });
  }
}
