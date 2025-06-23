'use client';
import React, { useState, useEffect } from 'react';
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
  NavLink,
  Modal,
  ActionIcon,
} from '@mantine/core';
import { JoinUsModal } from './JoinUsModal';
import { useLanguage } from '@/context/LanguageContext';
import SearchQuery from './SearchQuery';
import { useDisclosure } from '@mantine/hooks';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classes from './HeaderMenu.module.css';

// Define the navigation structure
const navigationStructure = [
  { link: '/', labelKey: 'nav.home' },
  {
    link: '#1',
    labelKey: 'nav.aboutus',
    links: [
      { link: '/the-need', labelKey: 'nav.theneed' },
      { link: '/our-story', labelKey: 'nav.ourstory' },
      { link: '/our-initiatives', labelKey: 'nav.ourinitiatives' },
      { link: '/success-stories', labelKey: 'nav.successstories' },
      { link: '/our-centers', labelKey: 'nav.ourcenters' },
    ],
  },
  { link: '/awards', labelKey: 'nav.awards' },
  {
    link: '#2',
    labelKey: 'nav.media',
    links: [
      { link: '/news-coverage', labelKey: 'nav.newscoverage' },
      { link: '/gallery', labelKey: 'nav.gallery' },
      { link: '/blog', labelKey: 'nav.blogs' },
      { link: '/electronic-media', labelKey: 'nav.electronicmedia' },
    ],
  },
  { link: '/careers', labelKey: 'nav.careers' },
  { link: '/contact-us', labelKey: 'nav.contactus' },
];

type LanguageCode = 'en' | 'hi';

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
];

export function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, setLanguage, t, dictionary } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add router and pathname hooks for manual navigation
  const router = useRouter();
  const pathname = usePathname();

  // Verify translations are loaded
  useEffect(() => {
    setIsLoaded(!!dictionary);
  }, [dictionary]);

  // Safe translation function with fallback
  const getTranslation = (key: string, fallback: string) => {
    try {
      const result = t(key);
      return result === key ? fallback : result;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return fallback;
    }
  };

  // Enhanced language switching function
  const handleLanguageSwitch = (newLanguage: LanguageCode) => {
    console.log('Switching to language:', newLanguage);
    console.log('Current pathname:', pathname);
    
    // Update the language context
    setLanguage(newLanguage);
    
    // Manually construct the new URL with the new locale
    const segments = pathname.split('/');
    
    // Check if the current path already has a locale
    if (['en', 'hi'].includes(segments[1])) {
      // Replace the existing locale
      segments[1] = newLanguage;
    } else {
      // Add the locale at the beginning
      segments.splice(1, 0, newLanguage);
    }
    
    const newPath = segments.join('/');
    console.log('Navigating to:', newPath);
    
    // Navigate to the new path
    router.push(newPath);
  };

  const navItems = navigationStructure.map((item, index) => {
    if (item.links) {
      const menuItems = item.links.map((subItem, subIndex) => (
        <Menu.Item key={subIndex}>
          <Link href={`/${language}${subItem.link}`} className={classes.dropdownLink}>
            {getTranslation(subItem.labelKey, subItem.labelKey.split('.').pop() || '')}
          </Link>
        </Menu.Item>
      ));

      return (
        <Menu key={index} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <span className={classes.link}>
              <Center>
                <Text fw={1000}>{getTranslation(item.labelKey, item.labelKey.split('.').pop() || '')}</Text>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </span>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={index} href={`/${language}${item.link}`} className={classes.link}>
        {getTranslation(item.labelKey, item.labelKey.split('.').pop() || '')}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Link href={`/${language}`}>
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
            placeholder={getTranslation('search.placeholder', 'Search')}
          />
        </div>

        <Group ml={50} gap={5} className={classes.links} visibleFrom="md">
          {navItems}
        </Group>

        <div className={classes.desktopGroup}>
          <Button
            variant="gradient"
            gradient={{ from: '#FF4B2B', to: '#FF416C' }}
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className={classes.joinUsCta}
          >
            {getTranslation('nav.joinus', 'JOIN US')}
          </Button>

          <Menu position="bottom-end" trigger="hover">
            <Menu.Target>
              <Button variant="subtle" size="sm">
                {language === 'en' ? 'English' : 'हिंदी'}
                <IconChevronDown size={14} stroke={1.5} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {languages.map((lang) => (
                <Menu.Item
                  key={lang.code}
                  onClick={() => handleLanguageSwitch(lang.code)}
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

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        centered
        overlayProps={{
          blur: 3,
          opacity: 0.55,
        }}
      >
        <JoinUsModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

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
            <h3 className={classes.foundationName}>{getTranslation('footer.organization.name', 'Ragi Ji Foundation')}</h3>
            <p className={classes.tagline}>{getTranslation('footer.slogan', 'Live For Others')}</p>
          </div>
          <ActionIcon onClick={close} variant="subtle" size="lg">
            ×
          </ActionIcon>
        </div>

        <div className={classes.drawerContent}>
          <div className={classes.mobileSearch}>
            <SearchQuery
              placeholder={getTranslation('search.placeholder', 'Search')}
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
                  handleLanguageSwitch(lang.code);
                  close(); // Close the mobile drawer after switching
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
            {navigationStructure.map((item) => (
              <NavLink
                key={item.labelKey}
                component="a"
                href={item.links ? '#' : `/${language}${item.link}`}
                label={getTranslation(item.labelKey, item.labelKey.split('.').pop() || '')}
                childrenOffset={28}
                onClick={item.links ? undefined : close}
                className={classes.mobileMenuItem}
              >
                {item.links?.map((subItem) => (
                  <NavLink
                    key={subItem.labelKey}
                    component="a"
                    href={`/${language}${subItem.link}`}
                    label={getTranslation(subItem.labelKey, subItem.labelKey.split('.').pop() || '')}
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