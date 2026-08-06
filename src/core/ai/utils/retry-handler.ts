/**
 * Retry & Cancellation Token Handler
 * Eminarc Growth OS AI Core
 */

export class RetryHandler {
  private activeControllers = new Map<string, AbortController>();

  /**
   * Execute an async function with exponential backoff retries for transient errors (429, 503, network drop)
   */
  async retry<T>(
    fn: (signal?: AbortSignal) => Promise<T>,
    maxRetries = 3,
    initialDelayMs = 500,
    signal?: AbortSignal,
  ): Promise<T> {
    let attempt = 0;
    let delay = initialDelayMs;

    while (attempt <= maxRetries) {
      if (signal?.aborted) {
        throw new Error("Execution cancelled by user.");
      }

      try {
        return await fn(signal);
      } catch (err: any) {
        attempt++;
        if (attempt > maxRetries || signal?.aborted) {
          throw err;
        }

        // Check if error is retryable (rate limit 429, 503, connection dropped)
        const isRateLimit = err?.message?.includes("429") || err?.message?.includes("rate");
        const isServerError = err?.message?.includes("503") || err?.message?.includes("500");

        if (!isRateLimit && !isServerError) {
          // Non-transient error, rethrow immediately
          throw err;
        }

        console.warn(
          `[RetryHandler] Retryable error encountered (attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }

    throw new Error("Max retries exceeded");
  }

  /**
   * Register a new execution cancellation controller
   */
  createController(executionId: string): AbortController {
    const controller = new AbortController();
    this.activeControllers.set(executionId, controller);
    return controller;
  }

  /**
   * Cancel an active execution by executionId
   */
  cancel(executionId: string): boolean {
    const controller = this.activeControllers.get(executionId);
    if (controller) {
      controller.abort();
      this.activeControllers.delete(executionId);
      return true;
    }
    return false;
  }

  /**
   * Cleanup finished controller
   */
  cleanup(executionId: string): void {
    this.activeControllers.delete(executionId);
  }
}

export const globalRetryHandler = new RetryHandler();
