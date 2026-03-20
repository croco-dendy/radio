import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { UsersPage } from '../features/users';

export const userManagementRoute = createRoute({
  getParentRoute: () => Root,
  path: '/users',
  component: UsersPage,
});
