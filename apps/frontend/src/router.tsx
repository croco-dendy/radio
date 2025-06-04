import { createRouter } from '@tanstack/react-router';
import { Root } from './routes/root';
import { homeRoute } from './routes/home';

const router = createRouter({
  routeTree: Root.addChildren([homeRoute]),
});

export default router;
