import { Container, Title, SimpleGrid, Image, Text, Modal } from '@mantine/core';
import { motion } from 'framer-motion';
import { useState } from 'react';
import classes from './Gallery.module.css';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Sample gallery images
  const images: GalleryImage[] = [
    { id: '1', url: 'https://example.com/image1.jpg', caption: 'Image 1' },
    { id: '2', url: 'https://example.com/image2.jpg', caption: 'Image 2' },
    { id: '3', url: 'https://example.com/image3.jpg', caption: 'Image 3' },
    { id: '4', url: 'https://example.com/image4.jpg', caption: 'Image 4' },
    { id: '5', url: 'https://example.com/image5.jpg', caption: 'Image 5' },
    { id: '6', url: 'https://example.com/image6.jpg', caption: 'Image 6' },
  ];

  return (
    <div className={classes.wrapper}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mb={50}
          >
            Impact Gallery
          </Title>
        </motion.div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={classes.imageWrapper}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.url}
                  alt={image.caption}
                  className={classes.image}
                />
                <div className={classes.overlay}>
                  <Text className={classes.caption}>{image.caption}</Text>
                </div>
              </div>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>

      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="xl"
        padding={0}
        className={classes.modal}
      >
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={selectedImage.caption}
            fit="contain"
            className={classes.modalImage}
          />
        )}
      </Modal>
    </div>
  );
}
