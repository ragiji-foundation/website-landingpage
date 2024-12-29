'use client';
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type TranslationKeys = 'search.placeholder' | 'search.noResults';
type LanguageCode = 'en' | 'hi';

type Translations = {
  [K in LanguageCode]: {
    [K in TranslationKeys]: string;
  };
};

const translations: Translations = {
  en: {
    'search.placeholder': 'Search...',
    'search.noResults': 'No results found',
  },
  hi: {
    'search.placeholder': 'खोजें...',
    'search.noResults': 'कोई परिणाम नहीं मिला',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 