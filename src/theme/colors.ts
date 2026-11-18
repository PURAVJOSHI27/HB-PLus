export const colors = {
  // Deep Navy background hierarchy
  background: '#070B14',
  backgroundElevated: '#0D1527',
  surface: '#111B33',
  surfaceHover: '#162342',
  surfaceActive: '#1A2A4F',

  // Borders & Dividers
  borderSubtle: '#192642',
  borderStrong: '#25385E',
  borderFocus: '#38BDF8',

  // Typography
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#070B14',

  // Brand & Accents
  primary: '#38BDF8',        // Electric cyan/sky accent
  primaryHover: '#0EA5E9',
  primaryGlow: 'rgba(56, 189, 248, 0.15)',
  secondary: '#3B82F6',

  // Status & Security indicators
  success: '#10B981',        // Verified domain / valid employee
  successGlow: 'rgba(16, 185, 129, 0.15)',
  danger: '#EF4444',         // Access Denied / Invalid Domain
  dangerGlow: 'rgba(239, 68, 68, 0.15)',
  warning: '#F59E0B',
  warningGlow: 'rgba(245, 158, 11, 0.15)',

  // Overlays
  overlay: 'rgba(7, 11, 20, 0.85)',
} as const;

export type ColorTokens = typeof colors;
