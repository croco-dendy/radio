import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { MainPage } from '../features';

export const indexRoute = createRoute({
  getParentRoute: () => Root,
  path: '/',
  component: MainPage,
});
