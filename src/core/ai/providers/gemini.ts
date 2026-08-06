/**
 * Google Gemini Provider Adapter
 * Eminarc Growth OS AI Core
 */

import { LLMProvider, LLMRequestOptions, LLMResponse } from "./base";

export class GeminiProvider implements LLMProvider {
  name = "Gemini";
  supportsStreaming = false;
  private defaultApiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl = "https://generativelanguage.googleapis.com/v1beta") {
    this.defaultApiKey =
      apiKey ||
      (typeof process !== "undefined"
        ? process.env?.VITE_GEMINI_API_KEY || process.env?.GEMINI_API_KEY
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
    const model = options.model || "gemini-1.5-pro";

    if (!apiKey) {
      const latencyMs = Date.now() - startTime;
      return {
        content: `[Gemini Offline Fallback] Analysis for ${model}`,
        data: null,
        usage: { promptTokens: 30, completionTokens: 70, totalTokens: 100 },
        model,
        providerName: this.name,
        latencyMs,
      };
    }

    const url = `${this.baseUrl}/models/${model}:generateContent?key=${apiKey}`;
    const contents = [];

    if (options.systemPrompt) {
      contents.push({
        role: "user",
        parts: [{ text: `System Instruction: ${options.systemPrompt}` }],
      });
    }
    contents.push({ role: "user", parts: [{ text: prompt }] });

    const body: Record<string, any> = { contents };
    if (options.responseFormat === "json_object") {
      body.generationConfig = { responseMimeType: "application/json" };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: options.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Google Gemini API request failed (${response.status}): ${errText}`);
    }

    const payload = await response.json();
    const latencyMs = Date.now() - startTime;
    const content = payload.candidates?.[0]?.content?.parts?.[0]?.text || "";

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
        promptTokens: payload.usageMetadata?.promptTokenCount || 0,
        completionTokens: payload.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: payload.usageMetadata?.totalTokenCount || 0,
      },
      model,
      providerName: this.name,
      latencyMs,
    };
  }
}
