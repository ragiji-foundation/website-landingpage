'use client';
import { Container, Title, Text, Button, Group, Stack, ActionIcon } from '@mantine/core';
import {
  IconUsers,
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMail,
  IconFileDownload,
} from '@tabler/icons-react';
import { JoinUsModal } from './JoinUsModal';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import classes from './JoinUs.module.css';

export function JoinUs() {
  const [opened, setOpened] = useState(false);
  const { t } = useLanguage();

  const socialLinks = [
    { icon: IconBrandX, href: 'https://x.com/ragiji', color: 'dark' },
    { icon: IconBrandFacebook, href: 'https://facebook.com/ragiji', color: '#1877F2' },
    { icon: IconBrandInstagram, href: 'https://instagram.com/ragiji', color: '#E4405F' },
    { icon: IconBrandYoutube, href: 'https://youtube.com/@ragiji', color: '#FF0000' },
    { icon: IconMail, href: 'mailto:admin@ragijifoundation.com', color: '#EA4335' },
  ];

  const handleDownloadBrochure = () => {
    window.open('/brochure.pdf', '_blank');
  };

  return (
    <section className={classes.section}>
      <Container size="xl">
        <Stack align="center" gap="xl" py={60}>
          <Group gap="xs" justify="center">
            <IconUsers size={32} stroke={1.5} className={classes.icon} />
            <Title order={2} ta="center">{t('joinus.banner.title')}</Title>
          </Group>

          <Text size="xl" c="dimmed" maw={600} ta="center">
            {t('joinus.ways.description')}
          </Text>

          <Group gap="lg">
            <Button
              onClick={handleDownloadBrochure}
              variant="outline"
              size="lg"
              rightSection={<IconFileDownload size={18} />}
              className={classes.downloadBtn}
            >
              {t('joinus.downloadBrochure')}
            </Button>
          </Group>

          <div className={classes.socialSection}>
            <Text size="sm" fw={500} mb="md" ta="center" c="dimmed">
              {t('joinus.connectWithUs')}
            </Text>
            <Group gap="md" justify="center">
              {socialLinks.map((link, index) => (
                <ActionIcon
                  key={index}
                  variant="light"
                  size="xl"
                  radius="xl"
                  component="a"
                  href={link.href}
                  target="_blank"
                  className={classes.socialButton}
                  style={{ color: link.color }}
                >
                  <link.icon size={22} stroke={1.5} />
                </ActionIcon>
              ))}
            </Group>
          </div>
        </Stack>
      </Container>

      <JoinUsModal opened={opened} onClose={() => setOpened(false)} />
    </section>
  );
}
