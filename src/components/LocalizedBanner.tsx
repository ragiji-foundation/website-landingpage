'use client';
import { Banner } from '@/components/Banner';
import { useParams } from 'next/navigation';
import { withLocalization } from '@/utils/localization';
import { BannerType } from '@/types/banner';

type LocalizedBannerProps = {
  banner: {
    type: string;
    title: string;
    titleHi?: string;
    description?: string;
    descriptionHi?: string;
    backgroundImage?: string;
  };
  breadcrumbs?: Array<{ label: string; link?: string }>;
};

/**
 * Banner component that automatically handles Hindi localization
 */
export function LocalizedBanner({ banner, breadcrumbs }: LocalizedBannerProps) {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  
  // Localize the banner content
  const localizedBanner = withLocalization(banner, locale);
  
  // Process breadcrumbs to ensure they are properly localized
  const processedBreadcrumbs = breadcrumbs?.map(item => ({
    label: locale === 'hi' && item.label === 'Home' ? 'होम' : item.label,
    link: item.link ? `${item.link.startsWith('/') ? '' : '/'}${locale}${item.link === '/' ? '' : item.link}` : undefined
  }));
  
  // Ensure we have a fallback image if the original is missing
  const backgroundImage = localizedBanner.backgroundImage || `/banners/${localizedBanner.type || 'default'}-banner.svg`;
  
  return (
    <Banner
      type={localizedBanner.type as BannerType}
      title={localizedBanner.title}
      description={localizedBanner.description}
      backgroundImage={backgroundImage}
      breadcrumbs={processedBreadcrumbs}
    />
  );
}