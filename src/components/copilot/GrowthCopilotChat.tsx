"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  Copy,
  Check,
  StopCircle,
  History,
  RotateCcw,
  Code2,
  ExternalLink,
  Layers,
  Cpu,
  BarChart3,
  Rocket,
  Kanban,
} from "lucide-react";

import { useWorkspace } from "@/hooks/useWorkspace";
import { growthCopilot } from "@/core/copilot/copilot";
import { CopilotMessage, CopilotSession } from "@/core/copilot/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const GrowthCopilotChat: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const [inputPrompt, setInputPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [useStreaming, setUseStreaming] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string>("openrouter");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>(`session-${Date.now()}`);
  const [recentSessions, setRecentSessions] = useState<CopilotSession[]>([]);

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Hello! I am your Growth Copilot for **${currentWorkspace.name}**.\n\nAsk me anything in natural language:\n- *"Research HubSpot"* — Company teardown & founder persona\n- *"Create campaign"* — 8-channel growth campaign\n- *"Generate weekly review"* — Board retrospective\n- *"Plan next quarter"* — 30/60/90 day execution roadmap\n- *"Show pipeline"* — Growth CRM deal health\n- *"Generate tasks"* — Daily sprint task breakdown`,
      timestamp: new Date().toISOString(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<boolean>(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  // Load Session History
  useEffect(() => {
    loadSessions();
  }, [currentWorkspace.id]);

  const loadSessions = async () => {
    try {
      const sessions = await growthCopilot.getSessions(currentWorkspace.id);
      setRecentSessions(sessions);
    } catch (err) {
      console.warn("Failed to load sessions:", err);
    }
  };

  const quickPromptChips = [
    {
      label: "Research HubSpot",
      prompt: "Research HubSpot domain & extract founder persona",
      icon: Search,
    },
    {
      label: "Create campaign",
      prompt: "Create campaign for LinkedIn and Email outreach",
      icon: Zap,
    },
    {
      label: "Generate weekly review",
      prompt: "Generate weekly review & executive retrospective",
      icon: BarChart3,
    },
    {
      label: "Plan next quarter",
      prompt: "Plan next quarter 30/60/90 day execution roadmap",
      icon: Rocket,
    },
    {
      label: "Show pipeline",
      prompt: "Show pipeline deals and qualified leads in CRM",
      icon: Kanban,
    },
    { label: "Generate tasks", prompt: "Generate tasks for today's growth sprint", icon: Calendar },
  ];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    toast.success("Code block copied!");
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const stopGeneration = () => {
    abortControllerRef.current = true;
    setIsProcessing(false);
    toast.info("Generation stopped.");
  };

  const handleSendMessage = async (promptToSend?: string) => {
    const query = (promptToSend || inputPrompt).trim();
    if (!query || isProcessing) return;

    abortControllerRef.current = false;
    const userMessageId = `usr-${Date.now()}`;
    const userMessage: CopilotMessage = {
      id: userMessageId,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!promptToSend) setInputPrompt("");
    setIsProcessing(true);

    if (useStreaming) {
      // Streaming Response Flow
      const streamMessageId = `msg-ast-stream-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: streamMessageId,
          role: "assistant",
          content: "",
          isStreaming: true,
          timestamp: new Date().toISOString(),
        },
      ]);

      let accumulatedContent = "";
      try {
        const resultMessage = await growthCopilot.processMessageStreaming(
          {
            workspaceId: currentWorkspace.id,
            sessionId,
            userPrompt: query,
            providerName: selectedProvider,
          },
          (chunk: string) => {
            if (abortControllerRef.current) return;
            accumulatedContent += chunk;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === streamMessageId ? { ...m, content: accumulatedContent } : m,
              ),
            );
          },
        );

        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamMessageId
              ? {
                  ...m,
                  ...resultMessage,
                  content: accumulatedContent || resultMessage.content,
                  isStreaming: false,
                }
              : m,
          ),
        );
      } catch (err) {
        console.error("Streaming error:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamMessageId
              ? {
                  ...m,
                  content: `Failed to complete request. Please try again or switch AI Provider.`,
                  isError: true,
                  isStreaming: false,
                }
              : m,
          ),
        );
        toast.error("Copilot request failed.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Non-Streaming Response Flow
      try {
        const response = await growthCopilot.processMessage({
          workspaceId: currentWorkspace.id,
          sessionId,
          userPrompt: query,
          providerName: selectedProvider,
        });

        setMessages((prev) => [...prev, response]);
      } catch (err) {
        console.error("Processing error:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-err-${Date.now()}`,
            role: "assistant",
            content: "Copilot request failed. Please check network connectivity or try again.",
            isError: true,
            timestamp: new Date().toISOString(),
          },
        ]);
        toast.error("Copilot request failed.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleRetry = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const toggleVoiceMode = async () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast.info("Voice microphone activated. Speak your request...");
      setTimeout(() => {
        handleSendMessage("What should I do today?");
        setIsVoiceActive(false);
      }, 2500);
    }
  };

  return (
    <Card className="rounded-[22px] border-[#E5E0D6] bg-card p-6 shadow-md flex flex-col h-[720px] max-w-4xl mx-auto select-none relative">
      {/* Copilot Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E0D6]">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-[#000000] flex items-center justify-center text-[#FFFFFF] shadow-sm">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-sans font-bold text-base text-foreground">Growth Copilot</h3>
              <Badge
                variant="outline"
                className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              >
                <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600" /> Intent Router Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Natural Language AI Orchestrator for {currentWorkspace.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Provider Selector */}
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="h-9 w-[130px] rounded-xl text-xs font-mono border-[#E5E0D6]">
              <Cpu className="h-3.5 w-3.5 mr-1 text-primary" />
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openrouter" className="text-xs font-mono">
                OpenRouter
              </SelectItem>
              <SelectItem value="openai" className="text-xs font-mono">
                OpenAI
              </SelectItem>
              <SelectItem value="gemini" className="text-xs font-mono">
                Gemini
              </SelectItem>
              <SelectItem value="anthropic" className="text-xs font-mono">
                Anthropic
              </SelectItem>
              <SelectItem value="local" className="text-xs font-mono">
                Local LLM
              </SelectItem>
            </SelectContent>
          </Select>

          {/* History Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 rounded-xl font-mono text-xs gap-1.5 border-[#E5E0D6]"
              >
                <History className="h-3.5 w-3.5" />
                <span>History</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-display text-lg font-bold">Copilot Sessions</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-2">
                {recentSessions.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No previous saved sessions found.</p>
                ) : (
                  recentSessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSessionId(s.id);
                        if (s.messages && s.messages.length > 0) {
                          setMessages(s.messages);
                        }
                        toast.success(`Loaded session ${s.id.slice(-6)}`);
                      }}
                      className="p-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors space-y-1"
                    >
                      <div className="text-xs font-bold text-foreground truncate">
                        {s.title || s.id}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground">
                        {new Date(s.createdAt).toLocaleDateString()} • {s.messages?.length || 0}{" "}
                        messages
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Voice Mode */}
          <Button
            onClick={toggleVoiceMode}
            variant="outline"
            className={`h-9 px-3 rounded-xl font-mono text-xs gap-1.5 ${
              isVoiceActive
                ? "bg-destructive text-white animate-pulse border-destructive"
                : "border-[#E5E0D6]"
            }`}
          >
            <Mic className="h-3.5 w-3.5" />
            <span>{isVoiceActive ? "Listening..." : "Voice"}</span>
          </Button>
        </div>
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
              className={`p-4 rounded-2xl max-w-[85%] space-y-2 text-xs leading-relaxed relative group ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                  : msg.isError
                    ? "bg-destructive/10 text-destructive border border-destructive/30 rounded-tl-none"
                    : "bg-secondary/60 text-foreground border border-[#E5E0D6] rounded-tl-none"
              }`}
            >
              {/* Action Toolbar on Hover */}
              {msg.role === "assistant" && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-background/80 backdrop-blur-sm p-1 rounded-lg border border-border shadow-xs">
                  <button
                    onClick={() => handleCopyText(msg.content, msg.id)}
                    className="p-1 hover:text-primary transition-colors cursor-pointer"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                  {msg.isError && (
                    <button
                      onClick={() => handleRetry(msg.content)}
                      className="p-1 hover:text-primary transition-colors cursor-pointer"
                      title="Retry response"
                    >
                      <RotateCcw className="h-3 w-3 text-amber-600" />
                    </button>
                  )}
                </div>
              )}

              {/* Agent Routing Header */}
              {msg.agentId && (
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-primary font-bold">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    INTENT: {msg.intent?.toUpperCase()} • AGENT: {msg.agentId.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Message Content */}
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Code Blocks */}
              {msg.codeBlocks && msg.codeBlocks.length > 0 && (
                <div className="space-y-2 my-2">
                  {msg.codeBlocks.map((cb, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 p-3 font-mono text-[11px] relative"
                    >
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1.5 mb-1.5 border-b border-zinc-800">
                        <span className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" /> {cb.language}
                        </span>
                        <button
                          onClick={() => handleCopyCode(cb.code, `${msg.id}-${idx}`)}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {copiedCodeId === `${msg.id}-${idx}` ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          Copy
                        </button>
                      </div>
                      <pre className="overflow-x-auto whitespace-pre">{cb.code}</pre>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation Target Badge */}
              {msg.navigationTarget && (
                <div className="pt-2 border-t border-[#E5E0D6]/60">
                  <Button
                    onClick={() => {
                      navigate({ to: msg.navigationTarget as any });
                      toast.success(`Navigating to ${msg.navigationTarget}`);
                    }}
                    variant="outline"
                    className="h-7 px-2.5 rounded-lg text-[11px] font-mono gap-1.5 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Open {msg.navigationTarget}</span>
                  </Button>
                </div>
              )}

              {/* Structured Output Confirmation */}
              {msg.structuredData && (
                <div className="mt-2 pt-2 border-t border-[#E5E0D6]/60 font-mono text-[11px]">
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Intelligence Payload Processed
                  </span>
                </div>
              )}

              {/* Streaming Indicator */}
              {msg.isStreaming && (
                <div className="flex items-center gap-1 text-[11px] text-primary animate-pulse pt-1">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>Streaming growth response...</span>
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
          placeholder='Ask Growth Copilot, e.g., "Research HubSpot" or "Create campaign"'
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={isProcessing}
          className="h-11 rounded-xl bg-background border-[#E5E0D6] text-xs font-sans"
        />
        {isProcessing ? (
          <Button
            type="button"
            onClick={stopGeneration}
            variant="destructive"
            className="h-11 px-4 rounded-xl font-bold transition-colors cursor-pointer shadow-md shrink-0 gap-1.5 text-xs"
          >
            <StopCircle className="h-4 w-4" /> Stop
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!inputPrompt.trim()}
            className="h-11 px-5 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors cursor-pointer shadow-md shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </form>
    </Card>
  );
};
