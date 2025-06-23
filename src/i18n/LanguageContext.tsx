// Importações do React para contexto e estado
import React, { createContext, useState } from 'react';

// Criação do contexto de idioma, com valor padrão (português)
export const LanguageContext = createContext({
  language: 'pt', // Idioma padrão
  setLanguage: (lang: string) => {}, // Função para trocar idioma
});

// Provider global para envolver a aplicação e fornecer o idioma atual
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para armazenar o idioma atual
  const [language, setLanguage] = useState('pt');
  return (
    // Provedor do contexto, passando idioma e função de troca
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 