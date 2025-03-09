'use client';
import { Container, Title, Card, Text, SimpleGrid } from '@mantine/core';
import { motion } from 'framer-motion';

const stories = [
  {
    title: 'Community Transformation',
    description: 'A rural village achieved 100% literacy through our education program',
    image: '/stories/education.jpg',
  },
  {
    title: 'Healthcare Access',
    description: 'Mobile clinics brought medical care to remote areas',
    image: '/stories/healthcare.jpg',
  },
  {
    title: 'Green Initiative',
    description: 'Local community planted 1000+ trees in urban areas',
    image: '/stories/environment.jpg',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function SuccessStoriesSection() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Success Stories</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              p="xl"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${story.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Title order={3} c="white" mb="md">{story.title}</Title>
              <Text c="white" size="sm">{story.description}</Text>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
}

