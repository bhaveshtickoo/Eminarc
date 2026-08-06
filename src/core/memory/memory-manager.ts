/**
 * Central AI Memory Manager & Automatic Agent Context Injector
 * Eminarc Growth OS Core
 */

import { WorkspaceMemoryLayer } from "./layers/workspace-memory";
import { CompanyMemoryLayer } from "./layers/company-memory";
import { FounderMemoryLayer } from "./layers/founder-memory";
import { ConversationMemoryLayer } from "./layers/conversation-memory";
import { CampaignMemoryLayer } from "./layers/campaign-memory";
import { ResearchMemoryLayer } from "./layers/research-memory";
import { FullAgentMemoryContext, MemorySearchOptions } from "./types";
import { SupabaseMemoryStore } from "./supabase-memory-store";

export class AIMemoryManager {
  /**
   * Load all 6 AI Memory Layers asynchronously for a workspace and optional entity context
   */
  async loadFullMemoryContext(
    workspaceId: string,
    options?: { companyId?: string; sessionId?: string; campaignId?: string },
  ): Promise<FullAgentMemoryContext> {
    const [workspace, company, founder, conversation, campaign, research] = await Promise.all([
      WorkspaceMemoryLayer.load(workspaceId),
      CompanyMemoryLayer.load(workspaceId, options?.companyId),
      FounderMemoryLayer.load(workspaceId, options?.companyId),
      ConversationMemoryLayer.load(workspaceId, options?.sessionId),
      CampaignMemoryLayer.load(workspaceId, options?.campaignId),
      ResearchMemoryLayer.load(workspaceId, options?.companyId),
    ]);

    const formattedSystemContext = this.formatSystemContextPrompt({
      workspace: workspace || undefined,
      company: company || undefined,
      founder: founder || undefined,
      conversation: conversation || undefined,
      campaign: campaign || undefined,
      research: research || undefined,
    });

    return {
      workspace: workspace || undefined,
      company: company || undefined,
      founder: founder || undefined,
      conversation: conversation || undefined,
      campaign: campaign || undefined,
      research: research || undefined,
      formattedSystemContext,
    };
  }

  /**
   * Formats 6 memory layers into a clean, system prompt context block for AI Agents
   */
  formatSystemContextPrompt(memories: Partial<FullAgentMemoryContext>): string {
    const sections: string[] = ["=== EMINARC AI MEMORY CONTEXT ==="];

    if (memories.workspace) {
      sections.push(
        `[WORKSPACE MEMORY]\nName: ${memories.workspace.name}\nIndustry: ${memories.workspace.industry || "B2B SaaS"}\nTagline: ${memories.workspace.tagline || "N/A"}\nBrand Voice: ${memories.workspace.brandVoice?.join(", ") || "Strategic, Founder-first"}`,
      );
    }

    if (memories.company) {
      sections.push(
        `[COMPANY MEMORY]\nTarget Company: ${memories.company.name}\nWebsite: ${memories.company.website || "N/A"}\nSize: ${memories.company.companySize || "N/A"}\nDescription: ${memories.company.description || "N/A"}`,
      );
    }

    if (memories.founder) {
      sections.push(
        `[FOUNDER MEMORY]\nFounder: ${memories.founder.fullName}\nTitle: ${memories.founder.title || "CEO"}\nBio: ${memories.founder.bio || "N/A"}`,
      );
    }

    if (memories.research) {
      sections.push(
        `[RESEARCH MEMORY]\nICP Fit: ${memories.research.icpSummary}\nPain Points: ${memories.research.painPoints.join("; ")}\nBuying Signals: ${memories.research.buyingSignals.join("; ")}\nTech Stack: ${memories.research.techStack.join(", ")}\nOpportunity Score: ${memories.research.opportunityScore}/100`,
      );
    }

    if (memories.campaign) {
      sections.push(
        `[CAMPAIGN MEMORY]\nActive Campaign: ${memories.campaign.name} (${memories.campaign.channel})\nTarget Leads: ${memories.campaign.targetLeadsCount}\nSequence: ${memories.campaign.activeSequence}`,
      );
    }

    if (memories.conversation && memories.conversation.messages.length > 0) {
      const chatLogs = memories.conversation.messages
        .slice(-4)
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n");
      sections.push(`[CONVERSATION MEMORY]\nRecent Chat History:\n${chatLogs}`);
    }

    sections.push("================================");
    return sections.join("\n\n");
  }

  /**
   * Save an item into Supabase Memory Store
   */
  async saveMemoryItem(params: {
    workspaceId: string;
    memoryType: string;
    key: string;
    content: string;
    tags?: string[];
  }): Promise<boolean> {
    return SupabaseMemoryStore.saveMemoryItem({
      workspace_id: params.workspaceId,
      memory_type: params.memoryType,
      key: params.key,
      content: params.content,
      tags: params.tags,
    });
  }

  /**
   * Search memory entries (text-match, ready for future pgvector semantic similarity hook)
   */
  async searchSemantic(query: string, workspaceId: string, limit = 5) {
    return SupabaseMemoryStore.searchSimilar(query, workspaceId, limit);
  }
}

export const aiMemoryManager = new AIMemoryManager();
