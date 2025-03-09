import { MantineThemeOverride, MantineTheme } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    brand: [
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A',  // Primary green
      '#4CAF50',
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20',
    ],
    accent: [
      '#FFF3E0',
      '#FFE0B2',
      '#FFCC80',
      '#FFB74D',
      '#FFA726',  // Primary orange
      '#FF9800',
      '#FB8C00',
      '#F57C00',
      '#EF6C00',
      '#E65100',
    ],
  },
  primaryColor: 'brand',
  primaryShade: 5,

  components: {
    Card: {
      defaultProps: {
        radius: 0,
        p: 'xl',
        shadow: 'none',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: 'transparent',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      }),
    },
    Container: {
      defaultProps: {
        size: 'xl',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          padding: `${(typeof theme.spacing.xl === 'number' ? theme.spacing.xl : parseInt(theme.spacing.xl as string, 10)) * 2}px`,
        },
      }),
    },
    Section: {
      styles: (theme: MantineTheme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.colors.gray[0],
          },
          '&:nth-of-type(even)': {
            backgroundColor: 'white',
          },
          padding: `${(typeof theme.spacing.xl === 'number' ? theme.spacing.xl : parseInt(theme.spacing.xl as string, 10)) * 3}px 0`,
        },
      }),
    },
  },

  other: {
    cardTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    sectionPadding: '6rem',
  },
};
