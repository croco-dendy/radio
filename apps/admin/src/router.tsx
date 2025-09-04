import { createRouter } from '@tanstack/react-router';
import { Root } from './routes/root';
import { indexRoute } from './routes/index';
import { collectionRoute } from './routes/collection';
import { usersRoute } from './routes/users';
import { streamingRoute } from './routes/streaming';

const router = createRouter({
  routeTree: Root.addChildren([
    indexRoute,
    collectionRoute,
    usersRoute,
    streamingRoute,
  ]),
});

export default router;

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
