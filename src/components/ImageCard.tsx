import React from 'react';
import { Card, Text } from '@mantine/core';
import classes from './ImageCard.module.css';

interface ImageCardProps {
  image: string;
  title: string;
  href: string;
}

export function ImageCard({ image, title, href }: ImageCardProps) {
  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={href}
      style={{
        transition: 'transform 0.2s ease',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer'
      }}
    >
      <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
      <div className={classes.overlay} />
      <div className={classes.content}>
        <Text size="lg" className={classes.title} fw={500}>
          {title}
        </Text>
      </div>
    </Card>
  );
}