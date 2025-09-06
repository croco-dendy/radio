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

// Get system health overview
monitoringRoutes.get('/health', async (c) => {
  try {
    const health = await monitoringService.getSystemHealth();
    return c.json({
      success: true,
      data: health,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
});

// Get telegram service statistics
monitoringRoutes.get('/telegram', async (c) => {
  try {
    const stats = await monitoringService.getTelegramServiceStats();
    return c.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
});

// Get RTMP service statistics
monitoringRoutes.get('/rtmp', async (c) => {
  try {
    const stats = await monitoringService.getRtmpServiceStats();
    return c.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
});

// Get service metrics for a specific service
monitoringRoutes.get('/metrics/:service', async (c) => {
  const service = c.req.param('service');

  try {
    let stats: unknown;
    switch (service) {
      case 'telegram':
        stats = await monitoringService.getTelegramServiceStats();
        break;
      case 'rtmp':
        stats = await monitoringService.getRtmpServiceStats();
        break;
      default:
        return c.json(
          {
            success: false,
            error: `Unknown service: ${service}`,
          },
          400,
        );
    }

    return c.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
});

export { monitoringRoutes };
