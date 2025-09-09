import { createRouter } from '@tanstack/react-router';
import { Root } from './routes/root';
import { indexRoute } from './routes/index';
import { collectionRoute } from './routes/collection';
import { usersRoute } from './routes/users';
import { streamControlRoute } from './routes/stream-control';

const router = createRouter({
  routeTree: Root.addChildren([
    indexRoute,
    collectionRoute,
    usersRoute,
    streamControlRoute,
  ]),
});

export default router;

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
