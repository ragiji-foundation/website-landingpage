'use client';
import { useEffect } from 'react';
import { Button, Container, Overlay, Text, Title, Group, Badge } from '@mantine/core';
import { useBannerStore } from '@/store/useBannerStore';
import { BannerType } from '@/types/banner';
import classes from './Banner.module.css';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BannerProps {
  type: BannerType;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  tags?: string[];
  meta?: {
    date?: string;
    author?: string;
    readTime?: string;
  };
}

export function Banner({ type, ...props }: BannerProps) {
  const { getBannerByType, fetchBanners, loading } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const bannerData = getBannerByType(type);

  const title = props.title || bannerData?.title;
  const description = props.description || bannerData?.description;
  const backgroundImage = props.backgroundImage || bannerData?.backgroundImage;

  const renderBreadcrumbs = () => {
    if (!props.breadcrumbs?.length) return null;
    return (
      <Group mb="lg" className={classes.breadcrumbs}>
        {props.breadcrumbs.map((item, index) => (
          <div key={index} className={classes.breadcrumbItem}>
            {item.link ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}
      </Group>
    );
  };

  const renderMeta = () => {
    if (!props.meta) return null;
    return (
      <Group className={classes.meta} mb="lg">
        {props.meta.date && <Text c="dimmed">{props.meta.date}</Text>}
        {props.meta.author && (
          <Text c="dimmed" className={classes.author}>
            By {props.meta.author}
          </Text>
        )}
        {props.meta.readTime && <Badge variant="light">{props.meta.readTime}</Badge>}
      </Group>
    );
  };

  const renderTags = () => {
    if (!props.tags?.length) return null;
    return (
      <Group gap="xs" mb="md">
        {props.tags.map((tag) => (
          <Badge key={tag} variant="light">
            {tag}
          </Badge>
        ))}
      </Group>
    );
  };

  return (
    <div
      className={`${classes.banner} ${classes[type]}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="lg">
        {renderBreadcrumbs()}
        <Title className={classes.title}>{title}</Title>
        {renderMeta()}
        {renderTags()}
        {description && (
          <Text className={classes.description} size="xl" mt="xl">
            {description}
          </Text>
        )}
        {props.buttonText && (
          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            component="a"
            href={props.buttonLink}
          >
            {props.buttonText}
          </Button>
        )}
      </Container>
    </div>
  );
}
