import { exec } from 'node:child_process';
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import type {
  TelegramStreamConfig,
  TelegramStreamStatus,
} from '../types/streaming';

const execAsync = promisify(exec);

export interface TelegramStreamServiceStatus extends TelegramStreamStatus {
  config: TelegramStreamConfig;
}

export class TelegramStreamService {
  private dataDir = join(process.cwd(), 'data');
  private telegramConfigFile = join(this.dataDir, 'telegram-config.json');

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

  // Get quality settings based on quality preset
  private getQualitySettings(quality: 'low' | 'medium' | 'high'): {
    audioBitrate: string;
  } {
    switch (quality) {
      case 'low':
        return { audioBitrate: '64k' };
      case 'high':
        return { audioBitrate: '192k' };
      default:
        return { audioBitrate: '128k' };
    }
  }

  // Check if Telegram stream (FFmpeg process) is running
  async isTelegramStreamRunning(): Promise<boolean> {
    try {
      // Check for the actual FFmpeg process that's streaming to Telegram
      const { stdout } = await execAsync(
        'pgrep -f "ffmpeg.*rtmps://dc4-1.rtmp.t.me"',
      );
      return stdout.trim().length > 0;
    } catch (error) {
      // pgrep returns exit code 1 when no processes are found, which is normal
      return false;
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

      // Wait a moment for the process to start
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if it's actually running
      const isNowRunning = await this.isTelegramStreamRunning();
      if (isNowRunning) {
        return {
          success: true,
          message: 'Telegram stream started successfully via PM2',
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

  // Get Telegram stream status
  async getTelegramStreamStatus(): Promise<TelegramStreamServiceStatus> {
    try {
      const isRunning = await this.isTelegramStreamRunning();

      return {
        success: true,
        message: isRunning
          ? 'Telegram stream is running via PM2'
          : 'Telegram stream is not running',
        isRunning,
        config: this.telegramConfig,
      };
    } catch (error) {
      console.error('Error getting Telegram stream status:', error);
      return {
        success: false,
        message: `Failed to get Telegram stream status: ${error}`,
        isRunning: false,
        config: this.telegramConfig,
      };
    }
  }

  // Update Telegram stream configuration
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
