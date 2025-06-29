/**
 * Helper functions for generating localized breadcrumbs
 */

type Breadcrumb = {
  label: string;
  link?: string;
};

type BreadcrumbTranslations = {
  [key: string]: {
    en: string;
    hi: string;
  };
};

// Common translations for breadcrumb labels
const breadcrumbTranslations: BreadcrumbTranslations = {
  'home': {
    en: 'Home',
    hi: 'होम'
  },
  'careers': {
    en: 'Careers',
    hi: 'करियर'
  },
  'awards': {
    en: 'Awards',
    hi: 'पुरस्कार'
  },
  'our-centers': {
    en: 'Our Centers',
    hi: 'हमारे केंद्र'
  },
  'our-initiatives': {
    en: 'Our Initiatives',
    hi: 'हमारी पहल'
  },
  'our-story': {
    en: 'Our Story',
    hi: 'हमारी कहानी'
  },
  'success-stories': {
    en: 'Success Stories',
    hi: 'सफलता की कहानियां'
  },
  'the-need': {
    en: 'The Need',
    hi: 'आवश्यकता'
  },
  'blogs': {
    en: 'Blogs',
    hi: 'ब्लॉग'
  },
  'electronic-media': {
    en: 'Electronic Media',
    hi: 'इलेक्ट्रॉनिक मीडिया'
  },
  'news-coverage': {
    en: 'News Coverage',
    hi: 'मीडिया कवरेज'
  },
  'gallery': {
    en: 'Gallery',
    hi: 'फोटो गैलरी'
  },
  'apply': {
    en: 'Apply',
    hi: 'आवेदन करें'
  },
  'contact-us': {
    en: 'Contact Us',
    hi: 'संपर्क करें'
  }
};

/**
 * Get localized label for a breadcrumb
 */
export function getLocalizedBreadcrumbLabel(key: string, locale: string): string {
  // First check if we have a direct translation
  if (key.toLowerCase() in breadcrumbTranslations) {
    return breadcrumbTranslations[key.toLowerCase()][locale as 'en' | 'hi'] || key;
  }
  
  // Otherwise return the original key with first letter capitalized
  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Generate localized breadcrumbs based on the current path and locale
 */
export function generateBreadcrumbs(path: string, locale: string): Breadcrumb[] {
  // Remove locale from path
  const pathWithoutLocale = path.replace(`/${locale}`, '');
  
  // Split into segments
  const segments = pathWithoutLocale.split('/').filter(Boolean);
  
  // Always start with home
  const breadcrumbs: Breadcrumb[] = [
    {
      label: getLocalizedBreadcrumbLabel('home', locale),
      link: `/${locale}`
    }
  ];
  
  // Build up breadcrumbs by traversing path
  let currentPath = `/${locale}`;
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Check if this is the last segment (current page)
    const isLastSegment = index === segments.length - 1;
    
    breadcrumbs.push({
      label: getLocalizedBreadcrumbLabel(segment, locale),
      link: isLastSegment ? undefined : currentPath
    });
  });
  
  return breadcrumbs;
}

/**
 * Generate localized breadcrumbs with custom labels
 */
export function getLocalizedBreadcrumbs(
  items: Array<{key?: string; label?: string; link?: string}>, 
  locale: string
): Breadcrumb[] {
  return items.map(item => ({
    label: item.key ? 
      getLocalizedBreadcrumbLabel(item.key, locale) : 
      (item.label || ''),
    link: item.link
  }));
}