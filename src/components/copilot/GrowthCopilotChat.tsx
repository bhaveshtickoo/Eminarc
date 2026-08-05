"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Send,
  Mic,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  Search,
  Target,
  FileText,
  Share2,
  Calendar,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Volume2,
} from "lucide-react";

import { useWorkspace } from "@/hooks/useWorkspace";
import { growthCopilot } from "@/core/copilot/copilot";
import { CopilotMessage } from "@/core/copilot/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const GrowthCopilotChat: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const [inputPrompt, setInputPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Hello! I am your Growth Copilot for ${currentWorkspace.name}. Ask me anything in natural language, e.g., "Research HubSpot", "Create GTM strategy", or "What should I do today?".`,
      timestamp: new Date().toISOString(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickPromptChips = [
    { label: "Research HubSpot", prompt: "Research HubSpot domain & extract founder persona", icon: Search },
    { label: "Create GTM strategy", prompt: "Create GTM strategy playbook for our workspace", icon: Target },
    { label: "Generate LinkedIn posts", prompt: "Generate 3 LinkedIn thought leadership posts", icon: FileText },
    { label: "Create email sequence", prompt: "Create cold email sequence for target leads", icon: Share2 },
    { label: "Find ICP", prompt: "Find Ideal Customer Profile & buyer personas", icon: Target },
    { label: "Show biggest opportunities", prompt: "Show biggest opportunities and quick wins", icon: Zap },
    { label: "What should I do today?", prompt: "What should I do today? Show daily sprint tasks", icon: Calendar },
  ];

  const handleSendMessage = async (promptToSend?: string) => {
    const query = (promptToSend || inputPrompt).trim();
    if (!query || isProcessing) return;

    const userMessage: CopilotMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!promptToSend) setInputPrompt("");
    setIsProcessing(true);

    try {
      const response = await growthCopilot.processMessage({
        workspaceId: currentWorkspace.id,
        userPrompt: query,
      });

      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error("Growth Copilot processing error:", err);
      toast.error("Copilot request failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleVoiceMode = async () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast.info("Voice microphone activated. Speak your request...");
      // Simulate STT speech trigger
      setTimeout(() => {
        handleSendMessage("What should I do today?");
        setIsVoiceActive(false);
      }, 2500);
    }
  };

  return (
    <Card className="rounded-[22px] border-[#E5E0D6] bg-card p-6 shadow-md flex flex-col h-[680px] max-w-4xl mx-auto select-none">
      {/* Copilot Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D6]">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-[#000000] flex items-center justify-center text-[#FFFFFF] shadow-sm">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-sans font-bold text-base text-foreground">Growth Copilot</h3>
              <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600" /> Active Agent Router
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Natural Language AI Assistant for Eminarc Growth OS</p>
          </div>
        </div>

        <Button
          onClick={toggleVoiceMode}
          variant="outline"
          className={`h-9 px-3 rounded-xl font-mono text-xs gap-1.5 ${
            isVoiceActive ? "bg-destructive text-white animate-pulse border-destructive" : "border-[#E5E0D6]"
          }`}
        >
          <Mic className="h-3.5 w-3.5" />
          <span>{isVoiceActive ? "Listening..." : "Voice Mode"}</span>
        </Button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="py-3 flex flex-wrap gap-1.5 border-b border-[#E5E0D6]/60">
        {quickPromptChips.map((chip, idx) => {
          const IconComponent = chip.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.prompt)}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary/80 text-foreground border border-[#E5E0D6] hover:bg-primary hover:text-white transition-colors cursor-pointer"
            >
              <IconComponent className="h-3 w-3" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-primary text-white" : "bg-[#000000] text-white"
              }`}
            >
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl max-w-[80%] space-y-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                  : "bg-secondary/60 text-foreground border border-[#E5E0D6] rounded-tl-none"
              }`}
            >
              {msg.agentId && (
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-primary font-bold">
                  <Sparkles className="h-3 w-3" />
                  <span>ROUTED TO: {msg.agentId.toUpperCase()}</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {msg.structuredData && (
                <div className="mt-2 pt-2 border-t border-[#E5E0D6]/60 font-mono text-[11px] space-y-1">
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Structured Response Generated
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-3 border-t border-[#E5E0D6] flex items-center gap-2"
      >
        <Input
          type="text"
          placeholder='Ask Growth Copilot, e.g., "Research HubSpot" or "What should I do today?"'
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={isProcessing}
          className="h-11 rounded-xl bg-background border-[#E5E0D6] text-xs font-sans"
        />
        <Button
          type="submit"
          disabled={isProcessing || !inputPrompt.trim()}
          className="h-11 px-5 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors cursor-pointer shadow-md shrink-0"
        >
          {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </Card>
  );
};
