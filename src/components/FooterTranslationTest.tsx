'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Container, Paper, Title, Text, Stack, Button, Divider, Group } from '@mantine/core';
import { useState } from 'react';

export function FooterTranslationTest() {
  const { language, setLanguage, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  // All footer translation keys
  const footerSections = [
    'footer.slogan',
    'footer.organization.name',
    'footer.organization.fullName',
    'footer.organization.address.line1',
    'footer.organization.address.line2',
    'footer.organization.address.line3',
    'footer.aboutus.title',
    'footer.aboutus.theneed',
    'footer.aboutus.ourstory',
    'footer.aboutus.ourinitiatives',
    'footer.aboutus.successstories',
    'footer.ourinitiatives.title',
    'footer.ourinitiatives.educationandskilldevelopment',
    'footer.ourinitiatives.health',
    'footer.ourinitiatives.environmentprotectionandplantation',
    'footer.ourinitiatives.sanitizationandruraldevelopment',
    'footer.ourinitiatives.culturalandsportsactivity',
    'footer.ourinitiatives.others',
    'footer.mediacenter.title',
    'footer.mediacenter.newscoverage',
    'footer.mediacenter.electronicmedia',
    'footer.mediacenter.photogallery',
    'footer.mediacenter.blogs',
    'footer.mediacenter.awards',
    'footer.getintouch.title',
    'footer.getintouch.contactus',
    'footer.getintouch.phone',
    'footer.getintouch.email',
    'footer.getintouch.website',
    'footer.getintouch.careers',
    'footer.registration',
    'footer.registrationNumbers',
    'footer.rights',
  ];

  return (
    <Container mt={40} mb={40}>
      <Title order={1} mb={20}>Footer Translation Test</Title>
      <Group mb={20}>
        <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'filled' : 'outline'}>English</Button>
        <Button onClick={() => setLanguage('hi')} variant={language === 'hi' ? 'filled' : 'outline'}>हिंदी</Button>
        <Button onClick={() => setShowAll(!showAll)} ml="auto">{showAll ? 'Show Less' : 'Show All Keys'}</Button>
      </Group>

      <Paper p="md" withBorder mb={20}>
        <Title order={2} mb={10}>Current Language: {language === 'en' ? 'English' : 'हिंदी'}</Title>
        
        <Divider my="sm" label="Organization Information" />
        
        <Stack spacing="xs">
          <Text><strong>Slogan:</strong> {t('footer.slogan')}</Text>
          <Text><strong>Name:</strong> {t('footer.organization.name')}</Text>
          <Text><strong>Full Name:</strong> {t('footer.organization.fullName')}</Text>
          <Text><strong>Address:</strong> {t('footer.organization.address.line1')}</Text>
          <Text>{t('footer.organization.address.line2')}</Text>
          <Text>{t('footer.organization.address.line3')}</Text>
        </Stack>

        {showAll && (
          <>
            <Divider my="sm" label="All Footer Keys" />
            <Stack spacing="xs">
              {footerSections.map(key => (
                <Text key={key} size="sm">
                  <strong>{key}:</strong> {t(key)}
                </Text>
              ))}
            </Stack>
          </>
        )}
      </Paper>
    </Container>
  );
}
