import React, { createContext, useState } from 'react';

export const LanguageContext = createContext({
  language: 'pt',
  setLanguage: (lang: string) => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('pt');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 