/**
 * Founder Research Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import type { Database, ServiceResult } from "@/lib/supabase/types";
import { founderAgent } from "../ai/founder-agent";
import { aiMemoryManager } from "@/core/memory/memory-manager";

// Type definitions mapped from Supabase database schema
export type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];
export type CompanyInsert = Database["public"]["Tables"]["companies"]["Insert"];
export type CompanyUpdate = Database["public"]["Tables"]["companies"]["Update"];

export type FounderRow = Database["public"]["Tables"]["founders"]["Row"];
export type FounderInsert = Database["public"]["Tables"]["founders"]["Insert"];
export type FounderUpdate = Database["public"]["Tables"]["founders"]["Update"];

export type ResearchJobRow = Database["public"]["Tables"]["research_jobs"]["Row"];
export type ResearchJobInsert = Database["public"]["Tables"]["research_jobs"]["Insert"];
export type ResearchJobUpdate = Database["public"]["Tables"]["research_jobs"]["Update"];

export type ResearchReportRow = Database["public"]["Tables"]["research_reports"]["Row"];
export type ResearchReportInsert = Database["public"]["Tables"]["research_reports"]["Insert"];
export type ResearchReportUpdate = Database["public"]["Tables"]["research_reports"]["Update"];

export class FounderResearchService {
  /**
   * Initialize a new queued research job for a target company in a workspace
   */
  static async startResearch(
    workspaceId: string,
    companyId: string,
  ): Promise<ServiceResult<ResearchJobRow>> {
    try {
      if (!workspaceId || !companyId) {
        return {
          data: null,
          error: new Error("Workspace ID and Company ID are required to start a research job."),
        };
      }

      const newJob: ResearchJobInsert = {
        workspace_id: workspaceId,
        company_id: companyId,
        status: "queued",
        progress: 0,
        started_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from("research_jobs").insert(newJob).select().single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.startResearch] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to start research job."),
      };
    }
  }

  /**
   * Update status, progress or error fields of an existing research job
   */
  static async updateJob(
    jobId: string,
    updates: Partial<ResearchJobUpdate>,
  ): Promise<ServiceResult<ResearchJobRow>> {
    try {
      if (!jobId) {
        return { data: null, error: new Error("Job ID is required.") };
      }

      const { data, error } = await supabase
        .from("research_jobs")
        .update(updates)
        .eq("id", jobId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.updateJob] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to update research job."),
      };
    }
  }

  /**
   * Process an asynchronous research job in the background, updating Supabase status steps
   */
  static async processResearchJobAsync(
    jobId: string,
    workspaceId: string,
    companyId: string,
    companyName: string,
    website: string,
  ): Promise<void> {
    try {
      // Step 1: Transition status from 'queued' to 'running' and set initial progress = 20
      await this.updateJob(jobId, { status: "running", progress: 20 });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 2: Company research step via FounderAgent
      const compDetails = await founderAgent.researchCompany({
        domain: website,
        name: companyName,
      });
      await this.updateJob(jobId, { progress: 45 });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 3: Founder research step & persistence in Supabase
      const founderDetails = await founderAgent.researchFounder({
        name: `${companyName} Founder`,
        companyName,
      });
      const founderRes = await this.saveFounder({
        company_id: companyId,
        full_name: founderDetails.fullName,
        title: founderDetails.title,
        linkedin_url: founderDetails.linkedinUrl,
        bio: founderDetails.bio,
      });
      await this.updateJob(jobId, { progress: 65 });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 4: ICP, Pain Points, Buying Signals, LinkedIn, GTM, TechStack, Competitors, Content, Positioning, TAM, SWOT
      const [
        icp,
        painPoints,
        buyingSignals,
        linkedIn,
        gtm,
        techStack,
        competitors,
        content,
        positioning,
        tam,
        swot,
      ] = await Promise.all([
        founderAgent.generateICP({
          companyName,
          industry: compDetails.industry,
          productSummary: compDetails.description,
        }),
        founderAgent.generatePainPoints({
          companyName,
          industry: compDetails.industry,
          targetAudience: "Early to Mid-Stage Founders",
        }),
        founderAgent.generateBuyingSignals({
          companyName,
          industry: compDetails.industry,
        }),
        founderAgent.researchLinkedIn({
          founderName: founderDetails.fullName,
          companyName,
        }),
        founderAgent.generateGTMAnalysis({
          companyName,
          industry: compDetails.industry,
        }),
        founderAgent.detectTechStack({
          website,
          companyName,
        }),
        founderAgent.discoverCompetitors({
          companyName,
          category: compDetails.category,
        }),
        founderAgent.analyzeContent({
          companyName,
          founderName: founderDetails.fullName,
        }),
        founderAgent.analyzeMarketPositioning({
          companyName,
        }),
        founderAgent.estimateTAM({
          companyName,
          industry: compDetails.industry,
        }),
        founderAgent.generateSWOT({
          companyName,
          industry: compDetails.industry,
        }),
      ]);

      await this.updateJob(jobId, { progress: 85 });

      // Step 5: Summary synthesis & saving completed report in Supabase
      const summary = await founderAgent.generateSummary({
        companyName,
        founderName: founderDetails.fullName,
        icp,
        painPoints,
      });

      const reportPayload = {
        company: compDetails,
        founder: founderDetails,
        industry: compDetails.industry,
        icp,
        painPoints,
        buyingSignals,
        linkedIn,
        gtm,
        techStack,
        competitors,
        content,
        positioning,
        tam,
        swot,
        opportunityScore: summary.opportunityScore,
        summary: summary.executiveSummary,
      };

      await this.saveReport({
        company_id: companyId,
        founder_id: founderRes.data?.id || null,
        summary: summary.executiveSummary,
        icp: icp as any,
        pain_points: painPoints as any,
        buying_signals: buyingSignals as any,
        tech_stack: techStack.crmAndSalesTools as any,
        competitors: competitors as any,
        confidence_score: summary.opportunityScore,
        raw_json: reportPayload as any,
      });

      // Step 6: Memory ingestion into Workspace Knowledge Base & Founder Memory
      await aiMemoryManager.saveMemoryItem({
        workspaceId,
        memoryType: "founder",
        key: `founder-research-${companyId}`,
        content: `Founder Intelligence Teardown for ${companyName} (${founderDetails.fullName}): ICP=${icp.primaryTarget}, TAM=${tam.tamUsd}, GTM=${gtm.gtmMotion}, OpportunityScore=${summary.opportunityScore}%.`,
        tags: ["founder-research", companyName.toLowerCase(), "icp", "tam"],
      });

      // Step 7: Mark job completed with 100% progress
      await this.updateJob(jobId, {
        status: "completed",
        progress: 100,
        completed_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("[FounderResearchService.processResearchJobAsync] Fatal Error:", err);
      await this.updateJob(jobId, {
        status: "failed",
        error: err instanceof Error ? err.message : "Async research processing failure.",
      });
    }
  }

  /**
   * Retrieve current execution status and progress of a research job
   */
  static async getJob(jobId: string): Promise<ServiceResult<ResearchJobRow>> {
    try {
      if (!jobId) {
        return { data: null, error: new Error("Job ID is required.") };
      }

      const { data, error } = await supabase
        .from("research_jobs")
        .select("*")
        .eq("id", jobId)
        .is("deleted_at", null)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.getJob] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve research job."),
      };
    }
  }

  /**
   * Save or update a target company record in Supabase
   */
  static async saveCompany(companyData: CompanyInsert): Promise<ServiceResult<CompanyRow>> {
    try {
      if (!companyData.workspace_id || !companyData.name) {
        return {
          data: null,
          error: new Error("Workspace ID and Company Name are required."),
        };
      }

      const { data, error } = await supabase
        .from("companies")
        .insert(companyData)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.saveCompany] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save company record."),
      };
    }
  }

  /**
   * Save or update a founder/executive persona linked to a company
   */
  static async saveFounder(founderData: FounderInsert): Promise<ServiceResult<FounderRow>> {
    try {
      if (!founderData.company_id || !founderData.full_name) {
        return {
          data: null,
          error: new Error("Company ID and Founder Full Name are required."),
        };
      }

      const { data, error } = await supabase.from("founders").insert(founderData).select().single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.saveFounder] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save founder record."),
      };
    }
  }

  /**
   * Save a completed research report in Supabase
   */
  static async saveReport(
    reportData: ResearchReportInsert,
  ): Promise<ServiceResult<ResearchReportRow>> {
    try {
      if (!reportData.company_id) {
        return {
          data: null,
          error: new Error("Company ID is required to save a research report."),
        };
      }

      const { data, error } = await supabase
        .from("research_reports")
        .insert(reportData)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.saveReport] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save research report."),
      };
    }
  }

  /**
   * Retrieve the latest research report generated for a target company
   */
  static async getReport(companyId: string): Promise<ServiceResult<ResearchReportRow>> {
    try {
      if (!companyId) {
        return { data: null, error: new Error("Company ID is required.") };
      }

      const { data, error } = await supabase
        .from("research_reports")
        .select("*")
        .eq("company_id", companyId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("[FounderResearchService.getReport] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve research report."),
      };
    }
  }
}

// Export individual standalone service functions for convenience
export const startResearch = FounderResearchService.startResearch;
export const updateJob = FounderResearchService.updateJob;
export const processResearchJobAsync = FounderResearchService.processResearchJobAsync;
export const getJob = FounderResearchService.getJob;
export const saveCompany = FounderResearchService.saveCompany;
export const saveFounder = FounderResearchService.saveFounder;
export const saveReport = FounderResearchService.saveReport;
export const getReport = FounderResearchService.getReport;
