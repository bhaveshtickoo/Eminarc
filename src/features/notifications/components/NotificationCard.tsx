"use client";

import React from "react";
import {
  Search,
  FileText,
  Eye,
  ListTodo,
  Calendar,
  ClipboardList,
  Sparkles,
  Kanban,
  Clock,
  CheckCircle2,
  Archive,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItemData {
  id: string;
  type:
    | "Research Completed"
    | "Content Generated"
    | "Visibility Alert"
    | "Task Assigned"
    | "Meeting Reminder"
    | "Report Ready"
    | "AI Suggestion"
    | "CRM Activity";
  title: string;
  description: string;
  timestamp: string; // e.g. "10 mins ago"
  dateCategory: "Today" | "Yesterday" | "This Week";
  groupCategory: "System" | "AI" | "CRM";
  priority: "High" | "Medium" | "Low";
  read: boolean;
  actionUrl: string;
  actionText: string;
}

export const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Research Completed": Search,
  "Content Generated": FileText,
  "Visibility Alert": Eye,
  "Task Assigned": ListTodo,
  "Meeting Reminder": Calendar,
  "Report Ready": ClipboardList,
  "AI Suggestion": Sparkles,
  "CRM Activity": Kanban,
};

export const priorityBadges: Record<string, string> = {
  High: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
  Medium: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Low: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
};

export interface NotificationCardProps {
  notification: NotificationItemData;
  onMarkRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onOpenAction?: (url: string, title: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
  onArchive,
  onOpenAction,
}) => {
  const Icon = typeIcons[notification.type] || Sparkles;

  return (
    <div
      className={cn(
        "group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[18px] border transition-all duration-150 gap-4 select-none",
        notification.read
          ? "bg-[#FCFAF7] border-[rgba(0,0,0,0.08)] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          : "bg-[#FFFFFF] border-[#18181B] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.04)] ring-1 ring-[#18181B]",
      )}
    >
      {/* Left Column: Icon & Content */}
      <div className="flex items-start space-x-3.5 min-w-0 flex-1">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl font-mono text-xs shrink-0 mt-0.5",
            notification.read ? "bg-[#EFEAE1] text-[#18181B]" : "bg-[#18181B] text-[#FFFFFF]",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-sans font-bold text-sm text-[#111111] leading-tight">
              {notification.title}
            </h4>

            {!notification.read && <span className="h-2 w-2 rounded-full bg-[#2D6A4F] shrink-0" />}

            <span
              className={cn(
                "font-mono text-[8px] uppercase px-1.5 py-0.2 rounded font-bold border shrink-0",
                priorityBadges[notification.priority],
              )}
            >
              {notification.priority}
            </span>
          </div>

          <p className="font-sans text-xs text-[#52525B] leading-relaxed">
            {notification.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#716D64] pt-1">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {notification.timestamp}
            </span>
            <span>•</span>
            <span className="bg-[#EFEAE1] px-1.5 py-0.5 rounded text-[#18181B] font-bold">
              {notification.type}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Actions */}
      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto font-mono text-xs">
        {!notification.read && (
          <button
            type="button"
            onClick={() => onMarkRead?.(notification.id)}
            className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] hover:text-[#18181B] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
            title="Mark as Read"
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onArchive?.(notification.id)}
          className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] hover:text-[#18181B] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          title="Archive Notification"
        >
          <Archive className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onOpenAction?.(notification.actionUrl, notification.title)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
        >
          <span>{notification.actionText}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
