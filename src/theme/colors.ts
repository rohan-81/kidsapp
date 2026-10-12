export const colors = {
  background: '#FAF9F6',
  card: '#FFFFFF',
  textPrimary: '#344054',
  textSecondary: '#697586',
  mint: '#DDEFE5',
  skyBlue: '#DFEAF8',
  peach: '#F9E5D8',
  lavender: '#EAE3F5',
  yellow: '#F6EDC9',
  accent: '#729A85',
  border: '#E8E8E4',
  success: '#68B984',
  warning: '#F4B740',
  error: '#E06B6B',
  white: '#FFFFFF',
  overlay: 'rgba(52, 64, 84, 0.4)',
} as const;

export type ColorName = keyof typeof colors;
