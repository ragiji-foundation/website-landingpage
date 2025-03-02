'use client';
import { Container, Group, Button, Text, ActionIcon, Modal, Stack } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { JoinUsModal } from './JoinUsModal';
import classes from './TopHeader.module.css';

export function TopHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactInfo = [
    { icon: <IconMail size={16} stroke={1.5} color="white" />, text: 'admin@ragijifoundation.com', href: 'mailto:admin@ragijifoundation.com' },
    { icon: <IconPhone size={16} stroke={1.5} color="white" />, text: '+91 8827968035', href: 'tel:+918827968035' },
  ];

  return (
    <div className={classes.header}>
      <Container size="xl" px="xs" className={classes.container}>
        <Group justify="space-between" wrap="nowrap" className={classes.wrapper}>
          <Text size="sm" fw={700} className={classes.orgName}>
            RAGI JI
          </Text>

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

            <Button
              variant="filled"
              size="compact-sm"
          
              onClick={() => setIsModalOpen(true)}
              className={classes.joinButton}
            >
              Join Us
            </Button>
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