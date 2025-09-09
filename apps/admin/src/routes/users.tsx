import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { UsersPage } from '../features';

export const usersRoute = createRoute({
  getParentRoute: () => Root,
  path: '/users',
  component: UsersPage,
});
