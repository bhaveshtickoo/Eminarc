import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'paper' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-medium tracking-tight rounded-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

    const variants = {
      // Signature Eminarc Black Pill Button
      primary:
        'bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-transparent',
      
      // Paper Button resting on grid
      paper:
        'bg-[#FFFFFF] text-[#18181B] border border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
      
      // Crisp Ink Outline Button
      outline:
        'bg-transparent text-[#18181B] border border-[#18181B] hover:bg-[#18181B] hover:text-[#FFFFFF]',
      
      // Minimal Ghost Button
      ghost:
        'bg-transparent text-[#18181B] hover:bg-[#EFEAE1] hover:text-[#000000]',
      
      // Destructive Warning Red Button
      destructive:
        'bg-[#B91C1C] text-[#FFFFFF] hover:bg-[#991B1B] shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3.5 text-xs gap-1.5',
      md: 'h-10 px-5 text-sm gap-2',
      lg: 'h-12 px-7 text-base gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
