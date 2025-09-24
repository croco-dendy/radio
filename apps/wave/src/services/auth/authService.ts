import type { Context, Next } from 'hono';
import { findSessionByToken } from '@/db/accounts/index';

type Variables = {
  accountId: number;
};

export class AuthService {
  async validateToken(token: string) {
    const session = await findSessionByToken(token);

    if (!session || new Date(session.expiresAt) < new Date()) {
      return null;
    }

    return session;
  }

  createAuthMiddleware() {
    return async (c: Context<{ Variables: Variables }>, next: Next) => {
      const authHeader = c.req.header('Authorization');

      if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const token = authHeader.substring(7);
      const session = await this.validateToken(token);

      if (!session) {
        return c.json({ error: 'Invalid or expired token' }, 401);
      }

      c.set('accountId', session.accountId);
      await next();
    };
  }

  async requireOwnership(accountId: number, resourceOwnerId: number) {
    if (accountId !== resourceOwnerId) {
      throw new Error('Forbidden');
    }
  }
}

export const authService = new AuthService();
