import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider>
        {children}
        <Toaster />
      </WorkspaceProvider>
    </QueryClientProvider>
  );
}
