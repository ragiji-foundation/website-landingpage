'use client';
import { Container, Title, SimpleGrid, Card, Image, Text, Badge } from '@mantine/core';
import classes from './Gallery.module.css';

const GALLERY_ITEMS = [
  {
    title: 'Annual Day Celebration',
    image: '/gallery/event1.jpg',
    date: 'Dec 2023',
    location: 'Mahapura Center',
    type: 'Event'
  },
  {
    title: 'Education Workshop',
    image: '/gallery/event2.jpg',
    date: 'Nov 2023',
    location: 'City Center',
    type: 'Workshop'
  },
  {
    title: 'Community Meet',
    image: '/gallery/event3.jpg',
    date: 'Oct 2023',
    location: 'Kothada',
    type: 'Meet'
  },
];

export default function Gallery() {
  return (
    <Container size="xl" py="xl" className={classes.container}>
      <Title order={2} ta="center" mb="xl" className={classes.title}>
        Our Gallery
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {GALLERY_ITEMS.map((item, index) => (
          <Card key={index} shadow="sm" padding="md" radius="md">
            <Card.Section>
              <Image
                src={item.image}
                height={220}
                alt={item.title}
              />
            </Card.Section>

            <Badge mt="md" variant="light" color="blue">
              {item.type}
            </Badge>

            <Text fw={500} size="lg" mt="md">
              {item.title}
            </Text>

            <Text size="sm" c="dimmed" mt={5}>
              {item.date} • {item.location}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 