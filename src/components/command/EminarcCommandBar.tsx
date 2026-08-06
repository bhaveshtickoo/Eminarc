"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Search,
  Sparkles,
  LayoutDashboard,
  Kanban,
  FileText,
  Eye,
  BarChart3,
  ClipboardList,
  ListTodo,
  Settings,
  Share2,
  Building2,
  Plus,
  ArrowRight,
  RefreshCw,
  Zap,
  Target,
  Pin,
  Clock,
  Command,
  X,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useTheme } from "@/components/theme/ThemeProvider";
import { growthCopilot } from "@/core/copilot/copilot";
import { FounderResearchService } from "@/services/research/founder-research-service";
import { createTask } from "@/services/tasks";
import { RecommendationEngine } from "@/core/recommendations/recommendation-engine";

export interface EminarcCommandBarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CommandItemSpec {
  id: string;
  title: string;
  description: string;
  category: "Page" | "Quick Action" | "AI Command" | "Recent";
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void | Promise<void>;
}

export const EminarcCommandBar: React.FC<EminarcCommandBarProps> = ({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}) => {
  const { currentWorkspace } = useWorkspace();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isExecutingAI, setIsExecutingAI] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [recentHistory, setRecentHistory] = useState<string[]>([]);

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (externalOnOpenChange) externalOnOpenChange(val);
    setInternalOpen(val);
    if (!val) {
      setQuery("");
      setAiResponse(null);
    }
  };

  // Load Recent History from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("eminarc_cmd_history");
      if (saved) setRecentHistory(JSON.parse(saved));
    } catch {
      // Fallback
    }
  }, []);

  const addHistory = (item: string) => {
    const updated = Array.from(new Set([item, ...recentHistory])).slice(0, 5);
    setRecentHistory(updated);
    try {
      localStorage.setItem("eminarc_cmd_history", JSON.stringify(updated));
    } catch {
      // Fallback
    }
  };

  // Global CMD + K / CTRL + K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const executeNav = (url: string, title: string) => {
    addHistory(`Navigated to ${title}`);
    navigate({ to: url as any });
    toast.success(`Navigating to ${title}`);
    setOpen(false);
  };

  // Run AI Copilot Prompt from Command Bar routed through Intent Router
  const handleRunAICopilot = async (prompt?: string) => {
    const userQuery = (prompt || query).trim();
    if (!userQuery) return;

    setIsExecutingAI(true);
    setAiResponse(null);
    addHistory(`Ran AI: "${userQuery}"`);
    toast.info(`Growth Copilot processing "${userQuery}"...`);

    try {
      const routingDecision = await globalIntentRouter.route(userQuery);

      const res = await growthCopilot.processMessage({
        workspaceId: currentWorkspace.id,
        userPrompt: userQuery,
      });

      setAiResponse(
        `[INTENT: ${routingDecision.intent} | AGENT: ${routingDecision.agentId}]\n\n${res.content}`,
      );
      toast.success(`Copilot intent resolved: ${routingDecision.intent}`);

      if (routingDecision.entities.navigationTarget) {
        setTimeout(() => {
          navigate({ to: routingDecision.entities.navigationTarget as any });
          setOpen(false);
        }, 1500);
      }
    } catch (err) {
      toast.error("AI Copilot execution failed.");
    } finally {
      setIsExecutingAI(false);
    }
  };

  // Quick Action: Research Company
  const handleResearchCompany = async () => {
    const name = prompt("Enter target Company Name:", "HubSpot");
    if (!name) return;
    const website = prompt(
      "Enter Company Website:",
      `https://${name.toLowerCase().replace(/\s+/g, "")}.com`,
    );
    if (!website) return;

    toast.info(`Starting research job for ${name}...`);
    try {
      const compRes = await FounderResearchService.saveCompany({
        workspace_id: currentWorkspace.id,
        name,
        website,
      });
      if (compRes.data) {
        await FounderResearchService.startResearch(currentWorkspace.id, compRes.data.id);
        toast.success(`Research job started for ${name}!`);
        setOpen(false);
        navigate({ to: "/research" as any });
      }
    } catch {
      toast.error("Failed to start research job.");
    }
  };

  // Quick Action: Create Task
  const handleCreateTask = async () => {
    const title = prompt("Enter Task Title:", "Analyze competitor pricing page");
    if (!title) return;

    try {
      await createTask(
        {
          title,
          description: "Created via Eminarc Command Bar (Cmd + K)",
          category: "Outreach",
          priority: "High",
          dueDate: new Date().toISOString().split("T")[0] || new Date().toISOString().slice(0, 10),
        },
        currentWorkspace.id,
      );
      toast.success(`Task "${title}" created!`);
      setOpen(false);
      navigate({ to: "/tasks" as any });
    } catch {
      toast.error("Failed to create task.");
    }
  };

  // Quick Action: Show Recommendations
  const handleShowRecommendations = async () => {
    setIsExecutingAI(true);
    toast.info("Generating growth recommendations...");
    try {
      const engine = new RecommendationEngine();
      const recs = await engine.generateRecommendations({ workspaceId: currentWorkspace.id });
      setAiResponse(
        `🚀 HIGHEST PRIORITY ACTION: ${recs.highestPriorityAction.title}\nImpact: ${recs.highestPriorityAction.expectedImpact}\n\n💡 BIGGEST OPPORTUNITY: ${recs.biggestOpportunity.title}\nRevenue Potential: ${recs.biggestOpportunity.potentialRevenue}`,
      );
      toast.success("Growth directives compiled!");
    } catch {
      toast.error("Failed to generate recommendations.");
    } finally {
      setIsExecutingAI(false);
    }
  };

  const commandItems: CommandItemSpec[] = [
    // Pinned Actions
    {
      id: "pin-ai",
      title: "Run Growth Copilot AI",
      description: "Ask natural language prompt to route to specialized agents",
      category: "Quick Action",
      icon: Sparkles,
      shortcut: "↵",
      action: () => handleRunAICopilot(),
    },
    {
      id: "pin-research",
      title: "Research Company",
      description: "Run 5-step McKinsey research audit on company domain",
      category: "Quick Action",
      icon: Search,
      action: handleResearchCompany,
    },
    {
      id: "pin-[#create-task]",
      title: "Create Task Item",
      description: "Add task item directly into executive backlog in Supabase",
      category: "Quick Action",
      icon: ListTodo,
      action: handleCreateTask,
    },
    {
      id: "pin-recs",
      title: "Show Growth Recommendations",
      description: "Synthesize top opportunities, priority actions, and risks",
      category: "Quick Action",
      icon: Zap,
      action: handleShowRecommendations,
    },

    // Navigation Pages
    {
      id: "nav-overview",
      title: "Overview Dashboard",
      description: "Main executive dashboard metrics & client summary",
      category: "Page",
      icon: LayoutDashboard,
      shortcut: "⌘1",
      action: () => executeNav("/", "Overview Dashboard"),
    },
    {
      id: "nav-research",
      title: "Founder Research Agent",
      description: "Asynchronous background research wizard & reports",
      category: "Page",
      icon: Search,
      shortcut: "⌘2",
      action: () => executeNav("/research", "Founder Research"),
    },
    {
      id: "nav-crm",
      title: "Growth CRM Pipeline",
      description: "7-stage Kanban deal pipeline & lead contacts",
      category: "Page",
      icon: Kanban,
      shortcut: "⌘3",
      action: () => executeNav("/crm", "Growth CRM"),
    },
    {
      id: "nav-content-strategy",
      title: "Strategy Dashboard",
      description: "12-section Growth Playbook, ICP & 30/60/90 plans",
      category: "Page",
      icon: Target,
      shortcut: "⌘4",
      action: () => executeNav("/content/strategy", "Strategy Dashboard"),
    },
    {
      id: "nav-content",
      title: "Content OS Hub",
      description: "Multi-channel content creation workspace",
      category: "Page",
      icon: FileText,
      shortcut: "⌘5",
      action: () => executeNav("/content", "Content OS"),
    },
    {
      id: "nav-visibility",
      title: "AI Search Visibility Radar",
      description: "ChatGPT, Perplexity & Claude citation tracking",
      category: "Page",
      icon: Eye,
      action: () => executeNav("/visibility", "AI Visibility"),
    },
    {
      id: "nav-reports",
      title: "Consulting Reports",
      description: "McKinsey/BCG executive briefs & PDFexporter",
      category: "Page",
      icon: ClipboardList,
      action: () => executeNav("/reports", "Reports"),
    },
    {
      id: "nav-tasks",
      title: "Tasks Management Hub",
      description: "Backlog execution tasks linked to strategy",
      category: "Page",
      icon: ListTodo,
      action: () => executeNav("/tasks", "Tasks Hub"),
    },
    {
      id: "nav-distribution",
      title: "Distribution Queue",
      description: "Multi-channel post scheduling & outreach dispatch",
      category: "Page",
      icon: Share2,
      action: () => executeNav("/distribution", "Distribution Queue"),
    },
    {
      id: "nav-analytics",
      title: "Analytics & Telemetry",
      description: "Channel mix, conversion rates & growth metrics",
      category: "Page",
      icon: BarChart3,
      action: () => executeNav("/analytics", "Analytics"),
    },
    {
      id: "nav-settings",
      title: "Workspace Settings",
      description: "API keys, workspace configuration & billing",
      category: "Page",
      icon: Settings,
      action: () => executeNav("/settings", "Settings"),
    },
    {
      id: "action-theme-cycle",
      title: "Cycle Theme Mode",
      description: "Toggle between Light ☀, Dark 🌙, and System 🖥 theme modes",
      category: "Action",
      icon: Sun,
      shortcut: "⇧T",
      action: () => {
        const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        setTheme(nextTheme);
        toast.success(`Theme mode updated to ${nextTheme}`);
        setOpen(false);
      },
    },
    {
      id: "action-theme-light",
      title: "Switch Theme to Light Mode ☀",
      description: "Set interface theme to Light Mode",
      category: "Action",
      icon: Sun,
      action: () => {
        setTheme("light");
        toast.success("Theme set to Light ☀");
        setOpen(false);
      },
    },
    {
      id: "action-theme-dark",
      title: "Switch Theme to Dark Mode 🌙",
      description: "Set interface theme to Dark Onyx",
      category: "Action",
      icon: Moon,
      action: () => {
        setTheme("dark");
        toast.success("Theme set to Dark 🌙");
        setOpen(false);
      },
    },
    {
      id: "action-theme-system",
      title: "Switch Theme to System Match 🖥",
      description: "Sync interface theme with operating system preference",
      category: "Action",
      icon: Laptop,
      action: () => {
        setTheme("system");
        toast.success("Theme set to System 🖥");
        setOpen(false);
      },
    },
  ];

  // Filter commands by query string
  const filteredCommands = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden border-[#E5E0D6] bg-[#FCFAF7] shadow-2xl rounded-[22px]">
        <DialogTitle className="sr-only">Eminarc Command Bar</DialogTitle>
        <DialogDescription className="sr-only">
          Search everything, run AI copilot, navigate pages, create tasks, and generate growth
          strategy.
        </DialogDescription>

        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E0D6] bg-background">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <Input
            type="text"
            placeholder="Search pages, run AI Copilot, research companies, create tasks... (CMD + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim() && !isExecutingAI) {
                handleRunAICopilot();
              }
            }}
            className="border-0 bg-transparent text-sm font-sans focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-9"
          />
          {query && (
            <Button
              onClick={() => handleRunAICopilot()}
              disabled={isExecutingAI}
              className="h-8 px-3 rounded-lg font-bold text-xs bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] gap-1 shrink-0 ml-2"
            >
              {isExecutingAI ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              )}
              <span>Run AI</span>
            </Button>
          )}
        </div>

        {/* AI Response Display Card */}
        {aiResponse && (
          <div className="p-4 bg-secondary/80 border-b border-[#E5E0D6] space-y-2 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between font-mono text-[10px] text-primary font-bold">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Growth Copilot Result
              </span>
              <button
                onClick={() => setAiResponse(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">
              {aiResponse}
            </p>
          </div>
        )}

        {/* Command Items List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {/* Pinned Actions */}
          {!query && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Pin className="h-3 w-3 text-primary" /> PINNED QUICK ACTIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {commandItems.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      className="p-3 rounded-xl border border-[#E5E0D6] bg-background hover:bg-secondary text-left transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-white flex items-center justify-center text-primary shrink-0 transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs text-foreground truncate">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentHistory.length > 0 && (
            <div className="space-y-1 pt-1 border-t border-[#E5E0D6]/60">
              <span className="px-3 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3" /> RECENT HISTORY
              </span>
              <div className="space-y-0.5 pt-1">
                {recentHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 text-xs text-muted-foreground flex items-center justify-between rounded-lg hover:bg-secondary/60"
                  >
                    <span className="font-mono text-[11px] truncate">{item}</span>
                    <Badge variant="outline" className="font-mono text-[9px] py-0 px-1.5">
                      History
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Commands */}
          <div className="space-y-1 border-t border-[#E5E0D6]/60 pt-2">
            <span className="px-3 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
              {query ? `SEARCH RESULTS (${filteredCommands.length})` : "ALL NAVIGATION & COMMANDS"}
            </span>
            <div className="space-y-1 pt-1">
              {filteredCommands.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => item.action()}
                    className="w-full px-3 py-2 rounded-xl hover:bg-secondary flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="h-7 w-7 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-white flex items-center justify-center text-foreground shrink-0 transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-foreground truncate">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {item.shortcut && (
                      <kbd className="font-mono text-[10px] bg-secondary px-2 py-0.5 rounded border border-[#E5E0D6] text-muted-foreground shrink-0">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}

              {filteredCommands.length === 0 && (
                <div className="py-8 text-center space-y-2">
                  <p className="text-xs font-bold text-foreground">
                    No matching command found for &quot;{query}&quot;
                  </p>
                  <Button
                    onClick={() => handleRunAICopilot(query)}
                    disabled={isExecutingAI}
                    className="h-9 px-4 rounded-xl font-bold text-xs bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Run AI Copilot on &quot;{query}&quot;</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Command Bar Footer */}
        <div className="p-3 border-t border-[#E5E0D6] bg-background flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-[#E5E0D6] text-[10px] font-bold">
                ↵
              </kbd>{" "}
              Select / Run
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-[#E5E0D6] text-[10px] font-bold">
                ESC
              </kbd>{" "}
              Close
            </span>
          </div>
          <span className="font-bold text-primary flex items-center gap-1">
            <Command className="h-3 w-3" /> Eminarc Growth OS
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
