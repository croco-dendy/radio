import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { RadioLayout } from '@/features';

const Home = () => {
  return <RadioLayout />;
};

export const homeRoute = createRoute({
  getParentRoute: () => Root,
  path: '/',
  component: Home,
});
