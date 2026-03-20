import { Hono } from 'hono';
import { adminHandlers } from '@/api/handlers/adminHandlers';
import { authMiddleware, adminMiddleware } from '@/services/auth';

type Variables = {
  accountId: number;
};

const adminRoutes = new Hono<{ Variables: Variables }>();

adminRoutes.get(
  '/stats',
  authMiddleware,
  adminMiddleware,
  adminHandlers.getStatsHandler,
);

export { adminRoutes };
