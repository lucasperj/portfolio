import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import ptQALab from './pt-qalab.json';
import enQALab from './en-qalab.json';
import esQALab from './es-qalab.json';

const qalabTranslations: Record<string, any> = { 
  pt: ptQALab, 
  en: enQALab, 
  es: esQALab 
};

export function useQALabTranslation() {
  const { language } = useContext(LanguageContext);
  
  function t(key: string): string {
    const keys = key.split('.');
    let value = qalabTranslations[language];
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    return value || key;
  }
  
  return { t };
}

// Função utilitária para traduzir fora de componentes React
export function translateQALab(key: string): string {
  // Tenta pegar o idioma do localStorage, senão usa 'pt'
  const language = localStorage.getItem('language') || 'pt';
  const keys = key.split('.');
  let value = qalabTranslations[language];
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  return value || key;
} 