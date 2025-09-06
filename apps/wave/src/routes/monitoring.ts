import { Hono } from 'hono';
import { monitoringService } from '../services/monitoring/monitoringService';
import type { MonitoringResponse } from '../services/monitoring/types';

const monitoringRoutes = new Hono();

// Get all monitoring data
monitoringRoutes.get('/', async (c) => {
  try {
    const data = await monitoringService.getMonitoringData();
    const response: MonitoringResponse = {
      success: true,
      data,
    };
    return c.json(response);
  } catch (error) {
    const response: MonitoringResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    return c.json(response, 500);
  }
});

export { monitoringRoutes };
