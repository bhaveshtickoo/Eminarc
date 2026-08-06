/**
 * Intent Router Core Engine
 * Eminarc Growth OS Core
 * Implements detectIntent, extractEntities, selectAgent, and route with confidence scoring.
 */

import { getLLMProvider } from "@/services/ai/provider";
import { CopilotIntent, ExtractedEntities, RoutingDecision } from "./types";

export class IntentRouter {
  /**
   * 1. Detect Intent category and calculate base confidence score
   */
  detectIntent(userPrompt: string): { intent: CopilotIntent; confidence: number } {
    const lower = userPrompt.toLowerCase().trim();

    if (
      lower.startsWith("go to") ||
      lower.startsWith("show ") ||
      lower.includes("navigate") ||
      lower.includes("open page") ||
      lower.includes("show pipeline")
    ) {
      return { intent: "Workspace navigation", confidence: 0.96 };
    }

    if (
      lower.includes("research") ||
      lower.includes("scrape") ||
      lower.includes("company teardown") ||
      lower.includes("find founder") ||
      lower.includes("investigate")
    ) {
      return { intent: "Research", confidence: 0.95 };
    }

    if (
      lower.includes("plan next quarter") ||
      lower.includes("operating plan") ||
      lower.includes("execution plan") ||
      lower.includes("roadmap planning")
    ) {
      return { intent: "Planning", confidence: 0.96 };
    }

    if (
      lower.includes("create campaign") ||
      lower.includes("launch campaign") ||
      lower.includes("growth campaign") ||
      lower.includes("outreach campaign") ||
      lower.includes("channel campaign")
    ) {
      return { intent: "Campaign", confidence: 0.95 };
    }

    if (
      lower.includes("generate tasks") ||
      lower.includes("create task") ||
      lower.includes("task breakdown") ||
      lower.includes("daily tasks") ||
      lower.includes("to-do") ||
      lower.includes("what should i do")
    ) {
      return { intent: "Task generation", confidence: 0.96 };
    }

    if (
      lower.includes("dashboard") ||
      lower.includes("growth score") ||
      lower.includes("workspace health") ||
      lower.includes("top opportunities") ||
      lower.includes("insights")
    ) {
      return { intent: "Dashboard insights", confidence: 0.94 };
    }

    if (
      lower.includes("kpi") ||
      lower.includes("metric explanation") ||
      lower.includes("conversion rate") ||
      lower.includes("arr target") ||
      lower.includes("explain metric")
    ) {
      return { intent: "KPI explanation", confidence: 0.93 };
    }

    if (
      lower.includes("weekly review") ||
      lower.includes("report") ||
      lower.includes("board report") ||
      lower.includes("retrospective") ||
      lower.includes("summary report")
    ) {
      return { intent: "Report generation", confidence: 0.94 };
    }

    if (
      lower.includes("strategy") ||
      lower.includes("gtm") ||
      lower.includes("playbook") ||
      lower.includes("positioning") ||
      lower.includes("value prop")
    ) {
      return { intent: "Strategy", confidence: 0.95 };
    }

    if (
      lower.includes("crm") ||
      lower.includes("lead") ||
      lower.includes("pipeline") ||
      lower.includes("deal") ||
      lower.includes("qualify")
    ) {
      return { intent: "CRM", confidence: 0.92 };
    }

    if (
      lower.includes("content") ||
      lower.includes("linkedin") ||
      lower.includes("post") ||
      lower.includes("article") ||
      lower.includes("blog")
    ) {
      return { intent: "Content", confidence: 0.94 };
    }

    if (
      lower.includes("visibility") ||
      lower.includes("chatgpt") ||
      lower.includes("perplexity") ||
      lower.includes("geo") ||
      lower.includes("citation")
    ) {
      return { intent: "Visibility", confidence: 0.93 };
    }

    if (
      lower.includes("distribution") ||
      lower.includes("sequence") ||
      lower.includes("dispatch")
    ) {
      return { intent: "Distribution", confidence: 0.91 };
    }

    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("who are you") ||
      lower.includes("help me") ||
      lower.length < 15
    ) {
      return { intent: "General chat", confidence: 0.85 };
    }

