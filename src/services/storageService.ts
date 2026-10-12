import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreferences, UserProgress } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: '@kidszone_preferences',
  PROGRESS: '@kidszone_progress',
} as const;

export const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'gu',
  ageGroup: '2-4',
  soundEnabled: true,
  hasCompletedOnboarding: false,
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  stars: 0,
  earnedBadges: ['badge-welcome'],
  gameStats: {},
  lastActive: new Date().toISOString(),
};

export const storageService = {
  async getPreferences(): Promise<UserPreferences> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (data) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Failed to read preferences from storage:', e);
    }
    return DEFAULT_PREFERENCES;
  },

  async savePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const current = await this.getPreferences();
      const updated = { ...current, ...preferences };
      await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Failed to save preferences to storage:', e);
      return { ...DEFAULT_PREFERENCES, ...preferences };
    }
  },

  async getProgress(): Promise<UserProgress> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (data) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Failed to read progress from storage:', e);
    }
    return DEFAULT_PROGRESS;
  },

  async saveProgress(progress: Partial<UserProgress>): Promise<UserProgress> {
    try {
      const current = await this.getProgress();
      const updated = {
        ...current,
        ...progress,
        lastActive: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Failed to save progress to storage:', e);
      return { ...DEFAULT_PROGRESS, ...progress };
    }
  },

  async markLessonCompleted(lessonId: string): Promise<{ isFirstTime: boolean; newStars: number }> {
    try {
      const current = await this.getProgress();
      if (!current.completedLessons.includes(lessonId)) {
        const completedLessons = [...current.completedLessons, lessonId];
        const stars = current.stars + 1;
        const earnedBadges = [...current.earnedBadges];

        // Unlock badges
        if (completedLessons.length >= 1 && !earnedBadges.includes('badge-first-step')) {
          earnedBadges.push('badge-first-step');
        }
        if (completedLessons.length >= 5 && !earnedBadges.includes('badge-scholar')) {
          earnedBadges.push('badge-scholar');
        }
        if (completedLessons.length >= 10 && !earnedBadges.includes('badge-master')) {
          earnedBadges.push('badge-master');
        }

        await this.saveProgress({ completedLessons, stars, earnedBadges });
        return { isFirstTime: true, newStars: stars };
      }
      return { isFirstTime: false, newStars: current.stars };
    } catch (e) {
      console.warn('Error marking lesson complete:', e);
      return { isFirstTime: false, newStars: 0 };
    }
  },

  async recordGameScore(gameType: string, score: number): Promise<void> {
    try {
      const current = await this.getProgress();
      const existing = current.gameStats[gameType] || { highScore: 0, timesPlayed: 0 };
      const updatedStats = {
        ...current.gameStats,
        [gameType]: {
          highScore: Math.max(existing.highScore, score),
          timesPlayed: existing.timesPlayed + 1,
        },
      };
      // Award star if score > 0
      const stars = current.stars + (score > 0 ? 1 : 0);
      await this.saveProgress({ gameStats: updatedStats, stars });
    } catch (e) {
      console.warn('Error recording game score:', e);
    }
  },

  async resetAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PREFERENCES);
      await AsyncStorage.removeItem(STORAGE_KEYS.PROGRESS);
    } catch (e) {
      console.warn('Error clearing storage:', e);
    }
  },
};
