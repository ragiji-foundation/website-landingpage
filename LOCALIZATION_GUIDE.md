# Localization Guide for RAGIJI Website

This guide explains how to implement Hindi language support across all pages of the RAGIJI Foundation website.

## Architecture

Our localization approach is based on:

1. **Database Design**: All content models have both English fields and Hindi counterparts (e.g., `title` and `titleHi`)
2. **API Responses**: API returns both English and Hindi content in a single response
3. **Component Localization**: Components conditionally display Hindi content based on the current locale

## Utility Functions

We've created three main utility functions in `/src/utils/localization.ts`:

```typescript
// Get a single localized field
getLocalizedContent(item, fieldName, locale)

// Localize an entire object 
withLocalization(item, locale)

// Localize an array of items
withLocalizedArray(items, locale)
```

## Implementation Pattern

### For Client Components

1. Import the necessary utilities:
```typescript
import { useParams } from 'next/navigation';
import { withLocalization, withLocalizedArray } from '@/utils/localization';
```

2. Get the current locale from the route params:
```typescript
const params = useParams();
const locale = params.locale as string || 'en';
```

3. Apply localization to your data:
```typescript
// For a single object
const localizedItem = withLocalization(item, locale);

// For an array
const localizedItems = withLocalizedArray(items, locale);
```

4. Render the localized content:
```jsx
return (
  <div>
    <h1>{localizedItem.title}</h1>
    <p>{localizedItem.description}</p>
  </div>
);
```

### For Server Components

1. Import the utility functions:
```typescript
import { withLocalization, withLocalizedArray } from '@/utils/localization';
```

2. Get locale from page params:
```typescript
export default async function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  // Rest of your component
}
```

3. Apply localization:
```typescript
const localizedData = withLocalization(data, locale);
```

## Ready-to-use Components

We've also created components to simplify localization:

### LocalizedContent

```jsx
<LocalizedContent item={blogPost} field="title" fallback="Default Title" />
```

### LocalizedBanner

```jsx
<LocalizedBanner 
  banner={banner}
  breadcrumbs={[
    { label: 'Home', link: '/' },
    { label: 'About' }
  ]}
/>
```

## Implementation Checklist

Apply these patterns to the following pages:

- [x] Career Details Page (`/[locale]/careers/[slug]/page.tsx`)
- [x] Careers Page (`/[locale]/careers/page.tsx`)
- [x] Awards Page (`/[locale]/(about-us)/awards/page.tsx`) 
- [x] Our Centers Page (`/[locale]/(about-us)/our-centers/page.tsx`)
- [x] Our Initiatives Page (`/[locale]/(about-us)/our-initiatives/page.tsx`)
- [x] Our Story Page (`/[locale]/(about-us)/our-story/page.tsx`)
- [x] Success Stories Page (`/[locale]/(about-us)/success-stories/page.tsx`)
- [x] The Need Page (`/[locale]/(about-us)/the-need/page.tsx`)
- [x] Blog Page (`/[locale]/(media)/blogs/page.tsx`)
- [x] Electronic Media Page (`/[locale]/(media)/electronic-media/page.tsx`)
- [x] News Coverage Page (`/[locale]/(media)/news-coverage/page.tsx`) 
- [x] Gallery Page (`/[locale]/gallery/page.tsx`)
- [x] Homepage (`/[locale]/page.tsx`)

## Important Notes

1. Always provide fallbacks for Hindi content
2. Use the proper naming convention for Hindi fields (`fieldHi`)
3. Ensure all components use the current locale from URL params
4. For complex HTML content, use proper rendering for structured content