'use client';
import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import {
  Burger,
  Group,
  Menu,
  Center,
  Drawer,
  Stack,
  Text,
  Button,
  Divider,
  ScrollArea,
  NavLink,
  Modal,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import classes from './HeaderMenu.module.css';
import { useLanguage } from '@/context/LanguageContext';
import SearchQuery from './SearchQuery';


const links = [
  { link: '/', label: 'HOME' },
  {
    link: '#1',
    label: 'ABOUT US',
    links: [
      { link: '/the-need', label: 'THE NEED' },
      { link: '/our-story', label: 'OUR STORY' },
      { link: '/our-initiatives', label: 'OUR INITIATIVES' },
      { link: '/success-stories', label: 'SUCCESS STORIES' },
      { link: '/our-centers', label: 'OUR CENTERS' },
    ],
  },
  { link: '/awards', label: 'AWARDS' },
  {
    link: '#2',
    label: 'MEDIA',
    links: [
      { link: '/news-coverage', label: 'NEWS COVERAGE' },
      { link: '/gallery', label: 'GALLERY' },
      { link: '/blog', label: 'BLOGS' },
      { link: '/electronic-media', label: 'ELECTRONIC MEDIA' },
    ],
  },
  { link: '/careers', label: 'CAREERS' },
  { link: '/contact-us', label: 'CONTACT US' },
];

type LanguageCode = 'en' | 'hi';

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
];

export function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = links.map((link, index) => {
    if (link.links) {
      const menuItems = link.links.map((item, subIndex) => (
        <Menu.Item key={subIndex}>
          <a href={item.link} className={classes.dropdownLink}>
            {item.label}
          </a>
        </Menu.Item>
      ));

      return (
        <Menu key={index} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <span className={classes.link}>
              <Center>
                <Text>{link.label}</Text>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </span>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a key={index} href={link.link} className={classes.link}>
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Link href="/">
          <Image
            src="/logo1.png"
            alt="Ragi Ji Foundation"
            width={180}
            height={80}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <div className={classes.searchContainer}>
          <SearchQuery
            placeholder={t('search.placeholder')}
          />
        </div>

        <Group ml={50} gap={5} className={classes.links} visibleFrom="md">
          {navItems}
        </Group>

        <div className={classes.desktopGroup}>
          <Menu position="bottom-end" trigger="hover">
            <Menu.Target>
              <Button variant="subtle" size="sm">
                {languages.find(lang => lang.code === language)?.label}
                <IconChevronDown size={14} stroke={1.5} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {languages.map((lang) => (
                <Menu.Item
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    window.location.reload();
                  }}
                  style={{
                    fontWeight: language === lang.code ? 'bold' : 'normal',
                    backgroundColor: language === lang.code ? '#f0f0f0' : 'transparent'
                  }}
                >
                  {lang.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>

        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className={classes.mobileGroup}
        />
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="40%"
        padding="0"
        hiddenFrom="md"
        zIndex={1000}
        classNames={{
          content: classes.mobileDrawer,
          header: classes.drawerHeader,
        }}
        withCloseButton={false}
      >
        <div className={classes.drawerHeader}>
          <Image
            src="/logo.png"
            alt="Ragi Ji Foundation"
            width={50}
            height={50}
            style={{ objectFit: 'contain' }}
          />
          <div className={classes.drawerTitle}>
            <h3 className={classes.foundationName}>Ragi Ji Foundation</h3>
            <p className={classes.tagline}>Live For Others</p>
          </div>
          <ActionIcon onClick={close} variant="subtle" size="lg">
            ×
          </ActionIcon>
        </div>

        <div className={classes.drawerContent}>
          <div className={classes.mobileSearch}>
            <SearchQuery
              placeholder={t('search.placeholder')}
              onClose={close}
            />
          </div>

          <Divider my="sm" />

          <Group mb="sm" px="md" grow>
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? 'light' : 'subtle'}
                onClick={() => {
                  setLanguage(lang.code);
                  window.location.reload();
                }}
                size="md"
                fullWidth
                className={classes.mobileMenuItem}
              >
                {lang.label}
              </Button>
            ))}
          </Group>

          <Divider my="sm" />

          <Stack gap={0} className={classes.mobileNavigation}>
            {links.map((link) => (
              <NavLink
                key={link.label}
                component="a"
                href={link.links ? '#' : link.link}
                label={link.label}
                childrenOffset={28}
                onClick={link.links ? undefined : close}
                className={classes.mobileMenuItem}
              >
                {link.links?.map((subLink) => (
                  <NavLink
                    key={subLink.label}
                    component="a"
                    href={subLink.link}
                    label={subLink.label}
                    onClick={close}
                    className={`${classes.mobileMenuItem} ${classes.mobileSubMenu}`}
                  />
                ))}
              </NavLink>
            ))}
          </Stack>
        </div>
      </Drawer>
    </header>
  );
}