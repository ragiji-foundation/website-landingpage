// 'use client';

// import { Container, Title, Text, Grid, Paper, Group, Image, Stack, List, ThemeIcon } from '@mantine/core';
// import { Banner } from '@/components/Banner';
// import { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { withLocalization } from '@/utils/localization';
// import { useBannerStore } from '@/store/useBannerStore';
// import { useTheNeedStore } from '@/store/useTheNeedStore';
// import { LocalizedBanner } from '@/components/LocalizedBanner';
// import { IconCheck } from '@tabler/icons-react';

// export default function TheNeedPage() {
//   const params = useParams();
//   const locale = params.locale as string || 'en';
//   const { fetchBanners, getBannerByType } = useBannerStore();
//   const { needData, loading, error, fetchNeedData } = useTheNeedStore();
  
//   useEffect(() => {
//     fetchBanners();
//     fetchNeedData();
//   }, [fetchBanners, fetchNeedData]);
  
//   // Get localized data
//   const localizedNeed = needData ? withLocalization(needData, locale) : null;
  
//   // Get banner
//   const banner = getBannerByType('the-need');
  
//   if (loading) return <div>Loading data...</div>;
//   if (!localizedNeed) return <div>No data available</div>;
  
//   // Parse impact points if it's a string
//   let impactPoints: string[] = [];
//   try {
//     if (typeof localizedNeed.impact === 'string') {
//       // Try to parse as JSON if it's a JSON string
//       if (localizedNeed.impact.startsWith('[')) {
//         impactPoints = JSON.parse(localizedNeed.impact);
//       } else {
//         // Otherwise split by newlines or periods
//         impactPoints = localizedNeed.impact.split(/[.\n]+/).filter((p: string) => p.trim());
//       }
//     }
//   } catch (e) {
//     impactPoints = [localizedNeed.impact];
//   }
  
//   return (
//     <main>
//       {banner ? (
//         <LocalizedBanner
//           banner={banner}
//           breadcrumbs={[
//             { label: 'Home', link: '/' },
//             { label: 'The Need' }
//           ]}
//         />
//       ) : (
//         <Banner
//           type="the-need"
//           title={locale === 'hi' ? 'आवश्यकता' : 'The Need'}
//           backgroundImage="/banners/the-need-banner.jpg"
//           breadcrumbs={[
//             { label: 'Home', link: '/' },
//             { label: 'The Need' }
//           ]}
//         />
//       )}
      
//       <Container size="xl" py="xl">
//         <Stack gap="xl">
//           <Grid gutter="xl">
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Title order={2} mb="md">
//                 {locale === 'hi' ? 'हम क्यों हैं' : 'Why We Exist'}
//               </Title>
//               <Text size="lg">
//                 {localizedNeed.mainText}
//               </Text>
//             </Grid.Col>
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Image 
//                 src={localizedNeed.imageUrl} 
//                 alt="Children in need"
//                 radius="md"
//               />
//             </Grid.Col>
//           </Grid>
          
//           <Paper withBorder p="xl" radius="md" mt="xl">
//             <Title order={3} mb="lg">
//               {locale === 'hi' ? 'आंकड़े और तथ्य' : 'Statistics & Facts'}
//             </Title>
//             <Grid gutter="xl">
//               <Grid.Col md={7}>
//                 <Text>
//                   {localizedNeed.statistics}
//                 </Text>
//               </Grid.Col>
//               <Grid.Col md={5}>
//                 <Image 
//                   src={localizedNeed.statsImageUrl} 
//                   alt="Statistics visualization"
//                   radius="md"
//                 />
//               </Grid.Col>
//             </Grid>
//           </Paper>
          
//           <Paper withBorder p="xl" radius="md" mt="xl">
//             <Title order={3} mb="lg">
//               {locale === 'hi' ? 'हमारा प्रभाव' : 'Our Impact'}
//             </Title>
//             <List
//               spacing="md"
//               size="lg"
//               center
//               icon={
//                 <ThemeIcon color="teal" size={24} radius="xl">
//                   <IconCheck size={16} />
//                 </ThemeIcon>
//               }
//             >
//               {impactPoints.map((point, idx) => (
//                 <List.Item key={idx}>{point.trim()}</List.Item>
//               ))}
//             </List>
//           </Paper>
//         </Stack>
//       </Container>
//     </main>
//   );
// }

'use client';

import { Container, Title, Text, Stack, Image, Grid, Card, Group } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalization } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useTheNeedStore } from '@/store/useTheNeedStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { IconCheck } from '@tabler/icons-react';
import { useDictionary } from '@/hooks/useDictionary';
import { SimpleRichText } from '@/components/SimpleRichText';

