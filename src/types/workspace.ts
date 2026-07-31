/**
 * Workspace Architecture Type Definitions
 * Scalable schema for enterprise workspace state management (1000+ companies)
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
}

export interface WorkspaceMetrics {
  growthScore: number;
  growthScoreChange: string;
  aiVisibility: number;
  aiVisibilityStatus: string;
  pipelineValue: string;
  opportunitiesCount: number;
  contentPublishedCount: number;
  contentTargetCount: number;
}

export interface WorkspaceGoal {
  title: string;
  targetCount: number;
  currentCount: number;
  percentage: number;
  timeframe: string;
}

export interface WorkspaceItem {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  targetMarket: string[];
  brandVoice: string[];
  logoLetter: string;
  status: 'Optimal' | 'Analyzing' | 'Attention Required';
  metrics: WorkspaceMetrics;
  weeklyGoal: WorkspaceGoal;
  teamMembers: TeamMember[];
}

export interface WorkspaceContextType {
  currentWorkspace: WorkspaceItem;
  availableWorkspaces: WorkspaceItem[];
  switchWorkspace: (workspaceId: string) => void;
  updateWorkspaceGoal: (goal: Partial<WorkspaceGoal>) => void;
}
