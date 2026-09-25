import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';
import { translations, Translations } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('osteosense_lang');
    if (saved && (['en', 'hi', 'as', 'bn', 'mni'] as LanguageCode[]).includes(saved as LanguageCode)) {
      return saved as LanguageCode;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('osteosense_lang', lang);
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, currentLanguage: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
