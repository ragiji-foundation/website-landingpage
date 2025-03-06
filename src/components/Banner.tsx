'use client';
import React from 'react';
import { Container, Title, Text, Breadcrumbs, Anchor, Box, Badge, Group, Center, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { BannerType } from '@/store/useBannerStore';
import classes from './Banner.module.css';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BannerProps {
  type: BannerType | string;
  title?: string;
  description?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  tags?: string[];
}

export function Banner({
  type,
  title,
  description,
  backgroundImage,
  breadcrumbs = [],
  tags = []
}: BannerProps) {

  // Figure out class based on type
  const bannerClass = `${classes.banner} ${classes[type as string] || ''}`;

  return (
    <Box
      className={bannerClass}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
      }}
    >
      <Container size="xl" className={classes.container}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs className={classes.breadcrumbs}>
            {breadcrumbs.map((item, index) => {
              if (item.link) {
                return (
                  <Anchor key={index} component={Link} href={item.link} className={classes.breadcrumbLink}>
                    {item.label}
                  </Anchor>
                );
              }
              return (
                <Text key={index} c="white" className={classes.breadcrumbCurrent}>
                  {item.label}
                </Text>
              );
            })}
          </Breadcrumbs>
        )}

        <Title className={classes.title}>{title}</Title>
        {description && <Text className={classes.description}>{description}</Text>}

        {tags.length > 0 && (
          <Group mt="lg">
            {tags.map((tag) => (
              <Badge key={tag} size="lg" variant="gradient" gradient={{ from: 'orange', to: 'green' }}>
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Container>
    </Box>
  );
}
