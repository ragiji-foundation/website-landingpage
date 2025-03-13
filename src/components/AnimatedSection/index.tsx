'use client';
import { motion } from 'framer-motion';

export const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }
      }
    }}
  >
    {children}
  </motion.div>
);
