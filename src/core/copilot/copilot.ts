/**
 * Central Growth Copilot Core Engine
 * Eminarc Growth OS
 * Architecture: Copilot -> Intent Router -> Agent Registry -> AI Orchestrator -> Tools -> Supabase -> React UI
 */

import { IntentRouter, globalIntentRouter } from "./router/intent-router";
import { aiOrchestrator, AIOrchestrator } from "../ai/orchestrator";
import { aiMemoryManager } from "../memory/memory-manager";
import { ConversationMemoryLayer } from "../memory/layers/conversation-memory";
import { CopilotMessage, CopilotSession } from "./types";
import { globalCopilotVoiceHandler, CopilotVoiceHandler } from "./voice-hook";

export interface CopilotProcessParams {
  workspaceId: string;
  sessionId?: string;
  userPrompt: string;
  providerName?: string;
}

export class GrowthCopilot {
  private router: IntentRouter;
  private orchestrator: AIOrchestrator;
  private voiceHandler: CopilotVoiceHandler;
  private activeSessions = new Map<string, CopilotSession>();

  constructor(
    router = globalIntentRouter,
    orchestrator = aiOrchestrator,
    voiceHandler = globalCopilotVoiceHandler
  ) {
    this.router = router;
    this.orchestrator = orchestrator;
    this.voiceHandler = voiceHandler;
  }

  /**
   * Primary Copilot Processing Engine
   */
  async processMessage(params: CopilotProcessParams): Promise<CopilotMessage> {
    const sessionId = params.sessionId || `session-${Date.now()}`;
    const userMessage: CopilotMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: params.userPrompt,
      timestamp: new Date().toISOString(),
    };

    // 1. Understand Intent & Route Request using IntentRouter.route()
    const routingDecision = await this.router.route(params.userPrompt);

    // 2. Load Workspace Context
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      sessionId,
    });

    // 3. Dynamically Load Agent & Execute via AI Orchestrator
    let agentResponseContent = "";
    let structuredData: any = null;

    try {
      const agentRes = await this.orchestrator.executeAgent(routingDecision.agentId, {
        workspaceId: params.workspaceId,
        prompt: params.userPrompt,
        sessionId,
        params: routingDecision.entities as any,
        providerName: params.providerName,
      });

      agentResponseContent = agentRes.content;
      structuredData = agentRes.data;
    } catch (err) {
      console.warn(`[GrowthCopilot] Agent execution warning for ID "${routingDecision.agentId}":`, err);
      agentResponseContent = `Copilot processed request using default growth intelligence system context.`;
      structuredData = { intent: routingDecision.intent, decision: routingDecision };
    }

    // 4. Construct Assistant Response Message
    const assistantMessage: CopilotMessage = {
      id: `msg-ast-${Date.now()}`,
      role: "assistant",
      content: agentResponseContent,
      intent: routingDecision.intent as any,
      agentId: routingDecision.agentId,
      structuredData,
      timestamp: new Date().toISOString(),
    };

    // 5. Maintain Conversation & Save in Memory Store
    await ConversationMemoryLayer.save(params.workspaceId, {
      sessionId,
      messages: [userMessage, assistantMessage],
    });

    return assistantMessage;
  }

  /**
   * Process streaming message response
   */
  async processMessageStreaming(
    params: CopilotProcessParams,
    onChunk: (chunk: string) => void
  ): Promise<CopilotMessage> {
    const routingDecision = await this.router.route(params.userPrompt);

    const res = await this.orchestrator.executeStreaming(
      {
        prompt: params.userPrompt,
        systemPrompt: `You are Growth Copilot. Routed Intent: ${routingDecision.intent}. Target Agent: ${routingDecision.agentId}. Confidence: ${routingDecision.confidenceScore}.`,
        providerName: params.providerName,
      },
      onChunk
    );

    return {
      id: `msg-stream-${Date.now()}`,
      role: "assistant",
      content: res.content,
      intent: routingDecision.intent as any,
      agentId: routingDecision.agentId,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Synthesize audio response for future voice interface
   */
  async generateVoiceResponse(text: string) {
    return this.voiceHandler.synthesizeSpeechUrl(text);
  }
}

export const growthCopilot = new GrowthCopilot();
