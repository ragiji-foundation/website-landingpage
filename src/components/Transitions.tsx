'use client';
import { motion } from 'framer-motion';

export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={pageTransition}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);
