'use client';
import { Container, SimpleGrid, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';

const stats = [
  { value: '10K+', label: 'Lives Impacted' },
  { value: '50+', label: 'Projects' },
  { value: '20+', label: 'Communities' },
];

export default function StatsSection() {
  return (
    <Container size="lg" py="xl">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Title order={2} ta="center" size="3rem">{stat.value}</Title>
            <Text ta="center" size="lg" mt="xs">{stat.label}</Text>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
}
