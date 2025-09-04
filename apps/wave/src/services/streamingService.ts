import { join } from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

import { telegramStreamService } from './telegramStreamService';
import { rtmpService } from './rtmpService';
import { audioTrackService } from './audioTrackService';
import type {
  StreamingStatus,
  AudioTrack,
  NowPlaying,
  StreamingMode,
  TelegramStreamConfig,
} from '../types/streaming';

export class StreamingService {
  private currentMode: StreamingMode = 'radio';
  private isStreaming = false;
  private dataDir = join(process.cwd(), 'data');
  private configFile = join(this.dataDir, 'streaming-config.json');

  constructor() {
    this.initializeDataDirectory();
    this.loadConfig();
  }

  private async initializeDataDirectory() {
    if (!existsSync(this.dataDir)) {
      await mkdir(this.dataDir, { recursive: true });
    }
  }

  // Load configuration from file
  private async loadConfig(): Promise<void> {
    try {
      if (existsSync(this.configFile)) {
        const data = await readFile(this.configFile, 'utf-8');
        const config = JSON.parse(data);
        this.currentMode = config.mode || 'radio';
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

  // Save configuration to file
  private async saveConfig(): Promise<void> {
    try {
      const config = {
        mode: this.currentMode,
        lastUpdated: new Date().toISOString(),
      };
      await writeFile(this.configFile, JSON.stringify(config, null, 2));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  }

  // Get actual stream status by checking real processes
  private async getActualStreamStatus(): Promise<{
    rtmpServerRunning: boolean;
    telegramStreamRunning: boolean;
    isActive: boolean;
  }> {
    try {
      const [rtmpServerRunning, telegramStreamRunning] = await Promise.all([
        rtmpService.isRtmpServerRunning(),
        telegramStreamService.isTelegramStreamRunning(),
      ]);

      return {
        rtmpServerRunning,
        telegramStreamRunning,
        isActive: rtmpServerRunning && telegramStreamRunning,
      };
    } catch (error) {
      console.error('Error checking stream status:', error);
      return {
        rtmpServerRunning: false,
        telegramStreamRunning: false,
        isActive: false,
      };
    }
  }

  // Get streaming status
  async getStatus(): Promise<StreamingStatus> {
    try {
      const [actualStatus, rtmpStatus, telegramStatus] = await Promise.all([
        this.getActualStreamStatus(),
        rtmpService.getRtmpServerStatus(),
        telegramStreamService.getTelegramStreamStatus(),
      ]);

      // Determine the effective mode based on RTMP status
      // If RTMP is running, we're in live mode, otherwise radio mode
      const effectiveMode: StreamingMode = rtmpStatus.isRunning
        ? 'live'
        : 'radio';

      return {
        isActive: actualStatus.isActive,
        mode: effectiveMode,
        currentTrack: audioTrackService.getCurrentTrack(),
        uptime: actualStatus.isActive
          ? Date.now() - audioTrackService.getCurrentTrackIndex() // This could be improved
          : undefined,
        listeners: 0, // This would be connected to your WebSocket server
        error: this.getStreamError(actualStatus, rtmpStatus),
        rtmpStatus: {
          isRunning: rtmpStatus.isRunning,
          containerName: rtmpStatus.containerName,
          status: rtmpStatus.status,
          error: rtmpStatus.error,
        },
        telegramStatus: {
          isRunning: telegramStatus.isRunning,
          success: telegramStatus.success,
          message: telegramStatus.message,
        },
      };
    } catch (error) {
      console.error('Error getting streaming status:', error);
      return {
        isActive: false,
        mode: 'radio',
        listeners: 0,
        error: `Failed to get streaming status: ${error}`,
      };
    }
  }

  private getStreamError(
    actualStatus: {
      rtmpServerRunning: boolean;
      telegramStreamRunning: boolean;
      isActive: boolean;
    },
    rtmpStatus: { isRunning: boolean; error?: string },
  ): string | undefined {
    if (!rtmpStatus.isRunning) {
      return 'RTMP server is offline - in radio mode';
    }
    if (
      !actualStatus.rtmpServerRunning &&
      !actualStatus.telegramStreamRunning
    ) {
      return 'RTMP server and Telegram stream are not running';
    }
    if (!actualStatus.rtmpServerRunning) {
      return 'RTMP server is not running';
    }
    if (!actualStatus.telegramStreamRunning) {
      return 'Telegram stream is not running';
    }
    return undefined;
  }

  // Get current mode
  async getCurrentMode(): Promise<StreamingMode> {
    const rtmpStatus = await rtmpService.getRtmpServerStatus();
    return rtmpStatus.isRunning ? 'live' : 'radio';
  }

  // Set streaming mode
  async setMode(
    mode: StreamingMode,
  ): Promise<{ success: boolean; mode: string }> {
    if (this.isStreaming) {
      await this.stopStreaming();
    }

    this.currentMode = mode;
    await this.saveConfig();

    return { success: true, mode };
  }

  // Get audio tracks (delegate to AudioTrackService)
  async getAudioTracks(): Promise<AudioTrack[]> {
    return audioTrackService.getAudioTracks();
  }

  // Add audio track (delegate to AudioTrackService)
  async addAudioTrack(
    track: Omit<AudioTrack, 'id' | 'addedAt'>,
  ): Promise<AudioTrack> {
    return audioTrackService.addAudioTrack(track);
  }

  // Update audio track (delegate to AudioTrackService)
  async updateAudioTrack(
    id: string,
    updates: Partial<AudioTrack>,
  ): Promise<AudioTrack> {
    return audioTrackService.updateAudioTrack(id, updates);
  }

  // Delete audio track (delegate to AudioTrackService)
  async deleteAudioTrack(id: string): Promise<void> {
    return audioTrackService.deleteAudioTrack(id);
  }

  // Start streaming
  async startStreaming(): Promise<{ success: boolean; message: string }> {
    if (this.isStreaming) {
      return { success: false, message: 'Streaming is already active' };
    }

    try {
      const rtmpStatus = await rtmpService.getRtmpServerStatus();
      const effectiveMode = rtmpStatus.isRunning ? 'live' : 'radio';

      if (effectiveMode === 'live') {
        await this.startLiveStream();
      } else {
        await this.startRadioStream();
      }

      this.isStreaming = true;
      audioTrackService.resetPlaylistStartTime();

      return {
        success: true,
        message: `Started ${effectiveMode} streaming`,
      };
    } catch (error) {
      console.error('Error starting streaming:', error);
      return {
        success: false,
        message: `Failed to start streaming: ${error}`,
      };
    }
  }

  // Stop streaming
  async stopStreaming(): Promise<{ success: boolean; message: string }> {
    if (!this.isStreaming) {
      return { success: false, message: 'Streaming is not active' };
    }

    try {
      // Stop Telegram stream
      await telegramStreamService.stopTelegramStream();

      this.isStreaming = false;

      return {
        success: true,
        message: 'Streaming stopped successfully',
      };
    } catch (error) {
      console.error('Error stopping streaming:', error);
      return {
        success: false,
        message: `Failed to stop streaming: ${error}`,
      };
    }
  }

  // Start live stream
  private async startLiveStream(): Promise<void> {
    // For live streaming, we just need to ensure RTMP server is running
    // and start the Telegram stream
    const rtmpStatus = await rtmpService.getRtmpServerStatus();

    if (!rtmpStatus.isRunning) {
      throw new Error('RTMP server is not running. Please start it first.');
    }

    // Start Telegram stream
    const result = await telegramStreamService.startTelegramStream();
    if (!result.success) {
      throw new Error(result.message);
    }
  }

  // Start radio stream
  private async startRadioStream(): Promise<void> {
    // For radio streaming, we need RTMP server and Telegram stream
    const rtmpStatus = await rtmpService.getRtmpServerStatus();

    if (!rtmpStatus.isRunning) {
      throw new Error('RTMP server is not running. Please start it first.');
    }

    // Start Telegram stream
    const result = await telegramStreamService.startTelegramStream();
    if (!result.success) {
      throw new Error(result.message);
    }
  }

  // Get now playing (delegate to AudioTrackService)
  async getNowPlaying(): Promise<NowPlaying> {
    return audioTrackService.getNowPlaying();
  }

  // Skip to next track (delegate to AudioTrackService)
  async skipToNext(): Promise<{ success: boolean; message: string }> {
    const tracks = await audioTrackService.getAudioTracks();
    if (tracks.length === 0) {
      return { success: false, message: 'No tracks available' };
    }

    const result = await audioTrackService.skipToNext();

    // Restart streaming with new track if currently streaming
    if (this.isStreaming && this.currentMode === 'radio') {
      await this.stopStreaming();
      setTimeout(() => this.startStreaming(), 1000);
    }

    return result;
  }

  // Telegram stream management (delegate to TelegramStreamService)
  async startTelegramStream(): Promise<{ success: boolean; message: string }> {
    return telegramStreamService.startTelegramStream();
  }

  async stopTelegramStream(): Promise<{ success: boolean; message: string }> {
    return telegramStreamService.stopTelegramStream();
  }

  async getTelegramStreamStatus() {
    return telegramStreamService.getTelegramStreamStatus();
  }

  async updateTelegramConfig(updates: Partial<TelegramStreamConfig>) {
    return telegramStreamService.updateTelegramConfig(updates);
  }

  async getTelegramConfig() {
    return telegramStreamService.getTelegramConfig();
  }

  // RTMP server management (delegate to RtmpService)
  async getRtmpServerStatus() {
    return rtmpService.getRtmpServerStatus();
  }

  async startRtmpServer(): Promise<{ success: boolean; message: string }> {
    return rtmpService.startRtmpServer();
  }

  async stopRtmpServer(): Promise<{ success: boolean; message: string }> {
    return rtmpService.stopRtmpServer();
  }

  async restartRtmpServer(): Promise<{ success: boolean; message: string }> {
    return rtmpService.restartRtmpServer();
  }
}

export const streamingService = new StreamingService();
