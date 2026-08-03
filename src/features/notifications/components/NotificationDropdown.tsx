"use client";

import React, { useState } from "react";
import { Bell, Check, ExternalLink, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { NotificationItemData, typeIcons } from "./NotificationCard";

export interface NotificationDropdownProps {
  notifications: NotificationItemData[];
  onMarkAllRead: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAllRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const recentNotifications = notifications.slice(0, 4);

  const handleOpenNotification = (n: NotificationItemData) => {
    setIsOpen(false);
    navigate({ to: n.actionUrl as any });
    toast.success(`Opening ${n.title}`);
  };

  return (
    <div className="relative select-none">
      {/* Navbar Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-transparent hover:border-[#E5E0D6] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
        aria-label="Open Notifications"
      >
        <Bell className="h-4 w-4 text-[#18181B]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2D6A4F] text-[9px] font-mono font-bold text-[#FFFFFF] ring-2 ring-[#FFFFFF]">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu Window */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.12)] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.15)] p-4 space-y-3 animate-in fade-in-0 zoom-in-95 duration-150">
            {/* Dropdown Header */}
            <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-2.5 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-[#111111]">NOTIFICATIONS</span>
                {unreadCount > 0 && (
                  <span className="bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded-full text-[9px] font-bold border border-[#C8E4D0]">
                    {unreadCount} NEW
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onMarkAllRead();
                    toast.success("All notifications marked as read");
                  }}
                  className="text-[10px] text-[#2D6A4F] font-bold hover:underline cursor-pointer"
                >
                  Mark All Read
                </button>
              )}
            </div>

            {/* Notification Preview Items */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {recentNotifications.map((n) => {
                const Icon = typeIcons[n.type] || Sparkles;

                return (
                  <div
                    key={n.id}
                    onClick={() => handleOpenNotification(n)}
                    className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1 hover:border-[#18181B] transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <Icon className="h-3 w-3 text-[#18181B] shrink-0" />
                        <span className="font-bold text-[#111111] truncate">{n.title}</span>
                      </div>
                      <span className="text-[#716D64] shrink-0">{n.timestamp}</span>
                    </div>

                    <p className="font-sans text-[11px] text-[#716D64] line-clamp-1 leading-snug">
                      {n.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Dropdown Footer Link */}
            <div className="pt-2 border-t border-[rgba(0,0,0,0.06)] text-center font-mono text-xs">
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center space-x-1 text-[#18181B] font-bold hover:underline"
              >
                <span>View All Notifications ({notifications.length})</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
