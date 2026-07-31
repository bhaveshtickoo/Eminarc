'use client';

import React, { createContext, useContext, useState } from 'react';

export interface WorkspaceData {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  targetMarket: string;
  brandVoice: string;
  growthScore: number;
  aiVisibility: number;
  pipelineValue: string;
  logoLetter: string;
  status: 'Optimal' | 'Analyzing' | 'Attention Required';
}

export const demoWorkspaces: WorkspaceData[] = [
  {
    id: 'ws-eminarc',
    name: 'Eminarc',
    tagline: 'AI Growth Operating System',
    industry: 'B2B Growth Consultancy',
    targetMarket: 'USA + MENA',
    brandVoice: 'Strategic, Minimal, Founder-first',
    growthScore: 78,
    aiVisibility: 63,
    pipelineValue: '$12,400',
    logoLetter: 'e',
    status: 'Optimal',
  },
  {
    id: 'ws-acme',
    name: 'Acme Health',
    tagline: 'Digital Health & Telemedicine Platform',
    industry: 'HealthTech SaaS',
    targetMarket: 'North America',
    brandVoice: 'Authoritative, Clinical, Empathetic',
    growthScore: 64,
    aiVisibility: 52,
    pipelineValue: '$28,500',
    logoLetter: 'A',
    status: 'Attention Required',
  },
  {
    id: 'ws-alpha',
    name: 'Alpha AI',
    tagline: 'LLM Security & Inference Engine',
    industry: 'AI Infrastructure',
    targetMarket: 'Global Enterprise',
    brandVoice: 'Technical, Developer-first, Precise',
    growthScore: 89,
    aiVisibility: 81,
    pipelineValue: '$64,000',
    logoLetter: 'α',
    status: 'Optimal',
  },
];

export interface WorkspaceContextType {
  currentWorkspace: WorkspaceData;
  availableWorkspaces: WorkspaceData[];
  switchWorkspace: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workspaces] = useState<WorkspaceData[]>(demoWorkspaces);
  const [activeId, setActiveId] = useState<string>('ws-eminarc');

  const currentWorkspace =
    workspaces.find((w) => w.id === activeId) || workspaces[0];

  const switchWorkspace = (id: string) => {
    setActiveId(id);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        availableWorkspaces: workspaces,
        switchWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceContextProvider');
  }
  return context;
};
