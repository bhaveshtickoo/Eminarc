"use client";

import React from "react";
import { Bell, MessageSquare, Menu } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { Breadcrumbs } from "../workspace/Breadcrumbs";
import { SearchBar } from "../shared/SearchBar";
import { UserAvatar } from "../shared/UserAvatar";

export interface NavbarProps {
  onMenuToggle?: () => void;
  activeModule?: string;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onMenuToggle,
  activeModule = "Dashboard",
  className,
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E5E0D6] bg-[#F6F2EB]/95 px-4 sm:px-6 md:px-8 backdrop-none",
        className,
      )}
    >
      {/* Left Section: Mobile Menu Toggle & Breadcrumbs */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] text-[#18181B] shadow-sm hover:bg-[#F7F4EE]"
            aria-label="Toggle menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}
        <Breadcrumbs moduleName={activeModule} />
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <SearchBar />
      </div>

      {/* Right Section: Messages, Notifications & User Avatar */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Messages Icon Button */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] hover:text-[#18181B] transition-all"
          aria-label="Messages"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#2563EB] ring-2 ring-[#FFFFFF]" />
        </button>

        {/* Notifications Bell Button */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] hover:text-[#18181B] transition-all"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#B45309] ring-2 ring-[#FFFFFF]" />
        </button>

        <div className="h-5 w-[1px] bg-[#E5E0D6] mx-1" />

        {/* User Profile Avatar */}
        <UserAvatar name="Pratyush" />
      </div>
    </header>
  );
};
