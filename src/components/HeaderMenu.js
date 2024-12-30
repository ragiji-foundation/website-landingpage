'use client';
import React from 'react';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import {
  Autocomplete,
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import classes from './HeaderMenu.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useSearch } from '@/context/SearchContext';
import Link from 'next/link';

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
      { link: '/blog', label: 'BLOGS' },
      { link: '/electronic-media', label: 'ELECTRONIC MEDIA' },
    ],
  },
  { link: '/careers', label: 'CAREERS' },
  { link: '/contact-us', label: 'CONTACT US' },
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
];

export function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { language, setLanguage, t } = useLanguage();
  const { searchContent, searchResults, isSearching } = useSearch();

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
            style={{ objectFit: 'contain' }}
          />
        </Link>

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

          <Autocomplete
            className={classes.search}
            placeholder={t('search.placeholder')}
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={searchResults.map(result => ({
              value: result.title,
              label: result.title,
              group: result.type,
              url: result.url,
            }))}
            onChange={(value) => {
              if (value.length > 2) {
                searchContent(value);
              }
            }}
            onOptionSubmit={(option) => {
              const result = searchResults.find(r => r.title === option);
              if (result?.url) {
                window.location.href = result.url;
              }
            }}
            loading={isSearching ? "true" : undefined}
            size="sm"
          />
        </div>

        <div className={classes.mobileGroup}>
          <Burger 
            opened={opened} 
            onClick={toggle}
            size="sm"
          />
        </div>
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000}
      >
        <ScrollArea h="calc(100vh - 60px)" mx="-md">
          <Autocomplete
            className={classes.mobileSearch}
            placeholder={t('search.placeholder')}
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={searchResults.map(result => ({
              value: result.title,
              label: result.title,
              group: result.type,
              url: result.url,
            }))}
            onChange={(value) => {
              if (value.length > 2) {
                searchContent(value);
              }
            }}
            onOptionSubmit={(option) => {
              const result = searchResults.find(r => r.title === option);
              if (result?.url) {
                window.location.href = result.url;
                close();
              }
            }}
            loading={isSearching ? "true" : undefined}
            size="sm"
          />

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
                size="sm"
                fullWidth
              >
                {lang.label}
              </Button>
            ))}
          </Group>

          <Divider my="sm" />

          <Stack gap={0} px="md">
            {links.map((link) => (
              <NavLink
                key={link.label}
                component="a"
                href={link.links ? '#' : link.link}
                label={link.label}
                childrenOffset={28}
                onClick={link.links ? undefined : close}
              >
                {link.links?.map((subLink) => (
                  <NavLink
                    key={subLink.label}
                    component="a"
                    href={subLink.link}
                    label={subLink.label}
                    onClick={close}
                  />
                ))}
              </NavLink>
            ))}
          </Stack>
        </ScrollArea>
      </Drawer>
    </header>
  );
}