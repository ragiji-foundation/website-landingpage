'use client';

import { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface TranslatedTextProps {
  translationKey: string;
  fallback?: string;
  children?: ReactNode;
  params?: Record<string, string>;
}

export function TranslatedText({ 
  translationKey, 
  fallback, 
  children, 
  params = {} 
}: TranslatedTextProps) {
  const { t } = useLanguage();
  
  // Get the translation with fallback to the provided text or children
  const translation = t(translationKey);
  
  // If the translation is the same as the key, it means it wasn't found
  const finalText = translation === translationKey ? 
    (fallback || children || translationKey) : 
    translation;
    
  // Replace any parameters in the text (e.g., {name} becomes the value of params.name)
  let processedText = String(finalText);
  Object.entries(params).forEach(([key, value]) => {
    processedText = processedText.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  
  return <>{processedText}</>;
}
