"use client"
import React, { useEffect } from 'react';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
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
      { label: 'Education and Skill Development', link: '/initiatives/education' },
      { label: 'Health', link: '/initiatives/health' },
      { label: 'Environment Protection and Plantation', link: '/initiatives/environment' },
      { label: 'Sanitization and Rural Development', link: '/initiatives/rural-development' },
      { label: 'Cultural and Sports Activity', link: '/initiatives/cultural-sports' },
      { label: 'Others', link: '/initiatives/others' },
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
  const { language, t, dictionary } = useLanguage();
  
  // Debug translations
  useEffect(() => {
    console.log("Current language:", language);
    console.log("Dictionary loaded:", !!dictionary);
  }, [language, dictionary]);

  const getTranslation = (key: string, fallback: string) => {
    try {
      const result = t(key);
      // If the result is the same as the key, it means translation wasn't found
      return result === key ? fallback : result;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return fallback;
    }
  };
  
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => {
      const translationKey = `footer.${group.title.toLowerCase().replace(/\s+/g, '')}.${link.label.toLowerCase().replace(/\s+/g, '')}`;
      const linkText = getTranslation(translationKey, link.label);
      
      return (
        <Text<'a'>
          key={index}
          className={classes.link}
          component="a"
          href={link.link.startsWith('http') || link.link.startsWith('tel:') || link.link.startsWith('mailto:') ? 
                link.link : 
                `/${language}${link.link}`}
        >
          {linkText}
        </Text>
      );
    });

    const titleKey = `footer.${group.title.toLowerCase().replace(/\s+/g, '')}.title`;
    const titleText = getTranslation(titleKey, group.title);

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{titleText}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="xl" className={classes.inner}>
        <div className={classes.logo}>
          <Link href={`/${language}`}>
            <Image
              src="/logo1.png"
              alt="Ragi Ji Foundation"
              width={200}
              height={90}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <Text size="lg" fw={500} className={classes.description}>
            {getTranslation('footer.slogan', 'Live For Others')}
          </Text>
          <Text size="sm" c="dimmed" mt="md" className={classes.address} fw={500}>
            {getTranslation('footer.organization.fullName', 'RAMGIRIJI MAHARAJ SHIKSHA EVAM SAMAJ SEVA SAMITI')}
          </Text>
          <Text size="sm" c="dimmed" className={classes.address}>
            {getTranslation('footer.organization.address.line1', 'House No-12 Gram Mahapura Post Kothd,')}
            <br />
            {getTranslation('footer.organization.address.line2', 'Kothada B.O Kothada, DHAR 454449')}
            <br />
            {getTranslation('footer.organization.address.line3', 'Madhya Pradesh, India')}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <div>
          <Text c="dimmed" size="sm" mb={5}>
            {getTranslation('footer.registration', 'Registration Numbers:')}
            {' '}
            {getTranslation('footer.registrationNumbers', '03/28/04/24586/22 • AAKART183J24BP02 • AAKART183J24BP01')}
          </Text>
          <Text c="dimmed" size="sm">
            {getTranslation('footer.rights', '© 2024 Ragi Ji Foundation. All rights reserved.')}
          </Text>
        </div>
        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
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
      </Container>
    </footer>
  );
}