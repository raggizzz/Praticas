import { StyleSheet } from 'react-native';

// Font sizes
export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
  '6xl': 48,
};

// Line heights
export const lineHeights = {
  xs: 16,
  sm: 18,
  md: 22,
  lg: 24,
  xl: 28,
  '2xl': 30,
  '3xl': 36,
  '4xl': 42,
  '5xl': 54,
  '6xl': 64,
};

// Font weights
export const fontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
};

// Typography styles
export const typography = StyleSheet.create({
  h1: {
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights['5xl'],
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
    fontWeight: fontWeights.bold,
  },
  h3: {
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['3xl'],
    fontWeight: fontWeights.bold,
  },
  h4: {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
    fontWeight: fontWeights.medium,
  },
  h5: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.medium,
  },
  h6: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.medium,
  },
  body1: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.normal,
  },
  body2: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.normal,
  },
  caption: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.normal,
  },
  button: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.medium,
  },
});