import { Button, Container, Overlay, Text, Title, Group, Badge } from '@mantine/core';
import classes from './Banner.module.css';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BannerProps {
  type: 'blog' | 'about' | 'initiatives' | 'successstories' | 'home'| 'media' | 'electronicmedia' | 'gallery' | 'newscoverage' | 'ourstory'| 'need' | 'centers' | 'contactus' | 'careers' | 'awards';
  title: string;
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

const defaultBackgrounds = {
  blog: '/banners/blog-banner.jpg',
  about: '/banners/about-banner.jpg',
  initiatives: '/banners/initiatives-banner.jpg',
  successstories: '/banners/success-stories-banner.jpg',
  home: '/banners/home-banner.jpg',
  media: '/banners/media-banner.jpg',
  electronicmedia: '/banners/electronic-media-banner.jpg',
  gallery: '/banners/gallery-banner.jpg',
  newscoverage: '/banners/news-coverage-banner.jpg',
  ourstory: '/banners/our-story-banner.jpg',
  need: '/banners/the-need-banner.jpg',
  centers: '/banners/our-centers-banner.jpg',
  contactus: '/banners/contact-us-banner.jpg',
  careers: '/banners/careers-banner.jpg',
  awards: '/banners/awards-banner.jpg',
};

export function Banner({
  type,
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  breadcrumbs,
  tags,
  meta,
}: BannerProps) {
  const background = backgroundImage || defaultBackgrounds[type];

  const renderBreadcrumbs = () => {
    if (!breadcrumbs?.length) return null;
    return (
      <Group mb="lg" className={classes.breadcrumbs}>
        {breadcrumbs.map((item, index) => (
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
    if (!meta) return null;
    return (
      <Group className={classes.meta} mb="lg">
        {meta.date && <Text c="dimmed">{meta.date}</Text>}
        {meta.author && (
          <Text c="dimmed" className={classes.author}>
            By {meta.author}
          </Text>
        )}
        {meta.readTime && <Badge variant="light">{meta.readTime}</Badge>}
      </Group>
    );
  };

  const renderTags = () => {
    if (!tags?.length) return null;
    return (
      <Group gap="xs" mb="md">
        {tags.map((tag) => (
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
      style={{ backgroundImage: `url(${background})` }}
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
        {buttonText && (
          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            component="a"
            href={buttonLink}
          >
            {buttonText}
          </Button>
        )}
      </Container>
    </div>
  );
}