export default function TheNeedPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { needData, loading, error, fetchNeedData } = useTheNeedStore();
  
  // Get banner for this page
  const banner = getBannerByType('need');
  
  // Force debug output at render
  console.log('COMPONENT RENDER DEBUG:', {
    needData,
    loading,
    error,
    banner,
    locale
  });
  
  // Get translations from dictionary
  const { dictionary } = useDictionary();
  const t = dictionary?.theneed || {};
  const common = dictionary?.common || {};
  
  useEffect(() => {
    console.log('🔥 useEffect starting, calling fetchBanners and fetchNeedData');
    
    // Force fetch even if we have fallback data
    const forceFetch = async () => {
      await fetchBanners();
      console.log('📞 About to call fetchNeedData...');
      await fetchNeedData();
      console.log('✅ fetchNeedData completed');
    };
    
    forceFetch();
    
    console.log('useEffect triggered, stores state:', {
      needData: needData,
      loading: loading,
      banner: banner
    });
  }, []);
  
  // Process the fetched data
  const localizedNeedData = needData ? withLocalization(needData, locale) : null;
  
  // Debug logging
  console.log('TheNeedPage Debug:', {
    needData: !!needData,
    localizedNeedData: !!localizedNeedData,
    loading,
    error: !!error,
    banner: !!banner
  });
  
  if (loading) {
    return (
      <Container py="xl">
        <Text ta="center">{common?.loading || 'Loading...'}</Text>
      </Container>
    );
  }
  
  // More defensive error checking - only show error if we have an actual error AND no data
  if (error && !localizedNeedData) {
    return (
      <Container py="xl">
        <Text ta="center" c="red">
          {common?.errorMessage || 'Error loading content. Please try again later.'}
        </Text>
      </Container>
    );
  }
  
  // If we have no data at all (shouldn't happen with fallback), create minimal fallback
  if (!localizedNeedData) {
    const minimalFallback = {
      id: '1',
      title: locale === 'hi' ? 'आवश्यकता' : 'The Need',
      mainText: locale === 'hi' 
        ? 'रागिजी फाउंडेशन में, हमारा मिशन वंचित समुदायों में शैक्षिक असमानताओं को दूर करने की तत्काल आवश्यकता से प्रेरित है।'
        : 'At RAGIJI Foundation, our mission is driven by the urgent need to address educational disparities in underserved communities.',
      statistics: locale === 'hi'
        ? 'वंचित समुदायों में 30% से अधिक बच्चों को बुनियादी शिक्षा तक पहुंच नहीं है।'
        : 'Over 30% of children in underserved communities lack access to basic education.',
      impact: locale === 'hi'
        ? 'अपनी स्थापना के बाद से, रागिजी फाउंडेशन ने इन चुनौतियों का समाधान करने में महत्वपूर्ण प्रगति की है।'
        : 'Since our founding, RAGIJI Foundation has made significant progress in addressing these challenges.',
      imageUrl: '/images/the-need.svg',
      statsImageUrl: '/images/statistics-chart.svg'
    };
    
    return (
      <main>
        {banner ? (
          <LocalizedBanner
            banner={banner}
            breadcrumbs={[
              { label: common?.home || 'Home', link: `/${locale}` },
              { label: t?.title || 'The Need' }
            ]}
          />
        ) : (
          <Banner
            type="need"
            title={locale === 'hi' ? 'आवश्यकता' : 'The Need'}
            backgroundImage="/banners/need-banner.jpg"
            breadcrumbs={[
              { label: common?.home || 'Home', link: `/${locale}` },
              { label: t?.title || 'The Need' }
            ]}
          />
        )}
        
        <Container size="xl" py="xl">
          <Stack gap="xl">
            <Title order={2} ta="center">
              {minimalFallback.title}
            </Title>
            <Text size="lg" ta="center">
              {minimalFallback.mainText}
            </Text>
          </Stack>
        </Container>
      </main>
    );
  }
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'The Need' }
          ]}
        />
      ) : (
        <Banner
          type="the-need"
          title={t?.title || 'The Need'}
          backgroundImage="/banners/the-need-banner.svg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'The Need' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} mb="md">
                {locale === 'hi' ? 'हम क्यों हैं' : 'Why We Exist'}
              </Title>
              
              <SimpleRichText content={localizedNeedData.mainText} />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src={localizedNeedData?.imageUrl || '/images/placeholder.svg'}
                alt={locale === 'hi' ? 'ज़रूरत' : 'The Need'}
                radius="md"
                maw={500}
                mx="auto"
              />
            </Grid.Col>
          </Grid>
          
          <Title order={2} ta="center" mt="xl">
            {locale === 'hi' ? 'वर्तमान स्थिति' : 'Current Situation'}
          </Title>
          
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section p="md" bg="blue.1">
                  <Title order={3} ta="center">
                    {locale === 'hi' ? 'आंकड़े' : 'Statistics'}
                  </Title>
                </Card.Section>
                
                <Stack mt="md">
                  <SimpleRichText content={localizedNeedData.statistics} />
                </Stack>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src={localizedNeedData?.statsImageUrl || '/images/placeholder.svg'}
                alt={locale === 'hi' ? 'आंकड़े' : 'Statistics'}
                radius="md"
                maw={500}
                mx="auto"
              />
            </Grid.Col>
          </Grid>
          
          <Title order={2} ta="center" mt="xl">
            {locale === 'hi' ? 'हमारा प्रभाव' : 'Our Impact'}
          </Title>
          
          <SimpleRichText content={localizedNeedData.impact} />
          
          <Grid gutter="xl">
            {Array.from({ length: 3 }, (_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group>
                    <IconCheck color="green" size={24} />
                    <Text fw={500}>
                      {locale === 'hi' 
                        ? ['शिक्षा', 'स्वास्थ्य', 'सशक्तिकरण'][i] 
                        : ['Education', 'Health', 'Empowerment'][i]
                      }
                    </Text>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mt="sm">
                    {locale === 'hi'
                      ? [
                          'हमारे शिक्षा कार्यक्रम हजारों बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करते हैं।',
                          'हमारे स्वास्थ्य पहल से परिवारों को सुधार मिलता है।',
                          'हमारे सशक्तिकरण कार्यक्रम लोगों को स्वावलंबी बनाते हैं।'
                        ][i]
                      : [
                          'Our education programs provide quality education to thousands of children.',
                          'Our health initiatives help families improve well-being.',
                          'Our empowerment programs help people become self-reliant.'
                        ][i]
                    }
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}