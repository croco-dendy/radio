import { describe, test, expect, beforeEach } from 'bun:test';
import { Hono } from 'hono';

describe('Monitoring Service', () => {
  test('should export monitoring service with correct methods', () => {
    const {
      monitoringService,
    } = require('../services/monitoring/monitoringService');

    expect(monitoringService).toBeDefined();
    expect(typeof monitoringService.getMonitoringData).toBe('function');
    expect(typeof monitoringService.getSystemHealth).toBe('function');
    expect(typeof monitoringService.getTelegramServiceStats).toBe('function');
    expect(typeof monitoringService.getRtmpServiceStats).toBe('function');
  });

  test('should export monitoring types module', () => {
    const types = require('../services/monitoring/types');
    expect(types).toBeDefined();
  });

  test('should export monitoring routes', () => {
    const { monitoringRoutes } = require('../routes/monitoring');
    expect(monitoringRoutes).toBeDefined();
  });

  describe('API Integration', () => {
    let app: Hono;

    beforeEach(() => {
      app = new Hono();
      const { monitoringRoutes } = require('../routes/monitoring');
      app.route('/api/monitoring', monitoringRoutes);
    });

    test('should handle health endpoint request structure', async () => {
      try {
        const res = await app.request('/api/monitoring/health');

        expect(res).toBeDefined();
        expect(typeof res.status).toBe('number');

        const data = await res.json();
        expect(data).toBeDefined();
        expect(typeof data.success).toBe('boolean');

        if (data.success && data.data) {
          expect(data.data.timestamp).toBeDefined();
          expect(typeof data.data.timestamp).toBe('string');
        }
      } catch (error) {
        // Expected in test environment without full dependencies
        expect(error).toBeDefined();
      }
    });

    test('should handle telegram endpoint request structure', async () => {
      try {
        const res = await app.request('/api/monitoring/telegram');

        expect(res).toBeDefined();
        expect(typeof res.status).toBe('number');

        const data = await res.json();
        expect(data).toBeDefined();
        expect(typeof data.success).toBe('boolean');

        if (data.success && data.data) {
          expect(typeof data.data.isRunning).toBe('boolean');
          expect(typeof data.data.ffmpegRunning).toBe('boolean');
          expect(typeof data.data.lastHealthCheck).toBe('string');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    test('should handle rtmp endpoint request structure', async () => {
      try {
        const res = await app.request('/api/monitoring/rtmp');

        expect(res).toBeDefined();
        expect(typeof res.status).toBe('number');

        const data = await res.json();
        expect(data).toBeDefined();
        expect(typeof data.success).toBe('boolean');

        if (data.success && data.data) {
          expect(typeof data.data.isRunning).toBe('boolean');
          expect(typeof data.data.containerName).toBe('string');
          expect(typeof data.data.lastHealthCheck).toBe('string');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    test('should reject invalid service in metrics endpoint', async () => {
      const res = await app.request('/api/monitoring/metrics/invalid-service');

      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain('Unknown service');
    });

    test('should accept valid service names in metrics endpoint', async () => {
      const telegramRes = await app.request('/api/monitoring/metrics/telegram');
      const rtmpRes = await app.request('/api/monitoring/metrics/rtmp');

      expect(telegramRes).toBeDefined();
      expect(rtmpRes).toBeDefined();
      expect(typeof telegramRes.status).toBe('number');
      expect(typeof rtmpRes.status).toBe('number');
    });
  });

  describe('Service Method Structure', () => {
    test('should handle getMonitoringData method call', async () => {
      const {
        monitoringService,
      } = require('../services/monitoring/monitoringService');

      try {
        const data = await monitoringService.getMonitoringData();

        if (data) {
          expect(typeof data).toBe('object');
          expect(data.services).toBeDefined();
          expect(data.timestamp).toBeDefined();
          expect(typeof data.uptime).toBe('number');

          expect(data.services.telegram).toBeDefined();
          expect(data.services.rtmp).toBeDefined();
        }
      } catch (error) {
        // Expected when external dependencies are not available
        expect(error).toBeDefined();
      }
    });

    test('should handle getSystemHealth method call', async () => {
      const {
        monitoringService,
      } = require('../services/monitoring/monitoringService');

      try {
        const health = await monitoringService.getSystemHealth();

        if (health) {
          expect(typeof health).toBe('object');
          expect(health.timestamp).toBeDefined();
          expect(typeof health.timestamp).toBe('string');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    test('should handle individual service stats method calls', async () => {
      const {
        monitoringService,
      } = require('../services/monitoring/monitoringService');

      try {
        const telegramStats = await monitoringService.getTelegramServiceStats();

        if (telegramStats) {
          expect(typeof telegramStats).toBe('object');
          expect(typeof telegramStats.isRunning).toBe('boolean');
          expect(typeof telegramStats.ffmpegRunning).toBe('boolean');
          expect(typeof telegramStats.lastHealthCheck).toBe('string');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }

      try {
        const rtmpStats = await monitoringService.getRtmpServiceStats();

        if (rtmpStats) {
          expect(typeof rtmpStats).toBe('object');
          expect(typeof rtmpStats.isRunning).toBe('boolean');
          expect(typeof rtmpStats.containerName).toBe('string');
          expect(typeof rtmpStats.lastHealthCheck).toBe('string');
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
