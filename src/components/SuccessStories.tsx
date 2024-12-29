import React from 'react';
import { Container, SimpleGrid, Box, Title, Text } from '@mantine/core';
import { ImageCard } from './ImageCard';
import classes from './SuccessStories.module.css';

const successStories = [
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Achieving Greatness',
    link: '/success/achieving-greatness',
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Success at Scale',
    link: '/success/success-at-scale',
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'From Zero to Hero',
    link: '/success/from-zero-to-hero',
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Making a Difference',
    link: '/success/making-a-difference',
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Making a Change',
    link: '/success/making-a-change',
  },
];

export function SuccessStoriesContainer() {
  return (
    <Container my="xl" size="xl">
      <Box className={classes.titleWrapper}>
        <Title order={2} className={classes.title}>Success Stories</Title>
        <Text c="dimmed" className={classes.description}>
          Discover how we&apos;re making a difference in people&apos;s lives
        </Text>
      </Box>

      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
        spacing={{ base: 'md', sm: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
      >
        {successStories.map((story, index) => (
          <ImageCard
            key={index}
            image={story.image}
            title={story.title}
            href={story.link}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
