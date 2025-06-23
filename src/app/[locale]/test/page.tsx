'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { Container, Text, Title, Button, Stack } from '@mantine/core';

export default function TranslationTestPage() {
  const { language, setLanguage, t, dictionary } = useLanguage();
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    console.log("Current language:", language);
    console.log("Dictionary keys:", dictionary ? Object.keys(dictionary) : "Not loaded");
  }, [language, dictionary]);

  return (
    <Container mt={40} mb={40}>
      <Title mb={20}>Translation Test Page</Title>
      
      <Stack mb={30}>
        <Text size="xl">Current Language: {language}</Text>
        <Button onClick={() => setLanguage('en')}>Switch to English</Button>
        <Button onClick={() => setLanguage('hi')}>Switch to Hindi</Button>
      </Stack>

      <Title order={2} mb={10}>Footer Translations</Title>
      <Stack gap="xs">
        <Text>Footer Slogan: {t('footer.slogan')}</Text>
        <Text>Footer Rights: {t('footer.rights')}</Text>
        <Text>About Us Title: {t('footer.aboutus.title')}</Text>
        <Text>Contact Info: {t('footer.getintouch.contactus')}</Text>
      </Stack>

      <Button mt={20} onClick={() => setShowDebug(!showDebug)}>
        {showDebug ? "Hide Debug Info" : "Show Debug Info"}
      </Button>

      {showDebug && (
        <div style={{ marginTop: 20, padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
          <Title order={3} mb={10}>Dictionary Content</Title>
          <pre style={{ overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(dictionary, null, 2)}
          </pre>
        </div>
      )}
    </Container>
  );
}
