/**
 * JSON Schema Validation & Parser Utilities
 * Eminarc Growth OS AI Core
 */

export class JSONSchemaValidator {
  /**
   * Safely extract and parse JSON object from model completions
   */
  static parseJSON<T>(rawContent: string): T | null {
    if (!rawContent) return null;

    try {
      return JSON.parse(rawContent) as T;
    } catch {
      // Try extracting json block markdown pattern if code fence present
      const match = rawContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match && match[1]) {
        try {
          return JSON.parse(match[1]) as T;
        } catch {
          return null;
        }
      }
      return null;
    }
  }

  /**
   * Enforce required keys on a parsed JSON object
   */
  static validateKeys<T>(data: any, requiredKeys: string[]): data is T {
    if (!data || typeof data !== "object") return false;
    return requiredKeys.every((key) => key in data && data[key] !== undefined);
  }
}
