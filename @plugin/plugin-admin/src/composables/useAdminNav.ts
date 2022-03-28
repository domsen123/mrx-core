import type { AdminNavItem } from '@mrx/plugin-admin/types';
import IconDashboard from '~icons/ph/activity';
import IconUsersAndRoles from '~icons/ph/users';

export const __adminNavigation = ref<AdminNavItem[]>([
  {
    to: '/admin',
    text: 'Dashboard',
    icon: IconDashboard,
  },
  {
    // to: '/admin/users',
    text: 'User Management',
    icon: IconUsersAndRoles,
    childs: [
      {
        to: '/admin/users',
        text: 'Users',
      },
      {
        to: '/admin/roles',
        text: 'Roles',
      },
      {
        to: '/admin/permissions',
        text: 'Permissions',
      },
    ],
  },
]);

export const useAdminNav = () => {
  const addAdminNavigation = (navItem: AdminNavItem): void => {
    __adminNavigation.value.push(navItem);
  };
  const getAdminNavigation = (): AdminNavItem[] => {
    return __adminNavigation.value;
  };
  return {
    addAdminNavigation,
    getAdminNavigation,
  };
};
