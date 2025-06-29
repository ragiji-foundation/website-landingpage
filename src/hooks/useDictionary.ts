/**
 * Improved hook for accessing localized dictionary data
 */
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Define commonly used dictionary keys
export interface Dictionary {
  nav?: {
    home?: string;
    about?: string;
    contact?: string;
    [key: string]: string | undefined;
  };
  common?: {
    loading?: string;
    errorMessage?: string;
    readMore?: string;
    applyNow?: string;
    submitSuccessful?: string;
    submitFailed?: string;
    requiredField?: string;
    home?: string;
    [key: string]: string | undefined;
  };
  successstories?: {
    title?: string;
    pageHeading?: string;
    featured?: string;
    readFullStory?: string;
    noStories?: string;
    [key: string]: string | undefined;
  };
  // Add more dictionary sections as needed
  [key: string]: Record<string, string | undefined> | undefined;
}

// Static dictionaries as fallbacks
const staticDictionaries: Record<string, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      contact: 'Contact'
    },
    common: {
      loading: 'Loading...',
      errorMessage: 'Error loading content. Please try again later.',
      readMore: 'Read More',
      applyNow: 'Apply Now',
      submitSuccessful: 'Form submitted successfully!',
      submitFailed: 'Form submission failed. Please try again.',
      requiredField: 'This field is required',
      home: 'Home'
    },
    successstories: {
      title: 'Success Stories',
      pageHeading: 'Inspiring Stories of Change',
      featured: 'Featured',
      readFullStory: 'Read Full Story',
      noStories: 'No success stories available yet.'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें'
    },
    common: {
      loading: 'लोड हो रहा है...',
      errorMessage: 'सामग्री लोड करने में त्रुटि। कृपया बाद में पुनः प्रयास करें।',
      readMore: 'और पढ़ें',
      applyNow: 'अभी आवेदन करें',
      submitSuccessful: 'फॉर्म सफलतापूर्वक सबमिट किया गया!',
      submitFailed: 'फॉर्म सबमिट करने में विफल। कृपया पुन: प्रयास करें।',
      requiredField: 'यह फ़ील्ड आवश्यक है',
      home: 'होम'
    },
    successstories: {
      title: 'सफलता की कहानियां',
      pageHeading: 'प्रेरक कहानियां और परिवर्तन',
      featured: 'विशेष कहानी',
      readFullStory: 'पूरी कहानी पढ़ें',
      noStories: 'अभी कोई सफलता की कहानी उपलब्ध नहीं है।'
    }
  }
};

export function useDictionary() {
  // Get locale from URL params as the primary source of truth
  const params = useParams();
  const urlLocale = params.locale as string || 'en';
  
  // Also use the language context as a fallback
  const { language: contextLanguage } = useLanguage();
  
  // Use URL locale first, then context language, then default to 'en'
  const language = urlLocale || contextLanguage || 'en';
  
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to fetch from API first
        const response = await fetch(`/api/translations?locale=${language}`, {
          headers: {
            'Accept': 'application/json'
          }
        }).catch(() => {
          console.log('API request failed, using static dictionary');
          return { ok: false } as Response;
        });
        
        if (response.ok) {
          try {
            const data = await response.json();
            console.log(`Dictionary loaded from API for language: ${language}`);
            setDictionary(data);
          } catch (e) {
            console.error('Error parsing dictionary JSON:', e);
            console.log(`API returned invalid JSON, falling back to static dictionary`);
            setDictionary(staticDictionaries[language] || staticDictionaries.en);
          }
        } else {
          console.log(`API returned status ${response.status}, falling back to static dictionary`);
          console.log('Using static', language, 'dictionary');
          console.log('Static dictionary keys:', Object.keys(staticDictionaries[language] || {}));
          setDictionary(staticDictionaries[language] || staticDictionaries.en);
        }
      } catch (e) {
        console.error('Error fetching dictionary:', e);
        setError(e instanceof Error ? e : new Error('Failed to load dictionary'));
        setDictionary(staticDictionaries[language] || staticDictionaries.en);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDictionary();
  }, [language]);

  return { dictionary, isLoading, error };
}