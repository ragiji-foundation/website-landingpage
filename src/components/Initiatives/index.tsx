import { Container, Title, SimpleGrid, Card, Text, Button } from '@mantine/core';
import { motion } from 'framer-motion';

const initiatives = [
  {
    title: 'Education',
    description: 'Providing quality education to underprivileged children',
    icon: '🎓'
  },
  {
    title: 'Healthcare',
    description: 'Making healthcare accessible to remote communities',
    icon: '🏥'
  },
  {
    title: 'Environment',
    description: 'Promoting sustainable practices and green initiatives',
    icon: '🌱'
  }
];

export function Initiatives() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Our Key Initiatives</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {initiatives.map((initiative, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              p="xl"
              radius="md"
              withBorder={false}
              style={{ height: '100%' }}
            >
              <Text size="xl" ta="center" mb="md">{initiative.icon}</Text>
              <Title order={3} ta="center" size="h4" mb="sm">{initiative.title}</Title>
              <Text ta="center" size="sm" c="dimmed">{initiative.description}</Text>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
}
