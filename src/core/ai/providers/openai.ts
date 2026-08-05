/**
 * OpenAI Provider Adapter
 * Eminarc Growth OS AI Core
 */

import { LLMProvider, LLMRequestOptions, LLMResponse } from "./base";

export class OpenAIProvider implements LLMProvider {
  name = "OpenAI";
  supportsStreaming = true;
  private defaultApiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl = "https://api.openai.com/v1") {
    this.defaultApiKey =
      apiKey ||
      (typeof process !== "undefined"
        ? process.env?.VITE_OPENAI_API_KEY || process.env?.OPENAI_API_KEY
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
    const model = options.model || "gpt-4o-mini";

    if (!apiKey) {
      // Fallback response if no API key is set
      const latencyMs = Date.now() - startTime;
      let parsedData: any = null;
      try {
        parsedData = options.responseFormat === "json_object" ? JSON.parse(prompt) : null;
      } catch {
        parsedData = null;
      }
      return {
        content: `[OpenAI Offline Fallback] Analysis generated for model ${model}`,
        data: parsedData as T,
        usage: { promptTokens: 50, completionTokens: 100, totalTokens: 150, estimatedCostUsd: 0.0001 },
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
      max_tokens: options.maxTokens ?? 2000,
    };

    if (options.responseFormat === "json_object") {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: options.signal,
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenAI API request failed (${response.status}): ${errBody}`);
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

    const usage = {
      promptTokens: payload.usage?.prompt_tokens || 0,
      completionTokens: payload.usage?.completion_tokens || 0,
      totalTokens: payload.usage?.total_tokens || 0,
      estimatedCostUsd: ((payload.usage?.total_tokens || 0) / 1000) * 0.00015,
    };

    return {
      content,
      data,
      usage,
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
