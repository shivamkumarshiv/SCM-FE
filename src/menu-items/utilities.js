// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconUsers } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconUsers
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'masters',
  title: 'Masters',
  type: 'group',
  children: [
    {
      id: 'teacher',
      title: 'Teachers',
      type: 'item',
      url: '/masters/teachers',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'students',
      title: 'Students',
      type: 'item',
      url: '/masters/students',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'institute',
      title: 'Institutes',
      type: 'item',
      url: '/masters/institutes',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'school',
      title: 'Schools',
      type: 'item',
      url: '/masters/schools',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'subject',
      title: 'Subjects',
      type: 'item',
      url: '/masters/subjects',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'division',
      title: 'Divisions',
      type: 'item',
      url: '/masters/divisions',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'attendence',
      title: 'Attendence',
      type: 'item',
      url: '/masters/attendence',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default utilities;
