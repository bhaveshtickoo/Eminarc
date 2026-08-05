/**
 * LLM Provider Abstraction Layer
 * Eminarc Growth OS
 * Pluggable architecture supporting OpenRouter, OpenAI, and custom API gateways.
 */

export interface LLMRequestOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json_object" | "text";
}

export interface LLMProvider {
  name: string;
  completeJSON<T>(prompt: string, systemPrompt?: string, options?: LLMRequestOptions): Promise<T>;
}

/**
 * OpenRouter LLM Provider Implementation
 * Supports any model routed via OpenRouter (e.g. anthropic/claude-3.5-sonnet, openai/gpt-4o)
 */
export class OpenRouterProvider implements LLMProvider {
  name = "OpenRouter";
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl = "https://openrouter.ai/api/v1") {
    this.apiKey =
      apiKey ||
      (typeof process !== "undefined" ? process.env?.VITE_OPENROUTER_API_KEY || process.env?.OPENROUTER_API_KEY : "") ||
      "";
    this.baseUrl = baseUrl;
  }

  async completeJSON<T>(
    prompt: string,
    systemPrompt = "You are an expert B2B SaaS growth analyst. Output strictly valid JSON.",
    options: LLMRequestOptions = {}
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error("OpenRouter API key is not configured.");
    }

    const model = options.model || "openai/gpt-4o-mini";
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "HTTP-Referer": "https://eminarc.com",
        "X-Title": "Eminarc Growth OS",
      },
      body: JSON.stringify({
        model,
        temperature: options.temperature ?? 0.2,
        max_tokens: options.maxTokens ?? 1500,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
    }

    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("OpenRouter returned empty completion content.");
    }

    return JSON.parse(content) as T;
  }
}

/**
 * Generic OpenAI Compatible Provider
 */
export class GenericOpenAIProvider implements LLMProvider {
  name = "GenericOpenAI";
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl = "https://api.openai.com/v1") {
    this.apiKey =
      apiKey ||
      (typeof process !== "undefined" ? process.env?.VITE_OPENAI_API_KEY || process.env?.OPENAI_API_KEY : "") ||
      "";
    this.baseUrl = baseUrl;
  }

  async completeJSON<T>(
    prompt: string,
    systemPrompt = "You are a B2B intelligence agent. Output strictly valid JSON.",
    options: LLMRequestOptions = {}
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error("OpenAI API key is not configured.");
    }

    const model = options.model || "gpt-4o-mini";
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: options.temperature ?? 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errText}`);
    }

    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content;
    return JSON.parse(content) as T;
  }
}

/**
 * Provider Resolver Factory
 * Automatically selects OpenRouter, OpenAI, or Fallback Provider based on environment configuration.
 */
export function getLLMProvider(): LLMProvider {
  const openRouterKey =
    typeof process !== "undefined"
      ? process.env?.VITE_OPENROUTER_API_KEY || process.env?.OPENROUTER_API_KEY
      : undefined;
  const openAIKey =
    typeof process !== "undefined"
      ? process.env?.VITE_OPENAI_API_KEY || process.env?.OPENAI_API_KEY
      : undefined;

  if (openRouterKey) {
    return new OpenRouterProvider(openRouterKey);
  }

  if (openAIKey) {
    return new GenericOpenAIProvider(openAIKey);
  }

  // Default OpenRouter instance (will throw descriptive error if API key missing when invoked)
  return new OpenRouterProvider();
}
