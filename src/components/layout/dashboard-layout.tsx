import { Outlet, useRouterState, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Sparkles, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AiChatPanel } from "@/components/layout/ai-chat-panel";
import { GlobalCommandCenter } from "@/components/command/GlobalCommandCenter";
import { CommandShortcut } from "@/components/command/CommandShortcut";
import { NotificationDropdown, initialNotifications, NotificationItemData } from "@/features/notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const [chatOpen, setChatOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState<NotificationItemData[]>(initialNotifications);
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  const topNav = [
    { title: "Overview", url: "/" as const },
    { title: "Research", url: "/research" as const },
    { title: "AI Visibility", url: "/visibility" as const },
    { title: "Growth CRM", url: "/crm" as const },
    { title: "Agents Hub", url: "/agents" as const },
    { title: "Content", url: "/content" as const },
    { title: "Distribution", url: "/distribution" as const },
    { title: "Clients", url: "/clients" as const },
    { title: "Analytics", url: "/analytics" as const },
  ];

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath === path || currentPath.startsWith(`${path}/`);

  const handleMarkAllRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full select-none">
        <AppSidebar />
        <div className="flex flex-1 overflow-hidden">
          <SidebarInset className="flex flex-col">
            <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <nav className="hidden items-center gap-1 md:flex">
                {topNav.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    aria-current={isActive(item.url) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Global Command Center Trigger Button (Cmd+K) */}
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="relative ml-auto hidden sm:flex items-center space-x-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1.5 text-xs text-[#716D64] hover:border-[#18181B] hover:text-[#18181B] transition-all cursor-pointer shadow-sm w-56 justify-between"
              >
                <div className="flex items-center space-x-1.5">
                  <Search className="h-3.5 w-3.5 text-[#716D64]" />
                  <span>Search command...</span>
                </div>
                <CommandShortcut shortcut="⌘K" />
              </button>

              <Button
                variant="outline"
                size="sm"
                className={cn("ml-auto gap-2 sm:ml-2", chatOpen && "bg-primary/10 text-primary")}
                onClick={() => setChatOpen((v) => !v)}
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Ask AI</span>
              </Button>

              {/* Navbar Notification Dropdown */}
              <NotificationDropdown
                notifications={notificationsList}
                onMarkAllRead={handleMarkAllRead}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>jordan@eminarc.com</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <Outlet />
            </main>
          </SidebarInset>

          {chatOpen && (
            <aside className="hidden w-80 shrink-0 border-l lg:block xl:w-96">
              <AiChatPanel onClose={() => setChatOpen(false)} />
            </aside>
          )}
        </div>
      </div>

      {/* Mount Global Command Center */}
      <GlobalCommandCenter open={commandOpen} onOpenChange={setCommandOpen} />
    </SidebarProvider>
  );
}
