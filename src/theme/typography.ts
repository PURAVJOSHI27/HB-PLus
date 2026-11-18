import { Platform, TextStyle } from 'react-native';

const fontFamily = Platform.select({
  web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const fontMono = Platform.select({
  web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  default: 'monospace',
});

export const typography = {
  fontFamily,
  fontMono,
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 36,
  },
  weights: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
  lineHeights: {
    xs: 14,
    sm: 18,
    base: 22,
    lg: 26,
    xl: 30,
    '2xl': 36,
    '3xl': 44,
  },
} as const;

export type TypographyTokens = typeof typography;
