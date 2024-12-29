'use client';
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'HOME',
      aboutUs: 'ABOUT US',
      theNeed: 'THE NEED',
      ourStory: 'OUR STORY',
      // ... add all navigation items
    },
    search: {
      placeholder: 'Search',
      noResults: 'No results found',
    },
    // Add more sections as needed
  },
  hi: {
    nav: {
      home: 'होम',
      aboutUs: 'हमारे बारे में',
      theNeed: 'आवश्यकता',
      ourStory: 'हमारी कहानी',
      // ... add all navigation items
    },
    search: {
      placeholder: 'खोजें',
      noResults: 'कोई परिणाम नहीं मिला',
    },
    // Add more sections as needed
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
    t: (key) => {
      const keys = key.split('.');
      let result = translations[language];
      for (const k of keys) {
        result = result?.[k];
      }
      return result || key;
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 