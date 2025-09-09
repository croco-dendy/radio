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
    const data = await monitoringService.getSystemHealth();
    return c.json({ success: true, data });
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

// Get Telegram service statistics
monitoringRoutes.get('/telegram', async (c) => {
  try {
    const data = await monitoringService.getTelegramServiceStats();
    return c.json({ success: true, data });
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
    const data = await monitoringService.getRtmpServiceStats();
    return c.json({ success: true, data });
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

// Get metrics for specific service
monitoringRoutes.get('/metrics/:service', async (c) => {
  try {
    const service = c.req.param('service');

    if (service === 'telegram') {
      const data = await monitoringService.getTelegramServiceStats();
      return c.json({ success: true, data });
    }

    if (service === 'rtmp') {
      const data = await monitoringService.getRtmpServiceStats();
      return c.json({ success: true, data });
    }

    return c.json(
      {
        success: false,
        error: 'Invalid service. Use "telegram" or "rtmp"',
      },
      400,
    );
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

// Get logs for services
monitoringRoutes.get('/logs', async (c) => {
  try {
    const source = c.req.query('source') || 'all';
    const lines = Number.parseInt(c.req.query('lines') || '100', 10);

    const data = await monitoringService.getLogs(source, lines);
    return c.json({ success: true, data });
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

// Get logs for specific service
monitoringRoutes.get('/logs/:service', async (c) => {
  try {
    const service = c.req.param('service');
    const lines = Number.parseInt(c.req.query('lines') || '100', 10);

    const data = await monitoringService.getServiceLogs(service, lines);
    return c.json({ success: true, data });
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
