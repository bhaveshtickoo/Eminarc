/**
 * Local LLM Provider Adapter (Ollama, LM Studio, LocalAI)
 * Eminarc Growth OS AI Core
 */

import { LLMProvider, LLMRequestOptions, LLMResponse } from "./base";

export class LocalLLMProvider implements LLMProvider {
  name = "LocalLLM";
  supportsStreaming = true;
  private baseUrl: string;

  constructor(baseUrl = "http://localhost:11434/v1") {
    this.baseUrl = baseUrl;
  }

  async complete<T = any>(
    prompt: string,
    options: LLMRequestOptions = {}
  ): Promise<LLMResponse<T>> {
    const startTime = Date.now();
    const model = options.model || "llama3.2";

    const messages = [];
    if (options.systemPrompt) {
      messages.push({ role: "system", content: options.systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages,
          temperature: options.temperature ?? 0.2,
          stream: false,
        }),
        signal: options.signal,
      });

      if (!response.ok) {
        throw new Error(`Local LLM server returned error ${response.status}`);
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
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      return {
        content: `[Local LLM Offline Fallback] Local server unreachable: ${(err as Error).message}`,
        data: null,
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        model,
        providerName: this.name,
        latencyMs,
      };
    }
  }
}
