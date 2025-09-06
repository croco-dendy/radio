import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';
import type {
  MonitoringData,
  TelegramServiceStats,
  RtmpServiceStats,
  SystemHealth,
} from './types';

const execAsync = promisify(exec);

export class MonitoringService {
  private dataDir = process.env.DATA_DIR || './data';
  private telegramStatusFile = join(
    this.dataDir,
    'telegram-stream-status.json',
  );

  async getSystemHealth(): Promise<SystemHealth> {
    const [telegramStats, rtmpStats] = await Promise.allSettled([
      this.getTelegramServiceStats(),
      this.getRtmpServiceStats(),
    ]);

    return {
      telegram:
        telegramStats.status === 'fulfilled' ? telegramStats.value : null,
      rtmp: rtmpStats.status === 'fulfilled' ? rtmpStats.value : null,
      timestamp: new Date().toISOString(),
    };
  }

  async getMonitoringData(): Promise<MonitoringData> {
    const systemHealth = await this.getSystemHealth();

    return {
      services: {
        telegram: systemHealth.telegram,
        rtmp: systemHealth.rtmp,
      },
      timestamp: systemHealth.timestamp,
      uptime: process.uptime(),
    };
  }

  async getTelegramServiceStats(): Promise<TelegramServiceStats | null> {
    try {
      // Get PM2 process info
      const pm2Info = await this.getTelegramPM2Info();

      // Get daemon status from file
      const daemonStatus = await this.getTelegramDaemonStatus();

      // Check if FFmpeg process is running
      const ffmpegRunning = await this.isTelegramFFmpegRunning();

      return {
        isRunning: pm2Info.isRunning || ffmpegRunning,
        pm2Status:
          pm2Info.isRunning &&
          pm2Info.pid &&
          pm2Info.status &&
          pm2Info.cpu !== null &&
          pm2Info.memory !== null &&
          pm2Info.uptime !== null
            ? {
                pid: pm2Info.pid,
                status: pm2Info.status,
                cpu: pm2Info.cpu,
                memory: pm2Info.memory,
                uptime: pm2Info.uptime,
              }
            : null,
        daemonStatus: daemonStatus
          ? {
              status: daemonStatus.status,
              pid: daemonStatus.pid,
              ffmpegPid: daemonStatus.ffmpegPid,
              restartAttempts: daemonStatus.restartAttempts,
              lastUpdate: daemonStatus.timestamp,
              streamHealth: daemonStatus.streamHealth,
            }
          : null,
        ffmpegRunning,
        lastHealthCheck: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting Telegram service stats:', error);
      return null;
    }
  }

  async getRtmpServiceStats(): Promise<RtmpServiceStats | null> {
    try {
      const containerName = 'rtmp-server';

      // Check if container is running
      const { stdout: statusOutput } = await execAsync(
        `docker ps --filter "name=${containerName}" --format "{{.Status}}"`,
      );
      const isRunning = statusOutput.trim().includes('Up');

      if (!isRunning) {
        return {
          isRunning: false,
          containerName,
          status: 'stopped',
          stats: null,
          lastHealthCheck: new Date().toISOString(),
        };
      }

      // Get container stats
      const containerStats = await this.getRtmpContainerStats(containerName);

      // Get RTMP server statistics (if available via nginx-rtmp-module stats)
      const rtmpStats = await this.getRtmpServerStats(containerName);

      return {
        isRunning: true,
        containerName,
        status: statusOutput.trim(),
        stats: {
          container: containerStats,
          rtmp: rtmpStats,
        },
        lastHealthCheck: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting RTMP service stats:', error);
      return null;
    }
  }

  private async getTelegramPM2Info(): Promise<{
    isRunning: boolean;
    pid: number | null;
    status: string | null;
    cpu: number | null;
    memory: number | null;
    uptime: number | null;
  }> {
    try {
      const { stdout } = await execAsync('pm2 jlist');
      const processes = JSON.parse(stdout) as Array<{
        name: string;
        pid?: number;
        pm2_env?: {
          status?: string;
          pm_uptime?: number;
        };
        monit?: {
          cpu?: number;
          memory?: number;
        };
      }>;
      const telegramProcess = processes.find(
        (p) => p.name === 'telegram-stream',
      );

      if (!telegramProcess) {
        return {
          isRunning: false,
          pid: null,
          status: null,
          cpu: null,
          memory: null,
          uptime: null,
        };
      }

      return {
        isRunning: telegramProcess.pm2_env?.status === 'online',
        pid: telegramProcess.pid || null,
        status: telegramProcess.pm2_env?.status || null,
        cpu: telegramProcess.monit?.cpu || null,
        memory: telegramProcess.monit?.memory || null,
        uptime: telegramProcess.pm2_env?.pm_uptime || null,
      };
    } catch (error) {
      return {
        isRunning: false,
        pid: null,
        status: null,
        cpu: null,
        memory: null,
        uptime: null,
      };
    }
  }

  private async getTelegramDaemonStatus(): Promise<{
    status: 'initializing' | 'running' | 'stopped' | 'error';
    pid: number | null;
    timestamp: string | null;
    ffmpegPid: number | null;
    restartAttempts: number;
    details?: unknown;
    streamHealth?: {
      isConnected: boolean;
      lastConnectionTime: string | null;
      totalFramesSent: number;
      currentBitrate: number;
      connectionErrors: number;
      lastHealthCheck: string | null;
    };
  } | null> {
    try {
      if (!existsSync(this.telegramStatusFile)) {
        return null;
      }

      const statusData = await readFile(this.telegramStatusFile, 'utf-8');
      return JSON.parse(statusData);
    } catch (error) {
      console.error('Error reading telegram daemon status:', error);
      return null;
    }
  }

  private async isTelegramFFmpegRunning(): Promise<boolean> {
    try {
      const { stdout } = await execAsync(
        'pgrep -f "ffmpeg.*rtmps://dc4-1.rtmp.t.me"',
      );
      return stdout.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  private async getRtmpContainerStats(containerName: string): Promise<{
    cpuPercent: number;
    memoryUsage: number;
    memoryLimit: number;
    memoryPercent: number;
    networkIn: number;
    networkOut: number;
  } | null> {
    try {
      const { stdout } = await execAsync(
        `docker stats ${containerName} --no-stream --format "{{.CPUPerc}},{{.MemUsage}},{{.MemPerc}},{{.NetIO}}"`,
      );

      const [cpuPercent, memUsage, memPercent, netIO] = stdout
        .trim()
        .split(',');

      // Parse memory usage (e.g., "123.4MiB / 1.944GiB")
      const memParts = memUsage.split(' / ');
      const memoryUsage = this.parseMemoryValue(memParts[0]);
      const memoryLimit = this.parseMemoryValue(memParts[1]);

      // Parse network I/O (e.g., "1.23kB / 4.56MB")
      const netParts = netIO.split(' / ');
      const networkIn = this.parseMemoryValue(netParts[0]);
      const networkOut = this.parseMemoryValue(netParts[1]);

      return {
        cpuPercent: Number.parseFloat(cpuPercent.replace('%', '')),
        memoryUsage,
        memoryLimit,
        memoryPercent: Number.parseFloat(memPercent.replace('%', '')),
        networkIn,
        networkOut,
      };
    } catch (error) {
      console.error('Error getting container stats:', error);
      return null;
    }
  }

  private async getRtmpServerStats(containerName: string): Promise<{
    activePublishers: number;
    totalConnections: number;
    applications: Array<{
      name: string;
      streams: Array<{
        name: string;
        bandwidth: number;
        clients: number;
      }>;
    }>;
  } | null> {
    try {
      // Try to get nginx-rtmp-module statistics if available
      // This would require the RTMP server to expose stats endpoint
      const { stdout } = await execAsync(
        `docker exec ${containerName} curl -s http://localhost:8080/stat 2>/dev/null || echo '{}'`,
      );

      if (stdout.trim() === '{}' || !stdout.trim()) {
        // Return default/mock data if stats endpoint is not available
        return {
          activePublishers: 0,
          totalConnections: 0,
          applications: [
            {
              name: 'live',
              streams: [],
            },
          ],
        };
      }

      // Parse nginx-rtmp stats XML or JSON
      // This is a simplified version - actual implementation would depend on the stats format
      return {
        activePublishers: 1, // Would parse from actual stats
        totalConnections: 5, // Would parse from actual stats
        applications: [
          {
            name: 'live',
            streams: [
              {
                name: 'test',
                bandwidth: 2500000,
                clients: 3,
              },
            ],
          },
        ],
      };
    } catch (error) {
      console.error('Error getting RTMP server stats:', error);
      return null;
    }
  }

  private parseMemoryValue(value: string): number {
    const num = Number.parseFloat(value);
    if (value.includes('GiB')) return num * 1024 * 1024 * 1024;
    if (value.includes('MiB')) return num * 1024 * 1024;
    if (value.includes('KiB')) return num * 1024;
    if (value.includes('GB')) return num * 1000 * 1000 * 1000;
    if (value.includes('MB')) return num * 1000 * 1000;
    if (value.includes('kB')) return num * 1000;
    return num;
  }
}

export const monitoringService = new MonitoringService();
