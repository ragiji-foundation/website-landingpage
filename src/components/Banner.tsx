'use client';
import React from 'react';
import { Container, Title, Text, Breadcrumbs, Anchor, Box, Badge, Group } from '@mantine/core';
import Link from 'next/link';
import { BannerType } from '@/store/useBannerStore';
import { useLanguage } from '@/context/LanguageContext';
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
  backgroundImage = '/banners/default-banner.svg',
  breadcrumbs = [],
  tags = []
}: BannerProps) {
  const { language } = useLanguage();

  // Figure out class based on type
  const bannerClass = `${classes.banner} ${classes[type as string] || ''}`;

  // Function to get fallback image
  const getFallbackImage = (imagePath: string): string => {
    // Try SVG version if JPG is specified
    if (imagePath.endsWith('.jpg')) {
      const svgPath = imagePath.replace('.jpg', '.svg');
      return svgPath;
    }
    // Otherwise return the original
    return imagePath || '/banners/default-banner.svg';
  };

  return (
    <Box
      component="section"
      className={bannerClass}
      data-type={type}
      style={{
        backgroundImage: `url(${getFallbackImage(backgroundImage)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#3a6ea5', // Fallback color
        position: 'relative',
      }}
    >
      {/* Overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      <Container size="xl" py={80} style={{ position: 'relative', zIndex: 1 }}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs mb="md" color="white" separator="/">
            {breadcrumbs.map((item, index) => {
              if (item.link) {
                return (
                  <Anchor 
                    key={index} 
                    component={Link} 
                    href={item.link} 
                    c="white" 
                    underline="hover" 
                    size="sm"
                    style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                  >
                    {item.label}
                  </Anchor>
                );
              }
              return (
                <Text key={index} c="white" size="sm" style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
                  {item.label}
                </Text>
              );
            })}
          </Breadcrumbs>
        )}
        
        <Title mb={description ? 'md' : 'xl'} c="white" order={1} style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
          {title}
        </Title>
        
        {description && (
          <Text c="white" size="lg" maw={700} style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
            {description}
          </Text>
        )}

        {tags.length > 0 && (
          <Group mt="lg">
            {tags.map((tag) => (
              <Badge key={tag} size="lg" variant="gradient" gradient={{ from: 'orange', to: 'green' }} style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Container>
    </Box>
  );
}
