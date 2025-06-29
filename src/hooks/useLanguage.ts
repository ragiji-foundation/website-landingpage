/**
 * Re-export the useLanguage hook from the context
 * This allows for better organization and prevents import cycles
 */
import { useLanguage as useLanguageFromContext } from '@/context/LanguageContext';

export const useLanguage = useLanguageFromContext;

export default useLanguage;