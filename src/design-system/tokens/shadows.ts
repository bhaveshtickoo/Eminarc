/**
 * Eminarc Growth OS - Paper Elevation & Border Tokens
 *
 * Paper-on-grid aesthetics. No glassmorphism. No glowing neon.
 */

export const shadows = {
  none: 'none',
  
  // Paper card resting on grid
  paper: '0 1px 3px 0 rgba(0, 0, 0, 0.025), 0 1px 2px -1px rgba(0, 0, 0, 0.025)',
  
  // Subtle paper lift on hover
  paperHover: '0 4px 12px -2px rgba(26, 26, 26, 0.04), 0 2px 4px -1px rgba(26, 26, 26, 0.02)',
  
  // Elevated modal/dropdown paper
  paperElevated: '0 10px 25px -5px rgba(26, 26, 26, 0.06), 0 8px 10px -6px rgba(26, 26, 26, 0.03)',

  // Pressed/Active state
  inner: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
} as const;

export const borders = {
  none: 'none',
  subtle: '1px solid #E5E0D6',
  medium: '1px solid #D8D2C5',
  strong: '1px solid #18181B',
  dashed: '1px dashed #D8D2C5',
} as const;
