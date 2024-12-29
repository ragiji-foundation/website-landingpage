'use client';
import { Container, Group, ActionIcon, Text, Stack, Image, SimpleGrid } from '@mantine/core';
import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';
import Link from 'next/link';

const links = {
  'About Us': [
    { label: 'The Need', link: '/the-need' },
    { label: 'Our Story', link: '/our-story' },
    { label: 'Our Initiatives', link: '/our-initiatives' },
    { label: 'Success Stories', link: '/success-stories' },
  ],
  'Media': [
    { label: 'News Coverage', link: '/news-coverage' },
    { label: 'Blogs', link: '/blog' },
    { label: 'Electronic Media', link: '/electronic-media' },
    { label: 'Awards', link: '/awards' },
  ],
  'Legal': [
    { label: 'Privacy Policy', link: '/privacy-policy' },
    { label: 'Terms of Use', link: '/terms' },
    { label: 'Refund Policy', link: '/refund-policy' },
  ],
};

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size="xl">
        <div className={classes.logo}>
          <Link href="/">
            <Image src="/logo.png" alt="Ragi Ji Foundation" width={180} height={80} />
          </Link>
          <Text size="sm" c="dimmed" className={classes.description}>
            Live For Others
          </Text>
          <Text size="xs" c="dimmed">
            Registration Numbers: 03/28/04/24586/22 • AAKAR1183J24BP02 • AAKAR1183J24BP01
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={50}>
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className={classes.wrapper}>
              <Text className={classes.title}>{title}</Text>
              <Stack gap={10}>
                {items.map((link) => (
                  <Link
                    key={link.label}
                    href={link.link}
                    className={classes.link}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </div>
          ))}
        </SimpleGrid>
      </Container>

      <Container className={classes.afterFooter} size="xl">
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} RAMGIRIJI MAHARAJ SHIKSHA EVAM SAMAJ SEVA SAMITI. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="#" target="_blank">
            <IconBrandFacebook style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="#" target="_blank">
            <IconBrandYoutube style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="#" target="_blank">
            <IconBrandInstagram style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
} 