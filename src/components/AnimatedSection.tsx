'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mantine/core';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Box py="xl">{children}</Box>
    </motion.div>
  );
}
