/**
 * Server-side utility functions for localization
 * Use these in Server Components where useParams() is not available
 */

type ContentItem = Record<string, any>;

/**
 * Returns localized content based on current locale
 */
export function getLocalizedContent<T extends ContentItem>(
  item: T | null | undefined,
  field: string,
  locale: string
): any {
  if (!item) return null;
  
  const hindiField = `${field}Hi`;
  
  if (locale === 'hi' && hindiField in item && item[hindiField]) {
    return item[hindiField];
  }
  
  return item[field];
}

/**
 * Transforms an object to use localized content
 */
export function withLocalization<T extends ContentItem>(
  item: T | null | undefined,
  locale: string
): T | null {
  if (!item) return null;
  
  const result = { ...item };
  
  // Common fields that have Hindi versions
  const fieldsToLocalize = [
    'title', 'name', 'description', 'content',
    'requirements', 'location', 'type', 'role',
    'organization', 'heading', 'subheading',
    'label', 'personName', 'mainText', 'statistics',
    'impact', 'vision', 'mission', 'category'
  ];
  
  // Apply localization to each field if Hindi version exists
  fieldsToLocalize.forEach(field => {
    if (field in item) {
      const hindiField = `${field}Hi`;
      if (locale === 'hi' && hindiField in item && item[hindiField]) {
        (result as Record<string, unknown>)[field] = item[hindiField];
      }
    }
  });
  
  return result;
}

/**
 * Apply localization to an array of items
 */
export function withLocalizedArray<T extends ContentItem>(
  items: T[] | null | undefined,
  locale: string
): T[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => withLocalization(item, locale) as T);
}

/**
 * Helper for handling server component params safely
 */
export async function getLocaleFromParams(params: any): Promise<string> {
  // For Next.js 14+ where params might be a Promise
  const resolvedParams = 'then' in params ? await params : params;
  return (resolvedParams?.locale as string) || 'en';
}