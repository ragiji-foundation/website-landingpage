/**
 * Utility functions for handling localized content
 */

/**
 * Returns localized content based on current locale
 * Uses Hindi field if available and locale is 'hi', otherwise falls back to English
 */
export function getLocalizedContent<T extends Record<string, any>>(
  item: T,
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
 * Hook to extend an object with localized versions of its fields
 * @param item - Original data object
 * @param locale - Current locale ('en' or 'hi')
 * @returns Object with localized content
 */
export function withLocalization<T extends Record<string, any>>(
  item: T,
  locale: string
): T {
  if (!item) return item;
  
  const result = { ...item };
  
  // Fields that typically have Hindi versions
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
export function withLocalizedArray<T extends Record<string, any>>(
  items: T[],
  locale: string
): T[] {
  if (!items || !Array.isArray(items)) return items;
  return items.map(item => withLocalization(item, locale));
}