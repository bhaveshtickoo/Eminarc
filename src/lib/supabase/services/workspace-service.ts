/**
 * Modular Supabase Workspace Service
 * Eminarc Growth OS
 */

import { supabase } from "../client";
import { isSupabaseConfigured } from "../config";
import type { Tables, InsertTables, UpdateTables, ServiceResult } from "../types";

export type WorkspaceRow = Tables<"workspaces">;
export type WorkspaceInsert = InsertTables<"workspaces">;
export type WorkspaceUpdate = UpdateTables<"workspaces">;
export type WorkspaceMemberRow = Tables<"workspace_members">;

export const workspaceService = {
  /**
   * Fetch workspace owned by or associated with a given User ID
   */
  async getWorkspace(userId: string): Promise<ServiceResult<WorkspaceRow>> {
    try {
      if (!userId) {
        return {
          data: null,
          error: new Error("User ID is required to fetch workspace"),
        };
      }

      if (!isSupabaseConfigured()) {
        return {
          data: {
            id: `ws-${userId}`,
            name: "Default Workspace",
            domain: "mycompany.com",
            industry: "B2B SaaS",
            brand: "Strategic & Analytical",
            country: "United States",
            timezone: "UTC-5 (EST)",
            logo_url: null,
            status: "Active",
            tagline: "Growth OS Workspace",
            logo_letter: "D",
            target_market: ["USA"],
            brand_voice: ["Strategic"],
            metrics: { growthScore: 85 },
            weekly_goal: { title: "Complete Setup" },
            knowledge_base: {},
            owner_id: userId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          error: null,
        };
      }

      // 1. Query by owner_id
      const { data: ownerWs, error: ownerErr } = await supabase
        .from("workspaces")
        .select("*")
        .eq("owner_id", userId)
        .maybeSingle();

      if (ownerErr) {
        return { data: null, error: ownerErr };
      }

      if (ownerWs) {
        return { data: ownerWs, error: null };
      }

      // 2. If not owner directly, check workspace_members table
      const { data: memberData, error: memberErr } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (memberErr) {
        return { data: null, error: memberErr };
      }

      if (memberData?.workspace_id) {
        const { data: memberWs, error: wsErr } = await supabase
          .from("workspaces")
          .select("*")
          .eq("id", memberData.workspace_id)
          .single();

        if (wsErr) return { data: null, error: wsErr };
        return { data: memberWs, error: null };
      }

      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Create a new workspace and automatically register owner membership
   */
  async createWorkspace(
    ownerId: string,
    workspaceData?: Partial<WorkspaceInsert>,
  ): Promise<ServiceResult<WorkspaceRow>> {
    try {
      if (!ownerId) {
        return {
          data: null,
          error: new Error("Owner ID is required to create a workspace"),
        };
      }

      const now = new Date().toISOString();
      const name = workspaceData?.name || "My Workspace";
      const logoLetter = workspaceData?.logo_letter || (name ? name.charAt(0).toUpperCase() : "W");

      const newWs: WorkspaceInsert = {
        name,
        domain: workspaceData?.domain || null,
        industry: workspaceData?.industry || "B2B SaaS",
        brand: workspaceData?.brand || "Strategic & Analytical",
        country: workspaceData?.country || "United States",
        timezone: workspaceData?.timezone || "UTC-5 (EST)",
        logo_url: workspaceData?.logo_url || null,
        status: workspaceData?.status || "Active",
        tagline: workspaceData?.tagline || `${name} Growth OS`,
        logo_letter: logoLetter,
        target_market: workspaceData?.target_market || ["USA"],
        brand_voice: workspaceData?.brand_voice || ["Strategic"],
        metrics: workspaceData?.metrics || { growthScore: 80 },
        weekly_goal: workspaceData?.weekly_goal || { title: "Complete Setup" },
        knowledge_base: workspaceData?.knowledge_base || {},
        owner_id: ownerId,
        created_at: now,
        updated_at: now,
      };

      if (!isSupabaseConfigured()) {
        const mockWs: WorkspaceRow = {
          id: `ws-${Date.now()}`,
          ...newWs,
          domain: newWs.domain ?? null,
          industry: newWs.industry ?? null,
          brand: newWs.brand ?? null,
          country: newWs.country ?? null,
          timezone: newWs.timezone ?? null,
          logo_url: newWs.logo_url ?? null,
          status: newWs.status || "Active",
          tagline: newWs.tagline ?? null,
          logo_letter: newWs.logo_letter ?? "W",
          target_market: newWs.target_market ?? null,
          brand_voice: newWs.brand_voice ?? null,
          metrics: newWs.metrics ?? null,
          weekly_goal: newWs.weekly_goal ?? null,
          knowledge_base: newWs.knowledge_base ?? null,
          owner_id: ownerId,
          created_at: now,
          updated_at: now,
        };
        return { data: mockWs, error: null };
      }

      // Step 1: Insert workspace record into workspaces table
      const { data: createdWs, error: wsErr } = await supabase
        .from("workspaces")
        .insert(newWs)
        .select("*")
        .single();

      if (wsErr || !createdWs) {
        return { data: null, error: wsErr || new Error("Failed to create workspace record") };
      }

      // Step 2: Create membership record for owner in workspace_members table
      const { error: memberErr } = await supabase.from("workspace_members").upsert(
        {
          workspace_id: createdWs.id,
          user_id: ownerId,
          role: "owner",
          created_at: now,
        },
        { onConflict: "workspace_id,user_id" },
      );

      if (memberErr) {
        console.warn("[WorkspaceService] Membership creation warning:", memberErr);
      }

      return { data: createdWs, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Update workspace fields for a given workspace ID
   */
  async updateWorkspace(
    workspaceId: string,
    updates: Partial<WorkspaceUpdate>,
  ): Promise<ServiceResult<WorkspaceRow>> {
    try {
      if (!workspaceId) {
        return {
          data: null,
          error: new Error("Workspace ID is required for update"),
        };
      }

      const now = new Date().toISOString();
      const payload: WorkspaceUpdate = {
        ...updates,
        updated_at: now,
      };

      if (!isSupabaseConfigured()) {
        return {
          data: {
            id: workspaceId,
            name: payload.name || "My Workspace",
            domain: payload.domain ?? null,
            industry: payload.industry ?? null,
            brand: payload.brand ?? null,
            country: payload.country ?? null,
            timezone: payload.timezone ?? null,
            logo_url: payload.logo_url ?? null,
            status: payload.status || "Active",
            tagline: payload.tagline ?? null,
            logo_letter: payload.logo_letter ?? "W",
            target_market: payload.target_market ?? null,
            brand_voice: payload.brand_voice ?? null,
            metrics: payload.metrics ?? null,
            weekly_goal: payload.weekly_goal ?? null,
            knowledge_base: payload.knowledge_base ?? null,
            owner_id: payload.owner_id || "demo-user",
            created_at: now,
            updated_at: now,
          },
          error: null,
        };
      }

      const { data, error } = await supabase
        .from("workspaces")
        .update(payload)
        .eq("id", workspaceId)
        .select("*")
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Ensure a workspace exists for the given user ID.
   * Checks whether a workspace exists; if not, creates workspace & membership automatically.
   */
  async ensureWorkspace(
    userId: string,
    defaultName?: string,
  ): Promise<ServiceResult<WorkspaceRow>> {
    try {
      if (!userId) {
        return {
          data: null,
          error: new Error("User ID is required to ensure workspace"),
        };
      }

      const existingWs = await this.getWorkspace(userId);
      if (existingWs.error) {
        return existingWs;
      }

      if (existingWs.data) {
        return existingWs;
      }

      // Workspace does not exist, create workspace & owner membership automatically
      return await this.createWorkspace(userId, {
        name: defaultName || "My Workspace",
      });
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },
};

export default workspaceService;
