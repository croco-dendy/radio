import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { Radio } from '@/features';

const Home = () => {
  return <Radio />;
};

export const homeRoute = createRoute({
  getParentRoute: () => Root,
  path: '/',
  component: Home,
});
