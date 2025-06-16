# Internationalization (i18n) Guide for RAGIJI Project

## Overview

This project uses Next.js App Router with [locale] parameter to support multiple languages. Currently, the application supports English (`en`) and Hindi (`hi`).

## How Translation Works

1. **Dictionary Files**: All translations are stored in `/src/dictionaries/en.ts` and `/src/dictionaries/hi.ts` as structured JSON objects.

2. **Language Context**: The `LanguageContext` provides:
   - Current language (`language`)
   - Function to change language (`setLanguage`)
   - Translation function (`t`)
   - Loading state (`isLoading`)
   - Full dictionary (`dictionary`)

## Using Translations in Components

### Basic Usage

```tsx
// Import the hook
import { useLanguage } from '@/context/LanguageContext';

// Inside your component
const { t } = useLanguage();

// Use translations
return <h1>{t('page.title')}</h1>;
```

### Using the TranslatedText Component

For complex cases or components with many translations:

```tsx
import { TranslatedText } from '@/components/utils/TranslatedText';

// Simple usage
<TranslatedText translationKey="page.title" />

// With fallback
<TranslatedText translationKey="missing.key" fallback="Fallback Text" />

// With parameters
<TranslatedText 
  translationKey="welcome.message" 
  params={{ name: 'John', role: 'Admin' }} 
/>
```

## Adding New Translations

1. Add new keys to both dictionary files (`en.ts` and `hi.ts`)
2. Use a nested structure for organization (e.g., `page.section.element`)
3. Ensure all keys exist in both language files

## Link Handling

When creating links in your application, ensure they maintain the current language:

```tsx
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

function MyComponent() {
  const { language } = useLanguage();
  
  return (
    <Link href={`/${language}/about-us`}>
      About Us
    </Link>
  );
}
```

## Best Practices

1. Group translations logically (by page/feature)
2. Use dot notation for nested keys (e.g., `contact.form.email`)
3. Always provide fallbacks for missing translations
4. Use the TranslatedText component for repetitive translations
5. Test all pages in both languages after adding new content

## Troubleshooting

- If a translation is not appearing, check if the key exists in both language files
- If you see the key being displayed instead of the translation, the key may be incorrect
- Use browser dev tools to inspect the Language Context state

For more details, refer to the implementation in `LanguageContext.tsx`.
