'use client';
import { Container, Group, Button, Text, ActionIcon, Modal } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { JoinUsModal } from './JoinUsModal';
import classes from './TopHeader.module.css';

export function TopHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={classes.topHeader}>
        <Container size="xl">
          <Group justify="space-between" h={40} visibleFrom="md">
            <Group gap="xl">
              <Text size="sm" fw={500}>Live For Others</Text>
              <Text size="sm" fw={700} c="var(--mantine-color-orange-filled)">
                RAGI JI FOUNDATION
              </Text>
            </Group>

            <Group gap="xl">
              <Group gap="xs">
                <ActionIcon variant="subtle" color="gray">
                  <IconMail size={16} />
                </ActionIcon>
                <Text size="sm">admin@ragijifoundation.com</Text>
              </Group>

              <Group gap="xs">
                <ActionIcon variant="subtle" color="gray">
                  <IconPhone size={16} />
                </ActionIcon>
                <Text size="sm">+91 8827968035</Text>
              </Group>

              <Button
                variant="filled"
                color="orange"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                Join Us
              </Button>
            </Group>
          </Group>
        </Container>
      </div>

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
    </>
  );
}