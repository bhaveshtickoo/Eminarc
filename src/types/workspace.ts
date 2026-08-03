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
  logoUrl?: string;
  website?: string;
  brand?: string;
  country?: string;
  timezone?: string;
  targetMarkets?: string[];
}

export interface CompanyKnowledgeProfile {
  name: string;
  domain: string;
  industry: string;
  tagline: string;
  category: string;
  description: string;
  corePhilosophy: string;
}

export interface FounderKnowledgeProfile {
  name: string;
  title: string;
  linkedin: string;
  bio: string;
  background?: string;
  contentPersona: string;
  primaryFocus: string;
  distributionChannels: string[];
}

export interface ICPKnowledge {
  primaryICP: string;
  secondaryICP: string;
  regions: string[];
  companySize: string;
  decisionMakers: string[];
}

export interface PainPointKnowledge {
  title: string;
  impact: string;
}

export interface BrandVoiceKnowledge {
  toneTags: string[];
  rules: string[];
  prohibitedPhrases: string[];
  sampleStyle: string;
}

export interface MessagingPillar {
  title: string;
  hook: string;
}

export interface MessagingKnowledge {
  tagline: string;
  valueProp: string;
  pillars: MessagingPillar[];
  elevatorPitch: string;
}

export interface CompetitorKnowledge {
  name: string;
  category: string;
  strengths: string;
  weaknesses: string;
  ourAdvantage: string;
}

export interface ProductKnowledge {
  name: string;
  description: string;
  tier: string;
  keyFeatures: string[];
}

export interface ServiceKnowledge {
  name: string;
  scope: string;
  deliverables: string[];
}

export interface GrowthOpportunityKnowledge {
  title: string;
  description: string;
}

export interface GoalKnowledge {
  title: string;
  target: string;
  timeframe: string;
  priority: "High" | "Medium" | "Low";
}

export interface ChallengeKnowledge {
  title: string;
  impact: string;
  mitigation: string;
  status: "Active" | "Mitigated";
}

export interface WorkspaceKnowledgeBase {
  companyProfile: CompanyKnowledgeProfile;
  founderProfile: FounderKnowledgeProfile;
  industry: string;
  targetMarkets: string[];
  targetMarket?: string[];
  idealCustomerProfile: ICPKnowledge;
  productsAndServices: {
    products: ProductKnowledge[];
    services: ServiceKnowledge[];
  };
  products?: ProductKnowledge[];
  services?: ServiceKnowledge[];
  painPoints: PainPointKnowledge[];
  messaging: MessagingKnowledge;
  brandVoice: BrandVoiceKnowledge;
  competitors: CompetitorKnowledge[];
  growthOpportunities: GrowthOpportunityKnowledge[];
  goals: GoalKnowledge[];
  challenges: ChallengeKnowledge[];
}

export interface WorkspaceData extends WorkspaceItem {
  targetMarket: string[];
  brandVoice: string[];
  metrics: WorkspaceMetrics;
  weeklyGoal: WorkspaceGoal;
  teamMembers: string[];
  knowledgeBase: WorkspaceKnowledgeBase;
}

export interface WorkspaceContextType {
  currentWorkspace: WorkspaceData;
  availableWorkspaces?: WorkspaceData[];
  switchWorkspace: (id: string) => void;
  updateWorkspace: (updates: Partial<WorkspaceData>) => void;
  createAndSetWorkspace: (newWorkspaceData: Partial<WorkspaceData>) => Promise<WorkspaceData>;
  updateKnowledgeBase: (updates: Partial<WorkspaceKnowledgeBase>) => void;
  populateKnowledgeBaseFromResearch: (researchData: {
    website: string;
    linkedin: string;
    industry: string;
    targetMarkets: string[];
  }) => void;
}
