import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { StreamControlPage } from '../features';

export const streamControlRoute = createRoute({
  getParentRoute: () => Root,
  path: '/stream-control',
  component: StreamControlPage,
});


