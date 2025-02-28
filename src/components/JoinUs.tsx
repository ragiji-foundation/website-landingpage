'use client';
import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { IconUsers, IconArrowRight } from '@tabler/icons-react';
import { JoinUsModal } from './JoinUsModal';
import { useState } from 'react';
import classes from './JoinUs.module.css';

export function JoinUs() {
  const [opened, setOpened] = useState(false);

  return (
    <section className={classes.section}>
      <Container size="xl">
        <Stack align="center" gap="lg" py={50}>
          <Group gap="xs" justify="center">
            <IconUsers size={32} stroke={1.5} className={classes.icon} />
            <Title order={2} ta="center">Join Our Mission</Title>
          </Group>

          <Text size="xl" c="dimmed" maw={600} ta="center">
            The Best Way to Make a Difference in the Lives of Others
          </Text>

          <Button
            onClick={() => setOpened(true)}
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            size="lg"
            rightSection={<IconArrowRight size={18} />}
          >
            Join Us 
          </Button>
        </Stack>
      </Container>

      <JoinUsModal opened={opened} onClose={() => setOpened(false)} />
    </section>
  );
}
