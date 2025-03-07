import { Stat } from '@/types/stat';

export const mockStats: Stat[] = [
  {
    id: 'stat_1',
    icon: 'users',
    value: '5,000+',
    label: 'Beneficiaries',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'stat_2',
    icon: 'community',
    value: '50+',
    label: 'Communities Served',
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'stat_3',
    icon: 'school',
    value: '100+',
    label: 'Schools Supported',
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'stat_4',
    icon: 'heart',
    value: '10K+',
    label: 'Donations Received',
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
