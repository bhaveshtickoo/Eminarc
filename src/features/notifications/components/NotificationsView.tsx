"use client";

import React, { useState } from "react";
import { Bell, ShieldCheck, CheckCircle2, Archive, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { NotificationCard, NotificationItemData } from "./NotificationCard";
import { NotificationFilters } from "./NotificationFilters";

export const initialNotifications: NotificationItemData[] = [
  {
    id: "notif-1",
    type: "Research Completed",
    title: "Founder Research Completed for TrueLift.ai",
    description:
      "McKinsey 5-step research audit finished. 13 Workspace Knowledge Base entities populated.",
    timestamp: "10 mins ago",
    dateCategory: "Today",
    groupCategory: "AI",
    priority: "High",
    read: false,
    actionUrl: "/research",
    actionText: "View Report",
  },
  {
    id: "notif-2",
    type: "Visibility Alert",
    title: "ChatGPT Citation Index Spike (+14%)",
    description: "ChatGPT indexed 42 new brand mentions from Eminarc technical Medium teardowns.",
    timestamp: "45 mins ago",
    dateCategory: "Today",
    groupCategory: "AI",
    priority: "High",
    read: false,
    actionUrl: "/visibility",
    actionText: "Inspect Radar",
  },
  {
    id: "notif-3",
    type: "CRM Activity",
    title: "TrueLift.ai Advanced to Negotiation Stage",
    description:
      "Deal stage moved from Proposal to Negotiation after MSA contract review ($24,000 ARR).",
    timestamp: "2 hours ago",
    dateCategory: "Today",
    groupCategory: "CRM",
    priority: "High",
    read: false,
    actionUrl: "/crm",
    actionText: "Open CRM Board",
  },
  {
    id: "notif-4",
    type: "Content Generated",
    title: "1-Click Repurposing Complete (8 Assets)",
    description:
      "Content OS generated 8 multi-channel assets from core System Over Campaign breakdown.",
    timestamp: "Yesterday 04:30 PM",
    dateCategory: "Yesterday",
    groupCategory: "System",
    priority: "Medium",
    read: true,
    actionUrl: "/content",
    actionText: "Open Workspace",
  },
  {
    id: "notif-5",
    type: "Meeting Reminder",
    title: "Upcoming Q3 Growth Strategy Call with Revix",
    description: "Scheduled meeting tomorrow at 10:00 AM EST with Sarah Jenkins (VP Marketing).",
    timestamp: "Yesterday 02:00 PM",
    dateCategory: "Yesterday",
    groupCategory: "CRM",
    priority: "Medium",
    read: true,
    actionUrl: "/crm",
    actionText: "View Agenda",
  },
  {
    id: "notif-6",
    type: "Report Ready",
    title: "Monthly Executive Board Briefing Generated",
    description:
      "McKinsey/BCG executive consulting report for August 2026 is ready for PDF export.",
    timestamp: "Aug 01, 2026",
    dateCategory: "This Week",
    groupCategory: "System",
    priority: "Medium",
    read: true,
    actionUrl: "/reports",
    actionText: "Export Report",
  },
  {
    id: "notif-7",
    type: "AI Suggestion",
    title: "Deploy FAQ JSON-LD Schema on Product Pages",
    description:
      "AI Visibility Agent identified structured schema opportunity to increase Perplexity citations by 28%.",
    timestamp: "Jul 31, 2026",
    dateCategory: "This Week",
    groupCategory: "AI",
    priority: "Low",
    read: true,
    actionUrl: "/visibility",
    actionText: "Apply Fix",
  },
  {
    id: "notif-8",
    type: "Task Assigned",
    title: "Deliver MSA Contract Draft to TrueLift.ai",
    priority: "High",
    description: "High priority task assigned by Bhavesh Tickoo due Aug 03, 2026.",
    timestamp: "Jul 30, 2026",
    dateCategory: "This Week",
    groupCategory: "System",
    read: true,
    actionUrl: "/tasks",
    actionText: "View Task",
  },
];

export const NotificationsView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [notifications, setNotifications] = useState<NotificationItemData[]>(initialNotifications);
  const [activeDateFilter, setActiveDateFilter] = useState("All Dates");
  const [activeGroupFilter, setActiveGroupFilter] = useState("All Groups");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const navigate = useNavigate();

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    toast.success("Marked as read");
  };

  const handleArchive = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Archived notification");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleArchiveAll = () => {
    setNotifications([]);
    toast.success("All notifications archived");
  };

  const handleOpenAction = (url: string, title: string) => {
    navigate({ to: url as any });
    toast.success(`Opening ${title}`);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (unreadOnly && n.read) return false;
    if (activeDateFilter !== "All Dates" && n.dateCategory !== activeDateFilter) return false;
    if (activeGroupFilter !== "All Groups" && n.groupCategory !== activeGroupFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter((n) => n.priority === "High").length;

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Banner Header */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              NOTIFICATION CENTER / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              LIVE TELEMETRY ACTIVE
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            Executive Notification Center
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Real-time activity alerts for founder research, AI visibility, content generation, and
            CRM pipeline events.
          </p>
        </div>

        {/* Telemetry Stat Badges */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs shrink-0">
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">TOTAL NOTIFICATIONS</span>
            <strong className="text-[#18181B] text-sm">{notifications.length} Events</strong>
          </div>

          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">UNREAD EVENTS</span>
            <strong className="text-[#2D6A4F] text-sm">{unreadCount} New</strong>
          </div>

          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">HIGH PRIORITY</span>
            <strong className="text-[#7F1D1D] text-sm">{highPriorityCount} Urgent</strong>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <NotificationFilters
        activeDateFilter={activeDateFilter}
        onDateFilterChange={setActiveDateFilter}
        activeGroupFilter={activeGroupFilter}
        onGroupFilterChange={setActiveGroupFilter}
        unreadOnly={unreadOnly}
        onUnreadOnlyToggle={() => setUnreadOnly(!unreadOnly)}
        onMarkAllRead={handleMarkAllRead}
        onArchiveAll={handleArchiveAll}
      />

      {/* List of Notification Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-[#716D64] px-1">
          <span className="font-bold text-[#111111]">
            ACTIVITY ALERTS ({filteredNotifications.length})
          </span>
          <span>CLICK ACTION TO NAVIGATE TO MODULE</span>
        </div>

        <div className="space-y-2.5">
          {filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
              onArchive={handleArchive}
              onOpenAction={handleOpenAction}
            />
          ))}

          {filteredNotifications.length === 0 && (
            <div className="p-8 rounded-[18px] bg-[#FCFAF7] border border-[#E5E0D6] text-center font-mono text-xs text-[#716D64]">
              No notifications matching the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
