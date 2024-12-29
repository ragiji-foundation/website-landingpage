"use client"
import React from 'react';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'The Need', link: '/the-need' },
      { label: 'Our Story', link: '/our-story' },
      { label: 'Our Initiatives', link: '/our-initiatives' },
      { label: 'Success Stories', link: '/success-stories' },
    ],
  },
  {
    title: 'Media',
    links: [
      { label: 'News Coverage', link: '/news-coverage' },
      { label: 'Blogs', link: '/blog' },
      { label: 'Electronic Media', link: '/electronic-media' },
      { label: 'Awards', link: '/awards' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Facebook', link: '#' },
      { label: 'Follow us on X', link: '#' },
      { label: 'Instagram', link: '#' },
      { label: 'Contact Us', link: '/contact-us' },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Link href="/">
            <Image
              src="/logo1.png"
              alt="Ragi Ji Foundation"
              width={180}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <Text size="sm" c="dimmed" className={classes.description}>
            Live For Others
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Ragiji Foundation. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="#">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="#">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="#">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}