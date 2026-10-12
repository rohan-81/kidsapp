import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 34,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    lineHeight: 16,
  },
  letterHuge: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 76,
  },
  letterLarge: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 52,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.3,
  },
};
