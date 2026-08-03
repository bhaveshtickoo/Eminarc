/**
 * Modular Supabase Workspace Service
 * Eminarc Growth OS
 */

import { supabase } from "../client";
import { isSupabaseConfigured } from "../config";
import type { ServiceResult, Json } from "../types";
import type { WorkspaceData, WorkspaceKnowledgeBase } from "../../../types/workspace";

export interface TeamMemberInvite {
  email: string;
  role: "admin" | "member" | "viewer";
}

export const supabaseWorkspaceService = {
  /**
   * Create a new Workspace and register the owner
   */
  async createWorkspace(
    workspaceData: Partial<WorkspaceData>,
    ownerId: string
  ): Promise<ServiceResult<WorkspaceData>> {
    if (!isSupabaseConfigured()) {
      // In offline/demo mode, construct mock created workspace
      const mockWorkspace: WorkspaceData = {
        id: `ws-${Date.now()}`,
        name: workspaceData.name || "My Workspace",
        domain: workspaceData.domain || workspaceData.website || "mycompany.com",
        industry: workspaceData.industry || "B2B SaaS",
        brand: workspaceData.brand || "Strategic & Analytical",
        country: workspaceData.country || "United States",
        timezone: workspaceData.timezone || "UTC-5 (EST)",
        targetMarkets: workspaceData.targetMarkets || ["USA"],
        targetMarket: workspaceData.targetMarket || workspaceData.targetMarkets || ["USA"],
        logoLetter: workspaceData.logoLetter || (workspaceData.name ? workspaceData.name[0].toUpperCase() : "E"),
        logoUrl: workspaceData.logoUrl,
        status: "Active",
        tagline: workspaceData.tagline || `${workspaceData.name || "B2B"} Growth OS`,
        brandVoice: workspaceData.brandVoice || ["Strategic", "Founder-first"],
        teamMembers: [ownerId],
        metrics: {
          growthScore: 85,
          aiVisibility: 70,
          pipelineValue: "$0",
          mrr: "$0",
          activeClientsCount: 0,
          leadsInPipelineCount: 0,
          contentPublishedCount: 0,
          contentTargetCount: 50,
          meetingsBookedCount: 0,
          researchStatus: "Pending",
        },
        weeklyGoal: {
          title: "Complete Growth Blueprint Setup",
          currentCount: 1,
          targetCount: 5,
          percentage: 20,
        },
        knowledgeBase: {
          companyProfile: {
            name: workspaceData.name || "My Workspace",
            domain: workspaceData.domain || workspaceData.website || "mycompany.com",
            industry: workspaceData.industry || "B2B SaaS",
            tagline: workspaceData.tagline || "Growth OS",
            category: "Enterprise Software",
            description: workspaceData.brand || "AI-powered growth workspace.",
            corePhilosophy: "Data-driven systemic growth.",
          },
          founderProfile: {
            name: "Founder",
            title: "Founder & Lead",
            linkedin: "",
            bio: "",
            contentPersona: "Analytical & Visionary",
            primaryFocus: "Organic AI Growth",
            distributionChannels: ["LinkedIn", "Email"],
          },
          industry: workspaceData.industry || "B2B SaaS",
          targetMarkets: workspaceData.targetMarkets || ["USA"],
          idealCustomerProfile: {
            primaryICP: "B2B SaaS Founders",
            secondaryICP: "Growth Agencies",
            regions: workspaceData.targetMarkets || ["USA"],
            companySize: "10-100 employees",
            decisionMakers: ["CEO", "CMO", "VP Growth"],
          },
          productsAndServices: {
            products: [],
            services: [],
          },
          painPoints: [],
          messaging: {
            tagline: workspaceData.tagline || "Growth OS",
            valueProp: "Systemic B2B Growth Engine",
            pillars: [],
            elevatorPitch: "",
          },
          brandVoice: {
            toneTags: workspaceData.brandVoice || ["Strategic"],
            rules: [],
            prohibitedPhrases: [],
            sampleStyle: "",
          },
          competitors: [],
          growthOpportunities: [],
          goals: [],
          challenges: [],
        },
      };

      return { data: mockWorkspace, error: null };
    }

    try {
      const payload = {
        name: workspaceData.name || "New Workspace",
        domain: workspaceData.domain || workspaceData.website || null,
        industry: workspaceData.industry || null,
        brand: workspaceData.brand || null,
        country: workspaceData.country || null,
        timezone: workspaceData.timezone || null,
        logo_url: workspaceData.logoUrl || null,
        logo_letter: workspaceData.logoLetter || (workspaceData.name ? workspaceData.name[0].toUpperCase() : "W"),
        status: "Active",
        owner_id: ownerId,
        target_market: (workspaceData.targetMarkets || workspaceData.targetMarket || ["USA"]) as unknown as Json,
        updated_at: new Date().toISOString(),
      };

      const { data: createdRow, error: createErr } = await supabase
        .from("workspaces")
        .insert(payload)
        .select("*")
        .single();

      if (createErr) return { data: null, error: createErr };

      // Add owner membership record
      await supabase.from("workspace_members").insert({
        workspace_id: createdRow.id,
        user_id: ownerId,
        role: "owner",
      });

      const result: WorkspaceData = {
        id: createdRow.id,
        name: createdRow.name,
        domain: createdRow.domain || "company.com",
        industry: createdRow.industry || "B2B SaaS",
        brand: createdRow.brand || undefined,
        country: createdRow.country || undefined,
        timezone: createdRow.timezone || undefined,
        logoUrl: createdRow.logo_url || undefined,
        logoLetter: createdRow.logo_letter || createdRow.name[0].toUpperCase(),
        status: createdRow.status,
        targetMarket: Array.isArray(createdRow.target_market) ? (createdRow.target_market as string[]) : ["USA"],
        targetMarkets: Array.isArray(createdRow.target_market) ? (createdRow.target_market as string[]) : ["USA"],
        brandVoice: ["Strategic", "Founder-first"],
        teamMembers: [ownerId],
        metrics: {
          growthScore: 85,
          aiVisibility: 70,
          pipelineValue: "$0",
          mrr: "$0",
          activeClientsCount: 0,
          leadsInPipelineCount: 0,
          contentPublishedCount: 0,
          contentTargetCount: 50,
          meetingsBookedCount: 0,
          researchStatus: "Pending",
        },
        weeklyGoal: {
          title: "Complete Growth Blueprint Setup",
          currentCount: 1,
          targetCount: 5,
          percentage: 20,
        },
        knowledgeBase: {
          companyProfile: {
            name: createdRow.name,
            domain: createdRow.domain || "",
            industry: createdRow.industry || "",
            tagline: "B2B Growth OS",
            category: "Enterprise Software",
            description: createdRow.brand || "",
            corePhilosophy: "",
          },
          founderProfile: {
            name: "Founder",
            title: "Founder",
            linkedin: "",
            bio: "",
            contentPersona: "Analytical",
            primaryFocus: "Growth",
            distributionChannels: ["LinkedIn"],
          },
          industry: createdRow.industry || "",
          targetMarkets: Array.isArray(createdRow.target_market) ? (createdRow.target_market as string[]) : ["USA"],
          idealCustomerProfile: {
            primaryICP: "B2B Founders",
            secondaryICP: "Growth Marketing Leaders",
            regions: ["USA"],
            companySize: "10-50",
            decisionMakers: ["CEO"],
          },
          productsAndServices: { products: [], services: [] },
          painPoints: [],
          messaging: { tagline: "", valueProp: "", pillars: [], elevatorPitch: "" },
          brandVoice: { toneTags: ["Strategic"], rules: [], prohibitedPhrases: [], sampleStyle: "" },
          competitors: [],
          growthOpportunities: [],
          goals: [],
          challenges: [],
        },
      };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Invite team members to workspace
   */
  async inviteTeamMembers(
    workspaceId: string,
    invites: TeamMemberInvite[],
    invitedBy: string
  ): Promise<ServiceResult<number>> {
    if (invites.length === 0) return { data: 0, error: null };

    if (!isSupabaseConfigured()) {
      return { data: invites.length, error: null };
    }

    try {
      const records = invites.map((inv) => ({
        workspace_id: workspaceId,
        email: inv.email,
        role: inv.role,
        status: "pending" as const,
        invited_by: invitedBy,
      }));

      const { error } = await supabase.from("workspace_invites").insert(records);
      if (error) return { data: null, error };
      return { data: invites.length, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Fetch workspace by ID from Supabase
   */
  async getWorkspaceById(workspaceId: string): Promise<ServiceResult<Partial<WorkspaceData>>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is not configured.") };
    }

    try {
      const { data, error } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId)
        .single();

      if (error) return { data: null, error };
      if (!data) return { data: null, error: new Error("Workspace not found") };

      const workspace: Partial<WorkspaceData> = {
        id: data.id,
        name: data.name,
        status: data.status,
      };

      if (data.domain) workspace.domain = data.domain;
      if (data.industry) workspace.industry = data.industry;
      if (data.tagline) workspace.tagline = data.tagline;
      if (data.logo_letter) workspace.logoLetter = data.logo_letter;
      if (data.logo_url) workspace.logoUrl = data.logo_url;
      if (data.brand) workspace.brand = data.brand;
      if (data.country) workspace.country = data.country;
      if (data.timezone) workspace.timezone = data.timezone;
      if (Array.isArray(data.target_market)) {
        workspace.targetMarket = data.target_market as string[];
        workspace.targetMarkets = data.target_market as string[];
      }

      return { data: workspace, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * List all accessible workspaces for a user
   */
  async listUserWorkspaces(userId: string): Promise<ServiceResult<Partial<WorkspaceData>[]>> {
    if (!isSupabaseConfigured()) {
      return { data: [], error: null };
    }

    try {
      const { data: memberRows, error: memberErr } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId);

      if (memberErr) return { data: null, error: memberErr };

      const workspaceIds = memberRows.map((m) => m.workspace_id);
      if (workspaceIds.length === 0) return { data: [], error: null };

      const { data: workspaces, error: wsErr } = await supabase
        .from("workspaces")
        .select("*")
        .in("id", workspaceIds);

      if (wsErr) return { data: null, error: wsErr };

      const formatted: Partial<WorkspaceData>[] = (workspaces || []).map((data) => {
        const item: Partial<WorkspaceData> = {
          id: data.id,
          name: data.name,
          status: data.status,
        };
        if (data.domain) item.domain = data.domain;
        if (data.industry) item.industry = data.industry;
        if (data.tagline) item.tagline = data.tagline;
        if (data.logo_letter) item.logoLetter = data.logo_letter;
        return item;
      });

      return { data: formatted, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Update existing workspace
   */
  async updateWorkspace(workspaceId: string, updates: Partial<WorkspaceData>): Promise<ServiceResult<null>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is not configured.") };
    }

    try {
      const payload: {
        name?: string;
        domain?: string | null;
        industry?: string | null;
        brand?: string | null;
        country?: string | null;
        timezone?: string | null;
        logo_url?: string | null;
        status?: string;
        tagline?: string | null;
        logo_letter?: string | null;
        target_market?: Json;
        brand_voice?: Json;
        metrics?: Json;
        weekly_goal?: Json;
        knowledge_base?: Json;
        updated_at: string;
      } = {
        updated_at: new Date().toISOString(),
      };

      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.domain !== undefined) payload.domain = updates.domain;
      if (updates.industry !== undefined) payload.industry = updates.industry;
      if (updates.brand !== undefined) payload.brand = updates.brand;
      if (updates.country !== undefined) payload.country = updates.country;
      if (updates.timezone !== undefined) payload.timezone = updates.timezone;
      if (updates.logoUrl !== undefined) payload.logo_url = updates.logoUrl;
      if (updates.status !== undefined) payload.status = updates.status;
      if (updates.tagline !== undefined) payload.tagline = updates.tagline;
      if (updates.logoLetter !== undefined) payload.logo_letter = updates.logoLetter;
      if (updates.targetMarket !== undefined) payload.target_market = updates.targetMarket as unknown as Json;
      if (updates.targetMarkets !== undefined) payload.target_market = updates.targetMarkets as unknown as Json;

      const { error } = await supabase.from("workspaces").update(payload).eq("id", workspaceId);

      if (error) return { data: null, error };
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Save Knowledge Base updates to Supabase workspace
   */
  async updateKnowledgeBase(workspaceId: string, knowledgeBase: WorkspaceKnowledgeBase): Promise<ServiceResult<null>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is not configured.") };
    }

    try {
      const { error } = await supabase
        .from("workspaces")
        .update({
          knowledge_base: knowledgeBase as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .eq("id", workspaceId);

      if (error) return { data: null, error };
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },
};
