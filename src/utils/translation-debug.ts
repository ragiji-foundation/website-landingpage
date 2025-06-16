/**
 * Utility for debugging translations
 */

/**
 * Check if a key exists in the provided dictionary and resolve its value
 * @param dictionary The translation dictionary object
 * @param key Dot-notation path to the translation (e.g. 'nav.home')
 * @returns Object with existence status and resolved value
 */
export function resolveTranslationKey(dictionary: Record<string, any>, key: string) {
  if (!dictionary || !key) {
    return { exists: false, value: undefined, path: [] };
  }

  try {
    const parts = key.split('.');
    let current = dictionary;
    const path: string[] = [];
    
    for (const part of parts) {
      path.push(part);
      if (current === undefined || current === null || typeof current !== 'object') {
        return { 
          exists: false, 
          value: undefined, 
          path: path,
          lastValidValue: current
        };
      }
      current = current[part];
    }
    
    return { 
      exists: current !== undefined, 
      value: current,
      path: path,
      complete: true
    };
  } catch (error) {
    console.error(`Error resolving key ${key}:`, error);
    return { 
      exists: false, 
      value: undefined, 
      path: [],
      error: error
    };
  }
}

/**
 * Log all available translation keys in a dictionary
 */
export function logAvailableTranslationKeys(dictionary: Record<string, any>, prefix = '') {
  if (!dictionary || typeof dictionary !== 'object') {
    return;
  }
  
  Object.entries(dictionary).forEach(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object') {
      logAvailableTranslationKeys(value, currentPath);
    } else {
      console.log(`Translation key available: ${currentPath} = ${value}`);
    }
  });
}
