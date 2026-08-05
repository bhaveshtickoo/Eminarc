/**
 * Agent Conversation & Context Memory Store
 * Eminarc Growth OS AI Core
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: string;
}

export class MemoryStore {
  private sessions = new Map<string, ChatMessage[]>();

  addMessage(sessionId: string, message: Omit<ChatMessage, "timestamp">): void {
    const list = this.sessions.get(sessionId) || [];
    list.push({
      ...message,
      timestamp: new Date().toISOString(),
    });
    this.sessions.set(sessionId, list);
  }

  getHistory(sessionId: string): ChatMessage[] {
    return this.sessions.get(sessionId) || [];
  }

  clear(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}

export const globalMemoryStore = new MemoryStore();
