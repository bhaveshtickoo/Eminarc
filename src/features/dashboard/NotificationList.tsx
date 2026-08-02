import React from "react";
import { Bell, Eye, SearchCode, CalendarCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  category: string;
  time: string;
  icon: React.ReactNode;
  variant: "success" | "info" | "warning" | "neutral";
}

export const notificationsData: NotificationItem[] = [
  {
    id: "n-1",
    title: "AI Audit Completed",
    category: "AI SCANNER",
    time: "12m ago",
    icon: <Eye className="h-3.5 w-3.5" />,
    variant: "success",
  },
  {
    id: "n-2",
    title: "New Research Report Ready",
    category: "RESEARCH",
    time: "1h ago",
    icon: <SearchCode className="h-3.5 w-3.5" />,
    variant: "info",
  },
  {
    id: "n-3",
    title: "2 CRM Tasks Due",
    category: "PIPELINE",
    time: "3h ago",
    icon: <Clock className="h-3.5 w-3.5" />,
    variant: "warning",
  },
  {
    id: "n-4",
    title: "Weekly Review Tomorrow",
    category: "SYSTEM",
    time: "Scheduled",
    icon: <CalendarCheck className="h-3.5 w-3.5" />,
    variant: "neutral",
  },
];

export const NotificationList: React.FC = () => {
  const badgeStyles = {
    success: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
    info: "bg-[#F1F5F9] text-[#1E293B] border-[#CBD5E1]",
    warning: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
    neutral: "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]",
  };

  return (
    <div className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              FEED / ALERTS
            </span>
          </div>
          <h3 className="font-sans text-base font-semibold tracking-tight text-[#111111] mt-1">
            System Notifications
          </h3>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EFEAE1] text-[#18181B]">
          <Bell className="h-4 w-4" />
        </div>
      </div>

      {/* Notification Items */}
      <div className="space-y-2.5 flex-1">
        {notificationsData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 transition-all hover:bg-[#FBF9F5] hover:border-[#D8D2C5]"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg border shrink-0",
                  badgeStyles[item.variant],
                )}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="font-sans text-xs font-semibold text-[#18181B] truncate">
                  {item.title}
                </p>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64]">
                  {item.category}
                </span>
              </div>
            </div>

            <span className="font-mono text-[10px] text-[#716D64] shrink-0 ml-2">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
