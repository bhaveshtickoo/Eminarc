// Autonomous AI Agents Service Layer — Isolates future OpenRouter agent orchestration & background worker API.

export interface AIAgentStatusData {
  id: string;
  name: string;
  role: string;
  status: "Scanning" | "Active" | "Idle";
  lastRun: string;
  tasksCompleted: number;
}

export interface CopilotInsightData {
  alert: string;
  subtext: string;
  confidenceScore: number;
  suggestedActions: string[];
}

export async function getAgentsList(): Promise<AIAgentStatusData[]> {
  // Static mock agents service implementation
  return [
    {
      id: "agent-1",
      name: "Search Visibility Radar",
      role: "LLM Citation Tracker",
      status: "Scanning",
      lastRun: "2m ago",
      tasksCompleted: 142,
    },
    {
      id: "agent-2",
      name: "Content Generation Engine",
      role: "Multi-Format Asset Creator",
      status: "Active",
      lastRun: "15m ago",
      tasksCompleted: 88,
    },
    {
      id: "agent-3",
      name: "Lead Enrichment Agent",
      role: "ICP Account Scanner",
      status: "Active",
      lastRun: "1h ago",
      tasksCompleted: 215,
    },
    {
      id: "agent-4",
      name: "Competitor Radar Agent",
      role: "Messaging Gap Monitor",
      status: "Idle",
      lastRun: "3h ago",
      tasksCompleted: 64,
    },
  ];
}

export async function getCopilotInsights(): Promise<CopilotInsightData> {
  // Static mock copilot insights service implementation
  return {
    alert: "Your LinkedIn impressions dropped 18%.",
    subtext: "Based on algorithmic engagement patterns over the last 7 days.",
    confidenceScore: 92,
    suggestedActions: [
      "Publish founder story",
      "Reply to comments",
      "Improve your headline",
      "Target Healthcare ICP",
    ],
  };
}
