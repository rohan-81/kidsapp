export type AppLanguage = 'gu' | 'en' | 'hi';

export type AgeGroup = '2-4' | '4-6' | '6-8';

export type CategoryId =
  | 'gu-varnamala'
  | 'gu-barakhadi'
  | 'en-alphabet'
  | 'en-phonics'
  | 'hi-varnamala'
  | 'numbers'
  | 'math'
  | 'colors-shapes'
  | 'animals'
  | 'fruits'
  | 'objects'
  | 'games';

export interface CategoryInfo {
  id: CategoryId;
  titleKey: string;
  defaultTitle: string;
  subtitle: string;
  iconName: string;
  bgColor: string;
  minAge: AgeGroup;
}

export interface LessonItem {
  id: string;
  categoryId: CategoryId;
  language: AppLanguage | 'all';
  ageGroup: AgeGroup | 'all';
  symbol: string;
  title: string;
  subtitle?: string;
  phonetic?: string;
  exampleWord?: string;
  exampleMeaning?: string;
  audioPrompt: string;
  visualColor?: string;
  illustrationType?: 'letter' | 'number' | 'shape' | 'fruit' | 'animal' | 'object' | 'math';
  countItems?: number;
}

export type GameType =
  | 'find-letter'
  | 'picture-matching'
  | 'counting'
  | 'memory-match'
  | 'missing-letter'
  | 'colors-shapes'
  | 'listen-choose';

export interface GameOption {
  id: string;
  label: string;
  visual?: string;
  color?: string;
}

export interface GameQuestion {
  id: string;
  gameType: GameType;
  prompt: string;
  audioText: string;
  displayVisual?: string;
  displayVisualColor?: string;
  countTarget?: number;
  options: GameOption[];
  correctOptionId: string;
  hint?: string;
}

export interface UserPreferences {
  language: AppLanguage;
  ageGroup: AgeGroup;
  soundEnabled: boolean;
  hasCompletedOnboarding: boolean;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  earnedAt?: string;
}

export interface UserProgress {
  completedLessons: string[];
  stars: number;
  earnedBadges: string[];
  gameStats: Record<string, { highScore: number; timesPlayed: number }>;
  lastActive: string;
}