    // Default Unknown fallback
    return { intent: "Unknown", confidence: 0.5 };
  }

  /**
   * 2. Extract structured entities (companyName, domain, channel, topic, timeframe, navigationTarget, keywords)
   */
  extractEntities(userPrompt: string): ExtractedEntities {
    const entities: ExtractedEntities = { rawKeywords: [] };
    const lower = userPrompt.toLowerCase();

    // Navigation target resolution
    if (lower.includes("pipeline") || lower.includes("crm")) entities.navigationTarget = "/crm";
    else if (lower.includes("execution") || lower.includes("plan"))
      entities.navigationTarget = "/execution";
    else if (lower.includes("campaign")) entities.navigationTarget = "/campaigns";
    else if (lower.includes("research")) entities.navigationTarget = "/research";
    else if (lower.includes("task")) entities.navigationTarget = "/tasks";
    else if (lower.includes("analytics")) entities.navigationTarget = "/analytics";
    else if (lower.includes("visibility")) entities.navigationTarget = "/visibility";
    else if (lower.includes("content")) entities.navigationTarget = "/content";

    // Company Name / Domain regex extraction
    const companyMatch = userPrompt.match(
      /(?:research|for|about|company|teardown)\s+([A-Z0-9.\-\s]{2,30})/i,
    );
    if (companyMatch && companyMatch[1]) {
      const candidate = companyMatch[1].trim();
      if (!["me", "the", "a", "our", "hub", "page"].includes(candidate.toLowerCase())) {
        entities.companyName = candidate;
        if (candidate.includes(".")) {
          entities.domain = candidate;
        }
      }
    }

    // Channel extraction
    if (lower.includes("linkedin")) entities.channel = "LinkedIn";
    else if (lower.includes("email")) entities.channel = "Email";
    else if (lower.includes("medium")) entities.channel = "Medium";
    else if (lower.includes("reddit")) entities.channel = "Reddit";
    else if (lower.includes("twitter") || lower.includes("x")) entities.channel = "X";

    // Timeframe extraction
    if (lower.includes("today")) entities.timeframe = "Today";
    else if (lower.includes("this week") || lower.includes("weekly")) entities.timeframe = "Weekly";
    else if (
      lower.includes("this month") ||
      lower.includes("monthly") ||
      lower.includes("next quarter")
    )
      entities.timeframe = "Quarterly";

    // Raw keywords
    entities.rawKeywords = userPrompt.split(/\s+/).filter((w) => w.length > 3);

    return entities;
  }

  /**
   * 3. Select target Growth Agent ID based on detected intent
   */
  selectAgent(intent: CopilotIntent): string {
    switch (intent) {
      case "Research":
        return "founder-research";
      case "Strategy":
        return "growth-strategy-agent";
      case "Planning":
        return "task-planner";
      case "Campaign":
        return "distribution-planner";
      case "Task generation":
        return "task-planner";
      case "Dashboard insights":
      case "KPI explanation":
      case "Report generation":
        return "report-generator";
      case "Workspace navigation":
      case "General chat":
        return "content-strategist";
      case "CRM":
        return "crm-assistant";
      case "Content":
        return "content-strategist";
      case "Visibility":
        return "visibility-analyst";
      case "Distribution":
        return "distribution-planner";
      case "Unknown":
      default:
        return "content-strategist"; // Fallback general assistant agent
    }
  }

  /**
   * 4. Complete End-to-End Structured Routing Decision Pipeline
   */
  async route(userPrompt: string): Promise<RoutingDecision> {
    const { intent, confidence } = this.detectIntent(userPrompt);
    const entities = this.extractEntities(userPrompt);
    const agentId = this.selectAgent(intent);

    if (intent !== "Unknown") {
      return {
        intent,
        agentId,
        confidenceScore: confidence,
        entities,
        reasoning: `Pattern match successfully resolved query into intent "${intent}" with confidence ${confidence.toFixed(2)}. Selected target agent "${agentId}".`,
        isFallback: false,
      };
    }

    // If initial pattern match was Unknown, invoke LLM Provider for dynamic natural language intent resolution
    const llmPrompt = `Analyze user query and return JSON routing decision for Growth OS Copilot.
Query: "${userPrompt}"

Options for "intent":
["Research", "Strategy", "Planning", "Campaign", "Task generation", "Dashboard insights", "KPI explanation", "Report generation", "Workspace navigation", "General chat", "CRM", "Content", "Visibility", "Distribution", "Unknown"]

Return JSON:
{
  "intent": "Research",
  "confidenceScore": 0.85,
  "reasoning": "User prompt requests company investigation."
}`;

    const provider = getLLMProvider();

    try {
      const res = await provider.completeJSON<{
        intent: CopilotIntent;
        confidenceScore: number;
        reasoning: string;
      }>(llmPrompt);

      const resolvedIntent = res.intent || "Unknown";
      const resolvedAgentId = this.selectAgent(resolvedIntent);

      return {
        intent: resolvedIntent,
        agentId: resolvedAgentId,
        confidenceScore: res.confidenceScore || 0.75,
        entities,
        reasoning: res.reasoning || `LLM resolved query into intent "${resolvedIntent}".`,
        isFallback: resolvedIntent === "Unknown",
      };
    } catch {
      return {
        intent: "Unknown",
        agentId: "content-strategist",
        confidenceScore: 0.5,
        entities,
        reasoning:
          "Prompt could not be matched with high confidence. Routing to fallback general growth agent.",
        isFallback: true,
      };
    }
  }
}

export const globalIntentRouter = new IntentRouter();
