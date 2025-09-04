import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import type { RtmpServerStatus } from '../types/streaming';

const execAsync = promisify(exec);

export class RtmpService {
  private containerName = 'rtmp-server';

  // Check if RTMP server (Docker container) is running
  async isRtmpServerRunning(): Promise<boolean> {
    try {
      const { stdout } = await execAsync(
        `docker ps --filter "name=${this.containerName}" --format "{{.Status}}"`,
      );
      return stdout.trim().includes('Up');
    } catch (error) {
      console.error('Error checking RTMP server status:', error);
      return false;
    }
  }

  // Get detailed RTMP server status
  async getRtmpServerStatus(): Promise<RtmpServerStatus> {
    try {
      const { stdout } = await execAsync(
        `docker ps --filter "name=${this.containerName}" --format "{{.Status}}"`,
      );

      const isRunning = stdout.trim().includes('Up');

      return {
        isRunning,
        containerName: this.containerName,
        status: isRunning ? stdout.trim() : 'Not running',
      };
    } catch (error) {
      console.error('Error getting RTMP server status:', error);
      return {
        isRunning: false,
        containerName: this.containerName,
        error: `Failed to check RTMP server: ${error}`,
      };
    }
  }

  // Start RTMP server (if not already running)
  async startRtmpServer(): Promise<{ success: boolean; message: string }> {
    try {
      const isRunning = await this.isRtmpServerRunning();

      if (isRunning) {
        return {
          success: true,
          message: 'RTMP server is already running',
        };
      }

      // Start the RTMP server using the existing script
      const { stdout } = await execAsync('bash scripts/start-rtmp.sh', {
        maxBuffer: 1024 * 1024, // 1MB buffer
      });

      return {
        success: true,
        message: 'RTMP server started successfully',
      };
    } catch (error) {
      console.error('Error starting RTMP server:', error);
      return {
        success: false,
        message: `Failed to start RTMP server: ${error}`,
      };
    }
  }

  // Stop RTMP server
  async stopRtmpServer(): Promise<{ success: boolean; message: string }> {
    try {
      const isRunning = await this.isRtmpServerRunning();

      if (!isRunning) {
        return {
          success: true,
          message: 'RTMP server is not running',
        };
      }

      // Stop the RTMP server container
      await execAsync(`docker stop ${this.containerName}`);

      return {
        success: true,
        message: 'RTMP server stopped successfully',
      };
    } catch (error) {
      console.error('Error stopping RTMP server:', error);
      return {
        success: false,
        message: `Failed to stop RTMP server: ${error}`,
      };
    }
  }

  // Restart RTMP server
  async restartRtmpServer(): Promise<{ success: boolean; message: string }> {
    try {
      await this.stopRtmpServer();
      // Wait a moment for the container to fully stop
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await this.startRtmpServer();
    } catch (error) {
      console.error('Error restarting RTMP server:', error);
      return {
        success: false,
        message: `Failed to restart RTMP server: ${error}`,
      };
    }
  }
}

export const rtmpService = new RtmpService();
