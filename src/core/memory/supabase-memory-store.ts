/**
 * Supabase Memory Store Driver
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AIMemoryInsert, AIMemoryRow, MemorySearchOptions } from "./types";

export class SupabaseMemoryStore {
  /**
   * Save a memory entry in Supabase `ai_memories` table
   */
  static async saveMemory(entry: AIMemoryInsert): Promise<AIMemoryRow | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("ai_memories")
        .insert(entry)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn("[SupabaseMemoryStore.saveMemory] Warning:", err);
      return null;
    }
  }

  /**
   * Retrieve memory entries filtered by workspace, memory_type, or entity_id
   */
  static async queryMemories(options: MemorySearchOptions): Promise<AIMemoryRow[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }

    try {
      let query = supabase
        .from("ai_memories")
        .select("*")
        .eq("workspace_id", options.workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (options.type) {
        query = query.eq("memory_type", options.type);
      }

      if (options.entityId) {
        query = query.eq("entity_id", options.entityId);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn("[SupabaseMemoryStore.queryMemories] Warning:", err);
      return [];
    }
  }

  /**
   * Simple text-match search fallback (simulates future pgvector semantic search)
   */
  static async searchSimilar(queryText: string, workspaceId: string, limit = 5): Promise<AIMemoryRow[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("ai_memories")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .ilike("content", `%${queryText}%`)
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn("[SupabaseMemoryStore.searchSimilar] Warning:", err);
      return [];
    }
  }
}
