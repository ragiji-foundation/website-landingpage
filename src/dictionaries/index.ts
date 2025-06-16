import { enDictionary } from './en';
import { hiDictionary } from './hi';

// Dictionary map for static content
const dictionaries = {
  en: enDictionary,
  hi: hiDictionary,
};

export async function getDictionary(locale: string = 'en') {
  console.log(`Loading dictionary for locale: ${locale}`);
  
  try {
    // Ensure we're using a supported locale, default to 'en' if unsupported
    const safeLocale = locale && ['en', 'hi'].includes(locale) ? locale : 'en';
    
    // Try to fetch dynamic translations from the API first
    const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (API_URL) {
      try {
        console.log(`Fetching from API: ${API_URL}/api/translations?locale=${safeLocale}`);
        
        const response = await fetch(`${API_URL}/api/translations?locale=${safeLocale}`, {
          next: { revalidate: 3600 } // Revalidate cache every hour
        });
        
        if (response.ok) {
          const dynamicTranslations = await response.json();
          console.log(`Successfully loaded dynamic translations for ${safeLocale}`);
          
          // Merge with static dictionary
          const mergedDictionary = {
            ...(dictionaries[safeLocale as keyof typeof dictionaries] || dictionaries.en),
            ...dynamicTranslations
          };
          
          console.log(`Dictionary keys: ${Object.keys(mergedDictionary).join(', ')}`);
          return mergedDictionary;
        } else {
          console.warn(`API returned status ${response.status}, falling back to static dictionary`);
        }
      } catch (error) {
        console.error('Failed to fetch translations from API:', error);
      }
    }
    
    // Fallback to static dictionaries
    console.log(`Using static ${safeLocale} dictionary`);
    const staticDictionary = dictionaries[safeLocale as keyof typeof dictionaries] || dictionaries.en;
    console.log(`Static dictionary keys: ${Object.keys(staticDictionary).join(', ')}`);
    return staticDictionary;
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    return dictionaries.en; // Fallback to English static dictionary
  }
}
