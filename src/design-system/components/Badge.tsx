import React from 'react';
import { cn } from '../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'brand';
  showDot?: boolean;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  showDot = false,
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    neutral: 'bg-[#F4F4F5] text-[#52525B] border border-[#E4E4E7]',
    success: 'bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0]',
    warning: 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]',
    error: 'bg-[#FEE2E2] text-[#7F1D1D] border border-[#FCA5A5]',
    info: 'bg-[#F1F5F9] text-[#1E293B] border border-[#CBD5E1]',
    brand: 'bg-[#000000] text-[#FFFFFF] border border-transparent',
  };

  const dotColors = {
    neutral: 'bg-[#71717A]',
    success: 'bg-[#2D6A4F]',
    warning: 'bg-[#B45309]',
    error: 'bg-[#B91C1C]',
    info: 'bg-[#334155]',
    brand: 'bg-[#FFFFFF]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center font-mono font-medium rounded-full uppercase transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5 shrink-0', dotColors[variant])} />
      )}
      <span>{children}</span>
    </div>
  );
};
