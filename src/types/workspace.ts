export interface WorkspaceMetrics {
  growthScore: number;
  growthScoreChange?: number;
  aiVisibility: number;
  aiVisibilityStatus?: string;
  pipelineValue: string;
  opportunitiesCount?: number;
  mrr: string;
  activeClientsCount: number;
  leadsInPipelineCount: number;
  contentPublishedCount: number;
  contentTargetCount: number;
  meetingsBookedCount: number;
  researchStatus: "Complete" | "In Progress" | "Pending";
}

export interface WorkspaceGoal {
  title: string;
  currentCount: number;
  targetCount: number;
  percentage: number;
  timeframe?: string;
}

export interface WorkspaceItem {
  id: string;
  name: string;
  domain: string;
  industry: string;
  status?: string;
  tagline?: string;
  logoLetter?: string;
}

export interface WorkspaceData extends WorkspaceItem {
  targetMarket: string[];
  brandVoice: string[];
  metrics: WorkspaceMetrics;
  weeklyGoal: WorkspaceGoal;
  teamMembers: string[];
}

export interface WorkspaceContextType {
  currentWorkspace: WorkspaceData;
  availableWorkspaces?: WorkspaceData[];
  switchWorkspace: (id: string) => void;
  updateWorkspace: (updates: Partial<WorkspaceData>) => void;
}
