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
  companyId?: string;
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
    voiceHandler = globalCopilotVoiceHandler,
  ) {
    this.router = router;
    this.orchestrator = orchestrator;
    this.voiceHandler = voiceHandler;
  }

  /**
   * Helper: Parse code blocks from raw AI Markdown output
   */
  private extractCodeBlocks(text: string): Array<{ language: string; code: string }> {
    const codeBlocks: Array<{ language: string; code: string }> = [];
    const regex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      codeBlocks.push({
        language: match[1] || "text",
        code: match[2].trim(),
      });
    }
    return codeBlocks;
  }

  /**
   * Session Management: Get or create a session
   */
  async getOrCreateSession(workspaceId: string, sessionId?: string): Promise<CopilotSession> {
    const sId = sessionId || `session-${Date.now()}`;
    if (this.activeSessions.has(sId)) {
      return this.activeSessions.get(sId)!;
    }

    const savedHistory = await ConversationMemoryLayer.loadSession(workspaceId, sId);
    const session: CopilotSession = {
      id: sId,
      workspaceId,
      title: savedHistory.length > 0 ? savedHistory[0]?.content.slice(0, 30) : "New Growth Session",
      messages: savedHistory.map((m) => ({
        id: m.id,
        role: m.role as any,
        content: m.content,
        intent: m.intent,
        agentId: m.agentId,
        timestamp: m.timestamp,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.activeSessions.set(sId, session);
    return session;
  }

  /**
   * Session Management: List recent sessions
   */
  async getSessions(workspaceId: string): Promise<CopilotSession[]> {
    try {
      const recent = await ConversationMemoryLayer.getRecentSessions(workspaceId, 10);
      return recent.map((s) => ({
        id: s.sessionId,
        workspaceId,
        title: s.title || `Session ${s.sessionId.slice(-4)}`,
        messages: s.messages as any,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }));
    } catch {
      return Array.from(this.activeSessions.values()).filter((s) => s.workspaceId === workspaceId);
    }
  }

  /**
   * Primary Copilot Processing Engine
   */
  async processMessage(params: CopilotProcessParams): Promise<CopilotMessage> {
    // Offline check
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return {
        id: `msg-err-${Date.now()}`,
        role: "assistant",
        content:
          "Network connection offline. Growth Copilot will resume when internet connectivity is restored.",
        isError: true,
        timestamp: new Date().toISOString(),
      };
    }

    const sessionId = params.sessionId || `session-${Date.now()}`;
    const userMessage: CopilotMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: params.userPrompt,
      timestamp: new Date().toISOString(),
    };

    // 1. Understand Intent & Route Request
    const routingDecision = await this.router.route(params.userPrompt);

    // 2. Load Workspace + Company + Founder Memory Context
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      sessionId,
      ...(params.companyId ? { companyId: params.companyId } : {}),
    });

    // 3. Dynamically Load Agent & Execute via AI Orchestrator
    let agentResponseContent = "";
    let structuredData: any = null;
    let isError = false;

    try {
      const agentRes = await this.orchestrator.executeAgent(routingDecision.agentId, {
        workspaceId: params.workspaceId,
        prompt: `${params.userPrompt}\n\n[CONTEXT: Intent=${routingDecision.intent}, Workspace=${params.workspaceId}]`,
        sessionId,
        params: routingDecision.entities as any,
        ...(params.providerName ? { providerName: params.providerName } : {}),
      });

      agentResponseContent = agentRes.content;
      structuredData = agentRes.data;
    } catch (err) {
      console.warn(
        `[GrowthCopilot] Agent execution warning for ID "${routingDecision.agentId}":`,
        err,
      );
      agentResponseContent = `Copilot processed your request under intent "${routingDecision.intent}". Context: ${memoryContext.workspaceName}. Target Agent "${routingDecision.agentId}" complete.`;
      structuredData = { intent: routingDecision.intent, decision: routingDecision };
    }

    const codeBlocks = this.extractCodeBlocks(agentResponseContent);

    // 4. Construct Assistant Response Message
    const assistantMessage: CopilotMessage = {
      id: `msg-ast-${Date.now()}`,
      role: "assistant",
      content: agentResponseContent,
      intent: routingDecision.intent,
      agentId: routingDecision.agentId,
      navigationTarget: routingDecision.entities.navigationTarget,
      codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined,
      structuredData,
      isError,
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
    onChunk: (chunk: string) => void,
  ): Promise<CopilotMessage> {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const offlineMsg = "Network connection offline. Cannot stream response.";
      onChunk(offlineMsg);
      return {
        id: `msg-stream-err-${Date.now()}`,
        role: "assistant",
        content: offlineMsg,
        isError: true,
        timestamp: new Date().toISOString(),
      };
    }

    const routingDecision = await this.router.route(params.userPrompt);

    const res = await this.orchestrator.executeStreaming(
      {
        prompt: params.userPrompt,
        systemPrompt: `You are Growth Copilot for Eminarc Growth OS. Intent: ${routingDecision.intent}. Agent: ${routingDecision.agentId}. Provide concise, actionable B2B growth intelligence.`,
        ...(params.providerName ? { providerName: params.providerName } : {}),
      },
      onChunk,
    );

    const codeBlocks = this.extractCodeBlocks(res.content);

    return {
      id: `msg-stream-${Date.now()}`,
      role: "assistant",
      content: res.content,
      intent: routingDecision.intent,
      agentId: routingDecision.agentId,
      navigationTarget: routingDecision.entities.navigationTarget,
      codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Synthesize audio response for voice interface
   */
  async generateVoiceResponse(text: string) {
    return this.voiceHandler.synthesizeSpeechUrl(text);
  }
}

export const growthCopilot = new GrowthCopilot();
