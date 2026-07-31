/**
 * Eminarc Growth OS - Typography Tokens
 *
 * Swiss Minimalist Editorial Typography System
 */

export const typography = {
  fonts: {
    sans: 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'var(--font-serif), "Instrument Serif", "Newsreader", Georgia, serif',
    mono: 'var(--font-mono), "JetBrains Mono", "Geist Mono", monospace',
  },
  
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  // Type Scale & Letter Spacing
  styles: {
    hero: 'font-sans font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] text-neutral-900',
    display: 'font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.0] text-neutral-900',
    h1: 'font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight text-neutral-900',
    h2: 'font-sans font-semibold text-xl md:text-2xl tracking-tight leading-snug text-neutral-900',
    h3: 'font-sans font-medium text-lg md:text-xl tracking-tight text-neutral-900',
    h4: 'font-sans font-medium text-base tracking-tight text-neutral-900',
    
    // Editorial Italic Accent (e.g., "a system", "growth partner")
    editorialItalic: 'font-serif italic font-normal tracking-normal text-neutral-900',
    
    // Body Text
    bodyLarge: 'font-sans text-lg leading-relaxed text-neutral-800',
    body: 'font-sans text-sm md:text-base leading-relaxed text-neutral-700',
    bodySmall: 'font-sans text-xs md:text-sm leading-normal text-neutral-600',
    
    // Metadata & Monospace Label (e.g. B2B GROWTH CONSULTANCY, INDEX / 001)
    monoLabel: 'font-mono text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500',
    monoValue: 'font-mono text-sm tracking-tight text-neutral-900',
    caption: 'font-sans text-xs text-neutral-500 tracking-normal',
  },
} as const;

export type TypographyTokens = typeof typography;
