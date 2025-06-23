// Logo configuration for different contexts
export const LOGOS = {
  header: {
    src: '/logo1.png',
    width: 180,
    height: 80,
    alt: 'Ragi Ji Foundation'
  },
  footer: {
    src: '/logo.png',
    width: 120,
    height: 60,
    alt: 'Ragi Ji Foundation'
  },
  favicon: {
    src: '/logo.png',
    width: 32,
    height: 32,
    alt: 'Ragi Ji Foundation'
  }
} as const;

export type LogoVariant = keyof typeof LOGOS;