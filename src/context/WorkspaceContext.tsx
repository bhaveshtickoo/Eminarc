import React, { createContext, useContext, useState } from "react";
import { WorkspaceData, WorkspaceContextType } from "../types/workspace";

const defaultWorkspace: WorkspaceData = {
  id: "ws-eminarc",
  name: "Eminarc",
  domain: "eminarc.com",
  industry: "B2B Growth Consultancy",
  status: "Active",
  tagline: "Strategic B2B Growth Operating System",
  logoLetter: "E",
  targetMarket: ["USA", "MENA"],
  brandVoice: ["Strategic", "Founder-first", "Minimal"],
  metrics: {
    growthScore: 78,
    growthScoreChange: 6,
    aiVisibility: 63,
    aiVisibilityStatus: "Needs Improvement",
    pipelineValue: "$12,400",
    opportunitiesCount: 14,
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
    timeframe: "This Week",
  },
  teamMembers: ["Pratyush", "Aditya"],
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceData>(defaultWorkspace);
  const availableWorkspaces = [defaultWorkspace];

  const switchWorkspace = (id: string) => {
    console.log(`Switched to workspace: ${id}`);
  };

  const updateWorkspace = (updates: Partial<WorkspaceData>) => {
    setCurrentWorkspace((prev) => ({ ...prev, ...updates }));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        availableWorkspaces,
        switchWorkspace,
        updateWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
