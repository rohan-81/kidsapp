import { CATEGORIES } from '../src/data/categories';
import { LESSONS } from '../src/data/lessons';
import { GAME_QUESTIONS } from '../src/data/gamesData';
import { getTranslation } from '../src/localization';

describe('KidsZone Educational Content & Data Tests', () => {
  test('should have 12 categories defined', () => {
    expect(CATEGORIES.length).toBe(12);
  });

  test('should have valid titles and themes for all categories', () => {
    CATEGORIES.forEach((cat) => {
      expect(cat.id).toBeDefined();
      expect(cat.defaultTitle).toBeTruthy();
      expect(cat.bgColor).toBeTruthy();
    });
  });

  test('should contain authentic Gujarati, English, and Hindi lessons', () => {
    const guLessons = LESSONS.filter((l) => l.language === 'gu');
    const enLessons = LESSONS.filter((l) => l.language === 'en');
    const hiLessons = LESSONS.filter((l) => l.language === 'hi');

    expect(guLessons.length).toBeGreaterThan(0);
    expect(enLessons.length).toBeGreaterThan(0);
    expect(hiLessons.length).toBeGreaterThan(0);

    // Verify Gujarati swar and vyanjan presence
    const ka = guLessons.find((l) => l.symbol === 'ક');
    expect(ka).toBeDefined();
    expect(ka?.exampleWord).toBe('કમળ');

    // Verify English letter A
    const a = enLessons.find((l) => l.symbol === 'A');
    expect(a).toBeDefined();
    expect(a?.exampleWord).toBe('Apple');

    // Verify Hindi swar
    const anar = hiLessons.find((l) => l.symbol === 'अ');
    expect(anar).toBeDefined();
    expect(anar?.exampleWord).toBe('अनार');
  });

  test('should provide valid questions for all 7 game modes', () => {
    const gameTypes = [
      'find-letter',
      'picture-matching',
      'counting',
      'memory-match',
      'missing-letter',
      'colors-shapes',
      'listen-choose',
    ] as const;

    gameTypes.forEach((type) => {
      expect(GAME_QUESTIONS[type]).toBeDefined();
      expect(GAME_QUESTIONS[type].en.length).toBeGreaterThan(0);
    });
  });

  test('localization helper resolves Gujarati, Hindi, and English correctly', () => {
    expect(getTranslation('en', 'appName')).toBe('KidsZone');
    expect(getTranslation('gu', 'appName')).toBe('KidsZone');
    expect(getTranslation('hi', 'appName')).toBe('KidsZone');

    expect(getTranslation('gu', 'tagline')).toBe('શીખો, રમો અને આગળ વધો');
    expect(getTranslation('hi', 'tagline')).toBe('सीखें, खेलें और आगे बढ़ें');
    expect(getTranslation('en', 'tagline')).toBe('Learn, Play & Grow');
  });
});
