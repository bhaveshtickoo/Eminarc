/**
 * OpenRouter Provider Adapter
 * Eminarc Growth OS AI Core
 */

import { LLMProvider, LLMRequestOptions, LLMResponse } from "./base";

export class OpenRouterProvider implements LLMProvider {
  name = "OpenRouter";
  supportsStreaming = true;
  private defaultApiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl = "https://openrouter.ai/api/v1") {
    this.defaultApiKey =
      apiKey ||
      (typeof process !== "undefined"
        ? process.env?.VITE_OPENROUTER_API_KEY || process.env?.OPENROUTER_API_KEY
        : "") ||
      "";
    this.baseUrl = baseUrl;
  }

  async complete<T = any>(
    prompt: string,
    options: LLMRequestOptions = {}
  ): Promise<LLMResponse<T>> {
    const startTime = Date.now();
    const apiKey = options.apiKey || this.defaultApiKey;
    const model = options.model || "anthropic/claude-3.5-sonnet";

    if (!apiKey) {
      const latencyMs = Date.now() - startTime;
      return {
        content: `[OpenRouter Offline Fallback] Analysis for ${model}`,
        data: null,
        usage: { promptTokens: 40, completionTokens: 80, totalTokens: 120 },
        model,
        providerName: this.name,
        latencyMs,
      };
    }

    const messages = [];
    if (options.systemPrompt) {
      messages.push({ role: "system", content: options.systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    const body: Record<string, any> = {
      model,
      messages,
      temperature: options.temperature ?? 0.2,
      max_tokens: options.maxTokens ?? 2500,
    };

    if (options.responseFormat === "json_object") {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://eminarc.com",
        "X-Title": "Eminarc Growth OS",
      },
      body: JSON.stringify(body),
      signal: options.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API request failed (${response.status}): ${errText}`);
    }

    const payload = await response.json();
    const latencyMs = Date.now() - startTime;
    const content = payload.choices?.[0]?.message?.content || "";

    let data: T | null = null;
    if (options.responseFormat === "json_object" && content) {
      try {
        data = JSON.parse(content) as T;
      } catch {
        data = null;
      }
    }

    return {
      content,
      data,
      usage: {
        promptTokens: payload.usage?.prompt_tokens || 0,
        completionTokens: payload.usage?.completion_tokens || 0,
        totalTokens: payload.usage?.total_tokens || 0,
      },
      model,
      providerName: this.name,
      latencyMs,
    };
  }

  async completeStream(
    prompt: string,
    onChunk: (chunk: string) => void,
    options: LLMRequestOptions = {}
  ): Promise<LLMResponse<string>> {
    const res = await this.complete<string>(prompt, options);
    onChunk(res.content);
    return res;
  }
}
