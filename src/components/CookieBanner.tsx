'use client';
import { Paper, Text, Group, Button } from '@mantine/core';
import { useCookies } from '@/context/CookieContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import classes from './CookieBanner.module.css';

export function CookieBanner() {
  const { cookiesAccepted, acceptCookies, declineCookies } = useCookies();
  const { t, language } = useLanguage();

  if (cookiesAccepted) {
    return null;
  }

  return (
    <Paper className={classes.banner} shadow="md">
      <div className={classes.content}>
        <Text size="sm">
          {t('cookies.message')}
          {' '}
          <Link href={`/${language}/privacy-policy`} className={classes.link}>
            {t('cookies.learnMore')}
          </Link>
        </Text>
        <Group gap="sm">
          <Button variant="outline" size="xs" onClick={declineCookies}>
            {t('cookies.decline')}
          </Button>
          <Button size="xs" onClick={acceptCookies}>
            {t('cookies.accept')}
          </Button>
        </Group>
      </div>
    </Paper>
  );
}