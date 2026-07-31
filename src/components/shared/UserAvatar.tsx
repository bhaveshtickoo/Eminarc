import React from 'react';
import { cn } from '@/design-system/utils/cn';

export interface UserAvatarProps {
  className?: string;
  name?: string;
  role?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  className,
  name = 'Bhavesh Tickoo',
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <button
      type="button"
      className={cn(
        'group flex items-center space-x-2.5 rounded-full p-1 transition-all focus:outline-none focus:ring-1 focus:ring-[#18181B]',
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#18181B] font-mono text-xs font-semibold text-[#FFFFFF] shadow-sm">
        {initials}
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#2D6A4F] ring-2 ring-[#F6F2EB]" />
      </div>
      <span className="hidden lg:inline-block font-sans text-xs font-medium text-[#18181B] tracking-tight truncate max-w-[100px]">
        {name}
      </span>
    </button>
  );
};
