/**
 * Central Agent Registry System
 * Eminarc Growth OS AI Core
 */

import { BaseAgent } from "./base";

export class AgentRegistry {
  private agents = new Map<string, BaseAgent>();

  register(agent: BaseAgent): void {
    if (this.agents.has(agent.id)) {
      console.warn(`[AgentRegistry] Overwriting existing agent registration for ID "${agent.id}"`);
    }
    this.agents.set(agent.id, agent);
  }

  get(agentId: string): BaseAgent | undefined {
    return this.agents.get(agentId);
  }

  list(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  unregister(agentId: string): boolean {
    return this.agents.delete(agentId);
  }
}

export const globalAgentRegistry = new AgentRegistry();
