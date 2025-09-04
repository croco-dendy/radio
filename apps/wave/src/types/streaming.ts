export interface AudioTrack {
  id: string;
  url: string;
  title: string;
  duration?: number;
  addedAt: string;
}

export interface NowPlaying {
  track?: AudioTrack;
  position: number;
  duration: number;
  isPlaying: boolean;
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
