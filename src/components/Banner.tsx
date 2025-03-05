'use client';
import React from 'react';
import { Container, Title, Text, Breadcrumbs, Anchor, Box, Badge, Group, Center, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { useBanner } from '@/hooks/useBanner';
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

export function Banner({ type, title, description, backgroundImage, breadcrumbs = [], tags = [] }: BannerProps) {
  // Use the custom hook to get banner data
  const { banner, loading, error } = useBanner(type, true);

  // If loading, show a skeleton
  if (loading) {
    return (
      <Box className={classes.bannerSkeleton}>
        <Container size="xl" className={classes.container}>
          <Skeleton height={30} width="60%" mb="xs" />
          <Skeleton height={20} width="80%" mb="md" />
          <Skeleton height={15} width="40%" />
        </Container>
      </Box>
    );
  }

  // Use provided props if available, otherwise use banner data
  const bannerTitle = title || (banner?.title || '');
  const bannerDescription = description || (banner?.description || '');
  const bannerImage = backgroundImage || (banner?.backgroundImage || '');

  return (
    <Box
      className={classes.banner}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImage})`,
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

        <Title className={classes.title}>{bannerTitle}</Title>
        {bannerDescription && <Text className={classes.description}>{bannerDescription}</Text>}

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
