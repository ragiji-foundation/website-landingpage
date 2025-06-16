'use client';
import { Container, Group, Button, Text, ActionIcon, Modal, Stack } from '@mantine/core';
import { IconMail, IconPhone, IconBrandYoutubeFilled, IconBrandFacebookFilled, IconBrandInstagramFilled, IconBrandX, icons } from '@tabler/icons-react';
import { useState } from 'react';
import { JoinUsModal } from './JoinUsModal';
import { useLanguage } from '@/context/LanguageContext';
import classes from './TopHeader.module.css';

export function TopHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const contactInfo = [
    { 
      icon: <IconMail size={16} stroke={1.5} color="white" />, 
      text: t('footer.getintouch.email'), 
      href: 'mailto:admin@ragijifoundation.com' 
    },
    { 
      icon: <IconPhone size={16} stroke={1.5} color="white" />, 
      text: t('footer.getintouch.phone'), 
      href: 'tel:+918827968035' 
    },
  ];

  const socialLinks = [
    { icon: <IconBrandYoutubeFilled size={20} color="#FF0000" />, href: 'https://youtube.com' },
    { icon: <IconBrandFacebookFilled size={20} color="#1877F2" />, href: 'https://facebook.com' },
    { icon: <IconBrandInstagramFilled size={20} color="#E4405F" />, href: 'https://instagram.com' },
    { icon: <IconBrandX size={20} color="#000000" />, href: 'https://x.com' },
  ];

  return (
    <div className={classes.header}>
      <Container size="xl" px="xs" className={classes.container}>
        <Group justify="space-between" wrap="nowrap" className={classes.wrapper}>
          <Text size="sm" fw={700} className={classes.orgName}>
            {t('footer.organization.name')}
          </Text>

          <Group gap={8} wrap="nowrap" className={classes.socialLinks}>
            {socialLinks.map((item, index) => (
              <ActionIcon
                key={index}
                component="a"
                href={item.href}
                target="_blank"
                variant="subtle"
                className={classes.socialIcon}
                size="sm"
              >
                {item.icon}
              </ActionIcon>
            ))}
          </Group>

          <Group gap="xs" wrap="nowrap" className={classes.rightSection}>
            {contactInfo.map((item, index) => (
              <Group gap={4} key={index} wrap="nowrap" className={classes.contactItem}>
                <ActionIcon
                  variant="subtle"
                  className={classes.contactIcon}
                  size="sm"
                >
                  {item.icon}
                </ActionIcon>
                <Text
                  component="a"
                  href={item.href}
                  size="sm"
                  className={classes.contactText}
                >
                  {item.text}
                </Text>
              </Group>
            ))}
          </Group>
        </Group>
      </Container>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        centered
        overlayProps={{
          blur: 3,
          opacity: 0.55,
        }}
      >
        <JoinUsModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}