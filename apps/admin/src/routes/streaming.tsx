import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { StreamPage } from '../features/stream';

export const streamingRoute = createRoute({
  getParentRoute: () => Root,
  path: '/streaming',
  component: StreamPage,
});
