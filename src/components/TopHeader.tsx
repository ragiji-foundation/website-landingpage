'use client';
import { Container, Group, Button, Text, ActionIcon, Modal, Stack } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { JoinUsModal } from './JoinUsModal';
import classes from './TopHeader.module.css';

export function TopHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactInfo = [
    { icon: <IconMail size={16} />, text: 'admin@ragijifoundation.com', href: 'mailto:admin@ragijifoundation.com' },
    { icon: <IconPhone size={16} />, text: '+91 8827968035', href: 'tel:+918827968035' },
  ];

  return (
    <div className={classes.topHeader}>
      <Container size="xl" px="xs">
        <Group
          justify="space-between"
          wrap="nowrap"
          className={classes.wrapper}
        >
          <Text
            size="sm"
            fw={700}
            c="var(--mantine-color-orange-filled)"
            className={classes.orgName}
          >
            RAGI JI
          </Text>

          <Group gap="xs" wrap="nowrap" className={classes.rightSection}>
            {contactInfo.map((item, index) => (
              <Group gap={4} key={index} wrap="nowrap" className={classes.contactItem}>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  className={classes.contactIcon}
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
              color="orange"
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
        <JoinUsModal onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}