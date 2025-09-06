import { exec } from 'node:child_process';
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import type { TelegramStreamConfig } from '../../types/streaming';

const execAsync = promisify(exec);

export class TelegramStreamService {
  private dataDir = join(process.cwd(), 'data');
  private telegramConfigFile = join(this.dataDir, 'telegram-config.json');
  private statusFile = join(this.dataDir, 'telegram-stream-status.json');

  // Default Telegram stream configuration
  private telegramConfig: TelegramStreamConfig = {
    rtmpUrl: 'rtmps://dc4-1.rtmp.t.me/s/',
    streamKey: '2560136036:m6Xk01Qa3dDMq3Rs7cic-Q',
    inputUrl: 'rtmp://localhost:1935/live/test',
    quality: 'medium',
    audioBitrate: '128k',
  };

  constructor() {
    this.loadTelegramConfig();
  }

  // Load Telegram configuration from file
  private async loadTelegramConfig(): Promise<void> {
    try {
      if (existsSync(this.telegramConfigFile)) {
        const configData = await readFile(this.telegramConfigFile, 'utf-8');
        this.telegramConfig = {
          ...this.telegramConfig,
          ...JSON.parse(configData),
        };
      }
    } catch (error) {
      console.error('Error loading Telegram config:', error);
    }
  }

  // Save Telegram configuration to file
  private async saveTelegramConfig(): Promise<void> {
    try {
      await writeFile(
        this.telegramConfigFile,
        JSON.stringify(this.telegramConfig, null, 2),
      );
    } catch (error) {
      console.error('Error saving Telegram config:', error);
    }
  }

