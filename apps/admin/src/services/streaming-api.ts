import { apiUrl } from '@/services/env';

// Types that match the backend exactly
export interface AudioTrack {
  id: string;
  url: string;
  title: string;
  duration?: number;
  addedAt: string;
}

export interface RtmpServerStatus {
  isRunning: boolean;
  containerName: string;
  status?: string;
  error?: string;
}

export interface TelegramStreamStatus {
  isRunning: boolean;
  success: boolean;
  message: string;
}

export interface StreamingStatus {
  isActive: boolean;
  mode: 'live' | 'radio';
  currentTrack?: AudioTrack;
  uptime?: number;
  listeners: number;
  error?: string;
  rtmpStatus?: RtmpServerStatus;
  telegramStatus?: TelegramStreamStatus;
}

export interface NowPlaying {
  track?: AudioTrack;
  position: number;
  duration: number;
  isPlaying: boolean;
}

export interface TelegramStreamConfig {
  rtmpUrl: string;
  streamKey: string;
  inputUrl: string;
  quality: 'low' | 'medium' | 'high';
  audioBitrate: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export type StreamingMode = 'live' | 'radio';
export type QualityPreset = 'low' | 'medium' | 'high';

class StreamingApiService {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  }

  // Get streaming status
  async getStatus(): Promise<StreamingStatus> {
    return this.request<StreamingStatus>(`${apiUrl}/api/streaming/status`);
  }

  // Get current mode
  async getMode(): Promise<{ mode: 'live' | 'radio' }> {
    return this.request<{ mode: 'live' | 'radio' }>(
      `${apiUrl}/api/streaming/mode`,
    );
  }

  // Set streaming mode
  async setMode(
    mode: 'live' | 'radio',
  ): Promise<{ success: boolean; mode: string }> {
    return this.request<{ success: boolean; mode: string }>(
      `${apiUrl}/api/streaming/mode`,
      {
        method: 'POST',
        body: JSON.stringify({ mode }),
      },
    );
  }

  // Get audio tracks
  async getTracks(): Promise<{ tracks: AudioTrack[] }> {
    return this.request<{ tracks: AudioTrack[] }>(
      `${apiUrl}/api/streaming/tracks`,
    );
  }

  // Add audio track
  async addTrack(
    track: Omit<AudioTrack, 'id' | 'addedAt'>,
  ): Promise<AudioTrack> {
    return this.request<AudioTrack>(`${apiUrl}/api/streaming/tracks`, {
      method: 'POST',
      body: JSON.stringify(track),
    });
  }

  // Update audio track
  async updateTrack(
    id: string,
    updates: Partial<AudioTrack>,
  ): Promise<AudioTrack> {
    return this.request<AudioTrack>(`${apiUrl}/api/streaming/tracks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete audio track
  async deleteTrack(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(
      `${apiUrl}/api/streaming/tracks/${id}`,
      {
        method: 'DELETE',
      },
    );
  }

  // Start streaming
  async startStreaming(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/start`,
      {
        method: 'POST',
      },
    );
  }

  // Stop streaming
  async stopStreaming(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/stop`,
      {
        method: 'POST',
      },
    );
  }

  // Get now playing
  async getNowPlaying(): Promise<NowPlaying> {
    return this.request<NowPlaying>(`${apiUrl}/api/streaming/now-playing`);
  }

  // Skip to next track
  async skipTrack(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/skip`,
      {
        method: 'POST',
      },
    );
  }

  // Telegram stream controls
  async startTelegramStream(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/telegram/start`,
      {
        method: 'POST',
      },
    );
  }

  async stopTelegramStream(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/telegram/stop`,
      {
        method: 'POST',
      },
    );
  }

  // Get Telegram stream status
  async getTelegramStreamStatus(): Promise<TelegramStreamStatus> {
    return this.request<TelegramStreamStatus>(
      `${apiUrl}/api/streaming/telegram/status`,
    );
  }

  // Get Telegram stream configuration
  async getTelegramConfig(): Promise<{
    success: boolean;
    config: TelegramStreamConfig;
  }> {
    return this.request<{ success: boolean; config: TelegramStreamConfig }>(
      `${apiUrl}/api/streaming/telegram/config`,
    );
  }

  // Update Telegram stream configuration
  async updateTelegramConfig(
    updates: Partial<TelegramStreamConfig>,
  ): Promise<{
    success: boolean;
    message: string;
    config: TelegramStreamConfig;
  }> {
    return this.request<{
      success: boolean;
      message: string;
      config: TelegramStreamConfig;
    }>(`${apiUrl}/api/streaming/telegram/config`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // RTMP Server Management
  // Get RTMP server status
  async getRtmpServerStatus(): Promise<
    { success: boolean } & RtmpServerStatus
  > {
    return this.request<{ success: boolean } & RtmpServerStatus>(
      `${apiUrl}/api/streaming/rtmp/status`,
    );
  }

  // Start RTMP server
  async startRtmpServer(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/rtmp/start`,
      {
        method: 'POST',
      },
    );
  }

  // Stop RTMP server
  async stopRtmpServer(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/rtmp/stop`,
      {
        method: 'POST',
      },
    );
  }

  // Restart RTMP server
  async restartRtmpServer(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `${apiUrl}/api/streaming/rtmp/restart`,
      {
        method: 'POST',
      },
    );
  }
}

export const streamingApi = new StreamingApiService();
