'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { enDictionary } from '@/dictionaries/en';
import { hiDictionary } from '@/dictionaries/hi';

type LanguageCode = 'en' | 'hi';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isLoading: boolean;
  dictionary: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Base translations for immediate use before full dictionary loads
export const translations = {
  en: {
    nav: {
      home: 'HOME',
      aboutUs: 'ABOUT US',
      theNeed: 'THE NEED',
      ourStory: 'OUR STORY',
    },
    search: {
      placeholder: 'Search',
      noResults: 'No results found',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      aboutUs: 'हमारे बारे में',
      theNeed: 'आवश्यकता',
      ourStory: 'हमारी कहानी',
    },
    search: {
      placeholder: 'खोजें',
      noResults: 'कोई परिणाम नहीं मिला',
    },
  },
} as const;

// Type-safe helper function to navigate nested objects
const getNestedValue = (obj: Record<string, any>, keys: string[]): any => {
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }
  return current;
};

// Initialize with full dictionaries when available
const staticDictionaries = {
  en: enDictionary || translations.en,
  hi: hiDictionary || translations.hi
};

export function LanguageProvider({ children, initialLocale = 'en' }: { children: React.ReactNode, initialLocale?: string }) {
  const [language, setLanguage] = useState<LanguageCode>((initialLocale as LanguageCode) || 'en');
  const [isLoading, setIsLoading] = useState(false);
  const [dictionary, setDictionary] = useState<Record<string, any>>(
    language === 'hi' ? staticDictionaries.hi : staticDictionaries.en
  );
  
  const router = useRouter();
  const pathname = usePathname();

  // Load dictionary when language changes
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setIsLoading(true);
        const dict = await getDictionary(language);
        setDictionary(dict);
        console.log(`Dictionary loaded for language: ${language}`);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        // Fallback to static dictionary
        setDictionary(language === 'hi' ? staticDictionaries.hi : staticDictionaries.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, [language]);

  // Sync language with URL pathname when component mounts or pathname changes
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/');
      const currentLocale = segments[1];
      
      if (['en', 'hi'].includes(currentLocale) && currentLocale !== language) {
        console.log(`Syncing language from URL: ${currentLocale}`);
        setLanguage(currentLocale as LanguageCode);
      }
    }
  }, [pathname, language]);

  const handleSetLanguage = (lang: LanguageCode) => {
    console.log(`Setting language to: ${lang}`);
    setLanguage(lang);
    
    // Trigger re-fetch of data for all stores with new locale
    if (typeof window !== 'undefined') {
      // Force refresh of store data with new locale
      window.dispatchEvent(new CustomEvent('locale-changed', { detail: { locale: lang } }));
    }
    
    // Don't navigate here - let the component handle navigation
    // This prevents double navigation issues
  };

  // Translation function with improved error handling and type safety
  const t = (key: string): string => {
    if (!key || typeof key !== 'string') return '';
    
    try {
      const keys = key.split('.');
      
      // First try to get from main dictionary
      let result = getNestedValue(dictionary, keys);
      
      if (result === undefined) {
        // Try fallback to basic translations if not found in dictionary
        const fallbackDictionary = translations[language];
        result = getNestedValue(fallbackDictionary, keys);
      }
      
      // Return the found string or the key as fallback
      return typeof result === 'string' ? result : key;
    } catch (error) {
      console.error(`Error translating key '${key}':`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      isLoading,
      dictionary
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};