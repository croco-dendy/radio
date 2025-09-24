import type { Context, Next } from 'hono';
import { accountService } from '../accounts/accountService';

type Variables = {
  accountId: number;
};

export const authMiddleware = async (
  c: Context<{ Variables: Variables }>,
  next: Next,
) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);
  const accountId = await accountService.validateSession(token);

  c.set('accountId', accountId);
  await next();
};
