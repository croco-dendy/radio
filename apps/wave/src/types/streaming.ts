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

export type QualityPreset = 'low' | 'medium' | 'high';
