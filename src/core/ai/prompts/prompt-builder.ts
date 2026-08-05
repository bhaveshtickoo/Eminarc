/**
 * Dynamic Prompt Template Engine
 * Eminarc Growth OS AI Core
 */

export class PromptBuilder {
  /**
   * Interpolate template variable place-holders e.g. {{companyName}}
   */
  static render(template: string, variables: Record<string, any>): string {
    let output = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      output = output.replace(regex, String(value ?? ""));
    }
    return output;
  }

  /**
   * System Prompt constructor for structured JSON output
   */
  static buildSystemPrompt(roleDescription: string): string {
    return `${roleDescription}\n\nCRITICAL DIRECTIVE: You MUST respond ONLY with valid JSON. Do not include introductory text or trailing commentary. Ensure all keys and strings are double-quoted.`;
  }
}
