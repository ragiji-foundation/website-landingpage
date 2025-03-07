import { FC } from 'react';
import Image from 'next/image';
import styles from './FeatureCard.module.css';

interface Feature {
  id: string;
  title: string;
  description: string; // Now contains HTML string
  slug: string;
  category: string;
  order: number;
  mediaItem: {
    type: 'image' | 'video' | 'icon';
    url: string;
    thumbnail: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={feature.mediaItem.url}
          alt={feature.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{feature.title}</h3>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: feature.description }}
        />
      </div>
    </div>
  );
}