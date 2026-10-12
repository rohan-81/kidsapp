import en from './en.json';
import gu from './gu.json';
import hi from './hi.json';
import { AppLanguage } from '../types';

export const translations = {
  en,
  gu,
  hi,
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof en>;

export function getTranslation(
  lang: AppLanguage,
  path: string,
  variables?: Record<string, string | number>
): string {
  const currentDict = translations[lang] || translations.en;
  const parts = path.split('.');
  
  let current: any = currentDict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English
      let fallback: any = translations.en;
      for (const fbPart of parts) {
        if (fallback && typeof fallback === 'object' && fbPart in fallback) {
          fallback = fallback[fbPart];
        } else {
          return path;
        }
      }
      current = fallback;
      break;
    }
  }

  if (typeof current !== 'string') {
    return path;
  }

  let text = current;
  if (variables) {
    Object.keys(variables).forEach((k) => {
      text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(variables[k]));
    });
  }

  return text;
}
