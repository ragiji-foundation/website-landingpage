'use client';

import { Container, Title, Grid, Card, Text, Image, Button, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalizedArray } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useNewsStore } from '@/store/useNewsStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { IconExternalLink } from '@tabler/icons-react';
import { useDictionary } from '@/hooks/useDictionary';
import { useFallbackImages } from '@/hooks/useFallbackImages';

export default function NewsPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { newsArticles, loading, error, fetchNewsArticles } = useNewsStore();
  
  // Get translations from dictionary
  const { dictionary } = useDictionary();
  const t = dictionary?.newscoverage || {};
  const common = dictionary?.common || {};
  
  // Get fallback images
  const { getPlaceholderImage } = useFallbackImages();
  
  useEffect(() => {
    fetchBanners();
    fetchNewsArticles();
  }, [fetchBanners, fetchNewsArticles]);
  
  // Get localized news articles
  const localizedNewsArticles = withLocalizedArray(newsArticles || [], locale);
  
  // Get banner
  const banner = getBannerByType('news-coverage');
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'News Coverage' }
          ]}
        />
      ) : (
        <Banner
          type="news-coverage"
          title={t?.title || 'News Coverage'}
          backgroundImage="/banners/news-coverage-banner.svg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'News Coverage' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title ta="center" order={2}>
            {t?.pageHeading || 'Media Stories About Our Work'}
          </Title>
          
          {loading ? (
            <Text ta="center">{common?.loading || 'Loading news articles...'}</Text>
          ) : error ? (
            <Text ta="center" c="red">
              {common?.errorMessage || 'Error loading content. Please try again later.'}
            </Text>
          ) : localizedNewsArticles.length === 0 ? (
            <Text ta="center">{t?.noArticles || 'No news articles available yet.'}</Text>
          ) : (
            <Grid gutter="xl">
              {localizedNewsArticles.map((article) => (
                <Grid.Col key={article.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card.Section>
                      <Image
                        src={article.imageUrl}
                        height={200}
                        alt={article.title}
                        fallbackSrc={getPlaceholderImage('article')}
                      />
                    </Card.Section>
                    
                    <Stack gap="xs" mt="md" style={{ flex: 1 }}>
                      <Text size="sm" c="dimmed">
                        {new Date(article.date).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US')}
                        {article.source && ` • ${article.source}`}
                      </Text>
                      
                      <Title order={3} lineClamp={2}>
                        {article.title}
                      </Title>
                      
                      <Text c="dimmed" size="sm" lineClamp={3} style={{ marginBottom: 'auto' }}>
                        {article.summary}
                      </Text>
                      
                      <Button 
                        component="a"
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="light" 
                        fullWidth 
                        rightSection={<IconExternalLink size={16} />}
                        mt="md" 
                        radius="md"
                      >
                        {t?.readFullArticle || 'Read Full Article'}
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </main>
  );
}
