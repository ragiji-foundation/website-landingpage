import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';
import { Box, Stack, Text } from '@mantine/core';
import classes from './ContactIcons.module.css';

// Add this icon mapping
const ICONS = {
  mail: IconAt,
  location: IconMapPin,
  phone: IconPhone,
  clock: IconSun,
} as const;

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: keyof typeof ICONS;  // Update this type
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon, title, description, ...others }: ContactIconProps) {
  const Icon = ICONS[icon];  // Get the actual icon component
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

interface ContactIconsListProps {
  data: {
    title: string;
    description: string;
    icon: keyof typeof ICONS;  // Update this type
  }[];
}

export function ContactIconsList({ data }: ContactIconsListProps) {
  const items = data.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}