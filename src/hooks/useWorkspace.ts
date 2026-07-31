'use client';

import { useContext } from 'react';
import { WorkspaceContext } from '../context/WorkspaceContext';
import { WorkspaceContextType } from '../types/workspace';

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
