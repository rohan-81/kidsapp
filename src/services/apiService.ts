import { LESSONS } from '../data/lessons';
import { LessonItem, AppLanguage, AgeGroup } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const apiService = {
  async fetchLessons(
    language?: AppLanguage,
    ageGroup?: AgeGroup,
    category?: string
  ): Promise<LessonItem[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second fast timeout

      const params = new URLSearchParams();
      if (language) params.append('language', language);
      if (ageGroup) params.append('age_group', ageGroup);
      if (category) params.append('category', category);

      const response = await fetch(`${API_BASE_URL}/lessons/?${params.toString()}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item: any) => ({
            id: String(item.id),
            categoryId: item.category,
            language: item.language,
            ageGroup: item.age_group,
            symbol: item.symbol || item.title?.charAt(0) || '★',
            title: item.title,
            subtitle: item.subtitle,
            phonetic: item.phonetic,
            exampleWord: item.example_word,
            exampleMeaning: item.example_meaning,
            audioPrompt: item.audio_prompt || item.title,
            visualColor: item.visual_color,
          }));
        }
      }
    } catch (e) {
      // Offline fallback: log minimally and return local bundled lessons
      // console.log('Offline mode: Using local bundled lessons');
    }

    // Local offline filter
    return LESSONS.filter((lesson) => {
      const matchLang = !language || lesson.language === 'all' || lesson.language === language;
      const matchAge = !ageGroup || lesson.ageGroup === 'all' || lesson.ageGroup === ageGroup;
      const matchCat = !category || lesson.categoryId === category;
      return matchLang && matchAge && matchCat;
    });
  },

  async syncProgress(progressData: any): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${API_BASE_URL}/progress/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progressData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false; // Safely fail in offline mode
    }
  },

  async syncGameResult(resultData: any): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${API_BASE_URL}/game-results/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  },
};
