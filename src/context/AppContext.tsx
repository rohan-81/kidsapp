import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AppLanguage,
  AgeGroup,
  UserPreferences,
  UserProgress,
} from '../types';
import {
  storageService,
  DEFAULT_PREFERENCES,
  DEFAULT_PROGRESS,
} from '../services/storageService';
import { getTranslation } from '../localization';
import { audioService } from '../services/audioService';

interface AppContextValue {
  language: AppLanguage;
  ageGroup: AgeGroup;
  soundEnabled: boolean;
  hasCompletedOnboarding: boolean;
  progress: UserProgress;
  isLoading: boolean;
  t: (key: string, vars?: Record<string, string | number>) => string;
  setLanguage: (lang: AppLanguage) => Promise<void>;
  setAgeGroup: (group: AgeGroup) => Promise<void>;
  toggleSound: () => Promise<void>;
  finishOnboarding: (lang: AppLanguage, age: AgeGroup) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<{ isFirstTime: boolean; newStars: number }>;
  recordScore: (gameType: string, score: number) => Promise<void>;
  speak: (text: string, langOverride?: AppLanguage) => void;
  resetAll: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [savedPrefs, savedProg] = await Promise.all([
          storageService.getPreferences(),
          storageService.getProgress(),
        ]);
        setPreferences(savedPrefs);
        setProgress(savedProg);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const t = (key: string, vars?: Record<string, string | number>): string => {
    return getTranslation(preferences.language, key, vars);
  };

  const setLanguage = async (lang: AppLanguage) => {
    const updated = await storageService.savePreferences({ language: lang });
    setPreferences(updated);
  };

  const setAgeGroup = async (group: AgeGroup) => {
    const updated = await storageService.savePreferences({ ageGroup: group });
    setPreferences(updated);
  };

  const toggleSound = async () => {
    const updated = await storageService.savePreferences({
      soundEnabled: !preferences.soundEnabled,
    });
    setPreferences(updated);
  };

  const finishOnboarding = async (lang: AppLanguage, age: AgeGroup) => {
    const updated = await storageService.savePreferences({
      language: lang,
      ageGroup: age,
      hasCompletedOnboarding: true,
    });
    setPreferences(updated);
  };

  const completeLesson = async (lessonId: string) => {
    const res = await storageService.markLessonCompleted(lessonId);
    const updatedProg = await storageService.getProgress();
    setProgress(updatedProg);
    return res;
  };

  const recordScore = async (gameType: string, score: number) => {
    await storageService.recordGameScore(gameType, score);
    const updatedProg = await storageService.getProgress();
    setProgress(updatedProg);
  };

  const speak = (text: string, langOverride?: AppLanguage) => {
    audioService.speak(text, langOverride || preferences.language, preferences.soundEnabled);
  };

  const resetAll = async () => {
    await storageService.resetAllData();
    setPreferences(DEFAULT_PREFERENCES);
    setProgress(DEFAULT_PROGRESS);
  };

  return (
    <AppContext.Provider
      value={{
        language: preferences.language,
        ageGroup: preferences.ageGroup,
        soundEnabled: preferences.soundEnabled,
        hasCompletedOnboarding: preferences.hasCompletedOnboarding,
        progress,
        isLoading,
        t,
        setLanguage,
        setAgeGroup,
        toggleSound,
        finishOnboarding,
        completeLesson,
        recordScore,
        speak,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
