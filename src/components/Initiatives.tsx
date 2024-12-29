'use client';
import React from 'react';
import { Container, Text, Card, SimpleGrid } from '@mantine/core';
import styles from './Initiatives.module.css';

const MOCK_INITIATIVES = [
  {
    id: 1,
    title: "Footpathshaala",
    description: "Educational program for street children focusing on basic literacy and numeracy skills.",
    icon: "🏫"
  },
  {
    id: 2,
    title: "Reach and Teach",
    description: "Mobile education units that bring learning to remote rural areas.",
    icon: "🚌"
  },
  {
    id: 3,
    title: "Skill Development",
    description: "Vocational training programs for youth to enhance employability.",
    icon: "💪"
  },
  {
    id: 4,
    title: "Digital Literacy",
    description: "Teaching computer skills and internet usage to bridge the digital divide.",
    icon: "💻"
  }
];

export function Initiatives() {
  return (
    <div className={styles.wrapper}>
      <Container size="xl" className={styles.container}>
        <Text size="xl" fw={700} ta="center" mb={30} className={styles.title}>
          Our Initiatives
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} className={styles.grid}>
          {MOCK_INITIATIVES.map((initiative) => (
            <Card key={initiative.id} className={styles.initiativeCard} padding="lg">
              <Text size="xl" ta="center" className={styles.icon}>
                {initiative.icon}
              </Text>
              <Text fw={500} ta="center" mt="md">
                {initiative.title}
              </Text>
              <Text size="sm" c="dimmed" ta="center" mt="sm">
                {initiative.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
} 