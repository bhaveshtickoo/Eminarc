/**
 * Provider Base Interfaces & Types
 * Eminarc Growth OS AI Core
 */

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd?: number;
}

export interface LLMRequestOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  responseFormat?: "json_object" | "text";
  signal?: AbortSignal;
  apiKey?: string;
  baseUrl?: string;
}

export interface LLMResponse<T = any> {
  content: string;
  data: T | null;
  usage: TokenUsage;
  model: string;
  providerName: string;
  latencyMs: number;
}

export interface LLMProvider {
  name: string;
  supportsStreaming: boolean;
  complete<T = any>(
    prompt: string,
    options?: LLMRequestOptions
  ): Promise<LLMResponse<T>>;
  completeStream?(
    prompt: string,
    onChunk: (chunk: string) => void,
    options?: LLMRequestOptions
  ): Promise<LLMResponse<string>>;
}
