/**
 * Eminarc Growth OS - Color Tokens
 *
 * Designed for a minimal, editorial, premium, Swiss aesthetic.
 * Shared between marketing website and authenticated application.
 */

export const colors = {
  // Base Canvas & Paper Palette
  canvas: {
    base: '#F6F2EB',       // Global background warm paper color
    gridLine: 'rgba(26, 26, 26, 0.045)', // Subtle CSS grid lines
    gridLineSolid: '#E7E2D9',
  },
  
  paper: {
    white: '#FFFFFF',      // Card white paper
    subtle: '#FBF9F5',     // Elevated subtle paper
    hover: '#F7F4EE',      // Hover paper state
    active: '#EFEAE1',     // Active paper state
    selected: '#EAE4D9',   // Selected paper state
  },

  // Borders (Soft, crisp paper borders)
  border: {
    subtle: '#E5E0D6',     // Default card & input border
    medium: '#D8D2C5',     // Stronger section divider
    strong: '#18181B',     // High contrast ink border
    focus: '#18181B',      // Active input focus ring
  },

  // Ink Typography Palette
  ink: {
    primary: '#111111',    // Main headings and body
    body: '#18181B',       // Regular body text
    muted: '#716D64',      // Editorial secondary text
    faint: '#9E988D',      // Metadata, code, indices
    disabled: '#C4BFB5',   // Disabled state
    inverse: '#FFFFFF',    // White text on dark elements
  },

  // Brand Accents
  brand: {
    black: '#000000',      // Signature black pill buttons, badges
    charcoal: '#1A1A1A',
    warmAccent: '#E7E0D3',
  },

  // Status Indicators (Warm, calm, non-neon tones)
  status: {
    success: {
      text: '#1E4620',
      bg: '#EDF6F0',
      border: '#C8E4D0',
      dot: '#2D6A4F',
    },
    warning: {
      text: '#78350F',
      bg: '#FEF3C7',
      border: '#FDE68A',
      dot: '#B45309',
    },
    error: {
      text: '#7F1D1D',
      bg: '#FEE2E2',
      border: '#FCA5A5',
      dot: '#B91C1C',
    },
    info: {
      text: '#1E293B',
      bg: '#F1F5F9',
      border: '#CBD5E1',
      dot: '#334155',
    },
    neutral: {
      text: '#52525B',
      bg: '#F4F4F5',
      border: '#E4E4E7',
      dot: '#71717A',
    },
  },

  // Chart Palette (Calm neutral & muted editorial tones)
  chart: {
    primary: '#18181B',
    secondary: '#716D64',
    tertiary: '#9E988D',
    accent1: '#2D6A4F',
    accent2: '#B45309',
    accent3: '#B91C1C',
    accent4: '#4338CA',
    grid: '#E5E0D6',
  },
} as const;

export type ColorTokens = typeof colors;
