'use client';
import { Container, Title, Text, Button, Group, Stack, ActionIcon, SimpleGrid, Paper } from '@mantine/core';
import {
  IconUsers,
  IconArrowRight,
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMail,
  IconFileDownload,
  IconHeart,
  IconHandOff
} from '@tabler/icons-react';
import { JoinUsModal } from './JoinUsModal';
import { useState } from 'react';
import classes from './JoinUs.module.css';

// Add interface for join options
interface JoinOption {
  title: string;
  description: string;
  icon: React.FC<{ size: number; className?: string }>;
}

export function JoinUs() {
  const [opened, setOpened] = useState(false);

  const socialLinks = [
    { icon: IconBrandX, href: 'https://x.com/ragiji', color: 'dark' },
    { icon: IconBrandFacebook, href: 'https://facebook.com/ragiji', color: '#1877F2' },
    { icon: IconBrandInstagram, href: 'https://instagram.com/ragiji', color: '#E4405F' },
    { icon: IconBrandYoutube, href: 'https://youtube.com/@ragiji', color: '#FF0000' },
    { icon: IconMail, href: 'mailto:admin@ragijifoundation.com', color: '#EA4335' },
  ];

  // const joinOptions: JoinOption[] = [
  //   {
  //     title: 'Volunteer',
  //     description: 'Join our team of dedicated volunteers and make a direct impact',
  //     icon: IconUsers,
  //   },
  //   {
  //     title: 'Donate',
  //     description: 'Support our mission through financial contributions',
  //     icon: IconHeart,
  //   },
  //   {
  //     title: 'Partner',
  //     description: 'Collaborate with us on impactful projects',
  //     icon: IconHandOff,
  //   },
  // ];

  const handleDownloadBrochure = () => {
    window.open('/brochure.pdf', '_blank');
  };

  return (
    <section className={classes.section}>
      <Container size="xl">
        <Stack align="center" gap="xl" py={60}>
          <Group gap="xs" justify="center">
            <IconUsers size={32} stroke={1.5} className={classes.icon} />
            <Title order={2} ta="center">Join Our Mission</Title>
          </Group>

          <Text size="xl" c="dimmed" maw={600} ta="center">
            The Best Way to Make a Difference in the Lives of Others
          </Text>

          {/* <SimpleGrid cols={{ base: 1, md: 3 }} className={classes.optionsGrid}>
            {joinOptions.map((option, index) => (
              <Paper key={index} shadow="md" p="xl" radius="md" className={classes.optionCard}>
                <option.icon size={32} className={classes.optionIcon} />
                <Text size="lg" fw={600} mt="md">
                  {option.title}
                </Text>
                <Text size="sm" c="dimmed" mt={5}>
                  {option.description}
                </Text>
              </Paper>
            ))}
          </SimpleGrid> */}

          <Group gap="lg">
            {/* <Button
              onClick={() => setOpened(true)}
              variant="gradient"
              gradient={{ from: '#FF4B2B', to: '#FF416C' }}
              size="lg"
              rightSection={<IconArrowRight size={18} />}
            >
              Join Us Now
            </Button> */}

            <Button
              onClick={handleDownloadBrochure}
              variant="outline"
              size="lg"
              rightSection={<IconFileDownload size={18} />}
              className={classes.downloadBtn}
            >
              Download Brochure
            </Button>
          </Group>

          <div className={classes.socialSection}>
            <Text size="sm" fw={500} mb="md" ta="center" c="dimmed">
              Connect With Us
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
