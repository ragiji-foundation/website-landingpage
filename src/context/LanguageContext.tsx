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
      // ... other navigation items
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
      // ... other navigation items
    },
    search: {
      placeholder: 'खोजें',
      noResults: 'कोई परिणाम नहीं मिला',
    },
  },
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

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    
    // Update URL to reflect language change
    if (pathname) {
      const segments = pathname.split('/');
      // If the second segment (index 1) is a locale, replace it
      if (['en', 'hi'].includes(segments[1])) {
        segments[1] = lang;
        router.push(segments.join('/'));
      } else {
        // This shouldn't normally happen with our middleware, but just in case
        router.push(`/${lang}${pathname}`);
      }
    }
  };

  // Translation function with improved error handling
  const t = (key: string): string => {
    if (!key || typeof key !== 'string') return '';
    
    try {
      const keys = key.split('.');
      let result = dictionary;
      
      // Navigate through the nested dictionary structure
      for (const k of keys) {
        if (!result || typeof result !== 'object') {
          // console.warn(`Translation path broken at '${k}' in key '${key}'`);
          return key;
        }
        
        result = result[k];
        
        if (result === undefined) {
          // Try fallback to basic translations if not found in dictionary
          let fallback = translations[language];
          for (const k of keys) {
            fallback = fallback?.[k];
            if (fallback === undefined) break;
          }
          
          return fallback || key;
        }
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