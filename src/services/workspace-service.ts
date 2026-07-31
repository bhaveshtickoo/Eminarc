import { WorkspaceData } from "../types/workspace";

export async function fetchWorkspaceData(workspaceId: string): Promise<WorkspaceData> {
  // Static service abstraction for growth workspace metadata
  return {
    id: workspaceId,
    name: "Eminarc",
    domain: "eminarc.com",
    industry: "B2B Growth Consultancy",
    targetMarket: ["USA", "MENA"],
    brandVoice: ["Strategic", "Founder-first", "Minimal"],
    metrics: {
      growthScore: 78,
      aiVisibility: 63,
      pipelineValue: "$12,400",
      mrr: "$2,07,000",
      activeClientsCount: 3,
      leadsInPipelineCount: 112,
      contentPublishedCount: 48,
      contentTargetCount: 50,
      meetingsBookedCount: 17,
      researchStatus: "Complete",
    },
    weeklyGoal: {
      title: "Generate 12 Qualified Leads",
      currentCount: 8,
      targetCount: 12,
      percentage: 68,
    },
    teamMembers: ["Pratyush", "Aditya"],
  };
}
