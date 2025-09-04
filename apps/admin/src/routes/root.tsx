import { AdminLayout } from '@/features';
import { createRootRoute } from '@tanstack/react-router';

export const Root = createRootRoute({
  component: AdminLayout,
});
