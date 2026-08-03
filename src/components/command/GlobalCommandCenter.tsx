"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  Eye,
  Kanban,
  Bot,
  FileText,
  FolderKanban,
  Share2,
  Users,
  Target,
  Send,
  BarChart3,
  ClipboardList,
  ListTodo,
  Blocks,
  Settings,
  Building2,
  User,
  Plus,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CommandDialog } from "./CommandDialog";
import { CommandInput } from "./CommandInput";
import { CommandGroup } from "./CommandGroup";
import { CommandItem, CommandItemData } from "./CommandItem";
import { PinnedActions } from "./PinnedActions";
import { RecentSearches } from "./RecentSearches";
import { CommandFooter } from "./CommandFooter";

export interface GlobalCommandCenterProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const GlobalCommandCenter: React.FC<GlobalCommandCenterProps> = ({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (externalOnOpenChange) externalOnOpenChange(val);
    setInternalOpen(val);
  };

  // Global Cmd+K / Ctrl+K Listener
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
    navigate({ to: url as any });
    toast.success(`Navigating to ${title}`);
    setOpen(false);
    setQuery("");
  };

  const executePlaceholderAI = (title: string, desc: string) => {
    toast.info(`AI Placeholder: "${title}"`, {
      description: `${desc} (No API backend connected).`,
    });
    setOpen(false);
    setQuery("");
  };

  // Search Index covering 17 Domains & Entity Records
  const allCommands: CommandItemData[] = [
    // Pages (14)
    {
      id: "p-overview",
      title: "Overview Dashboard",
      description: "Main executive metrics & client overview",
      category: "Page",
      icon: LayoutDashboard,
      shortcut: "⌘1",
      onSelect: () => executeNav("/", "Overview Dashboard"),
    },
    {
      id: "p-research",
      title: "Founder Research Workflow",
      description: "McKinsey 5-step research wizard & consulting reports",
      category: "Page",
      icon: Search,
      shortcut: "⌘2",
      onSelect: () => executeNav("/research", "Founder Research"),
    },
    {
      id: "p-visibility",
      title: "AI Search Visibility Radar",
      description: "ChatGPT, Claude & Perplexity citation tracking",
      category: "Page",
      icon: Eye,
      shortcut: "⌘3",
      onSelect: () => executeNav("/visibility", "AI Search Visibility"),
    },
    {
      id: "p-crm",
      title: "Growth CRM & Lead Intelligence",
      description: "7-stage Kanban pipeline, contacts & company profiles",
      category: "Page",
      icon: Kanban,
      shortcut: "⌘4",
      onSelect: () => executeNav("/crm", "Growth CRM"),
    },
    {
      id: "p-agents",
      title: "AI Agent Orchestration Center",
      description: "7 autonomous AI agents & terminal execution logs",
      category: "Page",
      icon: Bot,
      shortcut: "⌘5",
      onSelect: () => executeNav("/agents", "AI Agents"),
    },
    {
      id: "p-content",
      title: "Content Operating System",
      description: "Editorial workspace, platform selector & AI assistant",
      category: "Page",
      icon: FileText,
      shortcut: "⌘6",
      onSelect: () => executeNav("/content", "Content Hub"),
    },
    {
      id: "p-content-strategy",
      title: "Content Strategy Blueprint",
      description: "Editorial mission, pillars, voice & topic roadmap",
      category: "Page",
      icon: FileText,
      onSelect: () => executeNav("/content/strategy", "Content Strategy"),
    },
    {
      id: "p-content-calendar",
      title: "Editorial Content Calendar",
      description: "Month, week & list views with drag-and-drop",
      category: "Page",
      icon: Calendar,
      onSelect: () => executeNav("/content/calendar", "Content Calendar"),
    },
    {
      id: "p-content-library",
      title: "Central Content Library",
      description: "Published, scheduled, and draft content assets",
      category: "Page",
      icon: FolderKanban,
      onSelect: () => executeNav("/content/library", "Content Library"),
    },
    {
      id: "p-distribution",
      title: "Distribution Queue",
      description: "Multi-channel social provider dispatch queue",
      category: "Page",
      icon: Share2,
      onSelect: () => executeNav("/distribution", "Distribution Queue"),
    },
    {
      id: "p-analytics",
      title: "Analytics & Telemetry",
      description: "Channel mix, conversion rates & growth charts",
      category: "Page",
      icon: BarChart3,
      onSelect: () => executeNav("/analytics", "Analytics"),
    },
    {
      id: "p-reports",
      title: "Consulting Reports",
      description: "McKinsey/BCG executive briefs & PDF exporter",
      category: "Page",
      icon: ClipboardList,
      onSelect: () => executeNav("/reports", "Reports"),
    },
    {
      id: "p-tasks",
      title: "Tasks Management Hub",
      description: "Backlog tasks linked to research & campaigns",
      category: "Page",
      icon: ListTodo,
      onSelect: () => executeNav("/tasks", "Tasks"),
    },
    {
      id: "p-settings",
      title: "Workspace Settings",
      description: "API keys, workspace configuration & billing",
      category: "Page",
      icon: Settings,
      onSelect: () => executeNav("/settings", "Settings"),
    },

    // Quick Actions (6)
    {
      id: "act-new-research",
      title: "Start New Founder Research",
      description: "Run 5-step McKinsey research audit on company domain",
      category: "Quick Action",
      icon: Plus,
      onSelect: () => executeNav("/research", "New Research"),
    },
    {
      id: "act-create-content",
      title: "Draft New Content Asset",
      description: "Open Content OS editor workspace",
      category: "Quick Action",
      icon: Plus,
      onSelect: () => executeNav("/content", "Draft Content"),
    },
    {
      id: "act-create-company",
      title: "Create Company Record",
      description: "Add new company into Growth CRM board",
      category: "Quick Action",
      icon: Building2,
      onSelect: () => executeNav("/crm", "Growth CRM"),
    },
    {
      id: "act-create-task",
      title: "Create Task Item",
      description: "Add task item to executive backlog",
      category: "Quick Action",
      icon: ListTodo,
      onSelect: () => executeNav("/tasks", "Tasks"),
    },

    // Companies & Entities (4)
    {
      id: "ent-truelift",
      title: "TrueLift.ai (Company Record)",
      description: "B2B SaaS • Active Deal $24,000 • 96% AI Qualification",
      category: "Company",
      icon: Building2,
      onSelect: () => executeNav("/crm", "TrueLift.ai Record"),
    },
    {
      id: "ent-revix",
      title: "Revix Systems (Company Record)",
      description: "B2B Infrastructure • Active Deal $18,000",
      category: "Company",
      icon: Building2,
      onSelect: () => executeNav("/crm", "Revix Systems Record"),
    },
    {
      id: "ent-senpai",
      title: "Senpai AI (Company Record)",
      description: "Won Customer • $32,000 ARR",
      category: "Company",
      icon: Building2,
      onSelect: () => executeNav("/crm", "Senpai AI Record"),
    },
    {
      id: "ent-alex",
      title: "Alex Vance (CEO, TrueLift.ai)",
      description: "Lead Contact • Negotiation Stage",
      category: "Contact",
      icon: User,
      onSelect: () => executeNav("/crm", "Alex Vance Contact"),
    },

    // Future Ready AI Placeholders (6)
    {
      id: "ai-ask",
      title: "Ask AI Workspace Assistant",
      description: "Query growth intelligence across all active knowledge base entities",
      category: "AI Action",
      icon: Sparkles,
      isAiPlaceholder: true,
      onSelect: () =>
        executePlaceholderAI("Ask AI Assistant", "Query workspace knowledge base"),
    },
    {
      id: "ai-summarize",
      title: "Summarize Active Workspace",
      description: "Generate 1-page executive summary of all 13 KB entities",
      category: "AI Action",
      icon: Sparkles,
      isAiPlaceholder: true,
      onSelect: () =>
        executePlaceholderAI("Summarize Workspace", "Generates 1-page executive summary"),
    },
    {
      id: "ai-weekly-report",
      title: "Generate Weekly Growth Report",
      description: "Trigger Weekly Review Agent to compile board briefing",
      category: "AI Action",
      icon: Sparkles,
      isAiPlaceholder: true,
      onSelect: () =>
        executePlaceholderAI("Generate Weekly Report", "Triggers Weekly Review Agent"),
    },
    {
      id: "ai-run-research",
      title: "Run Founder Research Agent",
      description: "Trigger autonomous research workflow on active workspace domain",
      category: "AI Action",
      icon: Sparkles,
      isAiPlaceholder: true,
      onSelect: () =>
        executePlaceholderAI("Run Research Agent", "Triggers Founder Research Agent"),
    },
    {
      id: "ai-run-content",
      title: "Run Content Strategist Agent",
      description: "Trigger 1-click multi-channel content repurposing pipeline",
      category: "AI Action",
      icon: Sparkles,
      isAiPlaceholder: true,
      onSelect: () =>
        executePlaceholderAI("Run Content Agent", "Triggers Content Strategist Agent"),
    },
    {
      id: "ai-run-visibility",
      title: "Run AI Visibility Audit Agent",
      description: "Perform real-time citation radar scan across ChatGPT & Perplexity",
      category: "AI Action",
      icon: Sparkles,
      isAiPlaceholder: true,
      onSelect: () =>
        executePlaceholderAI("Run Visibility Agent", "Triggers AI Visibility Audit Agent"),
    },
  ];

  // Filter commands by search query
  const filteredCommands = allCommands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.description && cmd.description.toLowerCase().includes(q))
    );
  });

  // Keyboard Navigation (Arrow Keys & Enter)
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1,
        );
      } else if (e.key === "Enter" && filteredCommands.length > 0) {
        e.preventDefault();
        const selected = filteredCommands[activeIndex];
        if (selected) selected.onSelect();
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [isOpen, activeIndex, filteredCommands]);

  // Group commands by category
  const pagesGroup = filteredCommands.filter((c) => c.category === "Page");
  const actionsGroup = filteredCommands.filter((c) => c.category === "Quick Action");
  const entitiesGroup = filteredCommands.filter(
    (c) => c.category === "Company" || c.category === "Contact",
  );
  const aiGroup = filteredCommands.filter((c) => c.category === "AI Action");

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput
        value={query}
        onChange={(val) => {
          setQuery(val);
          setActiveIndex(0);
        }}
        onClear={() => setQuery("")}
      />

      {!query && (
        <>
          <PinnedActions onExecute={() => setOpen(false)} />
          <RecentSearches onExecute={() => setOpen(false)} />
        </>
      )}

      {/* Search Results / Command Groups Container */}
      <div className="max-h-[380px] overflow-y-auto px-2 py-1">
        {pagesGroup.length > 0 && (
          <CommandGroup heading="APPLICATION PAGES" count={pagesGroup.length}>
            {pagesGroup.map((item) => {
              const globalIdx = filteredCommands.findIndex((c) => c.id === item.id);
              return (
                <CommandItem
                  key={item.id}
                  item={item}
                  isActive={activeIndex === globalIdx}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </CommandGroup>
        )}

        {actionsGroup.length > 0 && (
          <CommandGroup heading="QUICK ACTIONS" count={actionsGroup.length}>
            {actionsGroup.map((item) => {
              const globalIdx = filteredCommands.findIndex((c) => c.id === item.id);
              return (
                <CommandItem
                  key={item.id}
                  item={item}
                  isActive={activeIndex === globalIdx}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </CommandGroup>
        )}

        {entitiesGroup.length > 0 && (
          <CommandGroup heading="COMPANIES & CONTACTS" count={entitiesGroup.length}>
            {entitiesGroup.map((item) => {
              const globalIdx = filteredCommands.findIndex((c) => c.id === item.id);
              return (
                <CommandItem
                  key={item.id}
                  item={item}
                  isActive={activeIndex === globalIdx}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </CommandGroup>
        )}

        {aiGroup.length > 0 && (
          <CommandGroup heading="FUTURE AI AGENT ACTIONS" count={aiGroup.length}>
            {aiGroup.map((item) => {
              const globalIdx = filteredCommands.findIndex((c) => c.id === item.id);
              return (
                <CommandItem
                  key={item.id}
                  item={item}
                  isActive={activeIndex === globalIdx}
                  onMouseEnter={() => setActiveIndex(globalIdx)}
                />
              );
            })}
          </CommandGroup>
        )}

        {filteredCommands.length === 0 && (
          <div className="p-8 text-center font-mono text-xs text-[#716D64]">
            No command or entity matches &quot;{query}&quot;.
          </div>
        )}
      </div>

      <CommandFooter />
    </CommandDialog>
  );
};
