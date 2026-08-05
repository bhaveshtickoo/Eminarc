/**
 * Central Agent Registry Engine
 * Eminarc Growth OS Core
 */

import { GrowthAgent } from "./base";
import { FounderResearchAgent } from "./implementations/founder-research";
import { ContentStrategistAgent } from "./implementations/content-strategist";
import { CRMAssistantAgent } from "./implementations/crm-assistant";
import { VisibilityAnalystAgent } from "./implementations/visibility-analyst";
import { DistributionPlannerAgent } from "./implementations/distribution-planner";
import { ReportGeneratorAgent } from "./implementations/report-generator";
import { TaskPlannerAgent } from "./implementations/task-planner";
import { GrowthStrategyAgent } from "./growth-strategy/agent";

export class AgentRegistry {
  private agents = new Map<string, GrowthAgent>();

  constructor() {
    // Register all core autonomous agents out of the box
    this.register(new FounderResearchAgent());
    this.register(new ContentStrategistAgent());
    this.register(new CRMAssistantAgent());
    this.register(new VisibilityAnalystAgent());
    this.register(new DistributionPlannerAgent());
    this.register(new ReportGeneratorAgent());
    this.register(new TaskPlannerAgent());
    this.register(new GrowthStrategyAgent());
  }

  /**
   * Register a new Growth Agent
   */
  register(agent: GrowthAgent): void {
    if (this.agents.has(agent.id)) {
      console.warn(`[AgentRegistry] Overwriting existing agent registration for ID "${agent.id}"`);
    }
    this.agents.set(agent.id, agent);
  }

  /**
   * Retrieve an agent by ID
   */
  get(agentId: string): GrowthAgent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * List all registered agents
   */
  list(): GrowthAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Unregister an agent by ID
   */
  unregister(agentId: string): boolean {
    return this.agents.delete(agentId);
  }
}

export const globalAgentRegistry = new AgentRegistry();
