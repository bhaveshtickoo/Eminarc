import React from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'paper' | 'subtle' | 'outline' | 'flat';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'paper', hoverable = false, children, ...props }, ref) => {
    const variants = {
      // Crisp white paper sheet placed on grid
      paper:
        'bg-[#FFFFFF] text-[#18181B] border border-[#E5E0D6] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]',
      
      // Warm subtle paper card
      subtle:
        'bg-[#FBF9F5] text-[#18181B] border border-[#E5E0D6] shadow-[0_1px_2px_0_rgba(0,0,0,0.015)]',
      
      // Crisp stroke outline card (transparent paper)
      outline:
        'bg-transparent text-[#18181B] border border-[#E5E0D6]',
      
      // Flat card without border or shadow
      flat:
        'bg-[#FFFFFF] text-[#18181B]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-200 ease-out overflow-hidden',
          variants[variant],
          hoverable &&
            'hover:-translate-y-[1px] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)] hover:border-[#D8D2C5]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 md:p-7 pb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { editorialItalic?: string }
>(({ className, editorialItalic, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-sans text-xl md:text-2xl font-semibold tracking-tight text-[#111111]',
      className
        )}
        {...props}
      >
        {children}
        {editorialItalic && (
          <span className="font-serif italic font-normal ml-1.5 text-[#111111]">
            {editorialItalic}
          </span>
        )}
  </h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('font-sans text-sm text-[#716D64] leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 md:p-7 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center p-6 md:p-7 pt-0 border-t border-[#E5E0D6]/50 mt-4',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
