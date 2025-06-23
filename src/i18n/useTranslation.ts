import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import pt from './pt.json';
import en from './en.json';
import es from './es.json';

const translations: Record<string, any> = { pt, en, es };

export function useTranslation() {
  const { language } = useContext(LanguageContext);
  function t(key: string): string {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    return value || key;
  }
  return { t };
} 