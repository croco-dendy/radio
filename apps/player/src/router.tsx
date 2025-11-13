import { createRouter } from '@tanstack/react-router';
import { Root } from './routes/root';
import { homeRoute } from './routes/home';
import { collectionRoute } from './routes/collection';

const router = createRouter({
  routeTree: Root.addChildren([homeRoute, collectionRoute]),
});

export default router;
