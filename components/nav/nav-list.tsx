import { Icon } from '@iconify/react/dist/iconify.js';
import type { NavGroupProps } from './nav';

export const navList: NavGroupProps[] = [
  {
    groupName: 'Menu',
    navList: [
      {
        label: 'Home',
        path: '/home',
        icon: <Icon icon='akar-icons:home-alt1' height={24} width={24} />,
      },
      {
        label: 'Discover',
        path: '/discover',
        icon: (
          <Icon icon='solar:compass-square-linear' height={24} width={24} />
        ),
      },
      {
        label: 'Awards',
        path: '/awards',
        icon: <Icon icon='mingcute:trophy-line' height={24} width={24} />,
      },
      {
        label: 'Celebrities',
        path: '/celebrities',
        icon: (
          <Icon icon='iconoir:twitter-verified-badge' height={24} width={24} />
        ),
      },
    ],
  },
  {
    groupName: 'Library',
    navList: [
      {
        label: 'Recent',
        path: '/recent',
        icon: <Icon icon='mynaui:clock-square' height={24} width={24} />,
      },
      {
        label: 'Top Rated',
        path: '/top-rated',
        icon: <Icon icon='typcn:star-outline' height={24} width={24} />,
      },
      {
        label: 'Awards',
        path: '/awards',
        icon: <Icon icon='mingcute:trophy-line' height={24} width={24} />,
      },
      {
        label: 'Playlists',
        path: '/playlists',
        icon: <Icon icon='mingcute:heart-line' height={24} width={24} />,
      },
      {
        label: 'Watchlist',
        path: '/watchlist',
        icon: <Icon icon='solar:add-square-linear' height={24} width={24} />,
      },
    ],
  },
  {
    groupName: 'General',
    navList: [
      {
        label: 'Settings',
        path: '/settings',
        icon: <Icon icon='humbleicons:cog' width={24} height={24} />,
      },
      {
        label: 'Logout',
        path: '',
        icon: <Icon icon='solar:logout-3-outline' width={24} height={24} />,
      },
    ],
  },
];
