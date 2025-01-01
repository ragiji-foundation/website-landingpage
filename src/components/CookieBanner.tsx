'use client';
import { Paper, Text, Group, Button } from '@mantine/core';
import { useCookies } from '@/context/CookieContext';
import classes from './CookieBanner.module.css';

export function CookieBanner() {
  const { cookiesAccepted, acceptCookies, declineCookies } = useCookies();

  if (cookiesAccepted) {
    return null;
  }

  return (
    <Paper className={classes.banner} shadow="md">
      <div className={classes.content}>
        <Text size="sm">
          We use cookies to enhance your browsing experience, serve personalized content,
          and analyze our traffic. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies.
          {' '}
          <a href="/privacy-policy" className={classes.link}>
            Learn more
          </a>
        </Text>
        <Group gap="sm">
          <Button variant="outline" size="xs" onClick={declineCookies}>
            Decline
          </Button>
          <Button size="xs" onClick={acceptCookies}>
            Accept
          </Button>
        </Group>
      </div>
    </Paper>
  );
} 