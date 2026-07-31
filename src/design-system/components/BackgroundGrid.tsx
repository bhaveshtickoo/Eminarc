import React from 'react';
import { cn } from '../utils/cn';

interface BackgroundGridProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number; // Size in pixels for the square grid (default 64px)
}

/**
 * BackgroundGrid
 *
 * The unified background system for Eminarc Growth OS.
 * Fixed full-page container with base color #F6F2EB and CSS linear-gradient square grid.
 */
export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  children,
  className,
  gridSize = 64,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#F6F2EB] text-[#18181B] selection:bg-[#18181B] selection:text-[#FFFFFF]">
      {/* Fixed CSS-generated Square Grid Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-100"
        style={{
          backgroundColor: '#F6F2EB',
          backgroundImage: `
            linear-gradient(to right, rgba(26, 26, 26, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26, 26, 26, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className={cn('relative z-10 min-h-screen w-full', className)}>
        {children}
      </div>
    </div>
  );
};
