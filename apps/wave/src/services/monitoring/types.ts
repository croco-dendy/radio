export interface StreamHealth {
  isConnected: boolean;
  lastConnectionTime: string | null;
  totalFramesSent: number;
  currentBitrate: number;
  connectionErrors: number;
  lastHealthCheck: string | null;
}

export interface TelegramServiceStats {
  isRunning: boolean;
  pm2Status: {
    pid: number;
    status: string;
    cpu: number;
    memory: number;
    uptime: number;
  } | null;
  daemonStatus: {
    status: 'initializing' | 'running' | 'stopped' | 'error';
    pid: number | null;
    ffmpegPid: number | null;
    restartAttempts: number;
    lastUpdate: string | null;
    streamHealth?: StreamHealth;
  } | null;
  ffmpegRunning: boolean;
  lastHealthCheck: string;
}

export interface RtmpServiceStats {
  isRunning: boolean;
  containerName: string;
  status: string;
  stats: {
    container: {
      cpuPercent: number;
      memoryUsage: number;
      memoryLimit: number;
      memoryPercent: number;
      networkIn: number;
      networkOut: number;
    } | null;
    rtmp: {
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
    } | null;
  } | null;
  lastHealthCheck: string;
}

export interface SystemHealth {
  telegram: TelegramServiceStats | null;
  rtmp: RtmpServiceStats | null;
  timestamp: string;
}

export interface MonitoringData {
  services: {
    telegram: TelegramServiceStats | null;
    rtmp: RtmpServiceStats | null;
  };
  timestamp: string;
  uptime: number;
}

export interface ServiceMetrics {
  uptime: number;
  restarts: number;
  errors: number;
  lastError?: string;
  performance: {
    cpu: number;
    memory: number;
    network: {
      in: number;
      out: number;
    };
  };
}

export interface MonitoringResponse {
  success: boolean;
  data?: MonitoringData;
  error?: string;
}

