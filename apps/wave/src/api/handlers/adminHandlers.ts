import type { Context } from 'hono';
import { ResponseHelper } from '@/utils/response';
import { withErrorHandling } from '@/utils/routeHandler';
import { statsService } from '@/services/admin/statsService';

export const adminHandlers = {
  get getStatsHandler() {
    return withErrorHandling(async (c: Context) => {
      const stats = await statsService.getStats();
      return ResponseHelper.success(c, stats);
    });
  },
};
