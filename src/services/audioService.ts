import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { AppLanguage } from '../types';

export const audioService = {
  getLanguageLocale(lang: AppLanguage): string {
    switch (lang) {
      case 'gu':
        return 'gu-IN';
      case 'hi':
        return 'hi-IN';
      case 'en':
      default:
        return 'en-US';
    }
  },

  async speak(text: string, lang: AppLanguage = 'en', enabled: boolean = true): Promise<void> {
    if (!enabled || !text) return;

    try {
      // Check if already speaking and stop before starting new
      if (Platform.OS !== 'web') {
        const isSpeaking = await Speech.isSpeakingAsync();
        if (isSpeaking) {
          await Speech.stop();
        }
      }

      const locale = this.getLanguageLocale(lang);

      // On web fallback to window.speechSynthesis if needed
      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = locale;
        utterance.rate = 0.85; // Calm and clear for young children
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
        return;
      }

      Speech.speak(text, {
        language: locale,
        pitch: 1.05,
        rate: 0.85, // Gentle pace for children
        onError: (err) => {
          console.log('Audio speech playback info:', err);
        },
      });
    } catch (e) {
      console.log('Audio service gentle fallback:', e);
    }
  },

  async stop(): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      } else {
        await Speech.stop();
      }
    } catch (e) {
      // safe ignore
    }
  },
};
