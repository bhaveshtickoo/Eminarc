'use client';

import React, { createContext, useState } from 'react';
import { WorkspaceItem, WorkspaceGoal, WorkspaceContextType } from '../types/workspace';
import { initialWorkspaces } from '../data/workspace';

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(initialWorkspaces);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('eminarc');

  const currentWorkspace =
    workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const switchWorkspace = (workspaceId: string) => {
    setActiveWorkspaceId(workspaceId);
  };

  const updateWorkspaceGoal = (updatedGoal: Partial<WorkspaceGoal>) => {
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === activeWorkspaceId
          ? {
              ...w,
              weeklyGoal: {
                ...w.weeklyGoal,
                ...updatedGoal,
              },
            }
          : w
      )
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        availableWorkspaces: workspaces,
        switchWorkspace,
        updateWorkspaceGoal,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
