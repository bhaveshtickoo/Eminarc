/**
 * Anthropic Claude Provider Adapter
 * Eminarc Growth OS AI Core
 */

import { LLMProvider, LLMRequestOptions, LLMResponse } from "./base";

export class AnthropicProvider implements LLMProvider {
  name = "Anthropic";
  supportsStreaming = true;
  private defaultApiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl = "https://api.anthropic.com/v1") {
    this.defaultApiKey =
      apiKey ||
      (typeof process !== "undefined"
        ? process.env?.VITE_ANTHROPIC_API_KEY || process.env?.ANTHROPIC_API_KEY
        : "") ||
      "";
    this.baseUrl = baseUrl;
  }

  async complete<T = any>(
    prompt: string,
    options: LLMRequestOptions = {},
  ): Promise<LLMResponse<T>> {
    const startTime = Date.now();
    const apiKey = options.apiKey || this.defaultApiKey;
    const model = options.model || "claude-3-5-sonnet-20241022";

    if (!apiKey) {
      const latencyMs = Date.now() - startTime;
      return {
        content: `[Anthropic Offline Fallback] Analysis for ${model}`,
        data: null,
        usage: { promptTokens: 60, completionTokens: 90, totalTokens: 150 },
        model,
        providerName: this.name,
        latencyMs,
      };
    }

    const body: Record<string, any> = {
      model,
      max_tokens: options.maxTokens ?? 2000,
      temperature: options.temperature ?? 0.2,
      messages: [{ role: "user", content: prompt }],
    };

    if (options.systemPrompt) {
      body.system = options.systemPrompt;
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
      signal: options.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Anthropic API request failed (${response.status}): ${errText}`);
    }

    const payload = await response.json();
    const latencyMs = Date.now() - startTime;
    const content = payload.content?.[0]?.text || "";

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
        promptTokens: payload.usage?.input_tokens || 0,
        completionTokens: payload.usage?.output_tokens || 0,
        totalTokens: (payload.usage?.input_tokens || 0) + (payload.usage?.output_tokens || 0),
      },
      model,
      providerName: this.name,
      latencyMs,
    };
  }

  async completeStream(
    prompt: string,
    onChunk: (chunk: string) => void,
    options: LLMRequestOptions = {},
  ): Promise<LLMResponse<string>> {
    const res = await this.complete<string>(prompt, options);
    onChunk(res.content);
    return res;
  }
}
