import React from 'react';
import { cn } from '../utils/cn';

// Eminarc Logo Badge Primitive
export interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  subtitle?: string; // e.g. "Growth OS"
}

export const Logo: React.FC<LogoProps> = ({
  className,
  showWordmark = true,
  subtitle,
}) => {
  return (
    <div className={cn('inline-flex items-center space-x-3', className)}>
      {/* Icon Badge: Black rounded rectangle with white styled lowercase 'e' */}
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shadow-sm shrink-0">
        <span className="font-serif italic font-bold text-xl leading-none tracking-tight">
          e
        </span>
      </div>
      {showWordmark && (
        <div className="flex items-baseline space-x-2">
          <span className="font-sans font-bold text-lg md:text-xl tracking-tight text-[#111111]">
            Eminarc
          </span>
          {subtitle && (
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#716D64]">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Navbar Primitive (Header shared across marketing and application)
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoSubtitle?: string;
  actions?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  logoSubtitle,
  actions,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full border-b border-[#E5E0D6] bg-[#F6F2EB]/90 backdrop-none transition-colors',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo subtitle={logoSubtitle} />
        {children && (
          <nav className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium text-[#716D64]">
            {children}
          </nav>
        )}
        {actions && <div className="flex items-center space-x-3">{actions}</div>}
      </div>
    </header>
  );
};

// NavLink Primitive
export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  className,
  active,
  children,
  ...props
}) => {
  return (
    <a
      className={cn(
        'font-sans text-sm tracking-tight transition-colors duration-150',
        active
          ? 'font-semibold text-[#111111]'
          : 'text-[#716D64] hover:text-[#111111]',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};

// Sidebar Layout Primitive (Authenticated Application Container)
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  header,
  footer,
  children,
  ...props
}) => {
  return (
    <aside
      className={cn(
        'flex h-screen w-64 flex-col border-r border-[#E5E0D6] bg-[#FBF9F5] p-5 shrink-0',
        className
      )}
      {...props}
    >
      {header && <div className="mb-6 px-2">{header}</div>}
      <nav className="flex-1 space-y-1.5 overflow-y-auto">{children}</nav>
      {footer && <div className="mt-auto border-t border-[#E5E0D6] pt-4 px-2">{footer}</div>}
    </aside>
  );
};

// SidebarItem Primitive
export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  className,
  active,
  icon,
  badge,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group flex items-center justify-between rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium tracking-tight transition-all duration-150 cursor-pointer select-none',
        active
          ? 'bg-[#000000] text-[#FFFFFF] shadow-sm font-semibold'
          : 'text-[#716D64] hover:bg-[#F0EBE1] hover:text-[#111111]',
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <span
            className={cn(
              'shrink-0 transition-colors',
              active ? 'text-[#FFFFFF]' : 'text-[#716D64] group-hover:text-[#111111]'
            )}
          >
            {icon}
          </span>
        )}
        <span>{children}</span>
      </div>
      {badge && <div>{badge}</div>}
    </div>
  );
};
