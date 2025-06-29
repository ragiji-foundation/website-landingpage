// Route handler for translations API

// Define static translations for fallback
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      contact: 'Contact',
      ourStory: 'Our Story',
      initiatives: 'Our Initiatives',
      centers: 'Our Centers',
      stories: 'Success Stories',
      theNeed: 'The Need',
      awards: 'Awards',
      media: 'Media',
      gallery: 'Gallery'
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
      contact: 'संपर्क करें',
      ourStory: 'हमारी कहानी',
      initiatives: 'हमारी पहल',
      centers: 'हमारे केंद्र',
      stories: 'सफलता की कहानियां',
      theNeed: 'आवश्यकता',
      awards: 'पुरस्कार',
      media: 'मीडिया',
      gallery: 'फोटो गैलरी'
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || 'en';
  const safeLocale = (locale === 'hi' || locale === 'en') ? locale : 'en';
  
  // Check if API calls are disabled
  const apiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
  if (apiDisabled) {
    console.log('API calls are disabled. Using static dictionary.');
    const fallbackData = translations[safeLocale] || translations.en;
    return new Response(JSON.stringify(fallbackData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Try to fetch translations from the admin API
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.ragijifoundation.com/api'}/translations?locale=${locale}`;
    
    const response = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch translations from admin API. Status: ${response.status}`);
      // Return the static translations as fallback
      const fallbackData = translations[safeLocale] || translations.en;
      return new Response(JSON.stringify(fallbackData), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Parse and return the translations from the admin API
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching translations:', error);
    // Fall back to local translations in case of error
    const fallbackData = translations[safeLocale] || translations.en;
    return new Response(JSON.stringify(fallbackData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
