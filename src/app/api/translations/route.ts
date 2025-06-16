import { NextResponse } from 'next/server';
import { translations } from '@/context/LanguageContext';

export async function GET(request: Request) {
  // Get the locale from the query string
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Try to fetch translations from the admin API
    const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!API_URL) {
      throw new Error('Admin API URL not configured');
    }

    // Fetch translations from the admin API
    const response = await fetch(`${API_URL}/api/translations?locale=${locale}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // If the admin API is down or returns an error, fall back to local translations
    if (!response.ok) {
      console.warn(`Failed to fetch translations from admin API. Status: ${response.status}`);
      return NextResponse.json(translations[locale as 'en' | 'hi'] || translations.en);
    }

    // Parse and return the translations from the admin API
    const adminTranslations = await response.json();
    
    // Merge with local translations for any missing keys
    const mergedTranslations = {
      ...translations[locale as 'en' | 'hi'],
      ...adminTranslations
    };

    return NextResponse.json(mergedTranslations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    // Fall back to local translations in case of error
    return NextResponse.json(translations[locale as 'en' | 'hi'] || translations.en);
  }
}