  // Get daemon status from status file
  private async getDaemonStatus(): Promise<{
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
      if (!existsSync(this.statusFile)) {
        return null;
      }

      const statusData = await readFile(this.statusFile, 'utf-8');
      return JSON.parse(statusData);
    } catch (error) {
      console.error('Error reading daemon status:', error);
      return null;
    }
  }

  // Check if Telegram stream is running via PM2
  async isTelegramStreamRunning(): Promise<boolean> {
    try {
      // First check PM2 status
      const { stdout } = await execAsync('pm2 jlist');
      const processes = JSON.parse(stdout);
      const telegramProcess = processes.find(
        (proc: { name: string; pm2_env: { status: string } }) =>
          proc.name === 'telegram-stream',
      );

      if (!telegramProcess || telegramProcess.pm2_env.status !== 'online') {
        return false;
      }

      // Check daemon status file for more accurate information
      const daemonStatus = await this.getDaemonStatus();
      if (
        daemonStatus &&
        daemonStatus.status === 'running' &&
        daemonStatus.ffmpegPid
      ) {
        // Verify FFmpeg process is still alive
        try {
          const { stdout: ffmpegCheck } = await execAsync(
            `ps -p ${daemonStatus.ffmpegPid}`,
          );
          return ffmpegCheck.includes(daemonStatus.ffmpegPid.toString());
        } catch {
          return false;
        }
      }

      return false;
    } catch (error) {
      console.error('Error checking PM2 telegram stream status:', error);
      return false;
    }
  }

  async getPM2ProcessInfo(): Promise<{
    status: string;
    pid: number | null;
    uptime: number | null;
    memory: number | null;
    cpu: number | null;
  }> {
    try {
      const { stdout } = await execAsync('pm2 jlist');
      const processes = JSON.parse(stdout);
      const telegramProcess = processes.find(
        (proc: {
          name: string;
          pm2_env: { status: string; pm_uptime?: number };
          pid?: number;
          monit?: { memory: number; cpu: number };
        }) => proc.name === 'telegram-stream',
      );

      if (!telegramProcess) {
        return {
          status: 'not_found',
          pid: null,
          uptime: null,
          memory: null,
          cpu: null,
        };
      }

      return {
        status: telegramProcess.pm2_env.status,
        pid: telegramProcess.pid || null,
        uptime: telegramProcess.pm2_env.pm_uptime || null,
        memory: telegramProcess.monit?.memory || null,
        cpu: telegramProcess.monit?.cpu || null,
      };
    } catch (error) {
      console.error('Error getting PM2 process info:', error);
      return {
        status: 'error',
        pid: null,
        uptime: null,
        memory: null,
        cpu: null,
      };
    }
  }

  // Start Telegram stream using PM2
  async startTelegramStream(): Promise<{ success: boolean; message: string }> {
    try {
      const isRunning = await this.isTelegramStreamRunning();
      if (isRunning) {
        return {
          success: false,
          message: 'Telegram stream is already running',
        };
      }

      // Check if RTMP server is running first
      const rtmpStatus = await this.checkRtmpServerStatus();
      if (!rtmpStatus.isRunning) {
        return {
          success: false,
          message:
            'Cannot start Telegram stream: RTMP server is not running. Please start the RTMP server first.',
        };
      }

      console.log('Starting Telegram stream with PM2...');

      // Start the PM2 process
      const { stdout, stderr } = await execAsync(
        'pm2 start ecosystem.config.js --only telegram-stream --env production',
      );

      if (stderr && !stderr.includes('already exists')) {
        console.error('PM2 error:', stderr);
        return {
          success: false,
          message: `Failed to start Telegram stream: ${stderr}`,
        };
      }

      // Wait a moment for the process to start and check status
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Check if it's actually running with FFmpeg
      const isNowRunning = await this.isTelegramStreamRunning();
      if (isNowRunning) {
        return {
          success: true,
          message: 'Telegram stream started successfully via PM2',
        };
      }

      // If not running, check if daemon is waiting for RTMP
      const daemonStatus = await this.getDaemonStatus();
      if (
        daemonStatus?.status === 'error' &&
        (daemonStatus.details as { waiting?: boolean })?.waiting
      ) {
        return {
          success: false,
          message:
            'Telegram stream daemon started but is waiting for RTMP server to become available',
        };
      }

      return {
        success: false,
        message: 'Telegram stream failed to start',
      };
    } catch (error) {
      console.error('Error starting Telegram stream:', error);
      return {
        success: false,
        message: `Failed to start Telegram stream: ${error}`,
      };
    }
  }

  // Check RTMP server status
  private async checkRtmpServerStatus(): Promise<{ isRunning: boolean }> {
    try {
      // Check if Docker container is running
      const { stdout } = await execAsync(
        'docker ps --filter "name=rtmp-server" --format "{{.Status}}"',
      );
      const isRunning = stdout.trim().startsWith('Up');
      return { isRunning };
    } catch (error) {
      console.error('Error checking RTMP server status:', error);
      return { isRunning: false };
    }
  }

  // Stop Telegram stream using PM2
  async stopTelegramStream(): Promise<{ success: boolean; message: string }> {
    try {
      const isRunning = await this.isTelegramStreamRunning();
      if (!isRunning) {
        return { success: false, message: 'Telegram stream is not running' };
      }

      console.log('Stopping Telegram stream via PM2...');

      // Stop the PM2 process
      const { stdout, stderr } = await execAsync('pm2 stop telegram-stream');

      if (stderr) {
        console.error('PM2 error:', stderr);
        return {
          success: false,
          message: `Failed to stop Telegram stream: ${stderr}`,
        };
      }

      return {
        success: true,
        message: 'Telegram stream stopped successfully via PM2',
      };
    } catch (error) {
      console.error('Error stopping Telegram stream:', error);
      return {
        success: false,
        message: `Failed to stop Telegram stream: ${error}`,
      };
    }
  }

  async updateTelegramConfig(updates: Partial<TelegramStreamConfig>): Promise<{
    success: boolean;
    message: string;
    config: TelegramStreamConfig;
  }> {
    try {
      this.telegramConfig = { ...this.telegramConfig, ...updates };
      await this.saveTelegramConfig();

      return {
        success: true,
        message: 'Telegram configuration updated successfully',
        config: this.telegramConfig,
      };
    } catch (error) {
      console.error('Error updating Telegram config:', error);
      return {
        success: false,
        message: `Failed to update Telegram config: ${error}`,
        config: this.telegramConfig,
      };
    }
  }

  // Get Telegram stream configuration
  async getTelegramConfig(): Promise<TelegramStreamConfig> {
    return this.telegramConfig;
  }
}

export const telegramStreamService = new TelegramStreamService();
