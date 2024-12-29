import { Container, Group, Button, Text, ActionIcon } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import classes from './TopHeader.module.css';

export function TopHeader() {
  return (
    <div className={classes.topHeader}>
      <Container size="xl">
        <Group justify="space-between" h={40}>
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
              component="a"
              href="/join-us"
            >
              Join Us
            </Button>
          </Group>
        </Group>
      </Container>
    </div>
  );
} 