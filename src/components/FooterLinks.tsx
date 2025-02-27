"use client"
import React from 'react';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'About Us',
    links: [
      { label: 'The Need', link: '/the-need' },
      { label: 'Our Story', link: '/our-story' },
      { label: 'Our Initiatives', link: '/our-initiatives' },
      { label: 'Success Stories', link: '/success-stories' },

    ],
  },
  {
    title: 'Our Initiatives',
    links: [
      { label: 'Education', link: '/education' },
      { label: 'Healthcare', link: '/healthcare' },
      { label: 'Rural Development', link: '/rural-development' },
      { label: 'Women Empowerment', link: '/women-empowerment' },
      { label: 'Skill Development', link: '/skill-development' },

    ],
  },
  {
    title: 'Media Center',
    links: [
      { label: 'News Coverage', link: '/news-coverage' },
      { label: 'Electronic Media', link: '/electronic-media' },
      { label: 'Photo Gallery', link: '/gallery' },
      { label: 'Blogs', link: '/blog' },
      { label: 'Awards', link: '/awards' },
    ],
  },
  {
    title: 'Get In Touch',
    links: [
      { label: 'Contact Us', link: '/contact-us' },
      { label: '+91 8827968035', link: 'tel:+918827968035' },
      { label: 'admin@ragijifoundation.com', link: 'mailto:admin@ragijifoundation.com' },
      { label: 'www.ragijifoundation.com', link: 'https://www.ragijifoundation.com' },
      { label: 'Careers', link: '/careers' },
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
      
      <Container size="xl" className={classes.inner}>
        <div className={classes.logo}>
          <Link href="/">
            <Image
              src="/logo1.png"
              alt="Ragi Ji Foundation"
              width={200}
              height={90}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <Text size="lg" fw={500} className={classes.description}>
            Live For Others
          </Text>
          <Text size="sm" c="dimmed" mt="md" className={classes.address}>
            RAMGIRIJI MAHARAJ SHIKSHA EVAM SAMAJ SEVA SAMITI
            <br />
            House No-12 Gram Mahapura Post Kothd,
            <br />
            Kothada B.O Kothada, DHAR 454449
            <br />
            Madhya Pradesh, India
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size="xl" className={classes.afterFooter}>
        <Group justify="space-between" className={classes.afterFooterGroup}>
          <div>
            <Text c="dimmed" size="sm" className={classes.registration}>
              Registration Numbers:
              <br />
              03/28/04/24586/22 • AAKART183J24BP02 • AAKART183J24BP01
            </Text>
            <Text c="dimmed" size="sm" mt="xs">
              © 2024 Ragi Ji Foundation. All rights reserved.
            </Text>
          </div>

          <Group gap="xl" className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="xl" color="orange" variant="subtle" component="a" href="#">
              <IconBrandTwitter size={22} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="xl" color="orange" variant="subtle" component="a" href="#">
              <IconBrandYoutube size={22} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="xl" color="orange" variant="subtle" component="a" href="#">
              <IconBrandInstagram size={22} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}