'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, Title, Text, Group, Button, Paper, Grid, Card, Stack, Badge, Code } from '@mantine/core';

export default function TranslationTestPage({ params }: { params: { locale: string } }) {
  const { language, setLanguage, t, dictionary, isLoading } = useLanguage();
  const [activeSection, setActiveSection] = useState('nav');
  const [dictionaryContent, setDictionaryContent] = useState<any>(null);

  // Sync with URL locale parameter
  useEffect(() => {
    if (params.locale && params.locale !== language) {
      setLanguage(params.locale as 'en' | 'hi');
    }
  }, [params.locale, language, setLanguage]);

  // Store dictionary content for debugging
  useEffect(() => {
    setDictionaryContent(dictionary);
  }, [dictionary]);

  // Define test sections
  const sections = [
    { id: 'nav', title: 'Navigation' },
    { id: 'footer', title: 'Footer' },
    { id: 'home', title: 'Home Page' },
    { id: 'common', title: 'Common Elements' }
  ];

  // Sample translation keys to test
  const translationSamples = {
    nav: [
      'nav.home',
      'nav.aboutus',
      'nav.theneed',
      'nav.ourstory',
      'nav.ourinitiatives',
      'nav.successstories',
      'nav.media',
      'nav.gallery',
      'nav.contactus',
    ],
    footer: [
      'footer.slogan',
      'footer.organization.name',
      'footer.organization.fullName',
      'footer.aboutus.title',
      'footer.ourinitiatives.title',
      'footer.mediacenter.title',
      'footer.getintouch.title',
      'footer.rights',
    ],
    home: [
      'home.hero.heading',
      'home.hero.subheading',
      'home.hero.ctaButton',
    ],
    common: [
      'common.readMore',
      'common.viewAll',
      'common.loadMore',
      'common.submit',
    ],
  };

  // Helper function to check if a key exists in the dictionary
  const checkKeyExists = (key: string): { exists: boolean, value: any } => {
    try {
      const parts = key.split('.');
      let current = dictionary;
      
      for (const part of parts) {
        if (current === undefined || current === null || typeof current !== 'object') {
          return { exists: false, value: null };
        }
        current = current[part];
      }
      
      return { 
        exists: current !== undefined, 
        value: current 
      };
    } catch (error) {
      console.error(`Error checking key ${key}:`, error);
      return { exists: false, value: null };
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Title>Loading translations...</Title>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="lg">Translation Test Page</Title>
      
      <Paper withBorder p="md" mb="xl">
        <Group mb="md" position="apart">
          <Text fw={700} size="lg">
            Current language: <Badge size="lg" color={language === 'en' ? 'blue' : 'green'}>
              {language === 'en' ? 'English' : 'हिंदी'}
            </Badge>
          </Text>
          
          <Text c="dimmed" size="sm">Dictionary loaded: {dictionary ? 'Yes' : 'No'}</Text>
        </Group>
        
        <Group mb="md">
          <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'filled' : 'outline'}>
            Switch to English
          </Button>
          <Button onClick={() => setLanguage('hi')} variant={language === 'hi' ? 'filled' : 'outline'}>
            हिंदी में बदलें
          </Button>
        </Group>
      </Paper>

      <Paper withBorder p="md" mb="xl">
        <Title order={2} mb="md">Select Translation Section</Title>
        <Group>
          {sections.map(section => (
            <Button 
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={activeSection === section.id ? 'filled' : 'outline'}
            >
              {section.title}
            </Button>
          ))}
        </Group>
      </Paper>

      <Grid>
        {translationSamples[activeSection as keyof typeof translationSamples]?.map(key => {
          const { exists, value } = checkKeyExists(key);
          return (
            <Grid.Col key={key} span={6}>
              <Card 
                withBorder 
                shadow="sm" 
                p="md" 
                radius="md"
                sx={theme => ({
                  backgroundColor: exists ? undefined : theme.colors.red[0]
                })}
              >
                <Stack>
                  <Group position="apart">
                    <Text fw={500} c="dimmed" size="sm">Key: {key}</Text>
                    <Badge color={exists ? 'green' : 'red'}>
                      {exists ? 'Found' : 'Missing'}
                    </Badge>
                  </Group>
                  
                  <Text fw={700}>{t(key)}</Text>
                  
                  <Text size="sm" c="dimmed">Raw value in dictionary:</Text>
                  <Code block>{value !== undefined ? JSON.stringify(value, null, 2) : 'undefined'}</Code>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      
      <Paper withBorder p="xl" mt="xl">
        <Title order={3} mb="md">Full Dictionary Structure</Title>
        <Code block style={{ maxHeight: '400px', overflow: 'auto' }}>
          {JSON.stringify(dictionaryContent, null, 2)}
        </Code>
      </Paper>
    </Container>
  );
}
